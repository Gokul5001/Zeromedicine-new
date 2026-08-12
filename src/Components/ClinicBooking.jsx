// src/Components/ClinicBooking.jsx
// Route: /clinic/book/:clinicId

import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCurrency } from "../hooks/useCurrency";
import SignatureCanvas from "react-signature-canvas";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const BLUE = "#1e8fd3";
const TEAL = "#40d3b6";
const GRAD = `linear-gradient(135deg, ${BLUE}, ${TEAL})`;

const BASE = import.meta.env.VITE_BACKEND_URL || "";

// ── Razorpay script loader ────────────────────────────────────────────────────
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime12h(time24) {
  if (!time24) return "";
  const [h, m] = time24.split(":").map(Number);
  const ampm  = h < 12 ? "AM" : "PM";
  const hour  = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
const MONTHS   = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS     = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// function generateSlotsFromAvailability(doctor, dateISO) {
//   if (!doctor?.availability || !dateISO) return [];
//   const { days = [], start_time, end_time } = doctor.availability;
//   if (!start_time || !end_time) return [];

//   const selectedDay = DAY_NAMES[new Date(dateISO).getDay()];
//   if (days.length > 0 && !days.includes(selectedDay)) return [];

//   const [startH, startM] = start_time.split(":").map(Number);
//   const [endH, endM]     = end_time.split(":").map(Number);
//   const startTotal = startH * 60 + startM;
//   const endTotal   = endH   * 60 + endM;
//   if (startTotal > endTotal) return [];

//   const slots = [];
//   let h = startH, m = startM;
//   while (h * 60 + m <= endTotal) {
//     const hour12 = h % 12 === 0 ? 12 : h % 12;
//     const ampm   = h < 12 ? "AM" : "PM";
//     slots.push(`${hour12}:${String(m).padStart(2, "0")} ${ampm}`);
//     m += 30;
//     if (m >= 60) { m = 0; h++; }
//   }
//   return slots;
// }


// ── Step 4: Consent ───────────────────────────────────────────────────────────
// Add this import at the top of the file alongside other imports:
// import SignatureCanvas from "react-signature-canvas";

// function Step4Consent({ booking, setBooking, sigPadRef, onClearSig }) {
//   const consentLines = [
//     "I consent to assessment and treatment by Zeromedixine clinicians.",
//     "I understand the nature of the proposed treatment and its possible risks and side effects.",
//     "I understand that physiotherapy treatment may involve manual techniques, exercises, and advice.",
//     "I agree to inform the clinician of any changes in my health condition.",
//     "I understand that I may withdraw consent at any time.",
//     "I consent to my health information being stored securely and used for treatment purposes.",
//     "I agree to the use of my de-identified information for improving clinical care.",
//     "I understand that session recordings will not be made without my explicit consent.",
//     "I agree to contact Zeromedixine to reschedule or cancel appointments with adequate notice.",
//     "I confirm that the information I have provided is accurate to the best of my knowledge.",
//   ];

//   const toggle = (field) =>
//     setBooking(b => ({ ...b, consent: { ...b.consent, [field]: !b.consent?.[field] } }));

//   return (
//     <div style={{ maxWidth: 700, margin: "0 auto", animation: "fadeUp 0.35s ease-out both" }}>
//       <div className="bk-panel">
//         <h2 className="bk-panel-title">Consent for Assessment &amp; Treatment</h2>
//         <p style={{ fontSize: 13, color: "#64748b", margin: "8px 0 20px", lineHeight: 1.6 }}>
//           Please read the following carefully before signing.
//         </p>

//         {/* Scrollable consent text */}
//         <div style={{
//           maxHeight: 220, overflowY: "auto", padding: "14px 16px",
//           background: "#f8fbff", borderRadius: 12,
//           border: "1.5px solid rgba(0,0,0,0.07)",
//           marginBottom: 20,
//         }}>
//           {consentLines.map((line, i) => (
//             <p key={i} style={{ fontSize: 13, color: "#334155", margin: "0 0 10px", lineHeight: 1.6 }}>
//               <span style={{ color: BLUE, fontWeight: 600, marginRight: 6 }}>{i + 1}.</span>
//               {line}
//             </p>
//           ))}
//         </div>

//         {/* Checkboxes */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
//           {[
//             { key: "understood", label: "I have read and understood this consent form" },
//             { key: "agree",      label: "I agree to proceed with assessment and treatment at Zeromedixine" },
//           ].map(({ key, label }) => (
//             <label key={key} style={{
//               display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
//               padding: "12px 14px", borderRadius: 10,
//               background: booking.consent?.[key] ? `${BLUE}08` : "#f8fafc",
//               border: `1.5px solid ${booking.consent?.[key] ? BLUE : "rgba(0,0,0,0.08)"}`,
//               transition: "all 0.15s",
//             }}>
//               <div
//                 onClick={() => toggle(key)}
//                 style={{
//                   width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
//                   background: booking.consent?.[key] ? BLUE : "#fff",
//                   border: `2px solid ${booking.consent?.[key] ? BLUE : "#cbd5e1"}`,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   transition: "all 0.15s", cursor: "pointer",
//                 }}
//               >
//                 {booking.consent?.[key] && (
//                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round">
//                     <path d="M20 6L9 17l-5-5" />
//                   </svg>
//                 )}
//               </div>
//               <span style={{ fontSize: 13.5, color: "#1a2332", lineHeight: 1.5 }}>{label}</span>
//             </label>
//           ))}
//         </div>

//         {/* Signature */}
//         <div>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//             <label style={{ fontSize: 12.5, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.03em" }}>
//               Signature
//             </label>
//             <button
//               type="button"
//               onClick={onClearSig}
//               style={{
//                 fontSize: 12, color: "#94a3b8", background: "none", border: "1px solid #e2e8f0",
//                 borderRadius: 6, padding: "3px 10px", cursor: "pointer",
//               }}
//             >
//               Clear
//             </button>
//           </div>
//           <div style={{
//             border: `1.5px solid rgba(0,0,0,0.1)`, borderRadius: 12, overflow: "hidden",
//             background: "#fff", width: "100%", height: 160,
//           }}>
//        <SignatureCanvas
//   ref={sigPadRef}
//   penColor="black"
//   canvasProps={{ width: 660, height: 160, className: "sigCanvas" }}
// />
//           </div>
//           <p style={{ fontSize: 11, color: "#94a3b8", margin: "6px 0 0" }}>
//             Draw your signature above using a mouse or touch.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// REPLACE the existing generateSlotsFromAvailability function with this:
function generateSlotsFromAvailability(doctor, dateISO) {
  if (!doctor?.availability || !dateISO) return [];
  const { days = [], start_time, end_time } = doctor.availability;
  if (!start_time || !end_time) return [];

  const selectedDay = DAY_NAMES[new Date(dateISO).getDay()];
  if (days.length > 0 && !days.includes(selectedDay)) return [];

  const [startH, startM] = start_time.split(":").map(Number);
  const [endH, endM]     = end_time.split(":").map(Number);
  const startTotal = startH * 60 + startM;
  const endTotal   = endH   * 60 + endM;
  if (startTotal > endTotal) return [];

  // ── NEW: for today, only show future slots (30-min buffer) ──
  const now = new Date();
  const todayISO = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  const isToday = dateISO === todayISO;
  const nowMinutes = isToday ? now.getHours() * 60 + now.getMinutes() + 30 : 0; // 30-min buffer

  const slots = [];
  let h = startH, m = startM;
  while (h * 60 + m <= endTotal) {
    // Skip past slots (+ 30-min buffer) when date is today
    if (!isToday || (h * 60 + m) > nowMinutes) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm   = h < 12 ? "AM" : "PM";
      slots.push(`${hour12}:${String(m).padStart(2, "0")} ${ampm}`);
    }
    m += 30;
    if (m >= 60) { m = 0; h++; }
  }
  return slots;
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  const steps = [
    { n: 1, label: "Session type" },
    { n: 2, label: "Date & time"  },
    { n: 3, label: "Your details" },
    { n: 4, label: "Confirm"      },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 40 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s.n}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: current >= s.n ? GRAD : "#f1f5f9",
              color: current >= s.n ? "#fff" : "#94a3b8",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 600,
              border: current === s.n ? `2px solid ${BLUE}` : "2px solid transparent",
              boxShadow: current === s.n ? `0 0 0 3px ${BLUE}20` : "none",
              transition: "all 0.3s",
            }}>
              {current > s.n ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : s.n}
            </div>
            <span style={{
              fontSize: 11, fontWeight: current === s.n ? 600 : 400,
              color: current === s.n ? BLUE : "#94a3b8",
              whiteSpace: "nowrap", letterSpacing: "0.02em",
            }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              height: 2, width: 60, marginBottom: 20,
              background: current > s.n ? GRAD : "#e2e8f0",
              transition: "background 0.3s",
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Step 1: Session Type ──────────────────────────────────────────────────────
function Step1({ booking, setBooking, doctor, formatFee, formatPackagePrice, currency }) {
  const sessionTypes = ["Online (Video)"];

  // Pick the right packages array based on detected currency
  const packages = currency?.code === "INR"
    ? (doctor?.packages     || [])
    : (doctor?.packages_usd || []);

  return (
    <div className="bk-cols">
      <div className="bk-panel">
        <h2 className="bk-panel-title">What kind of session?</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
          {sessionTypes.map((type) => (
            <button
              key={type}
              className={`bk-option-btn${booking.sessionType === type ? " selected" : ""}`}
              onClick={() => setBooking(b => ({ ...b, sessionType: type }))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="bk-panel">
        <h2 className="bk-panel-title">You're booking with</h2>

        {/* Doctor summary card */}
        <div style={{
          marginTop: 20, padding: "20px",
          background: "#f8fbff", borderRadius: 16,
          border: `1px solid ${BLUE}18`,
          display: "flex", gap: 14, alignItems: "flex-start",
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%", overflow: "hidden",
            background: `${BLUE}18`, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {doctor?.profileImg ? (
              <img src={doctor.profileImg} alt={doctor.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : (
              <span style={{ fontSize: 20, fontWeight: 700, color: BLUE }}>
                {(doctor?.name || "D").replace(/^Dr\.?\s*/i, "")[0]}
              </span>
            )}
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#1a2332", margin: 0 }}>
              {doctor?.name || "Doctor"}
            </p>
            <p style={{ fontSize: 13, color: "#64748b", margin: "3px 0 0", lineHeight: 1.4 }}>
              {doctor?.role || doctor?.specialisation}
            </p>
            {doctor?.consultFee && (
              <p style={{ fontSize: 13, color: "#2e7d32", fontWeight: 600, margin: "6px 0 0" }}>
                1 Session — {formatFee(doctor.consultFee)}
              </p>
            )}
          </div>
        </div>

        {/* Availability info */}
        {doctor?.availability?.days?.length > 0 && (
          <div style={{ marginTop: 14, padding: "12px 14px", background: "#f0fdf4", borderRadius: 10, border: "1px solid #bbf7d0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span style={{ fontSize: 12, color: "#2e7d32", fontWeight: 600 }}>Availability</span>
            </div>
            <p style={{ fontSize: 12, color: "#166534", margin: "0 0 3px" }}>
              📅 {doctor.availability.days.join(", ")}
            </p>
            {doctor.availability.start_time && doctor.availability.end_time && (
              <p style={{ fontSize: 12, color: "#166534", margin: 0 }}>
                🕐 {formatTime12h(doctor.availability.start_time)} – {formatTime12h(doctor.availability.end_time)}
              </p>
            )}
          </div>
        )}

        {/* Session packages */}
  {/* Session packages — SELECTABLE */}
{packages.length > 0 && (
  <div style={{ marginTop: 14 }}>
    <div style={{
      fontSize: 12, fontWeight: 600, color: "#64748b",
      marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em",
    }}>
      Session packages
    </div>

    {/* Single session option */}
    <div
      onClick={() => setBooking(b => ({ ...b, selectedPackage: null }))}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "9px 12px", borderRadius: 10, cursor: "pointer",
        marginBottom: 6,
        background: !booking.selectedPackage ? `${BLUE}10` : "#f8fbff",
        border: !booking.selectedPackage ? `1.5px solid ${BLUE}` : `1px solid ${BLUE}15`,
        transition: "all 0.15s",
      }}
    >
      <span style={{ fontSize: 13, color: "#1a2332", fontWeight: 500 }}>
        1 session (single)
      </span>
      <span style={{ fontSize: 13, color: "#64748b" }}>
        {formatFee(doctor.consultFee)}
      </span>
    </div>

    {packages.map((p, i) => {
      const isSelected = booking.selectedPackage?.sessions === p.sessions;
      const total = p.price_per_session * p.sessions;
      return (
        <div
          key={i}
          onClick={() => setBooking(b => ({
            ...b,
            selectedPackage: {
              sessions: p.sessions,
              price_per_session: p.price_per_session,
              discount_percent: p.discount_percent,
              total_price: p.total_price || total,
            }
          }))}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "9px 12px", borderRadius: 10, cursor: "pointer",
            marginBottom: 6,
            background: isSelected ? `${BLUE}10` : "#f8fbff",
            border: isSelected ? `1.5px solid ${BLUE}` : `1px solid ${BLUE}15`,
            transition: "all 0.15s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isSelected && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            )}
            <span style={{ fontSize: 13, color: "#1a2332", fontWeight: 500 }}>
              {p.sessions} sessions
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>
              {formatPackagePrice(p.price_per_session)}/session
            </span>
            {Number(p.discount_percent) > 0 && (
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#15803d",
                background: "#f0fdf4", border: "1px solid #bbf7d0",
                borderRadius: 100, padding: "2px 7px",
              }}>
                -{p.discount_percent}%
              </span>
            )}
          </div>
        </div>
      );
    })}

    {booking.selectedPackage && (
      <div style={{
        marginTop: 8, padding: "10px 12px", borderRadius: 10,
        background: "#f0fdf4", border: "1px solid #bbf7d0",
        fontSize: 13, color: "#166534", fontWeight: 500,
      }}>
        Total: {formatPackagePrice(booking.selectedPackage.total_price)} for {booking.selectedPackage.sessions} sessions
      </div>
    )}

    <p style={{ fontSize: 11, color: "#94a3b8", margin: "6px 0 0" }}>
      Multi-session packages include a discount on per-session pricing.
    </p>
  </div>
)}
      </div>
    </div>
  );
}

// ── Step 2: Date & Time ───────────────────────────────────────────────────────
function Step2({ booking, setBooking, doctor, clinicId }) {
  const today = new Date();
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [bookedTimes, setBookedTimes]   = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const allowedDays = doctor?.availability?.days || [];

  useEffect(() => {
    if (!booking.date || !clinicId) { setBookedTimes([]); return; }
    let cancelled = false;
    setSlotsLoading(true);
    fetch(`${BASE}/api/clinics/new-bookings/booked-slots?clinicId=${clinicId}&date=${booking.date}`)
      .then(r => r.json())
      .then(d => { if (!cancelled && d.success) setBookedTimes(d.bookedTimes || []); })
      .catch(() => { if (!cancelled) setBookedTimes([]); })
      .finally(() => { if (!cancelled) setSlotsLoading(false); });
    return () => { cancelled = true; };
  }, [booking.date, clinicId]);

  const allSlots = generateSlotsFromAvailability(doctor, booking.date);
  const slots    = allSlots.filter(s => !bookedTimes.includes(s));

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay    = getFirstDayOfMonth(calYear, calMonth);

  const isDisabled = (day) => {
    const d = new Date(calYear, calMonth, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return true;
    if (allowedDays.length > 0 && !allowedDays.includes(DAY_NAMES[d.getDay()])) return true;
    return false;
  };

  const isSelected = (day) => {
    if (!booking.date) return false;
    return new Date(calYear, calMonth, day).toDateString() === new Date(booking.date).toDateString();
  };

  const selectDay = (day) => {
    if (isDisabled(day)) return;
    const pad = (n) => String(n).padStart(2, "0");
    setBooking(b => ({ ...b, date: `${calYear}-${pad(calMonth + 1)}-${pad(day)}`, time: "" }));
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  return (
    <div className="bk-cols">
      <div className="bk-panel">
        <h2 className="bk-panel-title">When would you like to consult?</h2>
        {allowedDays.length > 0 && (
          <p style={{ fontSize: 12, color: "#64748b", margin: "6px 0 0", lineHeight: 1.5 }}>
            <span style={{ color: "#2e7d32", fontWeight: 500 }}>Available days:</span>{" "}
            {allowedDays.join(", ")}
          </p>
        )}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <button className="bk-cal-nav" onClick={prevMonth}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span style={{ fontWeight: 600, fontSize: 15, color: "#1a2332" }}>
              {MONTHS[calMonth]} {calYear}
            </span>
            <button className="bk-cal-nav" onClick={nextMonth}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#94a3b8", padding: "4px 0", letterSpacing: "0.04em" }}>{d}</div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day      = i + 1;
              const disabled = isDisabled(day);
              const selected = isSelected(day);
              const isToday  = new Date(calYear, calMonth, day).toDateString() === today.toDateString();
              return (
                <button key={day} onClick={() => selectDay(day)} disabled={disabled} style={{
                  width: "100%", aspectRatio: "1", borderRadius: "50%", border: "none",
                  background: selected ? GRAD : isToday && !selected ? `${BLUE}10` : "transparent",
                  color: selected ? "#fff" : disabled ? "#d1d5db" : "#1a2332",
                  fontSize: 13.5, fontWeight: selected ? 600 : 400,
                  cursor: disabled ? "not-allowed" : "pointer",
                  outline: isToday && !selected ? `2px solid ${BLUE}40` : "none",
                  transition: "all 0.15s", fontFamily: "inherit",
                }} className={!disabled && !selected ? "bk-day-btn" : ""}>{day}</button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bk-panel">
        <h2 className="bk-panel-title">
          {booking.date
            ? `Slots for ${new Date(booking.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}`
            : "Select a date first"}
        </h2>

        {!booking.date && (
          <div style={{ marginTop: 40, textAlign: "center", color: "#cbd5e1" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p style={{ fontSize: 13, marginTop: 10 }}>Pick a date to see available slots</p>
          </div>
        )}

        {booking.date && slotsLoading && (
          <div style={{ marginTop: 24, padding: "14px 16px", background: "#f8fbff", borderRadius: 10, border: `1px solid ${BLUE}18` }}>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Checking availability…</p>
          </div>
        )}

        {booking.date && !slotsLoading && slots.length === 0 && (
          <div style={{ marginTop: 24, padding: "14px 16px", background: "#fff7ed", borderRadius: 10, border: "1px solid #fed7aa" }}>
            <p style={{ fontSize: 13, color: "#9a3412", margin: 0, lineHeight: 1.5 }}>
              No slots available on this day. Please pick another available date.
            </p>
          </div>
        )}

        {booking.date && !slotsLoading && slots.length > 0 && (
          <>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "8px 0 12px" }}>
              {slots.length} slots available · 30-min sessions
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxHeight: 360, overflowY: "auto", paddingRight: 4 }}>
              {slots.map((slot) => (
                <button key={slot}
                  onClick={() => setBooking(b => ({ ...b, time: slot }))}
                  className={`bk-slot-btn${booking.time === slot ? " selected" : ""}`}
                >{slot}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Step 3: Patient Details ───────────────────────────────────────────────────
function Step3({ booking, setBooking }) {
  const concerns = [
    "Back Pain","Neck Pain","Knee Pain","Shoulder Pain",
    "Sports Injury","Post-surgery rehab","Neurological condition",
    "General fitness","Other",
  ];
  const update = (field, val) => setBooking(b => ({ ...b, patient: { ...b.patient, [field]: val } }));

  return (
    <div className="bk-cols">
      <div className="bk-panel">
        <h2 className="bk-panel-title">Your contact details</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
          <div className="bk-field">
            <label className="bk-label">Full name *</label>
            <input className="bk-input" placeholder="e.g. Priya Sharma"
              value={booking.patient.name} onChange={e => update("name", e.target.value)} />
          </div>
          <div className="bk-field">
            <label className="bk-label">WhatsApp number *</label>
            <PhoneInput
              country={"in"}
              value={booking.patient.phone}
              onChange={(value) => update("phone", value)}
              enableSearch={true}
              inputClass="bk-input"
              inputStyle={{ width: "100%", height: 44, fontSize: 14, paddingLeft: 48 }}
              buttonStyle={{ borderRadius: "10px 0 0 10px" }}
              containerStyle={{ width: "100%" }}
            />
          </div>
          <div className="bk-field">
            <label className="bk-label">Email address</label>
            <input className="bk-input" type="email" placeholder="Optional"
              value={booking.patient.email} onChange={e => update("email", e.target.value)} />
          </div>
          <div className="bk-field">
            <label className="bk-label">Age</label>
            <input className="bk-input" type="number" placeholder="Your age" min={1} max={120}
              value={booking.patient.age} onChange={e => update("age", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="bk-panel">
        <h2 className="bk-panel-title">Chief concern</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
          {concerns.map(c => (
            <button key={c}
              className={`bk-option-btn compact${booking.patient.concern === c ? " selected" : ""}`}
              onClick={() => update("concern", c)}>{c}</button>
          ))}
        </div>
        <div className="bk-field" style={{ marginTop: 14 }}>
          <label className="bk-label">Additional notes</label>
          <textarea className="bk-input" style={{ height: 72, resize: "vertical", lineHeight: 1.5 }}
            placeholder="Any specific details about your condition..."
            value={booking.patient.notes} onChange={e => update("notes", e.target.value)} />
        </div>
      </div>
    </div>
  );
}

// ── Step 4: Confirm + Pay ─────────────────────────────────────────────────────
function Step4({ booking, doctor, onConfirm, loading, payStep, formatFee, currency }) {
  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const rows = [
    { label: "Patient",           value: booking.patient.name || "—" },
    { label: "Mobile",            value: booking.patient.phone ? `+${booking.patient.phone}` : "—" },
    { label: "Concern",           value: booking.patient.concern || "—" },
    { label: "Doctor",            value: doctor?.name || "—" },
    { label: "Session type",      value: booking.sessionType || "—" },
    { label: "Consultation Date", value: formatDate(booking.date) },
    { label: "Consultation Time", value: booking.time || "—" },
  ];

  const loadLabel = payStep === "booking"  ? "Creating booking…"
                  : payStep === "razorpay" ? "Opening payment gateway…"
                  : "Please wait…";

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{
        background: "#fff", borderRadius: 20,
        border: "1.5px solid rgba(0,0,0,0.08)", overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <div style={{ background: GRAD, padding: "20px 24px", display: "flex", alignItems: "center", gap: 14 }}>
          {doctor?.profileImg && (
            <img src={doctor.profileImg} alt={doctor.name}
              style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid rgba(255,255,255,0.5)", flexShrink: 0 }}
              onError={e => e.target.style.display = "none"} />
          )}
          <div>
            <p style={{ color: "#fff", fontSize: 17, fontWeight: 600, margin: 0 }}>Confirm your booking</p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: "3px 0 0" }}>Review details before submitting</p>
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {rows.map((r, i) => (
            <div key={r.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              padding: "11px 0",
              borderBottom: i < rows.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              gap: 12,
            }}>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, flexShrink: 0 }}>{r.label}</span>
              <span style={{ fontSize: 13.5, color: "#1a2332", fontWeight: 500, textAlign: "right" }}>{r.value}</span>
            </div>
          ))}

          {doctor?.consultFee && (
            <div style={{ marginTop: 16, padding: "14px 18px", background: "#f0fdf4", borderRadius: 12, border: "1px solid #bbf7d0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#2e7d32", fontWeight: 500 }}>Consultation fee</span>
                <span style={{ fontSize: 20, fontWeight: 600, color: "#2e7d32" }}>
                  {formatFee(doctor.consultFee)}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#16a34a", margin: "4px 0 0" }}>
                Secure payment via Razorpay · UPI / Cards / Netbanking
                {currency?.code !== "INR" && " · Charged in " + currency?.code}
              </p>
            </div>
          )}

          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 16, lineHeight: 1.6 }}>
            By confirming, you agree to our{" "}
            <a href="/terms_of_service" style={{ color: BLUE, textDecoration: "none" }}>Terms of Service</a>{" "}
            and <a href="/privacy-policy" style={{ color: BLUE, textDecoration: "none" }}>Privacy Policy</a>.
          </p>

          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              width: "100%", padding: "14px 0", marginTop: 20,
              borderRadius: 100, border: "none",
              background: loading ? "#94a3b8" : GRAD,
              color: "#fff", fontSize: 15, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.01em",
              boxShadow: loading ? "none" : "0 6px 20px rgba(30,143,211,0.35)",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}
            className={!loading ? "bk-confirm-btn" : ""}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  style={{ animation: "spin 1s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0110 10" />
                </svg>
                {loadLabel}
              </>
            ) : (
              <>
                Pay {doctor?.consultFee ? formatFee(doctor.consultFee) : ""} &amp; Confirm
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </>
            )}
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>Secured by Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────
function SuccessScreen({ booking, doctor, onHome }) {
  const isVideo = booking.sessionType === "Online (Video)";

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", padding: "90px 0 40px" }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "linear-gradient(135deg, #22c55e, #16a34a)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px",
        boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
        animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h2 style={{ fontSize: 28, fontWeight: 600, color: "#1a2332", margin: "0 0 10px", letterSpacing: "-0.4px" }}>
        Booking Confirmed!
      </h2>

      <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, margin: "0 0 28px" }}>
        Your {isVideo ? "video consultation" : "consultation"} with{" "}
        <strong style={{ color: "#1a2332" }}>{doctor?.name}</strong> is booked for{" "}
        <strong style={{ color: BLUE }}>
          {booking.date ? new Date(booking.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) : ""}
        </strong>{" "}
        at <strong style={{ color: BLUE }}>{booking.time}</strong>.
      </p>

      <div style={{
        background: "#f8fbff", borderRadius: 16, padding: "20px",
        border: `1px solid ${BLUE}18`, marginBottom: 28, textAlign: "left",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: 12, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#166534", margin: "0 0 3px" }}>Consultation link on WhatsApp</p>
            <p style={{ fontSize: 12.5, color: "#166534", margin: 0, lineHeight: 1.5 }}>
              Your {isVideo ? "video call" : "call"} link will be sent to{" "}
              <strong>+{booking.patient.phone}</strong> on WhatsApp before the session.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px" }}>
          <span style={{ fontSize: 18 }}>💳</span>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Payment received — you're all set!</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <span style={{ fontSize: 18 }}>🎥</span>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
            Keep your camera and mic ready 5 minutes before the session.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <span style={{ fontSize: 18 }}>📅</span>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>To reschedule or cancel, contact us via WhatsApp.</p>
        </div>
      </div>

      <button onClick={onHome} style={{
        padding: "13px 32px", borderRadius: 100,
        background: GRAD, color: "#fff", border: "none",
        fontSize: 14, fontWeight: 600, cursor: "pointer",
        boxShadow: "0 6px 20px rgba(30,143,211,0.32)",
      }}>
        Back to home
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ClinicBooking() {
  const { clinicId } = useParams();
  const location     = useLocation();
  const navigate     = useNavigate();

  const [step,      setStep]      = useState(1);
  const [submitted, setSubmitted] = useState(false);
  // const [showConsent, setShowConsent] = useState(false);

  const [loading,   setLoading]   = useState(false);
  const [payStep,   setPayStep]   = useState("");
  const [error,     setError]     = useState("");

  // ── Currency — must be called unconditionally at top level ─────────────────
  const { currency, formatFee, formatPackagePrice, loading: currencyLoading } = useCurrency();

  const [doctor, setDoctor] = useState(location.state?.doctor || null);

// In the main component, update initial booking state:
const [booking, setBooking] = useState({
  sessionType: "Online (Video)",
  selectedPackage: null,  // { sessions, price_per_session, discount_percent, total }
  date: "",
  time: "",
  patient: { name: "", phone: "", email: "", age: "", concern: "", notes: "" },
  // consent: { understood: false, agree: false },   // ← ADD THIS

});

  const appointmentIdRef = useRef(null);
  const sigPadRef        = useRef(null);   // ← ADD THIS


  // ── Re-map consultFee when currency resolves ───────────────────────────────
  // If doctor came via location.state it may have consultFeeINR / consultFeeUSD
  useEffect(() => {
    if (!doctor || currencyLoading) return;
    const isINR = currency.code === "INR";
    const correctFee = isINR
      ? (doctor.consultFeeINR || doctor.consultFee)
      : (doctor.consultFeeUSD || doctor.consultFee);
    if (correctFee !== doctor.consultFee) {
      setDoctor(prev => ({ ...prev, consultFee: correctFee }));
    }
  }, [currency.code, currencyLoading]);

  // ── Fetch doctor if not in state ───────────────────────────────────────────
  useEffect(() => {
    if (doctor || !clinicId || currencyLoading) return;
    fetch(`${BASE}/api/doctor-auth/public/doctors/${clinicId}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          const c      = d.data;
          const isINR  = currency.code === "INR";
          setDoctor({
            id:            c._id,
            name:          c.name,
            role:          c.role,
            specialisation: c.role,
            consultFee:    isINR
              ? (c.single_session_price || c.session_pricing)
              : (c.single_session_price_usd || null),
            consultFeeINR: c.single_session_price || c.session_pricing,
            consultFeeUSD: c.single_session_price_usd,
            packages:      c.packages     || [],
            packages_usd:  c.packages_usd || [],
            availability:  c.availability,
            profileImg:    c.profile_image,
            voice_note:    c.voice_note,
            years_of_experience: c.years_of_experience,
          });
        }
      })
      .catch(() => {});
  }, [clinicId, doctor, currency.code, currencyLoading]);

  // ── Ensure packages are loaded if doctor came via state without them ───────
  useEffect(() => {
    if (!doctor || !clinicId) return;
    const hasPkgs = (doctor.packages?.length > 0) || (doctor.packages_usd?.length > 0);
    if (!hasPkgs) {
      fetch(`${BASE}/api/doctor-auth/public/doctors/${clinicId}`)
        .then(r => r.json())
        .then(d => {
          if (d.success) {
            const c = d.data;
            setDoctor(prev => ({
              ...prev,
              packages:     c.packages     || [],
              packages_usd: c.packages_usd || [],
              // Also refresh fee fields if missing
              consultFeeINR: prev.consultFeeINR || c.single_session_price || c.session_pricing,
              consultFeeUSD: prev.consultFeeUSD || c.single_session_price_usd,
            }));
          }
        })
        .catch(() => {});
    }
  }, [doctor?.id]);

  // ── Prefill patient for logged-in users ───────────────────────────────────
  useEffect(() => {
    const prefill = (p) => {
      if (!p) return;
      setBooking(b => ({
        ...b,
        patient: {
          ...b.patient,
          name:  b.patient.name  || p.name  || "",
          phone: b.patient.phone || p.phone || "",
          email: b.patient.email || p.email || "",
          age:   b.patient.age   || (p.age != null ? String(p.age) : ""),
        },
      }));
    };

    if (location.state?.patient) prefill(location.state.patient);

    const token = localStorage.getItem("patientToken");
    if (!token) return;

    try {
      const cached = JSON.parse(localStorage.getItem("patientData") || "null");
      prefill(cached);
    } catch {}

    fetch(`${BASE}/api/patient-auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => {
        if (d.success && d.patient) {
          prefill(d.patient);
          localStorage.setItem("patientData", JSON.stringify(d.patient));
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Validation ────────────────────────────────────────────────────────────
  const canProceed = () => {
    if (step === 1) return !!booking.sessionType;
    if (step === 2) return !!booking.date && !!booking.time;
    if (step === 3) return !!booking.patient.name && booking.patient.phone.length >= 8;
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) {
      if (step === 2) setError("Please select both a date and a time slot.");
      if (step === 3) setError("Please fill in your name and a valid mobile number.");
      return;
    }
    setError("");
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setError("");
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const handleConsentContinue = async () => {
  //   if (!booking.consent?.understood || !booking.consent?.agree) {
  //     setError("Please tick both consent checkboxes before continuing.");
  //     return;
  //   }

  //   let sigDataUrl = null;
  //   try {
  //     const pad = sigPadRef.current;
  //     if (pad && typeof pad.isEmpty === "function" && !pad.isEmpty()) {
  //       try {
  //         sigDataUrl = pad.getTrimmedCanvas().toDataURL("image/png");
  //       } catch (trimErr) {
  //         console.warn("getTrimmedCanvas failed, using full canvas instead:", trimErr.message);
  //         sigDataUrl = pad.getCanvas().toDataURL("image/png");
  //       }
  //     }
  //   } catch (sigErr) {
  //     console.warn("Signature extraction failed (continuing without signature):", sigErr.message);
  //   }

  //   setBooking(b => ({ ...b, consent: { ...b.consent, sigDataUrl, submitted: true } }));

  //   const formData = new FormData();
  //   formData.append("name",    booking.patient.name);
  //   formData.append("age",     booking.patient.age  || "");
  //   formData.append("concern", booking.patient.concern || "");
  //   formData.append("contact", booking.patient.phone);
  //   formData.append("date",    new Date().toISOString().slice(0, 10));
  //   formData.append("sigDataUrl", sigDataUrl || "");

  //   fetch(`${BASE}/api/consent/inline`, { method: "POST", body: formData })
  //     .then(async (r) => {
  //       const d = await r.json().catch(() => ({}));
  //       if (!r.ok || !d.success) {
  //         console.error("Consent PDF upload failed:", d.message || r.status);
  //         return;
  //       }
  //       if (d.driveUrl) {
  //         setBooking(b => ({ ...b, consent: { ...b.consent, driveUrl: d.driveUrl } }));
  //       }
  //     })
  //     .catch((netErr) => console.error("Consent PDF upload network error:", netErr.message));

  //   setError("");
  //   setShowConsent(false);
  //   setSubmitted(true);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  // ── Payment flow ──────────────────────────────────────────────────────────
  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      setPayStep("booking");
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) throw new Error("Could not load Razorpay. Check your internet connection.");

      // doctor.consultFee is already in the correct currency (INR or USD)
      const chargeAmount = booking.selectedPackage
  ? Number(booking.selectedPackage.total_price || 0)
  : Number(doctor?.consultFee || 0);
      const chargeCurrency = currency.code;

      const res = await fetch(`${BASE}/api/clinics/new-bookings/create-order`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicId:     clinicId || doctor?.id,
          doctorName:   doctor?.name,
          sessionType:  booking.sessionType,
          date:         booking.date,
          time:         booking.time,
          patientName:  booking.patient.name,
          patientPhone: booking.patient.phone,
          patientEmail: booking.patient.email  || "",
          patientAge:   booking.patient.age    || "",
          concern:      booking.patient.concern || "",
          notes:        booking.patient.notes  || "",
          amount:       chargeAmount,
          currency:     chargeCurrency,
          bookingType: booking.selectedPackage ? "package" : "single",
          packageSessions: booking.selectedPackage?.sessions || 1,
          packagePricePerSession: booking.selectedPackage?.price_per_session || doctor?.consultFee,
          packageDiscountPercent: booking.selectedPackage?.discount_percent || 0,
          packageTotalAmount: chargeAmount,
          assignedBy:   doctor?.name,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || `Order creation failed (HTTP ${res.status})`);
      }

      const { success, orderId, amount, currency: orderCurrency, keyId, appointmentId, physioAppointmentId } = await res.json();
      if (!success || !orderId) throw new Error("Failed to create payment order. Please try again.");

      appointmentIdRef.current = appointmentId;
      setPayStep("razorpay");

      await new Promise((resolve, reject) => {
        const options = {
          key:         keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount,
          currency:    orderCurrency,
          order_id:    orderId,
          name:        "Zeromedixine",
          description: `${booking.sessionType} – ${booking.patient.concern || "Consultation"}`,
          image:       "/logo.png",
          prefill: {
            name:    booking.patient.name,
            contact: "+" + booking.patient.phone,
            email:   booking.patient.email || "",
          },
          notes: {
            clinicBookingId: appointmentId,
            sessionType:     booking.sessionType,
            concern:         booking.patient.concern,
          },
          theme:    { color: "#1e8fd3" },
          redirect: false,

          handler: async function (response) {
            try {
              const verifyRes = await fetch(`${BASE}/api/clinics/new-bookings/verify-payment`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  appointmentId,
                  physioAppointmentId,
                  razorpay_order_id:   response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature:  response.razorpay_signature,
                  sendWhatsApp:        true,
                }),
              });
              const verifyData = await verifyRes.json().catch(() => ({}));
              if (!verifyRes.ok || !verifyData.success) {
                reject(new Error(verifyData?.message || "Payment verification failed. Contact support."));
              } else {
                resolve(response);
              }
            } catch (verifyErr) {
              reject(verifyErr);
            }
          },

          modal: {
            ondismiss:     () => reject(new Error("DISMISSED")),
            confirm_close: true,
            escape:        true,
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (resp) => {
          reject(new Error(resp?.error?.description || "Payment failed. Please try again."));
        });
        rzp.open();
      });

      // setShowConsent(true);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (err) {
      if (err.message === "DISMISSED") {
        setError("Payment was cancelled. You can try again.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      setPayStep("");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600&display=swap');

        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes popIn   { from { transform:scale(0.7); opacity:0; } to { transform:scale(1); opacity:1; } }
        @keyframes spin    { to   { transform:rotate(360deg); } }

        .bk-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          animation: fadeUp 0.35s ease-out both;
        }
        @media (max-width: 640px) { .bk-cols { grid-template-columns: 1fr; } }

        .bk-panel {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid rgba(0,0,0,0.07);
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .bk-panel-title {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 17px; font-weight: 600; color: #1a2332; margin: 0; letter-spacing: -0.2px;
        }

        .bk-option-btn {
          width: 100%; padding: 13px 18px; border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.1); background: #fff; color: #1a2332;
          font-size: 14px; font-weight: 500; cursor: pointer;
          text-align: left; display: flex; align-items: center; gap: 10px;
          transition: all 0.15s; font-family: inherit;
        }
        .bk-option-btn.compact { padding: 10px 14px; font-size: 13.5px; }
        .bk-option-btn:hover   { border-color: ${BLUE}; color: ${BLUE}; background: ${BLUE}08; }
        .bk-option-btn.selected { border-color: ${BLUE}; background: ${BLUE}10; color: ${BLUE}; font-weight: 600; }

        .bk-cal-nav {
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1); background: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #64748b; transition: all 0.15s;
        }
        .bk-cal-nav:hover { border-color: ${BLUE}; color: ${BLUE}; background: ${BLUE}08; }

        .bk-day-btn:hover { background: ${BLUE}12 !important; color: ${BLUE} !important; }

        .bk-slot-btn {
          padding: 9px 8px; border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.1); background: #fff; color: #1a2332;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: all 0.15s; font-family: inherit; text-align: center;
        }
        .bk-slot-btn:hover { border-color: ${BLUE}; color: ${BLUE}; background: ${BLUE}08; }
        .bk-slot-btn.selected { background: ${GRAD}; color: #fff; border-color: transparent; font-weight: 600; box-shadow: 0 3px 10px ${BLUE}30; }

        .bk-field { display: flex; flex-direction: column; gap: 6px; }
        .bk-label { font-size: 12.5px; font-weight: 600; color: #64748b; letter-spacing: 0.03em; text-transform: uppercase; }
        .bk-input {
          padding: 11px 14px; border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.1);
          font-size: 14px; font-family: inherit; color: #1a2332; background: #fff;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
          width: 100%; box-sizing: border-box;
        }
        .bk-input:focus { border-color: ${BLUE}; box-shadow: 0 0 0 3px ${BLUE}15; }
        .bk-input::placeholder { color: #cbd5e1; }

        .bk-confirm-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(30,143,211,0.4) !important; }

        .bk-next-btn {
          padding: 13px 28px; border-radius: 100px; border: none; background: ${GRAD};
          color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 14px ${BLUE}30; transition: all 0.15s; letter-spacing: 0.01em;
        }
        .bk-next-btn:disabled { background: #e2e8f0; color: #94a3b8; box-shadow: none; cursor: not-allowed; }
        .bk-next-btn:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 8px 20px ${BLUE}40; }

        .bk-back-btn {
          padding: 12px 20px; border-radius: 100px; border: 1.5px solid rgba(0,0,0,0.1);
          background: transparent; color: #64748b; font-size: 14px; font-weight: 500;
          cursor: pointer; font-family: inherit;
          display: flex; align-items: center; gap: 6px; transition: all 0.15s;
        }
        .bk-back-btn:hover { border-color: ${BLUE}; color: ${BLUE}; }
      `}</style>

      <section style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #fff 40%)",
        minHeight: "100vh",
        padding: "48px 24px 80px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {!submitted && (
            <button
              onClick={() => step === 1 ? navigate(-1) : handleBack()}
              className="bk-back-btn"
              style={{ marginBottom: 28, background: "none", border: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = BLUE}
              onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
            >
              {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg> */}
              {/* {step === 1 ? "Back to doctors" : "Previous step"} */}
            </button>
          )}
{submitted ? (
            <SuccessScreen booking={booking} doctor={doctor} onHome={() => navigate("/")} />
          // ) : showConsent ? (
          //   <>
          //     <Step4Consent
          //       booking={booking}
          //       setBooking={setBooking}
          //       sigPadRef={sigPadRef}
          //       onClearSig={() => sigPadRef.current && sigPadRef.current.clear()}
          //     />

          //     {error && (
          //       <div style={{
          //         marginTop: 16, padding: "12px 16px",
          //         background: "#fef2f2", borderRadius: 10,
          //         border: "1px solid #fecaca", color: "#dc2626",
          //         fontSize: 13.5, display: "flex", alignItems: "center", gap: 8,
          //       }}>
          //         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          //           <circle cx="12" cy="12" r="10" />
          //           <line x1="12" y1="8" x2="12" y2="12" />
          //           <line x1="12" y1="16" x2="12.01" y2="16" />
          //         </svg>
          //         {error}
          //       </div>
          //     )}

          //     <div style={{
          //       display: "flex", justifyContent: "flex-end", alignItems: "center",
          //       marginTop: 28, paddingTop: 20,
          //       borderTop: "1px solid rgba(0,0,0,0.06)",
          //     }}>
          //       <button className="bk-next-btn" onClick={handleConsentContinue}>
          //         Continue to confirmation
          //         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          //           <path d="M5 12h14M12 5l7 7-7 7" />
          //         </svg>
          //       </button>
          //     </div>
          //   </>
          ) : (
            <>
              <StepIndicator current={step} />

              {step === 1 && (
                <Step1
                  booking={booking}
                  setBooking={setBooking}
                  doctor={doctor}
                  formatFee={formatFee}
                  formatPackagePrice={formatPackagePrice}
                  currency={currency}
                />
              )}
              {step === 2 && (
                <Step2
                  booking={booking}
                  setBooking={setBooking}
                  doctor={doctor}
                  clinicId={clinicId}
                />
              )}
              {step === 3 && <Step3 booking={booking} setBooking={setBooking} />}
              {step === 4 && (
                <Step4
                  booking={booking}
                  doctor={doctor}
                  onConfirm={handleConfirm}
                  loading={loading}
                  payStep={payStep}
                  formatFee={formatFee}
                  currency={currency}
                />
              )}

              {error && (
                <div style={{
                  marginTop: 16, padding: "12px 16px",
                  background: "#fef2f2", borderRadius: 10,
                  border: "1px solid #fecaca", color: "#dc2626",
                  fontSize: 13.5, display: "flex", alignItems: "center", gap: 8,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {step < 4 && (
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginTop: 28, paddingTop: 20,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <button className="bk-back-btn" onClick={() => step === 1 ? navigate(-1) : handleBack()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    {step === 1 ? "Back to doctors" : "Back"}
                  </button>
                  <button className="bk-next-btn" onClick={handleNext} disabled={!canProceed()}>
                    {step === 3 ? "Review booking" : "Continue"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}