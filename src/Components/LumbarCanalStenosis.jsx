import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  PersonStanding,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lumbar_Canal_Stenosis from "../assets/Lumbar_Canal_Stenosis.webp";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const HERO_BADGES = [
  { emoji: "🎯", label: "Most Common in 50+",  sub: "Age-related spinal change" },
  { emoji: "🚶", label: "Key Symptom",          sub: "Leg pain with walking" },
  { emoji: "✅", label: "Highly Treatable",     sub: "With targeted physio" },
];

const CANAL_STRUCTURES = [
  "Bulging or degenerate intervertebral discs",
  "Enlarged or arthritic facet joints",
  "Thickened ligamentum flavum",
  "Bone spurs (osteophytes)",
  "Spondylolisthesis (vertebral slippage)",
  "Synovial cysts at facet joints",
];

const CLAUDICATION_TABLE = [
  { feature: "Trigger",        neurogenic: "Walking or standing",          vascular: "Walking (effort-based)" },
  { feature: "Relief",         neurogenic: "Sitting or leaning forward",   vascular: "Simply stopping walking" },
  { feature: "Walking uphill", neurogenic: "Often easier (more flexed)",   vascular: "Equally or more difficult" },
  { feature: "Cycling",        neurogenic: "Usually comfortable",          vascular: "May also cause symptoms" },
  { feature: "Pulses",         neurogenic: "Normal peripheral pulses",     vascular: "Reduced or absent pulses" },
];

const SYMPTOMS = [
  "Bilateral leg pain, heaviness, weakness, or cramping — particularly in the thighs and calves",
  "Reduced walking tolerance — symptoms come on after a predictable distance",
  "Lower back pain and stiffness, often worse with standing and extension",
  "Numbness or tingling in both legs or feet",
  "Relief in a seated, crouched, or bent-forward position",
  "In advanced cases, bladder or bowel dysfunction (requires urgent medical review)",
];

const PREVENTION = [
  { title: "Maintain a Healthy Body Weight",             desc: "Excess weight increases compressive loads on lumbar discs and facet joints, directly accelerating the degenerative changes that narrow the spinal canal." },
  { title: "Exercise with Low-Impact Activity",          desc: "Walking, swimming, cycling (in a slightly flexed position), and aquatic exercise maintain spinal mobility, disc nutrition, and muscle strength without excessive joint loading." },
  { title: "Strengthen Lumbar Stabilisers & Core",       desc: "Strong deep stabilising muscles (multifidus, transverse abdominis) reduce compressive and shear loads on degenerating spinal segments." },
  { title: "Favour Flexion-Based Postures",              desc: "Lumbar extension narrows the posterior canal further; learning to move with a slight forward lean reduces neural compression during provocative activities." },
  { title: "Avoid Sustained Lumbar Extension",           desc: "Prolonged standing in excessive lordosis, backbend yoga poses, or extension-loading exercises increase posterior canal compression. Modify these activities early." },
  { title: "Address Disc Disease & Spondylosis Early",   desc: "Seeking physiotherapy for stiffness and early-stage lower back pain prevents the progression of degenerative change that eventually narrows the canal." },
  { title: "Stay Mobile",                                desc: "Deconditioning and inactivity accelerate muscle weakness and spinal stiffness, both of which worsen stenotic symptoms. Consistent, appropriate activity is the best long-term strategy." },
];

const TREATMENTS = [
  { title: "Flexion-Based Exercise Programme",       desc: "Lumbar flexion exercises — cycling, seated knee-to-chest, partial squats, and flexion stretches — open the posterior canal and provide reliable symptom relief and improved walking tolerance." },
  { title: "Lumbar Traction Therapy",                desc: "Lumbar traction in a flexed position to decompress the spinal canal, relieve nerve root pressure, reduce leg symptoms, and improve the distance you can walk pain-free." },
  { title: "Manual Therapy & Soft Tissue Release",   desc: "Gentle lumbar and thoracic mobilisation in flexion-biased positions to reduce stiffness, improve mobility, and make exercise and walking more comfortable." },
  { title: "Aquatic Physiotherapy (Hydrotherapy)",   desc: "Warm-water exercise with the spine in slight flexion — significantly reduces gravitational load on the stenotic canal, allowing strengthening and conditioning not yet possible on land." },
  { title: "Myofascial Release (MFR)",               desc: "Release of paraspinal muscles, thoracolumbar fascia, and hip flexors — reducing the muscular tension that forces the lumbar spine into extension and worsens canal narrowing." },
  { title: "Cupping Therapy",                        desc: "Applied to the lumbar and gluteal region to release chronic myofascial tightness, improve local circulation, and reduce the paraspinal tension that compresses the posterior canal." },
  { title: "Dry Needling",                           desc: "Targeted needling of chronically tight paraspinal, gluteal, and hip flexor muscles — reduces guarding and pain, and improves the body's ability to adopt neutral and flexed lumbar positions." },
  { title: "Core & Gluteal Strengthening",           desc: "Progressive strengthening of the deep stabiliser system and gluteal muscles to provide dynamic spinal support, reduce canal stress during activity, and improve walking endurance." },
  { title: "Walking Programme with Pacing",          desc: "A structured interval walking programme with built-in rest positions — progressively building your walking tolerance with objective monitoring of symptoms and distance." },
  { title: "Postural & Activity Education",          desc: "Teaching you to favour flexed postures during aggravating activities, use trolleys or walking frames appropriately, and modify daily tasks to reduce canal compression and maintain independence." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const LumbarCanalStenosis = () => {
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
              Lumbar Canal{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Stenosis
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Understanding the narrowing of the spinal canal — what causes it, how it affects
              your walking and daily life, and how physiotherapy helps you reclaim your independence.
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

          {/* Badge trio */}
          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
>
  <img
    src={Lumbar_Canal_Stenosis}
    alt="Lumbar Canal Stenosis illustration"
    className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
  />
</motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Lumbar Canal Stenosis?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lumbar canal stenosis is a narrowing of the spinal canal in the lower back — the bony
              tunnel through which the spinal cord and nerve roots travel. As this canal narrows, it
              compresses the neural structures within, causing a characteristic pattern of pain,
              heaviness, and neurological symptoms in the legs.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              It is most commonly caused by the gradual degenerative changes of ageing — including
              disc bulging, facet joint enlargement, osteophyte formation, and thickening of the
              ligamentum flavum — which together reduce the space available for the nerves.
            </p>

            {/* Structures list */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">Structures That Narrow the Canal</h3>
            <ul className="space-y-2 mb-6">
              {CANAL_STRUCTURES.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{s}</span>
                </li>
              ))}
            </ul>

            {/* Hallmark callout */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
              <p className="text-sm text-amber-800 font-medium leading-relaxed">
                <span className="font-bold">Hallmark symptom — Neurogenic Claudication:</span> Aching,
                cramping, heaviness, or weakness in both legs brought on by walking or prolonged
                standing, and relieved by sitting or leaning forward. This is why patients often
                find relief leaning on a shopping trolley — a classic presentation.
              </p>
            </div>
          </div>

          <div>
            {/* Claudication comparison table */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Neurogenic vs Vascular Claudication
            </h3>
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-green-500 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-left font-semibold">Neurogenic</th>
                    <th className="px-4 py-3 text-left font-semibold">Vascular</th>
                  </tr>
                </thead>
                <tbody>
                  {CLAUDICATION_TABLE.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 font-medium text-gray-700">{row.feature}</td>
                      <td className="px-4 py-3 text-gray-600">{row.neurogenic}</td>
                      <td className="px-4 py-3 text-gray-500">{row.vascular}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Additional symptoms */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">Additional Symptoms</h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`flex items-start gap-3 ${i === SYMPTOMS.length - 1 ? "p-3 bg-red-50 rounded-xl border border-red-100" : ""}`}
                >
                  {i === SYMPTOMS.length - 1
                    ? <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    : <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                  }
                  <span className={`text-sm leading-relaxed ${i === SYMPTOMS.length - 1 ? "text-red-700 font-medium" : "text-gray-600"}`}>
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
        <SectionTitle title="How to Prevent Lumbar Canal Stenosis" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          While age-related degenerative change cannot be entirely prevented, the rate of
          progression and severity of symptoms are significantly influenced by lifestyle and
          activity. Early physiotherapy intervention is key.
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
      

      {/* ── RED FLAG + DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Red flag */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-4">
            <AlertTriangle size={22} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 leading-relaxed">
              <strong>Red Flag — Seek Urgent Medical Assessment If:</strong> You experience
              progressive leg weakness, loss of bladder or bowel control, or saddle anaesthesia
              (numbness in the groin area). These may indicate cauda equina syndrome — a medical
              emergency requiring immediate attention.
            </p>
          </div>
          {/* General note */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
            <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Please note:</strong> Lumbar canal stenosis varies
              in severity and its impact on daily life. This page is for general education. If you
              are experiencing reduced walking tolerance, leg heaviness, or the symptoms described
              above, please book a consultation with our physiotherapy team at Zeromedixine for an
              accurate assessment and personalised treatment plan.
            </p>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Walk Further. Live Better.
        </h2>
        <p className="text-gray-700 mb-10">
          Physiotherapy-first care restores walking tolerance and independence — without surgery
          in most cases.
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

export default LumbarCanalStenosis;
