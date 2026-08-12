import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import itBandImage from "../assets/it-band-syndrome.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the IT Band Syndrome blog)
───────────────────────────────────────────── */

const HERO_STATS = [
  { icon: "🏃", strong: "#1 Lateral Knee Pain", label: "In distance runners" },
  { icon: "📏", strong: "The ITB",              label: "Longest fascial band in the body" },
  { icon: "🔧", strong: "Fixable",              label: "With targeted rehab & gait work" },
];

const ITB_PATH = [
  { icon: "🍑", label: "TFL & Glutes",            sub: "at the hip" },
  { icon: "🔵", label: "ITB",                      sub: "outer thigh" },
  { icon: "⚡", label: "Lateral Femoral Condyle",  sub: "impingement zone" },
  { icon: "🦴", label: "Gerdy's Tubercle",         sub: "lateral tibia" },
];

const SPORTS = [
  { icon: "🏃", name: "Distance Running", sub: "Most common — especially downhill running" },
  { icon: "🚴", name: "Cycling",           sub: "Saddle height and cleat position key factors" },
  { icon: "🥾", name: "Hiking / Trekking", sub: "Prolonged hill descent especially provocative" },
  { icon: "🏊", name: "Triathlon",         sub: "Combined run-bike overload a major trigger" },
  { icon: "⛷️", name: "Skiing",            sub: "Sustained lateral knee loading" },
  { icon: "🏋️", name: "Weighted Squats",  sub: "Valgus loading increases ITB tension" },
];

const SYMPTOMS = [
  "Sharp, burning pain on the outer (lateral) side of the knee — usually very well localised",
  "Pain that begins predictably after a set distance into a run — the pain at 20 minutes pattern",
  "Pain immediately worsened by downhill running, stairs, and lateral movements",
  "Tenderness directly over the lateral femoral condyle — painful on direct palpation",
  "Tightness or aching along the outer thigh, from the hip to the knee",
  "Pain that forces a stop to running — yet resolves quickly with rest, only to return at the same distance next run",
  "In chronic cases: pain with walking, stairs, and even at rest",
  "No significant swelling, locking, or joint-line tenderness — distinguishing ITBS from intra-articular pathology",
];

const PREVENTION = [
  {
    title: "Progress Running Mileage Gradually",
    desc: "The 10% weekly mileage increase rule is the minimum. Sudden jumps in training volume are the most consistent precipitating factor for ITBS — the ITB and its associated structures need time to adapt.",
  },
  {
    title: "Strengthen Hip Abductors and Gluteals",
    desc: "Strong gluteus medius and maximus reduce hip drop (Trendelenburg pattern) during running, directly reducing the tension transmitted through the ITB at the lateral knee. This is the most evidence-based prevention strategy.",
  },
  {
    title: "Include TFL and Hip Flexor Stretching",
    desc: "Regularly stretching the tensor fascia latae and hip flexors reduces the resting tension in the ITB and lowers the compressive force at the lateral femoral condyle during activity.",
  },
  {
    title: "Correct Running Biomechanics Proactively",
    desc: "A crossover gait pattern (where the foot lands medial to the body's midline) dramatically increases ITB tension. A running gait analysis before ITBS develops identifies and corrects this pattern early.",
  },
  {
    title: "Avoid Sudden Changes in Training Surface",
    desc: "Transitioning abruptly from flat to hilly terrain, or from soft to hard surfaces, alters the knee flexion angle at foot strike and increases ITB impingement forces significantly.",
  },
  {
    title: "Ensure Adequate Recovery Between Long Runs",
    desc: "The ITB complex requires sufficient time between high-mileage sessions to dissipate the compressive stress accumulated during running. Back-to-back long run days are a common precipitant.",
  },
  {
    title: "Check Cycling Saddle Height and Cleat Alignment",
    desc: "For cyclists, a saddle that is too low increases knee flexion angle during the pedal stroke, raising ITBS risk significantly. Annual bike fitting assessments are a worthwhile investment.",
  },
  {
    title: "Address Leg Length Discrepancy or Foot Pronation",
    desc: "Structural or functional lower limb asymmetries alter the mechanics of the entire kinetic chain and create asymmetric ITB loading. Physiotherapy assessment identifies and addresses these factors.",
  },
];

const HANDS_ON_TREATMENTS = [
  {
    title: "ITB & TFL Myofascial Release (MFR)",
    desc: "Direct manual soft tissue release and instrument-assisted soft tissue mobilisation (IASTM) targeting the TFL, proximal ITB, and lateral hip musculature — the primary drivers of ITB tension and lateral knee impingement.",
  },
  {
    title: "Cupping Therapy",
    desc: "Decompressive cupping applied along the ITB tract and lateral thigh — lifts and separates fascial layers, improves local circulation, and provides effective relief of chronic lateral thigh tightness far superior to compression-based techniques.",
  },
  {
    title: "Dry Needling",
    desc: "Targeted trigger point needling into the TFL, tensor fascia latae, and lateral hip muscles — highly effective for releasing the active trigger points that maintain ITB tension and reproduce the lateral knee pain pattern.",
  },
  {
    title: "Lateral Knee Joint Mobilisation",
    desc: "Tibiofemoral lateral compartment mobilisation to address any secondary joint stiffness — restores normal lateral joint mechanics and reduces the tissue reactivity at the impingement zone.",
  },
  {
    title: "Electrotherapy (TENS / IFT)",
    desc: "For pain relief and reduction of lateral knee soft tissue reactivity in the acute phase — enables earlier and more comfortable participation in the active rehabilitation programme.",
  },
  {
    title: "Foam Rolling Protocol",
    desc: "Structured lateral hip and TFL foam rolling — targeting the muscular origins of ITB tension rather than the band itself. We teach patients the correct technique and protocol for home use between sessions.",
  },
];

const ACTIVE_TREATMENTS = [
  {
    title: "Hip Abductor & Glute Strengthening",
    desc: "Progressive gluteus medius, minimus, and maximus strengthening — the cornerstone of ITBS rehabilitation. Strong hip muscles reduce hip drop and ITB tension during every stride of running.",
  },
  {
    title: "TFL & Hip Flexor Stretching",
    desc: "Structured daily stretching programme for the TFL, hip flexors, and lateral thigh — maintaining the tissue length gains from hands-on treatment and reducing resting ITB tension between runs.",
  },
  {
    title: "Proprioception & Single-Leg Training",
    desc: "Single-leg squat, lateral step-down, and hip hike exercises to develop the neuromuscular control needed to maintain pelvic stability and reduce ITB tension dynamically during running.",
  },
  {
    title: "Graded Return-to-Running Programme",
    desc: "A structured interval running programme with objective symptom monitoring — progressive mileage increases with built-in recovery days, guided by the Noble test and NRS pain tracking.",
  },
];

const RTR_TIMELINE = [
  { week: "Week 1–2", text: "Rest from running. MFR, cupping, dry needling. Hip strengthening begins." },
  { week: "Week 3–4", text: "Walk-run intervals. Gait retraining. Pain ≤3/10 during activity." },
  { week: "Week 5–6", text: "Progressive run intervals. Mileage build. Strength and mobility maintained." },
  { week: "Week 7–8+", text: "Return to full training. Maintenance programme. Ongoing load monitoring." },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const ITBandSyndrome = () => {
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
          Knee Pain Conditions
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Knee Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-2">
              IT Band{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Syndrome
              </span>
            </h1>

            <p className="text-sm text-gray-400 italic mb-4">
              Iliotibial Band Syndrome (ITBS) — the leading cause of lateral knee pain in distance runners
            </p>

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              A sharp, burning pain on the outer knee that strikes at the same point in every run —
              frustrating, stubborn, and completely fixable with the right physiotherapy approach.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {HERO_STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <span className="text-xl">{s.icon}</span>
                  <div className="text-xs leading-tight">
                    <strong className="block text-blue-700">{s.strong}</strong>
                    <span className="text-gray-500">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/knee-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Knee Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            <img
              src={itBandImage}
              alt="IT band syndrome illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is IT Band Syndrome?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Iliotibial band syndrome (ITBS) is one of the most common overuse injuries in distance
              runners and cyclists, caused by{" "}
              <strong>repetitive friction or compression of the iliotibial band</strong> (ITB) against
              the lateral femoral condyle as it passes over the outer knee during running. It is the
              leading cause of lateral knee pain in endurance athletes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              The <strong>iliotibial band</strong> is a thick, dense fascial band — the longest in
              the body — running from the tensor fascia latae (TFL) and gluteal muscles at the hip,
              all the way down the outer thigh to attach at Gerdy's tubercle on the lateral tibia.
              It is not a muscle, so it cannot be "stretched" in the traditional sense — a key
              insight that changes how we treat it.
            </p>

            {/* ITB pathway */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">The ITB Pathway — Hip to Shin</p>
              <div className="flex flex-wrap items-center gap-2">
                {ITB_PATH.map((node, i) => (
                  <React.Fragment key={i}>
                    <div className="bg-white border border-blue-200 rounded-xl px-3 py-2 text-center shrink-0">
                      <span className="text-lg block">{node.icon}</span>
                      <p className="text-xs font-semibold text-gray-800 leading-tight">{node.label}</p>
                      <p className="text-xs text-gray-400">({node.sub})</p>
                    </div>
                    {i < ITB_PATH.length - 1 && <span className="text-blue-300 font-bold text-lg shrink-0">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Impingement zone */}
            <div className="bg-gray-950 border border-blue-900/40 rounded-xl p-4 flex gap-3 items-start mb-5">
              <span className="text-xl shrink-0">⚡</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-blue-300">The Impingement Zone — 30 Degrees of Knee Flexion:</strong>{" "}
                The ITB impinges most forcefully on the lateral femoral condyle at approximately
                30° of knee flexion — exactly the angle at which the foot strikes the ground during
                running. This is why ITBS pain is so characteristically reproducible — it strikes
                at the same point in every stride, and at the same distance into every run.
              </p>
            </div>

            {/* Sports chips */}
            <p className="font-semibold text-gray-800 mb-3 text-sm">Sports and activities most commonly affected by ITBS:</p>
            <div className="grid grid-cols-3 gap-2">
              {SPORTS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center"
                >
                  <span className="text-xl block mb-1">{s.icon}</span>
                  <strong className="block text-xs text-blue-700 mb-0.5">{s.name}</strong>
                  <p className="text-xs text-gray-500 leading-snug">{s.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Noble test */}
            <div className="bg-amber-50 border border-amber-300 border-l-4 border-l-amber-600 rounded-r-xl p-4 text-sm text-gray-800 leading-relaxed mt-5">
              <strong className="text-amber-700">🔍 Clinical Test — Noble Compression Test:</strong>{" "}
              A positive Noble test is the key clinical indicator of ITBS. With the patient lying
              supine and the knee at 30°, firm pressure applied directly over the lateral femoral
              condyle reproduces the patient's familiar lateral knee pain. This test has high
              sensitivity for ITBS and is a reliable assessment tool used by our physiotherapists.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Symptoms</h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 pb-3 border-b border-blue-50 last:border-0"
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
        <SectionTitle title="How to Prevent IT Band Syndrome" />
        <p className="text-gray-600 mb-8 max-w-2xl">
          ITBS is an <strong>entirely preventable condition</strong> in most cases. It develops from
          the combination of training load errors, biomechanical inefficiency, and hip muscle weakness
          — all of which are modifiable with the right preparation.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start"
            >
              <div className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-0.5">{item.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> IT band syndrome responds
            excellently to physiotherapy when managed correctly — but pushing through pain without
            treatment consistently leads to prolonged recovery. If you are experiencing lateral
            knee pain during running, book a consultation with our team at Zeromedixine for a
            running assessment, accurate diagnosis, and a structured return-to-running programme.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Back Running Pain-Free?</h2>
        <p className="text-gray-700 mb-10">
          Get a personalised ITBS assessment, running gait analysis, and a structured
          return-to-running programme from our physiotherapy team.
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

/* ── Shared sub-components ── */

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

export default ITBandSyndrome;