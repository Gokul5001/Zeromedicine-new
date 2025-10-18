import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, Activity, Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";

const trustFeatures = [
  {
    icon: ShieldCheck,
    text: "100% Confidential & Private Consultations",
  },
  {
    icon: Users,
    text: "Experienced Doctors & Wellness Experts",
  },
  {
    icon: Activity,
    text: "Root-Cause Based Approach (Not Just Pills)",
  },
  {
    icon: Heart,
    text: "Personalized Treatment Protocols",
  },
];

const LandingPage = () => {
  const handleBookAppointment = () => {
    const section = document.querySelector("#book-appointment");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 font-sans relative overflow-hidden">
      {/* ================== HEADER ================== */}
      <header className="flex justify-between items-center px-8 py-5 shadow-sm bg-white fixed top-0 left-0 w-full z-50">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
        <img 
            src="https://assets.zyrosite.com/AQExk2poopfpXBKP/g162-Awv4WBBarXteOV3J.svg" 
            alt="Zero Medicine Logo" 
            className="h-10 w-auto" 
          />
          <div>
            {/* <h1 className="text-lg text-black-800">Zeromedixine</h1>
            <p className="text-xs text-gray-500 -mt-1">
              cure your roots, not the symptoms
            </p> */}
          </div>
        </div>

        {/* Navigation Links */}
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

        {/* Appointment Button */}
        <button
          onClick={handleBookAppointment}
          className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition"
        >
          Book Appointment
        </button>
      </header>

      {/* ================== HERO SECTION ================== */}
      <section className="relative pt-48 pb-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08),transparent_70%)]"></div>

        <div className="container mx-auto text-center relative z-10">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-snug">
              Take Control of Your Health, Naturally.
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
              From chronic pain to lifestyle disorders — we bring you personalized,
              non-invasive care backed by technology and science.
            </p>

            {/* Primary Button */}
            <div className="flex justify-center mb-12">
              <button
                onClick={handleBookAppointment}
                className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Appointment Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {trustFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition"
              >
                <feature.icon className="w-10 h-10 mb-3 text-green-600" />
                <p className="text-md font-sm text-gray-900">{feature.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================== APPOINTMENT SECTION ================== */}
<section id="book-appointment" className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
  <div className="container mx-auto">
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-gray-100">
      <h2 className="text-3xl md:text-4xl text-center mb-2 text-gray-800">
        Book Your Appointment Today
      </h2>
      <p className="text-center text-green-600 font-medium mb-8">
        First consultation FREE for new patients
      </p>

      {/* FORM */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black-600 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-black-600 mb-1">Age</label>
          <input
            type="number"
            placeholder="e.g., 35"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-black-600 mb-1">Gender</label>
          <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-black-600 mb-1">Phone / WhatsApp</label>
          <input
            type="tel"
            placeholder="+1 123 456 7890"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-black-600 mb-1">Email (For Confirmation)</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Primary Concern */}
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

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-black-600 mb-1">Preferred Date</label>
          <input
            type="date"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-black-600 mb-1">Preferred Time</label>
          <input
            type="time"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Button */}
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
{/* ================== HOW IT WORKS SECTION ================== */}
<section id="how" className="py-24 px-4 bg-white">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl md:text-4xl mb-3 text-gray-800">
      How <span className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-snug">Zeromedixine</span> Works
    </h2>
{/* 
    <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-snug">
              Take Control of Your Health, Naturally.
            </h1> */}
    <p className="text-gray-600 mb-16">
      A simple, 3-step journey to your well-being.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
      {/* Step 1 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M5.121 17.804A9.003 9.003 0 0012 21a9.003 9.003 0 006.879-3.196M12 3v9l3 3" />
          </svg>
        </div>
        <h3 className=" text-lg mb-2">Free Confidential Consultation</h3>
        <p className="text-gray-600 text-sm max-w-xs">
          Talk openly with our doctor online. Your privacy is our priority.
        </p>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className=" text-lg mb-2">Personalized Protocol</h3>
        <p className="text-gray-600 text-sm max-w-xs">
          A root-cause solution: diet, lifestyle, therapy, and advanced wellness care.
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13 16h-1v-4h-1m2 0a4 4 0 10-4-4 4 4 0 004 4z" />
          </svg>
        </div>
        <h3 className=" text-lg mb-2">Continuous Support</h3>
        <p className="text-gray-600 text-sm max-w-xs">
          An assigned doctor and progress tracking supports you until full recovery.
        </p>
      </div>
    </div>
  </div>
</section>

{/* ================== WHY CHOOSE US SECTION ================== */}
<section id="why" className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl md:text-4xl mb-3 text-gray-800">
      Why Choose <span className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-snug">Zeromedixine</span> 
    </h2>
    <p className="text-gray-600 mb-16">
      Your health, our commitment. Here's what sets us apart.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {/* Feature 1 */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.071 4.929A10 10 0 0112 22a10 10 0 01-7.071-17.071" />
          </svg>
        </div>
        <h3 className="text-lg mb-2">Non-Invasive Approach</h3>
        <p className="text-gray-600 text-sm">
          We focus on healing without heavy medications or invasive procedures, ensuring minimal side effects.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 20l9-5-9-5-9 5 9 5z" />
          </svg>
        </div>
        <h3 className="text-lg mb-2">Science + Holistic Healing</h3>
        <p className="text-gray-600 text-sm">
          Our methods combine the best of modern science with proven holistic therapies for comprehensive care.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12l2 2l4-4" />
          </svg>
        </div>
        <h3 className="text-lg mb-2">End-to-End Support</h3>
        <p className="text-gray-600 text-sm">
          From your first confidential consultation to full recovery, we are with you every step.
        </p>
      </div>

      {/* Feature 4 */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 className="text-lg mb-2">24/7 Online Care</h3>
        <p className="text-gray-600 text-sm">
          Access our experts and support team anytime through secure and private video calls.
        </p>
      </div>
    </div>
  </div>
</section>

{/* ================== SUCCESS STORIES SECTION ================== */}
<section id="testimonials" className="py-24 px-4 bg-gradient-to-br from-white via-blue-50 to-green-50">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl md:text-4xl mb-3 text-gray-800">
      Success <span className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-snug">Stories</span> 
    </h2>
    <p className="text-gray-600 mb-16">
      Hear from individuals who transformed their lives with our support.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Testimonial 1 */}
      <div className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition">
        <p className="italic text-gray-900 mb-4">
          “I regained my confidence in 6 weeks. The doctors were so understanding
          and the process was completely private. Truly life-changing.”
        </p>
        <p className="text-green-600 text-right">– R, 32 yrs</p>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition">
        <p className="italic text-gray-700 mb-4">
          “I was skeptical about non-pill treatments, but Zeromedixine’s approach
          worked wonders for my energy levels and overall wellness. Highly
          recommended.”
        </p>
        <p className="text-green-600 text-right">– S, 45 yrs</p>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition">
        <p className="italic text-gray-700 mb-4">
          “The personalized care plan made all the difference. It felt like the
          support was designed just for me. I feel like myself again.”
        </p>
        <p className="text-green-600  text-right">– A, 28 yrs</p>
      </div>
    </div>
  </div>
</section>

{/* ================== FOOTER SECTION ================== */}
<footer className="bg-[#0c1220] text-gray-300 pt-20 pb-10 px-6">
  <div className="container mx-auto text-center mb-10">
    <h3 className="text-2xl md:text-3xl text-white mb-4">
      Your wellness journey starts here.
    </h3>
    <p className="text-gray-400 mb-6">
      Book your consultation today — it’s private, safe, and personalized.
    </p>
    <button
      onClick={() =>
        document.querySelector("#book-appointment")?.scrollIntoView({ behavior: "smooth" })
      }
      className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
    >
      Book Appointment Now
    </button>
  </div>

  <div className="border-t border-gray-700 pt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-left">
    {/* Logo */}
    <div>
      <img
          src="https://assets.zyrosite.com/AQExk2poopfpXBKP/g162-Awv4WBBarXteOV3J.svg" 
        alt="Zeromedixine Logo"
        className="h-8 mb-2"
      />
      <p className="text-gray-400">Cure the roots, not the symptoms.</p>
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

  <div className="text-center text-gray-500 text-xs mt-12">
    © 2025 Zeromedixine. All rights reserved.
  </div>
</footer>
{/* Floating WhatsApp Button */}
<button
  className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
>
  <MessageCircle className="w-6 h-6" />
</button>

    </div>
  );
};

export default LandingPage;