// src/Components/ClinicDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, ExternalLink } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const FALLBACK_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-clinic-building-icon.jpg";

function driveToImage(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
}

export default function ClinicDetail({ clinicId, onClose, initialData = null }) {
  const [clinic, setClinic] = useState(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialData) fetchDetail();
    // eslint-disable-next-line
  }, [clinicId]);

  async function fetchDetail() {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/clinics/${clinicId}`);
      if (res.data?.success) {
        setClinic(res.data.data);
      } else {
        toast.error("Failed to load clinic");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  if (loading || !clinic) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-xl px-6 py-4">Loading…</div>
      </div>
    );
  }

  const agreementUrl = clinic?.other_details?.concernForm?.url;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <ToastContainer />
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-50 w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[85vh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* Header */}
        <div className="flex gap-5 items-start mb-6">
          <div className="w-28 h-28 rounded-2xl border bg-gray-50 overflow-hidden shadow-sm">
            <img
              src={driveToImage(clinic.profile_img) || FALLBACK_AVATAR}
              onError={(e) => (e.currentTarget.src = FALLBACK_AVATAR)}
              className="w-full h-full object-cover"
              alt="Clinic"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">{clinic.clinicName}</h2>
            <div className="text-sm text-gray-500">
              {clinic.specialisation} • {clinic.status.toUpperCase()}
            </div>

            <div className="mt-2 text-sm">
              <strong>Chief Doctor:</strong> {clinic.Chief_doctor || "—"}
            </div>
            <div className="text-sm">
              <strong>Role:</strong> {clinic.Role || "—"}
            </div>
          </div>
        </div>

        {/* BASIC DETAILS */}
        <Section title="Clinic Details">
          <KV label="Registration Number" value={clinic.registrationNumber} />
          <KV label="Clinic Phone" value={clinic.clinicNumber} />
          <KV label="Owner Phone" value={clinic.ownerNumber} />
          <KV label="Pincode" value={clinic.pincode} />
          <KV label="Address" value={clinic.address} full />
        </Section>

        {/* MEDICAL DETAILS */}
        <Section title="Medical Information">
          <KV label="Consult Fee" value={`₹ ${clinic.consult_fee || "—"}`} />
          <KV label="Clinic Timings" value={clinic.clinic_timing || "—"} />
        </Section>

        {/* ABOUT DOCTOR */}
        <Section title="About Doctor">
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {clinic.about_doctor || "—"}
          </p>
        </Section>

        {/* REDIRECT PATH */}
        <Section title="Public Profile">
          {clinic.redirect_path ? (
            <a
              href={`https://zeromedixine.com/${clinic.redirect_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              /{clinic.redirect_path}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-sm text-gray-500">—</span>
          )}
        </Section>

        {/* AGREEMENT */}
        <Section title="Agreement Document">
          {agreementUrl ? (
            <a
              href={agreementUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm hover:bg-gray-50"
            >
              View Agreement (PDF)
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-sm text-gray-500">No agreement uploaded</span>
          )}
        </Section>

        {/* META */}
        <Section title="System Info">
          <KV
            label="Created At"
            value={new Date(clinic.createdAt).toLocaleString()}
          />
          <KV
            label="Last Updated"
            value={new Date(clinic.updatedAt).toLocaleString()}
          />
        </Section>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small helpers ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function KV({ label, value, full = false }) {
  return (
    <div className={`text-sm ${full ? "" : "grid grid-cols-2 gap-3"}`}>
      <div className="text-gray-500">{label}</div>
      <div className="text-gray-800">{value || "—"}</div>
    </div>
  );
}
