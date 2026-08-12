// src/Components/ConsentForm.jsx
// Route: /consent/appointment/:physioAppointmentId
//
// Standalone consent page. Linked from the WhatsApp message sent after
// booking confirmation (see verify-payment in clinicBookingRoutesnew.js).
// Not part of the ClinicBooking step wizard — fetches its own appointment
// data and posts the signed consent PDF independently.

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

// ── Brand tokens (kept in sync with ClinicBooking.jsx) ───────────────────────
const BLUE = "#1e8fd3";
const TEAL = "#40d3b6";
const GRAD = `linear-gradient(135deg, ${BLUE}, ${TEAL})`;

const BASE = import.meta.env.VITE_BACKEND_URL || "";

const CONSENT_LINES = [
  "I consent to assessment and treatment by Zeromedixine clinicians.",
  "I understand the nature of the proposed treatment and its possible risks and side effects.",
  "I understand that physiotherapy treatment may involve manual techniques, exercises, and advice.",
  "I agree to inform the clinician of any changes in my health condition.",
  "I understand that I may withdraw consent at any time.",
  "I consent to my health information being stored securely and used for treatment purposes.",
  "I agree to the use of my de-identified information for improving clinical care.",
  "I understand that session recordings will not be made without my explicit consent.",
  "I agree to contact Zeromedixine to reschedule or cancel appointments with adequate notice.",
  "I confirm that the information I have provided is accurate to the best of my knowledge.",
];

// ── Loading screen ────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(180deg, #f8fbff 0%, #fff 40%)",
    }}>
      <div style={{ textAlign: "center" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round"
          style={{ animation: "spin 1s linear infinite" }}>
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0110 10" />
        </svg>
        <p style={{ fontSize: 13, color: "#64748b", marginTop: 12 }}>Loading your consent form…</p>
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>
    </section>
  );
}

// ── Error screen ──────────────────────────────────────────────────────────────
function ErrorScreen({ message }) {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(180deg, #f8fbff 0%, #fff 40%)", padding: 24,
    }}>
      <div style={{
        maxWidth: 420, textAlign: "center", background: "#fff", borderRadius: 20,
        border: "1.5px solid rgba(0,0,0,0.07)", padding: "32px 28px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: "#fef2f2",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a2332", margin: "0 0 8px" }}>
          Couldn't load this form
        </h2>
        <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{message}</p>
      </div>
    </section>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────
function SuccessScreen({ driveUrl }) {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(180deg, #f8fbff 0%, #fff 40%)", padding: 24,
    }}>
      <div style={{ maxWidth: 440, textAlign: "center" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 22px", boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#1a2332", margin: "0 0 8px" }}>
          Consent submitted
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 4px" }}>
          Thank you — your signed consent form has been recorded.
          Your clinician has been notified.
        </p>
        {driveUrl && (
          <a href={driveUrl} target="_blank" rel="noreferrer"
            style={{ fontSize: 13, color: BLUE, textDecoration: "none", fontWeight: 500 }}>
            View your signed form →
          </a>
        )}
      </div>
    </section>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ConsentForm() {
  const { physioAppointmentId } = useParams();
  const sigPadRef = useRef(null);

  const [loadState, setLoadState]   = useState("loading"); // loading | ready | notfound | error
  const [appointment, setAppointment] = useState(null);
  const [consent, setConsent]       = useState({ understood: false, agree: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");
  const [driveUrl, setDriveUrl]     = useState(null);
  const [submitted, setSubmitted]   = useState(false);

  useEffect(() => {
    if (!physioAppointmentId) { setLoadState("error"); return; }
    let cancelled = false;

    fetch(`${BASE}/api/consent/appointment/${physioAppointmentId}`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        if (!d.success || !d.appointment) { setLoadState("notfound"); return; }
        setAppointment(d.appointment);

        // Already submitted previously → show success state straight away
        if (d.appointment.consent_form?.url) {
          setDriveUrl(d.appointment.consent_form.url);
          setSubmitted(true);
        }
        setLoadState("ready");
      })
      .catch(() => { if (!cancelled) setLoadState("error"); });

    return () => { cancelled = true; };
  }, [physioAppointmentId]);

  const toggle = (field) => setConsent(c => ({ ...c, [field]: !c[field] }));

  const clearSig = () => sigPadRef.current && sigPadRef.current.clear();

  const handleSubmit = async () => {
    if (!consent.understood || !consent.agree) {
      setError("Please tick both boxes above before continuing.");
      return;
    }

    const pad = sigPadRef.current;
    if (!pad || pad.isEmpty()) {
      setError("Please provide your signature before submitting.");
      return;
    }

    setError("");
    setSubmitting(true);

    let sigDataUrl = null;
    try {
      try {
        sigDataUrl = pad.getTrimmedCanvas().toDataURL("image/png");
      } catch {
        sigDataUrl = pad.getCanvas().toDataURL("image/png");
      }
    } catch (sigErr) {
      console.warn("Signature extraction failed:", sigErr.message);
    }

    const formData = new FormData();
    formData.append("sigDataUrl", sigDataUrl || "");

    try {
      const res  = await fetch(`${BASE}/api/consent/appointment/${physioAppointmentId}`, {
        method: "POST",
        body:   formData,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Could not submit consent form. Please try again.");
      }

      setDriveUrl(data.driveUrl || null);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadState === "loading") return <LoadingScreen />;
  if (loadState === "notfound") return <ErrorScreen message="This consent link is invalid or the appointment could not be found. Please check the link sent to you on WhatsApp." />;
  if (loadState === "error") return <ErrorScreen message="Something went wrong loading this form. Please try again in a moment or contact us on WhatsApp." />;
  if (submitted) return <SuccessScreen driveUrl={driveUrl} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { to   { transform:rotate(360deg); } }

        .cf-panel {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid rgba(0,0,0,0.07);
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .cf-panel-title {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 19px; font-weight: 600; color: #1a2332; margin: 0; letter-spacing: -0.2px;
        }
        .cf-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(30,143,211,0.4) !important;
        }
      `}</style>

      <section style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #fff 40%)",
        minHeight: "100vh",
        padding: "48px 20px 80px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", animation: "fadeUp 0.35s ease-out both" }}>

          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <p style={{
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
              fontSize: 15, fontWeight: 600, color: BLUE, margin: "0 0 4px", letterSpacing: "0.02em",
            }}>
              Zeromedixine
            </p>
            <p style={{ fontSize: 12.5, color: "#94a3b8", margin: 0 }}>
              Comprehensive Pain &amp; Rehab Care
            </p>
          </div>

          <div className="cf-panel">
            <h2 className="cf-panel-title">Consent for Assessment &amp; Treatment</h2>
            <p style={{ fontSize: 13, color: "#64748b", margin: "8px 0 20px", lineHeight: 1.6 }}>
              Please read the following carefully before signing.
            </p>

            {/* Patient summary */}
            {appointment && (
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px",
                padding: "14px 16px", background: "#f8fbff", borderRadius: 12,
                border: `1px solid ${BLUE}18`, marginBottom: 20,
              }}>
                <div>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Patient</p>
                  <p style={{ fontSize: 13.5, color: "#1a2332", fontWeight: 500, margin: 0 }}>{appointment.patient_name || "—"}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Age</p>
                  <p style={{ fontSize: 13.5, color: "#1a2332", fontWeight: 500, margin: 0 }}>{appointment.patient_age || "—"}</p>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Concern</p>
                  <p style={{ fontSize: 13.5, color: "#1a2332", fontWeight: 500, margin: 0 }}>{appointment.concern || "—"}</p>
                </div>
              </div>
            )}

            {/* Scrollable consent text */}
            <div style={{
              maxHeight: 220, overflowY: "auto", padding: "14px 16px",
              background: "#f8fbff", borderRadius: 12,
              border: "1.5px solid rgba(0,0,0,0.07)",
              marginBottom: 20,
            }}>
              {CONSENT_LINES.map((line, i) => (
                <p key={i} style={{ fontSize: 13, color: "#334155", margin: "0 0 10px", lineHeight: 1.6 }}>
                  <span style={{ color: BLUE, fontWeight: 600, marginRight: 6 }}>{i + 1}.</span>
                  {line}
                </p>
              ))}
            </div>

            {/* Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {[
                { key: "understood", label: "I have read and understood this consent form" },
                { key: "agree",      label: "I agree to proceed with assessment and treatment at Zeromedixine" },
              ].map(({ key, label }) => (
                <label key={key} style={{
                  display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
                  padding: "12px 14px", borderRadius: 10,
                  background: consent[key] ? `${BLUE}08` : "#f8fafc",
                  border: `1.5px solid ${consent[key] ? BLUE : "rgba(0,0,0,0.08)"}`,
                  transition: "all 0.15s",
                }}>
                  <div
                    onClick={() => toggle(key)}
                    style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                      background: consent[key] ? BLUE : "#fff",
                      border: `2px solid ${consent[key] ? BLUE : "#cbd5e1"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s", cursor: "pointer",
                    }}
                  >
                    {consent[key] && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 13.5, color: "#1a2332", lineHeight: 1.5 }}>{label}</span>
                </label>
              ))}
            </div>

            {/* Signature */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Signature
                </label>
                <button
                  type="button"
                  onClick={clearSig}
                  style={{
                    fontSize: 12, color: "#94a3b8", background: "none", border: "1px solid #e2e8f0",
                    borderRadius: 6, padding: "3px 10px", cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              </div>
              <div style={{
                border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 12, overflow: "hidden",
                background: "#fff", width: "100%", height: 160,
              }}>
                <SignatureCanvas
                  ref={sigPadRef}
                  penColor="black"
                  canvasProps={{ width: 660, height: 160, className: "sigCanvas", style: { width: "100%", height: "100%" } }}
                />
              </div>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: "6px 0 0" }}>
                Draw your signature above using a mouse or touch.
              </p>
            </div>

            {error && (
              <div style={{
                marginTop: 18, padding: "12px 16px",
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

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={!submitting ? "cf-submit-btn" : ""}
              style={{
                width: "100%", padding: "14px 0", marginTop: 20,
                borderRadius: 100, border: "none",
                background: submitting ? "#94a3b8" : GRAD,
                color: "#fff", fontSize: 15, fontWeight: 600,
                cursor: submitting ? "not-allowed" : "pointer",
                letterSpacing: "0.01em",
                boxShadow: submitting ? "none" : "0 6px 20px rgba(30,143,211,0.35)",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
            >
              {submitting ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0110 10" />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  Submit consent
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
