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
import cervicalimage from "../assets/cervical-spondylosis.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Cervical Spondylosis blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Neck pain and stiffness — especially in the morning",
  "Headaches from the base of the skull",
  "Grinding or clicking with neck movement",
  "Pain, numbness, or tingling into the shoulders, arms, or fingers",
];

const PREVENTION = [
  { title: "Posture Correction",        desc: "Keeping the head aligned over the shoulders reduces disc and joint stress." },
  { title: "Ergonomic Adjustments",     desc: "Monitor at eye level and chair correctly set up for your workstation." },
  { title: "Regular Neck Mobility",     desc: "Movement exercises maintain disc hydration and joint health." },
  { title: "Deep Neck Flexor Strengthening", desc: "Builds the stabilising muscles that protect the cervical spine." },
  { title: "Movement Breaks",           desc: "Avoiding prolonged static postures throughout the day." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Releases fascial restrictions in the neck and upper back — reducing muscle guarding and restoring movement." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the upper trapezius, levator scapulae, and suboccipital muscles — the most commonly overloaded muscles in cervical spondylosis." },
  { title: "Cervical Joint Mobilisation", desc: "Restores mobility in stiff cervical joints and reduces pain." },
  { title: "Cervical Traction",         desc: "Gently decompresses the cervical spine — relieving pressure on discs and nerve roots." },
  { title: "Dry Needling",              desc: "Releases trigger points in the neck and shoulder muscles — reducing tension and pain." },
  { title: "Cupping Therapy",           desc: "Increases blood flow, releases deep fascial tightness, and provides relief from chronic muscle tension." },
];

const EXERCISES = [
  "Deep neck flexor strengthening",
  "Cervical range of motion exercises",
  "Scapular stabilisation",
  "Postural re-education",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const CervicalSpondylosis = () => {
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
                Cervical Spondylosis
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
              src={cervicalimage}
              alt="Cervical spondylosis illustration"
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
            <SectionTitle title="What is Cervical Spondylosis?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Cervical Spondylosis is an age-related degenerative condition affecting the bones,
              discs, and joints of the neck. Simply put — it is wear and tear of the cervical spine,
              and it is extremely common, affecting more than 85% of people over 60.
            </p>
            <p className="text-gray-700 leading-relaxed">
              As we age, the discs lose height and moisture, vertebrae develop bony spurs
              (osteophytes), and the surrounding joints degenerate — narrowing the space around the
              spinal cord and nerve roots.
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
          From a physiotherapy perspective, the progression of cervical spondylosis can be slowed
          with consistent habits that protect the cervical spine and keep the surrounding
          musculature strong and mobile.
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

      {/* ── TREATMENT ── */}
      <Section bg="gradient">
        <SectionBadge label="03 — Treatment" />
        <SectionTitle title="Physiotherapy Treatment at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Our physiotherapy approach is comprehensive — we address the root cause, relieve joint
          and nerve irritation, and rebuild the strength and mechanics that prevent recurrence.
          Treatment is always tailored to your specific presentation.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {TREATMENTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Therapeutic Exercises</h3>
          <ul className="space-y-3">
            {EXERCISES.map((ex, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{ex}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── WHAT TO EXPECT ── */}
      <Section bg="white">
        <SectionBadge label="04 — What to Expect" />
        <SectionTitle title="What to Expect" />
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Your treatment begins with a comprehensive assessment — evaluating posture, range of
          motion, muscle strength, and nerve function. From there, we build a personalised plan
          focused on reducing pain, restoring movement, and keeping your neck healthy long-term.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for general
            patient education. Cervical spondylosis has several possible presentations and the
            right treatment depends on your individual assessment. If you are experiencing neck
            symptoms, please book a consultation with our physiotherapy team for an accurate
            diagnosis and personalised treatment plan.
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

export default CervicalSpondylosis;
