import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    primaryConcern: "",
    date: "",
    time: "",
  });

  const [country, setCountry] = useState("in");
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (value, countryData) => {
    setFormData({ ...formData, phone: value });
    setCountry(countryData.countryCode);
  };

  // 🔍 Form Validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
      isValid = false;
    } else if (!/^[A-Z][a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name =
        "Name must start with a capital letter and contain only letters/spaces";
      isValid = false;
    }

    // Age
    if (!formData.age) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = "Please enter a valid age between 1 and 120";
      isValid = false;
    }

    // Gender
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }


    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Primary Concern
    if (!formData.primaryConcern.trim()) {
      newErrors.primaryConcern = "Primary concern is required";
      isValid = false;
    }

    // Preferred Date
    if (!formData.date) {
      newErrors.date = "Preferred date is required";
      isValid = false;
    }

    // Preferred Time
    if (!formData.time) {
      newErrors.time = "Preferred time is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted Data:", formData);
      alert("Appointment submitted successfully!");
      setFormData({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        primaryConcern: "",
        date: "",
        time: "",
      });
      setErrors({});
    }
  };

  return (
    <section
      id="book-appointment"
      className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-gray-100">
          <h2 className="text-3xl md:text-4xl text-center mb-2 text-gray-800">
            Book Your Appointment Today
          </h2>
          <p className="text-center text-green-600 font-medium mb-8">
            First consultation FREE for new patients
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                placeholder="e.g., 35"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.age ? "border-red-500" : ""
                }`}
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.gender ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            {/* Phone / WhatsApp */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone / WhatsApp
              </label>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={handlePhoneChange}
                enableSearch={true}
                inputClass="!w-full !py-5 !pl-12 !pr-4 !border !rounded-lg !focus:ring-2 !focus:ring-blue-500 !focus:outline-none"
                containerClass="!w-full"
                buttonClass="!border-none !bg-transparent"
                inputStyle={{ width: "100%", fontSize: "16px" }}
                placeholder="6380085913"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Primary Concern */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Concern
              </label>
              <select
                value={formData.primaryConcern}
                onChange={(e) =>
                  setFormData({ ...formData, primaryConcern: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.primaryConcern ? "border-red-500" : ""
                }`}
              >
                <option value="">Select your primary concern</option>
                <option>Sexual Wellness</option>
                <option>Pain Management</option>
                <option>Fitness & Nutrition</option>
                <option>Lifestyle Disorders</option>
                <option>Other</option>
              </select>
              {errors.primaryConcern && (
                <p className="text-red-500 text-sm">{errors.primaryConcern}</p>
              )}
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.date ? "border-red-500" : ""
                }`}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.time ? "border-red-500" : ""
                }`}
              />
              {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white text-lg py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Confirm My Appointment
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Need to send emails?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Configure EmailJS
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
