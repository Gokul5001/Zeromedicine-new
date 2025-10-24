import React from "react";

const Testimonials = () => (
  <section id="testimonials" className="py-16 px-4 bg-gradient-to-br from-white via-blue-50 to-green-50">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl mb-3 text-gray-800">
        Success <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">Stories</span>
      </h2>
      <p className="text-gray-600 mb-16">
        Hear from individuals who transformed their lives with our support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { quote: "I regained my confidence in 6 weeks. The doctors were understanding and the process was private.", name: "– R, 32 yrs" },
          { quote: "I was skeptical about non-pill treatments, but Zeromedixine’s approach boosted my energy.", name: "– S, 45 yrs" },
          { quote: "The personalized care plan made all the difference. It felt like support was designed for me.", name: "– A, 28 yrs" },
        ].map((t, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition">
            <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
            <p className="text-green-600 text-right">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
