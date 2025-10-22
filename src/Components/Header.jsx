import React from "react";

const Header = ({ onBookAppointment }) => (
  <header className="flex justify-between items-center px-8 py-5 shadow-sm bg-white fixed top-0 left-0 w-full z-50">
    <div className="flex items-center space-x-2">
      <img
        src="https://assets.zyrosite.com/AQExk2poopfpXBKP/g162-Awv4WBBarXteOV3J.svg"
        alt="Zero Medicine Logo"
        className="h-10 w-auto"
      />
    </div>

    <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
      <a href="#how" className="hover:text-blue-600 transition">How It Works</a>
      <a href="#why" className="hover:text-blue-600 transition">Why Us</a>
      <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
    </nav>

    {/* <button
      onClick={onBookAppointment}
      className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition"
    >
      Book Appointment
    </button> */}
  </header>
);

export default Header;
