// src/Components/DoctorAppointments.jsx
// Route: /doctor/appointments
// Doctor views all their appointments. Package bookings show a
// "Follow-up" button to schedule the next pending session (or reschedule
// any session) without creating a duplicate record — it updates the same
// PhysioAppointment document's `sessions[]` array.

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const BASE = import.meta.env.VITE_BACKEND_URL || "";
const BLUE = "#1e8fd3";
const TEAL = "#40d3b6";
const GRAD = `linear-gradient(135deg, ${BLUE}, ${TEAL})`;

// ── Status badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    confirmed: { bg: "#dcfce7", color: "#166534" },
    pending: { bg: "#fef3c7", color: "#92400e" },
    pending_payment: { bg: "#fef3c7", color: "#92400e" },
    cancelled: { bg: "#fee2e2", color: "#991b1b" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100,
      background: s.bg, color: s.color, textTransform: "capitalize", whiteSpace: "nowrap",
    }}>
      {status?.replace("_", " ") || "pending"}
    </span>
  );
}

// ── Follow-up scheduling modal ──────────────────────────────────────────────
function FollowUpModal({ appointment, doctorId, onClose, onScheduled }) {
  const sessions = appointment.sessions || [];
  const firstPending = sessions.find(s => s.status === "pending");

  const [sessionNumber, setSessionNumber] = useState(firstPending?.session_number || sessions[0]?.session_number || 1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Generate simple 30-min time options 9am–7pm; doctor can also type a custom one
  const timeOptions = [];
  for (let h = 9; h <= 19; h++) {
    for (const m of [0, 30]) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "AM" : "PM";
      timeOptions.push(`${hour12}:${String(m).padStart(2, "0")} ${ampm}`);
    }
  }

  const selectedSession = sessions.find(s => s.session_number === Number(sessionNumber));

  const handleSave = async () => {
    if (!date || !time) {
      setError("Please pick both a date and a time.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${BASE}/api/clinics/new-bookings/schedule-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: appointment._id,
          sessionNumber: Number(sessionNumber),
          date,
          time,
          doctorId,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to schedule session");
      }
      onScheduled(data.appointment);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 16,
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 18, width: "100%", maxWidth: 440,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)", overflow: "hidden",
        }}
      >
        <div style={{ background: GRAD, padding: "18px 22px" }}>
          <p style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: 0 }}>
            Schedule follow-up session
          </p>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 12.5, margin: "3px 0 0" }}>
            {appointment.patient_name} · {appointment.package_sessions} session package
          </p>
        </div>

        <div style={{ padding: 22 }}>
          {/* Session picker */}
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Which session?
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8, marginBottom: 18 }}>
            {sessions.map(s => (
              <button
                key={s.session_number}
                onClick={() => setSessionNumber(s.session_number)}
                style={{
                  padding: "7px 14px", borderRadius: 100,
                  border: `1.5px solid ${Number(sessionNumber) === s.session_number ? BLUE : "rgba(0,0,0,0.1)"}`,
                  background: Number(sessionNumber) === s.session_number ? `${BLUE}10` : "#fff",
                  color: Number(sessionNumber) === s.session_number ? BLUE : "#1a2332",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                Session {s.session_number}
                {s.status === "confirmed" && (
                  <span style={{ fontSize: 11, color: "#16a34a" }}>✓ scheduled</span>
                )}
              </button>
            ))}
          </div>

          {selectedSession?.status === "confirmed" && (
            <div style={{
              padding: "10px 12px", borderRadius: 10, background: "#fff7ed",
              border: "1px solid #fed7aa", fontSize: 12.5, color: "#9a3412", marginBottom: 16,
            }}>
              This session is already scheduled for {selectedSession.date} at {selectedSession.time}.
              Saving below will reschedule it with a new video link.
            </div>
          )}

          {/* Date */}
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            style={{
              width: "100%", marginTop: 6, marginBottom: 16, padding: "10px 12px",
              borderRadius: 10, border: "1.5px solid rgba(0,0,0,0.1)", fontSize: 14,
              boxSizing: "border-box",
            }}
          />

          {/* Time */}
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Time
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{
              width: "100%", marginTop: 6, padding: "10px 12px",
              borderRadius: 10, border: "1.5px solid rgba(0,0,0,0.1)", fontSize: 14,
              boxSizing: "border-box", background: "#fff",
            }}
          >
            <option value="">Select a time</option>
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          {error && (
            <div style={{ marginTop: 14, padding: "10px 12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, color: "#dc2626", fontSize: 13 }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: "11px 0", borderRadius: 100, border: "1.5px solid rgba(0,0,0,0.1)",
                background: "#fff", color: "#64748b", fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                flex: 1, padding: "11px 0", borderRadius: 100, border: "none",
                background: saving ? "#94a3b8" : GRAD, color: "#fff", fontSize: 14, fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving…" : "Save & send link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Single appointment row ──────────────────────────────────────────────────
function AppointmentRow({ appt, onFollowUp }) {
  const isPackage = appt.booking_type === "package";
  const sessions = appt.sessions || [];
  const scheduledCount = sessions.filter(s => s.date && s.time).length;
  const totalSessions = appt.package_sessions || sessions.length || 1;
  const hasMorePending = sessions.some(s => s.status === "pending");

  return (
    <div style={{
      border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "16px 18px",
      background: "#fff", display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {isPackage && (
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 0.3, padding: "3px 10px",
              borderRadius: 100, color: "#fff", background: GRAD, textTransform: "uppercase",
            }}>
              Package · {totalSessions} sessions
            </span>
            
          )}
          <p></p>
          <br/>
          <span style={{ fontWeight: 600, fontSize: 15, color: "#1a2332" }}>
            {appt.patient_name}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", margin: "6px 0 0" }}>
          {appt.concern || appt.session_type}
          {isPackage && ` · ${scheduledCount}/${totalSessions} scheduled`}
        </p>
        <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>
          {appt.date} at {appt.time} · {appt.patient_phone}
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
  <StatusBadge status={appt.status} />

  {isPackage && hasMorePending && (
    <button
      onClick={() => onFollowUp(appt)}
      style={{
        fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 10,
        border: `1.5px solid ${BLUE}`, background: "#fff", color: BLUE, cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      Follow-up
    </button>
  )}

  {isPackage && !hasMorePending && (
    <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
      All sessions scheduled
    </span>
  )}
</div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function DoctorAppointments() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");   // ← was: doctorId from doctor_id/doctorId

  const doctorId = searchParams.get("doctor_id") || searchParams.get("doctorId");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [followUpAppt, setFollowUpAppt] = useState(null);

  // const fetchAppointments = () => {
  //   if (!doctorId) {
  //     setLoading(false);
  //     setError("No doctor_id provided in the URL. Use ?doctor_id=doc_001");
  //     return;
  //   }
  //   setLoading(true);
  //   setError("");
  //   fetch(
  //     `${BASE}/api/clinics/new-bookings/appointments?doctor_id=${encodeURIComponent(doctorId)}&status=${statusFilter}&limit=100`
  //   )
  //     .then(r => r.json())
  //     .then(d => {
  //       if (d.success) setAppointments(d.appointments || []);
  //       else setError(d.message || "Failed to load appointments");
  //     })
  //     .catch(err => setError(err.message || "Network error"))
  //     .finally(() => setLoading(false));
  // };

  const fetchAppointments = () => {
    if (!token) {
      setLoading(false);
      setError("Missing session — please reopen this page from the app.");
      return;
    }
    setLoading(true);
    setError("");
    fetch(
      `${BASE}/api/clinics/new-bookings/appointments?status=${statusFilter}&limit=100&token=${encodeURIComponent(token)}`
    )
      .then(r => r.json())
      .then(d => {
        if (d.success) setAppointments(d.appointments || []);
        else setError(d.message || d.error || "Failed to load appointments");
      })
      .catch(err => setError(err.message || "Network error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, token]);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, doctorId]);

  const handleScheduled = (updatedAppt) => {
    setAppointments(prev => prev.map(a => a._id === updatedAppt._id ? updatedAppt : a));
  };

  return (
<section style={{ maxWidth: 900, margin: "0 auto", padding: "16px 14px 40px" }}>
    
<p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
  Single sessions show a join link. Package bookings let you schedule each
  follow-up session as you go.
</p>

      {/* Status filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", "confirmed", "pending_payment", "cancelled"].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: "7px 16px", borderRadius: 100,
              border: `1.5px solid ${statusFilter === s ? BLUE : "rgba(0,0,0,0.1)"}`,
              background: statusFilter === s ? `${BLUE}10` : "#fff",
              color: statusFilter === s ? BLUE : "#64748b",
              fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize",
            }}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: "#64748b" }}>Loading…</p>}
      {error && <p style={{ color: "#dc2626" }}>{error}</p>}
      {!loading && !error && appointments.length === 0 && (
        <p style={{ color: "#64748b" }}>No appointments found for this filter.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {appointments.map(a => (
          <AppointmentRow key={a._id} appt={a} onFollowUp={setFollowUpAppt} />
        ))}
      </div>

      {followUpAppt && (
        <FollowUpModal
          appointment={followUpAppt}
          doctorId={doctorId}
          onClose={() => setFollowUpAppt(null)}
          onScheduled={handleScheduled}
        />
      )}
    </section>
  );
}