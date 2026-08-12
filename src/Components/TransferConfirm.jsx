// src/pages/TransferConfirm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TransferConfirm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const sanitizeId = (raw) => {
    if (!raw) return null;
    let s = String(raw).trim().replace(/^\[+/, "").replace(/\]+$/, "");
    const match = s.match(/[0-9a-fA-F]{24}/);
    if (match) return match[0];
    return s;
  };

  

  useEffect(() => {
    let mounted = true;
    const fetchAppointment = async () => {
      setLoading(true);
      setError(null);
      try {
        const cleanId = sanitizeId(id);
        if (!cleanId) throw new Error("Invalid appointment id");
        const res = await axios.get(`${backendURL}/api/appointments/${cleanId}`);
        if (!mounted) return;
        const payload = res.data?.appointment ?? res.data;
        setAppointment(payload);
      } catch (err) {
        console.error("Error fetching appointment:", err);
        if (!mounted) return;
        setAppointment(null);
        setError(err.response?.data?.message || err.message || "Failed to fetch appointment");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAppointment();
    return () => { mounted = false; };
  }, [id, backendURL]);

  const handleConfirmClick = () => {
    if (!appointment) return;
    // If already confirmed, show message with assigned doctor
    if (appointment.status && String(appointment.status).toLowerCase() === "confirmed") {
      setModalMessage(
        appointment.doctorAssigned
          ? `Already confirmed by ${appointment.doctorAssigned}.`
          : `Appointment already confirmed.`
      );
      setUsernameInput(appointment.doctorAssigned || "");
      setShowModal(true);
      return;
    }
    setModalMessage("");
    setUsernameInput("");
    setShowModal(true);
  };

  const submitUsername = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!appointment) return;
    const usernameTrimmed = (usernameInput || "").trim();
    if (!usernameTrimmed) {
      toast.error("Please enter the doctor's username before confirming.", { position: "top-right" });
      return;
    }

    setConfirming(true);
    try {
      const cleanId = sanitizeId(appointment._id || id);
      const res = await axios.post(
        `${backendURL}/api/appointments/${cleanId}/confirm_transfer`,
        { username: usernameTrimmed }, {withCredentials: true,},
        { timeout: 20000 }
      );

      const updated = res.data?.appointment ?? res.data ?? null;
      if (updated) setAppointment((prev) => ({ ...prev, ...updated }));
      else setAppointment((prev) => ({ ...prev, status: "confirmed", doctorAssigned: usernameTrimmed }));

      setShowModal(false);
      toast.success("Patient assigned to doctor and confirmed. Notifications sent.", { position: "top-right" });
      // optional: redirect to transferred appointments list
      // navigate("/zeromedixine/transfers");
    } catch (err) {
      console.error("Error confirming appointment:", err);

      const status = err?.response?.status;
      const data = err?.response?.data;

      // 404 from backend: username not found
      if (status === 404) {
        const msg = (data && (data.message || data.error)) || "Invalid username. Please enter the correct username.";
        toast.error(msg, { position: "top-right" });
        return; // keep modal open
      }

      // 409 conflict - already confirmed (update local state if appointment provided)
      if (status === 409 && data?.appointment) {
        setAppointment(data.appointment);
        toast.error(data.message || "Appointment already confirmed.", { position: "top-right" });
        return;
      }

      const fallback = (data && (data.message || data.error)) || err.message || "Could not confirm appointment. Try again.";
      toast.error(fallback, { position: "top-right" });
    } finally {
      setConfirming(false);
    }
  };

  const openLink = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderBody = () => {
    if (loading) return <div className="p-6 text-center">Loading patient details...</div>;
    if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    if (!appointment) return <div className="p-6 text-center">Transferred patient not found.</div>;

    // handle primaryConcern display (could be id or populated object)
    const concernDisplay =
    appointment.primaryConcernDisplay ||
    (appointment.primaryConcern && typeof appointment.primaryConcern === "object"
      ? appointment.primaryConcern.concern || appointment.primaryConcern.name || appointment.primaryConcern._id
      : appointment.primaryConcern || "Not specified");
  
  const transferSourceName =
    appointment.transferredFromName ||
    (appointment.transferredFrom && typeof appointment.transferredFrom === "object"
      ? appointment.transferredFrom.name || appointment.transferredFrom.title || appointment.transferredFrom._id
      : appointment.transferredFrom || "Zeromedixine");

    return (
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Transferred Patient</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Name:</strong> {appointment.name}</p>
          <p><strong>Age:</strong> {appointment.age || "—"}</p>
          <p><strong>Gender:</strong> {appointment.gender || "—"}</p>
          <p><strong>Phone:</strong> <a href={`tel:${appointment.phone}`} className="text-[#1e8fd3] underline">{appointment.phone}</a></p>
          <p><strong>Email:</strong> {appointment.email || "—"}</p>
          <p><strong>Concern:</strong> {concernDisplay}</p>
          <p><strong>Date:</strong> {appointment.appointment_date || "—"}</p>
          <p><strong>Time:</strong> {appointment.appointment_time || "—"}</p>

      
<p>
  <strong>Transfer Request comes from  :</strong>{" "}
  <span className="font-medium">{transferSourceName}</span>
</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`font-medium ${appointment.status === "confirmed" ? "text-green-600" : "text-orange-500"}`}>
              {appointment.status || "transferred"}
            </span>
          </p>

          {appointment.notes && (
            <div className="mt-2 p-3 border rounded-md bg-gray-50 text-sm whitespace-pre-wrap">
              <strong className="block mb-1">Notes:</strong>
              <div>{appointment.notes}</div>
            </div>
          )}

          {appointment.doctorAssigned && (
            <p className="mt-2"><strong>Assigned Doctor:</strong> <span className="font-medium">{appointment.doctorAssigned}</span></p>
          )}
        </div>

        <div className="mt-6 flex gap-3 items-center">
          <button
            onClick={handleConfirmClick}
            disabled={confirming}
            className={`flex-1 py-3 rounded-full text-white font-semibold transition ${
              appointment.status === "confirmed"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] hover:opacity-95"
            }`}
          >
            {appointment.status === "confirmed" ? "Already Confirmed" : confirming ? "Confirming..." : "Confirm & Assign Doctor"}
          </button>

          <a
            href={`tel:${appointment.phone}`}
            className="px-4 py-3 border border-gray-300 rounded-full text-gray-700 font-medium"
          >
            Call
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Zeromedixine team: press Confirm to assign this patient to a doctor. You will be prompted for the doctor's username.
        </p>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black opacity-40" onClick={() => { if (!confirming) setShowModal(false); }} />
            <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-6 z-10">
              <h3 className="text-lg font-semibold mb-3">Assign to Doctor (username)</h3>

              {modalMessage ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{modalMessage}</p>
                  <div className="flex justify-end gap-3 mt-4">
                    <button className="px-4 py-2 rounded-md border border-gray-300 text-sm" onClick={() => setShowModal(false)}>Close</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitUsername} className="space-y-3">
                  <label className="block text-sm text-gray-600">Enter doctor's username to assign</label>
                  <input
                    type="text"
                    autoFocus
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="e.g. dr_manish"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    disabled={confirming}
                  />

                  <div className="flex justify-end gap-3 mt-2">
                    <button type="button" className="px-4 py-2 rounded-md border border-gray-300 text-sm" onClick={() => { if (!confirming) setShowModal(false); }}>Cancel</button>
                    <button type="submit" disabled={confirming} className="px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] disabled:opacity-70">
                      {confirming ? "Confirming..." : "Yes, Assign"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-3xl">
        <div className="mb-4">
          <button
            className="px-3 py-2 rounded-lg border bg-white text-sm"
          >
            ← Back
          </button>
        </div>
        {renderBody()}
      </div>
    </div>
  );
}
