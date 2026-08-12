import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  GraduationCap,
  Award,
  IdCard
} from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Helmet } from "react-helmet";

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

export default function DoctorProfile() {
    const { slug } = useParams();
  
  const [doctor, setDoctor] = useState(null);
  const [tab, setTab] = useState("about");

  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/public/doctor/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setDoctor(data.doctor);
      });
  }, [slug]);

  if (!doctor) {
    return <div className="pt-32 text-center">Loading profile...</div>;
  }

  const imageSrc =
    driveToImage(doctor.profile_img) || FALLBACK_AVATAR;

  return (
 
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
         <Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Physiotherapy",
      "name": "PHYSIOTIQUE PHYSIOTHERAPY & CHIROPRACTIC CLINIC",
      "image": "https://lh3.googleusercontent.com/a-/ALV-UjXp13CdfGMja2L5N9Rgxko5FtrfjBqcUBjjMv1plRyNkU35oja8=s360-w360-h360",
      "@id": "https://www.google.com/maps?cid=2609224650117918874",
      "url": "https://zeromedixine.com/",
      "telephone": "06362016478",
      "priceRange": "600",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2ND CROSS, JAYARAM REDDY LAYOUT,",
        "addressLocality": "Kasavanahalli",
        "postalCode": "560035",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9036385,
        "longitude": 77.6758952
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://www.instagram.com/physiotique_clinic_official",
        "https://zeromedixine.com/",
        "https://www.facebook.com/profile.php?id=100083197748930&sk=reels_tab"
      ]
    })}
  </script>
</Helmet>
      <div className="max-w-7xl mx-auto px-4">

        {/* ================= HEADER CARD ================= */}
        <div className="bg-white p-6 grid md:grid-cols-3 gap-6">

          {/* LEFT – IMAGE */}
          <div className="flex justify-center">
            <img
              src={imageSrc}
              onError={(e) => (e.target.src = FALLBACK_AVATAR)}
              alt={doctor.Chief_doctor}
              className="w-75 h-90 object-cover rounded-xl border bg-gray-100"
            />
          </div>

          {/* CENTER – INFO */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-gray-900">
              {doctor.Chief_doctor}
            </h1>

            <p className="text-sm text-gray-600 flex items-center gap-2">
              <GraduationCap size={16} />
              {doctor.Role || "BPT, MPT"}
            </p>

            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={18} />
              {doctor.address || "India"}
            </p>
          </div>

          {/* RIGHT – CTA */}
          <div className="flex flex-col gap-3">
            <ActionButton
              text="Book Appointment"
              primary
              onClick={() => setShowModal(true)}
            />

            <ActionButton
              text="Book Online Consultation"
              onClick={() => setShowModal(true)}
            />
<a
          href={`tel:${doctor.ownerNumber}`}
          className="w-full py-3 rounded-lg text-sm font-medium transition
             border border-blue-300 text-blue-700 hover:bg-blue-50
             text-center block"
>
  Request a Callback
</a>



          </div>
          
        </div>

        {/* ================= TABS ================= */}
        <div className="flex gap-4 mt-8">
          <TabButton active={tab === "about"} onClick={() => setTab("about")}>
            About Doctor
          </TabButton>
          <TabButton active={tab === "faq"} onClick={() => setTab("faq")}>
            FAQs
          </TabButton>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid md:grid-cols-3 gap-8 mt-6">

          {/* LEFT – ABOUT */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            {tab === "about" && (
             <p className="text-gray-700 leading-relaxed">
             {doctor.about_doctor || "Profile details will be updated soon."}
           </p>
           
            )}

            {tab === "faq" && (
              <p className="text-gray-600">FAQs will be added soon.</p>
            )}
          </div>

          {/* RIGHT – SIDEBAR */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <IdCard size={18} /> Registration
              </h3>
              <p className="text-sm text-gray-700">
                {doctor.registrationNumber || "Registered Medical Practitioner"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Award size={18} /> Awards
              </h3>
              <p className="text-sm text-gray-700">
                {doctor.awards || "Recognised for clinical excellence"}
              </p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">Consultation starts @ ₹{doctor.consult_fee}</p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">Clinic Timings:{doctor.clinic_timing}</p>
              {/* <p className="text-md font-semibold text-gray-900">
                ₹{doctor.clinic_timing}
              </p> */}
              
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      {showModal && (
        <BookingModal
          clinic={doctor}
          onClose={() => setShowModal(false)}
          onSuccess={() => setBookingSuccess(true)}
        />
      )}

      {bookingSuccess && (
        <SuccessModal onClose={() => setBookingSuccess(false)} />
      )}
    </div>
  );
}

/* ================= UI HELPERS ================= */

function ActionButton({ text, primary, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg text-sm font-medium transition
        ${
          primary
            ? "text-white bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
            : "border border-blue-300 text-blue-700 hover:bg-blue-50"
        }`}
    >
      {text}
    </button>
  );
}


function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-sm font-medium
        ${
          active
          ? "text-white bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
          : "border border-blue-300 text-blue-700 hover:bg-blue-50"
        }`}
    >
      {children}
    </button>
  );
}

/* ================= BOOKING MODAL ================= */

// function BookingModal({ clinic, onClose, onSuccess }) {
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function submitBooking() {
//     if (!phone || phone.length < 10) return;

//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE}/api/clinic-bookings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           patientWhatsApp: phone,
//           clinicId: clinic._id,
//           doctorName: clinic.Chief_doctor,
//           consultFee: clinic.consult_fee,
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

        {/* 👤 PATIENT NAME */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* 📞 WHATSAPP */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            WhatsApp Number
          </label>

          <PhoneInput
            country={"in"}
            value={phone}
            onChange={setPhone}
            enableSearch
            inputClass="!w-full !py-5 !pl-12 !pr-4 !rounded-lg"
            containerClass="!w-full"
          />
        </div>

        <button
          disabled={loading}
          onClick={submitBooking}
          className="w-full mt-6 py-3 rounded-lg text-white font-medium
                     bg-gradient-to-r from-blue-600 to-green-500
                     hover:from-blue-700 hover:to-green-600 disabled:opacity-60"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}


/* ================= SUCCESS MODAL ================= */

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">

        <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          ✓
        </div>

        <h3 className="text-lg font-semibold mt-4">
          Booking Confirmed
        </h3>

        <p className="text-sm text-gray-600 mt-2">
          Our team will contact you shortly on WhatsApp.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-lg text-white font-medium
                     bg-gradient-to-r from-blue-600 to-green-500"
        >
          Done
        </button>
        
      </div>
      
    </div>
    
  );
  
}
