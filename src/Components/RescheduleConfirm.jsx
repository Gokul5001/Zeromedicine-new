// // src/Components/RescheduleReview.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const RescheduleReview = () => {
//   const { addSessionId, index } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [session, setSession] = useState(null);
//   const [appointment, setAppointment] = useState(null);
//   const [packageInfo, setPackageInfo] = useState(null);

//   const navigate = useNavigate();
//   const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await axios.get(
//           `${backendURL}/api/add_sessions/${addSessionId}/session/${index}`
//         );
//         setSession(res.data.session);
//         setAppointment(res.data.appointment);
//         setPackageInfo(res.data.package);
//       } catch (err) {
//         console.error("load error", err);
//         alert("Unable to load request");
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, [addSessionId, index]);

//   const handleAction = async (action) => {
//     const logged = localStorage.getItem("user");
//     const userObj = logged ? JSON.parse(logged) : {};

//     try {
//       const url = `${backendURL}/api/add_sessions/${addSessionId}/session/${index}/${action}`;
//       const res = await axios.post(url, {
//         reviewedBy: userObj._id || userObj.id || null,
//         reviewNote: "",
//       });

//       if (res.data?.success) {
//         alert(
//           action === "confirm_reschedule"
//             ? "Reschedule confirmed 👍"
//             : "Reschedule rejected ❌"
//         );
//         navigate(
//           "/sessions/admin/" +
//             (userObj.username || "na") +
//             "/" +
//             (userObj._id || "")
//         );
//       } else {
//         alert("Action failed");
//       }
//     } catch (err) {
//       console.error("action err", err);
//       alert("Server error");
//     }
//   };

//   if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
//   if (!session) return <div style={{ padding: 20 }}>No session found</div>;

//   const r = session.reschedule || {};

//   return (
//     <div style={{ padding: 94, maxWidth: 900, margin: "0 auto" }}>
//       <h2 style={{ color: "#1e8fd3", marginBottom: 16 }}>
//         Reschedule Request — Session {session.index}
//       </h2>

//       {/* Patient + Package section */}
//       <div
//         style={{
//           padding: 16,
//           borderRadius: 10,
//           background: "#f0faff",
//           border: "1px solid #d7efff",
//           marginBottom: 20,
//         }}
//       >
//         <h3 style={{ color: "#1e8fd3", marginBottom: 10 }}>Patient Details</h3>

//         <div><strong>Name:</strong> {appointment?.name || "Unknown"}</div>
//         <div><strong>Phone:</strong> {appointment?.phone || "-"}</div>
//         <div>
//           <strong>Concern:</strong> {packageInfo?.concern || "Not provided"}
//         </div>
//         <div>
//           <strong>Package:</strong> {packageInfo?.package_name || "N/A"}
//         </div>
//       </div>

//       {/* Session Details */}
//       <div
//         style={{
//           padding: 16,
//           borderRadius: 10,
//           background: "#ffffff",
//           border: "1px solid #eee",
//         }}
//       >
//         <h3 style={{ color: "#40d3b6", marginBottom: 10 }}>Session Details</h3>

//         <div>
//           <strong>Current:</strong> {session.date || "-"} {session.time || "-"}
//         </div>

//         <div style={{ marginTop: 8 }}>
//           <strong>Requested:</strong> {r.newDate || "-"} {r.newTime || "-"}
//         </div>

//         <div style={{ marginTop: 8 }}>
//           <strong>Reason:</strong> {r.reason || "-"}
//         </div>

//         <div style={{ marginTop: 8 }}>
//           <strong>Requested at:</strong>{" "}
//           {r.requestedAt
//             ? new Date(r.requestedAt).toLocaleString()
//             : "-"}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div
//         style={{
//           marginTop: 20,
//           display: "flex",
//           gap: 10,
//           justifyContent: "flex-end",
//         }}
//       >
//         <button
//           onClick={() => handleAction("reject_reschedule")}
//           style={{
//             padding: "10px 16px",
//             border: "1px solid #ccc",
//             background: "#fff",
//             cursor: "pointer",
//             borderRadius: 6,
//           }}
//         >
//           Reject
//         </button>

//         <button
//           onClick={() => handleAction("confirm_reschedule")}
//           style={{
//             padding: "10px 16px",
//             background: "#1e8fd3",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//             borderRadius: 6,
//           }}
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RescheduleReview;
// src/Components/RescheduleReview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const RescheduleReview = () => {
  const { addSessionId, index } = useParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [packageInfo, setPackageInfo] = useState(null);

  const [showSubmittingModal, setShowSubmittingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successText, setSuccessText] = useState("");

  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `${backendURL}/api/add_sessions/${addSessionId}/session/${index}`
        );
        setSession(res.data.session);
        setAppointment(res.data.appointment);
        setPackageInfo(res.data.package);
      } catch (err) {
        console.error("load error", err);
        alert("Unable to load request");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addSessionId, index]);

  const doRedirect = () => {
    const logged = localStorage.getItem("user");
    const userObj = logged ? JSON.parse(logged) : {};
    navigate("/sessions/admin/" + (userObj.username || "na") + "/" + (userObj._id || ""));
  };

  const handleAction = async (action) => {
    const logged = localStorage.getItem("user");
    const userObj = logged ? JSON.parse(logged) : {};

    try {
      setShowSubmittingModal(true);

      const url = `${backendURL}/api/add_sessions/${addSessionId}/session/${index}/${action}`;
      const res = await axios.post(url, {
        reviewedBy: userObj._id || userObj.id || null,
        reviewNote: "",
      });

      if (res.data?.success) {
        setShowSubmittingModal(false);
        setSuccessText(
          action === "confirm_reschedule"
            ? "Reschedule confirmed successfully 👍"
            : "Reschedule request rejected ❌"
        );
        setShowSuccessModal(true);

        // Auto redirect
        setTimeout(() => doRedirect(), 1600);
      } else {
        setShowSubmittingModal(false);
        alert("Action failed");
      }
    } catch (err) {
      console.error("action err", err);
      setShowSubmittingModal(false);
      alert("Server error");
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!session) return <div style={{ padding: 20 }}>No session found</div>;

  const r = session.reschedule || {};

  return (
    <div style={{ padding: 94, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ color: "#1e8fd3", marginBottom: 16 }}>
        Reschedule Request — Session {session.index}
      </h2>

      {/* Patient Info */}
      <div
        style={{
          padding: 16,
          borderRadius: 10,
          background: "#f0faff",
          border: "1px solid #d7efff",
          marginBottom: 20,
        }}
      >
        <h3 style={{ color: "#1e8fd3", marginBottom: 10 }}>Patient Details</h3>

        <div><strong>Name:</strong> {appointment?.name || "Unknown"}</div>
        <div><strong>Phone:</strong> {appointment?.phone || "-"}</div>
        <div><strong>Concern:</strong> {packageInfo?.concern || "Not provided"}</div>
        <div><strong>Package:</strong> {packageInfo?.package_name || "N/A"}</div>
      </div>

      {/* Session Request Info */}
      <div
        style={{
          padding: 16,
          borderRadius: 10,
          background: "#ffffff",
          border: "1px solid #eee",
        }}
      >
        <h3 style={{ color: "#40d3b6", marginBottom: 10 }}>Session Details</h3>

        <div>
          <strong>Current:</strong> {session.date || "-"} {session.time || "-"}
        </div>

        <div style={{ marginTop: 8 }}>
          <strong>Requested:</strong> {r.newDate || "-"} {r.newTime || "-"}
        </div>

        <div style={{ marginTop: 8 }}>
          <strong>Reason:</strong> {r.reason || "-"}
        </div>

        <div style={{ marginTop: 8 }}>
          <strong>Requested at:</strong>{" "}
          {r.requestedAt ? new Date(r.requestedAt).toLocaleString() : "-"}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 10,
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => handleAction("reject_reschedule")}
          style={{
            padding: "10px 16px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
            borderRadius: 6,
          }}
        >
          Reject
        </button>

        <button
          onClick={() => handleAction("confirm_reschedule")}
          style={{
            padding: "10px 16px",
            background: "#1e8fd3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: 6,
          }}
        >
          Confirm
        </button>
      </div>

      {/* ------------------------- */}
      {/* Submitting Modal */}
      {/* ------------------------- */}
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
            padding: 16,
          }}
        >
          <div
            style={{
              width: 360,
              background: "#fff",
              borderRadius: 8,
              padding: 20,
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 50 50">
              <path
                fill="none"
                stroke="#1e8fd3"
                strokeWidth="4"
                d="M25 5a20 20 0 1 0 20 20"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>

            <h4 style={{ marginTop: 12, color: "#1e8fd3" }}>
              Submitting — please wait
            </h4>
            <p style={{ fontSize: 13, marginTop: 6 }}>
              Processing your action securely...
            </p>
          </div>
        </div>
      )}

      {/* ------------------------- */}
      {/* Success Modal */}
      {/* ------------------------- */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 16,
          }}
        >
          <div
            style={{
              width: 420,
              background: "#fff",
              borderRadius: 8,
              padding: 20,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ margin: 0, color: "#1e8fd3" }}>Success</h3>
            <p style={{ marginTop: 8 }}>{successText}</p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  doRedirect();
                }}
                style={{
                  padding: "8px 12px",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 6,
                }}
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

export default RescheduleReview;
