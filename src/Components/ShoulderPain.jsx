import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import shoulderPainHero from "../public/Gemini_Generated_Image_shoulder.webp";

/* ── condition config ── */
const CONDITIONS = [
  { name: "Frozen Shoulder",               slug: "/shoulder-pain/frozen-shoulder" },
  { name: "Rotator Cuff Tear",              slug: "/shoulder-pain/rotator-cuff-tear" },
  { name: "Rotator Cuff Tendinopathy",      slug: "/shoulder-pain/rotator-cuff-tendinopathy" },
  { name: "Shoulder Impingement",           slug: "/shoulder-pain/shoulder-impingement" },
  { name: "Shoulder Instability",           slug: "/shoulder-pain/shoulder-instability" },
  { name: "Labral & SLAP Injuries",         slug: "/shoulder-pain/labral-slap-injuries" },
  { name: "Bursitis",                       slug: "/shoulder-pain/shoulder-bursitis" },
  { name: "AC Joint Disorders",             slug: "/shoulder-pain/ac-joint-disorders" },
  { name: "Post-Fracture Rehabilitation",   slug: "/shoulder-pain/post-fracture-rehabilitation" },
];

const ShoulderPain = () => {
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
              Shoulder Pain{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Management
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Shoulder pain often develops due to restricted mobility,
              muscle imbalance, or repetitive overuse. Our physiotherapy-led
              approach restores movement, strength, and long-term function.
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
            src={shoulderPainHero}
            alt="Shoulder Pain Physiotherapy"
            className="rounded-2xl shadow-xl mt-10 md:mt-16 md:ml-8"
          />
        </div>
      </section>

      {/* ================= CAUSES ================= */}
      <Section>
        <SectionTitle title="Why Shoulder Pain Occurs" />

        <div className="grid md:grid-cols-3 gap-8">
          <CauseCard
            title="Poor Posture"
            desc="Rounded shoulders and slouched posture overload the shoulder joint."
          />
          <CauseCard
            title="Overhead Overuse"
            desc="Repeated lifting or overhead activity irritates shoulder tissues."
          />
          <CauseCard
            title="Muscle Imbalance"
            desc="Weak rotator cuff and scapular muscles reduce joint control."
          />
        </div>
      </Section>

      {/* ================= CONDITIONS (clickable) ================= */}
      <Section bg="white">
        <SectionTitle title="Shoulder Conditions We Treat" />

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
                Personalized rehabilitation based on your shoulder condition.
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
        <SectionTitle title="Our Shoulder Recovery Method" center />

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <Step number="1" title="Movement & Posture Assessment" />
          <Step number="2" title="Pain & Stiffness Reduction" />
          <Step number="3" title="Strength & Stability Training" />
          <Step number="4" title="Return to Daily & Sports Activity" />
        </div>
      </Section>

      {/* ================= BENEFITS ================= */}
      <Section bg="white">
        <SectionTitle title="Why Patients Choose Us" />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            "No injections or surgery",
            "Drug-free shoulder pain care",
            "Restores shoulder mobility",
            "Improves posture & control",
            "Sports & work-specific rehab",
            "Long-term pain prevention"
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
          Restore Shoulder Movement With Confidence
        </h2>
        <p className="text-gray-700 mb-10">
          Expert shoulder rehabilitation without surgery or long-term medication.
        </p>

        <button
onClick={() => navigate("/#doctors-section")}              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-xl hover:scale-105 transition"
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

export default ShoulderPain;