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
import postfractureimage from "../assets/post-fracture-rehabilitation.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Post-Fracture Rehabilitation blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Pain and swelling in the acute phase",
  "Significant stiffness following immobilisation",
  "Weakness from disuse atrophy",
  "Difficulty with dressing, reaching, and overhead tasks",
  "Fear of movement and re-injury",
];

const PREVENTION = [
  { title: "Early, Guided Mobilisation", desc: "The most important strategy against post-fracture stiffness and frozen shoulder." },
  { title: "Avoiding Prolonged Sling Dependence", desc: "Beyond what is clinically necessary leads to rapid stiffness and muscle atrophy." },
  { title: "Bone Health Optimisation", desc: "Addressing osteoporosis reduces both fracture and complication risk." },
  { title: "Fall Prevention", desc: "Balance training and strengthening reduce the most common cause of proximal humeral fractures in older adults." },
  { title: "Pre-operative Optimisation", desc: "For surgical patients, preparing muscle function and setting expectations improves outcomes." },
];

const TREATMENTS = [
  { title: "Phase 1 (Weeks 1–6)", desc: "Pendulum exercises, elbow/wrist/hand movement, gentle myofascial release, ice and TENS for pain, and postural correction." },
  { title: "Phase 2 (Weeks 6–12)", desc: "Myofascial Release (MFR) releases fascial restrictions that accumulate throughout the shoulder girdle during immobilisation." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the subscapularis, posterior rotator cuff, and pectoral muscles." },
  { title: "Shoulder Joint Mobilisation", desc: "Graded glenohumeral mobilisation addressing capsular tightening from immobilisation." },
  { title: "Dry Needling", desc: "Reduces trigger points that develop during the period of immobilisation." },
  { title: "Cupping Therapy", desc: "Releases fascial restrictions and improves tissue mobility for active rehabilitation." },
];

const EXERCISES = [
  "Phase 2: active assisted range of motion, isometric rotator cuff activation, scapular stabilisation",
  "Phase 3 (Weeks 12–24+): progressive rotator cuff strengthening, advanced scapular loading, proprioceptive retraining",
  "Phase 4 (Months 4–6+): sport-specific or occupational rehabilitation, ongoing bone health programme for older adults",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const PostFractureRehabilitation = () => {
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
                Post-Fracture Rehabilitation
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              What it is, how to prevent complications, and how physiotherapy helps you recover
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
              src={postfractureimage}
              alt="Post-fracture rehabilitation illustration"
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
            <SectionTitle title="What Is Post-Fracture Rehabilitation?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Post-Fracture Rehabilitation is the structured physiotherapy programme following a
              shoulder fracture — most commonly involving the proximal humerus, clavicle, or
              scapula. Proximal humeral fractures alone account for approximately 5–6% of all
              fractures, particularly common in older adults with osteoporosis and in younger
              people following high-energy trauma.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fractures are classified by severity — from minimally displaced one-part fractures
              managed conservatively, to complex multi-part fractures often requiring surgical
              fixation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Without structured rehabilitation, complications include joint stiffness, frozen
              shoulder, rotator cuff weakness, and loss of function — most of which are
              preventable with early, expert physiotherapy.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">Common Challenges</h3>
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
        <SectionTitle title="How Can Physiotherapy Help Prevent Complications?" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          From a physiotherapy perspective, early and guided rehabilitation is the most effective
          way to prevent the stiffness, weakness, and functional loss that can follow a shoulder
          fracture.
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
          We liaise directly with your treating surgeon to ensure rehabilitation aligns with
          healing constraints.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          The vast majority of patients achieve full or near-full return to their pre-fracture
          level of function.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Shoulder fracture recovery has several possible
            presentations and the right treatment depends on your individual assessment and
            surgical history. If you are recovering from a shoulder fracture, please book a
            consultation with our physiotherapy team for an accurate diagnosis and personalised
            treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Recovering From a Shoulder Fracture?
        </h2>
        <p className="text-gray-700 mb-10">
          Start your rehabilitation journey at Zeromedixine today — no surgery, no injections.
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

export default PostFractureRehabilitation;
