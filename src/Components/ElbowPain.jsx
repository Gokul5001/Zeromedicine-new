import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import elbowPainHero from "../public/Gemini_Generated_Image_elbow.webp";



import { ArrowRight } from "lucide-react";

/* ── condition config ── */
const CONDITIONS = [
  { name: "Tennis Elbow",                slug: "/pain-relief/elbow-pain/tennis-elbow" },
  { name: "Golfer's Elbow",              slug: "/pain-relief/elbow-pain/golfers-elbow" },
  { name: "Cubital Tunnel Syndrome",     slug: "/pain-relief/elbow-pain/cubital-tunnel-syndrome" },
  { name: "Radial Tunnel Syndrome",      slug: "/pain-relief/elbow-pain/radial-tunnel-syndrome" },
  { name: "Olecranon Bursitis",          slug: "/pain-relief/elbow-pain/olecranon-bursitis" },
  { name: "Elbow Ligament Injuries",     slug: "/pain-relief/elbow-pain/elbow-ligament-injuries" },
  { name: "Posterior Elbow Impingement", slug: "/pain-relief/elbow-pain/posterior-elbow-impingement" },
  { name: "Elbow Instability",           slug: "/pain-relief/elbow-pain/elbow-instability" },
  { name: "Post-Fracture Rehabilitation",slug: "/pain-relief/elbow-pain/post-fracture-rehabilitation" },
];

const ElbowPain = () => {
  const navigate = useNavigate();

  return (
    <main className="overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-29">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6">
              Elbow Pain{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Management
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Elbow pain often develops due to repetitive strain, sports overuse,
              or poor forearm mechanics. Our physiotherapy-led care restores
              strength, grip control, and pain-free movement.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
onClick={() => navigate("/#doctors-section")}                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Consultation
              </button>

              <button
                onClick={() => navigate("/pain-relief")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                View Conditions
              </button>
            </div>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={elbowPainHero}
            alt="Elbow Pain Physiotherapy"
            className="rounded-2xl shadow-xl mt-10 md:mt-16 md:ml-8"
          />
        </div>
      </section>

      {/* ================= CAUSES ================= */}
      <Section>
        <SectionTitle title="Why Elbow Pain Occurs" />

        <div className="grid md:grid-cols-3 gap-8">
          <CauseCard
            title="Repetitive Overuse"
            desc="Repeated gripping, lifting, or twisting overloads elbow tendons."
          />
          <CauseCard
            title="Poor Mechanics"
            desc="Faulty wrist and forearm movement increases strain at the elbow."
          />
          <CauseCard
            title="Muscle Imbalance"
            desc="Weak or tight forearm muscles reduce joint stability."
          />
        </div>
      </Section>

{/* ================= CONDITIONS ================= */}
<Section bg="white">
  <SectionTitle title="Elbow Conditions We Treat" />

  <div className="grid md:grid-cols-3 gap-8">
    {CONDITIONS.map((condition, i) => (
      <motion.button
        key={condition.name}
        onClick={() => navigate(condition.slug)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06 }}
        className="group text-left bg-white rounded-xl p-6 shadow hover:shadow-xl border border-transparent hover:border-blue-100 transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <ClipboardList className="text-blue-600 shrink-0" size={22} />
          <ArrowRight
            size={16}
            className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 mt-0.5"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-700 transition-colors">
          {condition.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Evidence-based rehabilitation programs for elbow recovery.
        </p>
        <span className="inline-block mt-4 text-xs font-medium text-blue-600 group-hover:underline">
          Learn more →
        </span>
      </motion.button>
    ))}
  </div>
</Section>

      {/* ================= PROCESS ================= */}
      <Section bg="gradient">
        <SectionTitle title="Our Elbow Pain Recovery Method" center />

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <Step number="1" title="Movement & Load Assessment" />
          <Step number="2" title="Pain & Inflammation Control" />
          <Step number="3" title="Strength & Grip Training" />
          <Step number="4" title="Return to Work & Sport" />
        </div>
      </Section>

      {/* ================= BENEFITS ================= */}
      <Section bg="white">
        <SectionTitle title="Why Patients Choose Us" />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            "No injections or surgery",
            "Drug-free pain management",
            "Grip & forearm strengthening",
            "Sports & work-specific rehab",
            "Reduced recurrence risk",
            "Long-term functional recovery"
          ].map(item => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Fix the Cause. Not Just the Pain.
        </h2>
        <p className="text-gray-700 mb-10">
          Expert elbow pain treatment without surgery or long-term medication.
        </p>

        <button
onClick={() => navigate("/#doctors-section")}    
          className="px-10 py-5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-xl hover:scale-105 transition"
        >
          Book Your Recovery Call
        </button>
      </section>

    </main>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Section = ({ children, bg }) => {
  const bgClass =
    bg === "gradient"
      ? "bg-gradient-to-br from-blue-50 to-green-50"
      : bg === "white"
      ? "bg-white"
      : "bg-gray-50";

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

const SectionTitle = ({ title, center }) => (
  <div className={`mb-14 ${center ? "text-center" : ""}`}>
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
      {title}
    </h2>
    <div
      className={`mt-3 h-1 w-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-full ${
        center ? "mx-auto" : ""
      }`}
    />
  </div>
);

const CauseCard = ({ title, desc }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {desc}
    </p>
  </div>
);

const Step = ({ number, title }) => (
  <div>
    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <p className="font-semibold text-gray-800">{title}</p>
  </div>
);

export default ElbowPain;
