import React from "react";

const HowItWorks = () => (
  <section id="how" className="py-16 px-4 bg-white">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl mb-3 text-gray-800">
        How <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">Zeromedixine</span> Works
      </h2>
      <p className="text-gray-600 mb-16">A simple, 3-step journey to your well-being.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {[
          {
            title: "Free Confidential Consultation",
            desc: "Talk openly with our doctor online. Your privacy is our priority.",
            color: "blue",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.003 9.003 0 0012 21a9.003 9.003 0 006.879-3.196M12 3v9l3 3" />
            ),
          },
          {
            title: "Personalized Protocol",
            desc: "A root-cause solution: diet, lifestyle, therapy, and advanced wellness care.",
            color: "green",
            icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
          },
          {
            title: "Continuous Support",
            desc: "An assigned doctor and progress tracking supports you until full recovery.",
            color: "purple",
            icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m2 0a4 4 0 10-4-4 4 4 0 004 4z" />,
          },
        ].map((step, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full bg-${step.color}-50 flex items-center justify-center mb-4`}>
              <svg className={`w-8 h-8 text-${step.color}-600`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {step.icon}
              </svg>
            </div>
            <h3 className="text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
