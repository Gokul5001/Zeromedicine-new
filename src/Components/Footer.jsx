import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = ({ onBookAppointment }) => (
  <footer className="bg-[#0c1220] text-gray-300 pt-20 pb-10 px-6">
    <div className="container mx-auto text-center mb-10">
      <h3 className="text-2xl md:text-3xl text-white mb-4">
        Your wellness journey starts here.
      </h3>
      <p className="text-gray-400 mb-6">
        Book your consultation today — it’s private, safe, and personalized.
      </p>
      <button
        onClick={onBookAppointment}
        className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
      >
        Book Appointment Now
      </button>
    </div>

    <div className="border-t border-gray-700 pt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-left">
      {/* Logo Section */}
      <div>
        <img
          src="https://assets.zyrosite.com/AQExk2poopfpXBKP/g162-Awv4WBBarXteOV3J.svg"
          alt="Zeromedixine Logo"
          className="h-8 mb-2"
        />
        <p className="text-gray-400 mb-4">Cure the roots, not the symptoms.</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4">
          <a
            href="https://www.facebook.com/profile.php?id=61576989955469"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://www.instagram.com/zeromedixine/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://www.linkedin.com/company/zeromedixine/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>

      {/* Company */}
      <div>
        <h4 className="text-white mb-3">Company</h4>
        <ul className="space-y-2">
          <li><a href="#how" className="hover:text-green-400">How It Works</a></li>
          <li><a href="#why" className="hover:text-green-400">Why Choose Us</a></li>
          <li><a href="#testimonials" className="hover:text-green-400">Testimonials</a></li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-white mb-3">Support</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-green-400">Contact Us</a></li>
          <li><a href="#" className="hover:text-green-400">Help Center</a></li>
          <li><a href="#" className="hover:text-green-400">FAQ</a></li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-white mb-3">Legal</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-green-400">Terms of Service</a></li>
        </ul>
      </div>
    </div>

    {/* Copyright */}
    <div className="text-center text-gray-500 text-xs mt-12">
      © 2025 Zeromedixine. All rights reserved.
    </div>
  </footer>
);

export default Footer;
