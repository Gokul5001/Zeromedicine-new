import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  AlertCircle,
  Bone,
  Dumbbell,
  Link,
  Circle,
  Blend,
  Dna,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Mechanical_Back_Pain from "../assets/Mechanical_Back_Pain.webp";


/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const STRUCTURES = [
  { icon: Bone,     label: "Facet Joints" },
  { icon: Dumbbell, label: "Lumbar Muscles" },
  { icon: Link,     label: "Ligaments" },
  { icon: Circle,   label: "Intervertebral Discs" },
  { icon: Blend,    label: "Sacroiliac Joint" },
  { icon: Dna,      label: "Thoracolumbar Fascia" },
];

const SYMPTOMS = [
  { icon: "📍", text: "Pain localised to the lower back — may refer into the buttocks or upper thighs but rarely below the knee" },
  { icon: "🔄", text: "Pain that clearly changes with movement — bending, twisting, lifting, or prolonged postures aggravate it; movement or position change provides relief" },
  { icon: "🌅", text: "Morning stiffness that eases within minutes of moving — a hallmark of mechanical, not inflammatory, back pain" },
  { icon: "⚡", text: "Acute episodes that may come on suddenly after lifting, twisting, or a specific movement" },
  { icon: "😌", text: "Periods of complete resolution between episodes — mechanical back pain is characteristically episodic" },
  { icon: "🚶", text: "Pain generally eased by gentle walking or movement and worsened by prolonged rest or inactivity" },
];

const PREVENTION = [
  { title: "Stay Active Daily",                     desc: "Regular physical activity is the single most evidence-based way to prevent and manage mechanical back pain. Walking, swimming, and cycling all reduce recurrence risk significantly." },
  { title: "Build Core & Hip Strength",             desc: "A strong lumbar stabiliser system and well-conditioned hip musculature dramatically reduce the load placed on passive spinal structures during daily activity." },
  { title: "Use Correct Manual Handling Technique", desc: "The hip hinge with a neutral spine is the most protective lifting pattern. Learn it, practise it, and use it in everyday life and the workplace." },
  { title: "Avoid Prolonged Static Postures",       desc: "Build regular movement into your day regardless of whether you sit or stand for work. The spine is designed for movement, not sustained static loading." },
  { title: "Manage Stress & Sleep Quality",         desc: "Both are strongly associated with back pain flare-ups. Poor sleep impairs tissue recovery; chronic stress increases muscular tension and pain sensitivity." },
  { title: "Avoid Extended Bed Rest",               desc: "Prolonged inactivity after a back pain episode leads to deconditioning, stiffness, and increased recurrence. Relative rest with gentle movement is always preferred." },
  { title: "Address Previous Episodes Early",       desc: "Mechanical back pain has a high recurrence rate when underlying weaknesses and movement faults are not addressed. Physiotherapy after the first episode significantly reduces recurrence risk." },
  { title: "Maintain a Healthy Weight",             desc: "Excess body weight consistently increases lumbar spinal loading and accelerates the degeneration of discs and joints that predispose to mechanical pain." },
];

const PHASES = [
  { number: "1", title: "Pain Relief & Movement Restoration" },
  { number: "2", title: "Strength & Stability Rebuilding" },
  { number: "3", title: "Return to Full Function & Prevention" },
];

const TREATMENTS = [
  { title: "Manual Therapy & Joint Mobilisation",  desc: "Grade III–IV mobilisation or manipulation of restricted lumbar and sacroiliac joints to restore movement, reduce pain, and normalise spinal mechanics rapidly." },
  { title: "Soft Tissue Release & MFR",             desc: "Targeted myofascial release of the lumbar erectors, quadratus lumborum, gluteals, and thoracolumbar fascia — addressing the muscular component of mechanical pain." },
  { title: "Dry Needling",                          desc: "Precise trigger point needling into acute and chronic lumbar and gluteal muscles — provides rapid pain relief and restores normal muscle function." },
  { title: "Cupping Therapy",                       desc: "Decompressive cupping to the paraspinal musculature to promote local circulation, reduce chronic tissue tightness, and complement manual treatment." },
  { title: "Electrotherapy (TENS / IFT)",           desc: "Applied in the acute phase to reduce pain and muscle spasm — allows earlier, more comfortable movement and accelerates the progression to active rehabilitation." },
  { title: "Lumbar Traction",                       desc: "Applied where disc-related or facet joint loading is contributing to pain — decompresses spinal segments and provides significant relief for reactive mechanical presentations." },
  { title: "Core Stabilisation & Strengthening",    desc: "A graded, progressive exercise programme rebuilding the deep stabiliser system — transverse abdominis, multifidus, and the gluteal complex — essential for preventing recurrence." },
  { title: "Functional Movement Retraining",        desc: "Hip hinge mechanics, lifting technique, and functional movement patterns are retrained to eliminate the mechanical triggers that caused the episode — and will prevent the next one." },
  { title: "Stretching Programme",                  desc: "Targeted flexibility work for hip flexors, hamstrings, thoracic spine, and quadratus lumborum — restoring tissue length and reducing mechanical loading on vulnerable spinal structures." },
  { title: "Self-Management Education",             desc: "Empowering you with the knowledge and tools to manage flare-ups independently, recognise warning signs, and maintain the gains from physiotherapy long term." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const MechanicalBackPain = () => {
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
              Mechanical{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Back Pain
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              The most common diagnosis in back pain — yet one of the most misunderstood.
              Here is what it means, what causes it, and how we get you moving again.
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

          {/* Big stat card */}
          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
>
  <img
    src={Mechanical_Back_Pain}
    alt="Mechanical Back Pain illustration"
    className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
  />
</motion.div>

        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Mechanical Back Pain?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mechanical back pain is the most common category of low back pain, accounting for up
              to 90% of all presentations seen in physiotherapy and primary care. The term
              "mechanical" means the pain is related to how the spine moves, loads, and functions
              — rather than from a serious underlying disease, infection, or cancer.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The pain originates from one or more of the musculoskeletal structures of the spine
              — not from significant structural damage. The key diagnostic feature is that symptoms
              change with movement and position: certain movements or postures worsen the pain,
              while others provide relief.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-6">
              <p className="text-sm text-blue-800 font-medium leading-relaxed">
                A diagnosis of mechanical back pain does not mean "nothing is wrong." It means the
                cause is biomechanical — arising from the way your spine loads and moves — and is
                highly responsive to physiotherapy intervention.
              </p>
            </div>

            {/* Structures grid */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">Structures Commonly Involved</h3>
            <div className="grid grid-cols-2 gap-3">
              {STRUCTURES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
                >
                  <s.icon size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">Common Symptoms</h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm"
                >
                  <span className="text-xl shrink-0 leading-none mt-0.5">{s.icon}</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{s.text}</span>
                </motion.li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Onset may be acute (a specific incident) or insidious (gradual accumulation of
              repetitive strain). Both presentations respond well to physiotherapy.
            </p>
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Mechanical Back Pain" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Mechanical back pain is largely a product of how we move, load, and care for our bodies
          over time. Staying active, building strength, and moving well are the three most powerful
          preventive strategies.
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


      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> While mechanical back pain is
            common and highly treatable, back pain can occasionally have more serious causes. If
            your pain is constant and not affected by movement, or is associated with significant
            weight loss, fever, or bladder and bowel changes, please seek prompt medical assessment.
            Our physiotherapy team at Zeromedixine is here to guide your recovery with an accurate
            diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Your Spine Is Built to Move. Let's Get It Moving.
        </h2>
        <p className="text-gray-700 mb-10">
          Targeted physiotherapy gets most mechanical back pain under control within weeks —
          no surgery, no long-term medication.
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

export default MechanicalBackPain;
