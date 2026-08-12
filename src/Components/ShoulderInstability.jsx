import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  Stethoscope,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import instabilityimage from "../assets/shoulder-instability.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Shoulder Instability blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "A feeling of the shoulder slipping, giving way, or feeling loose",
  "Apprehension — fear that the shoulder is about to dislocate",
  "Deep shoulder pain, particularly at end-range positions",
  "Clicking, clunking, or catching sensations",
  "Recurrent episodes of subluxation or dislocation",
];

const PREVENTION = [
  { title: "Rotator Cuff Strengthening", desc: "The primary dynamic stabiliser, compressing the humeral head into the glenoid." },
  { title: "Scapular Stabilisation",     desc: "Ensures the glenoid is correctly oriented to receive the humeral head." },
  { title: "Proprioceptive Training",    desc: "Restoring the joint's sense of position, significantly impaired after dislocation." },
  { title: "Early Rehabilitation After First Dislocation", desc: "Recurrence risk is highest after the first episode." },
  { title: "Technique Correction in Sport", desc: "Reducing positions of maximum instability under load." },
  { title: "Hypermobility Management",   desc: "Building dynamic stability to compensate for reduced passive restraint." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Applied to the rotator cuff, posterior capsule, and pectoral region — carefully avoiding compromise of the joint's passive restraints." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the upper trapezius and posterior rotator cuff." },
  { title: "Scapulothoracic Mobilisation", desc: "Restoring normal scapular movement for optimal glenoid orientation." },
  { title: "Dry Needling",              desc: "Reduces trigger points in the rotator cuff and periscapular muscles." },
  { title: "Cupping Therapy",           desc: "Releases fascial restrictions and improves circulation around the unstable shoulder." },
];

const EXERCISES = [
  "Phase 1: rotator cuff isometrics and proprioceptive retraining",
  "Phase 2: closed kinetic chain exercises, progressive resistance training, rhythmic stabilisation",
  "Phase 3: progressive overhead loading and plyometric exercises",
  "Phase 4: criteria-based return to sport",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const ShoulderInstability = () => {
  const navigate = useNavigate();

  return (
    <main className="overflow-hidden">

      {/* ── BREADCRUMB ── */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
        >
          <ChevronLeft size={16} />
          Shoulder Pain Conditions
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Shoulder Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Understanding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Shoulder Instability
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              What it is, how to prevent it, and how physiotherapy helps you recover
              — explained by your physiotherapy team.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/shoulder-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Shoulder Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            <img
              src={instabilityimage}
              alt="Shoulder instability illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <SectionBadge label="01 — What is it?" />
            <SectionTitle title="What is Shoulder Instability?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Shoulder Instability occurs when the humeral head cannot be maintained securely
              within the shallow glenoid socket — resulting in excessive movement, pain, and
              apprehension.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The shoulder relies heavily on static stabilisers (labrum, ligaments, joint capsule)
              and dynamic stabilisers (rotator cuff and scapular muscles) to maintain joint
              integrity. When these systems are compromised, instability results.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Instability is classified by direction (anterior is most common), and by cause —
              traumatic (following a dislocation, often with structural damage) or atraumatic
              (from generalised laxity, which responds very well to physiotherapy).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">Common Symptoms</h3>
            <ul className="space-y-4">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How Can Physiotherapy Help Prevent It?" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          From a physiotherapy perspective, building dynamic stability around the shoulder is the
          most effective way to prevent instability episodes and recurrence.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 p-5 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <ShieldCheck size={20} className="text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

  

      {/* ── WHAT TO EXPECT ── */}
      <Section bg="white">
        <SectionBadge label="04 — What to Expect" />
        <SectionTitle title="What to Expect" />
        <p className="text-gray-700 leading-relaxed max-w-2xl mb-4">
          Assessment includes instability provocation tests, apprehension and relocation testing,
          and rotator cuff and scapular strength assessment.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          With the right physiotherapy programme, most patients return to full activity with
          complete confidence in their shoulder.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Shoulder instability has several possible presentations and
            the right treatment depends on your individual assessment. If you are experiencing
            shoulder symptoms, please book a consultation with our physiotherapy team for an
            accurate diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Does Your Shoulder Feel Unstable or Give Way?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised instability assessment and start your recovery — no surgery, no
          injections.
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

const SectionBadge = ({ label }) => (
  <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">{label}</p>
);

const SectionTitle = ({ title }) => (
  <div className="mb-8">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">{title}</h2>
    <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-full" />
  </div>
);

export default ShoulderInstability;
