// Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Logo = "/zeromedixine-logo.webp";
import { FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Helmet } from "react-helmet";


const Footer = ({ }) => {
  const navigate = useNavigate();

  // Cross-route smooth scroll helper (same behaviour as Header)
  const scrollToSection = (id) => {
    if (!id) return;
    if (window.location.pathname === "/") {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { replace: false });
      // small delay to allow home to mount then scroll
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
    }
  };

  return (
        <>
 <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Zeromedixine",
        "url": "https://zeromedixine.com/",
        "logo": "https://zeromedixine.com/assets/zeromedixine-CD7SGup0.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919429692742",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "Hindi", "Malayalam", "Tamil", "Kannada"]
        },
        "sameAs": [
          "https://www.instagram.com/zeromedixine/",
          "https://www.youtube.com/@Zeromedixine",
          "https://www.linkedin.com/company/zeromedixine",
          "https://www.facebook.com/profile.php?id=61576989955469"
        ]
      })}
    </script>
  </Helmet>
    <footer
      className="relative bg-[#0c1220] text-gray-300 pt-20 pb-10 px-6 overflow-hidden"
      aria-labelledby="footer-heading"
    >
      {/* Gradient glow background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto text-center mb-14"
      >
        <h3
          id="footer-heading"
          className="text-2xl md:text-3xl text-white mb-3 font-semibold leading-tight"
        >
          Your wellness journey starts here.
        </h3>
        <p className="text-gray-400 mb-6">
          Book your consultation today — it’s private, safe, and personalized.
        </p>
        <button
      onClick={() => scrollToSection("#doctors-section")}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-8 py-3 rounded-full shadow-md hover:shadow-xl transition font-medium"
>
  Book Appointment Now
</button>

      </motion.div>

      {/* Footer Grid */}
      <div className="border-t border-gray-700 pt-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-left">
        {/* Logo & Social */}
        <div>
        <img
  src={Logo}
  alt="Zeromedixine"
  className="h-8 w-auto"
  loading="lazy"
/>

          <p className="text-gray-400 mb-5 leading-relaxed">
            Cure the roots, not the symptoms.
          </p>

          <div className="flex space-x-4">
          <a
  href="https://www.youtube.com/@Zeromedixine"   // change to your channel link
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
              className="text-gray-400 hover:text-blue-500 transition transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://www.instagram.com/zeromedixine/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/zeromedixine/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-gray-400">
          <li>
              {/* use button so we can control cross-route scrolling */}
              
              <button
                onClick={() => scrollToSection("#home")}
                className="hover:text-green-400 transition text-left"
                aria-label="Scroll to How It Works"
              >
Home              </button>
            </li>

          <li>
  <button
    onClick={() => {
      navigate("/about-us");
      setTimeout(() => {
        document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }}
    className="hover:text-green-400 transition text-left"
  >
About us  </button>
</li>
<li>
              {/* use button so we can control cross-route scrolling */}
              
              <button
                onClick={() => scrollToSection("#ourservices")}
                className="hover:text-green-400 transition text-left"
                aria-label="Scroll to How It Works"
              >
Our Services              </button>
            </li>
            <li>
              {/* use button so we can control cross-route scrolling */}
              
              <button
                onClick={() => scrollToSection("#how")}
                className="hover:text-green-400 transition text-left"
                aria-label="Scroll to How It Works"
              >
                How It Works
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("#why")}
                className="hover:text-green-400 transition text-left"
                aria-label="Scroll to Why Choose Us"
              >
                Why Choose Us
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("#testimonials")}
                className="hover:text-green-400 transition text-left"
                aria-label="Scroll to Testimonials"
              >
                Testimonials
              </button>
            </li>
          </ul>
        </div>

        {/* Support */}
        {/* <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-green-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-400 transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-green-400 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div> */}
{/* Support */}
<div>
  <h4 className="text-white font-semibold mb-3">Support</h4>

  <ul className="space-y-4 text-gray-400">

    {/* Call */}
    <li>
      <a
        href="tel:9429692742"
        className="flex items-center gap-3 hover:text-green-400 transition"
      >
        <FaPhoneAlt className="text-green-500" size={16} />
        9429692742
      </a>
    </li>

    {/* WhatsApp */}
    <li>
      <a
        href="https://wa.me/919429692742"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:text-green-400 transition"
      >
        <FaWhatsapp className="text-green-500" size={18} />
        +91 94296 92742
      </a>
    </li>

    {/* Email */}
    <li>
      <a
        href="mailto:hello@zeromedixine.com"
        className="flex items-center gap-3 hover:text-green-400 transition"
      >
        <MdEmail className="text-blue-400" size={18} />
        hello@zeromedixine.com
      </a>
    </li>

  </ul>
</div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/privacy-policy" className="hover:text-green-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms_of_service" className="hover:text-green-400 transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/code_of_conduct" className="hover:text-green-400 transition">
                Code of Conduct
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-green-400 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-gray-500 text-xs mt-12"
      >
        © {new Date().getFullYear()} Zeromedixine. All rights reserved.
      </motion.div>
    </footer>
    </>
  );
};

export default Footer;
