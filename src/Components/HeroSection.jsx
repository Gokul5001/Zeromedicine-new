import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, Activity, Heart } from "lucide-react";

const trustFeatures = [
  { icon: ShieldCheck, text: "100% Confidential & Private Consultations" },
  { icon: Users, text: "Experienced Doctors & Wellness Experts" },
  { icon: Activity, text: "Root-Cause Based Approach (Not Just Pills)" },
  { icon: Heart, text: "Personalized Treatment Protocols" },
];

const HeroSection = ({ onBookAppointment }) => (
  <section className="relative pt-48 pb-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08),transparent_70%)]"></div>

    <div className="container mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
   <h1 className="text-3xl sm:text-4xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-snug ">
  Take Control of Your Health, Naturally.
</h1>

<p className="text-base sm:text-lg md:text-2xl text-gray-700 mb-10 leading-relaxed">
  From chronic pain to lifestyle disorders — we bring you personalized,
  non-invasive care backed by technology and science.
</p>

        <button
          onClick={onBookAppointment}
          className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
        >
          Book Appointment Now <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {trustFeatures.map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition">
            <feature.icon className="w-10 h-10 mb-3 text-green-600" />
            <p className="text-md text-gray-900">{feature.text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
