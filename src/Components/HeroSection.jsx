// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, ShieldCheck, Users, Activity, Heart } from "lucide-react";

// const trustFeatures = [
//   { icon: ShieldCheck, text: "100% Confidential & Private Consultations" },
//   { icon: Users, text: "Experienced Doctors & Wellness Experts" },
//   { icon: Activity, text: "Root-Cause Based Approach (Not Just Pills)" },
//   { icon: Heart, text: "Personalized Treatment Protocols" },
// ];

// const HeroSection = ({ onBookAppointment }) => (
//   <section className="relative pt-48 pb-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
//     <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08),transparent_70%)]"></div>

//     <div className="container mx-auto text-center relative z-10">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-4xl mx-auto"
//       >
//    <h1 className="text-4xl sm:text-4xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-snug ">
    
//   Take Control of Your Health, Naturally.
// </h1>

// <p className="text-base sm:text-lg md:text-2xl text-gray-700 mb-10 leading-relaxed">
//   From chronic pain to lifestyle disorders — we bring you personalized,
//   non-invasive care backed by technology and science.
// </p>

//         <button
//           onClick={onBookAppointment}
//           className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
//         >
//           Book Appointment Now <ArrowRight className="ml-2 w-5 h-5" />
//         </button>
//       </motion.div>

//       <motion.div
//         className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.3 }}
//       >
//         {trustFeatures.map((feature, i) => (
//           <div key={i} className="flex flex-col items-center text-center p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition">
//             <feature.icon className="w-10 h-10 mb-3 text-green-600" />
//             <p className="text-md text-gray-900">{feature.text}</p>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   </section>
// );

// export default HeroSection;


import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, Activity, Heart } from "lucide-react";

const trustFeatures = [
  { icon: ShieldCheck, text: "100% Confidential & Private Consultations" },
  { icon: Users, text: "Experienced Doctors & Wellness Experts" },
  { icon: Activity, text: "Root-Cause Based Approach (Not Just Pills)" },
  { icon: Heart, text: "Personalized Treatment Protocols" },
];

const HeroSection = ({ onBookAppointment }) => {
  return (
    <section className="relative pt-36 md:pt-48 pb-24 px-6 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background decorative gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-tight">
            Take Control of Your Health, Naturally.
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            From chronic pain to lifestyle disorders — we provide <span className="font-semibold text-green-600">personalized, non-invasive</span> care backed by modern
            technology and trusted medical expertise.
          </p>

          <motion.button
            onClick={onBookAppointment}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 mx-auto"
          >
            Book Appointment Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 max-w-5xl mx-auto mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {trustFeatures.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition"
            >
              <feature.icon className="w-12 h-12 mb-3 text-green-600" />
              <p className="text-base font-medium text-gray-800 leading-snug">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
