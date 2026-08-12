// DoctorConsultFlow.jsx
// Lives inline inside AssessmentChat's transcript, right under
// AssessmentSummary / RecoveryPlanStatus. Lets the patient go from
// "here's your triage result" all the way to a paid, confirmed booking
// without ever leaving the chat window — mirrors the flow in
// Doctors.jsx + ClinicBooking, just compressed into chat bubbles.
//
// Shown for BOTH outcomes:
//   - redFlag: true  -> urgent framing, opens expanded by default
//   - redFlag: false -> gentler framing ("Want a physio to check this
//     personally too?"), collapsed behind a button so it doesn't crowd
//     the recovery-plan status card
//
// Talks to the same backend endpoints Doctors.jsx / ClinicBooking use:
//   GET  /api/doctor-auth/public/doctors        (doctor search)
//   GET  /api/clinics/new-bookings/booked-slots       (slot availability)
//   POST /api/clinics/new-bookings/create-order       (Razorpay order)
//   POST /api/clinics/new-bookings/verify-payment     (confirm booking)

import { useEffect, useMemo, useState } from "react";
import {
  Stethoscope,
  Calendar,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;
const RAZORPAY_SRC = "https://checkout.razorpay.com/v1/checkout.js";

// ── Load the Razorpay checkout script once, reuse across bookings ──
let razorpayScriptPromise = null;
function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = RAZORPAY_SRC;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Could not load payment gateway."));
      document.body.appendChild(script);
    });
  }
  return razorpayScriptPromise;
}

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function minutesToLabel(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// 30-min slots between a doctor's start/end time, minus booked ones.
// `isToday` + `nowMinutes` mirror Doctors.jsx's getNextAvailable() so a
// doctor never appears bookable at a time that's already passed, and
// `dayName` mirrors it too so we never show slots on a day the doctor
// doesn't work at all (both of these silently zeroed out "today" for
// doctors whose current time was past their last slot, or whose days
// list didn't include the selected date).
function buildSlots({ availability, bookedTimes, dayName, isToday, nowMinutes }) {
  if (!availability?.start_time || !availability?.end_time) {
    console.warn("[DoctorConsultFlow] doctor has no start_time/end_time set:", availability);
    return { slots: [], reason: "unset" };
  }
  if (Array.isArray(availability.days) && availability.days.length > 0 && !availability.days.includes(dayName)) {
    return { slots: [], reason: "closed" };
  }

  const [startH, startM] = availability.start_time.split(":").map(Number);
  const [endH, endM] = availability.end_time.split(":").map(Number);
  if ([startH, startM, endH, endM].some(Number.isNaN)) {
    console.warn("[DoctorConsultFlow] unparsable availability times:", availability);
    return { slots: [], reason: "unset" };
  }

  let cursor = startH * 60 + startM;
  const end = endH * 60 + endM;
  if (isToday) cursor = Math.max(cursor, nowMinutes + 30); // same 30-min buffer as the main site

  const slots = [];
  while (cursor + 30 <= end) {
    const label = minutesToLabel(cursor);
    if (!bookedTimes.includes(label)) slots.push(label);
    cursor += 30;
  }
  return { slots, reason: slots.length === 0 ? "full" : null };
}

// Turns "the server returned an HTML error page" into a clear message
// instead of the cryptic "Unexpected token '<' is not valid JSON" you get
// from calling res.json() straight on a 404. A 404 here means the route
// itself isn't mounted on the backend — call that out explicitly since
// it's a different fix (server config) than a normal request failure.
async function safeJson(res, routeLabel) {
  if (res.status === 404) {
    throw new Error(
      `${routeLabel} isn't available on the server (404). This route likely isn't mounted — check your backend's app.js/server.js.`
    );
  }
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`${routeLabel} returned an unexpected response (status ${res.status}).`);
  }
  if (!res.ok && !data.success) {
    throw new Error(data.message || data.error || `${routeLabel} failed (status ${res.status}).`);
  }
  return data;
}
// Discomfort" or "Mechanical Knee Pain" — searching for that whole
// string against doctor.conditions_treated (which holds short tags like
// "Neck Pain", "Knee Pain") never matches. Pull out the one keyword the
// doctor records actually use instead. ──
const CONDITION_KEYWORD_MAP = [
  [/cervical|neck/, "neck"],
  [/lumbar|lower back|spine|sciatica|back/, "back"],
  [/knee|patell|meniscus/, "knee"],
  [/shoulder|rotator cuff|frozen shoulder/, "shoulder"],
  [/hip/, "hip"],
  [/elbow|tennis elbow|golfer/, "elbow"],
];

function deriveSearchTerm(conditionCategory) {
  const text = (conditionCategory || "").toLowerCase();
  const hit = CONDITION_KEYWORD_MAP.find(([pattern]) => pattern.test(text));
  return hit ? hit[1] : "";
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

// Local calendar date, not toISOString() — toISOString() converts to
// UTC first, which can silently shift "today" onto the wrong day for
// anyone in a timezone ahead of UTC (e.g. IST) in the early hours.
function nextNDates(n) {
  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const out = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      iso: `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`,
      dayName: WEEKDAY_NAMES[d.getDay()],
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : `${shortDays[d.getDay()]} ${d.getDate()}`,
    });
  }
  return out;
}

export default function DoctorConsultFlow({ result, forceOpen }) {
  const { assessmentId, conditionCategory, redFlag, summaryForPhysio } = result;

  // phase: collapsed | suggesting | listing | details | paying | confirmed | error
  const [phase, setPhase] = useState(redFlag ? "suggesting" : "collapsed");

  // Lets an external trigger (e.g. the "Find a specialist" button in
  // AssessmentSummary) open this flow the same way clicking our own
  // collapsed-state button does, instead of navigating away.
  useEffect(() => {
    if (forceOpen && phase === "collapsed") {
      setPhase("suggesting");
    }
  }, [forceOpen, phase]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Booking form state
  const dateOptions = useMemo(() => nextNDates(5), []);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].iso);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsEmptyReason, setSlotsEmptyReason] = useState(null); // "closed" | "full" | "unset" | "error" | null
  const [selectedTime, setSelectedTime] = useState(null);
  const selectedDay = dateOptions.find((d) => d.iso === selectedDate) || dateOptions[0];
  const [patient, setPatient] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confirmedDoctor, setConfirmedDoctor] = useState(null);

  // ── Fetch matching doctors once the flow is opened ──
  useEffect(() => {
    if (phase !== "suggesting") return;
    let cancelled = false;

    async function searchDoctors(q) {
      const params = new URLSearchParams({ specialisation: "Physio", limit: "3" });
      if (q) params.set("q", q);
      const res = await fetch(`${API_BASE}/api/doctor-auth/public/doctors?${params}`);
      const data = await res.json();
      return data.success ? data.data || [] : [];
    }

    async function fetchDoctors() {
      try {
        const keyword = deriveSearchTerm(conditionCategory);

        // 1) Try a condition-specific match first (e.g. "neck").
        let found = keyword ? await searchDoctors(keyword) : [];

        // 2) Fall back to any available physio rather than dead-ending —
        //    a general physio can still triage most of these conditions.
        if (found.length === 0) found = await searchDoctors("");

        if (cancelled) return;

        if (found.length > 0) {
          setDoctors(found);
          setPhase("listing");
        } else {
          setErrorMsg("No specialists available to match right now. Please try again shortly.");
          setPhase("error");
        }
      } catch {
        if (!cancelled) {
          setErrorMsg("Couldn't load specialists. Please check your connection and try again.");
          setPhase("error");
        }
      }
    }

    fetchDoctors();
    return () => {
      cancelled = true;
    };
  }, [phase, conditionCategory]);

  // ── Fetch open slots whenever doctor or date changes ──
  useEffect(() => {
    if (phase !== "details" || !selectedDoctor) return;
    let cancelled = false;

    async function fetchSlots() {
      setSlotsLoading(true);
      setSelectedTime(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/clinics/new-bookings/booked-slots?clinicId=${selectedDoctor._id}&date=${selectedDate}`
        );

        let bookedTimes = [];
        if (res.status === 404) {
          // The endpoint itself is missing/unmounted server-side. That's a
          // backend config problem, not a reason to block booking — this
          // route is only a double-booking guard, so fall back to "assume
          // nothing's booked" instead of hard-stopping the whole flow.
          console.warn(
            "[DoctorConsultFlow] /api/clinics/new-bookings/booked-slots returned 404 — double-check this route is mounted at that path. Proceeding without a booked-slots check."
          );
        } else if (!res.ok) {
          throw new Error(`booked-slots returned ${res.status}`);
        } else {
          const data = await res.json();
          if (!data.success) throw new Error(data.message || "booked-slots request failed");
          bookedTimes = data.bookedTimes || [];
        }

        if (cancelled) return;

        const now = new Date();
        const isToday = selectedDate === dateOptions[0].iso;
        const { slots: open, reason } = buildSlots({
          availability: selectedDoctor.availability,
          bookedTimes,
          dayName: selectedDay.dayName,
          isToday,
          nowMinutes: now.getHours() * 60 + now.getMinutes(),
        });
        setSlots(open);
        setSlotsEmptyReason(reason);
      } catch (err) {
        console.error("[DoctorConsultFlow] couldn't load slots:", err);
        if (!cancelled) {
          setSlots([]);
          setSlotsEmptyReason("error");
        }
      } finally {
        if (!cancelled) setSlotsLoading(false);
      }
    }

    fetchSlots();
    return () => {
      cancelled = true;
    };
  }, [phase, selectedDoctor, selectedDate]);

  function openFlow() {
    setPhase("suggesting");
  }

  function chooseDoctor(doc) {
    setSelectedDoctor(doc);
    setPhase("details");
  }

  const canSubmit =
    patient.name.trim().length > 1 &&
    /^\d{10}$/.test(patient.phone.replace(/\D/g, "").slice(-10)) &&
    selectedTime &&
    !submitting;

  async function handleBookAndPay() {
    if (!canSubmit) return;
    setSubmitting(true);
    setErrorMsg("");
    try {
      await loadRazorpay();

      const fee = selectedDoctor.single_session_price || selectedDoctor.session_pricing;
      if (!fee) throw new Error("This specialist's fee isn't set up yet — please pick another.");

      const dateLabel = selectedDay.label;

      // Send the ISO date (not the "Today"/"Tomorrow" label) — the backend
      // formats the WhatsApp confirmation with moment(booking.date), which
      // can't parse "Today" as a real date, and booked-slots checks future
      // bookings against this same date string, so it needs to stay a real
      // calendar date to correctly block the slot next time it's queried.
      const orderRes = await fetch(`${API_BASE}/api/clinics/new-bookings/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicId: selectedDoctor._id,
          doctorName: selectedDoctor.name,
          clinicName: selectedDoctor.role || "Zeromedixine",
          sessionType: "In-clinic",
          date: selectedDate,
          time: selectedTime,
          patientName: patient.name.trim(),
          patientPhone: patient.phone.trim(),
          patientEmail: patient.email.trim(),
          concern: conditionCategory,
          notes: summaryForPhysio || "",
          amount: fee,
          currency: "INR",
        }),
      });
      const order = await safeJson(orderRes, "create-order");
      if (!order.success) throw new Error(order.message || "Could not start payment.");

      setPhase("paying");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Zeromedixine",
        description: `Consultation with ${selectedDoctor.name}`,
        prefill: {
          name: patient.name.trim(),
          contact: patient.phone.trim(),
          email: patient.email.trim(),
        },
        theme: { color: "#3EC6B0" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_BASE}/api/clinics/new-bookings/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                appointmentId: order.appointmentId,
                physioAppointmentId: order.physioAppointmentId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verified = await safeJson(verifyRes, "verify-payment");
            if (!verified.success) throw new Error("Payment verification failed.");
            setConfirmedDoctor({ ...selectedDoctor, date: dateLabel, time: selectedTime });
            setPhase("confirmed");
          } catch (err) {
            setErrorMsg(err.message || "Payment succeeded but confirmation failed. We'll follow up on WhatsApp.");
            setPhase("error");
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setPhase("details");
          },
        },
      });

      rzp.on("payment.failed", () => {
        setSubmitting(false);
        setErrorMsg("Payment didn't go through. You can try again.");
        setPhase("details");
      });

      rzp.open();
    } catch (err) {
      setSubmitting(false);
      setErrorMsg(err.message || "Something went wrong starting checkout.");
      setPhase("details"); // no money has moved yet — keep their form filled in
    }
  }

  // ── Collapsed entry point (non-red-flag only) ──
  // if (phase === "collapsed") {
  //   return (
  //     <ChatCard tone="blue">
  //       <div className="flex items-center justify-between gap-3">
  //         <div className="flex items-center gap-2">
  //           <Stethoscope size={18} className="text-[#2F8FBE]" />
  //           <span>Want a physiotherapist to check this in person too?</span>
  //         </div>
  //         <button
  //           onClick={openFlow}
  //           className="flex shrink-0 items-center gap-1 rounded-lg bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] px-3 py-1.5 text-xs font-medium text-white"
  //         >
  //           Find a specialist <ChevronRight size={14} />
  //         </button>
  //       </div>
  //     </ChatCard>
  //   );
  // }

  if (phase === "suggesting") {
    return (
      <ChatCard tone={redFlag ? "red" : "blue"}>
        {redFlag && (
          <p className="mb-2 flex items-center gap-2 font-medium text-red-700">
            <AlertTriangle size={16} /> Let's get you seen soon.
          </p>
        )}
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 size={16} className="animate-spin" /> Finding specialists for {conditionCategory || "your condition"}…
        </div>
      </ChatCard>
    );
  }

  if (phase === "listing") {
    return (
      <ChatCard tone={redFlag ? "red" : "blue"}>
        {redFlag && (
          <p className="mb-3 flex items-center gap-2 font-medium text-red-700">
            <AlertTriangle size={16} /> We recommend booking a consultation now.
          </p>
        )}
        <p className="mb-3 text-xs text-gray-600">
          {redFlag
            ? "Here are specialists who can see you soon:"
            : `Here are physiotherapists who treat ${conditionCategory || "your condition"}:`}
        </p>
        <div className="space-y-2">
          {doctors.map((doc) => (
            <button
              key={doc._id}
              onClick={() => chooseDoctor(doc)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-3 text-left transition-colors hover:border-[#3EC6B0]"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-gray-800">{doc.name}</p>
                <p className="truncate text-xs text-gray-500">{doc.role}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs font-medium text-gray-600">
                  ₹{doc.single_session_price || doc.session_pricing || "—"}
                </span>
                <ChevronRight size={16} className="text-[#3EC6B0]" />
              </div>
            </button>
          ))}
        </div>
      </ChatCard>
    );
  }

  if (phase === "details" && selectedDoctor) {
    return (
      <ChatCard tone={redFlag ? "red" : "blue"}>
        <div className="mb-3 flex items-center gap-2">
          <Calendar size={16} className="text-[#2F8FBE]" />
          <p className="text-xs font-semibold text-gray-800">Book with {selectedDoctor.name}</p>
        </div>

        {/* Date picker */}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {dateOptions.map((d) => (
            <button
              key={d.iso}
              onClick={() => setSelectedDate(d.iso)}
              className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                selectedDate === d.iso
                  ? "border-transparent bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] text-white"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Time slots */}
        {slotsLoading ? (
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
            <Loader2 size={14} className="animate-spin" /> Loading available times…
          </div>
        ) : slots.length === 0 ? (
          <div className="mb-3 text-xs text-gray-500">
            {slotsEmptyReason === "closed" && `${selectedDoctor.name} doesn't see patients on ${selectedDay.dayName}s — try another date.`}
            {slotsEmptyReason === "full" && "Fully booked this day — try another date."}
            {slotsEmptyReason === "unset" && "This specialist's schedule isn't set up yet — please pick another doctor."}
            {slotsEmptyReason === "error" && (
              <span className="text-amber-600">
                Couldn't check availability just now — please try this date again.
              </span>
            )}
            {!slotsEmptyReason && "No open slots this day — try another date."}
          </div>
        ) : (
          <div className="mb-3 grid grid-cols-3 gap-2">
            {slots.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`rounded-lg border px-2 py-1.5 text-xs font-medium ${
                  selectedTime === t
                    ? "border-transparent bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] text-white"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Patient details */}
        <div className="space-y-2">
          <input
            value={patient.name}
            onChange={(e) => setPatient((p) => ({ ...p, name: e.target.value }))}
            placeholder="Full name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-[#3EC6B0] focus:outline-none"
          />
          <input
            value={patient.phone}
            onChange={(e) => setPatient((p) => ({ ...p, phone: e.target.value }))}
            placeholder="Phone number"
            type="tel"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-[#3EC6B0] focus:outline-none"
          />
          <input
            value={patient.email}
            onChange={(e) => setPatient((p) => ({ ...p, email: e.target.value }))}
            placeholder="Email (optional)"
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-[#3EC6B0] focus:outline-none"
          />
        </div>

        {errorMsg && <p className="mt-2 text-xs text-red-600">{errorMsg}</p>}

        <button
          onClick={handleBookAndPay}
          disabled={!canSubmit}
          className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] py-2.5 text-xs font-medium text-white disabled:opacity-50"
        >
          {submitting
            ? "Starting payment…"
            : `Pay ₹${selectedDoctor.single_session_price || selectedDoctor.session_pricing || "—"} & Book`}
        </button>
      </ChatCard>
    );
  }

  if (phase === "paying") {
    return (
      <ChatCard tone="blue">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Loader2 size={16} className="animate-spin" /> Waiting for payment to complete…
        </div>
      </ChatCard>
    );
  }

  if (phase === "confirmed" && confirmedDoctor) {
    return (
      <ChatCard tone="green">
        <div className="mb-1 flex items-center gap-2 text-emerald-700">
          <CheckCircle2 size={18} />
          <p className="font-semibold">Booking confirmed!</p>
        </div>
        <p className="text-xs text-gray-700">
          You're booked with <strong>{confirmedDoctor.name}</strong> on {confirmedDoctor.date} at{" "}
          {confirmedDoctor.time}.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Your video consultation link is on its way to you via WhatsApp.
        </p>
      </ChatCard>
    );
  }

  if (phase === "error") {
    return (
      <ChatCard tone="red">
        <p className="text-xs text-red-700">{errorMsg || "Something went wrong."}</p>
        <button
          onClick={() => setPhase(redFlag ? "suggesting" : "collapsed")}
          className="mt-2 text-xs font-medium text-[#2F8FBE] underline"
        >
          Try again
        </button>
      </ChatCard>
    );
  }

  return null;
}

const TONE_STYLES = {
  blue: "bg-[#2F8FBE]/10 text-gray-800",
  red: "bg-red-50 text-gray-800",
  green: "bg-emerald-50 text-gray-800",
};

function ChatCard({ tone, children }) {
  return (
    <div className={`rounded-2xl rounded-bl-sm px-4 py-3 text-xs ${TONE_STYLES[tone]}`}>{children}</div>
  );
}