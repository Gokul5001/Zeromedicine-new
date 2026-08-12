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
import neckpainimage from "../assets/mechanical-neck-pain.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Mechanical Neck Pain blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Dull, aching, or sharp pain in the neck — one or both sides",
  "Morning stiffness that eases with movement during the day",
  "Pain and restricted range of motion when turning or tilting the head",
  "Muscle tightness and tenderness in the neck and upper shoulders",
  "Headaches from the base of the skull",
  "Pain that worsens with prolonged sitting or screen use and improves with movement",
];

const PREVENTION = [
  { title: "Postural Education",         desc: "Forward head posture is the single most common driver of mechanical neck pain." },
  { title: "Workstation Ergonomics",     desc: "Correct monitor height, chair setup, and keyboard position reduce daily cervical load." },
  { title: "Regular Movement Breaks",    desc: "Even good postures cause fatigue when held too long; breaking every 30–45 minutes is essential." },
  { title: "Cervical & Shoulder Strengthening", desc: "Weak muscles fatigue quickly, leading to compensatory overuse and pain." },
  { title: "Stress Management",          desc: "Psychological stress causes involuntary muscle guarding, particularly in the upper trapezius and cervical muscles." },
  { title: "Sleep Position & Pillow Support", desc: "An unsupportive pillow maintained overnight is a commonly overlooked contributor." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Releases fascial restrictions throughout the cervical, upper thoracic, and shoulder regions — reducing muscular tension and restoring normal tissue mobility." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the upper trapezius, levator scapulae, scalenes, and cervical extensors — the muscles most commonly overloaded in mechanical neck pain." },
  { title: "Cervical Joint Mobilisation", desc: "Restores normal segmental movement in stiff or restricted cervical joints — reducing joint pain and improving range of motion." },
  { title: "Dry Needling",              desc: "Deactivates trigger points in the neck and shoulder muscles — rapidly reducing muscle tension and pain." },
  { title: "Cupping Therapy",           desc: "Applied along the cervical spine and upper trapezius — improving blood flow, releasing fascial tightness, and providing immediate relief of muscle tension." },
  { title: "Heat Therapy",              desc: "Relaxes tight muscles and increases local circulation — particularly useful before manual therapy or as part of a home management programme." },
];

const EXERCISES = [
  "Deep neck flexor activation — the foundation of cervical rehabilitation",
  "Cervical range of motion exercises",
  "Upper trapezius and levator scapulae stretching",
  "Scapular stabilisation exercises",
  "Thoracic extension mobility",
  "Postural endurance training",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const MechanicalNeckPain = () => {
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
                Mechanical Neck Pain
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
              src={neckpainimage}
              alt="Mechanical neck pain illustration"
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
            <SectionTitle title="What is Mechanical Neck Pain?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Mechanical Neck Pain is the most common form of neck pain encountered in clinical
              practice. It refers to pain arising from the structures of the cervical spine —
              muscles, joints, ligaments, discs, and tendons — that is directly influenced by
              movement, posture, and mechanical loading.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The term mechanical distinguishes this from neck pain caused by serious pathology
              such as infection or tumour. In mechanical neck pain, symptoms behave predictably —
              worsening with certain postures or activities and improving with rest or position
              change.
            </p>
            <p className="text-gray-700 leading-relaxed">
              It is estimated that up to 70% of people will experience significant neck pain at
              some point in their lives — and mechanical causes account for the vast majority.
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
        <SectionTitle title="How Can Physiotherapy Prevent It?" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          From a physiotherapy perspective, postural education is the single most common driver of
          prevention — combined with consistent habits that protect the cervical spine from daily
          mechanical overload.
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
          Assessment covers a full postural analysis, cervical range of motion testing, muscle
          strength evaluation, and a detailed symptom history. Treatment combines hands-on relief
          with targeted exercise — most patients with mechanical neck pain experience significant
          improvement within 4–6 sessions.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Mechanical neck pain is common — but it is not something you simply have to live with.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for general
            patient education. Neck pain has several possible causes and the right treatment
            depends on your individual assessment. If you are experiencing neck symptoms, please
            book a consultation with our physiotherapy team for an accurate diagnosis and
            personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Relieve Your Neck Pain?
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

export default MechanicalNeckPain;
