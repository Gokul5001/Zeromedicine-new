// src/components/ClinicAppointments.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ClinicAppointments() {
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "";
  const navigate = useNavigate();
  const { clinicId } = useParams();

  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [treatmentDate, setTreatmentDate] = useState("");

  // invoice loading map: patientId -> boolean
  const [invoiceLoadingMap, setInvoiceLoadingMap] = useState({});

  // invoice modal state
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoicePatient, setInvoicePatient] = useState(null);
  const [invoiceAmountRupees, setInvoiceAmountRupees] = useState(""); // rupees as string
  const [invoiceNotes, setInvoiceNotes] = useState("");

  // transfer loading map: patientId -> boolean
const [transferLoadingMap, setTransferLoadingMap] = useState({});

// transfer modal state
const [transferModalOpen, setTransferModalOpen] = useState(false);
const [transferPatient, setTransferPatient] = useState(null);
const [transferToClinic, setTransferToClinic] = useState("Zeromedixine"); // prefilled
const [transferTreatment, setTransferTreatment] = useState("");
const [transferNotes, setTransferNotes] = useState("");

// list of zeromedixine clinics for dropdown
const [zeroClinics, setZeroClinics] = useState([]);
const [zeroClinicsLoading, setZeroClinicsLoading] = useState(false);

const [concerns, setConcerns] = useState([]);
const [selectedConcern, setSelectedConcern] = useState("");

  // modal state
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [addInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false);
const [invoicePatientId, setInvoicePatientId] = useState("");
const [invoiceTreatment, setInvoiceTreatment] = useState("");
const [invoiceAmount, setInvoiceAmount] = useState("");
const [invoiceTreatmentDate, setInvoiceTreatmentDate] = useState("");
const [invoiceTreatmentTime, setInvoiceTreatmentTime] = useState("");



const [submittingInvoice, setSubmittingInvoice] = useState(false);


  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, treatmentDate, clinicId]);

  // ---------- helper: format HH:mm or HH:mm:ss to 12-hour format ----------
  function formatTo12Hour(timeStr) {
    if (!timeStr) return "";
    try {
      const parts = String(timeStr).trim().split(":");
      if (parts.length < 2) return timeStr;
      let hour = parseInt(parts[0], 10);
      const minute = parts[1].padStart(2, "0");
      if (Number.isNaN(hour)) return timeStr;
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      if (hour === 0) hour = 12;
      return `${String(hour).padStart(2, "0")}:${minute} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  }

  // fetch only public endpoint (no auth) for listing
  async function fetchPatients() {
    setLoading(true);
    try {
      if (!clinicId) {
        toast.error("Clinic id missing in URL", { position: "top-right" });
        setLoading(false);
        return;
      }

      const params = { page, limit };
      if (q && q.trim()) params.q = q.trim();
      if (treatmentDate) params.treatmentDate = treatmentDate;

      const res = await axios.get(`${API_BASE}/api/clinics/patients/public/${clinicId}`, {
        params,
        timeout: 10000,
      });

      if (res.data?.success) {
        setPatients(res.data.data || []);
        setTotal(res.data.total || 0);
      } else {
        toast.error(res.data?.message || "Failed to load appointments", { position: "top-right" });
      }
    } catch (err) {
      console.error("Public fetch failed:", err);
      const msg = err?.response?.data?.message || err?.message || "Server error";
      toast.error(msg, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  }

  // ---------- Create Invoice (frontend) ----------
  const openInvoiceModal = (patient) => {
    setInvoicePatient(patient);
    setInvoiceAmountRupees(""); // reset
    setInvoiceNotes("");
    setInvoiceModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeInvoiceModal = () => {
    setInvoicePatient(null);
    setInvoiceModalOpen(false);
    document.body.style.overflow = "";
  };

  const openAddInvoiceModal = () => {
    setInvoicePatientId("");
    setInvoiceTreatment("");
    setInvoiceAmount("");
    setAddInvoiceModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeAddInvoiceModal = () => {
    setAddInvoiceModalOpen(false);
    document.body.style.overflow = "";
  };

  const uniquePatients = React.useMemo(() => {
    const map = new Map();
  
    patients.forEach((p) => {
      if (!map.has(p.mobile)) {
        map.set(p.mobile, p);
      }
    });
  
    return Array.from(map.values());
  }, [patients]);

  

  const submitInvoice = async () => {
    if (!invoicePatient || !invoicePatient._id) return toast.error("No patient selected");
    const patientId = invoicePatient._id;

    // validate amount
    const amtStr = (invoiceAmountRupees || "").toString().trim();
    if (!amtStr) return toast.error("Enter treatment amount (in ₹)");
    const amtNum = Number(amtStr.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(amtNum) || amtNum < 0) return toast.error("Invalid amount");

    const amountPaise = Math.round(amtNum * 100);

    try {
      setInvoiceLoadingMap((m) => ({ ...m, [patientId]: true }));

      const resp = await axios.post(
        `${API_BASE}/api/clinics/patients/${patientId}/generate-invoice`,
        {
          amount: amountPaise, // paise
          notes: invoiceNotes || `Invoice for ${invoicePatient.treatment || "treatment"}`,
          description: invoicePatient.treatment || "Treatment",
        },
        { withCredentials: true, timeout: 30000 }
      );

      if (resp?.data?.success) {
        toast.success("Invoice created", { position: "top-right" });
        const invoice = resp.data.invoice || null;

        setPatients((prev) => prev.map((p) => (String(p._id) === String(patientId) ? { ...p, invoice: invoice || p.invoice } : p)));
        if (selectedPatient && String(selectedPatient._id) === String(patientId)) {
          setSelectedPatient((s) => ({ ...s, invoice: invoice || s.invoice }));
        }

        closeInvoiceModal();
      } else {
        toast.error(resp?.data?.message || "Invoice generation failed", { position: "top-right" });
      }
    } catch (err) {
      console.error("Create invoice error:", err);
      const msg = err?.response?.data?.message || err?.message || "Server error creating invoice";
      toast.error(msg, { position: "top-right" });
    } finally {
      setInvoiceLoadingMap((m) => ({ ...m, [patientId]: false }));
    }
  };

  function totalPages() {
    return Math.max(1, Math.ceil(total / limit));
  }

  // ---------- Modal helpers ----------
  const openPatientModal = useCallback((patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePatientModal = useCallback(() => {
    setSelectedPatient(null);
    setModalOpen(false);
    document.body.style.overflow = "";
  }, []);


  // ---------- Transfer (frontend) ----------
  const openTransferModal = (patient) => {
    setTransferPatient(patient);
    // if clinics loaded, preselect first clinic id, otherwise empty
    setTransferToClinic((zeroClinics && zeroClinics.length > 0) ? String(zeroClinics[0]._id) : "");
    setTransferTreatment(""); // always empty
    setTransferNotes("");
    setTransferModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  

const closeTransferModal = () => {
  setTransferPatient(null);
  setTransferModalOpen(false);
  setTransferToClinic("Zeromedixine");
  setTransferTreatment("");
  setTransferNotes("");
  document.body.style.overflow = "";
};

const submitNewInvoice = async () => {
  if (submittingInvoice) return;

  if (!invoicePatientId) return toast.error("Select patient");
  if (!invoiceTreatment.trim()) return toast.error("Enter treatment");
  if (!invoiceAmount) return toast.error("Enter amount");
  if (!invoiceTreatmentDate) return toast.error("Select treatment date");
  if (!invoiceTreatmentTime) return toast.error("Select treatment time");

  const basePatient = patients.find(p => p._id === invoicePatientId);
  if (!basePatient) return toast.error("Patient not found");

  const combinedDateTime = new Date(
    `${invoiceTreatmentDate}T${invoiceTreatmentTime}:00`
  );

  try {
    setSubmittingInvoice(true); // ✅ START LOADING

    // 1️⃣ CREATE NEW VISIT
    const createRes = await axios.post(
      `${API_BASE}/api/clinics/patients`,
      {
        name: basePatient.name,
        mobile: basePatient.mobile,
        age: basePatient.age,
        email: basePatient.email,
        gender: basePatient.gender,
        address: basePatient.address,
        treatment: invoiceTreatment,
        treatmentDate: combinedDateTime.toISOString(),
        treatmentTime: invoiceTreatmentTime,
        notes: "Auto-created from Add Invoice",
      },
      { withCredentials: true }
    );

    if (!createRes.data.success) {
      throw new Error("Failed to create visit");
    }

    const newPatientId = createRes.data.patientId;

    // 2️⃣ GENERATE INVOICE
    await axios.post(
      `${API_BASE}/api/clinics/patients/${newPatientId}/generate-invoice`,
      {
        description: invoiceTreatment,
        amount: Math.round(Number(invoiceAmount) * 100),
        notes: `Invoice for ${invoiceTreatment}`,
      },
      { withCredentials: true }
    );

    toast.success("Invoice created successfully ✅");
    fetchPatients();
    closeAddInvoiceModal();

  } catch (err) {
    console.error(err);
    toast.error("Invoice creation failed");
  } finally {
    setSubmittingInvoice(false); // ✅ STOP LOADING
  }
};






useEffect(() => {
  async function loadConcerns() {
    try {
      const res = await axios.get(`${API_BASE}/api/concerns`);
      setConcerns(res.data || []);
    } catch (err) {
      console.error("Failed to load concerns", err);
    }
  }
  
  loadConcerns();
}, []);





const submitTransfer = async () => {
  if (!transferPatient || !transferPatient._id) return toast.error("No patient selected");
  const patientId = transferPatient._id;

  // basic validation
  if (!transferToClinic) return toast.error("Select destination clinic");
  if (!selectedConcern)
  return toast.error("Select a treatment before transfer");

  try {
    setTransferLoadingMap((m) => ({ ...m, [patientId]: true }));

    // NOTE: adjust endpoint/body to match your backend if required
    const resp = await axios.post(
      `${API_BASE}/api/clinics/patients/${patientId}/transfer`,
      {
        toClinic: transferToClinic,
        concernId: selectedConcern,   // 👈 NEW FIELD
        notes: transferNotes || "",
      },
      { withCredentials: true, timeout: 30000 }
    );
    

    if (resp?.data?.success) {
      toast.success("Patient transferred", { position: "top-right" });

      // Update local patient list: mark transferred (or filter out if you prefer removal)
      const transferInfo = resp.data.transfer || { toClinic: transferToClinic, treatment: transferTreatment.trim(), notes: transferNotes };
      setPatients((prev) =>
        prev.map((p) => (String(p._id) === String(patientId) ? { ...p, transferred: true, transferInfo, clinicTransferredTo: transferToClinic } : p))
      );

      if (selectedPatient && String(selectedPatient._id) === String(patientId)) {
        setSelectedPatient((s) => ({ ...s, transferred: true, transferInfo, clinicTransferredTo: transferToClinic }));
      }

      closeTransferModal();
    } else {
      toast.error(resp?.data?.message || "Transfer failed", { position: "top-right" });
    }
  } catch (err) {
    console.error("Transfer error:", err);
    const msg = err?.response?.data?.message || err?.message || "Server error during transfer";
    toast.error(msg, { position: "top-right" });
  } finally {
    setTransferLoadingMap((m) => ({ ...m, [patientId]: false }));
  }
};

useEffect(() => {
  async function loadZeroClinics() {
    try {
      setZeroClinicsLoading(true);
      const res = await axios.get(`${API_BASE}/api/clinics/patients/clinics`, { timeout: 10000 });
      if (res?.data?.success) {
        setZeroClinics(res.data.data || []);
      } else {
        console.warn("Could not load zeromedixine clinics", res?.data);
      }
    } catch (err) {
      console.error("Load zeromedixine clinics error:", err);
    } finally {
      setZeroClinicsLoading(false);
    }
  }
  loadZeroClinics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);




  // close modal on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        closePatientModal();
        closeInvoiceModal();
      }
    }
    if (modalOpen || invoiceModalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, invoiceModalOpen, closePatientModal]);

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-white to-blue-50 p-6">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/clinic/dashboard");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white rounded-xl shadow hover:opacity-95 transition"
        >
          ← Back
        </button>

        <div className="flex items-center justify-between mb-6 py-7">
          <div>
            <h1 className="text-2xl font-semibold">Appointments / Treatments</h1>
            <p className="text-sm text-gray-500">List of patients with scheduled treatment details</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search name, mobile or treatment..."
              className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="date"
              value={treatmentDate}
              onChange={(e) => { setTreatmentDate(e.target.value); setPage(1); }}
              className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={() => { setQ(""); setTreatmentDate(""); setPage(1); }}
              className="px-3 py-2 rounded-xl bg-white border"
            >
              Clear
            </button>
            <button
              onClick={() => navigate("/clinic/patients/add")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white"
            >
              + Add Patient
            </button>

            <button
  onClick={() => openAddInvoiceModal()}
  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white"
            >
              + Add Invoice
            </button>


          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600 border-b">
                <th className="py-3 px-4">S.No</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Mobile</th>
                <th className="py-3 px-4">Treatment</th>
                <th className="py-3 px-4">Treatment Date</th>
                <th className="py-3 px-4">Treatment Time</th>
                <th className="py-3 px-4">Transferred To</th>
                <th className="py-3 px-4">Added</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="9" className="py-6 text-center text-gray-500">Loading…</td></tr>
              ) : patients.length === 0 ? (
                <tr><td colSpan="9" className="py-6 text-center text-gray-500">No appointments found.</td></tr>
              ) : (
                patients.map((p, index) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{(page - 1) * limit + (index + 1)}</td>
                    <td className="py-3 px-4">{p.name}</td>
                    <td className="py-3 px-4">{p.mobile}</td>
                    <td className="py-3 px-4">{p.treatment || "—"}</td>
                    <td className="py-3 px-4">{p.treatmentDate ? new Date(p.treatmentDate).toLocaleDateString() : "—"}</td>
                    <td className="py-3 px-4">{p.treatmentTime ? formatTo12Hour(p.treatmentTime) : "—"}</td>
                    <td className="py-3 px-4">
  {p.transferredToName || (p.transferredTo && p.transferredTo.clinicName) || p.transferredTo || "—"}
</td>
                    <td className="py-3 px-4">{p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openPatientModal(p)}
                          className="px-3 py-1 rounded-xl bg-white text-[#1e8fd3] border"
                        >
                          View
                        </button>
                        {/* Transfer button (new) */}
<button
  onClick={() => openTransferModal(p)}
  disabled={!!transferLoadingMap[p._id]}
  className="px-3 py-1 rounded-xl bg-white text-[#1e8fd3] border"
>
  {transferLoadingMap[p._1d] ? "Transferring…" : "Transfer"}
</button>

                      </div>
                    </td>

                    {/* Invoice cell */}
                    <td className="py-3 px-4">
                      {p.invoice && p.invoice.url ? (
                        <a href={p.invoice.url} target="_blank" rel="noreferrer" className="text-sm text-[#1e8fd3] underline">
                          View Invoice
                        </a>
                      ) : (
                        <button
                          onClick={() => openInvoiceModal(p)}
                          disabled={!!invoiceLoadingMap[p._id]}
                          className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white"
                        >
                          {invoiceLoadingMap[p._id] ? "Creating…" : "+Invoice"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
          </div>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 rounded-lg border">Prev</button>
            <div className="px-3 py-1 rounded-lg border bg-white">Page {page}/{totalPages()}</div>
            <button disabled={page >= totalPages()} onClick={() => setPage(p => Math.min(totalPages(), p + 1))} className="px-3 py-1 rounded-lg border">Next</button>
          </div>
        </div>
      </div>

      

      {/* ---------- Patient Detail Modal ---------- */}
      {modalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-auto">
            <div className="flex items-start justify-between p-5 border-b">
              <div>
                <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                <div className="text-sm text-gray-500">Mobile: {selectedPatient.mobile}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={closePatientModal} className="text-gray-500 hover:text-gray-700">Close</button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400">Treatment</div>
                <div className="font-medium text-gray-800">{selectedPatient.treatment || "—"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Treatment Date</div>
                <div className="font-medium text-gray-800">
                  {selectedPatient.treatmentDate ? new Date(selectedPatient.treatmentDate).toLocaleDateString() : "—"}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Treatment Time</div>
                <div className="font-medium text-gray-800">{selectedPatient.treatmentTime ? formatTo12Hour(selectedPatient.treatmentTime) : "—"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">DOB</div>
                <div className="font-medium text-gray-800">{selectedPatient.dob ? new Date(selectedPatient.dob).toLocaleDateString() : "—"}</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-xs text-gray-400">Address</div>
                <div className="font-medium text-gray-800">{selectedPatient.address || "—"}</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-xs text-gray-400">Notes</div>
                <div className="font-medium text-gray-800 whitespace-pre-wrap">{selectedPatient.notes || "—"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Added</div>
                <div className="font-medium text-gray-800">{selectedPatient.createdAt ? new Date(selectedPatient.createdAt).toLocaleString() : "—"}</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-xs text-gray-400">Invoice</div>
                <div className="font-medium text-gray-800">
                  {selectedPatient.invoice && selectedPatient.invoice.url ? (
                    <a href={selectedPatient.invoice.url} target="_blank" rel="noreferrer" className="text-[#1e8fd3] underline">
                      {selectedPatient.invoice.filename || "View Invoice"}
                    </a>
                  ) : (
                    <div className="text-sm text-gray-500">No invoice generated</div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button onClick={closePatientModal} className="px-4 py-2 rounded-xl bg-white border">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}


{addInvoiceModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between p-5 border-b">
        <h3 className="text-lg font-semibold">Add Invoice</h3>
        <button onClick={closeAddInvoiceModal}>Close</button>
      </div>

      <div className="p-5 space-y-4">
        {/* Patient */}
        <select
          value={invoicePatientId}
          onChange={(e) => setInvoicePatientId(e.target.value)}
          className="w-full border rounded-xl px-3 py-2"
        >
          <option value="">Select Patient</option>
          {uniquePatients.map((p) => (
  <option key={p.mobile} value={p._id}>
    {p.name} – {p.mobile}
  </option>
))}

        </select>

        {/* Treatment */}
        <input
          value={invoiceTreatment}
          onChange={(e) => setInvoiceTreatment(e.target.value)}
          placeholder="Treatment name"
          className="w-full border rounded-xl px-3 py-2"
        />


          {/* Treatment */}
            {/* Treatment Date */}
            <input
          type="date"
          value={invoiceTreatmentDate}
          onChange={(e) => setInvoiceTreatmentDate(e.target.value)}
          className="w-full border rounded-xl px-3 py-2"
        />

        {/* Treatment Time */}
        <input
          type="time"
          value={invoiceTreatmentTime}
          onChange={(e) => setInvoiceTreatmentTime(e.target.value)}
          className="w-full border rounded-xl px-3 py-2"
        />



        {/* Amount */}
        <input
          value={invoiceAmount}
          onChange={(e) => setInvoiceAmount(e.target.value)}
          placeholder="Amount (₹)"
          inputMode="numeric"
          className="w-full border rounded-xl px-3 py-2"
        />

        <div className="flex justify-end gap-2">
          <button onClick={closeAddInvoiceModal} className="px-4 py-2 border rounded-xl">
            Cancel
          </button>
          <button
  onClick={submitNewInvoice}
  disabled={submittingInvoice}
  className={`px-4 py-2 rounded-xl text-white flex items-center justify-center gap-2
    ${submittingInvoice 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6]"}`}
>
  {submittingInvoice ? "Submitting… Please wait" : "Create Invoice"}
</button>

        </div>
      </div>
    </div>
  </div>
)}


      {/* ---------- Invoice Modal ---------- */}
      {invoiceModalOpen && invoicePatient && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold">Create Invoice for {invoicePatient.name}</h3>
              <button onClick={closeInvoiceModal} className="text-gray-500 hover:text-gray-700">Close</button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Treatment Amount (₹)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={invoiceAmountRupees}
                  onChange={(e) => setInvoiceAmountRupees(e.target.value)}
                  placeholder="e.g. 700"
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Notes (optional)</label>
                <textarea
                  value={invoiceNotes}
                  onChange={(e) => setInvoiceNotes(e.target.value)}
                  rows={3}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={closeInvoiceModal} className="px-4 py-2 rounded-xl border">Cancel</button>
                <button
                  onClick={submitInvoice}
                  disabled={!!invoiceLoadingMap[invoicePatient._id]}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white"
                >
                  {invoiceLoadingMap[invoicePatient._id] ? "Creating…" : "Create Invoice"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* ---------- Transfer Modal ---------- */}
{transferModalOpen && transferPatient && (
  <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-auto">
      <div className="flex items-center justify-between p-5 border-b">
        <h3 className="text-lg font-semibold">Transfer to Zeromedixine</h3>
        <button onClick={closeTransferModal} className="text-gray-500 hover:text-gray-700">Close</button>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Destination Clinic</label>
          <select
  value={transferToClinic}
  onChange={(e) => setTransferToClinic(e.target.value)}
  className="w-full border rounded-xl px-3 py-2 focus:outline-none"
>
  <option value="">Select destination clinic</option>
  {zeroClinics.map((c) => (
    <option key={c._id} value={c._id}>{c.clinicName}</option>
  ))}
</select>
{zeroClinicsLoading && <div className="text-xs text-gray-400 mt-1">Loading clinics…</div>}

        </div>
        <div>
  <label className="block text-sm text-gray-600 mb-1">Select Treatment</label>
  <select
    value={selectedConcern}
    onChange={(e) => setSelectedConcern(e.target.value)}
    className="w-full border rounded-xl px-3 py-2 focus:outline-none"
  >
    <option value="">Select Concern</option>
    {concerns.map((c) => (
      <option key={c._id} value={c._id}>{c.concern}</option>
    ))}
  </select>
</div>


        <div>
          <label className="block text-sm text-gray-600 mb-1">Reason (optional)</label>
          <textarea
            value={transferNotes}
            onChange={(e) => setTransferNotes(e.target.value)}
            rows={3}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={closeTransferModal} className="px-4 py-2 rounded-xl border">Cancel</button>
          <button
            onClick={submitTransfer}
            disabled={!!transferLoadingMap[transferPatient._id]}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white"
          >
            {transferLoadingMap[transferPatient._id] ? "Transferring…" : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
}

