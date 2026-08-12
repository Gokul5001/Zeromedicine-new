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
import postureimage from "../assets/postural-neck-pain.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Postural Neck Pain blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Dull, aching pain across the back of the neck and upper shoulders",
  "Stiffness after prolonged sitting or screen use",
  "Tension headaches from the base of the skull",
  "Tightness and tenderness in the upper trapezius and levator scapulae",
  "A feeling of heaviness or fatigue in the neck and shoulders by end of day",
  "Rounded shoulders and a protruding chin — visible postural changes accompanying the pain",
];

const PREVENTION = [
  { title: "Postural Awareness",        desc: "Most people are unaware of how they hold their head and neck until pain develops." },
  { title: "Workstation Ergonomics",    desc: "Monitor at eye level, chair correctly adjusted, keyboard and mouse within comfortable reach." },
  { title: "Smartphone Habits",         desc: "Raising the phone to eye level rather than dropping the head to look down." },
  { title: "Regular Movement Breaks",   desc: "Every 30–45 minutes to allow fatigued muscles to recover." },
  { title: "Strengthening Weak Muscles", desc: "Weak deep neck flexors and scapular stabilisers are as much a cause of postural pain as poor positioning." },
  { title: "Pillow & Sleep Position",   desc: "Hours in a poor neck position overnight undoes the benefits of good daytime posture." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Releases deep fascial restrictions throughout the cervical, upper thoracic, and pectoral regions — restoring tissue mobility and reducing the muscular tension driving postural pain." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the upper trapezius, levator scapulae, sternocleidomastoid, scalenes, and pectoralis minor — the consistently overactive and shortened muscles in postural neck pain." },
  { title: "Cervical & Thoracic Joint Mobilisation", desc: "Restores normal segmental movement in the stiff cervical and upper thoracic joints — essential for achieving lasting postural change." },
  { title: "Dry Needling",              desc: "Rapidly deactivates the trigger points in the upper trapezius, cervical spine, and interscapular region — providing powerful decompression of chronically compressed soft tissues." },
  { title: "Cupping Therapy",           desc: "Applied to the upper trapezius, cervical spine, and interscapular region — providing powerful decompression of chronically compressed soft tissues." },
  { title: "Postural Taping",           desc: "Kinesiology tape applied to provide tactile feedback about head and shoulder position — reinforcing correct posture between sessions." },
];

const EXERCISES = [
  "Deep neck flexor activation — chin tucks to reactivate cervical stabilisers",
  "Upper trapezius and levator scapulae stretching",
  "Pectoral stretching — releasing the tight chest muscles pulling shoulders forward",
  "Scapular retraction and depression exercises",
  "Thoracic extension mobility over foam roller",
  "Neck and shoulder postural endurance training",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const PosturalNeckPain = () => {
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
                Postural Neck Pain
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
              src={postureimage}
              alt="Postural neck pain illustration"
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
            <SectionTitle title="What is Postural Neck Pain?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Postural Neck Pain is neck pain that develops as a direct result of sustained or
              repetitive poor posture — particularly the way we hold our head, neck, and shoulders
              during sitting, screen use, driving, and smartphone activity.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              It is one of the fastest growing musculoskeletal complaints in modern society —
              driven by increasingly sedentary, screen-based lifestyles. Unlike neck pain caused by
              trauma or degeneration, postural neck pain is almost entirely lifestyle-driven —
              making it both highly preventable and highly treatable.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The most common postural culprit is forward head posture — where the head drifts
              forward of its ideal alignment over the shoulders. For every inch the head moves
              forward, the effective load on the cervical spine nearly doubles.
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
        <SectionTitle title="How Can Physiotherapy Prevent It?" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          From a physiotherapy perspective, postural neck pain is one of the most preventable
          conditions — most people are simply unaware of how they hold their head and neck until
          pain develops.
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
          Assessment includes a thorough postural analysis, movement evaluation, and muscle
          function testing — identifying exactly which postural faults and muscle imbalances are
          driving your pain. Most patients experience rapid improvement with consistent treatment
          and the right daily habits in place.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Neck pain has several possible causes and the right
            treatment depends on your individual assessment. If you are experiencing neck
            symptoms, please book a consultation with our physiotherapy team for an accurate
            diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Is Your Posture Causing Your Neck Pain?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised assessment and start your recovery — no surgery, no injections.
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

export default PosturalNeckPain;
