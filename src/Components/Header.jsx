import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  const services = [
    { name: "Pain Relief", link: "/pain-relief" },
    { name: "Fitness & Nutrition", link: "/fitness-nutrition" },
    { name: "Lifestyle Diseases", link: "/life-style-diseases" },
    { name: "Sexual Wellness", link: "/sexual-wellness" },

  ];

  const scrollToSection = (id) => {
    // If on home page, scroll directly
    if (window.location.pathname === "/") {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home page, then scroll after render
      navigate("/", { replace: false });
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // small delay to let Home page render
    }
  };


  return (
    <header className="flex justify-between items-center px-6 md:px-8 py-4 shadow-sm bg-white fixed top-0 left-0 w-full z-50">
      {/* Logo */}
{/* Logo */}
<div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
  <img
    src="https://assets.zyrosite.com/AQExk2poopfpXBKP/g162-Awv4WBBarXteOV3J.svg"
    alt="Zero Medicine Logo"
    className="h-10 w-auto"
  />
</div>


      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8 text-gray-700 font-medium relative">
      <a
        href="#how"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("#how");
        }}
      >
        How It Works
      </a>
      <a
        href="#why"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("#why");
        }}
      >
        Why Us
      </a>

        {/* Dropdown - Services */}
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
              className="absolute top-8 left-0 bg-white shadow-lg rounded-lg w-56 border border-gray-100 py-2"
            >
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.link}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  {service.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <a
        href="#testimonials"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("#testimonials");
        }}
      >
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

          {/* Services in mobile sidebar */}
          <div>
            <p className="font-semibold mb-2 text-blue-600">Services</p>
            <div className="flex flex-col gap-2">
              {services.map((service, i) => (
                <a
                  key={i}
                  href={service.link}
                  onClick={toggleSidebar}
                  className="text-gray-700 hover:text-green-600 transition text-sm"
                >
                  {service.name}
                </a>
              ))}
            </div>
          </div>

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