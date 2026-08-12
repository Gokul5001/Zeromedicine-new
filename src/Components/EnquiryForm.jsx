import React, { useState } from "react";
import axios from "axios";

const sessionOptions = [
  { value: 10, label: "10 sessions (2 weeks)" },
  { value: 20, label: "20 sessions (4 weeks)" },
  { value: 30, label: "30 sessions (6 weeks)" },
  { value: 45, label: "45 sessions (9 weeks)" },
  { value: 60, label: "60 sessions (12 weeks)" },
];

const EnquiryForm = ({ patientId = null, presetName = "", onSuccess = () => {}, backendURL }) => {
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [notes, setNotes] = useState("");
  const [sessions, setSessions] = useState("");
  const [loading, setLoading] = useState(false);

  const beUrl = backendURL || (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");

  const submit = async (e) => {
    e.preventDefault();
    // simple validation
    if (!chiefComplaint.trim()) {
      return alert("Please enter chief complaint.");
    }
    if (!sessions) {
      return alert("Please choose sessions.");
    }

    setLoading(true);
    try {
      const payload = {
        patientId,
        patientName: presetName || undefined,
        chiefComplaint: chiefComplaint.trim(),
        notes: notes.trim(),
        sessions: Number(sessions),
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post(`${beUrl}/api/enquiries`, payload);
      if (res?.status === 200 || res?.status === 201) {
        alert("Enquiry submitted — thank you!");
        setChiefComplaint("");
        setNotes("");
        setSessions("");
        onSuccess(res.data);
      } else {
        alert("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Enquiry submit error:", err);
      const message = err?.response?.data?.message || err.message || "Server error";
      alert("Failed to submit enquiry: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 12, borderTop: "1px dashed #eee", paddingTop: 12 }}>
      <h4 style={{ margin: "6px 0 12px 0", color: "#1e8fd3" }}>Create Enquiry</h4>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Chief Complaint</label>
        <textarea
          value={chiefComplaint}
          onChange={(e) => setChiefComplaint(e.target.value)}
          placeholder="Write chief complaint / problem here..."
          rows={4}
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd", resize: "vertical" }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes..."
          rows={4}
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd", resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <div style={{ minWidth: 220 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Sessions</label>
          <select
            value={sessions}
            onChange={(e) => setSessions(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
          >
            <option value="">Select sessions</option>
            {sessionOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "8px 14px",
              borderRadius: 6,
              border: "none",
              background: "#1e8fd3",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EnquiryForm;
