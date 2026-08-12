// src/Components/ConcernForm.jsx
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import axios from "axios";

const ConcernForm = ({ authToken }) => {
  const { appointmentId } = useParams();
  const sigPadRef = useRef(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [concern, setConcern] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [driveLink, setDriveLink] = useState(null);
  const [prefilledPhone, setPrefilledPhone] = useState("");
  const [prefilledNameFromServer, setPrefilledNameFromServer] = useState("");

  // Modal states
  const [showSubmittingModal, setShowSubmittingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successText, setSuccessText] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const assessmentPdf = import.meta.env.VITE_ASSESSMENT_PDF_CONSENT || ""; // optional

  useEffect(() => {
    async function loadAppointment() {
      if (!appointmentId) return;
      try {
        const res = await axios.get(`${backendURL}/api/appointments/${appointmentId}`, { timeout: 8000 });
        if (res?.data?.success && res.data.appointment) {
          const appt = res.data.appointment;
          setPrefilledNameFromServer(appt.name || appt.patientName || "");
          setPrefilledPhone(appt.phone || appt.customer?.contact || "");
          if (!name) setName(appt.name || appt.patientName || "");
          if (!contact && (appt.phone || (appt.customer && appt.customer.contact))) {
            setContact(appt.phone || appt.customer?.contact || "");
          }
        }
      } catch (err) {
        console.debug("Appointment preload failed:", err?.message || err);
      }
    }
    loadAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId]);

  const clearSig = () => {
    if (sigPadRef.current) sigPadRef.current.clear();
  };

  // -----------------------
  // Canvas utilities
  // -----------------------
  function trimCanvas(srcCanvas) {
    try {
      const w = srcCanvas.width;
      const h = srcCanvas.height;
      const ctx = srcCanvas.getContext("2d");
      const data = ctx.getImageData(0, 0, w, h).data;

      let top = h, left = w, right = 0, bottom = 0;
      let found = false;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
          const isInk = a > 10 && !(r > 240 && g > 240 && b > 240);
          if (isInk) {
            found = true;
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
          }
        }
      }

      if (!found) return null;

      const cw = right - left + 1;
      const ch = bottom - top + 1;
      const out = document.createElement("canvas");
      out.width = cw;
      out.height = ch;
      const outCtx = out.getContext("2d");
      outCtx.fillStyle = "#ffffff";
      outCtx.fillRect(0, 0, cw, ch);
      outCtx.putImageData(ctx.getImageData(left, top, cw, ch), 0, 0);
      return out;
    } catch (e) {
      console.warn("trimCanvas failed:", e);
      return null;
    }
  }

  function canvasToDataUrl(canvas) {
    try {
      if (!canvas) return null;
      const trimmed = trimCanvas(canvas) || canvas;
      const tmp = document.createElement("canvas");
      tmp.width = trimmed.width;
      tmp.height = trimmed.height;
      const ctx = tmp.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, tmp.width, tmp.height);
      ctx.drawImage(trimmed, 0, 0);
      return tmp.toDataURL("image/png");
    } catch (e) {
      console.warn("canvasToDataUrl failed:", e);
      try { return canvas.toDataURL(); } catch (_) { return null; }
    }
  }

  function extractSignatureDataUrl() {
    try {
      const pad = sigPadRef && sigPadRef.current ? sigPadRef.current : null;
      console.debug("extractSignatureDataUrl: pad present?", !!pad);

      if (pad && typeof pad.getTrimmedCanvas === "function") {
        try {
          const c = pad.getTrimmedCanvas();
          console.debug("extractSignatureDataUrl: used getTrimmedCanvas()");
          return canvasToDataUrl(c);
        } catch (e) {
          console.debug("getTrimmedCanvas error:", e?.message || e);
        }
      }

      if (pad && typeof pad.getCanvas === "function") {
        try {
          const c = pad.getCanvas();
          console.debug("extractSignatureDataUrl: used getCanvas()");
          return canvasToDataUrl(c);
        } catch (e) {
          console.debug("getCanvas error:", e?.message || e);
        }
      }

      if (pad && typeof pad.toDataURL === "function") {
        try {
          const d = pad.toDataURL();
          console.debug("extractSignatureDataUrl: used pad.toDataURL()");
          if (d) return d;
        } catch (e) {
          console.debug("pad.toDataURL error:", e?.message || e);
        }
      }

      const altProps = ["_canvas", "canvas", "el", "_el"];
      for (const p of altProps) {
        if (pad && pad[p] && pad[p].nodeName === "CANVAS") {
          try {
            console.debug("extractSignatureDataUrl: used pad['" + p + "']");
            return canvasToDataUrl(pad[p]);
          } catch (e) {
            console.debug(`pad prop ${p} error:`, e?.message || e);
          }
        }
      }

      try {
        const domCanvas = document.querySelector(".sigCanvas, canvas.sigCanvas");
        if (domCanvas) {
          console.debug("extractSignatureDataUrl: used DOM querySelector('.sigCanvas')");
          return canvasToDataUrl(domCanvas);
        }
      } catch (e) {
        console.debug("DOM canvas query failed:", e?.message || e);
      }

      console.debug("extractSignatureDataUrl: no signature found");
      return null;
    } catch (outerErr) {
      console.warn("extractSignatureDataUrl outer error:", outerErr);
      return null;
    }
  }

  // Redirect helper (called after success modal)
  const doRedirect = () => {
    window.location.assign("https://www.zeromedixine.com/");
  };

  // Close success modal (manual)
  const closeSuccess = () => {
    setShowSuccessModal(false);
    doRedirect();
  };

  // -----------------------
  // Handle submit (PDF build + upload)
  // -----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setDriveLink(null);

    if (!name || !age || !concern || !date || !contact) {
      setMessage("Please fill all fields before submitting.");
      return;
    }

    if (sigPadRef.current && typeof sigPadRef.current.isEmpty === "function" && sigPadRef.current.isEmpty()) {
      const ok = window.confirm("You didn't add a signature. Submit without signature?");
      if (!ok) return;
    }

    setSubmitting(true);
    setShowSubmittingModal(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 48;
      let y = 56;

      // Header
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Zeromedixine", margin, y);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Comprehensive Pain & Rehab Care", margin, y + 18);

      // Title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Consent for Assessment & Treatment", pageWidth / 2, y + 60, { align: "center" });

      y += 90;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");

      // Details box
      const boxX = margin;
      const boxW = pageWidth - margin * 2;
      let curY = y;

      const leftColX = boxX + 8;
      const rightColX = boxX + boxW / 2 + 8;

      doc.setDrawColor(200);
      doc.rect(boxX, curY - 6, boxW, 140, "S");

      // Name & Age
      doc.setFont("helvetica", "bold");
      doc.text("Name:", leftColX, curY + 10);
      doc.setFont("helvetica", "normal");
      doc.text(name || prefilledNameFromServer || "-", leftColX + 60, curY + 10);

      doc.setFont("helvetica", "bold");
      doc.text("Age:", rightColX, curY + 10);
      doc.setFont("helvetica", "normal");
      doc.text(String(age || "-"), rightColX + 36, curY + 10);

      // Concern
      curY += 26;
      doc.setFont("helvetica", "bold");
      doc.text("Concern:", leftColX, curY + 10);
      doc.setFont("helvetica", "normal");
      const concernLines = doc.splitTextToSize(concern || "-", boxW - 16);
      doc.text(concernLines, leftColX, curY + 26);
      const concernHeight = concernLines.length * 12;

      // Date & Contact
      let afterConcernY = curY + 26 + concernHeight + 6;
      const infoY = afterConcernY + 6;
      doc.setFont("helvetica", "bold");
      doc.text("Date:", leftColX, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(date || "-", leftColX + 36, infoY);

      doc.setFont("helvetica", "bold");
      doc.text("Contact no:", rightColX, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(contact || "-", rightColX + 76, infoY);

      // Move pointer down
      y = infoY + 36;

      // Assessment doc link
      doc.setFont("helvetica", "bold");
      doc.text("Assessment Document:", leftColX, y);

      y += 18;

      if (assessmentPdf) {
        doc.setTextColor(0, 0, 255);
        doc.setFont("helvetica", "underline");
        doc.textWithLink("Click here to read the assessment document", leftColX, y, { url: assessmentPdf });
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        y += 20;
      } else {
        doc.setFont("helvetica", "normal");
        doc.text("(No assessment link provided)", leftColX, y);
        y += 20;
      }

      // Consent paragraph
      const consentPara = "I give my consent for assessment and treatment by Zeromedixine clinicians. I understand the nature of the assessment and agree to proceed.";
      const consentLines = doc.splitTextToSize(consentPara, boxW - 16);
      doc.text(consentLines, leftColX, y);
      y += consentLines.length * 12 + 18;

      // Acknowledgement checklist
      const ackLines = [
        "I have read and understood this consent form",
        "The treatment plan and risks were explained to me",
        "I agree to proceed with rehabilitation at Zeromedixine"
      ];
      doc.setFont("helvetica", "bold");
      doc.text("By signing below, I acknowledge that:", leftColX, y);
      y += 16;
      doc.setFont("helvetica", "normal");
      const ackWrapped = [];
      ackLines.forEach((l) => {
        const wrapped = doc.splitTextToSize(l, boxW - 24);
        ackWrapped.push(...wrapped);
      });
      doc.text(ackWrapped, leftColX, y);
      y += ackWrapped.length * 12 + 24;

      // Signature embedding (bottom-right)
      const sigDataUrl = extractSignatureDataUrl();
      console.debug("Signature data url present:", !!sigDataUrl, sigDataUrl ? ("len=" + sigDataUrl.length) : "");

      if (sigDataUrl) {
        await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            try {
              const sigW = Math.min(200, img.width);
              const sigH = (img.height / img.width) * sigW;
              const sigX = pageWidth - margin - sigW;
              const sigY = pageHeight - margin - sigH - 8;

              try {
                doc.addImage(sigDataUrl, "PNG", sigX, sigY, sigW, sigH);
                console.debug("Signature added as PNG to PDF");
              } catch (pngErr) {
                console.warn("PNG add failed:", pngErr);
                const tmpCanvas = document.createElement("canvas");
                tmpCanvas.width = img.width;
                tmpCanvas.height = img.height;
                const tctx = tmpCanvas.getContext("2d");
                tctx.fillStyle = "#ffffff";
                tctx.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height);
                tctx.drawImage(img, 0, 0);
                const jpegData = tmpCanvas.toDataURL("image/jpeg", 0.9);
                try {
                  doc.addImage(jpegData, "JPEG", sigX, sigY, sigW, sigH);
                  console.debug("Signature added as JPEG to PDF");
                } catch (jpegErr) {
                  console.error("Failed to add signature as JPEG too:", jpegErr);
                  doc.setFontSize(10);
                  doc.text("(Signature could not be embedded)", sigX, sigY + 10);
                }
              }

              // name under signature
              doc.setFontSize(10);
              doc.setFont("helvetica", "normal");
              doc.text(name || "-", sigX, sigY + sigH + 14);
            } catch (e) {
              console.error("Unexpected error embedding signature:", e);
            } finally {
              resolve();
            }
          };
          img.onerror = (err) => {
            console.warn("Signature image load error:", err);
            const sigY = pageHeight - margin - 40;
            doc.setFontSize(10);
            doc.text("(No signature captured)", pageWidth - margin - 140, sigY);
            resolve();
          };
          img.src = sigDataUrl;
        });
      } else {
        const sigY = pageHeight - margin - 40;
        doc.setFontSize(10);
        doc.text("(No signature captured)", pageWidth - margin - 140, sigY);
      }

      // Signed timestamp bottom-left
      doc.setFontSize(9);
      doc.text(`Signed electronically on ${new Date().toLocaleString()}`, margin, pageHeight - margin - 8);

      // prepare blob and upload
      const pdfArrayBuffer = doc.output("arraybuffer");
      const pdfBlob = new Blob([pdfArrayBuffer], { type: "application/pdf" });
      const filename = `consent_${appointmentId || "anon"}_${Date.now()}.pdf`;

      const formData = new FormData();
      formData.append("appointmentId", appointmentId || "");
      formData.append("patientId", appointmentId || "");
      formData.append("name", name);
      formData.append("age", age);
      formData.append("concern", concern);
      formData.append("date", date);
      formData.append("contact", contact);
      formData.append("assessmentLink", assessmentPdf);
      formData.append("file", pdfBlob, filename);

      const headers = {};
      if (authToken) headers.Authorization = `Bearer ${authToken}`;

      const res = await axios.post(`${backendURL}/api/consent`, formData, {
        headers,
        timeout: 120000,
      });

      if (res?.data?.success) {
        setMessage("");
        setDriveLink(res.data.driveUrl || res.data.link || null);
        const serverMsg = res.data.message || "Consent submitted successfully.";
        setSuccessText(serverMsg);
        setShowSuccessModal(true);

        // Auto-redirect after short delay so user sees success modal
        setTimeout(() => {
          doRedirect();
        }, 1800);
      } else {
        setMessage(res?.data?.message || "Upload failed");
      }
    } catch (err) {
      console.error("Error uploading consent (frontend):", err?.response?.data || err.message || err);
      if (err?.response?.status === 413) {
        setMessage("File too large for server. Try reducing file size or increase server limit.");
      } else {
        setMessage("Server error while uploading. Try again later.");
      }
    } finally {
      setSubmitting(false);
      setShowSubmittingModal(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-15 bg-white rounded shadow" style={{ marginTop: 30 }}>
      <h2 className="text-2xl font-semibold mb-4" style={{ color: "#1e8fd3" }}>CONSENT FORM</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              required
              disabled={showSubmittingModal}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border p-2 rounded"
              required
              disabled={showSubmittingModal}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Concern / Details</label>
            <textarea
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              rows={5}
              className="w-full border p-2 rounded"
              required
              disabled={showSubmittingModal}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded"
              required
              disabled={showSubmittingModal}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contact no</label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border p-2 rounded"
              required
              disabled={showSubmittingModal}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Read this document of consent for assessment for treatment</label>
          {assessmentPdf ? (
            <a href={assessmentPdf}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline">
              Click here to read the assessment document
            </a>
          ) : (
            <div className="text-sm text-gray-600">No assessment document configured.</div>
          )}
        </div>

        {/* Acknowledgement block */}
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <div className="font-semibold mb-2">By signing below, I acknowledge that:</div>
          <ul className="list-none text-sm space-y-1">
            <li>✔️ I have read and understood this consent form</li>
            <li>✔️ The treatment plan and risks were explained to me</li>
            <li>✔️ I agree to proceed with rehabilitation at Zeromedixine</li>
          </ul>
        </div>

        <div className="mb-3 mt-4">
          <label className="block text-sm mb-1">Signature (draw in box)</label>
          <div style={{ border: "1px solid #ccc", width: "100%", height: 160 }}>
            <SignatureCanvas
              ref={sigPadRef}
              penColor="black"
              canvasProps={{ width: 800, height: 160, className: "sigCanvas" }}
            />
          </div>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={clearSig}
              className="px-3 py-2 border rounded"
              disabled={showSubmittingModal}
            >
              Clear
            </button>
            <button
              disabled={submitting || showSubmittingModal}
              type="submit"
              className="px-4 py-2 rounded"
              style={{ background: "#1e8fd3", color: "#fff" }}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      {message && <div className="mt-4 text-sm">{message}</div>}

      {driveLink && (
        <div className="mt-4">
          <strong>Open saved PDF:</strong>{" "}
          <a href={driveLink} target="_blank" rel="noreferrer" style={{ color: "#1e8fd3" }}>{driveLink}</a>
        </div>
      )}

      {/* Submitting Modal */}
      {showSubmittingModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 16
          }}
        >
          <div style={{ width: 360, background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", textAlign: "center" }}>
            {/* Inline SVG spinner (no external CSS required) */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <svg width="44" height="44" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#1e8fd3" strokeWidth="4" d="M25 5a20 20 0 1 0 20 20" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
            <h4 style={{ margin: 0, color: "#1e8fd3" }}>Submitting — please wait</h4>
            <p style={{ marginTop: 8, color: "#444", fontSize: 13 }}>We're preparing your consent PDF and uploading it securely.</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          onClick={() => {}}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 16
          }}
        >
          <div style={{ width: 420, background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: 0, color: "#1e8fd3" }}>Success</h3>
            <p style={{ marginTop: 8 }}>{successText || "Consent submitted successfully."}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
              <button
                onClick={closeSuccess}
                style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", background: "#fff" }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConcernForm;
