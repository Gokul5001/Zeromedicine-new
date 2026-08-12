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
import tenniselbowimage from "../assets/Tennis_Elbow.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Tennis Elbow blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Pain and tenderness over the lateral epicondyle — the outer bony prominence of the elbow",
  "Weakness of grip — difficulty gripping, twisting, or lifting objects, particularly with the elbow extended",
  "Pain with wrist extension and forearm rotation — opening jars, turning door handles, lifting a kettle",
  "Pain that radiates down the forearm into the wrist and hand",
  "Morning stiffness at the lateral elbow that eases with gentle activity",
  "Pain worsened by sustained gripping activities — typing, driving, tool use, racket sports",
  "In chronic cases: constant aching at rest that flares dramatically with any forearm activity",
];

const PREVENTION = [
  { title: "Manage Repetitive Gripping",   desc: "Avoid sustained or repetitive gripping without recovery. Building structured rest into repetitive forearm tasks is the single most important prevention strategy." },
  { title: "Progressive Forearm Strengthening", desc: "A well-conditioned common extensor tendon tolerates load far better. Eccentric and isotonic wrist extension exercises build resilience and prevent overload injury." },
  { title: "Correct Racket Equipment",     desc: "Use the correct grip size, appropriate string tension, and a racket suited to your skill level to reduce forearm muscle effort and impact shock." },
  { title: "Correct Technique",            desc: "Poor backhand mechanics are a classic precipitant of lateral epicondylalgia. Coaching-guided technique correction reduces forearm extensor load with each stroke." },
  { title: "Workstation Ergonomics",       desc: "Ensure correct mouse height, keyboard position, and neutral wrist angle to reduce cumulative extensor tendon load over a working day." },
  { title: "Strengthen Shoulder & Scapula", desc: "Proximal weakness forces the forearm extensors to overwork. A strong upper limb kinetic chain protects the lateral elbow." },
  { title: "Ergonomic Tool Handles",       desc: "Wider, ergonomic tool handles reduce gripping force and decrease peak load on the common extensor tendon during manual work." },
  { title: "Seek Early Physiotherapy",     desc: "Early-stage lateral epicondylalgia responds rapidly to treatment. Ignoring early symptoms allows it to become chronic and stubborn." },
];

const TREATMENTS = [
  { title: "Mulligan MWM — Mobilisation With Movement", desc: "Mill's manipulation and lateral epicondyle mobilisation with movement provide rapid, often immediate pain relief in acute tennis elbow." },
  { title: "Myofascial Release (MFR)",              desc: "Deep tissue release of the common extensor mass, brachioradialis, and forearm fascia to reduce resting tension that maintains lateral epicondyle irritation." },
  { title: "Dry Needling / Trigger Point Needling", desc: "Precise needling into extensor trigger points and the tendon itself reduces pain rapidly and restores grip strength and neuromuscular function." },
  { title: "Cupping Therapy",                       desc: "Decompressive cupping over the forearm extensor compartment lifts fascial adhesions and improves blood flow to the lateral epicondyle region." },
  { title: "Extracorporeal Shockwave Therapy (ESWT)", desc: "Strong evidence for chronic cases — high-energy acoustic waves stimulate collagen synthesis and promote structural tendon healing." },
  { title: "Electrotherapy (Ultrasound / TENS)",    desc: "Ultrasound promotes tendon remodelling; TENS provides pain relief, enabling earlier participation in active loading." },
  { title: "Isometric Wrist Extension",             desc: "Sustained wrist extension holds against resistance begin neural drive restoration without reactive tendon loading in the acute stage." },
  { title: "Eccentric Wrist Extension (Tyler Twist)", desc: "The gold-standard exercise for lateral epicondylalgia, driving collagen remodelling through controlled eccentric tendon loading." },
  { title: "Counterforce Bracing",                  desc: "A counterforce strap below the lateral epicondyle reduces peak tendon stress during gripping and lifting in the rehab and return-to-work phase." },
  { title: "Scapular & Shoulder Strengthening",     desc: "Progressive strengthening of the lower trapezius, serratus anterior, and rotator cuff addresses kinetic chain deficits that overload the forearm extensors." },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const TennisElbow = () => {
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
          Elbow Pain Conditions
        </button>

      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Elbow Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Understanding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Tennis Elbow
              </span>
            </h1>

            <p className="text-sm text-gray-500 italic mb-4">
              Clinically known as Lateral Epicondylalgia — Tendinopathy of the Common Extensor Origin
            </p>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Despite the name, most sufferers have never held a tennis racket. This is one
              of the most common upper limb conditions — and one of the most effectively
              treated with physiotherapy.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/elbow-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Elbow Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
  >
  <img
    src={tenniselbowimage}
    alt="Tennis elbow pain illustration"
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
            <SectionTitle title="What is Tennis Elbow?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Tennis elbow — clinically termed Lateral Epicondylalgia — is a painful overuse
              condition affecting the common extensor tendon origin at the lateral epicondyle
              of the humerus, the bony prominence on the outer side of the elbow. The primary
              muscle involved is the extensor carpi radialis brevis (ECRB), though other wrist
              extensors are frequently implicated.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              It is more accurately described as a tendinopathy than tendinitis. The primary
              pathology is degenerative change in the tendon structure — disorganised collagen,
              neovascularisation, and failed healing — rather than classic acute inflammation.
              This is why anti-inflammatory treatments alone are usually insufficient; the
              tendon needs progressive mechanical loading to remodel and rebuild strength.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Around 95% of sufferers have never picked up a tennis racket — tradespeople,
              office workers, kitchen staff, healthcare workers, and manual workers are
              commonly affected through repetitive gripping and wrist extension demands.
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
        <SectionTitle title="How to Prevent Tennis Elbow" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Tennis elbow is fundamentally a load management condition — it develops when the
          cumulative demand on the common extensor tendon exceeds its capacity to adapt and
          recover. Prevention centres on building tendon resilience and managing forearm
          loading intelligently.
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
      {/* <Section bg="gradient">
        <SectionBadge label="03 — Treatment" />
        <SectionTitle title="How We Treat Tennis Elbow at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Our treatment of lateral epicondylalgia combines hands-on techniques to reduce pain
          and release tightness with a progressive tendon loading programme to drive collagen
          remodelling and restore full strength. Treatment is always tailored to your specific
          presentation.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
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
      </Section> */}

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> Tennis elbow responds very
            well to physiotherapy, but chronic cases (lasting more than 3 months) require a
            more intensive and structured approach than acute ones. If you are experiencing
            lateral elbow pain with gripping or forearm activities, please book a consultation
            with our physiotherapy team for an accurate assessment and a personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Relieve Your Elbow Pain?
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
    <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full" />
  </div>
);

export default TennisElbow;