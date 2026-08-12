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
import golferselbowimage from "../assets/GolfersElbow.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Golfer's Elbow blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Pain and tenderness directly over the medial epicondyle — the bony inner prominence of the elbow",
  "Pain radiating down the inner forearm toward the wrist — following the flexor–pronator muscle belly",
  "Weakness of grip — particularly when the elbow is extended and the forearm pronated",
  "Pain reproduced by resisted wrist flexion and forearm pronation",
  "Stiffness at the medial elbow in the morning — easing with gentle activity",
  "Pain with activities: golf swing, throwing, pulling, shaking hands firmly, carrying bags",
  "In ulnar nerve involvement: numbness or tingling in the ring and little fingers, particularly at night",
  "In chronic cases: persistent aching at rest with significant functional limitation",
];

const PREVENTION = [
  { title: "Progressive Forearm Strengthening", desc: "A well-conditioned flexor–pronator tendon has significantly greater tolerance for repetitive load. This is the most effective long-term prevention strategy." },
  { title: "Correct Swing & Throwing Mechanics", desc: "Poor mechanics that create excessive medial elbow valgus stress during a swing, throw, or serve are a primary precipitant. Coaching-guided correction removes this risk." },
  { title: "Manage Repetitive Pronation & Flexion", desc: "For tradespeople and manual workers, structuring tasks with rest breaks and alternating between arms reduces cumulative medial elbow tendon stress." },
  { title: "Warm Up Thoroughly",            desc: "A progressive warm-up with wrist rotations, forearm stretches, and light resistive exercises prepares the tendon for higher sport and work demands." },
  { title: "Use Ergonomic Grip Tools",       desc: "Wider, softer-grip tools require less gripping force, reducing the peak medial elbow tendon load during manual tasks." },
  { title: "Strengthen Shoulder & Scapula",  desc: "Proximal kinetic chain weakness increases the demand on the forearm flexors as primary compensators during overhead and throwing activities." },
  { title: "Seek Early Physiotherapy",       desc: "The window between first symptoms and chronic tendinopathy is typically 4–6 weeks. Early intervention produces rapid resolution; delayed treatment leads to a protracted recovery." },
];

const TREATMENTS = [
  { title: "Manual Therapy & Medial Elbow Mobilisation", desc: "Medial epicondyle mobilisation and Mulligan-style MWM provide immediate pain relief and restore normal elbow and wrist mechanics." },
  { title: "MFR & Soft Tissue Release",      desc: "Deep tissue release of the flexor–pronator mass and medial forearm fascia reduces resting tension and compressive load at the medial epicondyle." },
  { title: "Dry Needling / Trigger Point Needling", desc: "Precise needling into flexor–pronator trigger points rapidly reduces pain and restores grip strength and forearm activation." },
  { title: "Cupping Therapy",                desc: "Decompressive cupping over the medial forearm flexor compartment improves blood flow and releases fascial adhesions around the medial epicondyle." },
  { title: "Neural Mobilisation (Ulnar Nerve)", desc: "Ulnar nerve gliding and slider exercises restore neural mobility through the medial elbow where concurrent cubital tunnel involvement is identified." },
  { title: "Shockwave Therapy (ESWT)",       desc: "Strong evidence for chronic medial epicondylalgia — acoustic shockwaves stimulate collagen synthesis in degenerative tendon tissue." },
  { title: "Isometric Wrist Flexion & Pronation", desc: "Sustained isometric holds provide pain relief and restore neuromuscular drive without reactive tendon loading in the acute stage." },
  { title: "Eccentric Wrist Flexion Programme", desc: "Progressive eccentric loading drives collagen remodelling and is the cornerstone of medial epicondylalgia rehabilitation." },
  { title: "Scapular & Shoulder Strengthening", desc: "Lower trapezius, serratus anterior, and rotator cuff strengthening addresses kinetic chain deficits that perpetuate medial elbow overloading." },
  { title: "Sport & Work-Specific Rehabilitation", desc: "Graded reintroduction of throwing, golf swing, and occupational tasks with biomechanical correction to ensure return without recurrence." },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const GolfersElbow = () => {
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
          Elbow Pain Conditions
        </button>

      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Elbow Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Understanding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Golfer's Elbow
              </span>
            </h1>

            <p className="text-sm text-gray-500 italic mb-4">
              Clinically known as Medial Epicondylalgia — Tendinopathy of the Common Flexor–Pronator Origin
            </p>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              The inner elbow's answer to tennis elbow — equally common, frequently
              misunderstood, and highly responsive to targeted physiotherapy. Most
              sufferers have never swung a golf club.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/elbow-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Elbow Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
  >
  <img
    src={golferselbowimage}
    alt="Golfer's elbow pain illustration"
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
            <SectionTitle title="What is Golfer's Elbow?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Golfer's elbow — clinically termed Medial Epicondylalgia — is a painful
              tendinopathy affecting the common flexor–pronator tendon origin at the medial
              epicondyle of the humerus, the bony prominence on the inner side of the elbow.
              The primary muscles involved are the flexor carpi radialis, pronator teres, and
              flexor digitorum superficialis.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Like its lateral counterpart, it's an overuse tendinopathy driven by repetitive
              wrist flexion and forearm pronation that cumulatively exceeds the tendon's
              capacity to repair. It's equally common in non-golfers — affecting
              tradespeople, climbers, racket players, and anyone performing repetitive
              gripping or wrist-loading activities.
            </p>
            <div className="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-500 rounded-r-xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-blue-700">Ulnar nerve involvement — an important consideration:</strong>{" "}
                The ulnar nerve passes through the cubital tunnel directly behind the medial
                epicondyle. In many cases of golfer's elbow the nerve becomes concurrently
                irritated, producing numbness, tingling, or weakness in the ring and little
                fingers. Assessment always checks for this, as it significantly influences treatment.
              </p>
            </div>
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

        {/* Golfer's vs Tennis comparison */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-green-600 text-white px-2.5 py-1 rounded mb-3">
              Golfer's Elbow
            </span>
            <p className="font-semibold text-gray-900 mb-2 text-sm">Medial Epicondylalgia</p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>• Inner (medial) side of the elbow</li>
              <li>• Flexor–pronator tendon affected</li>
              <li>• Pain with wrist flexion & forearm pronation</li>
              <li>• Common in golfers, climbers, throwers</li>
              <li>• Ulnar nerve often concurrently irritated</li>
              <li>• Less common than tennis elbow (~1:4 ratio)</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-2.5 py-1 rounded mb-3">
              Tennis Elbow
            </span>
            <p className="font-semibold text-gray-900 mb-2 text-sm">Lateral Epicondylalgia</p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>• Outer (lateral) side of the elbow</li>
              <li>• Extensor tendon (ECRB) affected</li>
              <li>• Pain with wrist extension & gripping</li>
              <li>• Common in racket players, tradespeople</li>
              <li>• Radial nerve occasionally involved</li>
              <li>• More common than golfer's elbow</li>
            </ul>
          </div>
        </div>

        {/* Who gets it */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">Who Commonly Develops It</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🏌️", label: "Golfers", desc: "Wrist flexion at impact" },
              { icon: "🧗", label: "Climbers", desc: "Sustained grip & finger flexion" },
              { icon: "⚾", label: "Throwers", desc: "Medial valgus stress at release" },
              { icon: "🔧", label: "Tradespeople", desc: "Repetitive pronation & gripping" },
              { icon: "🏋️", label: "Weightlifters", desc: "Barbell & dumbbell curling" },
              { icon: "🎾", label: "Racket Athletes", desc: "Topspin serve & forehand" },
            ].map((a, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <span className="text-2xl block mb-1">{a.icon}</span>
                <p className="font-semibold text-blue-700 text-sm mb-0.5">{a.label}</p>
                <p className="text-xs text-gray-600">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Golfer's Elbow" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Like all tendinopathies, golfer's elbow is fundamentally a load tolerance problem —
          the flexor–pronator tendon is asked to do more than its current capacity allows.
          Prevention focuses on building that capacity while managing cumulative forearm demand.
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
        <SectionTitle title="How We Treat Golfer's Elbow at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Our treatment programme for medial epicondylalgia mirrors the precision we apply to
          lateral epicondylalgia — combining hands-on techniques to rapidly reduce pain with a
          structured tendon loading programme and, where required, neural mobilisation for
          concurrent ulnar nerve involvement.
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
            <strong className="text-gray-900">Important:</strong> Golfer's elbow — especially
            with associated ring and little finger symptoms — requires a thorough assessment
            to determine the extent of ulnar nerve involvement and guide the correct treatment
            approach. If you are experiencing inner elbow pain with gripping, throwing, or
            forearm activities, please book a consultation with our physiotherapy team for an
            accurate diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Relieve Your Elbow Pain?
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
    <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full" />
  </div>
);

export default GolfersElbow;