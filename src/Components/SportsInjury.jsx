import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sportsInjuryHero from "../public/Gemini_Generated_Image_Sports.webp";

const SportsInjury = () => {
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
              Sports Injury{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Rehabilitation
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Sports injuries require structured, progressive rehabilitation
              to ensure safe return to play, restore peak performance, and
              reduce the risk of re-injury.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
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
            src={sportsInjuryHero}
            alt="Sports Injury Rehabilitation Physiotherapy"
            className="rounded-2xl shadow-xl mt-10 md:mt-16 md:ml-8"
          />
        </div>
      </section>

      {/* ================= CAUSES ================= */}
      <Section>
        <SectionTitle title="Why Sports Injuries Occur" />

        <div className="grid md:grid-cols-3 gap-8">
          <CauseCard
            title="Overuse & Repetition"
            desc="Repeated stress without adequate recovery overloads tissues."
          />
          <CauseCard
            title="Poor Training Technique"
            desc="Improper mechanics increase injury risk during sport."
          />
          <CauseCard
            title="Muscle Imbalance"
            desc="Weakness or tightness alters joint control and stability."
          />
        </div>
      </Section>

      {/* ================= CONDITIONS ================= */}
      <Section bg="white">
        <SectionTitle title="Sports Injuries We Treat" />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "ACL & Ligament Tears",
            "Meniscus Injuries",
            "Achilles Tendinitis",
            "Ankle Sprains",
            "Hamstring & Muscle Strains",
            "Groin Pulls",
            "Runner’s & Jumper’s Knee",
            "Rotator Cuff Injuries",
            "Tendon & Stress Fractures"
          ].map(item => (
            <div key={item} className="card">
              <ClipboardList className="text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item}</h3>
              <p className="text-gray-600">
                Sports-specific rehab focused on safe return to performance.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= PROCESS ================= */}
      <Section bg="gradient">
        <SectionTitle title="Our Sports Therapy Process" center />

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <Step number="1" title="Injury & Movement Assessment" />
          <Step number="2" title="Pain Control & Mobility" />
          <Step number="3" title="Strength, Power & Agility" />
          <Step number="4" title="Return-to-Play Protocols" />
        </div>
      </Section>

      {/* ================= BENEFITS ================= */}
      <Section bg="white">
        <SectionTitle title="Why Athletes Choose Us" />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            "Evidence-based sports rehab",
            "Criteria-based return to sport",
            "Performance-focused training",
            "Reduced re-injury risk",
            "Sport-specific conditioning",
            "Long-term athletic durability"
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
          Recover Stronger. Perform Better.
        </h2>
        <p className="text-gray-700 mb-10">
          Expert sports injury rehabilitation without shortcuts.
        </p>

        <button
          onClick={() => navigate("/book-appointment")}
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

export default SportsInjury;
