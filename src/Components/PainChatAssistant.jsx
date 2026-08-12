// ============================================================
// Components/PainChatWidget.jsx
//
// Floating "Zero AI" bot bubble — sits fixed in the corner of the
// screen (mount it once in App.jsx, outside <Routes>, so it persists
// across page navigation — not just inside Home.jsx).
//
// Full flow, all inline (no page navigation):
//   [collapsed]  small round bot button, bottom-right
//   [click]      → not logged in  → inline phone + OTP login
//                → logged in      → "menu" (past chats + start new)
//   [start new]  → button-driven intake → submit → result
//   [past chat]  → fetches /api/assessment/:id and replays it read-only
//   [find a specialist] → matched doctors for the assessed condition
//   [book with doctor]  → date/time + single-or-package + Razorpay
//   [payment success]   → confirmation card, booking linked back to
//                          the Assessment doc server-side
//
// Persistence:
//   - Auth: same `patientToken` / `patientData` keys already used by
//     PatientLogin.jsx / PainChatAssistant.jsx — logging in here logs
//     the patient in everywhere else too.
//   - History: GET /api/assessment/history (server-side, per patient) —
//     this is the actual "chat history" store, not localStorage.
//   - In-progress intake: mirrored to sessionStorage so a refresh mid-
//     chat doesn't lose answers already given (see WIDGET_STATE_KEY).
//
// Teaser bubble lifecycle (collapsed state):
//   hidden → visible → leaving → hidden → (cooldown) → visible → ...
//   "leaving" plays a fade+settle exit animation before actually
//   unmounting, so it never just snaps out of existence — whether it
//   was auto-dismissed, closed with the ×, or dismissed by opening chat.
// ============================================================

import React, { useEffect, useRef, useState } from "react";

const TEAL  = "#3EC6B0";
const GREEN = "#2F8FBE";
const NAVY  = "#10243E";

const BASE = import.meta.env.VITE_BACKEND_URL || "";
const WIDGET_STATE_KEY = "zeroai_widget_inprogress";

// Teaser timing — tweak these to taste
const TEASER_INITIAL_DELAY_MS = 3000;   // delay before first show
const TEASER_AUTO_DISMISS_MS = 4000;   // how long it stays up before fading itself out
const TEASER_EXIT_MS = 320;            // must match the CSS exit animation duration below
const TEASER_COOLDOWN_MS = 25000;      // wait before showing it again after it hides

const CONDITION_ROUTES = {
  back: "/pain-relief/back-pain",
  neck: "/pain-relief/neck-pain",
  shoulder: "/pain-relief/shoulder-pain",
  knee: "/pain-relief/knee-pain",
  hip: "/clinics",
  other: "/clinics",
};

const CONDITION_LABELS = {
  back: "Back",
  neck: "Neck",
  shoulder: "Shoulder",
  hip: "Hip",
  knee: "Knee",
  other: "Something else",
};

const DURATION_OPTIONS = [
  { value: "<1w", label: "Less than a week" },
  { value: "1-2w", label: "1–2 weeks" },
  { value: "2-4w", label: "2–4 weeks" },
  { value: "1-3m", label: "1–3 months" },
  { value: "3m+", label: "3+ months" },
];

const STEPS = [
  {
    key: "condition",
    bot: "Hi! I'm Zero AI. What hurts today?",
    type: "options",
    options: Object.entries(CONDITION_LABELS).map(([value, label]) => ({ value, label })),
  },
  { key: "painScore", bot: "Got it. On a scale of 0–10, how bad is the pain right now?", type: "scale" },
  { key: "durationBucket", bot: "How long has this been going on?", type: "options", options: DURATION_OPTIONS },
  { key: "age", bot: "What's your age?", type: "number" },
  { key: "previousInjury", bot: "Any previous injury to this area?", type: "yesno" },
  { key: "numbness", bot: "Any numbness or tingling?", type: "yesno" },
  { key: "swelling", bot: "Any visible swelling?", type: "yesno" },
];

const SEVERITY_COLORS = {
  mild: { bg: "#dcfce7", color: "#166534" },
  moderate: { bg: "#fef3c7", color: "#92400e" },
  severe: { bg: "#fee2e2", color: "#991b1b" },
};

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function makeSessionId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function labelFor(step, value) {
  if (step.type === "options") return step.options.find((o) => o.value === value)?.label ?? String(value);
  if (step.type === "yesno") return value ? "Yes" : "No";
  if (step.type === "scale") return `${value} / 10`;
  return String(value);
}

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short" });
  } catch {
    return "";
  }
}

// ── Razorpay + slot-generation helpers ──────────────────────
function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function timeStrToMinutes(t) {
  const raw = String(t || "").trim();

  // 24-hour "HH:mm" or "H:mm" — this is what Doctor.availability actually stores
  // (e.g. "10:00", "19:00" — see the admin profile panel).
  let m = raw.match(/^(\d{1,2}):(\d{2})$/);
  if (m) {
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    return h * 60 + min;
  }

  // Fallback: 12-hour "h:mm AM/PM", in case some doctors have it stored that way
  m = raw.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (m) {
    let [, h, min, ap] = m;
    h = parseInt(h, 10);
    min = parseInt(min, 10);
    if (/PM/i.test(ap) && h !== 12) h += 12;
    if (/AM/i.test(ap) && h === 12) h = 0;
    return h * 60 + min;
  }

  return null;
}

function minutesToTimeStr(mins) {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, "0")} ${ap}`;
}

function generateSlots(startTime, endTime, intervalMin = 60) {
  const start = timeStrToMinutes(startTime);
  const end = timeStrToMinutes(endTime);
  if (start == null || end == null) return [];
  const slots = [];
  for (let t = start; t + intervalMin <= end; t += intervalMin) slots.push(minutesToTimeStr(t));
  return slots;
}

function nextAvailableDates(availableDays, count = 7) {
  const dates = [];
  let d = new Date();
  let guard = 0;
  while (dates.length < count && guard < 30) {
    const dayName = WEEKDAYS[d.getDay()];
    if (!availableDays?.length || availableDays.includes(dayName)) dates.push(new Date(d));
    d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    guard++;
  }
  return dates;
}

// ── small presentational bits ───────────────────────────────
function BotAvatar() {
  return (
    <div
      style={{
        width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
        background: `linear-gradient(135deg,${TEAL},${GREEN})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 1,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="12" rx="3" />
        <path d="M12 8V4" />
        <circle cx="12" cy="3" r="1.4" fill="#fff" stroke="none" />
        <circle cx="9" cy="14" r="1.4" fill="#fff" stroke="none" />
        <circle cx="15" cy="14" r="1.4" fill="#fff" stroke="none" />
        <path d="M9 18h6" />
      </svg>
    </div>
  );
}

function Bubble({ sender, children }) {
  const isBot = sender === "bot";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        justifyContent: isBot ? "flex-start" : "flex-end",
        marginBottom: 10,
        animation: "zeroai-msg-in 0.22s ease-out",
      }}
    >
      {isBot && <BotAvatar />}
      <div
        style={{
          maxWidth: "78%",
          padding: "9px 13px",
          borderRadius: isBot ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
          background: isBot ? "#f1f5f9" : `linear-gradient(90deg,${TEAL},${GREEN})`,
          color: isBot ? NAVY : "#fff",
          fontSize: 13.5,
          lineHeight: 1.45,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 10, animation: "zeroai-msg-in 0.22s ease-out" }}>
      <BotAvatar />
      <div
        style={{
          background: "#f1f5f9",
          borderRadius: "4px 14px 14px 14px",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#94a3b8",
              animation: "zeroai-typing-dot 1.1s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
function OptionButton({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 100,
        border: active ? `1.5px solid ${TEAL}` : "1.5px solid rgba(0,0,0,0.12)",
        background: active ? `${TEAL}15` : "#fff",
        color: active ? GREEN : NAVY,
        fontSize: 12.5,
        fontWeight: 700,
        cursor: "pointer",
        margin: "4px 6px 0 0",
        transition: "background 0.15s, border-color 0.15s, color 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function PrimaryBtn({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "11px",
        borderRadius: 100,
        border: "none",
        background: `linear-gradient(90deg,${TEAL},${GREEN})`,
        color: "#fff",
        fontSize: 13.5,
        fontWeight: 700,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.6 : 1,
        boxShadow: `0 4px 14px ${TEAL}40`,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function BackBar({ title, onBack, onClose }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      {onBack && (
        <button onClick={onBack} style={iconBtnStyle} aria-label="Back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      <div style={{ fontWeight: 700, color: NAVY, fontSize: 14, flex: 1 }}>{title}</div>
      <button onClick={onClose} style={iconBtnStyle} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

const iconBtnStyle = {
  width: 28, height: 28, borderRadius: 8, border: "none",
  background: "transparent", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

// ── inline login (phone → OTP), no page navigation ─────────
function InlineLogin({ onLoggedIn, onClose }) {
  const [stage, setStage] = useState("phone"); // phone | otp
  const [phone, setPhone] = useState("");
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const sendOtp = async () => {
    setError("");
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 8) {
      setError("Please enter a valid mobile number");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/patient-auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleaned }),
      });
      const data = await res.json();
      if (data.success) {
        setStage("otp");
        setTimeout(() => inputRefs.current[0]?.focus(), 50);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (code) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE}/api/patient-auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone: phone.replace(/\D/g, ""), otp: code }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("patientToken", data.token);
        localStorage.setItem("patientData", JSON.stringify(data.patient));
        onLoggedIn(data.patient, data.token);
      } else {
        setError(data.error || "Invalid OTP");
        setDigits(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDigit = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    setError("");
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
    if (val && next.every((d) => d !== "") && idx === 5) submitOtp(next.join(""));
  };

  return (
    <>
      <BackBar
        title={stage === "phone" ? "Log in to chat with Zero AI" : "Enter verification code"}
        onBack={stage === "otp" ? () => setStage("phone") : null}
        onClose={onClose}
      />
      <div style={{ padding: "18px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {stage === "phone" ? (
          <>
            <p style={{ fontSize: 12.5, color: "#64748b", textAlign: "center", margin: "0 0 14px", lineHeight: 1.5 }}>
              We'll text you a one-time code — this saves your assessment and chat history for next time.
            </p>
            <input
              type="tel"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendOtp()}
              style={inputStyle}
              autoFocus
            />
            {error && <p style={errorStyle}>{error}</p>}
            <PrimaryBtn onClick={sendOtp} disabled={loading || phone.length < 8} style={{ marginTop: 10 }}>
              {loading ? "Sending…" : "Send OTP"}
            </PrimaryBtn>
          </>
        ) : (
          <>
            <p style={{ fontSize: 12.5, color: "#64748b", textAlign: "center", margin: "0 0 14px" }}>
              Sent to <strong style={{ color: NAVY }}>{phone}</strong>
            </p>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digits[i] && i > 0) inputRefs.current[i - 1]?.focus();
                  }}
                  style={{
                    width: 34, height: 42, textAlign: "center", fontSize: 18, fontWeight: 700,
                    color: NAVY,
                    border: `2px solid ${d ? TEAL : "rgba(0,0,0,0.12)"}`, borderRadius: 10,
                    background: d ? `${TEAL}0d` : "#fafafa", outline: "none",
                  }}
                />
              ))}
            </div>
            {error && <p style={errorStyle}>{error}</p>}
            <PrimaryBtn onClick={() => submitOtp(digits.join(""))} disabled={loading || digits.some((d) => !d)}>
              {loading ? "Verifying…" : "Verify OTP"}
            </PrimaryBtn>
          </>
        )}
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 12,
  padding: "12px 14px", fontSize: 14, color: NAVY, outline: "none",
};
const errorStyle = { fontSize: 12, color: "#ef4444", margin: "8px 0 0", textAlign: "center", fontWeight: 500 };

// ── menu: past chats + start new ────────────────────────────
function ChatMenu({ patient, onStartNew, onOpenPast, onClose }) {
  const [history, setHistory] = useState(null); // null = loading
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("patientToken");
    fetch(`${BASE}/api/assessment/history`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => (d.success ? setHistory(d.assessments || []) : setError(d.error || "Couldn't load history")))
      .catch(() => setError("Network error"));
  }, []);

  return (
    <>
      <BackBar title={`Hi ${patient?.name ? patient.name.split(" ")[0] : "there"} 👋`} onClose={onClose} />
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        <PrimaryBtn onClick={onStartNew}>+ Start a new assessment</PrimaryBtn>

        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.4, margin: "18px 0 8px" }}>
          Past chats
        </div>

        {history === null && !error && <p style={{ fontSize: 13, color: "#94a3b8" }}>Loading…</p>}
        {error && <p style={{ fontSize: 13, color: "#ef4444" }}>{error}</p>}
        {history?.length === 0 && <p style={{ fontSize: 13, color: "#94a3b8" }}>No past assessments yet.</p>}

        {history?.map((a) => {
          const sev = SEVERITY_COLORS[a.severity] || SEVERITY_COLORS.mild;
          return (
            <button
              key={a._id}
              onClick={() => onOpenPast(a._id)}
              style={{
                width: "100%", textAlign: "left", background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12,
                padding: "10px 12px", marginBottom: 8, cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>
                  {a.conditionCategory || CONDITION_LABELS[a.intake?.condition] || "Assessment"}
                </span>
                <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: sev.bg, color: sev.color, textTransform: "capitalize", whiteSpace: "nowrap" }}>
                  {a.severity}
                </span>
              </div>
              <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 3 }}>{formatDate(a.createdAt)}</div>
            </button>
          );
        })}
      </div>
    </>
  );
}

// ── read-only replay of a past assessment ───────────────────
function PastChatView({ assessmentId, onBack, onClose }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("patientToken");
    fetch(`${BASE}/api/assessment/${assessmentId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => (d.success ? setData(d.assessment) : setError(d.error || "Couldn't load this chat")))
      .catch(() => setError("Network error"));
  }, [assessmentId]);

  return (
    <>
      <BackBar title="Past assessment" onBack={onBack} onClose={onClose} />
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        {!data && !error && <p style={{ fontSize: 13, color: "#94a3b8" }}>Loading…</p>}
        {error && <p style={{ fontSize: 13, color: "#ef4444" }}>{error}</p>}
        {data && (
          <>
            {(data.conversation || []).map((m, i) => (
              <Bubble key={i} sender={m.sender}>{m.text}</Bubble>
            ))}
            <div style={{ marginTop: 6 }}>
              <ResultCard assessment={data} condition={data.intake?.condition} compact />
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ── result card (shown after submit, and inside past-chat replay) ──
function ResultCard({ assessment, condition, compact, onFindSpecialist, onViewBookings }) {
  const sev = SEVERITY_COLORS[assessment.severity] || SEVERITY_COLORS.mild;
  const alreadyBooked = assessment?.booking?.status === "confirmed";

  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "14px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: sev.bg, color: sev.color, textTransform: "capitalize" }}>
          {assessment.severity} severity
        </span>
        {assessment.redFlag && (
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: "#fee2e2", color: "#991b1b" }}>
            ⚠ Seek prompt medical review
          </span>
        )}
        {alreadyBooked && (
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: "#dbeafe", color: "#1e40af" }}>
            ✓ Booked with {assessment.booking.doctorName}
          </span>
        )}
      </div>
      <div style={{ fontWeight: 700, color: NAVY, fontSize: 14.5, marginBottom: 4 }}>{assessment.conditionCategory}</div>
      <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.5, margin: "0 0 10px" }}>
        {assessment.patientSummary || assessment.description}
      </p>
      {assessment.redFlag && assessment.redFlagReason && (
        <p style={{ fontSize: 12, color: "#991b1b", background: "#fef2f2", padding: "8px 10px", borderRadius: 8, margin: "0 0 10px" }}>
          {assessment.redFlagReason}
        </p>
      )}
      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>
        Suggested specialist: <strong style={{ color: NAVY }}>{assessment.recommendedSpecialist}</strong>
      </div>
      {!compact && !alreadyBooked && (
        <>
          <PrimaryBtn onClick={onFindSpecialist}>
            Find a Specialist
          </PrimaryBtn>
          <button
            onClick={onViewBookings}
            style={{
              width: "100%", padding: "11px", borderRadius: 100, marginTop: 8,
              border: "1.5px solid rgba(0,0,0,0.12)", background: "#fff", color: NAVY,
              fontSize: 13.5, fontWeight: 700, cursor: "pointer",
            }}
          >
            View My Bookings
          </button>
        </>
      )}
      {!compact && alreadyBooked && (
        <button
          onClick={onViewBookings}
          style={{
            width: "100%", padding: "11px", borderRadius: 100, marginTop: 4,
            border: "1.5px solid rgba(0,0,0,0.12)", background: "#fff", color: NAVY,
            fontSize: 13.5, fontWeight: 700, cursor: "pointer",
          }}
        >
          View My Bookings
        </button>
      )}
    </div>
  );
}

// ── specialist matches for the assessed condition ───────────
function SpecialistList({ condition, onBack, onClose, onSelectDoctor }) {
  const [doctors, setDoctors] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE}/api/doctor-auth/public/doctors?condition=${encodeURIComponent(condition || "")}&limit=8`)
      .then((r) => r.json())
      .then((d) => (d.success ? setDoctors(d.data || []) : setError(d.error || "Couldn't load specialists")))
      .catch(() => setError("Network error"));
  }, [condition]);

  return (
    <>
      <BackBar title="Recommended specialists" onBack={onBack} onClose={onClose} />
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        {doctors === null && !error && <p style={{ fontSize: 13, color: "#94a3b8" }}>Finding specialists…</p>}
        {error && <p style={{ fontSize: 13, color: "#ef4444" }}>{error}</p>}
        {doctors?.length === 0 && <p style={{ fontSize: 13, color: "#94a3b8" }}>No matching specialists found right now.</p>}

        {doctors?.map((doc) => (
          <div
            key={doc.doctor_id}
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 12, marginBottom: 10 }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {doc.profile_image ? (
                <img
                  src={doc.profile_image}
                  alt={doc.name}
                  style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                />
              ) : (
                <div
                  style={{
                    width: 44, height: 44, borderRadius: "50%", background: `${TEAL}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, color: TEAL, flexShrink: 0,
                  }}
                >
                  {doc.name?.[0] || "D"}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: NAVY, fontSize: 13.5 }}>{doc.name}</div>
                <div style={{ fontSize: 11.5, color: "#64748b" }}>
                  {doc.role} · {doc.years_of_experience || 0}+ yrs
                </div>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: TEAL, whiteSpace: "nowrap" }}>
                ₹{doc.single_session_price || doc.session_pricing || "—"}
              </div>
            </div>
            <PrimaryBtn style={{ marginTop: 10 }} onClick={() => onSelectDoctor(doc)}>
              Book with {doc.name?.split(" ")[0]}
            </PrimaryBtn>
          </div>
        ))}
      </div>
    </>
  );
}

// ── inline booking: date/time + single-or-package + Razorpay ─
function BookingPanel({ doctor, assessment, patient, onBack, onClose, onBooked }) {
  const [sessionType, setSessionType] = useState("single");
  const [packageOption, setPackageOption] = useState(doctor.packages?.[0] || null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  const dates = nextAvailableDates(doctor.availability?.days, 7);
  const slots = generateSlots(doctor.availability?.start_time, doctor.availability?.end_time, 60)
    .filter((t) => !bookedTimes.includes(t));

  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().slice(0, 10);
    fetch(`${BASE}/api/clinics/new-bookings/booked-slots?clinicId=${doctor.doctor_id}&date=${dateStr}`)
      .then((r) => r.json())
      .then((d) => setBookedTimes(d.bookedTimes || []))
      .catch(() => setBookedTimes([]));
  }, [selectedDate, doctor.doctor_id]);

  const price =
    sessionType === "package" && packageOption
      ? packageOption.total_price ?? packageOption.price
      : doctor.single_session_price || doctor.session_pricing;

  const packageSessionsCount = sessionType === "package" ? (packageOption?.sessions || 1) : 1;

  async function payNow() {
    if (!selectedDate || !selectedTime) {
      setError("Pick a date and time first");
      return;
    }
    setError("");
    setPaying(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) {
        setError("Couldn't load payment gateway. Check your connection.");
        setPaying(false);
        return;
      }

      const dateStr = selectedDate.toISOString().slice(0, 10);
      const orderRes = await fetch(`${BASE}/api/clinics/new-bookings/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicId: doctor.doctor_id,
          doctorName: doctor.name,
          clinicName: doctor.name,
          sessionType: "Online (Video)",
          date: dateStr,
          time: selectedTime,
          patientName: patient?.name || "Patient",
          patientPhone: patient?.phone,
          patientEmail: patient?.email || "",
          patientAge: patient?.age || "",
          concern: assessment?.conditionCategory || "",
          amount: price,
          currency: "INR",
          bookingType: sessionType,
          packageSessions: packageSessionsCount,
          packagePricePerSession: packageOption?.price_per_session,
          packageTotalAmount: sessionType === "package" ? price : undefined,
          assessmentId: assessment?._id || assessment?.id,
        }),
      });
      const order = await orderRes.json();
      if (!order.success) {
        setError(order.message || "Couldn't create order");
        setPaying(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: doctor.name,
        description: assessment?.conditionCategory || "Physio consultation",
        prefill: { name: patient?.name, contact: patient?.phone, email: patient?.email },
        theme: { color: TEAL },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${BASE}/api/clinics/new-bookings/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                appointmentId: order.appointmentId,
                physioAppointmentId: order.physioAppointmentId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                assessmentId: assessment?._id || assessment?.id,
              }),
            });
            const verify = await verifyRes.json();
            if (verify.success) {
              onBooked({
                doctor,
                date: dateStr,
                time: selectedTime,
                sessionType,
                physioAppointmentId: order.physioAppointmentId,
              });
            } else {
              setError(verify.message || "Payment verification failed");
            }
          } catch {
            setError("Network error confirming payment.");
          } finally {
            setPaying(false);
          }
        },
        modal: { ondismiss: () => setPaying(false) },
      });
      rzp.open();
    } catch {
      setError("Something went wrong starting payment.");
      setPaying(false);
    }
  }

  return (
    <>
      <BackBar title={`Book with ${doctor.name}`} onBack={onBack} onClose={onClose} />
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
      {doctor.packages?.length > 0 && (
  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
    <OptionButton active={sessionType === "single"} onClick={() => setSessionType("single")}>
      Single session
    </OptionButton>
    <OptionButton active={sessionType === "package"} onClick={() => setSessionType("package")}>
      Package
    </OptionButton>
  </div>
)}
{sessionType === "package" && doctor.packages?.length > 0 && (
  <div style={{ marginBottom: 12 }}>
    {doctor.packages.map((p, i) => (
      <OptionButton
        key={i}
        active={packageOption === p}
        onClick={() => setPackageOption(p)}
      >
        {p.sessions} sessions – ₹{p.total_price ?? p.price}
      </OptionButton>
    ))}
  </div>
)}

{sessionType === "package" && (
  <div
    style={{
      display: "flex",
      gap: 8,
      alignItems: "flex-start",
      background: "#f0fdfa",
      border: `1px solid ${TEAL}33`,
      borderRadius: 10,
      padding: "10px 12px",
      marginBottom: 14,
    }}
  >
    <span style={{ fontSize: 14, lineHeight: 1 }}>ℹ️</span>
    <p style={{ fontSize: 11.5, color: "#0f766e", lineHeight: 1.5, margin: 0 }}>
      The date and time you pick below is for your <strong>first session only</strong>.
      Your remaining {packageOption?.sessions ? packageOption.sessions - 1 : ""} session
      {packageOption?.sessions && packageOption.sessions - 1 !== 1 ? "s" : ""} will be
      scheduled after discussing with your physiotherapist during the first session.
    </p>
  </div>
)}

        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", margin: "4px 0 8px" }}>
          Pick a date
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
          {dates.map((d) => {
            const active = selectedDate?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toISOString()}
                onClick={() => {
                  setSelectedDate(d);
                  setSelectedTime(null);
                }}
                style={{
                  flexShrink: 0, padding: "8px 12px", borderRadius: 12,
                  border: active ? `1.5px solid ${TEAL}` : "1.5px solid rgba(0,0,0,0.1)",
                  background: active ? `${TEAL}12` : "#fff", cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 10.5, color: "#94a3b8" }}>
                  {d.toLocaleDateString(undefined, { weekday: "short" })}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{d.getDate()}</div>
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", margin: "14px 0 8px" }}>
              Pick a time
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {slots.length === 0 && <p style={{ fontSize: 12.5, color: "#94a3b8" }}>No slots left this day.</p>}
              {slots.map((t) => (
  <OptionButton key={t} active={selectedTime === t} onClick={() => setSelectedTime(t)}>
    {t}
  </OptionButton>
))}
            </div>
          </>
        )}

        {error && <p style={{ fontSize: 12.5, color: "#ef4444", marginTop: 12 }}>{error}</p>}

        <div style={{ marginTop: 18, padding: 12, background: "#f8fafc", borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: NAVY, fontWeight: 700 }}>
            <span>Total</span>
            <span>₹{price || "—"}</span>
          </div>
        </div>

        <PrimaryBtn style={{ marginTop: 12 }} disabled={paying || !selectedDate || !selectedTime} onClick={payNow}>
  {paying
    ? "Processing…"
    : sessionType === "package"
    ? `Pay ₹${price || ""} & Confirm First Session`
    : `Pay ₹${price || ""} & Confirm`}
</PrimaryBtn>
      </div>
    </>
  );
}

// ── post-payment confirmation ────────────────────────────────
function BookingConfirmed({ info, onClose, onDone }) {
  return (
    <>
      <BackBar title="Booking confirmed 🎉" onClose={onClose} />
      <div style={{ padding: "20px 16px", flex: 1 }}>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
            You're booked with {info?.doctor?.name}
          </div>
          <div style={{ fontSize: 13, color: "#64748b" }}>
            {info?.date} at {info?.time} · {info?.sessionType === "package" ? "Package (session 1)" : "Single session"}
          </div>
        </div>
        <PrimaryBtn style={{ marginTop: 16 }} onClick={() => (window.location.href = "/patient/bookings")}>
          View My Bookings
        </PrimaryBtn>
        <button
          onClick={onDone}
          style={{
            width: "100%", marginTop: 8, background: "none", border: "none",
            color: "#94a3b8", fontSize: 12.5, cursor: "pointer", textDecoration: "underline",
          }}
        >
          Back to chat menu
        </button>
      </div>
    </>
  );
}

// ── live intake chat ─────────────────────────────────────────
function LiveChat({ onClose, onBack, onDone, onFindSpecialist }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [conversation, setConversation] = useState([{ sender: "bot", text: STEPS[0].bot }]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [assessment, setAssessment] = useState(null);
  const [numberDraft, setNumberDraft] = useState("");
  const [isAdvancing, setIsAdvancing] = useState(false);
  const sessionIdRef = useRef(makeSessionId());
  const bodyRef = useRef(null);

  // Restore in-progress answers (e.g. after an accidental refresh)
  useEffect(() => {
    const saved = sessionStorage.getItem(WIDGET_STATE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.conversation?.length) {
          setConversation(parsed.conversation);
          setAnswers(parsed.answers || {});
          setStepIndex(parsed.stepIndex || 0);
          sessionIdRef.current = parsed.sessionId || sessionIdRef.current;
        }
      } catch {
        /* ignore corrupt cache */
      }
    }
  }, []);

  // Mirror progress to sessionStorage as it changes (cleared on submit)
  useEffect(() => {
    if (assessment) return;
    sessionStorage.setItem(
      WIDGET_STATE_KEY,
      JSON.stringify({ conversation, answers, stepIndex, sessionId: sessionIdRef.current })
    );
  }, [conversation, answers, stepIndex, assessment]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [conversation, assessment, submitting, isAdvancing]);

  const currentStep = STEPS[stepIndex];

  function pushBot(text) {
    setConversation((c) => [...c, { sender: "bot", text }]);
  }
  function pushPatient(text) {
    setConversation((c) => [...c, { sender: "patient", text }]);
  }

  function answerStep(rawValue) {
    const step = STEPS[stepIndex];
    pushPatient(labelFor(step, rawValue));
    const nextAnswers = { ...answers, [step.key]: rawValue };
    setAnswers(nextAnswers);
    const nextIndex = stepIndex + 1;
    if (nextIndex < STEPS.length) {
      setIsAdvancing(true);
      setTimeout(() => {
        pushBot(STEPS[nextIndex].bot);
        setStepIndex(nextIndex);
        setIsAdvancing(false);
      }, 600);
    } else {
      setStepIndex(nextIndex);
      submitAssessment(nextAnswers);
    }
  }

  async function submitAssessment(finalAnswers) {
    setSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("patientToken");
      const res = await fetch(`${BASE}/api/assessment/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          intake: {
            condition: finalAnswers.condition,
            painScore: finalAnswers.painScore,
            durationBucket: finalAnswers.durationBucket,
            age: finalAnswers.age,
            previousInjury: finalAnswers.previousInjury,
            numbness: finalAnswers.numbness,
            swelling: finalAnswers.swelling,
          },
          conversation,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAssessment(data.assessment);
        sessionStorage.removeItem(WIDGET_STATE_KEY);
        onDone?.();
      } else {
        setError(data.error || "Something went wrong generating your assessment.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <BackBar title="Zero AI" onBack={onBack} onClose={onClose} />
      <div ref={bodyRef} style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        {conversation.map((m, i) => (
          <Bubble key={i} sender={m.sender}>{m.text}</Bubble>
        ))}
        {(isAdvancing || submitting) && <TypingIndicator />}
        {error && (
          <Bubble sender="bot">
            {error}{" "}
            <button
              onClick={() => submitAssessment(answers)}
              style={{ marginLeft: 6, background: "none", border: "none", color: TEAL, fontWeight: 700, cursor: "pointer" }}
            >
              Retry
            </button>
          </Bubble>
        )}
        {assessment && (
          <div style={{ marginTop: 6 }}>
            <ResultCard
              assessment={assessment}
              condition={answers.condition}
              onFindSpecialist={() => onFindSpecialist(assessment)}
              onViewBookings={() => (window.location.href = "/patient/bookings")}
            />
          </div>
        )}
      </div>

      {!assessment && !submitting && !isAdvancing && currentStep && (
        <div style={{ padding: "10px 14px 14px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          {currentStep.type === "options" && (
            <div>{currentStep.options.map((opt) => (
              <OptionButton key={opt.value} onClick={() => answerStep(opt.value)}>{opt.label}</OptionButton>
            ))}</div>
          )}
          {currentStep.type === "yesno" && (
            <div>
              <OptionButton onClick={() => answerStep(true)}>Yes</OptionButton>
              <OptionButton onClick={() => answerStep(false)}>No</OptionButton>
            </div>
          )}
          {currentStep.type === "scale" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {Array.from({ length: 11 }, (_, n) => n).map((n) => (
                <OptionButton key={n} onClick={() => answerStep(n)}>{n}</OptionButton>
              ))}
            </div>
          )}
          {currentStep.type === "number" && (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="number" min={0} max={120} placeholder="Age in years"
                value={numberDraft}
                onChange={(e) => setNumberDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const n = parseInt(numberDraft, 10);
                    if (!isNaN(n) && n > 0 && n <= 120) { setNumberDraft(""); answerStep(n); }
                  }
                }}
                style={{ ...inputStyle, flex: 1 }}
              />
              <PrimaryBtn
                style={{ width: "auto", padding: "0 18px" }}
                onClick={() => {
                  const n = parseInt(numberDraft, 10);
                  if (!isNaN(n) && n > 0 && n <= 120) { setNumberDraft(""); answerStep(n); }
                }}
              >
                Next
              </PrimaryBtn>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ── attention-grabbing teaser bubble (collapsed state) ──────
// phase is one of "visible" | "leaving" — parent unmounts on "hidden"
function TeaserBubble({ text, phase, onClose, onClick }) {
  const isLeaving = phase === "leaving";
  return (
    <div
      onClick={isLeaving ? undefined : onClick}
      style={{
        position: "absolute",
        bottom: 70,
        right: 0,
        width: 216,
        background: "#fff",
        borderRadius: 16,
        padding: "12px 30px 12px 14px",
        boxShadow: "0 10px 30px rgba(16,36,62,0.22)",
        cursor: isLeaving ? "default" : "pointer",
        pointerEvents: isLeaving ? "none" : "auto",
        animation: isLeaving
          ? `zeroai-teaser-out ${TEASER_EXIT_MS}ms ease-in forwards`
          : "zeroai-teaser-in 0.35s cubic-bezier(0.34,1.56,0.64,1), zeroai-teaser-bob 2.6s ease-in-out 0.35s infinite",
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Dismiss"
        style={{
          position: "absolute", top: 6, right: 6, width: 20, height: 20,
          borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.06)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div style={{ fontSize: 12.5, lineHeight: 1.45, color: NAVY, fontWeight: 400 }}>
        {text}
      </div>
      <div
        style={{
          position: "absolute", bottom: -7, right: 22, width: 14, height: 14,
          background: "#fff", transform: "rotate(45deg)",
          boxShadow: "3px 3px 6px rgba(16,36,62,0.06)",
        }}
      />
    </div>
  );
}

// ── bot bubble icon (collapsed state) ───────────────────────
function BotButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Chat with Zero AI"
      style={{
        width: 58, height: 58, borderRadius: "50%", border: "none", cursor: "pointer",
        background: `linear-gradient(135deg,${TEAL},${GREEN})`,
        boxShadow: `0 8px 24px ${TEAL}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}
    >
      <span style={{
        position: "absolute", inset: -4, borderRadius: "50%",
        border: `2px solid ${TEAL}55`, animation: "zeroai-pulse 2.2s ease-out infinite",
      }} />
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="12" rx="3" />
        <path d="M12 8V4" />
        <circle cx="12" cy="3" r="1.4" fill="#fff" stroke="none" />
        <circle cx="9" cy="14" r="1.4" fill="#fff" stroke="none" />
        <circle cx="15" cy="14" r="1.4" fill="#fff" stroke="none" />
        <path d="M9 18h6" />
      </svg>
    </button>
  );
}

// ── main widget ───────────────────────────────────────────────
export default function PainChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("menu"); // login | menu | chat | past | specialists | booking | booked
  const [pastId, setPastId] = useState(null);
  const [patient, setPatient] = useState(null);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);

  // Teaser bubble now has 3 phases instead of a boolean, so it can play
  // a proper exit animation before disappearing instead of vanishing
  // instantly: "hidden" -> "visible" -> "leaving" -> "hidden" -> ...
  const [teaserPhase, setTeaserPhase] = useState("hidden");

  // Show it a couple seconds after the widget is closed
  useEffect(() => {
    if (open) {
      setTeaserPhase("hidden");
      return;
    }
    const showTimer = setTimeout(() => setTeaserPhase("visible"), TEASER_INITIAL_DELAY_MS);
    return () => clearTimeout(showTimer);
  }, [open]);

  // Auto-dismiss (fade out) after it's had its moment on screen, so it
  // doesn't sit there indefinitely annoying the user
  useEffect(() => {
    if (teaserPhase !== "visible") return;
    const t = setTimeout(() => setTeaserPhase("leaving"), TEASER_AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [teaserPhase]);

  // Let the exit animation finish playing, then actually unmount it
  useEffect(() => {
    if (teaserPhase !== "leaving") return;
    const t = setTimeout(() => setTeaserPhase("hidden"), TEASER_EXIT_MS);
    return () => clearTimeout(t);
  }, [teaserPhase]);

  // Bring it back after a cooldown once it's fully hidden (widget still closed) —
  // keeps drawing people back in, same as before, just no longer skips the fade.
  useEffect(() => {
    if (open || teaserPhase !== "hidden") return;
    const cooldownTimer = setTimeout(() => setTeaserPhase("visible"), TEASER_COOLDOWN_MS);
    return () => clearTimeout(cooldownTimer);
  }, [open, teaserPhase]);

  function dismissTeaser() {
    // only animate out if it's actually showing — avoid re-triggering mid-exit
    setTeaserPhase((p) => (p === "visible" ? "leaving" : p));
  }

  // Resume an in-progress chat automatically if one exists for this browser
  const hasInProgress = () => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(WIDGET_STATE_KEY) || "null");
      return !!saved?.conversation?.length;
    } catch {
      return false;
    }
  };

  function openWidget() {
    dismissTeaser();
    const token = localStorage.getItem("patientToken");
    if (!token) {
      setView("login");
    } else {
      const stored = (() => {
        try { return JSON.parse(localStorage.getItem("patientData") || "null"); } catch { return null; }
      })();
      setPatient(stored);
      setView(hasInProgress() ? "chat" : "menu");
    }
    setOpen(true);
  }

  function handleLoggedIn(patientData) {
    setPatient(patientData);
    setView(hasInProgress() ? "chat" : "menu");
  }

  return (
    <div style={{ position: "fixed", bottom: 90, right: 20, zIndex: 9999 }}>
      <style>{`
        @keyframes zeroai-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes zeroai-msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zeroai-typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes zeroai-teaser-in {
          from { opacity: 0; transform: translateY(10px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes zeroai-teaser-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes zeroai-teaser-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(8px) scale(0.92); }
        }
      `}</style>

      {!open && (
        <div style={{ position: "relative" }}>
          {teaserPhase !== "hidden" && (
            <TeaserBubble
              text="Got pain ? Chat with Zero AI for a free assessment 👋"
              phase={teaserPhase}
              onClose={dismissTeaser}
              onClick={openWidget}
            />
          )}
          <BotButton onClick={openWidget} />
        </div>
      )}

      {open && (
        <div
          style={{
            width: 340,
            height: 480,
            maxHeight: "72vh",
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 16px 48px rgba(16,36,62,0.22)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {view === "login" && (
            <InlineLogin onLoggedIn={handleLoggedIn} onClose={() => setOpen(false)} />
          )}

          {view === "menu" && (
            <ChatMenu
              patient={patient}
              onStartNew={() => setView("chat")}
              onOpenPast={(id) => { setPastId(id); setView("past"); }}
              onClose={() => setOpen(false)}
            />
          )}

          {view === "chat" && (
            <LiveChat
              onBack={() => setView("menu")}
              onClose={() => setOpen(false)}
              onDone={() => {}}
              onFindSpecialist={(a) => { setActiveAssessment(a); setView("specialists"); }}
            />
          )}

          {view === "past" && (
            <PastChatView assessmentId={pastId} onBack={() => setView("menu")} onClose={() => setOpen(false)} />
          )}

          {view === "specialists" && (
            <SpecialistList
              condition={activeAssessment?.intake?.condition}
              onBack={() => setView("chat")}
              onClose={() => setOpen(false)}
              onSelectDoctor={(doc) => { setSelectedDoctor(doc); setView("booking"); }}
            />
          )}

          {view === "booking" && (
            <BookingPanel
              doctor={selectedDoctor}
              assessment={activeAssessment}
              patient={patient}
              onBack={() => setView("specialists")}
              onClose={() => setOpen(false)}
              onBooked={(info) => { setBookingInfo(info); setView("booked"); }}
            />
          )}

          {view === "booked" && (
            <BookingConfirmed
              info={bookingInfo}
              onClose={() => setOpen(false)}
              onDone={() => setView("menu")}
            />
          )}
        </div>
      )}
    </div>
  );
}