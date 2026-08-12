// import React from "react";
// import doctorsGroup from "../assets/LOGO.jpg";
// import {
//   Stethoscope,
//   FlaskConical,
//   HeartPulse,
//   Video,
// } from "lucide-react"; // ✅ clean, healthcare-related icons

// const features = [
//   {
//     title: "Non-Invasive Approach",
//     desc: "We heal without heavy medications or invasive procedures, ensuring minimal side effects.",
//     color: "green",
//     icon: <Stethoscope className="w-10 h-10 text-green-600" />, // ⬆️ Bigger icon
//   },
//   {
//     title: "Science + Holistic Healing",
//     desc: "Combining modern science with proven holistic therapies for comprehensive care.",
//     color: "purple",
//     icon: <FlaskConical className="w-10 h-10 text-purple-600" />, // ⬆️ Bigger icon
//   },
//   {
//     title: "End-to-End Support",
//     desc: "From your first consultation to full recovery, we’re with you every step.",
//     color: "blue",
//     icon: <HeartPulse className="w-10 h-10 text-blue-600" />, // ⬆️ Bigger icon
//   },
//   {
//     title: "24/7 Online Care",
//     desc: "Access our experts anytime through secure and private video calls.",
//     color: "red",
//     icon: <Video className="w-10 h-10 text-red-600" />, // ⬆️ Bigger icon
//   },
// ];

// const WhyChooseUs = () => (
//   <section
//     id="why"
//     className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50"
//   >
//     <div className="container mx-auto text-center">
//       {/* ✅ Title */}
//       <h2 className="text-3xl md:text-4xl mb-9 text-gray-800">
//         Why Choose{" "}
//         <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
//           Zeromedixine
//         </span>
//       </h2>

//       {/* ✅ Image */}
//       <div className="flex justify-center mb-10">
//         <img
//           src={doctorsGroup}
//           alt="Group of doctors"
//           className="w-80 md:w-[400px] h-48 md:h-[250px] object-cover rounded-2xl shadow-md"
//         />
//       </div>

//       {/* ✅ Subtitle */}
//       <p className="text-gray-600 mb-14">
//         Your health, our commitment. Here's what sets us apart.
//       </p>

//       {/* ✅ Features grid */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
//         {features.map((f, i) => (
//           <div
//             key={i}
//             className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
//           >
//             <div
//               className={`w-16 h-16 rounded-full bg-${f.color}-50 flex items-center justify-center mb-4 mx-auto transition-transform duration-300 hover:scale-110`}
//             >
//               {f.icon}
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               {f.title}
//             </h3>
//             <p className="text-gray-600 text-sm">{f.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default WhyChooseUs;

// import React from "react";
// import { motion } from "framer-motion";
// // import doctorsGroup from "../assets/LOGO.jpg";
// import { Stethoscope, FlaskConical, HeartPulse, Video, ShieldCheck } from "lucide-react";

// const BRAND = {
//   primary: "#1e8fd3",
//   secondary: "#40d3b6",
//   text: "#4d4d4d",
// };

// const features = [
//   {
//     title: "Non-Invasive Approach",
//     desc: "We heal without heavy medications or invasive procedures, ensuring minimal side effects.",
//     bgClass: "bg-green-50",
//     icon: <Stethoscope className="w-10 h-10 text-green-600" />,
//   },
//   {
//     title: "Science + Holistic Healing",
//     desc: "Combining modern science with proven holistic therapies for comprehensive care.",
//     bgClass: "bg-purple-50",
//     icon: <FlaskConical className="w-10 h-10 text-purple-600" />,
//   },
//   {
//     title: "End-to-End Support",
//     desc: "From your first consultation to full recovery, we’re with you every step.",
//     bgClass: "bg-blue-50",
//     icon: <HeartPulse className="w-10 h-10 text-blue-600" />,
//   },
//   {
//     title: "24/7 Online Care",
//     desc: "Access our experts anytime through secure and private video calls.",
//     bgClass: "bg-red-50",
//     icon: <Video className="w-10 h-10 text-red-600" />,
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0, y: 22 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 } },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 8 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
// };

// export default function WhyChooseUs() {
//   return (
//     <section
//       id="why"
//       className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden"
//       aria-labelledby="why-heading"
//     >
//       {/* Soft background blobs for continuity with the rest of the site */}
//       <div className="absolute inset-0 -z-10 pointer-events-none">
//         <div style={{ boxShadow: "0 120px 140px rgba(30,143,211,0.06)" }} className="absolute -top-12 -left-10 w-72 h-72 rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
//         <div style={{ boxShadow: "0 120px 140px rgba(64,211,182,0.06)" }} className="absolute -bottom-10 -right-12 w-80 h-80 rounded-full bg-green-100 opacity-40 blur-3xl"></div>
//       </div>

//       <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-7xl mx-auto text-center">
//         <div className="mb-6">
//           <p className="text-sm font-medium uppercase tracking-wider" style={{ color: BRAND.primary }}>
//             Why Zeromedixine
//           </p>
//           <h2 id="why-heading" className="text-3xl md:text-4xl font-semibold text-gray-900 mt-3">
//             Why choose{" "}
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
//               Zeromedixine
//             </span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto mt-4">
//             We combine clinical rigor with natural, patient-first care, focused on long-term recovery, not quick fixes.
//           </p>
//         </div>

//         {/* <motion.div variants={itemVariants} className="flex justify-center mb-10">
//           <img
//             src={doctorsGroup}
//             alt="Zeromedixine doctors"
//             className="w-72 md:w-[420px] h-44 md:h-[260px] object-cover rounded-2xl shadow-lg border"
//             loading="lazy"
//           />
//         </motion.div> */}

//         <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {features.map((f, idx) => (
//             <motion.article
//               key={idx}
//               variants={itemVariants}
//               whileHover={{ y: -6, boxShadow: "0 18px 40px rgba(16,24,40,0.08)" }}
//               className="bg-white rounded-2xl p-6 border border-gray-100 transition-transform duration-300"
//               aria-labelledby={`feature-title-${idx}`}
//               role="region"
//             >
//               <div className={`w-16 h-16 ${f.bgClass} rounded-full flex items-center justify-center mb-4 mx-auto`}>
//                 {f.icon}
//               </div>

//               <h3 id={`feature-title-${idx}`} className="text-lg font-semibold text-gray-800 mb-2 text-center">
//                 {f.title}
//               </h3>

//               <p className="text-gray-600 text-sm text-center">{f.desc}</p>

//               <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-green-600">
//                 <ShieldCheck className="w-4 h-4" />
//                 <span>Trusted & secure care</span>
//               </div>
//             </motion.article>
//           ))}
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }



import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  FlaskConical,
  HeartPulse,
  Video,
  ShieldCheck,
} from "lucide-react";
const BRAND = {
  primary: "#1e8fd3",
  secondary: "#40d3b6",
};

const features = [
  {
    title: "Non-Invasive Approach",
    desc: "We focus on natural recovery methods without unnecessary medications or invasive procedures, ensuring safer and sustainable outcomes.",
    icon: <Stethoscope className="w-7 h-7 text-[#1e8fd3]" />,
    bg: "bg-[#e8f4fd]",
  },
  {
    title: "Science + Holistic Healing",
    desc: "Combining evidence-based rehabilitation with holistic wellness practices to address the root cause of chronic pain.",
    icon: <FlaskConical className="w-7 h-7 text-[#40d3b6]" />,
    bg: "bg-[#e6faf7]",
  },
  {
    title: "End-to-End Recovery Support",
    desc: "From assessment and diagnosis to rehabilitation and long-term wellness guidance throughout your recovery journey.",
    icon: <HeartPulse className="w-7 h-7 text-[#1e8fd3]" />,
    bg: "bg-[#e8f4fd]",
  },
  {
    title: "24/7 Online Care",
    desc: "Access expert physiotherapists and wellness professionals anytime through secure digital consultations.",
    icon: <Video className="w-7 h-7 text-[#40d3b6]" />,
    bg: "bg-[#e6faf7]",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="py-24 px-6 bg-white"
      aria-labelledby="why-heading"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        {/* SECTION HEADER */}

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6]" />

            <span
              className="text-sm uppercase tracking-wider font-medium"
              style={{ color: BRAND.primary }}
            >
              Why Choose Zeromedixine
            </span>
          </div>

          <h2
            id="why-heading"
            className="text-4xl lg:text-5xl font-semibold text-gray-900"
            style={{
            }}
          >
            {" "}
            <span className="bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] bg-clip-text text-transparent">
              12,000+ Patients
            </span>{" "}
            Trust Us
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-8">
            Combining advanced rehabilitation science,
            AI-powered monitoring, and personalized care
            to help patients achieve long-term recovery.
          </p>
        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map((feature, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
    >
      <div
        className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}
      >
        {feature.icon}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {feature.title}
      </h3>

      <p className="text-gray-600 leading-7 text-[15px]">
        {feature.desc}
      </p>
    </motion.div>
  ))}
</div>
      </motion.div>
    </section>
  );
}
