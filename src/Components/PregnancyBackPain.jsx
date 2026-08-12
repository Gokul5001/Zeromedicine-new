import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pregancy_backpain from "../assets/Pregancy_backpain.webp";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const HERO_BADGES = [
  { emoji: "🤰", label: "Up to 70%",       sub: "of pregnant women affected" },
  { emoji: "✅", label: "Safe & Effective", sub: "Pregnancy-adapted physio" },
  { emoji: "💛", label: "All Trimesters",   sub: "Treatment at every stage" },
];

const TRIMESTERS = [
  { label: "First Trimester",  weeks: "Weeks 1–12",  desc: "Hormonal changes begin — relaxin released, early postural shifts and fatigue" },
  { label: "Second Trimester", weeks: "Weeks 13–26", desc: "Centre of gravity shifts forward — lumbar lordosis increases, core loading changes" },
  { label: "Third Trimester",  weeks: "Weeks 27–40", desc: "Maximum loading — pelvic girdle stress peaks, disc and joint loading greatest" },
];

const KEY_FACTORS = [
  { title: "Relaxin Hormone",            desc: "Loosens ligaments throughout the body (including the spine and pelvis) to prepare for childbirth, reducing joint stability and increasing vulnerability to pain." },
  { title: "Shifting Centre of Gravity", desc: "The growing uterus moves the body's centre of mass forward, forcing an increase in lumbar lordosis and placing greater load on posterior spinal structures." },
  { title: "Increased Body Weight",      desc: "Additional weight amplifies compressive forces on lumbar discs, facet joints, and the sacroiliac joints." },
  { title: "Core Muscle Changes",        desc: "The growing uterus stretches and reduces the efficiency of the deep abdominal stabilisers, reducing the natural muscular support of the lumbar spine." },
  { title: "Postural Adaptations",       desc: "Compensatory changes in posture across all body regions create secondary loading of the thoracic and lumbar spine." },
];

const SYMPTOMS = [
  "Dull aching or sharp pain in the lower back, typically across the lumbar region",
  "Sacroiliac joint pain — deep, one or both sides of the lower back just above the buttocks",
  "Pubic symphysis pain (PGP) — pain at the front of the pelvis, worsened by walking or leg movements",
  "Pain worsened by prolonged standing, walking, stairs, rolling in bed, or single-leg activities",
  "Morning stiffness that eases with gentle movement",
  "Referred pain into the buttocks or upper thighs",
  "Difficulty with daily tasks such as dressing, getting in and out of a car, or climbing stairs",
];

const PREVENTION = [
  { title: "Begin Pregnancy-Appropriate Exercise Early",  desc: "Gentle strengthening and stretching from the first trimester builds the physical resilience needed to manage the demands of later pregnancy." },
  { title: "Strengthen Pelvic Floor & Deep Core",        desc: "Activating the transverse abdominis and pelvic floor before and throughout pregnancy maintains lumbopelvic stability as relaxin reduces ligamentous support." },
  { title: "Practise Safe Movement Strategies",          desc: "Avoid asymmetric single-leg loading such as dressing while standing, stepping over objects, or carrying loads on one side." },
  { title: "Optimise Your Sleep Position",               desc: "Side-lying with a pillow between the knees and one under the bump from the second trimester supports pelvic alignment and reduces overnight sacroiliac stress." },
  { title: "Wear Supportive Footwear",                   desc: "Avoid flat, unsupportive shoes or high heels which alter lower limb biomechanics and increase lumbar loading through the kinetic chain." },
  { title: "Use a Maternity Support Belt",               desc: "For those with PGP or significant pelvic instability, a properly fitted sacroiliac belt provides valuable external support during weight-bearing activities." },
  { title: "Avoid Prolonged Standing or Sitting",        desc: "Alternate positions regularly and take movement breaks throughout the day to prevent static loading of the sacroiliac and lumbar joints." },
  { title: "Seek Early Physiotherapy",                   desc: "If you experience back or pelvic pain at any point during pregnancy, early assessment and management prevents the condition from worsening through the trimesters." },
];

const TREATMENTS_HANDS_ON = [
  { title: "Pelvic Girdle & SI Joint Assessment",  desc: "Accurate classification of lumbar back pain versus pelvic girdle pain (PGP) is essential — each requires a different treatment approach, and mixing them up can worsen symptoms." },
  { title: "Manual Therapy (Pregnancy-Modified)",  desc: "Gentle sacroiliac joint mobilisation and soft tissue release adapted for pregnancy — performed in safe side-lying or semi-reclined positions to avoid supine positioning in later pregnancy." },
  { title: "Myofascial Release (MFR)",             desc: "Safe, pregnancy-adapted MFR for the lumbar paraspinals, piriformis, and hip musculature — significantly reduces the deep gluteal and sacral tension associated with PGP and lumbar pain." },
  { title: "Cupping Therapy",                      desc: "Carefully applied to the lumbar and hip region in pregnancy-safe positioning — effective for relieving deep paraspinal and gluteal tightness, with techniques adapted throughout all trimesters." },
  { title: "Thoracic Mobilisation",               desc: "Mobilisation of the thoracic spine relieves the upper and mid-back loading that builds as posture adapts to the growing bump — one of the most immediately relieving treatments in pregnancy." },
  { title: "Dry Needling",                         desc: "Applied to lumbar, gluteal, and hip trigger points using pregnancy-safe protocols and positions — effective for pain relief in the second and third trimesters when carefully performed." },
];

const TREATMENTS_ACTIVE = [
  { title: "Pelvic Floor & Core Rehabilitation",  desc: "Activation and strengthening of the transverse abdominis, pelvic floor, and multifidus — the primary stabilising muscles of the lumbopelvic region during pregnancy." },
  { title: "Pregnancy-Safe Stretching",           desc: "Modified hip flexor, piriformis, thoracic, and lumbar mobility exercises appropriate to each trimester — improving flexibility without overstressing relaxin-laxed ligaments." },
  { title: "Supportive Device Fitting",           desc: "Assessment and guidance on maternity belts, sacroiliac joint belts, and pregnancy pillows — fitted and explained to maximise relief and protect your joints during daily activities." },
  { title: "Postural & Activity Education",       desc: "Practical guidance on safe sleep positions, lifting, sitting, getting in and out of bed, driving, and adapting daily tasks throughout each trimester to minimise pain." },
  { title: "Aquatic Physiotherapy",               desc: "Warm-water exercise programmes in later pregnancy — significantly reduces gravitational load on the spine and pelvis, enabling exercise and pain relief not achievable on land." },
  { title: "Postnatal Rehabilitation Planning",   desc: "We plan ahead — providing guidance on postnatal recovery, return to exercise, and core and pelvic floor rehabilitation after delivery to restore full strength and function." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const PregnancyBackPain = () => {
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
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-pink-100 text-pink-700 uppercase tracking-wider">
              Back Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Pregnancy{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Back Pain
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Affecting up to 70% of pregnant women — one of the most common and most treatable
              conditions we see. Here is what causes it, and how we safely relieve it at every
              stage of pregnancy.
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
    src={Pregancy_backpain}
    alt="Pregancy Back pain illustration"
    className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
  />
</motion.div>

        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Pregnancy Back Pain?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-5">
              Pregnancy back pain affects up to 70% of pregnant women at some point across the three
              trimesters. It is not simply "normal" discomfort to be endured — it is a treatable
              condition that responds excellently to physiotherapy at every stage of pregnancy. The
              pain arises from a combination of hormonal, biomechanical, and postural changes as the
              body adapts to the growing baby.
            </p>

            {/* Trimester timeline */}
            <h3 className="text-base font-semibold text-gray-800 mb-4">How Pain Evolves by Trimester</h3>
            <div className="space-y-2 mb-6">
              {TRIMESTERS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    {i < TRIMESTERS.length - 1 && (
                      <div className="w-0.5 h-5 bg-gradient-to-b from-blue-300 to-green-200 mt-1" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="font-semibold text-gray-800 text-sm">
                      {t.label}
                      <span className="ml-2 text-xs font-normal text-gray-400">{t.weeks}</span>
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key factors */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">Why Pregnancy Causes Back Pain</h3>
            <ul className="space-y-3">
              {KEY_FACTORS.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Heart size={15} className="text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-gray-800">{f.title} — </span>
                    <span className="text-sm text-gray-600">{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* PGP callout */}
            <div className="bg-pink-50 border-l-4 border-pink-400 rounded-r-xl p-4 mb-6">
              <p className="text-sm font-semibold text-pink-800 mb-1">
                Pelvic Girdle Pain (PGP) — A Distinct Condition
              </p>
              <p className="text-sm text-pink-700 leading-relaxed">
                Many pregnant women experience pain specifically around the sacroiliac joints,
                pubic symphysis, and posterior pelvis — known as Pelvic Girdle Pain. PGP is distinct
                from lumbar back pain and requires specific physiotherapy management, including
                activity modification, targeted stabilisation, and the use of supportive belts.
              </p>
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
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={17} className="text-green-500 shrink-0 mt-0.5" />
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
        <SectionTitle title="How to Prevent Pregnancy Back Pain" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          While not all pregnancy back pain can be completely prevented, the right preparation and
          habits can significantly reduce its severity and impact on your daily life.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 p-5 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors"
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


      {/* ── DISCLAIMERS ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-4">
            <AlertTriangle size={22} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 leading-relaxed">
              <strong>Important Safety Note:</strong> All physiotherapy techniques during pregnancy
              at Zeromedixine are specifically modified for maternal and foetal safety. If you
              experience sudden severe pain, vaginal bleeding, reduced foetal movement, or symptoms
              of pre-eclampsia, please contact your obstetrician or midwife immediately rather than
              attending physiotherapy.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
            <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Please note:</strong> Pregnancy back pain and
              pelvic girdle pain are common but highly treatable conditions. You do not have to
              simply endure them. If you are experiencing back or pelvic pain at any stage of
              pregnancy, our physiotherapy team at Zeromedixine is experienced in safe, effective
              pregnancy care.
            </p>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          You Deserve to Be Comfortable in Your Pregnancy.
        </h2>
        <p className="text-gray-700 mb-10">
          Safe, expert physiotherapy at every trimester — so you can focus on what matters most.
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

export default PregnancyBackPain;
