// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import indiaMap from "../public/in.svg";


// const API_BASE = import.meta.env.VITE_BACKEND_URL;

// /* ---------------------------------------
//    STATE → MAP PIN POSITIONS
// ---------------------------------------- */
// const STATE_MAP_POSITION = {
//   Karnataka: {
//     top: "78%",
//     left: "34%",
//     align: "left", // 👈 label on LEFT
//   },
 
//   Hyderabad: {
//     top: "65%",
//     left: "39%",
//     align: "right",
//   },
//   Kerala: {
//     top: "85%",
//     left: "33%",
//     align: "left",
//   },
//   Gujarat: {
//     top: "52%",
//     left: "19%",
//     align: "left",
//   },
//   Tamilnadu: {
//     top: "84%",
//     left: "38%",
//     align: "right",
//   },
// };



// export default function OurClinics() {
//   const navigate = useNavigate();
//   const [states, setStates] = useState([]);
//   const [hovered, setHovered] = useState(null);

//   useEffect(() => {
//     async function fetchStates() {
//       try {
//         const res = await fetch(`${API_BASE}/api/states`);
//         const data = await res.json();
//         if (data.success) setStates(data.states);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchStates();
//   }, []);

//   return (
//     <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-green-50">
//       <div className="max-w-6xl mx-auto px-6">

//         {/* TITLE */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-semibold">
//             <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//              Health Professionals Across India
//             </span>
//           </h2>
//           <p className="text-gray-600 mt-3 max-w-xl mx-auto">
//             Find verified healthcare professionals near you.
//           </p>
//         </motion.div>

//         {/* MAP WITH PINS */}
//         <div className="relative max-w-md mx-auto">

//           {/* INDIA MAP */}
//           <img
//   src={indiaMap}
//   alt="India Map"
//   className="w-full"
//   width="400"
//   height="400"
// />


//           {/* MAP PINS */}
//           {states.map((s) => {
//   const pos = STATE_MAP_POSITION[s.name];
//   if (!pos) return null;

//   const labelClass =
//     pos.align === "left"
//       ? "right-full mr-2"
//       : pos.align === "right"
//       ? "left-full ml-2"
//       : "left-1/2 -translate-x-1/2";

//   return (
//     <motion.div
//       key={s._id}
//       className="absolute cursor-pointer flex items-center"
//       style={{
//         top: pos.top,
//         left: pos.left,
//         transform: "translate(-50%, -50%)",
//       }}
//       onClick={() => navigate(`/clinics?state=${s._id}`)}
//     >
//       {/* PIN DOT */}
//       <div className="w-3 h-3 bg-green-600 rounded-full shadow-lg z-10" />

//       {/* LABEL */}
//       <div
//         className={`absolute whitespace-nowrap bg-white px-2 py-1 rounded text-xs shadow ${labelClass}`}
//       >
//         {s.name}
//       </div>
//     </motion.div>
//   );
// })}

       
//         </div>
//       </div>
//     </section>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import indiaMap from "../public/country-new.svg";

// const API_BASE = import.meta.env.VITE_BACKEND_URL;

// /* ---------------------------------------
//    STATE → MAP PIN POSITIONS
// ---------------------------------------- */
// const STATE_MAP_POSITION = {
//   Karnataka: {
//     top: "78%",
//     left: "34%",
//     align: "left",
//   },
//   Hyderabad: {
//     top: "65%",
//     left: "39%",
//     align: "right",
//   },
//   Kerala: {
//     top: "85%",
//     left: "33%",
//     align: "left",
//   },
//   Gujarat: {
//     top: "52%",
//     left: "19%",
//     align: "left",
//   },
//   Tamilnadu: {
//     top: "84%",
//     left: "38%",
//     align: "right",
//   },
// };

// /* ---------------------------------------
//    SLUG FUNCTION (IMPORTANT)
// ---------------------------------------- */
// const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

// export default function OurClinics() {
//   const navigate = useNavigate();
//   const [states, setStates] = useState([]);
//   const [hovered, setHovered] = useState(null);

//   useEffect(() => {
//     async function fetchStates() {
//       try {
//         const res = await fetch(`${API_BASE}/api/states`);
//         const data = await res.json();
//         if (data.success) setStates(data.states);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchStates();
//   }, []);

//   return (
//     <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-green-50">
//       <div className="max-w-6xl mx-auto px-6">

//         {/* TITLE */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-semibold">
//             <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//               Health Professionals Across India
//             </span>
//           </h2>
//           <p className="text-gray-600 mt-3 max-w-xl mx-auto">
//             Find verified healthcare professionals near you.
//           </p>
//         </motion.div>
//         {/* <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-md">
//   <iframe
//     src="https://www.google.com/maps/d/embed?mid=18uGtRgHUHDWl1QSjCNACfJqGZ50-bzU"
//     className="w-full h-[450px] md:h-[450px]"
//     style={{ border: "none" }}
//   />
// </div> */}
//         <div className="relative max-w-md mx-auto">


//           <img
//             src={indiaMap}
//             alt="India Map"
//             className="w-full "
//             width="400"
//             height="400"
//           />

//           {states.map((s) => {
//             const pos = STATE_MAP_POSITION[s.name];
//             if (!pos) return null;

//             const labelClass =
//               pos.align === "left"
//                 ? "right-full mr-2"
//                 : pos.align === "right"
//                 ? "left-full ml-2"
//                 : "left-1/2 -translate-x-1/2";

//             return (
//               <motion.div
//                 key={s._id}
//                 className="absolute cursor-pointer flex items-center group"
//                 style={{
//                   top: pos.top,
//                   left: pos.left,
//                   transform: "translate(-50%, -50%)",
//                 }}
//                 onClick={() => navigate(`/clinics/${toSlug(s.name)}`)} // ✅ FIXED
//                 onMouseEnter={() => setHovered(s._id)}
//                 onMouseLeave={() => setHovered(null)}
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <div className="w-3 h-3 bg-green-600 rounded-full shadow-lg z-10" />

//                 <div
//                   className={`absolute whitespace-nowrap bg-white px-2 py-1 rounded text-xs shadow transition-all duration-200 ${labelClass} ${
//                     hovered === s._id ? "opacity-100" : "opacity-90"
//                   }`}
//                 >
//                   {s.name}
//                 </div>
//               </motion.div>
              
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import indiaMap from "../public/SVG World Map (Community) (2).svg";

// const API_BASE = import.meta.env.VITE_BACKEND_URL;

// /* ---------------------------------------
//    STATE → MAP PIN POSITIONS
// ---------------------------------------- */
// const STATE_MAP_POSITION = {
//   Karnataka: {
//     top: "78%",
//     left: "34%",
//     align: "left",
//   },
//   Hyderabad: {
//     top: "65%",
//     left: "39%",
//     align: "right",
//   },
//   Kerala: {
//     top: "85%",
//     left: "33%",
//     align: "left",
//   },
//   Gujarat: {
//     top: "52%",
//     left: "19%",
//     align: "left",
//   },
//   Tamilnadu: {
//     top: "84%",
//     left: "38%",
//     align: "right",
//   },
// };

// /* ---------------------------------------
//    SLUG FUNCTION
// ---------------------------------------- */
// const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

// export default function OurClinics() {
//   const navigate = useNavigate();

//   const [states, setStates] = useState([]);
//   const [hovered, setHovered] = useState(null);

//   // ✅ Counter states
//   const [clinicCount, setClinicCount] = useState(0);
//   const [patientCount, setPatientCount] = useState(0);

//   /* ---------------------------------------
//      FETCH STATES
//   ---------------------------------------- */
//   useEffect(() => {
//     async function fetchStates() {
//       try {
//         const res = await fetch(`${API_BASE}/api/states`);
//         const data = await res.json();
//         if (data.success) setStates(data.states);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchStates();
//   }, []);

//   /* ---------------------------------------
//      AUTO-INCREMENT COUNTER
//   ---------------------------------------- */
//   useEffect(() => {
//     let clinicTarget = 40;
//     let patientTarget = 7000;

//     let clinicInterval = setInterval(() => {
//       setClinicCount((prev) => {
//         if (prev >= clinicTarget) {
//           clearInterval(clinicInterval);
//           return clinicTarget;
//         }
//         return prev + 1;
//       });
//     }, 40);

//     let patientInterval = setInterval(() => {
//       setPatientCount((prev) => {
//         if (prev >= patientTarget) {
//           clearInterval(patientInterval);
//           return patientTarget;
//         }
//         return prev + 50;
//       });
//     }, 30);

//     return () => {
//       clearInterval(clinicInterval);
//       clearInterval(patientInterval);
//     };
//   }, []);

//   return (
//     <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-green-50">
//       <div className="max-w-6xl mx-auto px-6">

//         {/* TITLE */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-semibold">
//             <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//               Health Professionals Across India
//             </span>
//           </h2>
//           <p className="text-gray-600 mt-3 max-w-xl mx-auto">
//             Find verified healthcare professionals near you.
//           </p>
//         </motion.div>

//         {/* MAP */}
//         <div className="relative max-w-4xl mx-auto">
//           <img
//             src={indiaMap}
//             alt="India Map"
//             className="w-full"
//             width="400"
//             height="400"
//           />

//           {states.map((s) => {
//             const pos = STATE_MAP_POSITION[s.name];
//             if (!pos) return null;

//             const labelClass =
//               pos.align === "left"
//                 ? "right-full mr-2"
//                 : pos.align === "right"
//                 ? "left-full ml-2"
//                 : "left-1/2 -translate-x-1/2";

//             return (
//               <motion.div
//                 key={s._id}
//                 className="absolute cursor-pointer flex items-center group"
//                 style={{
//                   top: pos.top,
//                   left: pos.left,
//                   transform: "translate(-50%, -50%)",
//                 }}
//                 onClick={() => navigate(`/clinics/${toSlug(s.name)}`)}
//                 onMouseEnter={() => setHovered(s._id)}
//                 onMouseLeave={() => setHovered(null)}
//                 whileHover={{ scale: 1.1 }}
//               >
//                 {/* PIN */}
//                 <div className="w-3 h-3 bg-green-600 rounded-full shadow-lg z-10" />

//                 {/* LABEL */}
//                 <div
//                   className={`absolute whitespace-nowrap bg-white px-2 py-1 rounded text-xs shadow transition-all duration-200 ${labelClass} ${
//                     hovered === s._id ? "opacity-100" : "opacity-90"
//                   }`}
//                 >
//                   {s.name}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* ✅ COUNTERS */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mt-16 grid grid-cols-2 gap-6 text-center"
//         >
//           {/* Clinics */}
//           <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
//             <h3 className="text-3xl font-bold text-blue-600">
//               {clinicCount}+
//             </h3>
//             <p className="text-gray-600 mt-2 text-sm">
//               Clinics Integrated
//             </p>
//           </div>

//           {/* Patients */}
//           <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
//             <h3 className="text-3xl font-bold text-green-600">
//               {patientCount}+
//             </h3>
//             <p className="text-gray-600 mt-2 text-sm">
//               Patients Served
//             </p>
//           </div>  
//         </motion.div>

//       </div>
//     </section>
//   );
// }


import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import worldMap from "../public/SVG World Map (Community) (2).webp";

export default function OurClinics() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6]" />

            <span className="text-sm uppercase tracking-wider font-medium text-[#1e8fd3]">
              Healthcare Network
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl font-semibold text-gray-900"
            style={{
            }}
          >
      With Patients{" "}
            <span className="bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] bg-clip-text text-transparent">
     
              Across World
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-8">
            Connecting patients with trusted healthcare
            professionals through technology-driven care,
            rehabilitation, and wellness services.
          </p>
        </motion.div>

        {/* WORLD MAP */}

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto bg-gray-50 rounded-3xl border border-gray-100 p-8 lg:p-12 overflow-hidden"
        >
          {/* Background Glow */}

          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30" />

          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-30" />

          <img
            src={worldMap}
            alt="Global Healthcare Network"
            className="w-full relative z-10 opacity-90"
          />

          {/* Floating Stat */}

       

          {/* Floating Badge */}

        
        </motion.div>

        {/* STATS */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          <div className="bg-white rounded-3xl border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300">
            <h3 className="text-4xl font-bold text-[#1e8fd3]">
              12K+
            </h3>

            <p className="text-gray-500 mt-2">
              Patients Treated
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300">
            <h3 className="text-4xl font-bold text-[#40d3b6]">
              50+
            </h3>

            <p className="text-gray-500 mt-2">
              Countries Served
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300">
            <h3 className="text-4xl font-bold text-[#1e8fd3]">
              94%
            </h3>

            <p className="text-gray-500 mt-2">
              Recovery Rate
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300">
            <h3 className="text-4xl font-bold text-[#40d3b6]">
              24/7
            </h3>

            <p className="text-gray-500 mt-2">
              Digital Care
            </p>
          </div>
        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-12"
        >
       
        </motion.div>

      </div>
    </section>
  );
}
