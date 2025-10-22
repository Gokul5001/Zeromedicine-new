import React from "react";

const AppointmentForm = () => (
  <section id="book-appointment" className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-gray-100">
        <h2 className="text-3xl md:text-4xl text-center mb-2 text-gray-800">
          Book Your Appointment Today
        </h2>
        <p className="text-center text-green-600 font-medium mb-8">
          First consultation FREE for new patients
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black-600 mb-1">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black-600 mb-1">Age</label>
            <input type="number" placeholder="e.g., 35" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black-600 mb-1">Gender</label>
            <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black-600 mb-1">Phone / WhatsApp</label>
            <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black-600 mb-1">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black-600 mb-1">Primary Concern</label>
            <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Select your primary concern</option>
              <option>Sexual Wellness</option>
              <option>Pain Management</option>
              <option>Fitness & Nutrition</option>
              <option>Lifestyle Disorders</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black-600 mb-1">Preferred Date</label>
            <input type="date" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black-600 mb-1">Preferred Time</label>
            <input type="time" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div className="md:col-span-2 mt-6">
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white text-lg py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              Confirm My Appointment
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Need to send emails?{" "}
          <a href="#" className="text-blue-600 hover:underline">Configure EmailJS</a>
        </p>
      </div>
    </div>
  </section>
);

export default AppointmentForm;
