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
import frozenshoulderimage from "../assets/frozen-shoulder.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Frozen Shoulder blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Deep, aching shoulder pain — often poorly localised",
  "Pain consistently worse at night — frequently disrupting sleep",
  "Progressive loss of movement — particularly external rotation and abduction",
  "Difficulty dressing, reaching behind the back, and overhead tasks",
  "A hard end feel when the shoulder reaches its restricted range",
];

const PREVENTION = [
  { title: "Early Mobilisation After Surgery or Injury", desc: "The most important preventive strategy." },
  { title: "Manage Underlying Medical Conditions", desc: "Diabetes, hypothyroidism, and cardiovascular disease significantly increase risk." },
  { title: "Avoid Prolonged Shoulder Immobilisation", desc: "Any period of disuse should be managed with gentle, guided movement." },
  { title: "Maintain Shoulder Mobility",  desc: "Regular daily range of motion exercises maintain capsular flexibility." },
  { title: "Early Assessment for Shoulder Pain", desc: "Particularly if pain is restricting movement or waking you at night." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Releases restrictions in the contracted capsular and pericapsular tissues — the anterior and posterior shoulder capsule, pectoralis minor, subscapularis, and posterior rotator cuff." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the subscapularis, pectoralis major and minor, and posterior shoulder muscles — restoring muscle length essential for regaining range of motion." },
  { title: "Shoulder Joint Mobilisation", desc: "Graded accessory mobilisation — particularly inferior and posterior glides — directly stretches the contracted capsule." },
  { title: "Dry Needling",              desc: "Releases trigger points in the rotator cuff, periscapular, and pectoral muscles." },
  { title: "Cupping Therapy",           desc: "Applied to the posterior shoulder, deltoid, and pectoral regions — decompressing soft tissues and improving circulation." },
  { title: "Pain Management",           desc: "TENS therapy, therapeutic ultrasound, and heat or ice — particularly important during the painful freezing phase." },
];

const EXERCISES = [
  "Pendulum exercises — gentle gravity-assisted mobility",
  "Assisted shoulder stretching — cross-body, external rotation, and overhead reaching",
  "Rotator cuff strengthening — rebuilding strength lost during the frozen phase",
  "Scapular stabilisation — restoring normal scapulohumeral rhythm",
  "Functional rehabilitation — progressive return to daily activities",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const FrozenShoulder = () => {
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
          Shoulder Pain Conditions
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Shoulder Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Understanding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Frozen Shoulder
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
                onClick={() => navigate("/pain-relief/shoulder-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Shoulder Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            <img
              src={frozenshoulderimage}
              alt="Frozen shoulder illustration"
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
            <SectionTitle title="What is Frozen Shoulder?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Frozen Shoulder — clinically known as Adhesive Capsulitis — is a condition
              characterised by progressive pain, stiffness, and significant loss of movement in
              the shoulder joint. It occurs when the connective tissue capsule surrounding the
              shoulder joint becomes inflamed, thickened, and contracted — forming adhesions that
              restrict normal range of motion.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Frozen shoulder is most common in adults between 40 and 60 years, significantly more
              prevalent in women, and affects approximately 2–5% of the general population — rising
              to 10–20% in people with diabetes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              It progresses through three distinct phases: the Freezing Phase (2–9 months) with
              gradual onset of pain worse at night; the Frozen Phase (4–12 months) where stiffness
              becomes dominant; and the Thawing Phase (5–24 months) with gradual return of
              movement. Without intervention, frozen shoulder can last 2–3 years or longer.
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
          From a physiotherapy perspective, early intervention and guided movement are the most
          effective preventive strategies against frozen shoulder developing or worsening.
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
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Assessment includes a comprehensive shoulder evaluation — range of motion measurement,
          capsular pattern identification, and evaluation of contributing medical factors. Frozen
          shoulder requires patience and consistency — but with the right physiotherapy at the
          right phase, recovery can be significantly accelerated.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Frozen shoulder has several possible presentations and the
            right treatment depends on your individual assessment. If you are experiencing
            shoulder symptoms, please book a consultation with our physiotherapy team for an
            accurate diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Struggling With a Stiff, Painful Shoulder?
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

export default FrozenShoulder;
