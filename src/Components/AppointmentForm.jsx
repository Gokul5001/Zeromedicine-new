import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation,useNavigate  } from "react-router-dom"; // <-- new


// Brand colours
const BRAND = {
  primary: "#1e8fd3",
  secondary: "#40d3b6",
  text: "#4d4d4d",
};


function useQuery() {
  return new URLSearchParams(useLocation().search);
}




export default function AppointmentForm() {
    // 🔥 Query params MUST come first
    const query = useQuery();
    const doctorIdFromQuery = query.get("doctorId") || "";
    const doctorUsernameFromQuery = query.get("doctorUsername") || "";
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    primaryConcern: "",
    date: "",
    time: "",
    // whatsAppOptIn: false, // <-- new
    whatsAppOptIn: true, // default to 
    language:"",
    couponCode: "", // <-- NEW
        // NEW: include doctor info when booking from doctor page
        doctorId: doctorIdFromQuery,
        doctorUsername: doctorUsernameFromQuery,


  });

  const [errors, setErrors] = useState({});
  const [concerns, setConcerns] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const successCloseTimeoutRef = useRef(null);
  const redirectPathRef = useRef(null); // <-- add this


  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const now = () => new Date();

  // helper: convert "HH:mm" to "hh:mm AM/PM"
const formatTime12h = (timeStr) => {
  if (!timeStr) return "";
  try {
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minute} ${suffix}`;
  } catch {
    return timeStr; // fallback if invalid format
  }
};



  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    // Age
    const ageNum = Number(formData.age);
    if (!formData.age) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (!Number.isFinite(ageNum) || ageNum < 1 || ageNum > 120) {
      newErrors.age = "Enter a valid age between 1 and 120";
      isValid = false;
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = "Please select gender";
      isValid = false;
    }

    // Phone
    if (!formData.phone || !String(formData.phone).trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Primary Concern
    if (!formData.primaryConcern) {
      newErrors.primaryConcern = "Please select a primary concern";
      isValid = false;
    }

    // Date & Time
    if (!formData.date) {
      newErrors.date = "Preferred date is required";
      isValid = false;
    } else {
      const selected = new Date(formData.date);
      selected.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = "Preferred date cannot be in the past";
        isValid = false;
      }
    }

        // Preferred Language
        if (!formData.language || formData.language.trim() === "") {
          newErrors.language = "Please select your preferred language";
          isValid = false;
        }

        
    if (!formData.time) {
      newErrors.time = "Preferred time is required";
      isValid = false;
    } else if (formData.date) {
      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
      const diffHours = (selectedDateTime - now()) / (1000 * 60 * 60);
      const selectedDate = new Date(formData.date);
      if (selectedDate.toDateString() === now().toDateString() && diffHours < 1) {
        newErrors.time = "If booking for today, choose a time at least 1 hour ahead";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };


  useEffect(() => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    axios
      .get(`${backendURL}/api/concerns`)
      .then((res) => setConcerns(res.data))
      .catch((err) => console.error("Error fetching concerns:", err));
  }, []);



   // ensure that if query params change (rare) we sync them into formData
   useEffect(() => {
    if (doctorIdFromQuery || doctorUsernameFromQuery) {
      setFormData((f) => ({ ...f, doctorId: doctorIdFromQuery, doctorUsername: doctorUsernameFromQuery }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorIdFromQuery, doctorUsernameFromQuery]);



  const openSuccessModal = () => {
    setSuccessModalVisible(true);
    if (successCloseTimeoutRef.current) clearTimeout(successCloseTimeoutRef.current);
    successCloseTimeoutRef.current = setTimeout(() => {
      setSuccessModalVisible(false);
      successCloseTimeoutRef.current = null;
    }, 5000);
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   try {
  //     const payload = { ...formData };
  //     console.log("DEBUG sending formData:", formData); // <- confirm whatsAppOptIn present
  //     const res = await axios.post(`${backendURL}/api/appointments`, formData);
  //     console.log("Appointment saved:", res.data);
  //     // reset but keep whatsAppOptIn true by default
  //     setFormData({
  //       name: "",
  //       age: "",
  //       gender: "",
  //       phone: "",
  //       email: "",
  //       primaryConcern: "",
  //       date: "",
  //       time: "",
  //       whatsAppOptIn: true,
  //       language: "",
  //       couponCode: "", // reset coupon field
  //          doctorId: doctorIdFromQuery,
  //       doctorUsername: doctorUsernameFromQuery,


  //     });
  //     setErrors({});
  //     openSuccessModal();
  //   } catch (err) {
  //     console.error("Error saving appointment:", err);
  //     alert("Site is under construction, Please try again later.");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const payload = { ...formData };
      console.log("DEBUG sending formData:", payload);
  
      const res = await axios.post(`${backendURL}/api/appointments`, payload);
      console.log("Appointment saved:", res.data);
  
      // ===== show success modal and set redirect path (do NOT navigate here) =====
      if (doctorIdFromQuery && doctorUsernameFromQuery) {
        // admin/doctor booking -> redirect to admin page when user closes modal
        redirectPathRef.current = `/patients/admin/${encodeURIComponent(doctorUsernameFromQuery)}/${encodeURIComponent(doctorIdFromQuery)}`;
      } else {
        // normal patient booking -> redirect to home when user closes modal
        redirectPathRef.current = `/`;
      }
  
      // show modal
      setSuccessModalVisible(true);
  
      // reset form but keep doctor info in formData (optional)
      setFormData({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        primaryConcern: "",
        date: "",
        time: "",
        whatsAppOptIn: true,
        language: "",
        couponCode: "",
        doctorId: doctorIdFromQuery,
        doctorUsername: doctorUsernameFromQuery,
      });
  
      setErrors({});
    } catch (err) {
      console.error("Error saving appointment:", err);
      alert("Site is under construction, Please try again later.");
    }
  };
  
  
  return (
    <section id="book-appointment" className="py-30 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl md:text-4xl text-center mb-2 text-gray-800">Book Your Appointment Today</h2>
          <p className="text-center text-green-600 font-medium mb-6">First consultation FREE for new patients</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                placeholder="e.g., 35"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.age ? "border-red-500" : ""}`}
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.gender ? "border-red-500" : ""}`}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                enableSearch={true}
                inputClass="!w-full !py-5 !pl-12 !pr-4 !rounded-lg"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Preferred Language
  </label>
  <select
    value={formData.language}
    onChange={(e) => {
      setFormData({ ...formData, language: e.target.value });
      if (errors.language) setErrors({ ...errors, language: "" });
    }}
    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
      errors.language ? "border-red-500" : ""
    }`}
  >
    <option value="">Select your preferred language</option>
    <option value="English">English</option>
    <option value="Tamil">Tamil</option>
    <option value="Hindi">Hindi</option>
    <option value="Telugu">Telugu</option>
    <option value="Malayalam">Malayalam</option>
    <option value="Kannada">Kannada</option>
    <option value="Other">Other</option>
  </select>
  {errors.language && (
    <p className="text-red-500 text-sm">{errors.language}</p>
  )}
</div>

 <div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Primary Concern
  </label>
  <select
    value={formData.primaryConcern}
    onChange={(e) => {
      setFormData({ ...formData, primaryConcern: e.target.value });
      if (errors.primaryConcern) setErrors({ ...errors, primaryConcern: "" });
    }}
    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
      errors.primaryConcern ? "border-red-500" : ""
    }`}
  >
    <option value="">Select your primary concern</option>
    {concerns.map((item) => (
      <option key={item._id} value={item.concern}>
        {item.concern}
      </option>
    ))}
  </select>
  {errors.primaryConcern && (
    <p className="text-red-500 text-sm">{errors.primaryConcern}</p>
  )}
</div> 
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.date ? "border-red-500" : ""}`}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.time ? "border-red-500" : ""}`}
              />
              {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
            </div>

            {/* NEW: Coupon Code (no validation) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code (optional)</label>
              <input
                type="text"
                placeholder="Enter coupon code (if any)"
                value={formData.couponCode}
                onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>


            <div className="md:col-span-2 mt-6">
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600  text-white font-medium shadow-md"

              >
                Submit Appointment
              </button>
            </div>
          </form>
        </div>
      </div>


      {successModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white max-w-sm w-full rounded-2xl shadow-2xl p-6 transform transition-all scale-100 animate-fadeInUp">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-3 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Submission success
              </h3>
              <p className="text-sm text-gray-600 mb-5 px-2">
                Thank you — your appointment is recorded. Doctor will be assigned soon and we will contact you via WhatsApp or phone.
              </p>
              <button
  onClick={() => {
    setSuccessModalVisible(false);
    const path = redirectPathRef.current || "/";
    redirectPathRef.current = null;
    navigate(path);
  }}
  className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
>
  Close
</button>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
