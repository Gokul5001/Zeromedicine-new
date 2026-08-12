import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {FaYoutube,  FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn } from "lucide-react";
const Logo = "/zeromedixine-logo.webp";

const BRAND = {
  primary: "#1e8fd3",
  secondary: "#40d3b6", 
};  

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [states, setStates] = useState([]);
const [isClinicsOpen, setIsClinicsOpen] = useState(false);
const [openStateId, setOpenStateId] = useState(null);
const [patientData, setPatientData] = useState(null);
const [isPatientMenuOpen, setIsPatientMenuOpen] = useState(false);

const [isProductsOpen, setIsProductsOpen] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    // Close overlays on route change
    setIsSidebarOpen(false);
    setIsExploreOpen(false);
    setIsServicesOpen(false);
    setIsLoginOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside (desktop safety; portal will handle most cases)
  useEffect(() => {
    function handleClick(e) {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isSidebarOpen]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("patientData") || "null");
      setPatientData(stored);
    } catch {
      setPatientData(null);
    }
  }, [location.pathname]);
  
  useEffect(() => {
    setIsPatientMenuOpen(false);
  }, [location.pathname]);
  
  const handlePatientLogout = () => {
    localStorage.removeItem("patientToken");
    localStorage.removeItem("patientData");
    setPatientData(null);
    setIsPatientMenuOpen(false);
    navigate("/");
  };
  
  const patientInitials = (patientData?.name || "P")
    .trim()
    .split(/\s+/)
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const services = [
    { name: "Back Pain", link: "/pain-relief/back-pain" },
    { name: "Neck Pain", link: "/pain-relief/neck-pain" },
    { name: "Knee Pain", link: "/pain-relief/knee-pain" },
    { name: "Shoulder Pain", link: "/pain-relief/shoulder-pain" },
    { name: "Elbow Pain", link: "/pain-relief/elbow-pain" },
  ];

  const explore = [
    { name: "Our Services", id: "#ourservices" },
    { name: "How It Works", id: "#how" },
    { name: "Why Choose Us", id: "#why" },
    { name: "BMI Calculator", id: "#bmi" },
    { name: "Testimonials", id: "#testimonials" },
  ];

  const logins = [
    { name: "Patient Login", link: "/patient/login" },
  ];

  // Cross-route smooth scroll helper
  const scrollToSection = (id) => {
    if (!id) return;
    if (window.location.pathname === "/") {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { replace: false });
      setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 220);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 120);
    }
  };

  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        role="banner"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleHomeClick}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleHomeClick()}
            aria-label="Go to homepage"
          >
     <img
  src={Logo}
  alt="Zeromedixine"
  className="h-8 w-auto"
  loading="eager"
  width="120"
  height="32"
/>

            <span className="hidden md:inline-block font-semibold text-gray-800"></span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-4" aria-label="Primary">
            <button
              onClick={handleHomeClick}
              className="text-gray-700 hover:text-blue-600 transition px-2 py-1 focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/about-us")}
              className="text-gray-700 hover:text-blue-600 transition px-2 py-1 focus:outline-none"
            >
              About Us
            </button>
            <button onClick={() => navigate("/blogs")}>
  Blogs
</button>

            {/* Services */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsServicesOpen((s) => !s);
                  setIsExploreOpen(false);
                }}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition px-2 py-1 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
              >
                Concerns <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute top-10 -right-4 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    {services.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setIsServicesOpen(false);
                          navigate(s.link);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {s.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

<div className="relative">
  <AnimatePresence>
    {isClinicsOpen && (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="absolute top-10 left-0 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 max-h-72 overflow-y-auto"
      >
        {states.map(state => {
          const hasDistricts = state.districts?.length > 0;
          const isOpen = openStateId === state._id;

          return (
            <div key={state._id}>
              <button
                onClick={() => {
                  if (!hasDistricts) {
                    setIsClinicsOpen(false);
                    navigate(`/clinics/${toSlug(state.name)}`);
                  } else {
                    setOpenStateId(isOpen ? null : state._id);
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {state.name}
                {hasDistricts && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              <AnimatePresence>
                {isOpen && hasDistricts && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {state.districts.map(district => (
                      <button
                        key={district._id}
                        onClick={() => {
                          setIsClinicsOpen(false);
                          setOpenStateId(null);
                          navigate(`/clinics/${toSlug(state.name)}/${toSlug(district.name)}`);
                        }}
                        className="w-full text-left pl-8 pr-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {district.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    )}
  </AnimatePresence>
</div>

            {/* Social icons */}
            <div className="flex items-end">
                <button
  onClick={() => scrollToSection("#doctors-section")}
  className="ml-2 px-3 py-3 rounded-full text-white font-medium text-sm shadow-md transition-all duration-300 hover:scale-105"
  style={{
    background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
  }}
>
  Book Consultation
</button>
  

  {!patientData && (
    <button
      onClick={() => navigate("/patient/login")}
      className="ml-9 px-3 py-3 rounded-full text-white font-medium text-sm shadow-md transition-all duration-300 hover:scale-105"
      style={{
        background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
      }}
    >
      Login
    </button>
  )}
            </div>

{/* Patient avatar dropdown OR Login Dropdown */}
{patientData ? (
  <div className="relative">
    <button
      onClick={() => setIsPatientMenuOpen((s) => !s)}
      className="ml-2 w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
      style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})` }}
      aria-haspopup="true"
      aria-expanded={isPatientMenuOpen}
      aria-label="Account menu"
    >
      {patientInitials}
    </button>

    <AnimatePresence>
      {isPatientMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="absolute top-12 right-0 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-3 px-4"
          onMouseLeave={() => setIsPatientMenuOpen(false)}
        >
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})` }}
            >
              {patientInitials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {patientData.name || "Patient"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                +91 {patientData.phone}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsPatientMenuOpen(false);
              navigate("/patient/bookings");
            }}
            className="w-full flex items-center justify-between text-left py-3 text-sm text-gray-700 hover:text-blue-600 transition"
          >
            My Bookings
            <ChevronDown size={14} className="-rotate-90" />
          </button>

          <button
            onClick={handlePatientLogout}
            className="w-full text-center py-2.5 mt-1 rounded-lg bg-gray-500 text-white text-sm font-semibold hover:bg-black transition"
          >
            Log Out
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
) : (
  <div className="relative">
    <AnimatePresence>
      {isLoginOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="absolute top-10 right-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
          onMouseLeave={() => setIsLoginOpen(false)}
        >
          {logins.map((l, i) => (
            <button
              key={i}
              onClick={() => {
                setIsLoginOpen(false);
                navigate(l.link);
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              {l.name}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)}
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition focus:outline-none"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Portal-based overlay + sidebar to ensure it sits above everything */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 bg-white z-40"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-hidden="true"
                />

                <motion.aside
                  key="sidebar"
                  ref={sidebarRef}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl border-l border-gray-100 p-4 overflow-y-auto"
                  aria-label="Mobile menu"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        handleHomeClick();
                        setIsSidebarOpen(false);
                      }}
                    >
              <img
  src={Logo}
  alt="Zeromedixine"
  className="h-8 w-auto"
  loading="lazy"
  width="120"
  height="32"
/>
                      <span className="font-semibold text-gray-800"></span>
                    </div>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      aria-label="Close menu"
                      className="p-2 text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <nav className="flex flex-col gap-4" role="menu">
                    <button
                      onClick={() => {
                        handleHomeClick();
                        setIsSidebarOpen(false);
                      }}
                      className="text-left text-gray-800 py-1"
                    >
                      Home
                    </button> 
                    <button
                      onClick={() => {
                        setIsSidebarOpen(false);
                        navigate("/about-us");
                      }}
                      className="text-left text-gray-800 py-1"
                    >
                      About Us
                    </button>


                    <a
  href="https://zeromedixine.com/blogs"
  className="text-left text-gray-800 py-1"
>
  Blogs
</a>

                    <div>
                      <p className="text-xs font-medium text-blue-600 mb-2">Concerns</p>
                      <div className="flex flex-col gap-1">
                        {services.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setIsSidebarOpen(false);
                              navigate(s.link);
                            }}
                            className="text-left text-gray-700 py-1 text-sm"
                          >
                            {s.name}
                          </button>
                        ))}
                      </div>
                    </div>

{/* Patient account section OR Login section */}
{patientData ? (
  <div>
    <p className="text-xs font-medium text-blue-600 mb-2">My Account</p>

    <div className="flex items-center gap-3 pb-3 mb-2 border-b border-gray-100">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})` }}
      >
        {patientInitials}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">
          {patientData.name || "Patient"}
        </p>
        <p className="text-xs text-gray-500 truncate">
          +91 {patientData.phone}
        </p>
      </div>
    </div>

    <button
      onClick={() => {
        setIsSidebarOpen(false);
        navigate("/patient/bookings");
      }}
      className="w-full flex items-center justify-between text-left py-2 text-sm text-gray-700 hover:text-blue-600 transition"
    >
      My Bookings
      <ChevronDown size={14} className="-rotate-90" />
    </button>

    <button
      onClick={() => {
        setIsSidebarOpen(false);
        handlePatientLogout();
      }}
      className="w-full text-center py-2.5 mt-2 rounded-lg bg-gray-500 text-white text-sm font-semibold hover:bg-black transition"
    >
      Log Out
    </button>
  </div>
) : (
  <div>
    <p className="text-xs font-medium text-blue-600 mb-2">Login</p>
    <div className="flex flex-col gap-1">
      {logins.map((l, i) => (
        <button
          key={i}
          onClick={() => {
            setIsSidebarOpen(false);
            navigate(l.link);
          }}
          className="text-left text-gray-700 py-1 text-sm"
        >
          {l.name}
        </button>
      ))}
    </div>
  </div>
)}


                    <div className="mt-4 flex items-center gap-4">
                    <a
  href="https://www.youtube.com/@Zeromedixine"
  target="_blank"
  rel="noopener noreferrer"
  className="text-light"
>
  <FaYoutube />
</a>
                      <a
                        href="https://www.facebook.com/profile.php?id=61576989955469"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="text-gray-700 hover:text-blue-500"
                      >
                        <FaFacebookF size={18} />
                      </a>
                      <a
                        href="https://www.instagram.com/zeromedixine/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-gray-700 hover:text-pink-500"
                      >
                        <FaInstagram size={18} />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/zeromedixine/posts/?feedView=all"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-gray-700 hover:text-blue-400"
                      >
                        <FaLinkedinIn size={18} />
                      </a>
                    </div>
                  </nav>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}