import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  AlertCircle,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Disc_Herniation from "../assets/Disc_Herniation.webp";
/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const DISC_FACTS = [
  { label: "Most Common Levels", value: "L4–L5 & L5–S1", sub: "Most loaded & mobile lumbar segments" },
  { label: "Resolution Rate",    value: "Up to 90%",      sub: "Cases resolve without surgery" },
  { label: "Common Causes",      value: "Lifting & Sitting", sub: "Poor mechanics & prolonged flexion" },
];

const SYMPTOMS = [
  "Sharp, shooting or burning lower back pain, often radiating into the buttock and leg (radiculopathy)",
  "Numbness, tingling, or pins and needles in the leg, calf, or foot",
  "Muscle weakness in the leg or foot — difficulty walking on tiptoes or heels",
  "Symptoms worsened by sitting, bending forward, coughing, or sneezing",
  "Localised deep lower back pain and muscle spasm",
  "In severe cases, loss of bladder or bowel control (seek emergency care immediately)",
];

const PREVENTION = [
  { title: "Master Your Lifting Technique",        desc: "Always bend at the hips and knees (hip hinge pattern), keep the load close to your body, and never twist your spine under load." },
  { title: "Build a Strong, Functional Core",      desc: "The deep stabilising muscles (transverse abdominis, multifidus) act as an internal corset for the lumbar spine, reducing disc stress during loading and movement." },
  { title: "Break Up Prolonged Sitting",           desc: "Sustained lumbar flexion in sitting increases disc pressure significantly. Stand, walk, and move every 30–45 minutes. Consider a sit-stand desk." },
  { title: "Maintain a Healthy Body Weight",       desc: "Excess weight increases disc loading and accelerates degenerative changes that predispose to herniation." },
  { title: "Stay Well Hydrated",                   desc: "Intervertebral discs depend on hydration for their height, resilience, and shock-absorbing capacity. Dehydrated discs herniate more easily." },
  { title: "Stretch Regularly",                    desc: "Tight hamstrings and hip flexors increase lumbar disc loading. Regular stretching of the posterior chain maintains disc health and spinal mobility." },
  { title: "Correct Poor Posture Early",           desc: "Habitual slouching in flexion is one of the most common contributors to premature disc wear. Physiotherapy-guided postural correction makes a lasting difference." },
  { title: "Progressively Load in Training",       desc: "Sudden spikes in physical activity without progressive preparation are a major risk factor. Build loading gradually and consistently." },
];

const TREATMENTS = [
  { title: "McKenzie Method (MDT)",               desc: "A directional preference approach using repeated lumbar extension movements to centralise and reduce radiating symptoms — one of the most effective evidence-based techniques for disc herniation." },
  { title: "Manual Therapy & Spinal Mobilisation",desc: "Joint mobilisation at affected lumbar levels to restore segmental mobility, reduce pain and muscle guarding, and improve the disc healing environment." },
  { title: "Lumbar Traction",                     desc: "Mechanical or manual traction to decompress the herniated disc segment, widen the neural foramen, and relieve nerve root pressure and radiating leg pain." },
  { title: "Dry Needling",                        desc: "Applied to paraspinal, gluteal, and piriformis muscles to release associated myofascial trigger points and secondary muscle spasm contributing to pain and movement restriction." },
  { title: "Myofascial Release (MFR)",            desc: "Addresses thoracolumbar fascial tightness, paraspinal guarding, and piriformis tension — common secondary contributors to pain and movement limitation following disc herniation." },
  { title: "Neural Mobilisation",                 desc: "Sciatic and lumbar nerve gliding exercises to restore neural tissue mobility, reduce neural adhesions, and decrease radiating leg pain and nerve tension." },
  { title: "Electrotherapy (TENS / IFT)",         desc: "Effective pain management in the acute and subacute phases — reduces pain perception, muscle spasm, and nerve irritability without medication dependency." },
  { title: "Cupping Therapy",                     desc: "Decompressive cupping to the lumbar and gluteal region to reduce chronic myofascial tension, improve blood flow, and support the body's natural healing response." },
  { title: "Progressive Core Stabilisation",      desc: "A graded programme rebuilding deep spinal stabiliser function — beginning with gentle activation once acute pain settles, progressing to functional strength training over weeks." },
  { title: "Postural & Body Mechanics Training",  desc: "Retraining sitting, standing, sleeping, and lifting habits to eliminate the recurring mechanical stresses that caused the herniation — essential for long-term recovery." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const DiscHerniation = () => {
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
              Disc{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Herniation
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Understanding what a slipped disc really means, what causes it, and how
              physiotherapy gets you back to full function — without relying on surgery.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/back-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Back Conditions
              </button>
            </div>
          </motion.div>

          {/* Stat cards */}
          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
>
  <img
    src={Disc_Herniation}
    alt="Disc Herniation illustration"
    className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
  />
</motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Disc Herniation?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Between every two vertebrae in your spine sits an intervertebral disc — a tough,
              shock-absorbing structure that allows movement and cushions compressive forces.
              Each disc has two parts: a tough outer ring called the <strong>annulus fibrosus</strong> and
              a soft, gel-like centre called the <strong>nucleus pulposus</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              A disc herniation occurs when the nucleus pulposus pushes through a tear or weakness
              in the annulus fibrosus. This displaced disc material can press on nearby spinal nerves
              or the spinal cord, producing pain, neurological symptoms, or both. It is commonly —
              though inaccurately — referred to as a "slipped disc."
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
              <p className="text-sm text-blue-800 font-medium leading-relaxed">
                Our approach is directional and evidence-based. We identify which movements
                centralise your symptoms — reducing radiating leg pain back toward the spine —
                and build treatment around that principle. This dramatically accelerates recovery.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">Symptoms</h3>
            <ul className="space-y-4">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-start gap-3 ${i === SYMPTOMS.length - 1 ? "p-3 bg-red-50 rounded-xl border border-red-100" : ""}`}
                >
                  {i === SYMPTOMS.length - 1
                    ? <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    : <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  }
                  <span className={`text-sm leading-relaxed ${i === SYMPTOMS.length - 1 ? "text-red-700 font-medium" : "text-gray-700"}`}>
                    {s}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Disc Herniation" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Most disc herniations are preventable. Your intervertebral discs are living structures
          that respond to how you load, move, and care for your spine every day.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 p-5 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
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
        <SectionTitle title="How We Treat Disc Herniation at Zeromedixine" />
        <p className="text-gray-600 mb-4 max-w-2xl">
          The majority of lumbar disc herniations respond excellently to physiotherapy — studies
          show that up to 90% of cases resolve without surgery with appropriate conservative
          management. Our programme targets pain relief first, then nerve recovery, and finally
          full strength and prevention of recurrence.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {TREATMENTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section> */}

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Emergency note */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-4">
            <AlertTriangle size={22} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 leading-relaxed">
              <strong>Emergency:</strong> If you are experiencing any loss of bladder or bowel
              control, seek emergency care immediately — this may indicate cauda equina syndrome,
              a medical emergency.
            </p>
          </div>
          {/* General note */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
            <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Important:</strong> Disc herniation varies widely
              in severity and type. If you are experiencing radiating leg pain or significant
              weakness, please seek assessment promptly. Our physiotherapy team at Zeromedixine
              will provide a thorough clinical evaluation and a personalised, evidence-based
              treatment plan.
            </p>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          90% Recover Without Surgery.
        </h2>
        <p className="text-gray-700 mb-10">
          Start your evidence-based recovery programme today — no injections, no waiting lists.
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

export default DiscHerniation;
