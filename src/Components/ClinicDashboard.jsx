// src/components/ClinicDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Users,
  Calendar as CalendarIcon,
  PlusCircle,
  LogOut,
  Settings,
  UserPlus,
} from "lucide-react";

export default function ClinicDashboard() {
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "";
  const navigate = useNavigate();
  const { clinicId } = useParams();

  const [clinic, setClinic] = useState(null);
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0 });
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingPatient, setAddingPatient] = useState(false);
  const [addingDoctor, setAddingDoctor] = useState(false);
  const [patientForm, setPatientForm] = useState({ name: "", mobile: "", dob: "" });
  const [doctorForm, setDoctorForm] = useState({ name: "", speciality: "", mobile: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProfileAndStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicId]);

  async function tryGet(url, config = {}) {
    try {
      const r = await axios.get(url, config);
      return r && r.data ? r.data : null;
    } catch (e) {
      return null;
    }
  }

  async function fetchProfileAndStats() {
    setLoading(true);
    try {
      // If clinicId is present in the route, prefer using it
      let effectiveClinicId = clinicId || null;

      // If no clinicId in URL, try retrieving the clinic from auth cookie (/auth/me)
      if (!effectiveClinicId) {
        const profileRes = await axios.get(`${API_BASE}/api/clinics/auth/me`, { withCredentials: true, timeout: 8000 }).catch(() => null);
        if (profileRes && profileRes.data) {
          const u = profileRes.data.user || profileRes.data.clinic || profileRes.data;
          if (u) {
            setClinic(u || null);
            // backend id fields may be _id or id
            effectiveClinicId = u._id || u.id || null;
          }
        }
      }

      // Try dashboard-summary with effectiveClinicId if we have one
      if (effectiveClinicId) {
       

 

        // fetch recent patients public if still empty
        if ((!recentPatients || !recentPatients.length)) {
          const patientsRes = await axios.get(`${API_BASE}/api/clinics/patients/public/${effectiveClinicId}?page=1&limit=5`, { timeout: 10000 }).catch(() => null);
          if (patientsRes && patientsRes.data && patientsRes.data.success) {
            setRecentPatients(patientsRes.data.data || []);
            setStats((s) => ({ ...s, patients: patientsRes.data.total || (patientsRes.data.data ? patientsRes.data.data.length : s.patients) }));
          }
        }

        setLoading(false);
        return;
      }

      // If we reach here: no clinicId anywhere. Avoid calling /api/clinics/stats without clinicId (backend rejects it)
      // Instead try to load a generic profile (if any) and generic stats (only if your backend supports it)
      const profileFallback = await axios.get(`${API_BASE}/api/clinics/auth/me`, { withCredentials: true, timeout: 8000 }).catch(() => null);
      if (profileFallback && profileFallback.data) {
        const u = profileFallback.data.user || profileFallback.data.clinic || profileFallback.data;
        setClinic(u || null);
      }

      // Optional: try generic stats but wrap in try/catch — if backend requires clinicId it will return 400 which we avoid surfacing


    } catch (err) {
      console.error("Profile or stats fetch error:", err);
      toast.error("Failed to load clinic dashboard; check backend.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPatient(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: patientForm.name.trim(),
        mobile: patientForm.mobile.trim(),
        dob: patientForm.dob || null,
      };
      if (!payload.name || !payload.mobile) {
        toast.error("Patient name and mobile are required");
        setSubmitting(false);
        return;
      }

      // clinic-protected route (requires clinic auth cookie)
      const res = await axios.post(`${API_BASE}/api/clinics/patients`, payload, {
        withCredentials: true,
        timeout: 10000,
      });

      if (res.data?.success) {
        toast.success("Patient added successfully");
        setAddingPatient(false);
        setPatientForm({ name: "", mobile: "", dob: "" });
        // Refresh dashboard (counts + recent patients)
        await fetchProfileAndStats();
      } else {
        toast.error(res.data?.message || "Failed to add patient");
      }
    } catch (err) {
      console.error("Add patient error:", err);
      const msg = err?.response?.data?.message || err?.message || "Server error";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleAddDoctor(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: doctorForm.name.trim(),
        speciality: doctorForm.speciality.trim(),
        mobile: doctorForm.mobile.trim(),
      };
      if (!payload.name) {
        toast.error("Doctor name is required");
        setSubmitting(false);
        return;
      }

      const res = await axios.post(`${API_BASE}/api/clinics/doctors`, payload, {
        withCredentials: true,
        timeout: 10000,
      });

      if (res.data?.success) {
        toast.success("Doctor added successfully");
        setAddingDoctor(false);
        setDoctorForm({ name: "", speciality: "", mobile: "" });
        await fetchProfileAndStats();
      } else {
        toast.error(res.data?.message || "Failed to add doctor");
      }
    } catch (err) {
      console.error("Add doctor error:", err);
      const msg = err?.response?.data?.message || err?.message || "Server error";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  function handleLogout() {
    axios.post(`${API_BASE}/api/clinics/auth/logout`, {}, { withCredentials: true }).catch(() => {});
    navigate("/clinic/login");
  }

  return (
    <div className="min-h-screen py-19 bg-gradient-to-b from-white to-blue-50">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-2xl shadow-md">
              <Users className="w-8 h-8 text-[#1e8fd3]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Welcome, {clinic?.clinic_name || clinic?.name || "Your Clinic Dashboard"}
              </h1>
              <p className="text-sm text-gray-500">
                {clinic?.username ? `Signed in as ${clinic.username}` : "Manage patients, doctors & appointments"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(`/clinic/calendar/${clinic?._id || clinicId || ""}`)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Calendar</span>
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white rounded-xl shadow hover:opacity-95 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Stat Cards + Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow p-4 flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <User className="w-6 h-6 text-[#1e8fd3]" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Patients</div>
                <div className="text-2xl font-semibold">{loading ? "…" : stats.patients}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <UserPlus className="w-6 h-6 text-[#40d3b6]" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Doctors</div>
                <div className="text-2xl font-semibold">{loading ? "…" : stats.doctors}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-[#1e8fd3]" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Appointments</div>
                <div className="text-2xl font-semibold">{loading ? "…" : stats.patients}</div>
              </div>
            </div>  
          </div>

          <div className="flex flex-col gap-3">
          <button
              onClick={() => navigate("/clinic/patients/add")}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white shadow hover:shadow-md transition"
            >
              <PlusCircle className="w-5 h-5 text-[#1e8fd3]" />
              <span className="font-medium">Add Patient</span>
            </button>

            <button
              // onClick={() => setAddingDoctor(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white shadow hover:shadow-md transition"
            >
              <PlusCircle className="w-5 h-5 text-[#40d3b6]" />
              <span className="font-medium">Add Doctor</span>
            </button>

            <button
              onClick={() => navigate(`/clinic/appointments/${clinic?._id || clinicId || ""}`)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white shadow hover:opacity-95 transition"
            >
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium">Appointments</span>
            </button>
          </div>
        </div>

        {/* Lists / Quick Views */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Recent Patients</h3>
            <p className="text-sm text-gray-500 mb-3">Quick list of most recent patients added</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="py-2">S.No</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Mobile</th>
                    <th className="py-2">Treatment</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Time</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients && recentPatients.length ? (
                    recentPatients.map((p, idx) => (
                      <tr key={p._id || idx} className="border-t hover:bg-gray-50">
                        <td className="py-3 px-2">{idx + 1}</td>
                        <td className="py-3 px-2">{p.name || "-"}</td>
                        <td className="py-3 px-2">{p.mobile || "-"}</td>
                        <td className="py-3 px-2">{p.treatment || "—"}</td>
                        <td className="py-3 px-2">{p.treatmentDate ? new Date(p.treatmentDate).toLocaleDateString() : "—"}</td>
                        <td className="py-3 px-2">{p.treatmentTime ? (() => {
                          try {
                            const [hh, mm] = String(p.treatmentTime).split(":");
                            let h = parseInt(hh, 10);
                            const ampm = h >= 12 ? "PM" : "AM";
                            h = (h % 12) || 12;
                            return `${h}:${(mm || "00").padStart(2, "0")} ${ampm}`;
                          } catch (e) { return p.treatmentTime; }
                        })() : "—"}</td>
                        <td className="py-3 px-2">
                          <button               onClick={() => navigate(`/clinic/appointments/${clinic?._id || clinicId || ""}`)}
 className="px-3 py-1 rounded-full bg-blue-50 text-sm">View</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t">
                      <td className="py-3" colSpan={7}>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">No recent patients found.</div>
                          <button onClick={() => navigate("/clinic/patients/add")} className="px-3 py-1 rounded-full bg-blue-50 text-sm">Add</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Clinic Info</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div>
                <div className="text-xs text-gray-400">Clinic Name</div>
                <div className="font-medium">{clinic?.clinic_name || clinic?.name || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Username</div>
                <div className="font-medium">{clinic?.username || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Clinic Number</div>
                <div className="font-medium">{clinic?.email || clinic?.mobile_no || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Branch Address</div>
                <div className="font-medium">{clinic?.address || clinic?.address || "-"}</div>
              </div>
              <div className="pt-2">
                <button onClick={() => navigate(`/clinic/settings/${clinic?._id || clinicId || ""}`)} className="px-3 py-2 rounded-xl bg-white shadow hover:shadow-md">Edit profile</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer quick links */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>© {new Date().getFullYear()} {clinic?.clinic_name || "Your Clinic"}</div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-lg bg-white shadow" onClick={() => navigate("/reports")}>Reports</button>
            <button className="px-3 py-2 rounded-lg bg-white shadow" onClick={() => navigate("/billing")}>Billing</button>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {addingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Patient</h3>
              <button onClick={() => setAddingPatient(false)} className="text-gray-500">Close</button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Full name</label>
                <input
                  value={patientForm.name}
                  onChange={(e) => setPatientForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-2"
                  placeholder="Patient name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Mobile</label>
                <input
                  value={patientForm.mobile}
                  onChange={(e) => setPatientForm((p) => ({ ...p, mobile: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-2"
                  placeholder="Mobile number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
                <input
                  value={patientForm.dob}
                  onChange={(e) => setPatientForm((p) => ({ ...p, dob: e.target.value }))}
                  type="date"
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setAddingPatient(false)} className="px-4 py-2 rounded-xl">Cancel</button>
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
      )}

      {/* Add Doctor Modal */}
      {addingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Doctor</h3>
              <button onClick={() => setAddingDoctor(false)} className="text-gray-500">Close</button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Full name</label>
                <input
                  value={doctorForm.name}
                  onChange={(e) => setDoctorForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-2"
                  placeholder="Doctor name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Speciality</label>
                <input
                  value={doctorForm.speciality}
                  onChange={(e) => setDoctorForm((p) => ({ ...p, speciality: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-2"
                  placeholder="e.g. Orthopedics"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Mobile</label>
                <input
                  value={doctorForm.mobile}
                  onChange={(e) => setDoctorForm((p) => ({ ...p, mobile: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-2"
                  placeholder="Mobile (optional)"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setAddingDoctor(false)} className="px-4 py-2 rounded-xl">Cancel</button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white"
                >
                  {submitting ? "Adding…" : "Add Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
