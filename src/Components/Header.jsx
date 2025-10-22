import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // optional: install lucide-react for icons

const Header = ({ onBookAppointment }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header className="flex justify-between items-center px-6 md:px-8 py-4 shadow-sm bg-white fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://assets.zyrosite.com/AQExk2poopfpXBKP/g162-Awv4WBBarXteOV3J.svg"
          alt="Zero Medicine Logo"
          className="h-10 w-auto"
        />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
        <a href="#how" className="hover:text-blue-600 transition">
          How It Works
        </a>
        <a href="#why" className="hover:text-blue-600 transition">
          Why Us
        </a>
        <a href="#testimonials" className="hover:text-blue-600 transition">
          Testimonials
        </a>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col mt-10 space-y-6 px-6 text-gray-700 font-medium">
          <a href="#how" onClick={toggleSidebar} className="hover:text-blue-600 transition">
            How It Works
          </a>
          <a href="#why" onClick={toggleSidebar} className="hover:text-blue-600 transition">
            Why Us
          </a>
          <a
            href="#testimonials"
            onClick={toggleSidebar}
            className="hover:text-blue-600 transition"
          >
            Testimonials
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
