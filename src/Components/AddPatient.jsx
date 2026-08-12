// src/components/AddPatient.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    age: "",
    email: "",
    gender: "male",
    address: "",
    notes: "",
    treatment: "",
    treatmentDate: "",
    treatmentTime: ""
  });
  const [submitting, setSubmitting] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validateEmail(email) {
    if (!email) return true; // optional
    // simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) {
      toast.error("Name and mobile are required", { position: "top-right" });
      return;
    }

    const ageNum = form.age === "" ? null : Number(form.age);
    if (form.age !== "" && (!Number.isFinite(ageNum) || ageNum < 0 || ageNum > 150)) {
      toast.error("Enter a valid age (0–150) or leave blank", { position: "top-right" });
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Enter a valid email address", { position: "top-right" });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        age: ageNum, // number or null
        email: form.email ? form.email.trim() : null,
        gender: form.gender || null,
        address: form.address || null,
        notes: form.notes || null,
        treatment: form.treatment || null,
        treatmentDate: form.treatmentDate || null,
        treatmentTime: form.treatmentTime || null
      };

      const res = await axios.post(`${API_BASE}/api/clinics/patients`, payload, {
        withCredentials: true,
        timeout: 10000
      });

      if (res.data?.success) {
        toast.success("Patient added", { position: "top-right" });
        setTimeout(() => navigate("/clinic/dashboard/UzI1NiIsInR5cCI6Ikp7GR2-s85s"), 700);
      } else {
        toast.error(res.data?.message || "Failed to add patient", { position: "top-right" });
      }
    } catch (err) {
      console.error("Add patient error:", err);
      const msg = err?.response?.data?.message || err?.message || "Server or network error";
      toast.error(msg, { position: "top-right" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-16 px-6 flex flex-col items-center">
      <ToastContainer />

      <div className="w-full max-w-4xl mb-6">
        <button
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/clinic/dashboard/UzI1NiIsInR5cCI6Ikp7GR2-s85s");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white rounded-xl shadow hover:opacity-95 transition"
        >
          ← Back
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2">Add Patient</h2>
        <p className="text-sm text-gray-500 mb-6">Add a patient to this clinic</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Patient full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={onChange}
                className="w-full border rounded-xl px-4 py-2"
                placeholder="Mobile number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                type="email"
                className="w-full border rounded-xl px-4 py-2"
                placeholder="patient@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                name="age"
                value={form.age}
                onChange={onChange}
                type="number"
                min="0"
                max="150"
                className="w-full border rounded-xl px-4 py-2"
                placeholder="e.g., 32"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={onChange}
                className="w-full border rounded-xl px-4 py-2"
              >
                 <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Date</label>
              <input
                name="treatmentDate"
                value={form.treatmentDate}
                onChange={onChange}
                type="date"
                className="w-full border rounded-xl px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Time</label>
            <input
              name="treatmentTime"
              value={form.treatmentTime}
              onChange={onChange}
              type="time"
              className="w-full border rounded-xl px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
            <input
              name="treatment"
              value={form.treatment}
              onChange={onChange}
              className="w-full border rounded-xl px-4 py-2"
              placeholder="Describe treatment (free text)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={onChange}
              className="w-full border rounded-xl px-4 py-2"
              placeholder="Address (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              className="w-full border rounded-xl px-4 py-2"
              rows={4}
              placeholder="Any notes (optional)"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate("/clinic/dashboard/UzI1NiIsInR5cCI6Ikp7GR2-s85s")} className="px-4 py-2 rounded-xl">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white"
            >
              {submitting ? "Adding…" : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
