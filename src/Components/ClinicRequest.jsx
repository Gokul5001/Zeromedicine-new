// src/Components/ClinicRegistration.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function ClinicRegistration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    clinicName: "",
    registrationNumber: "",
    clinicNumber: "",
    ownerNumber: "",
    pincode: "",
    address: "",
    state: ""        
  });

  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function validate() {
    if (!form.clinicName.trim()) return "Clinic name is required";
    if (!form.registrationNumber.trim()) return "Registration number is required";
    if (!form.clinicNumber.trim()) return "Clinic number is required";
    if (!form.ownerNumber.trim()) return "Owner number is required";
    if (!/^\d{6}$/.test(form.pincode)) return "Valid 6 digit pincode is required";
    if (!form.address.trim()) return "Address is required";
    if (!form.state.trim()) return "State is required";
    return null;
  }


  async function submit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err, { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        clinicName: form.clinicName.trim(),
        registrationNumber: form.registrationNumber.trim(),
        clinicNumber: form.clinicNumber.trim(),
        ownerNumber: form.ownerNumber.trim(),
        pincode: form.pincode.trim(),
        address: form.address.trim(),
        state: form.state.trim()  
      };

      const res = await axios.post(`${API_BASE}/api/clinics/request`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        
      });

      if (res?.data?.success) {
        // server may return alreadyPending flag or clinicId
        if (res.data.alreadyPending) {
          toast.info("A pending request already exists for this registration number.", { position: "top-right" });
        } else {
          toast.success("Clinic request created successfully.", { position: "top-right" });
        }

        // navigate to clinics admin list (small delay so toast is visible)
        setTimeout(() => {
          navigate(`/admin/clinic%40zeromed/692ed936f9eabe94cd629002`);
                }, 900);
      } else {
        toast.error(res?.data?.message || "Request failed", { position: "top-right" });
      }
    } catch (err) {
      console.error("Clinic request error", err);
      const msg = err?.response?.data?.message || err?.message || "Server or network error";
      toast.error(msg, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-18 px-4 bg-gradient-to-b from-white to-blue-50">
      <ToastContainer />
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 relative">
        <h2 className="text-3xl font-bold mb-2">Clinic Registration Request</h2>
        <p className="text-sm text-gray-500 mb-6">Enter details to send request</p>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Clinic name</label>
              <input
                value={form.clinicName}
                onChange={e => updateField('clinicName', e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="e.g. ABC Physio Clinic"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Registration number</label>
              <input
                value={form.registrationNumber}
                onChange={e => updateField('registrationNumber', e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="e.g. REG-12345"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Clinic number</label>
              <input
                value={form.clinicNumber}
                onChange={e => updateField('clinicNumber', e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="e.g. CL-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Owner number</label>
              <input
                value={form.ownerNumber}
                onChange={e => updateField('ownerNumber', e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Owner mobile or contact number"
              />
            </div>
          </div>
          <div>
  <label className="block text-sm font-medium mb-1">Pincode</label>
  <input
    value={form.pincode}
    onChange={e => updateField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300"
    placeholder="e.g. 600028"
  />
</div>

<div className="md:col-span-2">
  <label className="block text-sm font-medium mb-1">Address</label>
  <textarea
    value={form.address}
    onChange={e => updateField("address", e.target.value)}
    rows={3}
    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300"
    placeholder="Clinic full address"
  />
</div>
<div>
  <label className="block text-sm font-medium mb-1">State</label>
  <input
    value={form.state}
    onChange={e => updateField("state", e.target.value)}
    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300"
    placeholder="e.g. Bangalore"
  />
</div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white font-semibold hover:opacity-95 transition disabled:opacity-60"
            >
              {loading ? 'Requesting...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
