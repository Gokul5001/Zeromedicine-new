

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleExplore = () => {
    setIsExploreOpen((prev) => !prev);
    setIsServicesOpen(false);
  };
  
  const toggleServices = () => {
    setIsServicesOpen((prev) => !prev);
    setIsExploreOpen(false);
  };

  const services = [
    { name: "Pain Relief", link: "/pain-relief" },
    { name: "Fitness & Nutrition", link: "/fitness-nutrition" },
    { name: "Lifestyle Diseases", link: "/life-style-diseases" },
    { name: "Sexual Wellness", link: "/sexual-wellness" },
  ];

  const explore = [
    { name: "How It Works", id: "#how" },
    { name: "Why Us", id: "#why" },
    { name: "BMI Calculator", id: "#bmi" },

    { name: "Testimonials", id: "#testimonials" },
  ];

  const scrollToSection = (id) => {
    if (window.location.pathname === "/") {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { replace: false });
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
    setIsSidebarOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-6 md:px-8 py-4 shadow-sm bg-white fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHomeClick}>
        <img
          src="https://assets.zyrosite.com/AQExk2poopfpXBKP/g162-Awv4WBBarXteOV3J.svg"
          alt="Zero Medicine Logo"
          className="h-10 w-auto"
        />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8 text-gray-700 font-medium relative items-center">
        <button
          onClick={handleHomeClick}
          className="hover:text-blue-600 transition focus:outline-none"
        >
          Home
        </button>

        {/* Explore Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExplore}
            className="flex items-center gap-1 hover:text-blue-600 transition focus:outline-none"
          >
            Explore <ChevronDown size={18} />
          </button>

          {isExploreOpen && (
            <div
              onMouseLeave={() => setIsExploreOpen(false)}
              className="absolute top-8 left-0 bg-white shadow-lg rounded-lg w-56 border border-gray-100 py-2"
            >
              {explore.map((item, index) => (
                <a
                  key={index}
                  href={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsExploreOpen(false);
                    scrollToSection(item.id);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Services Dropdown */}
        <div className="relative">
          <button
            onClick={toggleServices}
            className="flex items-center gap-1 hover:text-blue-600 transition focus:outline-none"
          >
            Services <ChevronDown size={18} />
          </button>

          {isServicesOpen && (
            <div
              onMouseLeave={() => setIsServicesOpen(false)}
              className="absolute top-8 -right-1/2 bg-white shadow-lg rounded-lg w-56 border border-gray-100 py-2"
            >
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.link}
                  onClick={() => {
                    setIsServicesOpen(false);
                    navigate(service.link);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  {service.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-3 ml-1">
          <a href="https://www.facebook.com/profile.php?id=61576989955469" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 transition">
            <FaFacebookF size={16} />
          </a>
          <a href="https://www.instagram.com/zeromedixine/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500 transition">
            <FaInstagram size={16} />
          </a>
          <a href="https://www.linkedin.com/company/zeromedixine/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400 transition">
            <FaLinkedinIn size={16} />
          </a>
        </div>
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
          <button
            onClick={() => {
              toggleSidebar();
              navigate("/");
            }}
            className="text-left hover:text-blue-600 transition"
          >
            Home
          </button>

          {/* Explore Section */}
          <div>
            <p className="font-semibold mb-2 text-blue-600">Explore</p>
            <div className="flex flex-col gap-2">
              {explore.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    toggleSidebar();
                    scrollToSection(item.id);
                  }}
                  className="text-left text-gray-700 hover:text-green-600 transition text-sm"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <p className="font-semibold mb-2 text-blue-600">Services</p>
            <div className="flex flex-col gap-2">
              {services.map((service, i) => (
                <button
                  key={i}
                  onClick={() => {
                    toggleSidebar();
                    navigate(service.link);
                  }}
                  className="text-left text-gray-700 hover:text-green-600 transition text-sm"
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Media Icons in Sidebar */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/profile.php?id=61576989955469" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="https://www.instagram.com/zeromedixine/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500 transition">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.linkedin.com/company/zeromedixine/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400 transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
