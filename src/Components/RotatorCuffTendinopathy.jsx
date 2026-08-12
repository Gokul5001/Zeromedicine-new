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
import rotatorcuffimage from "../assets/rotator-cuff-tendinopathy.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Rotator Cuff Tendinopathy blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Deep, aching pain in the outer shoulder and upper arm",
  "A painful arc of movement between 60 and 120 degrees of abduction",
  "Pain with overhead activities — reaching, lifting, throwing, swimming",
  "Night pain — particularly lying on the affected shoulder",
  "Stiffness and weakness with repetitive shoulder tasks",
];

const PREVENTION = [
  { title: "Progressive Tendon Loading", desc: "Sudden spikes in training volume are the most common trigger for reactive tendinopathy." },
  { title: "Rotator Cuff Strengthening", desc: "Strong muscles share the mechanical demands of shoulder movement." },
  { title: "Scapular Stabilisation", desc: "Poor scapular control narrows the subacromial space and increases compressive load." },
  { title: "Avoid Compressive Loading Positions", desc: "Minimising sustained loading in end-range internal rotation." },
  { title: "Technique Correction", desc: "Poor overhead technique concentrates load on specific tendon regions." },
  { title: "Recovery and Load Management", desc: "Adequate recovery allows the tendon to adapt." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)", desc: "Releases fascial restrictions in the rotator cuff musculature, deltoid, posterior capsule, and pectoral region." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the upper trapezius, infraspinatus, and teres minor." },
  { title: "Shoulder Joint Mobilisation", desc: "Restores normal glenohumeral mechanics — particularly addressing posterior capsule tightness." },
  { title: "Dry Needling", desc: "Reduces pain and muscular dysfunction — improving force generation during rehabilitation." },
  { title: "Cupping Therapy", desc: "Improves local blood flow to the relatively avascular tendon region and releases fascial restrictions." },
  { title: "Posterior Capsule Stretching", desc: "The sleeper stretch and cross-body stretch — addressing a consistent biomechanical finding in tendinopathy." },
];

const EXERCISES = [
  "Phase 1 — Isometric Loading: pain relief and neuromuscular maintenance for an irritable tendon",
  "Phase 2 — Heavy Slow Resistance: external rotation strengthening, supraspinatus loading via scaption, internal rotation strengthening",
  "Phase 3 — Energy Storage & Functional Loading: plyometric shoulder exercises and sport-specific loading",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const RotatorCuffTendinopathy = () => {
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
                Rotator Cuff Tendinopathy
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
              src={rotatorcuffimage}
              alt="Rotator cuff tendinopathy illustration"
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
            <SectionTitle title="What Is Rotator Cuff Tendinopathy?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Rotator Cuff Tendinopathy is pain, reduced function, and reduced exercise tolerance
              of one or more rotator cuff tendons — most commonly the supraspinatus — resulting
              from a failed healing response within the tendon itself.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Modern research shows the dominant process in chronic cases is not inflammation but
              a degenerative change in the tendon's internal structure — disorganisation of
              collagen fibres and failed repair attempts. This means anti-inflammatory treatments
              alone are insufficient.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The supraspinatus tendon passes through a narrow space beneath the acromion called
              the subacromial space. Anything that further narrows this space increases
              compressive load on the tendon.
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
          From a physiotherapy perspective, managing tendon load intelligently is the most
          effective way to prevent reactive tendinopathy and recurrence.
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
          Assessment includes specific tendon loading tests, impingement screening, and scapular
          assessment — allowing us to accurately stage the tendinopathy.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Most patients experience meaningful improvement within 4–6 weeks, with full
          rehabilitation typically completed over 12–16 weeks.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Rotator cuff tendinopathy has several possible
            presentations and the right treatment depends on your individual assessment. If you
            are experiencing shoulder symptoms, please book a consultation with our physiotherapy
            team for an accurate diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Shoulder Pain With Overhead Activities?
        </h2>
        <p className="text-gray-700 mb-10">
          Book your rotator cuff assessment at Zeromedixine today — no surgery, no injections.
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

export default RotatorCuffTendinopathy;
