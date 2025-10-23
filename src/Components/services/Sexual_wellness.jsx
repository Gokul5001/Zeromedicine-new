import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Salad, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fitnessPrograms = [
  "Erectile Dysfunction",
  "Premature Ejaculation",
  "Low Libido (Men & Women)",
  "Hormonal Imbalance",
  "PCOS & Fertility Support"
];

const SexualWellness = ({ scrollToAppointment }) => {
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false }); // navigate to home page
      setTimeout(() => {
        scrollToAppointment(); // scroll after home page renders
      }, 100);
    } else {
      scrollToAppointment(); // already on home page
    }
  };

  return (
    <section className="relative py-35 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Gradient Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.08),transparent_70%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.08),transparent_70%)] opacity-90"></div>

      <div className="container mx-auto text-center relative z-10 max-w-5xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <HeartHandshake className="w-10 h-10 text-green-600" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Sexual Wellness
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
            We offer private and judgment-free consultations addressing sexual
            health for both men and women — ensuring emotional, physical, and
            hormonal balance for a healthier, confident you.
          </p>
        </motion.div>

        {/* Program List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-lg shadow-md rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex justify-center items-center gap-2">
            <Salad className="w-6 h-6 text-green-500" /> Conditions We Treat
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base text-left max-w-md mx-auto">
            {fitnessPrograms.map((program, index) => (
              <li
                key={index}
                className="flex items-center gap-2 hover:text-green-600 transition"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {program}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => navigate("/")}
            className="text-gray-800 hover:text-green-600 font-medium transition"
          >
            ← Back to Services
          </button>

          <button
            onClick={handleBookConsultation}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-green-700 transition"
          >
            Book a Consultation <MoveRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SexualWellness;
