import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

function isUpcoming(date, time) {
  if (!date || !time) return false;
  const d = new Date(`${date} ${time}`);
  return !isNaN(d.getTime()) && d > new Date();
}

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
      background: s.bg, color: s.color, textTransform: "capitalize",
      whiteSpace: "nowrap",
    }}>
      {status?.replace("_", " ") || "pending"}
    </span>
  );
}

function JoinButton({ link }) {
  return (
    <a
          href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: 13, fontWeight: 600, padding: "8px 16px",
        borderRadius: 10, textDecoration: "none", color: "#fff",
        background: "linear-gradient(90deg, #1e8fd3, #40d3b6)",
        whiteSpace: "nowrap", display: "inline-block",
      }}
    >
      ▶ Join Video Consultation
    </a>
  );
}

function SingleBookingCard({ a }) {
  const upcoming = isUpcoming(a.date, a.time);

  return (
    <div style={{
      border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14,
      padding: "16px 18px", background: "#fff",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <div>
        {a.doctor_name && (
          <p style={{ fontWeight: 600, fontSize: 15, margin: 0, color: "#1a2332" }}>
            Consultation with Dr. {a.doctor_name}
          </p>
        )}
        <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>
          Concern: {a.concern || a.session_type}
        </p>
        <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 2px" }}>
          {a.date} at {a.time} · Mode: {a.session_type}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <StatusBadge status={a.status} />

        {a.status === "confirmed" && a.patient_link && upcoming && (
          <JoinButton link={a.patient_link} />
        )}

        {a.status === "confirmed" && a.patient_link && !upcoming && (
          <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>
            Session ended
          </span>
        )}
      </div>
    </div>
  );
}

function PackageBookingCard({ a }) {
  const [expanded, setExpanded] = useState(false);

  const sessions = Array.isArray(a.sessions) ? a.sessions : [];
  const totalSessions = a.package_sessions || sessions.length || 1;
  const scheduledCount = sessions.filter(s => s.date && s.time).length;
  const completedCount = sessions.filter(s => s.status === "completed").length;

  // Find next upcoming scheduled session for a quick-glance summary
  const nextSession = sessions.find(s => s.date && s.time && isUpcoming(s.date, s.time));

  return (
    <div style={{
      border: "1px solid rgba(64,211,182,0.35)", borderRadius: 14,
      background: "#fff", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, padding: "16px 18px",
        background: "linear-gradient(90deg, rgba(30,143,211,0.06), rgba(64,211,182,0.06))",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
              padding: "3px 10px", borderRadius: 100, color: "#fff",
              background: "linear-gradient(90deg, #1e8fd3, #40d3b6)",
              textTransform: "uppercase",
            }}>
              Package · {totalSessions} sessions
            </span>
            {a.doctor_name && (
              <span style={{ fontWeight: 600, fontSize: 15, color: "#1a2332" }}>
                Dr. {a.doctor_name}
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: "#64748b", margin: "6px 0 0" }}>
            Concern: {a.concern || a.session_type} · {scheduledCount}/{totalSessions} scheduled
            {completedCount > 0 && ` · ${completedCount} completed`}
          </p>
        
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <StatusBadge status={a.status} />
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              fontSize: 13, fontWeight: 600, padding: "8px 14px",
              borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)",
              background: "#fff", color: "#1a2332", cursor: "pointer",
            }}
          >
            {expanded ? "Hide sessions ▲" : "View sessions ▼"}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "0 18px 14px" }}>
        <div style={{ height: 6, borderRadius: 100, background: "#e2e8f0", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${(scheduledCount / totalSessions) * 100}%`,
            background: "linear-gradient(90deg, #1e8fd3, #40d3b6)",
          }} />
        </div>
      </div>

      {/* Sessions list */}
      {expanded && (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "10px 18px 16px" }}>
          {sessions.map(s => {
            const upcoming = isUpcoming(s.date, s.time);
            const scheduled = !!(s.date && s.time);

            return (
              <div
                key={s.session_number}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  flexWrap: "wrap", gap: 10, padding: "12px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, margin: 0, color: "#1a2332" }}>
                    Session {s.session_number} of {totalSessions}
                  </p>
                  <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>
                    {scheduled ? `${s.date} at ${s.time}` : "Not scheduled yet"}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <StatusBadge status={s.status} />

                  {s.status === "confirmed" && s.patient_link && upcoming && (
                    <JoinButton link={s.patient_link} />
                  )}

                  {s.status === "confirmed" && s.patient_link && scheduled && !upcoming && (
                    <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>
                      Session ended
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MyBookings() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("patientToken");
    if (!token) { navigate("/"); return; }
  
    fetch(`${BASE}/api/patient-auth/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async r => {
        const d = await r.json();
        if (r.status === 401 || d?.error === "Invalid or expired token") {
          localStorage.removeItem("patientToken");
          localStorage.removeItem("patientData");
          navigate("/"); // or your patient login route, e.g. "/patient/login"
          return null;
        }
        return d;
      })
      .then(d => {
        if (!d) return; // already redirected
        if (d.success) setAppointments(d.appointments || []);
        else setError(d.error || "Failed to load bookings");
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "110px 24px 60px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, color: "#1a2332" }}>
        My Bookings
      </h1>

      {loading && <p style={{ color: "#64748b" }}>Loading...</p>}
      {error && <p style={{ color: "#dc2626" }}>{error}</p>}

      {!loading && appointments.length === 0 && !error && (
        <p style={{ color: "#64748b" }}>You have no appointments yet.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {appointments.map(a => (
          a.booking_type === "package" && Array.isArray(a.sessions) && a.sessions.length > 0
            ? <PackageBookingCard key={a._id} a={a} />
            : <SingleBookingCard key={a._id} a={a} />
        ))}
      </div>
    </section>
  );
}