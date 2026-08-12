// src/Components/RescheduleRequestPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const RescheduleRequestPage = () => {
  const { addSessionId, index } = useParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSubmittingModal, setShowSubmittingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successText, setSuccessText] = useState("");
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`${backendURL}/api/add_sessions/${addSessionId}/session/${index}`);
        if (res?.data?.session) {
          setSession(res.data.session);
          setAppointment(res.data.appointmentId || null);
        } else {
          console.warn("No session returned from server", res?.data);
        }
      } catch (err) {
        console.error("load session error", err);
        alert("Unable to load session");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addSessionId, index]);

  // Redirect helper (used after success)
  const doRedirect = () => {
    // send user to main site (same as Consent flow)
    window.location.assign("https://www.zeromedixine.com/");
  };

  const submit = async () => {
    if (!newDate || !newTime) return alert("Choose new date & time");
    try {
      setSubmitting(true);
      setShowSubmittingModal(true);

      const loggedUser = localStorage.getItem("user");
      const stored = loggedUser ? JSON.parse(loggedUser) : {};
      const payload = {
        newDate,
        newTime,
        reason,
        requestedBy: stored.username || stored._id || "patient"
      };

      const res = await axios.post(
        `${backendURL}/api/add_sessions/${addSessionId}/session/${index}/request_reschedule`,
        payload,
        { timeout: 120000 }
      );

      if (res.data?.success) {
        // show success modal and auto-redirect
        const serverMsg = res.data.message || "Reschedule request sent successfully.";
        setSuccessText(serverMsg);
        setShowSubmittingModal(false);
        setShowSuccessModal(true);

        // auto-redirect after short delay so user sees the modal
        setTimeout(() => {
          doRedirect();
        }, 1600);
      } else {
        setShowSubmittingModal(false);
        alert(res.data?.message || "Failed to send request");
      }
    } catch (err) {
      console.error("submit reschedule err:", err);
      setShowSubmittingModal(false);
      alert("Server error sending reschedule request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f3f6f8", padding: "48px 16px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <div style={{
  background: "#ffffff",
  borderRadius: 10,
  padding: 26,
  marginTop: 24,
  boxShadow: "0 8px 30px rgba(25, 41, 55, 0.08)"
}}>

          <h2 style={{ color: "#1e8fd3", margin: 0 }}>Request reschedule</h2>

          <div style={{ marginTop: 12, color: "#444" }}>
            <div><strong>Current scheduled:</strong> {session?.date || "-"} {session?.time || "-"}</div>
            {session?.twilioRoomPatient && <div style={{ marginTop: 4 }}><small>Session index: {session.index ?? index}</small></div>}
            {/* {appointment && <div style={{ marginTop: 6 }}><small>Appointment: {appointment}</small></div>} */}
          </div>

          <div style={{ marginTop: 18 }}>
            <label style={{ display: "block", fontSize: 14, color: "#333" }}>New date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              style={{
                display: "block",
                padding: "10px 12px",
                marginTop: 6,
                width: "100%",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                background: "#fff",
                outline: "none",
                boxSizing: "border-box"
              }}
              disabled={showSubmittingModal}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontSize: 14, color: "#333" }}>New time</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              style={{
                display: "block",
                padding: "10px 12px",
                marginTop: 6,
                width: "100%",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                background: "#fff",
                outline: "none",
                boxSizing: "border-box"
              }}
              disabled={showSubmittingModal}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontSize: 14, color: "#333" }}>Reason (optional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              style={{
                display: "block",
                padding: "10px 12px",
                marginTop: 6,
                width: "100%",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                background: "#fff",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical"
              }}
              disabled={showSubmittingModal}
            />
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "#fff",
                border: "1px solid #d1d5db",
                cursor: showSubmittingModal ? "not-allowed" : "pointer"
              }}
              disabled={showSubmittingModal}
            >
              Cancel
            </button>

            <button
              onClick={submit}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: showSubmittingModal ? "#bfeee6" : "#40d3b6",
                color: "#fff",
                border: "none",
                cursor: showSubmittingModal ? "not-allowed" : "pointer",
                boxShadow: "0 6px 18px rgba(64, 211, 182, 0.16)"
              }}
              disabled={showSubmittingModal}
            >
              {submitting ? "Sending..." : "Send Request"}
            </button>
          </div>
        </div>
      </div>

      {/* Submitting Modal */}
      {showSubmittingModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 16
          }}
        >
          <div style={{ width: 360, background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <svg width="44" height="44" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#1e8fd3" strokeWidth="4" d="M25 5a20 20 0 1 0 20 20" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
            <h4 style={{ margin: 0, color: "#1e8fd3" }}>Submitting — please wait</h4>
            <p style={{ marginTop: 8, color: "#444", fontSize: 13 }}>Sending your reschedule request to the clinic.</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 16
          }}
        >
          <div style={{ width: 420, background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: 0, color: "#1e8fd3" }}>Success</h3>
            <p style={{ marginTop: 8 }}>{successText || "Reschedule request sent ✅"}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
              <button
                onClick={() => { setShowSuccessModal(false); doRedirect(); }}
                style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", background: "#fff" }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RescheduleRequestPage;
