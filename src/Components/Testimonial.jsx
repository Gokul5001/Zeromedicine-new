// import React from "react";
// import { motion } from "framer-motion";

// const testimonials = [
//   {
//     quote: "I regained my confidence in 6 weeks. The doctors were understanding and the process was private.",
//     name: "– Rakesh, 32 yrs",
//   },
//   {
//     quote: "I was skeptical about non-pill treatments, but Zeromedixine’s approach boosted my energy and wellness.",
//     name: "– Sanjay, 45 yrs",
//   },
//   {
//     quote: "The personalized care plan made all the difference. It felt like support was designed for me.",
//     name: "– Akash, 28 yrs",
//   },
//   {
//     quote: "The online consultation was smooth and comfortable. I felt heard throughout the process.",
//     name: "– Madhumita, 36 yrs",
//   },
//   {
//     quote: "Thanks to Zeromedixine, I’m feeling healthier and more confident than ever.",
//     name: "– Kunal, 40 yrs",
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section
//       id="testimonials"
//       className="py-16 px-4 bg-gradient-to-br from-white via-blue-50 to-green-50 overflow-hidden"
//     >
//       <div className="container mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl mb-3 text-gray-800 ">
//           Success{" "}
//           <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
//             Stories
//           </span>
//         </h2>
//         <p className="text-gray-600 mb-12">
//           Hear from individuals who transformed their lives with our support.
//         </p>

//         {/* Slider Container */}
//         <div className="relative w-full overflow-hidden">
//         <motion.div
//   className="flex space-x-6"
//   animate={{ x: ["0%", "-100%"] }}
//   transition={{
//     ease: "linear",
//     duration: 20, // ✅ faster & same speed for all devices
//     repeat: Infinity,
//   }}
// >
//   {[...testimonials, ...testimonials].map((t, i) => (
//               <div
//                 key={i}
//                 className="min-w-[320px] md:min-w-[380px] bg-white rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition-all duration-300"
//               >
//                 <p className="italic text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
//                   “{t.quote}”
//                 </p>
//                 <p className="text-green-600 font-medium text-right">{t.name}</p>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
// import React from "react";
// import { motion } from "framer-motion";
// import { Sparkles } from "lucide-react";

// const testimonials = [
//   {
//     quote:
//       "I regained my confidence in 6 weeks. The doctors were understanding and the process was private.",
//     name: "– Rakesh, 32 yrs",
//   },
//   {
//     quote:
//       "I was skeptical about non-pill treatments, but Zeromedixine’s approach boosted my energy and wellness.",
//     name: "– Sanjay, 45 yrs",
//   },
//   {
//     quote:
//       "The personalized care plan made all the difference. It felt like support was designed for me.",
//     name: "– Akash, 28 yrs",
//   },
//   {
//     quote:
//       "The online consultation was smooth and comfortable. I felt heard throughout the process.",
//     name: "– Madhumita, 36 yrs",
//   },
//   {
//     quote:
//       "Thanks to Zeromedixine, I’m feeling healthier and more confident than ever.",
//     name: "– Kunal, 40 yrs",
//   },
// ];

// export default function Testimonials() {
//   return (
//     <section
//       id="testimonials"
//       className="relative py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden"
//       aria-labelledby="testimonial-heading"
//     >
//       {/* soft background glow */}
//       <div className="absolute inset-0 pointer-events-none -z-10">
//         <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>
//       </div>

//       <div className="max-w-7xl mx-auto text-center">
//         {/* Header */}
//         <div className="mb-10">
//           <div className="flex justify-center items-center gap-2 mb-2">
//             <Sparkles className="w-5 h-5 text-green-500" />
//             <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
//               What Our Patients Say
//             </p>
//           </div>

//           <h2
//             id="testimonial-heading"
//             className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3"
//           >
//             Success{" "}
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
//               Stories
//             </span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             Hear from individuals who transformed their health naturally with
//             Zeromedixine’s approach.
//           </p>
//         </div>

//         {/* Infinite Scroll Slider */}
//         <div className="relative w-full overflow-hidden">
//           <motion.div
//             className="flex space-x-6"
//             animate={{ x: ["0%", "-100%"] }}
//             transition={{
//               ease: "linear",
//               duration: 22,
//               repeat: Infinity,
//             }}
//           >
//             {[...testimonials, ...testimonials].map((t, i) => (
//               <div
//                 key={i}
//                 className="min-w-[300px] md:min-w-[380px] bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-6 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//               >
//                 <p className="italic text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
//                   “{t.quote}”
//                 </p>
//                 <p className="text-green-600 font-medium text-right">
//                   {t.name}
//                 </p>
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* small bottom fade gradient for elegance */}
//         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
//       </div>
//     </section>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "I regained my confidence in 6 weeks. The doctors were understanding and the process was private.",
    name: "Rakesh",
    age: "32 yrs",
  },
  {
    quote:
      "I was skeptical about non-pill treatments, but Zeromedixine's approach boosted my energy and wellness.",
    name: "Sanjay",
    age: "45 yrs",
  },
  {
    quote:
      "The personalized care plan made all the difference. It felt like support was designed specifically for me.",
    name: "Akash",
    age: "28 yrs",
  },
  {
    quote:
      "The online consultation was smooth and comfortable. I felt heard throughout the process.",
    name: "Madhumita",
    age: "36 yrs",
  },
  {
    quote:
      "Thanks to Zeromedixine, I'm feeling healthier and more confident than ever.",
    name: "Kunal",
    age: "40 yrs",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6]" />

            <span className="text-sm uppercase tracking-wider font-medium text-[#1e8fd3]">
            What Our Patients Say
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl font-semibold text-gray-900"
           
          >
        Success{" "}

            <span className="bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] bg-clip-text text-transparent">
Stories            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-8">
            Hear from patients who transformed
            their health journey through personalized,
            technology-enabled care at Zeromedixine.
          </p>

        </div>

        {/* TESTIMONIAL SLIDER */}

        <div className="relative">

          {/* Fade Left */}

          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Fade Right */}

          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {[...testimonials, ...testimonials].map(
              (item, index) => (
                <div
                  key={index}
                  className="min-w-[340px] md:min-w-[420px] bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >

                  {/* Quote Icon */}

                  <div className="w-14 h-14 rounded-2xl bg-[#e8f4fd] flex items-center justify-center mb-6">
                    <Quote
                      className="text-[#1e8fd3]"
                      size={24}
                    />
                  </div>

                  {/* Rating */}

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="#fbbf24"
                        color="#fbbf24"
                      />
                    ))}
                  </div>

                  {/* Quote */}

                  <p className="text-gray-600 leading-8 text-[15px] min-h-[140px]">
                    "{item.quote}"
                  </p>

                  {/* Divider */}

                  <div className="border-t border-gray-100 mt-6 pt-5">

                    <h4 className="font-semibold text-gray-900">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {item.age}
                    </p>

                  </div>

                </div>
              )
            )}
          </motion.div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

     

     

     

        </div>

      </div>
    </section>
  );
}

