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
import headacheimage from "../assets/cervicogenic-headache.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Cervicogenic Headache blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "One-sided head pain — starting at the base of the skull",
  "Pain radiating toward the forehead, eye, or temple",
  "Headache triggered by neck movement or sustained postures",
  "Reduced cervical range of motion",
  "Neck stiffness accompanying the headache",
  "Occasional nausea or light sensitivity",
];

const PREVENTION = [
  { title: "Upper Cervical Posture Correction", desc: "Forward head posture compresses the C1–C3 joints, the primary source of cervicogenic headache." },
  { title: "Workstation & Sleep Ergonomics",     desc: "Correct monitor height and appropriate pillow support reduce sustained upper cervical stress." },
  { title: "Deep Neck Flexor Strengthening",     desc: "Weakness of these muscles is consistently found in cervicogenic headache sufferers." },
  { title: "Thoracic Mobility",                  desc: "Stiffness in the mid-back forces the upper cervical spine to compensate, increasing headache-generating joint stress." },
  { title: "Stress & Tension Management",        desc: "Chronic stress creates persistent upper cervical muscle tension, triggering headache episodes." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Releases deep fascial restrictions in the suboccipital region, upper cervical muscles, and cervicothoracic junction — reducing the compression that drives headache generation." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the suboccipital muscles, upper trapezius, sternocleidomastoid, and scalenes — universally overactive in cervicogenic headache and a direct source of referred head pain." },
  { title: "Upper Cervical Joint Mobilisation", desc: "Precise, gentle mobilisation of the C1–C3 joints — one of the most evidence-supported treatments for cervicogenic headache." },
  { title: "Dry Needling",              desc: "Highly effective for the suboccipital, upper trapezius, and sternocleidomastoid trigger points — releasing these points can produce immediate headache relief." },
  { title: "Cupping Therapy",           desc: "Applied to the upper cervical and cervicothoracic region — decompresses soft tissues, improves circulation, and releases chronic muscular tension at the base of the skull." },
  { title: "Cervical Traction",         desc: "Applied in slight flexion targeting the upper cervical segments — decompresses the C1–C3 joints and reduces mechanical irritation driving referred head pain." },
];

const EXERCISES = [
  "Deep neck flexor training — the most evidence-based exercise for cervicogenic headache",
  "Cervical range of motion exercises",
  "Scapular and thoracic strengthening",
  "Postural re-education for sitting, standing, and screen use",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const CervicogenicHeadache = () => {
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
                Cervicogenic Headache
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
              src={headacheimage}
              alt="Cervicogenic headache illustration"
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
            <SectionTitle title="What is Cervicogenic Headache?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              A Cervicogenic Headache is a headache that originates from the cervical spine —
              specifically the joints, muscles, and nerves of the upper neck — but is felt as pain
              in the head. The term literally means generated from the neck.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This happens because the nerves of the upper cervical spine (C1, C2, and C3) share a
              pathway with the trigeminal nerve — which supplies sensation to the face and head.
              When structures in the upper neck are irritated, pain is referred upward into the
              head.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cervicogenic headaches are frequently misdiagnosed as migraines or tension headaches.
              A key distinguishing feature is that they are consistently triggered or worsened by
              neck movement or sustained neck postures.
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
          From a physiotherapy perspective, most cervicogenic headaches can be prevented with
          consistent habits that reduce upper cervical joint stress and muscle tension.
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
          Assessment includes a detailed headache history, upper cervical joint examination,
          postural analysis, and deep neck flexor strength testing — confirming the cervicogenic
          origin of your headaches before treatment begins.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Many patients notice a significant reduction in headache frequency and intensity within
          the first few sessions.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for general
            patient education. Headaches have several possible causes and the right treatment
            depends on your individual assessment. If you are experiencing recurring headaches,
            please book a consultation with our physiotherapy team for an accurate diagnosis and
            personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Tired of Headaches Controlling Your Life?
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

export default CervicogenicHeadache;
