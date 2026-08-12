// // src/Components/FounderReelSection.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { Sparkles, ShieldCheck, Video, Users } from "lucide-react";

// const BRAND = {
//   primary: "#1e8fd3",
//   secondary: "#40d3b6",
//   text: "#4d4d4d",
// };

// export default function FounderReelSection() {
//   return (
//     <section className="relative py-24 px-6 bg-gradient-to-br from-white via-blue-50 to-green-50 overflow-hidden">
      
//       {/* Background glow */}
//       <div className="absolute inset-0 pointer-events-none -z-10">
//         <div className="absolute -left-10 top-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
//         <div className="absolute -right-10 bottom-10 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30"></div>
//       </div>

//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
//         {/* LEFT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-2 mb-3">
//             <Sparkles className="w-5 h-5 text-green-500" />
//             <p
//               className="text-sm font-semibold uppercase tracking-wide"
//               style={{ color: BRAND.primary }}
//             >
//               Co-Founder's Message
//             </p>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5 leading-tight">
//             Why{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//               Online Consultation
//             </span>{" "}
//             Works at Zeromedixine
//           </h2>

//           <p className="text-gray-600 leading-relaxed mb-6">
//           Zeromedixine delivers advanced online physiotherapy through clinical expertise and technology-driven care. Our structured consultations focus on diagnosing the root cause of chronic pain and creating personalised rehabilitation plans for long-term recovery.
//           </p>

//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <ShieldCheck className="text-blue-600 mt-1" size={20} />
//               <p className="text-gray-700 text-sm">
//                 100% confidential and private doctor interaction
//               </p>
//             </div>

//             <div className="flex items-start gap-3">
//               <Video className="text-green-600 mt-1" size={20} />
//               <p className="text-gray-700 text-sm">
//                 Structured video consultations with personalized protocols
//               </p>
//             </div>

//             <div className="flex items-start gap-3">
//               <Users className="text-purple-600 mt-1" size={20} />
//               <p className="text-gray-700 text-sm">
//                 Continuous follow-up and digital progress tracking
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* RIGHT SIDE – FACEBOOK REEL */}
//      {/* RIGHT SIDE – YOUTUBE SHORT */}
// {/* RIGHT SIDE – YOUTUBE SHORT */}
// <motion.div
//   initial={{ opacity: 0, x: 40 }}
//   whileInView={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.8 }}
//   viewport={{ once: true }} 
//   className="flex justify-center"
// >
//   <div className="relative w-[315px] aspect-[9/16] rounded-3xl overflow-hidden shadow-xl border border-gray-200">
//     <iframe
//       src="https://www.youtube.com/embed/FniHBkpf-Bs"
//       title="Zeromedixine Founder Message"
//       className="absolute top-0 left-0 w-full h-full"
//       frameBorder="0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//       allowFullScreen
//     />
//   </div>
// </motion.div>



//       </div>
//     </section>
//   );
// }


// src/Components/FounderReelSection.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Video, Users } from "lucide-react";

const BRAND = {
  primary: "#1e8fd3",
  secondary: "#40d3b6",
  text: "#4d4d4d",
};

// export default function FounderReelSection() {
//   const [playVideo, setPlayVideo] = useState(false);

//   return (
//     <section className="relative py-24 px-6 bg-gradient-to-br from-white via-blue-50 to-green-50 overflow-hidden">
      
//       {/* Background glow */}
//       <div className="absolute inset-0 pointer-events-none -z-10">
//         <div className="absolute -left-10 top-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
//         <div className="absolute -right-10 bottom-10 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30"></div>
//       </div>

//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
//         {/* LEFT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex items-center gap-2 mb-3">
//             <Sparkles className="w-5 h-5 text-green-500" />
//             <p
//               className="text-sm font-semibold uppercase tracking-wide"
//               style={{ color: BRAND.primary }}
//             >
//               Co-Founder's Message
//             </p>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5 leading-tight">
//             Why{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//               Online Consultation
//             </span>{" "}
//             Works at Zeromedixine
//           </h2>

//           <p className="text-gray-600 leading-relaxed mb-6">
//             Zeromedixine delivers advanced online physiotherapy through clinical expertise and technology-driven care. Our structured consultations focus on diagnosing the root cause of chronic pain and creating personalised rehabilitation plans for long-term recovery.
//           </p>

//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <ShieldCheck className="text-blue-600 mt-1" size={20} />
//               <p className="text-gray-700 text-sm">
//                 100% confidential and private doctor interaction
//               </p>
//             </div>

//             <div className="flex items-start gap-3">
//               <Video className="text-green-600 mt-1" size={20} />
//               <p className="text-gray-700 text-sm">
//                 Structured video consultations with personalized protocols
//               </p>
//             </div>

//             <div className="flex items-start gap-3">
//               <Users className="text-purple-600 mt-1" size={20} />
//               <p className="text-gray-700 text-sm">
//                 Continuous follow-up and digital progress tracking
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* RIGHT SIDE – CLICK TO LOAD VIDEO */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="flex justify-center"
//         >
//           <div className="relative w-[315px] aspect-[9/16] rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            
//             {!playVideo ? (
//               <div
//                 className="w-full h-full cursor-pointer relative group"
//                 onClick={() => setPlayVideo(true)}
//               >
//                 {/* Thumbnail */}
//                 <img
//   src="https://zeromedixine-doctor-images.s3.ap-south-1.amazonaws.com/oar2.webp"
//   className="w-full h-full object-cover"
//   alt="Founder Video"
//   loading="lazy"
// />
//                 {/* Dark overlay */}
//                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

//                 {/* Play Button */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-lg group-hover:scale-110 transition">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="black"
//                       className="w-6 h-6"
//                     >
//                       <path d="M8 5v14l11-7z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <iframe
//                 src="https://www.youtube.com/embed/FniHBkpf-Bs?autoplay=1"
//                 title="Zeromedixine Founder Message"
//                 className="absolute top-0 left-0 w-full h-full"
//                 frameBorder="0"
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//               />
//             )}

//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// }

export default function FounderReelSection() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section
            id="how"

      className="bg-white overflow-hidden"
      style={{
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="grid lg:grid-cols-[45%_55%] items-center"
        style={{ minHeight: "650px" }}
      >
        {/* VIDEO SIDE */}
        <div className="flex justify-center items-center py-16">
          <div className="relative w-[320px] aspect-[9/16] rounded-[28px] overflow-hidden shadow-2xl">

            {!playVideo ? (
              <div
                onClick={() => setPlayVideo(true)}
                className="relative w-full h-full cursor-pointer group"
              >
                <img
                  src="https://zeromedixine-doctor-images.s3.ap-south-1.amazonaws.com/oar2.webp"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-all" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                    <svg
                      width="28"
                      height="28"
                      fill="black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/FniHBkpf-Bs?autoplay=1"
                title="Founder Message"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}

        

          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="px-8 lg:px-16 py-16">

          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6]" />

            <span className="text-sm font-medium uppercase tracking-wider text-[#1e8fd3]">
              Co-Founder Message
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl font-semibold leading-tight mb-6"
            style={{
            }}
          >
            Why{" "}
            <span className="bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] bg-clip-text text-transparent">
              Online Consultation
            </span>{" "}
            Works at Zeromedixine
          </h2>

          <p className="text-gray-600 leading-8 text-[15px] max-w-xl mb-10">
            Zeromedixine delivers advanced online physiotherapy
            through clinical expertise and technology-driven care.
            Our structured consultations focus on diagnosing the
            root cause of chronic pain and creating personalised
            rehabilitation plans for long-term recovery.
          </p>

          <div className="grid gap-4 max-w-xl">

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <ShieldCheck
                size={22}
                className="text-[#1e8fd3] mt-1"
              />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Private & Confidential
                </h4>
                <p className="text-sm text-gray-600">
                  100% secure doctor interaction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <Video
                size={22}
                className="text-[#40d3b6] mt-1"
              />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Structured Consultations
                </h4>
                <p className="text-sm text-gray-600">
                  Personalized protocols and guided recovery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <Users
                size={22}
                className="text-purple-600 mt-1"
              />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Continuous Follow-up
                </h4>
                <p className="text-sm text-gray-600">
                  Progress tracking and long-term support.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}