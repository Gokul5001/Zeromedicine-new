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
import ucsimage from "../assets/upper-cross-syndrome.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Upper Cross Syndrome blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Chronic neck pain and stiffness at the base of the skull and mid-cervical spine",
  "Upper shoulder tension and tenderness",
  "Tension headaches",
  "Interscapular pain between the shoulder blades",
  "Shoulder pain and reduced mobility",
  "Jaw pain or TMJ dysfunction",
  "Thoracic stiffness and fatigue",
];

const PREVENTION = [
  { title: "Postural Awareness",        desc: "Recognising early warning signs allows corrective action before the pattern becomes entrenched." },
  { title: "Workstation Ergonomics",    desc: "Monitor at eye level, chair correctly set up, keyboard within comfortable reach." },
  { title: "Regular Movement Breaks",   desc: "Interrupting prolonged sitting prevents sustained postural loading." },
  { title: "Strengthening Weak Muscles", desc: "Proactively targeting the deep neck flexors, lower trapezius, rhomboids, and serratus anterior." },
  { title: "Stretching Tight Muscles",  desc: "Regularly lengthening the pectorals, upper trapezius, and levator scapulae." },
  { title: "Mindful Device Use",        desc: "Raising devices to eye level prevents the primary driver of UCS in younger populations." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Releases deep fascial restrictions throughout the anterior chest, cervical spine, upper trapezius, and thoracolumbar fascia." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the upper trapezius, levator scapulae, pectoralis major and minor, sternocleidomastoid, and suboccipital muscles." },
  { title: "Cervical & Thoracic Joint Mobilisation", desc: "Restores normal movement in the stiff cervical and thoracic spine — particularly thoracic extension." },
  { title: "Dry Needling",              desc: "Rapidly deactivates the dense, chronic trigger points in the tight muscles of UCS." },
  { title: "Cupping Therapy",           desc: "Applied to the upper trapezius, posterior cervical spine, and interscapular region." },
  { title: "Postural Taping",           desc: "Kinesiology tape applied to the scapular and cervical regions for continuous postural feedback." },
];

const EXERCISES = [
  "Phase 1 — Release & Mobility: upper trapezius and levator scapulae stretching, pectoral doorway stretching, thoracic extension over foam roller",
  "Phase 2 — Activation & Retraining: deep neck flexor activation, scapular retraction and depression, serratus anterior activation",
  "Phase 3 — Strengthening & Integration: progressive lower trapezius strengthening (Y, T, W exercises), row variations, postural endurance training",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const UpperCrossSyndrome = () => {
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
          Neck Pain Conditions
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Neck Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Understanding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Upper Cross Syndrome
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
                onClick={() => navigate("/pain-relief/neck-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Neck Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            <img
              src={ucsimage}
              alt="Upper cross syndrome illustration"
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
            <SectionTitle title="What is Upper Cross Syndrome?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Upper Cross Syndrome (UCS) is a well-recognised pattern of muscle imbalance in the
              neck, shoulders, and upper back that develops from prolonged poor posture —
              particularly sustained sitting, forward head posture, and rounded shoulders.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The term was coined by Czech neurologist Dr. Vladimir Janda, who identified a
              predictable pattern of alternating tight and weak muscles in the upper body, forming
              a cross shape when mapped out. Tight muscles include the upper trapezius, levator
              scapulae, sternocleidomastoid, suboccipital muscles, and pectoralis major and minor.
              Weak muscles include the deep cervical flexors, lower trapezius, rhomboids, and
              serratus anterior.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This imbalance creates a characteristic postural presentation — forward head posture,
              elevated and rounded shoulders, increased cervical lordosis, and thoracic kyphosis.
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
          From a physiotherapy perspective, recognising the early warning signs of UCS allows
          corrective action before the imbalance pattern becomes entrenched.
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
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Assessment includes a Janda-based muscle function evaluation, cervical and thoracic
          range of motion testing, postural analysis, and lifestyle review. Treatment is typically
          delivered across 6–10 sessions, with measurable improvements in posture, pain, and
          movement at each stage.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Upper Cross Syndrome has several possible presentations and
            the right treatment depends on your individual assessment. If you are experiencing
            neck, shoulder, or upper back symptoms, please book a consultation with our
            physiotherapy team for an accurate diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Is Your Posture Working Against You?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a comprehensive postural assessment and start your recovery — no surgery, no
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

export default UpperCrossSyndrome;
