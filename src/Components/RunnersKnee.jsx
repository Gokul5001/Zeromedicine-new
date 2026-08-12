import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import runnersKneeImage from "../assets/runners-knee.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Runner's Knee blog)
───────────────────────────────────────────── */

const HERO_FACTS = [
  { icon: "🏃", strong: "Most Common", label: "Knee complaint in runners" },
  { icon: "👩", strong: "2× More Common", label: "In females than males" },
  { icon: "✅", strong: "Highly Treatable", label: "With targeted physio" },
];

const CAUSE_CHAIN = [
  { icon: "🍑", title: "Weak Hip Abductors & Glutes", desc: "Poor pelvic and femoral control" },
  { icon: "🦵", title: "Increased Knee Valgus",        desc: "Femur internally rotates under load" },
  { icon: "🔴", title: "Patellar Maltracking",         desc: "Patella pulled laterally in the groove" },
  { icon: "⚡", title: "Pain",                          desc: "Increased lateral cartilage stress" },
];

const SYMPTOMS = [
  "Diffuse pain around or behind the kneecap — a dull ache that is hard to pinpoint precisely",
  "Pain worsened by running, cycling, squatting, stairs, and prolonged sitting with bent knees",
  "The \"Movie Sign\" — pain building during sustained knee flexion and easing with movement",
  "A grinding or crunching sensation (crepitus) felt behind the kneecap during knee bending",
  "Pain that comes on after a specific distance into a run — and gradually worsens if running continues",
  "Occasional mild swelling around the kneecap after activity",
  "Quadriceps weakness — the affected leg often feels weaker, particularly on single-leg activities",
];

const PREVENTION = [
  {
    title: "Progress Running Load Gradually",
    desc: "Avoid increasing weekly mileage by more than 10% per week. Sudden spikes in training volume are the single most common trigger for PFPS in runners.",
  },
  {
    title: "Strengthen Hip Abductors & Glutes",
    desc: "Strong gluteus medius and maximus control femoral rotation and reduce dynamic knee valgus during running and landing, directly protecting the patellofemoral joint.",
  },
  {
    title: "Build VMO (Quadriceps) Strength",
    desc: "The vastus medialis oblique pulls the patella medially, counteracting the lateral forces that cause maltracking. Targeted VMO strengthening is a cornerstone of PFPS prevention.",
  },
  {
    title: "Correct Biomechanical Faults",
    desc: "Reducing hip drop (Trendelenburg pattern), crossover gait, and excessive foot pronation through targeted exercise and gait training reduces patellofemoral stress during running.",
  },
  {
    title: "Stretch the ITB & Hip Flexors Regularly",
    desc: "Tight lateral structures increase lateral patellar pull. Regular stretching keeps tissue length balanced and patellofemoral mechanics optimal.",
  },
  {
    title: "Wear Appropriate Running Footwear",
    desc: "Shoes that provide the right support for your foot type reduce excessive pronation and the downstream valgus knee stress that drives patellar maltracking.",
  },
  {
    title: "Avoid Cambered or Uneven Surfaces",
    desc: "Sloped road surfaces create asymmetric loading of the patellofemoral joint and are a common but overlooked trigger for PFPS in road runners.",
  },
  {
    title: "Break Up Prolonged Sitting",
    desc: "Take regular movement breaks to reduce sustained patellofemoral compression. Standing and walking briefly every 40 minutes is highly protective for desk workers.",
  },
];

const REHAB_PHASES = [
  { phase: "Phase 1", text: "Pain relief & load reduction" },
  { phase: "Phase 2", text: "Strength & mechanics correction" },
  { phase: "Phase 3", text: "Return to running & sport" },
];

const HANDS_ON_TREATMENTS = [
  {
    title: "Patellar Mobilisation & Manual Therapy",
    desc: "Hands-on correction of patellar mobility — lateral retinacular release techniques, patellofemoral joint mobilisation, and medial patellar gliding to reduce lateral compression and improve tracking.",
  },
  {
    title: "Myofascial Release (MFR)",
    desc: "Targeted release of the ITB, lateral quadriceps, and lateral retinaculum — the tight structures that pull the patella laterally and create abnormal joint compression patterns.",
  },
  {
    title: "Dry Needling",
    desc: "Trigger point needling into the VMO, rectus femoris, and ITB/TFL — reduces pain, restores muscle activation balance, and improves the patellar tracking mechanics that drive PFPS.",
  },
  {
    title: "Cupping Therapy",
    desc: "Applied to the quadriceps and ITB to reduce chronic lateral tissue tension — decompresses the structures contributing to patellar maltracking and provides effective symptomatic relief.",
  },
  {
    title: "Patellar Taping",
    desc: "McConnell taping to medially correct patellar tracking and immediately reduce pain — allows earlier, more comfortable exercise progression and is a highly effective short-term strategy.",
  },
  {
    title: "Electrotherapy (TENS / IFT)",
    desc: "For pain modulation in the acute phase — reduces patellofemoral pain and enables more comfortable participation in the active rehabilitation programme from the outset.",
  },
];

const ACTIVE_TREATMENTS = [
  {
    title: "VMO Activation & Quad Strengthening",
    desc: "Targeted VMO biofeedback exercises, short arc quads, terminal knee extension, and progressive closed kinetic chain loading — the foundation of PFPS rehabilitation.",
  },
  {
    title: "Hip Abductor & External Rotator Strengthening",
    desc: "Gluteus medius, minimus, and maximus strengthening to control femoral rotation and knee valgus during running, landing, and stairs — addressing the primary biomechanical driver of PFPS.",
  },
  {
    title: "Stretching Programme",
    desc: "Structured flexibility work for the ITB, quadriceps, hip flexors, and calf — restoring tissue length balance around the patellofemoral joint for optimal tracking mechanics.",
  },
  {
    title: "Proprioception & Balance Training",
    desc: "Single-leg balance and neuromuscular control exercises — essential for developing the dynamic joint stability that protects the patellofemoral joint during the unpredictable demands of running.",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const RunnersKnee = () => {
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

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-1">
              Runner's{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Knee
              </span>
            </h1>

            <p className="text-sm italic text-gray-400 mb-4">
              Clinically known as Patellofemoral Pain Syndrome (PFPS)
            </p>

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              The most common knee complaint in active individuals — affecting runners, cyclists,
              and desk workers alike. Here is what is really going on behind your kneecap, and how
              we fix it.
            </p>

            {/* Hero facts */}
            <div className="flex flex-wrap gap-3 mb-8">
              {HERO_FACTS.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm"
                >
                  <span className="text-xl">{f.icon}</span>
                  <div className="text-xs leading-tight">
                    <strong className="block text-blue-700">{f.strong}</strong>
                    <span className="text-gray-500">{f.label}</span>
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
              src={runnersKneeImage}
              alt="Runner's knee illustration"
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
            <SectionTitle title="What is Runner's Knee?" />

            <p className="text-gray-700 leading-relaxed mb-4">
              Runner's knee — formally called <strong>Patellofemoral Pain Syndrome (PFPS)</strong> — is
              characterised by diffuse pain around and behind the kneecap (patella). It is one of the
              most prevalent knee conditions in runners, cyclists, hikers, and active individuals, but is
              also extremely common in people who sit for long periods with bent knees.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              The pain arises from <strong>abnormal loading and tracking of the patella</strong> within the
              trochlear groove of the femur. When the patella does not track centrally — due to muscle
              imbalances, biomechanical faults, or structural factors — the cartilage on its undersurface
              is subjected to excessive and uneven stress, producing pain and irritation.
            </p>

            {/* Pain location panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-5 items-start mb-6">
              <div className="bg-white border border-blue-200 rounded-xl p-4 text-center shrink-0">
                <span className="text-4xl block">🦵</span>
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest mt-2">Pain Zone</p>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">Where the Pain Is</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Pain is typically felt <strong>around the front of the knee</strong> — diffuse and hard to
                  pinpoint precisely. It may be felt behind the kneecap, along the medial or lateral patellar
                  borders, or in the peripatellar region. It is rarely well-localised to a single point,
                  distinguishing it from conditions like patellar tendonitis.
                </p>
              </div>
            </div>

            {/* Movie sign callout */}
            <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-400 rounded-r-xl p-4 text-sm text-gray-800 leading-relaxed">
              <strong className="text-red-600">🎬 The "Movie Sign":</strong> A classic feature of PFPS
              is pain that develops after sitting for a prolonged period with the knees bent — such as
              during a long film, flight, or car journey. Standing up and walking provides relief. This
              occurs because sustained knee flexion increases patellofemoral joint compression. If you
              recognise this, it is a strong indicator of PFPS.
            </div>
          </div>

          <div>
            {/* Cause chain */}
            <div className="mb-8">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
                The Biomechanical Chain Behind Runner's Knee
              </p>
              <div className="flex flex-col gap-2">
                {CAUSE_CHAIN.map((step, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3"
                    >
                      <span className="text-2xl shrink-0">{step.icon}</span>
                      <div>
                        <strong className="block text-blue-800 text-sm">{step.title}</strong>
                        <span className="text-xs text-gray-500">{step.desc}</span>
                      </div>
                    </motion.div>
                    {i < CAUSE_CHAIN.length - 1 && (
                      <div className="flex justify-center">
                        <ArrowRight size={16} className="text-blue-300 rotate-90" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Symptoms</h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
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
        <SectionTitle title="How to Prevent Runner's Knee" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Runner's knee is primarily a condition of <strong>biomechanical overload</strong> — meaning it
          develops when training loads, muscle imbalances, and movement patterns combine to exceed the
          patellofemoral joint's tolerance. All of these factors are modifiable.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 p-5 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
  
      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> Runner's knee responds excellently to
            physiotherapy when addressed early. Continuing to run through significant pain without treatment
            risks cartilage damage and a longer recovery. If you are experiencing knee pain during or after
            running, book a consultation with our physiotherapy team at Zeromedixine for an accurate
            assessment and a structured return-to-running programme.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Run Pain-Free Again?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised patellofemoral assessment and start your structured return-to-running
          programme — no surgery, no injections.
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

export default RunnersKnee;
