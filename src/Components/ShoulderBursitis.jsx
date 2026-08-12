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
import bursitisimage from "../assets/shoulder-bursitis.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Shoulder Bursitis blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Deep, aching pain in the outer shoulder",
  "A painful arc of movement between 60 and 120 degrees",
  "Pain significantly worse with overhead activities",
  "Night pain and swelling",
  "In acute calcific bursitis — sudden, intense pain with near-complete loss of movement",
];

const PREVENTION = [
  { title: "Rotator Cuff Strengthening", desc: "Preventing the superior humeral head migration that compresses the bursa." },
  { title: "Scapular Stabilisation", desc: "Correct upward rotation opens the subacromial space." },
  { title: "Postural Correction", desc: "Forward head posture narrows the subacromial space at rest." },
  { title: "Posterior Capsule Flexibility", desc: "Reducing superior humeral head migration during elevation." },
  { title: "Load Management", desc: "Avoiding sudden increases in overhead training volume." },
  { title: "Technique Correction", desc: "Reducing compressive force on the subacromial contents." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)", desc: "Applied to the rotator cuff, posterior capsule, and pectoral region — reducing compressive forces on the subacromial space." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the upper trapezius, pectoralis minor, and posterior rotator cuff." },
  { title: "Shoulder Joint Mobilisation", desc: "Inferior glenohumeral glides and posterior capsule mobilisation." },
  { title: "Dry Needling", desc: "Reduces pain and muscle tension — particularly valuable for the often significant pain of subacromial bursitis." },
  { title: "Cupping Therapy", desc: "Improves circulation and releases soft tissue tightness contributing to subacromial compression." },
];

const EXERCISES = [
  "Acute phase: pendulum exercises and isometric rotator cuff activation",
  "External rotation and scaption strengthening",
  "Serratus anterior and lower trapezius strengthening",
  "Posterior capsule stretching",
  "Progressive overhead loading and functional integration",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const ShoulderBursitis = () => {
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
                Shoulder Bursitis
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
              src={bursitisimage}
              alt="Shoulder bursitis illustration"
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
            <SectionTitle title="What Is Shoulder Bursitis?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Shoulder Bursitis is inflammation of the subacromial bursa — a small fluid-filled
              sac that cushions and reduces friction between the rotator cuff and the acromion.
              When inflamed, the bursa swells and fills with excess fluid, further compressing
              the already narrow subacromial space.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Bursitis rarely occurs in isolation — it is closely associated with rotator cuff
              tendinopathy and shoulder impingement, and is best understood as part of the
              broader subacromial pain syndrome.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Common causes include repetitive overhead activity, acute trauma, rotator cuff
              weakness, and systemic inflammatory conditions. Calcific bursitis — caused by
              calcium deposits — can produce sudden, extremely severe pain episodes.
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
          From a physiotherapy perspective, preserving subacromial space and reducing compressive
          load is the most effective way to prevent bursitis flare-ups and recurrence.
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
          Assessment includes impingement testing, bursal palpation, and rotator cuff strength
          assessment.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Most patients experience significant improvement within 4–8 weeks.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Shoulder bursitis has several possible presentations and
            the right treatment depends on your individual assessment. If you are experiencing
            shoulder symptoms, please book a consultation with our physiotherapy team for an
            accurate diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Shoulder Pain That Worsens With Overhead Activity?
        </h2>
        <p className="text-gray-700 mb-10">
          Book your assessment at Zeromedixine today — no surgery, no injections.
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

export default ShoulderBursitis;
