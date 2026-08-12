// src/Components/PatientsDataTable.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const PatientsDataTable = () => {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [concernFilter, setConcernFilter] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendURL}/api/appointments/manish`)
      .then((res) => {
        const rows = (res.data || []).map((r) => ({
          id: r._id,
          name: r.name || "",
          age: r.age ?? "",
          gender: r.gender || "",
          phone: r.phone || "",
          email: r.email || "",
          primaryConcern: r.primaryConcern || "",
          appointment_date: r.appointment_date || "",
          appointment_time: r.appointment_time || "",
          cdate: r.cdate || "",
          ctime: r.ctime || "",
          notes: r.notes || "",
          address: r.address || "",
          language:r.language,
          doctorAssigned: r.doctorAssigned || "",
          status: r.status || ""
        }));
        setPatients(rows);
        setFiltered(rows);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setPatients([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatTime12h = (timeStr) => {
    if (!timeStr) return "";
    try {
      const [hour, minute] = timeStr.split(":");
      const h = parseInt(hour, 10);
      const suffix = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      // remove leading zero in minute if present (keeps two digits though)
      const mm = minute ? minute.padStart(2, "0") : "00";
      return `${hour12}:${mm} ${suffix}`;
    } catch {
      return timeStr;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    const qLower = q.trim().toLowerCase();
    const out = patients.filter((p) => {
      const matchesQ =
        !qLower ||
        (p.name && p.name.toLowerCase().includes(qLower)) ||
        (p.email && p.email.toLowerCase().includes(qLower)) ||
        (p.phone && p.phone.includes(qLower));
      const matchesGender = !genderFilter || p.gender === genderFilter;
      const matchesConcern = !concernFilter || p.primaryConcern === concernFilter;
      return matchesQ && matchesGender && matchesConcern;
    });
    setFiltered(out);
  }, [q, genderFilter, concernFilter, patients]);

  const viewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const columns = useMemo(
    () => [
      {
        name: "S.No",
        selector: (row, index) => index + 1,
        width: "80px",
        center: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <button
            onClick={() => viewPatient(row)}
            style={{
              background: "#1e8fd3",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: 6,
              cursor: "pointer",
            }}
            title="View details"
          >
            View
          </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      { name: "Patient Name", selector: (row) => row.name, sortable: true, minWidth: "160px" },
      { name: "Age", selector: (row) => row.age, sortable: true },
      { name: "Gender", selector: (row) => row.gender, sortable: true, maxWidth: "110px" },

      { name: "Phone", selector: (row) => row.phone, sortable: true, minWidth: "160px", wrap: true },
      { name: "Language", selector: (row) => row.language, sortable: true, minWidth: "160px", wrap: true },
      { name: "Doctor", selector: (row) => row.doctorAssigned, sortable: true, minWidth: "160px", wrap: true },
      { name: "Status", selector: (row) => row.status, sortable: true, minWidth: "160px", wrap: true },



      // Combined Appointment column (date + time)
      {
        name: "Appointment",
        selector: (row) => {
          const date = formatDate(row.appointment_date);
          const time = formatTime12h(row.appointment_time);
          if (date && time) return `${date}, ${time}`;
          if (date) return date;
          if (time) return time;
          return "-";
        },
        sortable: true,
        minWidth: "220px",
        wrap: true,
        // custom sort to handle combined value properly (by date then time)
        sortFunction: (a, b) => {
          const ad = a.appointment_date || "";
          const at = a.appointment_time || "";
          const bd = b.appointment_date || "";
          const bt = b.appointment_time || "";
          const aKey = `${ad} ${at}`;
          const bKey = `${bd} ${bt}`;
          return aKey.localeCompare(bKey);
        },
      },

      {
        name: "Created Date",
        selector: (row) => formatDate(row.cdate),
        sortable: true,
        minWidth: "150px",
        wrap: true,
      },
      {
        name: "Created Time",
        selector: (row) => formatTime12h(row.ctime),
        sortable: true,
        minWidth: "140px",
        wrap: true,
      },
    ],
    []
  );

  const exportXlsx = useCallback(() => {
    if (!filtered || filtered.length === 0) return alert("No data to export");
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `zeromedixine_patients_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }, [filtered]);

  const exportCsv = useCallback(() => {
    if (!filtered || filtered.length === 0) return alert("No data to export");
    const header = Object.keys(filtered[0]).join(",");
    const rows = filtered.map((r) =>
      Object.values(r)
        .map((v) => (v == null ? "" : String(v).replace(/"/g, '""')))
        .map((v) => `"${v}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `zeromedixine_patients_${new Date().toISOString().slice(0, 10)}.csv`);
  }, [filtered]);

  const concerns = useMemo(() => [...new Set(patients.map((p) => p.primaryConcern).filter(Boolean))], [patients]);
  const genders = useMemo(() => [...new Set(patients.map((p) => p.gender).filter(Boolean))], [patients]);

  const customStyles = {
    headRow: { style: { backgroundColor: "#f7fafc" } },
    rows: { style: { minHeight: "48px" } },
    pagination: { style: { borderTop: "1px solid #eee" } },
  };

  return (
    <div style={{ padding: 89, maxWidth: 1380, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 29, color: "#1e8fd3" }}>Patients / Appointments</h2>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, phone..."
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", minWidth: 220 }}
        />
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} style={{ padding: 8, borderRadius: 6 }}>
          <option value="">All Genders</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select value={concernFilter} onChange={(e) => setConcernFilter(e.target.value)} style={{ padding: 8, borderRadius: 6 }}>
          <option value="">All Concerns</option>
          {concerns.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button onClick={() => { setQ(""); setGenderFilter(""); setConcernFilter(""); }} style={{ padding: 8, borderRadius: 6 }}>
          Reset
        </button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={exportCsv} style={{ padding: 8, borderRadius: 6, background: "#1e8fd3", color: "#fff", border: "none" }}>
            Export CSV
          </button>
          <button onClick={exportXlsx} style={{ padding: 8, borderRadius: 6, background: "#40d3b6", color: "#fff", border: "none" }}>
            Export XLSX
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        progressPending={loading}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        customStyles={customStyles}
        paginationPerPage={20}
        noHeader
        dense={false}
      />

      {/* Modal */}
      {showModal && selectedPatient && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 760,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              padding: 20,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Modal header with title and close button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <h3 style={{ margin: 0, color: "#1e8fd3" }}>Patient Name: {selectedPatient.name || "-"}</h3>
                <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                  {selectedPatient.primaryConcern ? `Concern: ${selectedPatient.primaryConcern}` : null}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => {
                    if (selectedPatient.phone) {
                      navigator.clipboard.writeText(selectedPatient.phone);
                      alert("Phone copied to clipboard");
                    }
                  }}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Copy Phone
                </button>

                <button
                  onClick={closeModal}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    background: "#1e8fd3",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {/* <div><strong>Name:</strong> {selectedPatient.name || "-"}</div> */}
              <div><strong>Age:</strong> {selectedPatient.age || "-"}</div>
              <div><strong>Gender:</strong> {selectedPatient.gender || "-"}</div>
              <div><strong>Phone:</strong> {selectedPatient.phone || "-"}</div>
              <div><strong>Email:</strong> {selectedPatient.email || "-"}</div>
              <div style={{ gridColumn: "1 / -1" }}>
                <strong>Primary Concern:</strong> {selectedPatient.primaryConcern || "-"}
              </div>
              <div><strong>Language:</strong> {selectedPatient.language || "-"}</div>

              <div><strong>Appointment Date:</strong> {formatDate(selectedPatient.appointment_date)}, {formatTime12h(selectedPatient.appointment_time)} </div>
              <div><strong>Doctor:</strong> {selectedPatient.doctorAssigned || "-"}</div>
              <div><strong>Status:</strong> {selectedPatient.status || "-"}</div>


              {/* // <div><strong>Appointment Time:</strong> {formatTime12h(selectedPatient.appointment_time) || "-"}</div> */}
              <div><strong>Created Date:</strong> {formatDate(selectedPatient.cdate)}, {formatTime12h(selectedPatient.ctime)}</div>
              {/* <div><strong>Created Time:</strong> {formatTime12h(selectedPatient.ctime) || "-"}</div> */}

              {selectedPatient.address && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <strong>Address:</strong> {selectedPatient.address}
                </div>
              )}
              {selectedPatient.notes && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <strong>Notes:</strong>
                  <div style={{ whiteSpace: "pre-wrap" }}>{selectedPatient.notes}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsDataTable;
