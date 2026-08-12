import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import scoliosis from "../assets/Scoliosis.webp";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const HERO_BADGES = [
  { emoji: "📐", label: "3D Deformity",        sub: "Lateral curve + rotation" },
  { emoji: "👧", label: "Most Common in Teens", sub: "Adolescent idiopathic type" },
  { emoji: "✅", label: "Highly Manageable",    sub: "With Schroth & physio" },
];

const TYPES = [
  { tag: "Most Common",    title: "Adolescent Idiopathic", desc: "Develops during puberty with no known cause. Affects girls more frequently and progresses rapidly during growth spurts — early detection is crucial." },
  { tag: "Present at Birth", title: "Congenital",           desc: "Results from abnormal vertebral development in the womb — hemivertebrae, fused ribs, or other structural anomalies present at birth." },
  { tag: "Secondary Cause", title: "Neuromuscular",         desc: "Associated with conditions such as cerebral palsy, muscular dystrophy, or spinal cord injury — caused by imbalanced muscle control of the spine." },
  { tag: "Age-Related",    title: "Degenerative (Adult)",   desc: "Develops in adults due to asymmetric degeneration of intervertebral discs and facet joints — causes progressive lateral curvature and pain in later life." },
];

const SEVERITY = [
  { angle: "10° – 25°", level: "Mild",     color: "bg-green-100 text-green-700",  approach: "Physiotherapy, monitoring, PSSE exercises" },
  { angle: "25° – 45°", level: "Moderate", color: "bg-amber-100 text-amber-700",  approach: "Physiotherapy + bracing (in growing adolescents)" },
  { angle: "45°+",      level: "Severe",   color: "bg-red-100 text-red-700",      approach: "Surgical evaluation + pre/post-op physiotherapy" },
];

const SYMPTOMS = [
  "Visibly uneven shoulders — one shoulder blade more prominent than the other",
  "Asymmetric waist — one side appears higher or fuller than the other",
  "One hip sitting higher than the other when standing",
  "Rib hump — a visible prominence of the ribs on one side when bending forward (Adam's forward bend test)",
  "Back pain and muscle fatigue — particularly in moderate to severe curves",
  "Reduced flexibility and difficulty with certain movements",
  "In severe cases, reduced lung capacity or breathing difficulty",
  "Clothes fitting asymmetrically or difficulty finding comfortable sitting positions",
];

const PREVENTION = [
  { title: "Participate in Screening Programmes",            desc: "The Adam's forward bend test is a simple, effective screening tool that identifies rib humps and asymmetry indicating possible scoliosis. Early referral leads to far better outcomes." },
  { title: "Monitor During Growth Spurts",                   desc: "Ages 10–16 represent the highest risk period for curve progression. Regular physiotherapy monitoring during these years can detect worsening before it becomes severe." },
  { title: "Begin PSSE Early Once Identified",               desc: "Once a curve is identified, commencing evidence-based scoliosis exercises (Schroth Method or SEAS) immediately reduces the rate of progression significantly." },
  { title: "Maintain General Physical Fitness & Core",       desc: "Strong, symmetrical musculature around the spine helps resist progressive curvature forces and supports spinal health throughout life." },
  { title: "Avoid Asymmetric Spinal Loading Activities",     desc: "Once scoliosis is diagnosed, certain sports and activities may need modification or supplementation with corrective exercise to avoid accelerating the curve." },
  { title: "Address Degenerative Risk Factors in Adults",    desc: "Managing weight, maintaining core strength, and treating disc and joint degeneration early reduces the risk of developing progressive adult degenerative scoliosis." },
];

const TREATMENTS_PSSE = [
  { title: "Schroth Method (PSSE)",                   desc: "A highly evidence-based, three-dimensional scoliosis-specific exercise programme using rotational breathing, elongation, and postural correction tailored precisely to each patient's unique curve pattern and Cobb angle." },
  { title: "SEAS — Scientific Exercise Approach",     desc: "An Italian evidence-based PSSE method using active self-correction and cognitive-sensorimotor training — patients learn to actively correct their curve pattern in daily postures and movements." },
];

const TREATMENTS_HANDS_ON = [
  { title: "Manual Therapy & Spinal Mobilisation",  desc: "Mobilisation of stiffened, compressed segments on the concave (shortened) side of the curve to improve spinal flexibility and enhance the effectiveness of corrective exercises." },
  { title: "Myofascial Release (MFR)",              desc: "Targeted release of hypertonic muscles and fascia on the concave side — addressing the asymmetric muscular tension that maintains and worsens the scoliotic pattern over time." },
  { title: "Dry Needling",                          desc: "Applied to hypertonic paraspinal musculature on the concave side — reduces asymmetric muscle loading, relieves pain, and improves the resting position of the spine." },
  { title: "Cupping Therapy",                       desc: "Decompressive cupping along the convex rib hump and concave paraspinal muscles — improves circulation, reduces chronic tissue tension, and complements corrective exercise." },
  { title: "Rotational Breathing Retraining",       desc: "Schroth-based rotational breathing into the collapsed rib sections on the concave side — improves thoracic flexibility and rib cage symmetry over time with consistent practice." },
  { title: "Scoliosis-Specific Core Stabilisation", desc: "Core programming carefully designed to avoid worsening rotational forces — activating stabilisers asymmetrically to support the corrective posture achieved in Schroth training." },
];

const TREATMENTS_EDUCATION = [
  { title: "Postural Education & ADL Training",       desc: "Teaching patients to maintain their auto-corrected posture during sitting, standing, walking, school, and sport — carrying the gains from therapy into everyday life." },
  { title: "Curve Monitoring & Progression Tracking", desc: "Regular physiotherapy review alongside medical imaging to track curve behaviour over time — particularly important during adolescent growth when curves are most likely to progress." },
  { title: "Bracing Coordination (Where Indicated)",  desc: "For adolescents with curves 25°–45° during growth, physiotherapy works alongside orthotists to ensure the brace is complemented by effective in-brace corrective exercises." },
  { title: "Pre & Post-Surgical Rehabilitation",      desc: "For severe curves requiring spinal fusion surgery, we provide prehabilitation to optimise surgical readiness and post-surgical rehabilitation to restore strength, mobility, and function." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const Scoliosis = () => {
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
                Scoliosis
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              A lateral curvature of the spine that affects people of all ages — from adolescents
              in growth spurts to adults with degenerative change. Early detection and physiotherapy
              make a profound difference.
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

          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
>
  <img
    src={scoliosis}
    alt="scoliosis illustration"
    className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
  />
</motion.div>

        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Scoliosis?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-5">
              Scoliosis is a three-dimensional structural deformity of the spine characterised by
              an abnormal lateral (sideways) curvature greater than 10 degrees — measured by the
              Cobb angle on an X-ray — combined with rotation of the vertebral bodies. It is not
              simply a postural problem but a true structural change in the architecture of the spine.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              The deformity creates visible asymmetry — uneven shoulders, a prominent rib cage on
              one side, uneven hips, or a visible spinal curve. Many mild to moderate cases are
              effectively managed with physiotherapy; severe curves may require bracing or surgery.
            </p>

            {/* Types grid */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">Types of Scoliosis</h3>
            <div className="space-y-3">
              {TYPES.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start"
                >
                  <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full shrink-0 whitespace-nowrap">
                    {t.tag}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            {/* Cobb angle callout */}
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-6">
              <p className="text-sm text-blue-800 font-semibold mb-1">The Cobb Angle</p>
              <p className="text-sm text-blue-700 leading-relaxed">
                The standard measurement used to classify scoliosis severity on X-ray. A Cobb angle
                of 10° or more is required for a diagnosis of scoliosis. The angle determines whether
                observation, physiotherapy, bracing, or surgery is recommended.
              </p>
            </div>

            {/* Severity table */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">Scoliosis Severity Classification</h3>
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-green-500 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Cobb Angle</th>
                    <th className="px-4 py-3 text-left font-semibold">Classification</th>
                    <th className="px-4 py-3 text-left font-semibold">Management</th>
                  </tr>
                </thead>
                <tbody>
                  {SEVERITY.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 font-semibold text-gray-800">{row.angle}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${row.color}`}>
                          {row.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs leading-snug">{row.approach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Symptoms */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">Signs & Symptoms</h3>
            <ul className="space-y-2">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
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
        <SectionTitle title="Prevention — A Physiotherapy Perspective" />

        {/* Early detection callout */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-8 max-w-2xl">
          <p className="text-sm text-amber-800 font-medium leading-relaxed">
            <span className="font-bold">Early Detection is the Most Powerful Preventive Tool:</span> The
            best outcomes in scoliosis occur when the curve is identified early — particularly before
            or during the adolescent growth spurt, when curves progress most rapidly. Regular postural
            screening in children aged 10–16 is strongly recommended.
          </p>
        </div>

        <p className="text-gray-600 mb-8 max-w-2xl">
          Idiopathic scoliosis — the most common type — cannot be fully prevented as its root
          cause remains unknown. However, the physiotherapy perspective focuses on early detection,
          limiting curve progression, and preserving function.
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
  

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> Scoliosis management is highly
            individualised — the right approach depends on your age, curve pattern, Cobb angle,
            skeletal maturity, and symptoms. If you or your child has been diagnosed with scoliosis,
            or if you notice asymmetry in posture, please book a consultation with our physiotherapy
            team at Zeromedixine for a comprehensive scoliosis assessment and personalised
            treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Early Detection. Expert Care. Better Outcomes.
        </h2>
        <p className="text-gray-700 mb-10">
          Schroth-based physiotherapy and personalised scoliosis management — for adolescents
          and adults alike.
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

export default Scoliosis;
