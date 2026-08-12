import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import posteriorElbowImage from "../assets/Posterior_Elbow.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from Posterior Elbow Impingement blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Sharp posterior elbow pain at end-range extension — often described as a sudden \"block\" or jolt",
  "Reduced terminal elbow extension — inability to fully straighten the elbow, with a bony or soft tissue end-feel",
  "Posterior joint line tenderness — pain on direct palpation of the olecranon tip and posterior joint space",
  "Pain reproduced by forceful extension activities — punching, throwing, push-offs in gymnastics",
  "Clicking or catching sensations during extension — particularly when loose bodies are present",
  "Intermittent locking — the elbow suddenly blocks and will not extend past a certain point",
  "In athletes: progressive loss of throwing velocity, punch power, or gymnastics performance due to guarded extension",
  "Swelling in the posterior elbow — particularly after high-volume training sessions",
];

const PREVENTION = [
  {
    title: "Avoid Repetitive Hyperextension Without Adequate Preparation",
    desc: "Gradually building the volume of extension-loading sport activities allows posterior elbow structures to adapt progressively, rather than being subjected to sudden large mechanical demands that precipitate impingement.",
  },
  {
    title: "Strengthen Elbow Flexors & Dynamic Stabilisers",
    desc: "Strong biceps, brachialis, and elbow flexors act as dynamic brakes on terminal extension, controlling the deceleration phase and reducing the force with which the olecranon impacts the fossa — a critical and often overlooked prevention strategy.",
  },
  {
    title: "Correct Throwing, Punching, or Sport Mechanics",
    desc: "Video analysis of throwing, punching, and gymnastics technique identifies mechanical faults that amplify posterior compartment impingement forces. Early correction significantly reduces cumulative trauma to the posterior elbow.",
  },
  {
    title: "Address Valgus Instability Early",
    desc: "MCL insufficiency increases valgus loading at the moment of extension, which dramatically amplifies posteromedial impingement forces in throwing athletes. Treating medial elbow instability before it leads to secondary posterior impingement is an important preventive strategy.",
  },
  {
    title: "Warm Up the Elbow Thoroughly Before Extension-Loading Sport",
    desc: "Cold, stiff posterior elbow structures have significantly less capacity to absorb repetitive extension impact forces. A progressive warm-up including elbow mobility, soft tissue preparation, and progressive extension loading reduces impingement risk.",
  },
  {
    title: "Monitor Early Symptoms & Reduce Load Immediately",
    desc: "Early posterior elbow aching after training is a warning sign. Prompt load reduction and physiotherapy assessment at this stage prevents the osteophyte formation and capsular thickening that make the condition chronic and more difficult to manage.",
  },
];

const TREATMENTS = [
  {
    title: "Posterior Elbow Joint Mobilisation",
    desc: "Skilled olecranon-trochlear joint mobilisation to improve posterior joint space, reduce terminal extension pain, and restore the quality of elbow extension movement — one of the most immediately effective treatments for posterior impingement.",
  },
  {
    title: "Posterior Capsule Release & MFR",
    desc: "Manual release of the posterior joint capsule and triceps aponeurosis — reduces capsular thickening, improves terminal extension range, and decreases the soft tissue contribution to posterior compartment impingement.",
  },
  {
    title: "Manual Traction",
    desc: "Longitudinal distraction of the elbow joint in extension — decompresses the posterior compartment directly, provides immediate pain relief, and improves the available extension range by separating the articulating surfaces.",
  },
  {
    title: "Dry Needling",
    desc: "Applied to the triceps and posterior elbow muscles — reduces protective muscle guarding that limits extension range, and addresses trigger point-mediated posterior elbow pain that accompanies the mechanical impingement.",
  },
  {
    title: "Cupping Therapy",
    desc: "Decompressive cupping to the posterior elbow and triceps — lifts and separates posterior soft tissue layers, improves local blood flow, and reduces the fascial tension that compresses the posterior joint compartment.",
  },
  {
    title: "Electrotherapy (Ultrasound / IFT / TENS)",
    desc: "Therapeutic ultrasound to reduce posterior joint inflammation and soft tissue reactivity; IFT and TENS for pain management and enabling more comfortable range of motion restoration exercises.",
  },
  {
    title: "Elbow Flexor Strengthening",
    desc: "Progressive biceps and brachialis strengthening — building the dynamic deceleration capacity that controls terminal elbow extension and protects the posterior compartment during sport-specific loading patterns.",
  },
  {
    title: "Triceps & Dynamic Stabiliser Strengthening",
    desc: "Controlled triceps loading through pain-free ranges — building the balanced elbow musculature that supports normal joint mechanics and prevents the guarded movement patterns that perpetuate impingement.",
  },
  {
    title: "Sport Mechanics Correction",
    desc: "Video analysis and correction of throwing, punching, or gymnastic technique — identifying and modifying the specific mechanics that amplify posterior impingement forces with every repetition of the sport movement.",
  },
  {
    title: "Return-to-Sport Rehabilitation",
    desc: "Progressive sport-specific loading reintroduction — graded volume and intensity with objective pain monitoring, building toward full training and competition loads over a structured timeline.",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const PosteriorElbowImpingement = () => {
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
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Posterior Elbow Impingement
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
              src={posteriorElbowImage}
              alt="Posterior elbow impingement illustration"
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
            <SectionTitle title="What is Posterior Elbow Impingement?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Posterior elbow impingement occurs when soft tissue or bony structures at the
              back of the elbow joint are pinched or compressed as the elbow reaches full
              extension. This is most common in athletes who repeatedly and forcefully extend
              the elbow — throwers, boxers, gymnasts, and racket sport players — where
              high-velocity extension creates intense posterior compartment impact forces.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Over time, these repeated impingement forces cause characteristic changes:
              osteophyte formation on the olecranon tip, loose body development within the
              joint, posterior capsule thickening, and olecranon fossa impaction — culminating
              in sharp pain at terminal extension and significant athletic performance
              limitation.
            </p>

            {/* Condition types */}
            <div className="space-y-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded mb-2">
                  Bony Impingement
                </span>
                <p className="font-semibold text-gray-900 text-sm mb-2">Olecranon Osteophytes & Loose Bodies</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Bony spurs forming at the olecranon tip</li>
                  <li>• Hard mechanical block to terminal extension</li>
                  <li>• Loose bodies causing clicking and intermittent locking</li>
                  <li>• Most common in chronic, high-volume throwers and boxers</li>
                  <li>• May require arthroscopic surgery in advanced cases</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-green-600 text-white px-2 py-0.5 rounded mb-2">
                  Soft Tissue Impingement
                </span>
                <p className="font-semibold text-gray-900 text-sm mb-2">Posterior Capsule & Valgus Extension Overload</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Posterior capsule thickening and scarring</li>
                  <li>• Soft tissue end-feel limiting terminal extension</li>
                  <li>• Posteromedial impingement in throwing athletes</li>
                  <li>• Often concurrent with MCL insufficiency</li>
                  <li>• Responds very well to physiotherapy alone</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-r-xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-amber-700">🥊 Also known as "Boxer's Elbow":</strong>{" "}
                Boxers repeatedly extend the elbow forcefully with every punch — driving the
                olecranon tip into the olecranon fossa thousands of times per training career.
                The same mechanism occurs in any sport requiring rapid, forceful elbow
                extension: baseball, cricket, gymnastics, tennis, and javelin.
              </p>
            </div>
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

        {/* Sports grid */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">Sports With the Highest Risk</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🥊", label: "Boxing / MMA",          desc: "Repetitive forceful extension punching" },
              { icon: "⚾", label: "Baseball Pitching",     desc: "Posteromedial valgus extension overload" },
              { icon: "🤸", label: "Gymnastics",            desc: "Weight-bearing extension and vaulting" },
              { icon: "🎾", label: "Tennis / Racket Sports", desc: "Serve and smash mechanics" },
              { icon: "🏸", label: "Overhead Athletes",     desc: "Javelin, cricket, handball" },
              { icon: "🏋️", label: "Weightlifting",        desc: "Snatch, push press, overhead press" },
            ].map((s, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <span className="text-2xl block mb-1">{s.icon}</span>
                <p className="font-semibold text-blue-700 text-sm mb-0.5">{s.label}</p>
                <p className="text-xs text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Posterior Elbow Impingement" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Posterior elbow impingement is fundamentally a condition of repetitive mechanical
          overload. Prevention centres on load management, mechanics optimisation, and
          strength conditioning of the dynamic elbow stabilisers.
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
        <SectionTitle title="How We Treat Posterior Elbow Impingement at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Our physiotherapy approach combines hands-on decompression of the posterior
          compartment with progressive strengthening and sport mechanics correction.
          Treatment is always tailored to your specific presentation.
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
            <strong className="text-gray-900">Important:</strong> Posterior elbow impingement
            should be assessed early — before osteophyte formation and loose body development
            make the condition more complex to manage. If you are experiencing posterior elbow
            pain at terminal extension, a progressive loss of elbow straightening, or pain
            that limits your throwing, punching, or gymnastics performance, please book a
            consultation with our physiotherapy team for an accurate diagnosis and personalised
            treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Get Back to Full Extension?
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

export default PosteriorElbowImpingement;