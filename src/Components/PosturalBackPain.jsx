import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  AlertCircle,
  Monitor,
  Smartphone,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Postural_back_pain from "../assets/Postural_back_pain.webp";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const STATS = [
  { value: "#1",  label: "Most Common Back Pain Type" },
  { value: "90%", label: "Preventable With Correction" },
  { value: "8hrs",label: "Average Daily Sitting Time" },
];

const POSTURAL_PATTERNS = [
  {
    icon: Monitor,
    title: "Desk Slouch",
    desc: "Forward head, rounded thoracic spine, and flattened lumbar curve from prolonged sitting.",
  },
  {
    icon: Smartphone,
    title: "Tech Neck",
    desc: "Sustained forward flexion of the neck and upper back during screen and phone use.",
  },
  {
    icon: User,
    title: "Sway Back",
    desc: "Excessive lumbar lordosis with anterior pelvic tilt — common in prolonged standing postures.",
  },
];

const SYMPTOMS = [
  "Dull, aching pain or stiffness in the lower or upper back, worsening through the day",
  "Pain that builds with prolonged sitting, standing, or repetitive activity — and eases with movement",
  "Muscle fatigue, tightness, or tension across the back and shoulders",
  "Temporary relief after stretching, walking, or changing position",
  "No radiating leg or arm symptoms (unless secondary muscular tightness compresses a nerve)",
  "Stiffness after prolonged rest — particularly in the morning or after long car journeys",
];

const PREVENTION = [
  { title: "Ergonomic Workstation Setup",      desc: "Monitor at eye level, hips and knees at 90°, feet flat on the floor, lumbar curve supported. Most people spend more waking hours at a desk than anywhere else." },
  { title: "Movement Breaks Every 30–45 min",  desc: "Stand, walk, and perform gentle spinal movements. No ergonomic furniture replaces regular movement — set a timer if needed." },
  { title: "Strengthen Postural Muscles",      desc: "Train the lower trapezius, rhomboids, deep cervical flexors, and lumbar multifidus — the muscles that maintain good posture effortlessly." },
  { title: "Stretch the Anterior Chain",       desc: "Hip flexors, pectorals, and thoracic flexors become chronically shortened from sitting. Regular stretching is essential for maintaining upright posture." },
  { title: "Mindful Screen & Phone Habits",    desc: "Every 2.5 cm of forward head posture adds ~5 kg of load to the cervical spine. Raise your screen, use a holder, or take regular screen breaks." },
  { title: "Sit-Stand Desk",                   desc: "Alternating between sitting and standing throughout the workday significantly reduces lumbar tissue loading and helps maintain spinal health." },
  { title: "Optimise Sleep Position",          desc: "Sleeping in a supported side-lying or back position with appropriate pillow height prevents nocturnal postural loading of the spine." },
  { title: "Stay Physically Active",           desc: "Regular exercise keeps postural muscles strong, reduces tissue stiffness, and counteracts the effects of sedentary daily life." },
];

const TREATMENTS_HANDS_ON = [
  { title: "Postural Assessment & Correction",   desc: "A thorough standing and seated postural analysis identifies specific faults — followed by hands-on correction and movement re-education tailored to your pattern." },
  { title: "Myofascial Release (MFR)",            desc: "Release of chronically tight anterior chain structures — hip flexors, pectorals, and thoracic fascia — that mechanically drive the postural pattern and maintain back pain." },
  { title: "Manual Therapy & Thoracic Mobilisation", desc: "Spinal joint mobilisation to restore stiffened thoracic and lumbar segments that have adapted to habitual postural loading — dramatically improves mobility and reduces pain." },
  { title: "Dry Needling",                        desc: "Targeted needling into upper trapezius, rhomboids, levator scapulae, and paraspinal trigger points — rapidly reduces pain and muscle tension from postural overload." },
  { title: "Cupping Therapy",                     desc: "Applied along the thoracic and lumbar paraspinal musculature to release chronic tension, improve circulation, and restore tissue health." },
  { title: "Heat Therapy & Electrotherapy",       desc: "Therapeutic heat reduces muscle guarding; TENS provides effective pain relief — especially useful in the early management phase." },
];

const TREATMENTS_ACTIVE = [
  { title: "Corrective Strengthening Programme",  desc: "Targeted exercises for lower trapezius, serratus anterior, deep cervical flexors, and lumbar multifidus — the postural stabilisers that maintain spinal alignment without effort." },
  { title: "Stretching Programme",                desc: "Structured flexibility programme for hip flexors, thoracic extensors, pectorals, and hamstrings — restores length to shortened structures that pull the spine out of alignment." },
  { title: "Ergonomic & Workplace Assessment",    desc: "Detailed guidance on optimising your desk, chair, screen, and home environment — removing the source of postural loading that perpetuates your pain." },
  { title: "Breathing & Relaxation Retraining",   desc: "Diaphragmatic breathing retraining to reduce the postural muscle over-activation that commonly develops with desk-based work and chronic pain patterns." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const PosturalBackPain = () => {
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
              Postural{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Back Pain
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              The most common — and most correctable — cause of back pain. Learn what your
              posture is doing to your spine and how we help you fix it for good.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/back-pain")}
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
    src={Postural_back_pain}
    alt="Postural Back pain Illustration"
    className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
  />
</motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Postural Back Pain?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Postural back pain is back pain caused directly by sustained, habitual, or repetitive
              adoption of poor postures — during sitting, standing, working, driving, or sleeping.
              Unlike disc herniations or nerve conditions, there is no structural pathology. The pain
              arises from the prolonged mechanical loading of spinal muscles, ligaments, joints, and
              soft tissues beyond their comfortable range.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
              <p className="text-sm text-blue-800 font-medium leading-relaxed">
                Key insight: Postural back pain is not about a single bad position — it is the
                accumulation of hours spent in suboptimal alignment, day after day, that gradually
                overloads spinal structures and creates pain. The good news: it is highly reversible
                with the right physiotherapy approach.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              In today's screen-dominated, desk-bound world, postural back pain has become one of
              the most prevalent musculoskeletal conditions seen in physiotherapy clinics. Remote
              work, long commutes, smartphone use, and sedentary lifestyles have made it a
              near-universal experience.
            </p>
          </div>

          <div>
            {/* Postural Patterns */}
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              Common Postural Patterns
            </h3>
            <div className="space-y-4 mb-8">
              {POSTURAL_PATTERNS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center shrink-0">
                    <p.icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{p.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Symptoms */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Typical Symptoms</h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
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
        <SectionTitle title="How to Prevent Postural Back Pain" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Postural back pain is largely a lifestyle condition — which means it is one of the most
          preventable forms of back pain. Small, consistent daily habits have a profound cumulative
          impact on your spinal health.
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
            <strong className="text-gray-900">Remember:</strong> While postural back pain is highly
            common, persistent or worsening back pain should always be assessed by a physiotherapist
            to rule out other causes. If you recognise your symptoms in this page, book a consultation
            with our team at Zeromedixine for a personalised postural assessment and treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Fix Your Posture. End the Pain.
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised postural assessment and start your correction programme today.
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

export default PosturalBackPain;
