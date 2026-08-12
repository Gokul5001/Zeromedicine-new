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
import sciaticaimage from "../assets/sciatica.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Sciatica blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Radiating pain from lower back through buttock and down one leg",
  "Numbness, tingling, or pins-and-needles in the leg or foot",
  "Muscle weakness in the affected leg",
  "Sharp, electric shock-like pain aggravated by sitting, coughing, or sneezing",
  "Difficulty standing up or changing positions",
];

const PREVENTION = [
  { title: "Correct Posture",         desc: "Avoid prolonged slouching or sustained forward bending of the lumbar spine while sitting, standing, and lifting." },
  { title: "Core Strengthening",      desc: "Train the transverse abdominis and multifidus to protect the lower spine and reduce nerve compression risk." },
  { title: "Hip & Piriformis Stretching", desc: "Regular stretching reduces tension that can compress or irritate the sciatic nerve pathway." },
  { title: "Break Prolonged Sitting", desc: "Take movement breaks every 30–45 minutes. Sustained seated compression is a major contributor to sciatic irritation." },
  { title: "Ergonomic Seating",       desc: "Use proper lumbar support, especially for desk-based work." },
  { title: "Safe Lifting Mechanics",  desc: "Bend at hips and knees, keep load close to your body, and never twist under load." },
  { title: "Healthy Weight",          desc: "Reduces compressive load on intervertebral discs and lumbar nerve roots." },
  { title: "Stay Active",             desc: "Regular low-impact exercise (walking, swimming, cycling) keeps spinal structures healthy and well-nourished." },
];

const TREATMENTS = [
  { title: "Neural Mobilisation & Nerve Gliding",  desc: "Sciatic nerve flossing and slider exercises to restore nerve mobility and reduce neural adhesions contributing to radiating pain." },
  { title: "Myofascial Release (MFR)",              desc: "Deep tissue release of the piriformis, gluteal muscles, and thoracolumbar fascia to decompress tension around the sciatic nerve." },
  { title: "Dry Needling / Trigger Point Needling", desc: "Fine needles placed into hyperirritable trigger points within the piriformis and gluteal muscles to release tightness rapidly." },
  { title: "Cupping Therapy",                       desc: "Decompressive cupping along the lumbar and gluteal region to improve blood flow and relieve deep tissue congestion." },
  { title: "Lumbar Traction",                       desc: "Gentle decompression of intervertebral discs and widening of the neural foramen to directly relieve pressure on the sciatic nerve root." },
  { title: "Electrotherapy (TENS / IFT)",           desc: "Modulates pain signals, reduces inflammation, and promotes tissue healing in the acute and subacute phases." },
  { title: "Core Stabilisation & Strengthening",    desc: "Progressive rehabilitation targeting multifidus, transverse abdominis, and the gluteal complex to prevent recurrence." },
  { title: "Stretching Programme",                  desc: "Guided stretches for the piriformis, hamstrings, and hip external rotators to relieve neural tension long-term." },
  { title: "Postural & Ergonomic Correction",       desc: "Retraining of sitting, standing, and lifting habits along with workstation guidance to remove recurrence triggers." },
  { title: "Manual Therapy & Spinal Mobilisation",  desc: "Skilled joint mobilisation of restricted lumbar segments to restore movement and normalise loading on the affected nerve root." },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const Sciatica = () => {
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
          Back Pain Conditions
        </button>
       
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Back Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Understanding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Sciatica
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
                onClick={() => navigate("/pain-relief/back-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Back Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
  >
  <img
    src={sciaticaimage}
    alt="Sciatica pain illustration"
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
            <SectionTitle title="What is Sciatica?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Sciatica refers to pain that travels along the path of the sciatic nerve — the longest
              nerve in the body — which runs from the lower back through the hips and buttocks and
              down each leg. The pain typically affects only one side of the body and can range from
              a mild ache to a sharp, burning sensation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              It is most commonly caused by a herniated disc, bone spur on the spine, or spinal canal
              narrowing (stenosis) compressing part of the nerve. Other contributors include piriformis
              muscle tightness, poor posture, prolonged sitting, and lumbar degenerative changes.
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
        <SectionTitle title="How to Prevent Sciatica" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          From a physiotherapy perspective, most cases of sciatica are preventable with consistent
          habits that protect the lumbar spine and keep the surrounding musculature strong and mobile.
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

      {/* ── TREATMENT ── */}
      {/* <Section bg="gradient">
        <SectionBadge label="03 — Treatment" />
        <SectionTitle title="How We Treat Sciatica at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Our physiotherapy approach is comprehensive — we address the root cause, relieve the nerve
          irritation, and rebuild the strength and mechanics that prevent recurrence.
          Treatment is always tailored to your specific presentation.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {TREATMENTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section> */}

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for general patient
            education. Sciatica has several possible causes and the right treatment depends on your individual
            assessment. If you are experiencing sciatic symptoms, please book a consultation with our
            physiotherapy team for an accurate diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Relieve Your Sciatic Pain?
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

export default Sciatica;
