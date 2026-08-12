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
import textneckimage from "../assets/text-neck-syndrome.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Text Neck Syndrome blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Persistent neck pain and stiffness — particularly at the base of the skull",
  "Upper shoulder and interscapular tension",
  "Tension headaches from the suboccipital region",
  "Increased thoracic kyphosis and forward head posture",
  "Fatigue and heaviness in the neck and shoulders by end of day",
  "In chronic cases — early cervical disc degeneration and nerve irritation",
];

const PREVENTION = [
  { title: "Raise Your Device to Eye Level", desc: "The single most impactful habit change, eliminating the forward head tilt that drives text neck." },
  { title: "The 20-20-20 Rule",         desc: "Every 20 minutes, take a 20-second break and move your neck through its full range of motion." },
  { title: "Limit Recreational Screen Time", desc: "Particularly for children and adolescents." },
  { title: "Strengthen Postural Muscles", desc: "Deep cervical stabilisers, upper back, and scapular muscles resist postural fatigue during necessary device use." },
  { title: "Thoracic Mobility Exercises", desc: "Counteracting the increasing kyphosis associated with text neck." },
  { title: "Early Education",           desc: "Building healthy device habits in children before pain develops." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Releases deep fascial restrictions throughout the anterior neck, chest, and posterior cervical and thoracic regions — restoring tissue mobility and reducing the postural tension perpetuating text neck." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the upper trapezius, levator scapulae, suboccipital muscles, scalenes, sternocleidomastoid, and pectoralis minor." },
  { title: "Cervical & Thoracic Joint Mobilisation", desc: "Restores movement at the stiff cervicothoracic junction and mid-cervical spine." },
  { title: "Dry Needling",              desc: "Deactivates the chronic trigger points in the suboccipital, upper trapezius, and levator scapulae muscles." },
  { title: "Cupping Therapy",           desc: "Applied to the posterior cervical spine, upper trapezius, and interscapular region — providing myofascial decompression." },
  { title: "Postural Taping",           desc: "Kinesiology tape to provide continuous tactile feedback about head and shoulder position between sessions." },
  { title: "Device Habit Coaching",     desc: "Auditing daily screen habits, identifying highest-risk situations, and developing practical strategies for device use that protect the cervical spine." },
];

const EXERCISES = [
  "Chin tucks — the most fundamental exercise for text neck, directly reversing forward head posture",
  "Suboccipital stretching — releasing the deep muscles at the base of the skull",
  "Thoracic extension over foam roller — counteracting increased kyphosis",
  "Scapular retraction and posterior chain strengthening",
  "Deep neck flexor progressive strengthening",
  "Pectoral and anterior neck stretching",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const TextNeckSyndrome = () => {
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
          Neck Pain Conditions
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Neck Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Understanding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Text Neck Syndrome
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              What it is, how to prevent it, and how physiotherapy helps you recover
              — explained by your physiotherapy team.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/neck-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Neck Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            <img
              src={textneckimage}
              alt="Text neck syndrome illustration"
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
            <SectionTitle title="What is Text Neck Syndrome?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Text Neck Syndrome is a modern musculoskeletal condition caused by the prolonged
              forward flexion of the cervical spine that occurs when looking down at smartphones,
              tablets, and laptops for extended periods. While it may sound informal, text neck is
              a clinically recognised condition with real, measurable consequences for the cervical
              spine.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The physics are striking. The head weighs approximately 5–6 kilograms in a neutral
              position. As it tilts forward to 60 degrees — the position most people adopt looking
              at a phone in their lap — the cervical spine bears close to 27 kilograms. This is the
              equivalent of carrying a small child on your neck — for hours every day.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Text neck is no longer confined to adults — it is increasingly diagnosed in children
              and adolescents, with concerning implications for spinal development.
            </p>
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
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How Can Physiotherapy Help Prevent It?" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          From a physiotherapy perspective, text neck is highly preventable with simple habit
          changes and consistent strengthening that protect the cervical spine during daily device
          use.
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

  

      {/* ── WHAT TO EXPECT ── */}
      <Section bg="white">
        <SectionBadge label="04 — What to Expect" />
        <SectionTitle title="What to Expect" />
        <p className="text-gray-700 leading-relaxed max-w-2xl mb-4">
          Assessment includes a postural screen, cervical range of motion assessment, muscle
          strength testing, and lifestyle evaluation. Treatment combines hands-on relief,
          corrective exercise, postural retraining, and practical device habit guidance.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Text neck is a modern problem — but it has a very achievable solution.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Neck pain has several possible causes and the right
            treatment depends on your individual assessment. If you are experiencing neck
            symptoms, please book a consultation with our physiotherapy team for an accurate
            diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Suffering From Neck Pain Linked to Screen Use?
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
    <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-full" />
  </div>
);

export default TextNeckSyndrome;
