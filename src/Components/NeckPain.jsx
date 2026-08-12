import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import neckPainHero from "../public/Gemini_Generated_Image_Neck.webp";

/* ── condition config ── */
const CONDITIONS = [
  { name: "Cervical Spondylosis",   slug: "/neck-pain/cervical-spondylosis" },
  { name: "Cervical Disc Prolapse", slug: "/neck-pain/cervical-disc-prolapse" },
  { name: "Cervical Radiculopathy", slug: "/neck-pain/cervical-radiculopathy" },
  { name: "Cervicogenic Headache",  slug: "/neck-pain/cervicogenic-headache" },
  { name: "Mechanical Neck Pain",   slug: "/neck-pain/mechanical-neck-pain" },
  { name: "Postural Neck Pain",     slug: "/neck-pain/postural-neck-pain" },
  { name: "Text Neck Syndrome",     slug: "/neck-pain/text-neck-syndrome" },
  { name: "Whiplash Injuries",      slug: "/neck-pain/whiplash-injuries" },
  { name: "Upper Cross Syndrome",   slug: "/neck-pain/upper-cross-syndrome" },
];

const NeckPain = () => {
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
              Neck Pain{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Management
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Neck pain commonly develops due to prolonged screen use,
              poor posture, stress, and reduced cervical mobility.
              Our physiotherapy-led care addresses the root cause
              to prevent headaches, nerve pain, and stiffness.
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
            src={neckPainHero}
            alt="Neck Pain Physiotherapy"
            className="rounded-2xl shadow-xl mt-10 md:mt-16 md:ml-8"
          />
        </div>
      </section>

      {/* ================= CAUSES ================= */}
      <Section>
        <SectionTitle title="Why Neck Pain Occurs" />

        <div className="grid md:grid-cols-3 gap-8">
          <CauseCard
            title="Poor Posture"
            desc="Forward head posture and prolonged device usage overload neck muscles."
          />
          <CauseCard
            title="Muscle Imbalance"
            desc="Weak deep neck flexors and tight upper muscles reduce stability."
          />
          <CauseCard
            title="Stress & Tension"
            desc="Chronic stress increases muscle tightness and pain sensitivity."
          />
        </div>
      </Section>

      {/* ================= CONDITIONS (clickable) ================= */}
      <Section bg="white">
        <SectionTitle title="Neck Conditions We Treat" />

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
                Targeted rehabilitation based on your cervical condition.
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
        <SectionTitle title="Our Neck Pain Recovery Method" center />

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <Step number="1" title="Posture & Movement Assessment" />
          <Step number="2" title="Pain & Muscle Relaxation" />
          <Step number="3" title="Strength & Mobility Training" />
          <Step number="4" title="Posture & Work Habit Correction" />
        </div>
      </Section>

      {/* ================= BENEFITS ================= */}
      <Section bg="white">
        <SectionTitle title="Why Patients Choose Us" />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            "No surgery or injections",
            "Drug-free neck pain relief",
            "Reduces headaches & stiffness",
            "Improves posture & mobility",
            "Nerve-friendly rehabilitation",
            "Long-term prevention strategies"
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
          Relieve Neck Pain. Restore Comfort.
        </h2>
        <p className="text-gray-700 mb-10">
          Expert neck pain care without surgery or long-term medication.
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

export default NeckPain;