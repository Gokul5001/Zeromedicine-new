// ============================================================
// Components/PatientLogin.jsx
// Route: /patient/login?doctorId=<id>&doctorName=<name>
//
// Flow:
//   1. Enter phone → POST /api/patient-auth/send-otp
//   2. Enter OTP  → POST /api/patient-auth/verify-otp
//   3. Redirect → /clinic/book/<doctorId>  (ClinicBooking page)
//      passes { patient, fromPatientLogin: true } via location.state
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// ── Brand tokens (matching Doctors.jsx) ─────────────────────
const TEAL  = "#3EC6B0";
const GREEN = "#2F8FBE";
const NAVY  = "#10243E";
const FONT  = "'Poppins', system-ui, sans-serif";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

// ─────────────────────────────────────────────────────────────
// STEP 1 — Phone Entry
// ─────────────────────────────────────────────────────────────
function PhoneStep({ onSuccess }) {
  const [phone, setPhone]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  // const handleSend = async () => {
  //   setError("");
  //   const cleaned = phone.replace(/\D/g, "");
  //   if (cleaned.length !== 10) {
  //     setError("Please enter a valid 10-digit mobile number");
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const res  = await fetch(`${BASE}/api/patient-auth/send-otp`, {
  //       method:  "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body:    JSON.stringify({ phone: cleaned }),
  //     });
  //     const data = await res.json();
  //     if (data.success) {
  //       onSuccess(cleaned, data.is_new);
  //     } else {
  //       setError(data.error || "Failed to send OTP");
  //     }
  //   } catch {
  //     setError("Network error. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSend = async () => {
    setError("");
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 8) {
      setError("Please enter a valid mobile number");
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch(`${BASE}/api/patient-auth/send-otp`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ phone: cleaned }),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(cleaned, data.is_new);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={styles.card}>
      <div style={styles.iconRing}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 10.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-.78a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      </div>

      <h2 style={styles.heading}>Enter your mobile number</h2>
      <p style={styles.subtext}>We'll send a one-time code to verify it's you</p>

      <div style={{ width: "100%", marginBottom: 8 }}>
      <PhoneInput
        country={"in"}
        value={phone}
        onChange={(value) => setPhone(value)}
        enableSearch={true}
        inputClass="phone-login-input"
        inputStyle={{ width: "100%", height: 52, fontSize: 16, paddingLeft: 48, borderRadius: 12 }}
        buttonStyle={{ borderRadius: "12px 0 0 12px" }}
        containerStyle={{ width: "100%" }}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
    </div>

    {error && <p style={styles.error}>{error}</p>}

    <button
      onClick={handleSend}
      disabled={loading || phone.length < 8}
      style={{
        ...styles.btn,
        opacity: loading || phone.length < 8 ? 0.6 : 1,
      }}
    >
      {loading ? "Sending…" : "Send OTP"}
    </button>
      <p style={styles.legal}>
        By continuing you agree to our{" "}
        <a href="/terms_of_service" style={{ color: TEAL }}>Terms</a> &amp;{" "}
        <a href="/privacy-policy" style={{ color: TEAL }}>Privacy Policy</a>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 2 — OTP Entry (6-box input)
// ─────────────────────────────────────────────────────────────
function OtpStep({ phone, onSuccess }) {
  const [digits, setDigits]     = useState(Array(6).fill(""));
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [countdown, setCountdown] = useState(60);
  const [resending, setResending] = useState(false);
  const inputRefs               = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    setError("");
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
    // Auto-submit when all 6 digits entered
    if (val && next.every((d) => d !== "") && idx === 5) {
      submitOtp(next.join(""));
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      const next = text.split("");
      setDigits(next);
      setTimeout(() => submitOtp(text), 50);
    }
  };

  const submitOtp = async (code) => {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${BASE}/api/patient-auth/verify-otp`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body:    JSON.stringify({ phone, otp: code }),
      });
      const data = await res.json();
      if (data.success) {
        // Persist token in localStorage for frontend use
        localStorage.setItem("patientToken", data.token);
        localStorage.setItem("patientData", JSON.stringify(data.patient));
        onSuccess(data.patient, data.token, data.is_new_patient);
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

  const resendOtp = async () => {
    setResending(true);
    try {
      const res  = await fetch(`${BASE}/api/patient-auth/resend-otp`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setCountdown(60);
        setDigits(Array(6).fill(""));
        inputRefs.current[0]?.focus();
        setError("");
      } else {
        setError(data.error || "Failed to resend");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const otp = digits.join("");

  return (
    <div style={styles.card}>
      <div style={styles.iconRing}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      </div>

      <h2 style={styles.heading}>Enter verification code</h2>
      <p style={styles.subtext}>
      Sent to <strong style={{ color: NAVY }}>+{phone}</strong>
            </p>

      {/* 6-box OTP input */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "28px 0 8px" }} onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            style={{
              width: 44, height: 54,
              textAlign: "center",
              fontSize: 22, fontWeight: 700, fontFamily: FONT,
              color: NAVY,
              border: `2px solid ${d ? TEAL : "rgba(0,0,0,0.12)"}`,
              borderRadius: 12,
              background: d ? `${TEAL}0d` : "#fafafa",
              outline: "none",
              transition: "border-color 0.15s, background 0.15s",
              caretColor: TEAL,
            }}
          />
        ))}
      </div>

      {error && <p style={{ ...styles.error, margin: "8px 0 0" }}>{error}</p>}

      <button
        onClick={() => submitOtp(otp)}
        disabled={loading || otp.length < 6}
        style={{
          ...styles.btn,
          marginTop: 20,
          opacity: loading || otp.length < 6 ? 0.6 : 1,
        }}
      >
        {loading ? "Verifying…" : "Verify OTP"}
      </button>

      <div style={{ textAlign: "center", marginTop: 18 }}>
        {countdown > 0 ? (
          <p style={{ fontSize: 13, color: "#94a3b8" }}>
            Resend OTP in <strong style={{ color: TEAL }}>{countdown}s</strong>
          </p>
        ) : (
          <button
            onClick={resendOtp}
            disabled={resending}
            style={{
              background: "none", border: "none",
              color: TEAL, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: FONT,
              textDecoration: "underline",
            }}
          >
            {resending ? "Resending…" : "Resend OTP"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 3 — Quick Name Collect (first-time only)
// ─────────────────────────────────────────────────────────────
function NameStep({ patient, token, onSuccess }) {
  const [name, setName]     = useState(patient?.name || "");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const handleSave = async () => {
    if (!name.trim()) { setError("Please enter your name"); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${BASE}/api/patient-auth/update-profile`, {
        method:  "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("patientData", JSON.stringify(data.patient));
        onSuccess(data.patient);
      } else {
        setError(data.error || "Failed to save");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.iconRing}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>

      <h2 style={styles.heading}>What should we call you?</h2>
      <p style={styles.subtext}>Your name helps the doctor prepare for your session</p>

      <input
        type="text"
        placeholder="Your full name"
        value={name}
        onChange={(e) => { setName(e.target.value); setError(""); }}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        style={styles.textInput}
        autoFocus
      />

      {error && <p style={styles.error}>{error}</p>}

      <button
        onClick={handleSave}
        disabled={loading}
        style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Saving…" : "Continue"}
      </button>

      <button
        onClick={() => onSuccess(patient)}
        style={{
          background: "none", border: "none",
          color: "#94a3b8", fontSize: 13,
          cursor: "pointer", fontFamily: FONT,
          marginTop: 10, textDecoration: "underline",
        }}
      >
        Skip for now
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function PatientLogin() {
  const navigate        = useNavigate();
  const location        = useLocation();
  const [params]        = useSearchParams();
  const doctorId        = params.get("doctorId")   || "";
  const doctorName      = params.get("doctorName") || "your doctor";
  const doctorFromState = location.state?.doctor   || null;

  const [step, setStep]       = useState("phone");
  const [phone, setPhone]     = useState("");
  const [patient, setPatient] = useState(null);

  // Helper: go straight to the booking page, carrying patien

  // If already logged in, jump straight to booking
  useEffect(() => {
    const stored = localStorage.getItem("patientToken");
    if (stored && doctorId) {
      const patientData = (() => {
        try { return JSON.parse(localStorage.getItem("patientData") || "null"); } catch { return null; }
      })();
      navigate(`/clinic/book/${doctorId}`, {
        replace: true,
        state: { doctor: doctorFromState, patient: patientData, fromPatientLogin: true, doctorName },
      });
    }
  }, []);



  const handlePhoneSuccess = (normalizedPhone) => {
    setPhone(normalizedPhone);
    setStep("otp");
  };

  const handleOtpSuccess = (patientData) => {
    setPatient(patientData);
    if (doctorId) {
      navigate(`/clinic/book/${doctorId}`, {
        replace: true,
        state: { doctor: doctorFromState, patient: patientData, fromPatientLogin: true, doctorName },
      });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={styles.page}>
        {/* Background blobs */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />

        <div style={styles.wrapper}>
          {/* Logo / brand strip */}
   
      

          {/* Step indicator — 2 steps only */}
          <div style={styles.steps}>
            {["Verify number", "Book session"].map((label, i) => {
              const active = (step === "phone" && i === 0) || (step === "otp" && i === 1);
              const done   = step === "otp" && i === 0;
              return (
                <React.Fragment key={label}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: done ? TEAL : active ? `linear-gradient(135deg,${TEAL},${GREEN})` : "rgba(0,0,0,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700,
                      color: (done || active) ? "#fff" : "#94a3b8",
                      transition: "background 0.3s",
                    }}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span style={{ fontSize: 10.5, color: active ? TEAL : "#94a3b8", fontWeight: active ? 600 : 400 }}>
                      {label}
                    </span>
                  </div>
                  {i < 1 && (
                    <div style={{
                      flex: 1, height: 2, borderRadius: 2, marginBottom: 16,
                      background: done ? TEAL : "rgba(0,0,0,0.08)",
                      transition: "background 0.3s",
                    }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Active step */}
          {step === "phone" && (
            <PhoneStep onSuccess={handlePhoneSuccess} />
          )}
          {step === "otp" && (
            <OtpStep phone={phone} onSuccess={handleOtpSuccess} />
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0faf8 0%, #e8f4fd 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FONT,
    position: "relative",
    overflow: "hidden",
    padding: "24px 16px",
  },
  blob1: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: `${TEAL}18`,
    filter: "blur(60px)",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 260,
    height: 260,
    borderRadius: "50%",
    background: `${GREEN}14`,
    filter: "blur(50px)",
    pointerEvents: "none",
  },
  wrapper: {
    width: "100%",
    maxWidth: 420,
    position: "relative",
    zIndex: 1,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 6,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: `linear-gradient(135deg,${TEAL},${GREEN})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: 800,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color: NAVY,
  },
  context: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748b",
    margin: "0 0 24px",
  },
  steps: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginBottom: 24,
    padding: "0 4px",
  },
  card: {
    background: "#fff",
    borderRadius: 24,
    padding: "32px 28px",
    boxShadow: "0 8px 40px rgba(16,36,62,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconRing: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: `${TEAL}12`,
    border: `2px solid ${TEAL}30`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 700,
    color: NAVY,
    margin: "0 0 6px",
    textAlign: "center",
  },
  subtext: {
    fontSize: 13.5,
    color: "#64748b",
    margin: "0 0 20px",
    textAlign: "center",
    lineHeight: 1.6,
  },
  phoneRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: `1.5px solid rgba(0,0,0,0.12)`,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    transition: "border-color 0.15s",
  },
  countryCode: {
    padding: "0 14px",
    fontSize: 14,
    fontWeight: 600,
    color: NAVY,
    borderRight: "1.5px solid rgba(0,0,0,0.08)",
    height: 52,
    display: "flex",
    alignItems: "center",
    background: "#f8f8f8",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  phoneInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "14px 16px",
    fontSize: 16,
    fontFamily: FONT,
    color: NAVY,
    background: "transparent",
    letterSpacing: "0.04em",
  },
  textInput: {
    width: "100%",
    border: `1.5px solid rgba(0,0,0,0.12)`,
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 15,
    fontFamily: FONT,
    color: NAVY,
    outline: "none",
    marginBottom: 8,
    transition: "border-color 0.15s",
  },
  btn: {
    width: "100%",
    padding: "14px",
    borderRadius: 100,
    border: "none",
    background: `linear-gradient(90deg,${TEAL},${GREEN})`,
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: FONT,
    letterSpacing: "0.02em",
    boxShadow: `0 6px 20px ${TEAL}40`,
    transition: "opacity 0.15s",
    marginTop: 4,
  },
  error: {
    fontSize: 13,
    color: "#ef4444",
    margin: "4px 0 8px",
    textAlign: "center",
    fontWeight: 500,
  },
  legal: {
    fontSize: 11.5,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 1.6,
  },
};