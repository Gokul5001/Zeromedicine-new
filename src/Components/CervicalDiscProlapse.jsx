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
import discimage from "../assets/cervical-disc-prolapse.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Cervical Disc Prolapse blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Sharp or burning neck pain — often one-sided",
  "Pain radiating down the shoulder, arm, or into the fingers",
  "Numbness, tingling, or pins and needles in the hand",
  "Weakness in the arm or grip",
  "Pain that worsens with certain neck movements",
];

const PREVENTION = [
  { title: "Good Cervical Posture",     desc: "Forward head position doubles the load on cervical discs — maintain neutral alignment." },
  { title: "Avoid Sustained Flexion",   desc: "Prolonged looking down stresses the posterior disc wall." },
  { title: "Strengthen Neck & Upper Back", desc: "Strong muscles reduce the load placed on discs." },
  { title: "Safe Lifting Mechanics",    desc: "Avoid heavy lifting with a flexed or rotated neck." },
  { title: "Address Early Warning Signs", desc: "Neck stiffness or mild arm tingling should be assessed early." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Reduces muscle guarding around the disc and improves tissue mobility throughout the neck and upper back." },
  { title: "Soft Tissue Release (STR)", desc: "Releases the scalenes, upper trapezius, and cervical extensors that go into protective spasm around a prolapsed disc." },
  { title: "Neural Mobilisation",       desc: "Gently mobilises the affected nerve root — reducing neural tension and improving arm symptoms." },
  { title: "Cervical Traction",         desc: "Decompresses the cervical spine — creating space for the nerve root and providing significant pain relief." },
  { title: "Dry Needling",              desc: "Breaks the pain-spasm cycle in deep cervical and periscapular muscles — reducing referred arm pain." },
  { title: "Cupping Therapy",           desc: "Decompresses soft tissues along the cervical spine — improving blood flow and reducing muscular tension." },
  { title: "Pain Management",           desc: "TENS therapy, therapeutic ultrasound, or heat/ice during the acute phase to manage pain and facilitate rehabilitation." },
];

const EXERCISES = [
  "Deep neck flexor activation",
  "Cervical retraction (chin tucks) — to centralise disc symptoms",
  "Scapular stabilisation and progressive upper limb loading",
  "Thoracic mobility to reduce compensatory cervical loading",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const CervicalDiscProlapse = () => {
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
                Cervical Disc Prolapse
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
              src={discimage}
              alt="Cervical disc prolapse illustration"
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
            <SectionTitle title="What is Cervical Disc Prolapse?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              A Cervical Disc Prolapse — also known as a slipped or herniated disc — occurs when the
              soft inner gel of an intervertebral disc pushes through its tough outer ring and
              presses on nearby nerves or the spinal cord.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each disc acts as a cushion between the vertebrae. When the outer ring weakens — due
              to injury, poor posture, or degeneration — the inner gel can bulge outward,
              compressing a nerve root and causing pain that travels into the arm.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The most commonly affected levels are C5-C6 and C6-C7.
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
          From a physiotherapy perspective, most cervical disc problems can be prevented or caught
          early with consistent habits that reduce disc loading and protect the cervical spine.
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
          We begin with a thorough neurological and orthopaedic assessment — identifying the level
          of disc involvement and degree of nerve compromise. Treatment is progressive — starting
          with pain relief and nerve decompression, advancing to strength and long-term prevention.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Most patients with cervical disc prolapse recover fully without surgery.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for general
            patient education. Cervical disc prolapse has several possible presentations and the
            right treatment depends on your individual assessment. If you are experiencing neck or
            arm symptoms, please book a consultation with our physiotherapy team for an accurate
            diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Relieve Your Neck and Arm Pain?
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

export default CervicalDiscProlapse;
