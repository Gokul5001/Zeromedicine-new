// import React, { useEffect, useState, useMemo } from "react";
// import { useLocation, useSearchParams, useNavigate  } from "react-router-dom";
// import clinicHero from "../public/ssss.png";
// import { Stethoscope, Users, Star } from "lucide-react";

// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const API_BASE = import.meta.env.VITE_BACKEND_URL;

// /* ---------------- UTILS ---------------- */
// function driveToImage(url) {
//   if (!url) return null;
//   const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//   if (!match) return null;
//   return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
// }

// const FALLBACK_AVATAR =
//   "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg";

// /* ---------------- MAIN ---------------- */
// export default function Clinics() {
//   const location = useLocation();
//   const [searchParams] = useSearchParams();

//   const stateId = searchParams.get("state");
//   const districtId = searchParams.get("district");

//   const [clinics, setClinics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedLocality, setSelectedLocality] = useState("All");
//   const [locationTitle, setLocationTitle] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [selectedClinic, setSelectedClinic] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);

//   /* ---------- Fetch clinics ---------- */
//   useEffect(() => {
//     async function fetchClinics() {
//       try {
//         setLoading(true);
//         let url = "";

//         if (districtId) {
//           url = `${API_BASE}/api/states/district/${districtId}`;
//         } else if (stateId) {
//           url = `${API_BASE}/api/states/${stateId}`;
//         } else {
//           return;
//         }

//         const res = await fetch(url);
//         const data = await res.json();

//         if (data.success) {
//           setClinics(data.clinics);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchClinics();
//   }, [stateId, districtId]);

//   /* ---------- Location title ---------- */
//   useEffect(() => {
//     async function fetchLocationName() {
//       try {
//         if (districtId) {
//           const res = await fetch(
//             `${API_BASE}/api/states/district-name/${districtId}`
//           );
//           const data = await res.json();
//           if (data.success) setLocationTitle(data.name);
//           return;
//         }

//         if (stateId) {
//           const res = await fetch(`${API_BASE}/api/states`);
//           const data = await res.json();
//           if (data.success) {
//             const matched = data.states.find(s => s._id === stateId);
//             if (matched) setLocationTitle(matched.name);
//           }
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     fetchLocationName();
//   }, [stateId, districtId]);

//   /* ---------- Localities ---------- */
//   const localities = useMemo(
//     () => ["All", ...new Set(clinics.map(c => c.locality).filter(Boolean))],
//     [clinics]
//   );

//   const filteredClinics =
//     selectedLocality === "All"
//       ? clinics
//       : clinics.filter(c => c.locality === selectedLocality);

//   /* ---------- UI ---------- */
//   return (
//     <div className="bg-gray-50 min-h-screen">

//       {/* HERO */}
//       <section className="max-w-7xl mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
//             Verified Healthcare Network
//           </span>

//           <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
//             Our Healthcare Therapists in{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
//               {locationTitle}
//             </span>
//           </h1>

//           <p className="text-gray-600 mt-4 max-w-lg">
//             Consult verified physiotherapists and rehabilitation specialists
//             across trusted clinics.
//           </p>

//           <div className="flex gap-4 mt-8 flex-wrap">
//             <Stat icon={Stethoscope} label="Doctors" value={clinics.length} />
//             <Stat icon={Users} label="Patients Treated" value="20,000+" />
//             <Stat icon={Star} label="Avg Rating" value="4.8 / 5" />
//           </div>
//         </div>

//         <div className="hidden md:flex justify-end">
//           <img
//             src={clinicHero}
//             className="w-[420px] h-[360px] object-cover rounded-2xl"
//             alt="Clinics"
//           />
//         </div>
//       </section>

//       {/* LOCALITY FILTER */}
//       <section className="sticky top-20 z-30 bg-gray-50 border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3 overflow-x-auto">
//           {localities.map(loc => (
//             <button
//               key={loc}
//               onClick={() => setSelectedLocality(loc)}
//               className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap
//                 ${
//                   selectedLocality === loc
//                     ? "bg-blue-600 text-white shadow"
//                     : "bg-white border hover:bg-gray-100"
//                 }`}
//             >
//               {loc}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* CLINICS */}
//       <section className="max-w-7xl mx-auto px-4 pb-20">
//         {loading && (
//           <p className="mt-8 text-gray-500">Loading clinics...</p>
//         )}

//         {!loading && filteredClinics.length === 0 && (
//           <p className="mt-8 text-gray-500">No clinics found.</p>
//         )}

//         <div className="grid md:grid-cols-2 gap-8 mt-8">
//           {filteredClinics.map(clinic => (
//             <ClinicCard
//               key={clinic._id}
//               clinic={clinic}
//               onBook={() => {
//                 setSelectedClinic(clinic);
//                 setShowModal(true);
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       {/* MODALS */}
//       {showModal && selectedClinic && (
//         <BookingModal
//           clinic={selectedClinic}
//           onClose={() => setShowModal(false)}
//           onSuccess={() => setShowSuccess(true)}
//         />
//       )}

//       {showSuccess && (
//         <SuccessModal onClose={() => setShowSuccess(false)} />
//       )}
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function Stat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border">
//       <Icon size={18} />
//       <div>
//         <p className="text-xs text-gray-500">{label}</p>
//         <p className="font-semibold">{value}</p>
//       </div>
//     </div>
//   );
// }


// function ClinicCard({ clinic, onBook }) {
//   const navigate = useNavigate();
//   const imageSrc = driveToImage(clinic.profile_img) || FALLBACK_AVATAR;

//   return (
//     <div
//       onClick={() => navigate(`/${clinic.redirect_path}`)}
//       className="bg-white rounded-2xl border border-gray-200 shadow-sm 
//                  hover:shadow-md transition cursor-pointer"
//     >
//       {/* HEADER */}
//       <div className="flex gap-4 p-5 border-b">
//         <img
//           src={imageSrc}
//           onError={(e) => (e.target.src = FALLBACK_AVATAR)}
//           className="w-20 h-20 object-cover rounded-xl bg-gray-100"
//           alt="Doctor"
//         />

//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-900">
//             {clinic.Chief_doctor}
//           </h3>
//           <p className="text-sm text-gray-500">{clinic.Role}</p>

//           <p className="mt-2 text-sm">
//             <span className="text-gray-500">Consultation starts @</span>{" "}
//             <span className="font-semibold text-gray-900">
//               ₹{clinic.consult_fee}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* DETAILS */}
//       <div className="px-5 py-4 space-y-2 text-sm text-gray-700">
//         <p>
//           <span className="font-semibold text-gray-900">Clinic Location:</span>{" "}
//           {clinic.address}
//         </p>

//         <p>
//           <span className="font-semibold text-gray-900">Clinic Timing:</span>{" "}
//           {clinic.clinic_timing}
//         </p>
//       </div>

//       {/* ACTIONS (prevent card click) */}
//       <div
//         className="flex gap-3 px-5 py-4 border-t bg-gray-50 rounded-b-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <a
//           href={`tel:${clinic.ownerNumber}`}
//           className="flex-1 text-center py-2.5 rounded-lg border border-gray-300 text-sm font-medium"
//         >
//           Call Clinic
//         </a>

//         <button
//           onClick={onBook}
//           className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-blue-600 to-green-500"
//         >
//           Book Appointment
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ---------------- BOOKING MODAL ---------------- */

// function BookingModal({ clinic, onClose, onSuccess }) {
//   const [phone, setPhone] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function submitBooking() {
//     if (!patientName.trim() || !phone || phone.length < 10) return;

//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE}/api/clinic-bookings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           patientName,                 // ✅ NEW
//           patientWhatsApp: phone,
//           clinicId: clinic._id,
//           doctorName: clinic.Chief_doctor,
//           consultFee: clinic.consult_fee,
//           ownerNumber: clinic.ownerNumber,
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         onClose();
//         onSuccess();
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">

//         <button
//           onClick={onClose}
//           className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
//         >
//           ✕
//         </button>

//         <h3 className="text-lg font-semibold">Book Consultation</h3>

//         {/* 👤 PATIENT NAME */}
//         <div className="mt-4">
//           <label className="block text-sm font-medium mb-1">
//             Your Name
//           </label>
//           <input
//             type="text"
//             value={patientName}
//             onChange={(e) => setPatientName(e.target.value)}
//             placeholder="Enter your full name"
//             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* 📞 WHATSAPP NUMBER */}
//         <div className="mt-4">
//           <label className="block text-sm font-medium mb-1">
//             WhatsApp Number
//           </label>

//           <PhoneInput
//             country={"in"}
//             value={phone}
//             onChange={setPhone}
//             enableSearch
//             inputClass="!w-full !py-5 !pl-12 !pr-4 !rounded-lg"
//             containerClass="!w-full"
//           />
//         </div>

//         <button
//           disabled={loading}
//           onClick={submitBooking}
//           className="w-full mt-6 py-3 rounded-lg text-white font-medium
//                      bg-gradient-to-r from-blue-600 to-green-500
//                      hover:from-blue-700 hover:to-green-600 disabled:opacity-60"
//         >
//           {loading ? "Booking..." : "Book Appointment"}
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ---------------- SUCCESS MODAL ---------------- */

// function SuccessModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">

//         <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
//           ✓
//         </div>

//         <h3 className="text-lg font-semibold mt-4">
//           Booking Confirmed
//         </h3>

//         <p className="text-sm text-gray-600 mt-2">
//           Our team will contact you shortly on WhatsApp.
//         </p>

//         <button
//           onClick={onClose}
//           className="mt-6 w-full py-2.5 rounded-lg text-white font-medium
//                      bg-gradient-to-r from-blue-600 to-green-500"
//         >
//           Done
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useSearchParams, useNavigate, useParams } from "react-router-dom";
import clinicHero from "../public/ssss.png";
import { Stethoscope, Users, Star } from "lucide-react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

/* ---------------- UTILS ---------------- */
function driveToImage(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
}

const FALLBACK_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg";

/* ---------------- MAIN ---------------- */
export default function Clinics() {
  const { stateName, districtName  } = useParams();

  const location = useLocation();
  const [searchParams] = useSearchParams(); // ✅ FIXED
  const districtId = searchParams.get("district"); // (future use)

  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocality, setSelectedLocality] = useState("All");
  const [locationTitle, setLocationTitle] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  /* ---------- Fetch clinics (NEW LOGIC) ---------- */
  useEffect(() => {
    async function fetchClinics() {
      try {
        setLoading(true);
  
        // ✅ DISTRICT LEVEL
        if (districtName) {
          const res = await fetch(
            `${API_BASE}/api/states/by-district-name/${stateName}/${districtName}`
          );
  
          const data = await res.json();
  
          if (data.success) {
            setClinics(data.clinics);
            setLocationTitle(`${data.district}, ${data.state}`);
          } else {
            setClinics([]);
          }
  
          return;
        }
  
        // ✅ STATE LEVEL
        if (stateName) {
          const res = await fetch(
            `${API_BASE}/api/states/by-name/${stateName}`
          );
  
          const data = await res.json();
  
          if (data.success) {
            setClinics(data.clinics);
            setLocationTitle(data.state);
          } else {
            setClinics([]);
          }
        }
  
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchClinics();
  }, [stateName, districtName]);

  /* ---------- Localities ---------- */
  const localities = useMemo(
    () => ["All", ...new Set(clinics.map(c => c.locality).filter(Boolean))],
    [clinics]
  );

  const filteredClinics =
    selectedLocality === "All"
      ? clinics
      : clinics.filter(c => c.locality === selectedLocality);

  /* ---------- UI ---------- */
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
            Verified Healthcare Network
          </span>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Our Healthcare Therapists in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              {locationTitle}
            </span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-lg">
            Consult verified physiotherapists and rehabilitation specialists
            across trusted clinics.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <Stat icon={Stethoscope} label="Doctors" value={clinics.length} />
            <Stat icon={Users} label="Patients Treated" value="20,000+" />
            <Stat icon={Star} label="Avg Rating" value="4.8 / 5" />
          </div>
        </div>

        <div className="hidden md:flex justify-end">
          <img
            src={clinicHero}
            className="w-[420px] h-[360px] object-cover rounded-2xl"
            alt="Clinics"
          />
        </div>
      </section>

      {/* LOCALITY FILTER */}
      <section className="sticky top-20 z-30 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3 overflow-x-auto">
          {localities.map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedLocality(loc)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${
                  selectedLocality === loc
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white border hover:bg-gray-100"
                }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </section>

      {/* CLINICS */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {loading && (
          <p className="mt-8 text-gray-500">Loading clinics...</p>
        )}

        {!loading && filteredClinics.length === 0 && (
          <p className="mt-8 text-gray-500">No clinics found.</p>
        )}

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {filteredClinics.map(clinic => (
            <ClinicCard
              key={clinic._id}
              clinic={clinic}
              onBook={() => {
                setSelectedClinic(clinic);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* MODALS */}
      {showModal && selectedClinic && (
        <BookingModal
          clinic={selectedClinic}
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowSuccess(true)}
        />
      )}

      {showSuccess && (
        <SuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border">
      <Icon size={18} />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function ClinicCard({ clinic, onBook }) {
  const navigate = useNavigate();
  const imageSrc = driveToImage(clinic.profile_img) || FALLBACK_AVATAR;

  return (
    <div
      onClick={() => navigate(`/${clinic.redirect_path}`)}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm 
                 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex gap-4 p-5 border-b">
        <img
          src={imageSrc}
          onError={(e) => (e.target.src = FALLBACK_AVATAR)}
          className="w-20 h-20 object-cover rounded-xl bg-gray-100"
          alt="Doctor"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {clinic.Chief_doctor}
          </h3>
          <p className="text-sm text-gray-500">{clinic.Role}</p>

          <p className="mt-2 text-sm">
            <span className="text-gray-500">Consultation starts @</span>{" "}
            <span className="font-semibold text-gray-900">
              ₹{clinic.consult_fee}
            </span>
          </p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">Clinic Location:</span>{" "}
          {clinic.address}
        </p>

        <p>
          <span className="font-semibold text-gray-900">Clinic Timing:</span>{" "}
          {clinic.clinic_timing}
        </p>
      </div>

      <div
        className="flex gap-3 px-5 py-4 border-t bg-gray-50 rounded-b-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={`tel:${clinic.ownerNumber}`}
          className="flex-1 text-center py-2.5 rounded-lg border border-gray-300 text-sm font-medium"
        >
          Call Clinic
        </a>

        <button
          onClick={onBook}
          className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-blue-600 to-green-500"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

/* ---------------- BOOKING MODAL ---------------- */

function BookingModal({ clinic, onClose, onSuccess }) {
  const [phone, setPhone] = useState("");
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitBooking() {
    if (!patientName.trim() || !phone || phone.length < 10) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/clinic-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          patientWhatsApp: phone,
          clinicId: clinic._id,
          doctorName: clinic.Chief_doctor,
          consultFee: clinic.consult_fee,
          ownerNumber: clinic.ownerNumber,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onClose();
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold">Book Consultation</h3>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={setPhone}
            inputClass="!w-full !py-5 !pl-12 !rounded-lg"
          />
        </div>

        <button
          disabled={loading}
          onClick={submitBooking}
          className="w-full mt-6 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-green-500"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- SUCCESS MODAL ---------------- */

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
        <h3 className="text-lg font-semibold">Booking Confirmed</h3>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-lg text-white bg-gradient-to-r from-blue-600 to-green-500"
        >
          Done
        </button>
      </div>
    </div>
  );
}

