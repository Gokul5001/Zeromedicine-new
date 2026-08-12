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
import whiplashimage from "../assets/whiplash-injuries.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Whiplash Injuries blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Neck pain and stiffness — often delayed 12–24 hours after the incident",
  "Headaches from the base of the skull",
  "Shoulder and upper back pain",
  "Dizziness or vertigo",
  "Jaw pain or difficulty chewing",
  "In Grade III — radiating arm pain, numbness, or weakness",
  "Fatigue, anxiety, and sleep disturbance",
];

const PREVENTION = [
  { title: "Early Active Rehabilitation", desc: "The most important preventive measure against chronic whiplash; early, guided movement significantly reduces the risk of long-term symptoms." },
  { title: "Avoid Prolonged Collar Use",  desc: "Immobilisation leads to weakness, stiffness, and dependency, worsening long-term outcomes." },
  { title: "Cervical Strengthening",      desc: "For individuals in contact sports or high-risk occupations, pre-emptive strengthening improves the neck's ability to absorb sudden forces." },
  { title: "Correct Headrest Positioning", desc: "Reducing cervical hyperextension in rear-end collisions." },
  { title: "Pain Education",              desc: "Understanding that pain does not equal damage prevents fear-avoidance and chronic pain development." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Applied to the cervical, upper thoracic, and shoulder girdle regions — releasing widespread fascial restrictions and muscular guarding following whiplash." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the sternocleidomastoid, scalenes, upper trapezius, suboccipital muscles, and cervical extensors." },
  { title: "Cervical Joint Mobilisation", desc: "Restores normal segmental movement in stiff and painful cervical joints." },
  { title: "Dry Needling",              desc: "Targets trigger points in the injured and guarded cervical muscles — reducing hypertonicity and breaking the pain-spasm cycle." },
  { title: "Cupping Therapy",           desc: "Releases deep fascial tightness, improves circulation, and provides a calming effect on the overactive muscular system." },
  { title: "Cervical Traction",         desc: "Introduced once the acute phase settles — particularly useful with associated disc involvement or nerve root irritation." },
];

const EXERCISES = [
  "Early gentle range of motion — reassuring the patient that movement is safe",
  "Deep neck flexor retraining — consistently disrupted by whiplash",
  "Proprioception and sensorimotor retraining",
  "Progressive cervical and scapular strengthening",
  "Graduated return to sport or work programming",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const WhiplashInjuries = () => {
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
                Whiplash Injuries
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
              src={whiplashimage}
              alt="Whiplash injury illustration"
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
            <SectionTitle title="What is a Whiplash Injury?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Whiplash is a soft tissue injury to the cervical spine caused by a sudden, forceful
              back-and-forth movement of the head and neck — similar to the cracking of a whip.
              This rapid acceleration-deceleration mechanism places extreme stress on the muscles,
              ligaments, discs, joints, and nerves of the cervical spine.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whiplash is most commonly associated with rear-end motor vehicle collisions but can
              also result from sports collisions, falls, physical assault, or any sudden jolt that
              causes the head to move rapidly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whiplash injuries are graded using the Quebec Task Force Classification: Grade I
              (neck pain and stiffness only), Grade II (reduced range of motion and tenderness),
              Grade III (neurological signs such as weakness or numbness), and Grade IV (fracture
              or dislocation, requiring immediate medical management). The vast majority of
              presentations are Grades I and II, which respond very well to physiotherapy.
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
        <SectionTitle title="How Can Physiotherapy Prevent Complications?" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          From a physiotherapy perspective, early and appropriate management is the key factor in
          preventing whiplash from developing into a chronic pain condition.
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
          Assessment includes WAD grading, neurological screening, cervical range of motion
          measurement, muscle function testing, and evaluation of psychological factors
          influencing recovery. Treatment is phased — beginning with pain relief and progressing
          systematically toward full recovery.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          With early physiotherapy intervention, the vast majority of whiplash patients make a
          full and lasting recovery.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for
            general patient education. Whiplash injuries have several possible presentations and
            the right treatment depends on your individual assessment. If you have been in an
            accident or are experiencing neck symptoms, please book a consultation with our
            physiotherapy team for an accurate diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Been in an Accident?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised whiplash assessment and start your recovery — no surgery, no
          injections.
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

export default WhiplashInjuries;
