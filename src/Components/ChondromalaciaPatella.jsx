import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import chondromalaciaImage from "../assets/chondromalacia-patella.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Chondromalacia Patella blog)
───────────────────────────────────────────── */

const HERO_STATS = [
  { icon: "🦴", strong: "Cartilage Condition",    label: "Undersurface of patella" },
  { icon: "👩", strong: "Young Active Adults",     label: "Especially females" },
  { icon: "⚠️", strong: "Progressive",            label: "Worsens without treatment" },
];

const CHONDRO_POINTS = [
  "Actual softening and fissuring of cartilage",
  "Visible on arthroscopy or MRI",
  "Progressive if unmanaged",
  "May eventually lead to knee OA",
  "Requires cartilage-protective approach",
];

const PFPS_POINTS = [
  "Pain from abnormal patellar loading",
  "Normal cartilage on imaging",
  "Often resolves with load management",
  "More common presentation in runners",
  "Purely a biomechanical problem",
];

const GRADES = [
  {
    num: "I",
    title: "Softening",
    desc: "Cartilage surface softened — no visible fissures. Pain present but cartilage intact.",
  },
  {
    num: "II",
    title: "Fissuring",
    desc: "Superficial fissures and fragmentation. Area less than 1.5 cm. Physiotherapy highly effective.",
  },
  {
    num: "III",
    title: "Deeper Defect",
    desc: "Deep fissuring reaching subchondral bone. Area greater than 1.5 cm. Active rehab essential.",
  },
  {
    num: "IV",
    title: "Full Thickness",
    desc: "Complete cartilage erosion exposing bone. Surgical evaluation may be required.",
  },
];

const SYMPTOMS = [
  "Diffuse anterior knee pain — around and behind the kneecap, often worse on the medial or lateral patellar facets",
  "Pain worsened by stairs (especially descent), squatting, running, and prolonged sitting — the classic movie sign",
  "A grinding, grating, or rough sensation felt under the kneecap during bending and straightening",
  "Audible crepitus — a coarse grinding sound distinct from the soft clicking of normal knees",
  "Swelling and occasional warmth around the patella after activity",
  "Pain that builds with sustained activity and takes increasing time to settle",
  "Quadriceps weakness and a sense of the knee being unreliable on stairs or uneven ground",
  "Gradual progression if not addressed — symptoms worsen over months without appropriate management",
];

const PREVENTION = [
  {
    title: "Correct Patellar Maltracking Early",
    desc: "The moment anterior knee pain develops in a young active person, seek physiotherapy assessment. Early VMO strengthening and taping can correct tracking before cartilage damage occurs.",
  },
  {
    title: "Strengthen the VMO and Quadriceps",
    desc: "The vastus medialis oblique (VMO) is the primary medial stabiliser of the patella. Targeted VMO strengthening is the most important intervention to prevent abnormal lateral patellar tracking and cartilage overload.",
  },
  {
    title: "Strengthen Hip Abductors and External Rotators",
    desc: "Weak hip muscles allow the femur to internally rotate and adduct under load, increasing patellofemoral joint stress. Strong glutes protect the patella from above in the kinetic chain.",
  },
  {
    title: "Avoid Sudden Increases in Training Load",
    desc: "Rapid spikes in running mileage, squatting volume, or stair climbing frequency exceed the cartilage's adaptive capacity and precipitate early chondromalacic change in at-risk individuals.",
  },
  {
    title: "Correct Foot Pronation with Orthotics",
    desc: "Excessive foot pronation causes internal tibial rotation, increasing lateral patellar stress. Appropriate footwear and orthotics address this lower chain contributor to patellofemoral cartilage overload.",
  },
  {
    title: "Reduce Sustained Deep Knee Flexion",
    desc: "Prolonged squatting, kneeling, or sitting with deep knee bend generates the highest patellofemoral contact pressures. Avoiding or modifying these positions protects cartilage integrity in those with early symptoms.",
  },
  {
    title: "Maintain Healthy Body Weight",
    desc: "Patellofemoral joint loading scales directly with body weight. Weight management is a simple and highly effective protective measure for patellar cartilage health over the long term.",
  },
];

const HANDS_ON_TREATMENTS = [
  {
    title: "Patellar Mobilisation & Manual Therapy",
    desc: "Precise medial patellar gliding and tilting techniques to correct lateral patellar compression — directly reducing the focal cartilage stress that drives chondromalacic change at the lateral patellar facet.",
  },
  {
    title: "MFR & Lateral Retinaculum Release",
    desc: "Manual release of the lateral retinaculum, ITB, and vastus lateralis — the tight lateral structures that pull the patella into abnormal compression against the lateral trochlear groove.",
  },
  {
    title: "Dry Needling",
    desc: "Targeted trigger point needling into the VMO, quadriceps, and ITB — restores the muscular balance around the patella, reduces pain, and improves the neuromuscular control of patellar tracking.",
  },
  {
    title: "Cupping Therapy",
    desc: "Applied to the quadriceps and lateral thigh — reduces chronic lateral tissue tightness, improves local circulation, and supports the soft tissue environment around the patellofemoral joint.",
  },
  {
    title: "McConnell Taping & Bracing",
    desc: "McConnell medial patellar glide taping immediately reduces pain and corrects patellar tracking during rehabilitation — allowing earlier and more effective exercise. Patellofemoral braces provide ongoing support during return to sport.",
  },
  {
    title: "Electrotherapy (TENS / IFT / Ultrasound)",
    desc: "TENS and IFT for pain relief during symptomatic phases; therapeutic ultrasound to support the biological tissue environment and reduce peri-patellar swelling.",
  },
];

const ACTIVE_TREATMENTS = [
  {
    title: "VMO Activation & Quad Strengthening",
    desc: "Specific VMO biofeedback exercises, short arc quads, and terminal knee extension — progressing to closed kinetic chain loading (mini squats, leg press, step-ups) calibrated to avoid provocative ranges of knee flexion.",
  },
  {
    title: "Hip Abductor & Glute Strengthening",
    desc: "Gluteus medius and maximus strengthening to control femoral rotation and knee valgus — addressing the proximal biomechanical drivers of patellar maltracking and cartilage overload.",
  },
  {
    title: "Biomechanical & Gait Correction",
    desc: "Foot orthotic assessment and prescription; squatting and stair technique retraining; gait analysis for runners — correcting the movement faults that perpetuate cartilage stress.",
  },
  {
    title: "Low-Impact Conditioning",
    desc: "Swimming, cycling (with appropriate saddle height), and hydrotherapy to maintain cardiovascular fitness and lower limb strength while protecting the patellofemoral cartilage from high-impact loading.",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const ChondromalaciaPatella = () => {
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
              Chondromalacia{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Patella
              </span>
            </h1>

  

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              Cartilage breakdown on the underside of the kneecap — a condition that causes persistent
              anterior knee pain and can worsen progressively if left untreated. The right
              physiotherapy approach makes all the difference.
            </p>

            {/* Hero stats */}
            <div className="flex flex-wrap gap-3 mb-8">
              {HERO_STATS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm"
                >
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
              src={chondromalaciaImage}
              alt="Chondromalacia patella knee illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Chondromalacia Patella?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chondromalacia patella refers to the{" "}
              <strong>softening, fissuring, and degeneration of the articular cartilage on the
              undersurface of the patella</strong> — the smooth cartilage that allows the kneecap
              to glide effortlessly within the trochlear groove of the femur. When this cartilage
              breaks down, friction and pain develop with movement.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              It is most common in <strong>young active individuals</strong> — particularly females —
              and is caused by repetitive mechanical overload, abnormal patellar tracking, direct
              trauma, or a combination of all three. Unlike patellofemoral pain syndrome (PFPS),
              which is a functional pain condition without structural change, chondromalacia involves{" "}
              <strong>actual cartilage pathology</strong> — making early intervention essential to
              prevent progression.
            </p>

            {/* Chondromalacia vs PFPS */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-5"
              >
                <span className="inline-block px-2.5 py-0.5 mb-3 text-xs font-extrabold tracking-widest uppercase bg-blue-600 text-white rounded">
                  Chondromalacia
                </span>
                <p className="font-bold text-gray-900 mb-3 text-sm">Structural Cartilage Change</p>
                <ul className="space-y-1.5">
                  {CHONDRO_POINTS.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed border-b border-blue-100 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-blue-500 shrink-0">•</span>{pt}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="bg-green-50 border border-green-200 rounded-xl p-5"
              >
                <span className="inline-block px-2.5 py-0.5 mb-3 text-xs font-extrabold tracking-widest uppercase bg-green-600 text-white rounded">
                  PFPS (Runner's Knee)
                </span>
                <p className="font-bold text-gray-900 mb-3 text-sm">Functional Pain — No Structural Change</p>
                <ul className="space-y-1.5">
                  {PFPS_POINTS.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed border-b border-green-100 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-green-500 shrink-0">•</span>{pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Cartilage loading callout */}
            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-r-xl p-4 text-sm text-gray-800 leading-relaxed">
              <strong className="text-amber-700">⚖️ Why Patellar Cartilage Breaks Down:</strong> The
              patellofemoral joint experiences forces of up to <strong>7–8 times body weight</strong>{" "}
              during deep squatting and stair climbing. When the patella tracks abnormally — due to
              VMO weakness, tight lateral structures, foot pronation, or hip weakness — these forces
              concentrate on a small area of cartilage rather than being distributed evenly. Over
              time, this focal overload leads to cartilage softening, fissuring, and the progressive
              changes of chondromalacia.
            </div>
          </div>

          <div>
            {/* Outerbridge grading */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Chondromalacia Patella — Outerbridge Grading System:
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {GRADES.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center"
                >
                  <span className="block text-2xl font-semibold text-blue-600 leading-none mb-1.5">
                    {g.num}
                  </span>
                  <strong className="block text-xs text-blue-700 uppercase tracking-wide mb-1">
                    {g.title}
                  </strong>
                  <p className="text-xs text-gray-600 leading-snug">{g.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Symptoms */}
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
        <SectionTitle title="How to Prevent Chondromalacia Patella" />
        <p className="text-gray-600 mb-8 max-w-2xl">
          Because chondromalacia involves <strong>structural cartilage change</strong>, prevention
          is far more effective than attempting to reverse established damage. The key is correcting
          the biomechanical drivers of abnormal patellar loading before they cause cartilage
          breakdown.
        </p>

        <ul className="divide-y divide-gray-100">
          {PREVENTION.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 py-5 items-start"
            >
              <div className="w-8 h-8 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-0.5">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Section>

  

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> Chondromalacia patella is a
            progressive condition — early treatment produces significantly better outcomes than
            waiting until symptoms are severe. If you are experiencing grinding, anterior knee pain
            with stairs or squatting, book a consultation with our physiotherapy team at
            Zeromedixine for an accurate assessment and a cartilage-protective rehabilitation
            programme.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Protect Your Knee Cartilage?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised patellofemoral assessment and start a cartilage-protective
          rehabilitation programme tailored to your grade and goals.
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

export default ChondromalaciaPatella;