import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import kneePainHero from "../public/Gemini_Generated_Image_knee.webp";

/* ── condition config — slugs match App.jsx routes ── */
const CONDITIONS = [
  { name: "Osteoarthritis",             slug: "/knee-pain/osteoarthritis" },
  { name: "Runner's Knee",              slug: "/knee-pain/runners-knee" },
  { name: "ACL / PCL Injuries",         slug: "/knee-pain/acl-pcl-injuries" },
  { name: "Meniscus Tear",              slug: "/knee-pain/meniscus-tear" },
  { name: "Patellar Tendinitis",        slug: "/knee-pain/patellar-tendonitis" },
  { name: "Chondromalacia Patellae",    slug: "/knee-pain/chondromalacia-patella" },
  { name: "IT Band Syndrome",           slug: "/knee-pain/it-band-syndrome" },
  { name: "Bursitis",                   slug: "/knee-pain/knee-bursitis" },
  { name: "Post Knee Replacement Rehab", slug: "/knee-pain/post-knee-replacement-rehab" },
];

const KneePain = () => {
  const navigate = useNavigate();

  return (
    <main className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-29">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6">
              Knee Pain{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Management
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Knee pain due to arthritis, ligament injury, muscle imbalance, or overuse can
              limit your mobility. Our physiotherapy-led care focuses on restoring joint
              stability, strength, and confidence.
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
            src={kneePainHero}
            alt="Knee Pain Physiotherapy"
            className="rounded-2xl shadow-xl mt-10 md:mt-16 md:ml-8"
          />
        </div>
      </section>

      {/* ── CAUSES ── */}
      <Section>
        <SectionTitle title="Causes of Knee Pain" />
        <div className="grid md:grid-cols-3 gap-8">
          <CauseCard title="Joint Degeneration"     desc="Wear and tear of knee cartilage leads to stiffness and pain." />
          <CauseCard title="Muscle Imbalance"       desc="Weak quadriceps, hamstrings, or glutes overload the knee joint." />
          <CauseCard title="Poor Movement Patterns" desc="Improper walking, running, or squatting increases joint stress." />
        </div>
      </Section>

      {/* ── CONDITIONS (clickable) ── */}
      <Section bg="white">
        <SectionTitle title="Knee Pain Conditions We Treat" />

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
                Evidence-based physiotherapy programs tailored to your condition.
              </p>
              <span className="inline-block mt-4 text-xs font-medium text-blue-600 group-hover:underline">
                Learn more →
              </span>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ── PROCESS ── */}
      <Section bg="gradient">
        <SectionTitle title="Our Knee Pain Recovery Method" center />
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <Step number="1" title="Clinical Assessment" />
          <Step number="2" title="Pain & Swelling Control" />
          <Step number="3" title="Strength & Stability Training" />
          <Step number="4" title="Return to Activity Plan" />
        </div>
      </Section>

      {/* ── BENEFITS ── */}
      <Section bg="white">
        <SectionTitle title="Why Patients Choose Us" />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            "Non-surgical knee pain treatment",
            "No dependency on painkillers",
            "Personalized physiotherapy plans",
            "Focus on joint protection",
            "Improved walking & mobility",
            "Long-term pain prevention",
          ].map(item => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">Get Back to Pain-Free Movement</h2>
        <p className="text-gray-700 mb-10">
          Expert knee rehabilitation without surgery or long-term medication.
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

/* ── shared components ── */

const Section = ({ children, bg }) => {
  const bgClass =
    bg === "gradient" ? "bg-gradient-to-br from-blue-50 to-green-50"
    : bg === "white"  ? "bg-white"
    : "bg-gray-50";
  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4">{children}</div>
    </section>
  );
};

const SectionTitle = ({ title, center }) => (
  <div className={`mb-14 ${center ? "text-center" : ""}`}>
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">{title}</h2>
    <div className={`mt-3 h-1 w-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-full ${center ? "mx-auto" : ""}`} />
  </div>
);

const CauseCard = ({ title, desc }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
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

export default KneePain;