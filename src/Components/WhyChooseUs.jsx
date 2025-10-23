import React from "react";
import doctorsGroup from "../assets/LOGO.jpg";


const features = [
  {
    title: "Non-Invasive Approach",
    desc: "We heal without heavy medications or invasive procedures, ensuring minimal side effects.",
    color: "green",
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929A10 10 0 0112 22a10 10 0 01-7.071-17.071" />
      </svg>
    ),
  },
  {
    title: "Science + Holistic Healing",
    desc: "Combining modern science with proven holistic therapies for comprehensive care.",
    color: "purple",
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
      </svg>
    ),
  },
  {
    title: "End-to-End Support",
    desc: "From your first consultation to full recovery, we’re with you every step.",
    color: "blue",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
      </svg>
    ),
  },
  {
    title: "24/7 Online Care",
    desc: "Access our experts anytime through secure and private video calls.",
    color: "red",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
];

const WhyChooseUs = () => (
  <section id="why" className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
    <div className="container mx-auto text-center">
        {/* 👩‍⚕️👨‍⚕️ Doctors Group Image */}
      {/* 👨‍⚕️ Doctors Group Image */}
   
      <h2 className="text-3xl md:text-4xl mb-9 text-gray-800">
        Why Choose <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">Zeromedixine</span>
      </h2>
      <div className="flex justify-center mb-10">
  <img
    src={doctorsGroup}
    alt="Group of doctors"
    className="w-[600px] h-[350px] object-cover rounded-2xl shadow-md"
  />
</div>

      <p className="text-gray-600 mb-14">
        Your health, our commitment. Here's what sets us apart.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className={`w-12 h-12 rounded-full bg-${f.color}-50 flex items-center justify-center mb-4 mx-auto`}>
              {f.icon}
            </div>
            <h3 className="text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
