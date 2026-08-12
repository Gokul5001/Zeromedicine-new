// src/pages/TransferConfirmClinic.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * TransferConfirmClinic.jsx
 * - FRONTEND-ONLY confirmation (no backend call)
 * - Single "Confirm" button that marks appointment.status = "confirmed" locally.
 * - Shows toast to user.
 */

export default function TransferConfirmClinic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState(null);

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
    async function fetchAppointment() {
      setLoading(true);
      setError(null);
      try {
        const cleanId = sanitizeId(id);
        if (!cleanId) throw new Error("Invalid appointment id");

        // Try to fetch appointment for display only (no confirm API will be called)
        const res = await fetch(`${backendURL}/api/appointments/${cleanId}`, { method: "GET", credentials: "include" })
          .then((r) => r.json());

        if (!mounted) return;
        const payload = res?.appointment ?? res ?? null;
        setAppointment(payload);
      } catch (err) {
        console.error("Error fetching transferred appointment:", err);
        if (!mounted) return;
        setAppointment(null);
        setError(err?.message || "Failed to fetch appointment");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchAppointment();
    return () => { mounted = false; };
  }, [id, backendURL]);

  const handleConfirm = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!appointment) {
      toast.error("No appointment loaded.", { position: "top-right" });
      return;
    }
    if (appointment.status && String(appointment.status).toLowerCase() === "confirmed") {
      toast.info("Appointment is already confirmed.", { position: "top-right" });
      return;
    }

    setConfirming(true);
    try {
      // FRONTEND-ONLY: update local state to confirmed
      const now = new Date().toISOString();
      setAppointment((prev) => ({
        ...prev,
        status: "confirmed",
        confirmedAt: now
      }));

      toast.success("Appointment confirmed", { position: "top-right" });

      // small UI delay then keep button disabled by virtue of appointment.status
      setTimeout(() => {
        setConfirming(false);
      }, 600);
    } catch (err) {
      console.error("Unexpected error confirming appointment (frontend-only):", err);
      toast.error("Unexpected error confirming appointment.", { position: "top-right" });
      setConfirming(false);
    }
  };

  const renderBody = () => {
    if (loading) return <div className="p-6 text-center">Loading transferred patient...</div>;
    if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    if (!appointment) return <div className="p-6 text-center">Transferred patient not found.</div>;

    const concernDisplay =
      appointment.primaryConcern && typeof appointment.primaryConcern === "object"
        ? appointment.primaryConcern.concern || appointment.primaryConcern._id
        : appointment.primaryConcern || "Not specified";

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
            <strong>Transfer Source Clinic:</strong>{" "}
            <span className="font-medium">{appointment.transferredFromName || appointment.transferredFrom || "Zeromedixine"}</span>
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
        </div>

        <div className="mt-6 flex gap-3 items-center">
          <button
            onClick={handleConfirm}
            disabled={confirming || (appointment.status && String(appointment.status).toLowerCase() === "confirmed")}
            className={`flex-1 py-3 rounded-full text-white font-semibold transition ${
              appointment.status === "confirmed"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] hover:opacity-95"
            }`}
          >
            {appointment.status === "confirmed" ? "Already Confirmed" : confirming ? "Confirming..." : "Confirm"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-3 border border-gray-300 rounded-full text-gray-700 font-medium bg-white"
            disabled={confirming}
          >
            Back
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Press Confirm to mark this transferred patient as confirmed (frontend-only; not persisted to server).
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-3xl">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
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
