import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import meniscusTearImage from "../assets/meniscus-tear.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Meniscus Tear blog)
───────────────────────────────────────────── */

const HERO_STATS = [
  { icon: "🏃", strong: "Acute & Degenerative", label: "Two distinct tear types" },
  { icon: "🩺", strong: "Many Respond Well",     label: "To conservative physio" },
  { icon: "🔄", strong: "Full Recovery",         label: "With structured rehab" },
];

const MEDIAL_POINTS = [
  "Inner (medial) side of the knee",
  "More firmly attached — less mobile",
  "3× more commonly torn than lateral",
  "Associated with MCL and ACL injuries",
  "Medial joint line tenderness on assessment",
];

const LATERAL_POINTS = [
  "Outer (lateral) side of the knee",
  "More mobile — slightly more protected",
  "Less commonly torn in isolation",
  "Often associated with ACL tears",
  "Lateral joint line tenderness on assessment",
];

const TEAR_TYPES = [
  {
    icon: "🪣",
    name: "Bucket Handle",
    desc: "Large vertical tear — may cause locking of the knee. Surgical repair often required.",
  },
  {
    icon: "🔀",
    name: "Radial",
    desc: "Perpendicular to the inner edge — disrupts the hoop stress mechanism of the meniscus.",
  },
  {
    icon: "🍂",
    name: "Degenerative",
    desc: "Horizontal cleavage from repetitive wear — most common in adults over 40.",
  },
  {
    icon: "🔄",
    name: "Flap / Parrot Beak",
    desc: "A flap of tissue that can displace and cause catching or locking sensations.",
  },
  {
    icon: "📍",
    name: "Peripheral Longitudinal",
    desc: "Tears the outer red zone — best healing potential; often suitable for repair.",
  },
  {
    icon: "🔢",
    name: "Complex",
    desc: "Multiple tear patterns combined — typically degenerative, seen in older adults.",
  },
];

const VASCULAR_ZONES = [
  {
    dot: "🔴",
    label: "Red Zone (Outer Third)",
    labelColor: "text-red-700",
    desc: "Has a good blood supply — tears here have the best healing potential and are most suitable for surgical repair.",
    bg: "bg-red-50 border-red-200",
  },
  {
    dot: "🟡",
    label: "Red-White Zone (Middle)",
    labelColor: "text-amber-700",
    desc: "Partial blood supply — moderate healing capacity. Treatment decision depends on tear type, size, and patient age.",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    dot: "⚪",
    label: "White Zone (Inner Third)",
    labelColor: "text-gray-500",
    desc: "Avascular — no blood supply. Poor intrinsic healing capacity. Conservative management or partial meniscectomy indicated.",
    bg: "bg-gray-50 border-gray-200",
  },
];

const SYMPTOMS = [
  "Pain localised to the medial or lateral joint line — often the most reliable physical finding",
  "Swelling that develops within 24–48 hours of injury (slower onset than ACL haemarthrosis)",
  "Clicking, catching, or clunking sensations during knee movement",
  "Mechanical locking — inability to fully straighten the knee (bucket handle tear)",
  "Pain with deep squatting, twisting, or rotational movements",
  "Difficulty with stairs, especially going down",
  "A feeling of the knee giving way or being unreliable on uneven ground",
  "In degenerative tears: gradually worsening joint line pain without a specific injury event",
];

const PREVENTION = [
  {
    title: "Maintain Strong Quadriceps & Hamstrings",
    desc: "The primary dynamic protectors of the menisci during loading. Strong, well-balanced thigh muscles reduce the peak forces transmitted through the meniscal tissue during sport and daily activity.",
  },
  {
    title: "Practise Correct Squatting & Landing Mechanics",
    desc: "Deep squatting under heavy load or landing with knees caving inward (valgus) dramatically increases meniscal compressive and shear stress. Proper technique is essential protection.",
  },
  {
    title: "Use Correct Pivoting Technique in Sport",
    desc: "Rotating the whole body rather than twisting the knee in isolation reduces the torsional forces on the menisci. Coaching proper cutting and change-of-direction mechanics is a key prevention strategy.",
  },
  {
    title: "Warm Up Adequately Before Sport",
    desc: "Cold, stiff tissue is more vulnerable to tearing under sudden torsional load. A progressive warm-up routine prepares the meniscal and periarticular tissue for sport demands.",
  },
  {
    title: "Address Prior Knee Swelling or Stiffness Promptly",
    desc: "Altered knee biomechanics following any joint episode increase meniscal stress. Treating previous injuries fully restores the protective movement patterns that keep the menisci safe.",
  },
  {
    title: "Manage Degenerative Risk with Weight Control",
    desc: "In adults over 40, maintaining a healthy weight and replacing high-impact activities with swimming or cycling significantly reduces the cumulative compressive loading that leads to degenerative meniscal tears.",
  },
  {
    title: "Develop Neuromuscular Control & Proprioception",
    desc: "Balance training and agility exercises improve the knee's reactive stability, reducing the risk of the sudden abnormal loading events that tear meniscal tissue in sport.",
  },
];

const CONSERVATIVE_INDICATIONS = [
  "Degenerative horizontal cleavage tears",
  "Small peripheral longitudinal tears",
  "Stable, non-locking partial tears",
  "Older adults with moderate activity goals",
  "First-line management for most tears",
];

const SURGICAL_INDICATIONS = [
  "Bucket handle tears causing locking",
  "Large unstable tears in young active patients",
  "Tears in the vascular red zone suitable for repair",
  "Failed conservative management after 3 months",
  "Combined ACL + meniscal injury",
];

const HANDS_ON_TREATMENTS = [
  {
    title: "Manual Therapy & Joint Mobilisation",
    desc: "Restores knee range of motion, reduces post-injury or post-surgical stiffness, and addresses compensatory tightness in the hip, calf, and surrounding soft tissues.",
  },
  {
    title: "MFR & Soft Tissue Release",
    desc: "Targeted release of the quadriceps, hamstrings, ITB, and gastrocnemius — addresses the secondary myofascial tightness that develops following meniscal injury and compensatory movement patterns.",
  },
  {
    title: "Dry Needling",
    desc: "Applied to VMO, quadriceps, and hamstring trigger points to restore neuromuscular activation, reduce pain, and improve the quality of muscle contraction during rehabilitation exercises.",
  },
  {
    title: "Electrotherapy (Ultrasound / TENS / IFT)",
    desc: "Therapeutic ultrasound to support tissue healing in the outer vascular zone; TENS and IFT for effective pain relief and swelling reduction in the acute and post-surgical phases.",
  },
];

const ACTIVE_TREATMENTS = [
  {
    title: "Progressive Quadriceps & Hamstring Strengthening",
    desc: "Graded programme beginning with VMO activation and SLR, progressing through leg press, step-ups, and split squats — carefully titrated to the meniscal healing timeline and symptom response.",
  },
  {
    title: "Proprioception & Balance Training",
    desc: "Essential for restoring dynamic joint stability and the neural reflexes that protect the menisci during unpredictable loading — single-leg balance, perturbation training, and reactive exercises.",
  },
  {
    title: "Cupping Therapy",
    desc: "Applied to the quadriceps and surrounding musculature to reduce chronic post-injury tissue tightness, promote circulation, and support the functional rehabilitation process.",
  },
  {
    title: "Functional Rehabilitation",
    desc: "Squatting technique correction, stair training, rotational movement reintroduction, and activity-specific loading — progressively returning you to your full pre-injury function and sport.",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const MeniscusTear = () => {
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

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Meniscus{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Tear
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              A common knee injury across all ages — from young athletes to older adults. The right
              management depends on the type of tear, its location, and your goals. Physiotherapy
              plays a central role in recovery.
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
              src={meniscusTearImage}
              alt="Meniscus tear knee illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is a Meniscus Tear?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The menisci are two <strong>C-shaped fibrocartilaginous structures</strong> — one on
              the inner side (medial meniscus) and one on the outer side (lateral meniscus) of the
              knee joint. They sit between the femur and tibia, acting as critical shock absorbers,
              load distributors, joint stabilisers, and enhancers of articular congruency.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              A meniscal tear occurs when these structures are subjected to forces that exceed their
              tensile strength — either through a sudden traumatic mechanism or through gradual
              degenerative breakdown. The medial meniscus is torn approximately{" "}
              <strong>three times more frequently</strong> than the lateral, due to its firmer
              attachment to the joint capsule.
            </p>

            {/* Medial vs Lateral comparison */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-5"
              >
                <span className="inline-block px-2.5 py-0.5 mb-3 text-xs font-extrabold tracking-widest uppercase bg-teal-600 text-white rounded">
                  Medial
                </span>
                <p className="font-bold text-gray-900 mb-3 text-sm">Medial Meniscus</p>
                <ul className="space-y-1.5">
                  {MEDIAL_POINTS.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed border-b border-blue-100 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-teal-500 shrink-0">•</span>{pt}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="bg-purple-50 border border-purple-200 rounded-xl p-5"
              >
                <span className="inline-block px-2.5 py-0.5 mb-3 text-xs font-extrabold tracking-widest uppercase bg-purple-700 text-white rounded">
                  Lateral
                </span>
                <p className="font-bold text-gray-900 mb-3 text-sm">Lateral Meniscus</p>
                <ul className="space-y-1.5">
                  {LATERAL_POINTS.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed border-b border-purple-100 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-purple-500 shrink-0">•</span>{pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Knee locking urgent callout */}
            <div className="bg-orange-50 border border-orange-200 border-l-4 border-l-orange-500 rounded-r-xl p-4 text-sm text-gray-800 leading-relaxed">
              <strong className="text-orange-700">🔒 Knee Locking — When to Act Urgently:</strong> A
              bucket handle meniscal tear can displace into the joint and cause true mechanical locking
              — the knee becomes stuck in a flexed position and cannot be fully straightened. This is
              different from stiffness; the knee physically blocks extension. If you experience true
              locking, seek prompt assessment as it usually requires surgical intervention.
            </div>
          </div>

          <div>
            {/* Tear types grid */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Common types of meniscal tears:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {TEAR_TYPES.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center"
                >
                  <span className="text-2xl block mb-1.5">{t.icon}</span>
                  <strong className="block text-xs text-teal-700 uppercase tracking-wide mb-1">{t.name}</strong>
                  <p className="text-xs text-gray-600 leading-snug">{t.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Vascular zones */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
              <p className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-4">
                Meniscal Healing — The Three Vascular Zones
              </p>
              <div className="grid grid-cols-1 gap-3">
                {VASCULAR_ZONES.map((z, i) => (
                  <div key={i} className={`border rounded-xl p-3 text-sm ${z.bg}`}>
                    <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${z.labelColor}`}>
                      {z.dot} {z.label}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-xs">{z.desc}</p>
                  </div>
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
        <SectionTitle title="How to Prevent Meniscal Tears" />
        <p className="text-gray-600 mb-8 max-w-2xl">
          Traumatic meniscal tears in young athletes and degenerative tears in older adults require
          different preventive strategies — but both share a foundation of{" "}
          <strong>strength, load management, and movement quality</strong>.
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
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
            <strong className="text-gray-900">Please note:</strong> The best management for a
            meniscal tear depends on an accurate diagnosis — ideally confirmed with MRI — combined
            with a thorough clinical assessment of your symptoms, functional needs, and goals. If
            you are experiencing joint line pain, clicking, swelling, or difficulty squatting, book
            a consultation with our physiotherapy team at Zeromedixine for expert assessment and a
            personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Get Your Knee Moving Again?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised meniscal assessment and find out whether conservative physio or
          surgical referral is right for you.
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

export default MeniscusTear;
