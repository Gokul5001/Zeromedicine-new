// src/components/ClinicRegister.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ClinicRegister() {
  const [clinicName, setClinicName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

  async function submit(e) {
    e.preventDefault();
    if (!clinicName.trim() || !username.trim() || !password) {
      toast.error("Please fill clinic name, username and password", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        clinic_name: clinicName.trim(),
        username: username.trim(),
        password,
      };

      const res = await axios.post(`${API_BASE}/api/clinics/auth/register`, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      });

      if (res.data?.success) {
        toast.success("Registration successful — logging you in", { position: "top-right" });
        // optional: wait for cookie to be set by server and then navigate
        setTimeout(() => navigate("/clinic/login"), 800);
      } else {
        toast.error(res.data?.message || "Registration failed", { position: "top-right" });
      }
    } catch (err) {
      console.error("Clinic register error:", err);
      const msg = err?.response?.data?.message || err?.message || "Server or network error";
      toast.error(msg, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 p-6">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2">Clinic Registration</h2>
        <p className="text-sm text-gray-500 mb-6">Create your clinic account</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
            <input
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. Sunshine Clinic"
              autoComplete="organization"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="username or email"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="choose a strong password"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white font-semibold hover:opacity-95 transition"
          >
            {loading ? "Registering…" : "Create Clinic Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Already registered? <a href="/clinic/login" className="text-blue-600 underline">Login here</a>
        </div>
      </div>
    </div>
  );
}


