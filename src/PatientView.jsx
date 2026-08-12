// src/pages/PatientView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PatientView() {
  const { id } = useParams();
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
        const res = await axios.get(`${backendURL}/api/concerns/${cleanId}`);
        if (!mounted) return;
        // backend might return { success: true, appointment: {...} } or just the object
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
      toast.error("Please enter your username before confirming.", { position: "top-right" });
      return;
    }

    setConfirming(true);
    try {
      const cleanId = sanitizeId(appointment._id || id);
      const res = await axios.post(`${backendURL}/api/appointments/${cleanId}/confirm`, {
        username: usernameTrimmed,
      }, { timeout: 20000 });

      // Backend may return shaped appointment in res.data.appointment or res.data
      const updated = res.data?.appointment ?? res.data ?? null;
      if (updated) {
        setAppointment((prev) => ({ ...prev, ...updated }));
      } else {
        setAppointment((prev) => ({
          ...prev,
          status: "confirmed",
          doctorAssigned: usernameTrimmed,
        }));
      }

      setShowModal(false);
      toast.success("Appointment confirmed — patient and doctor notified.", { position: "top-right" });
    } catch (err) {
      console.error("Error confirming appointment:", err);

      const status = err?.response?.status;
      const data = err?.response?.data;

      // 404 from backend: username not found
      if (status === 404) {
        const msg = (data && (data.message || data.error)) || "Invalid username. Please enter the correct username.";
        toast.error(msg, { position: "top-right" });
        // keep modal open so doctor can try again
        return;
      }

      // 409 conflict - already confirmed (show message and update local state if appointment provided)
      if (status === 409 && data?.appointment) {
        setAppointment(data.appointment);
        toast.error(data.message || "Appointment already confirmed.", { position: "top-right" });
        return;
      }

      // Other errors
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
    if (loading) return <div className="p-6 text-center">Loading appointment...</div>;
    if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    if (!appointment) return <div className="p-6 text-center">Appointment not found.</div>;

    return (
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient Booking</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Name:</strong> {appointment.name}</p>
          <p><strong>Age:</strong> {appointment.age}</p>
          <p><strong>Gender:</strong> {appointment.gender}</p>
          <p><strong>Phone:</strong> {appointment.phone}</p>
          <p><strong>Email:</strong> {appointment.email}</p>
          <p><strong>Concern:</strong> {appointment.primaryConcern}</p>
          <p><strong>Date:</strong> {appointment.appointment_date}</p>
          <p><strong>Time:</strong> {appointment.appointment_time}</p>
          
          <p><strong>Language:</strong> {appointment.language || "Not specified"}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`font-medium ${appointment.status === "confirmed" ? "text-green-600" : "text-orange-500"}`}>
              {appointment.status || "pending"}
            </span>
          </p>

          {appointment.doctorAssigned && (
            <p>
              <strong>Assigned Doctor:</strong>{" "}
              <span className="font-medium text-gray-800">{appointment.doctorAssigned}</span>
            </p>
          )}

          {appointment.twilioRoom && (
            <div className="mt-3 p-3 border rounded-md bg-gray-50">
              <p className="text-sm"><strong>Room:</strong> {appointment.twilioRoom.roomName || "—"}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3 items-center">
          <button
            onClick={handleConfirmClick}
            disabled={confirming}
            className={`flex-1 py-3 rounded-full text-white font-semibold transition ${
              appointment.status === "confirmed"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
            }`}
          >
            {appointment.status === "confirmed" ? "Already Confirmed" : confirming ? "Confirming..." : "Confirm Appointment"}
          </button>

          <a
            href={`tel:${appointment.phone}`}
            className="px-4 py-3 border border-gray-300 rounded-full text-gray-700 font-medium"
          >
            Call
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          If this page is opened by a doctor, pressing Confirm will prompt for your username and assign you to this appointment.
        </p>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black opacity-40" onClick={() => { if(!confirming) setShowModal(false); }} />
            <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-6 z-10">
              <h3 className="text-lg font-semibold mb-3">Confirm & Assign (username)</h3>

              {modalMessage ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{modalMessage}</p>
                  <div className="flex justify-end gap-3 mt-4">
                    <button className="px-4 py-2 rounded-md border border-gray-300 text-sm" onClick={() => setShowModal(false)}>Close</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitUsername} className="space-y-3">
                  <label className="block text-sm text-gray-600">Enter your username to confirm this appointment</label>
                  <input
                    type="text"
                    autoFocus
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="e.g. manish500"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    disabled={confirming}
                  />

                  <div className="flex justify-end gap-3 mt-2">
                    <button type="button" className="px-4 py-2 rounded-md border border-gray-300 text-sm" onClick={() => { if(!confirming) setShowModal(false); }}>Cancel</button>
                    <button type="submit" disabled={confirming} className="px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r from-blue-600 to-green-500 disabled:opacity-70">
                      {confirming ? "Confirming..." : "Yes, Confirm"}
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
      {/* ToastContainer local to this component */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {renderBody()}
    </div>
  );
}
