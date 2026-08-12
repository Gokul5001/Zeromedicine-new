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
import elbowinstabilityimage from "../assets/Elbow_instability.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Elbow Instability blog content)
───────────────────────────────────────────── */

const INSTABILITY_TYPES = [
  {
    badge: "Most Common",
    title: "Posterolateral Rotatory Instability (PLRI)",
    points: [
      "LUCL insufficiency — key lateral stabiliser",
      "Lateral ulna rotates away from humerus",
      "Often follows elbow dislocation or lateral epicondyle surgery",
      "Positive lateral pivot shift test",
      "Apprehension with forearm supination under axial load",
    ],
  },
  {
    badge: "Throwers",
    title: "Valgus Instability (MCL Insufficiency)",
    points: [
      "UCL/MCL attenuation from repetitive throwing",
      "Medial gapping under valgus stress",
      "Most common in overhead throwing athletes",
      "Positive moving valgus stress test",
      "Often co-exists with posterior impingement",
    ],
  },
  {
    badge: "Less Common",
    title: "Varus Posteromedial Rotatory Instability",
    points: [
      "Anteromedial coronoid fracture pattern",
      "LCL complex and MCL involvement",
      "Associated with terrible triad injuries",
      "Requires surgical fixation in most cases",
      "Post-operative physio is intensive",
    ],
  },
  {
    badge: "Post-Dislocation",
    title: "Simple & Complex Dislocation Instability",
    points: [
      "Following elbow dislocation — MCL, LCL both torn",
      "Terrible triad: dislocation + radial head + coronoid fracture",
      "Requires structured rehabilitation after reduction",
      "High risk of chronic instability without thorough rehab",
      "Surgical stabilisation for complex patterns",
    ],
  },
];

const SYMPTOMS = [
  "A sense of the elbow being loose, giving way, or feeling unreliable during loading or sport",
  "Apprehension — fear of the elbow displacing during pushing, weight-bearing, or rotational activities",
  "Pain with specific loading positions — particularly forearm supination under axial load (PLRI) or valgus stress (MCL)",
  "Clicking, clunking, or catching sensations during movement — particularly in PLRI",
  "Weakness and reduced function in the affected arm — particularly with pushing or overhead activities",
  "Recurrent subluxation episodes — particularly in gymnasts, throwers, or manual workers",
  "Swelling and aching after activity — secondary to the abnormal loading patterns during instability episodes",
  "Difficulty with weight-bearing through the arm — push-ups, yoga, gymnastics, or manual work",
];

const PREVENTION = [
  {
    title: "Complete Full Rehabilitation After Any Elbow Dislocation",
    desc: "Inadequate rehabilitation after acute elbow dislocation is the leading cause of chronic instability. Full ligament healing, complete strength restoration, and proprioception retraining must be achieved before return to sport or manual work.",
  },
  {
    title: "Strengthen the Dynamic Elbow Stabilisers",
    desc: "The flexor–pronator muscles (medial) and supinator–extensor muscles (lateral) provide dynamic support that supplements — and in some cases compensates for — ligamentous laxity. Progressive, sport-specific strengthening is the most durable protection.",
  },
  {
    title: "Implement Throwing Load Management",
    desc: "Chronic UCL attenuation from repetitive throwing is a preventable cause of valgus instability. Pitch count limits, adequate rest between sessions, and progressive loading build UCL resilience while preventing cumulative microtrauma.",
  },
  {
    title: "Address Preceding Elbow Pathology Early",
    desc: "Lateral epicondylalgia requiring surgery, radial head fractures, or coronoid injuries can damage the lateral or medial ligament complexes. Seeking physiotherapy and ensuring complete healing before return to full loading prevents iatrogenic instability.",
  },
  {
    title: "Develop Elbow Proprioception & Neuromuscular Control",
    desc: "Reflex muscle activation at the elbow is critical for joint protection during unpredictable loading in sport. Perturbation training and reactive elbow stability exercises significantly improve the dynamic protective response.",
  },
  {
    title: "Use Protective Bracing During Return to Sport",
    desc: "Functional elbow bracing during the return-to-sport phase protects recovering ligaments from the sudden loading events that can cause re-injury before dynamic stability has been fully restored through rehabilitation.",
  },
];

const REHAB_PHASES = [
  {
    phase: "Phase 1 — Acute Management (Weeks 0–3)",
    title: "Stability, Protection & Early Activation",
    desc: "Protected mobilisation within a stable arc of motion. Acute swelling and pain management with electrotherapy and ice. Early activation of dynamic stabilisers in safe, pain-free positions. Bracing prescription where indicated.",
  },
  {
    phase: "Phase 2 — Dynamic Stabilisation (Weeks 3–10)",
    title: "Targeted Muscle Strengthening",
    desc: "Progressive flexor–pronator strengthening (MCL instability) or supinator–extensor strengthening (LUCL instability). Isometric exercises progress to isotonic and then functional loading. Joint mobilisation to restore full ROM.",
  },
  {
    phase: "Phase 3 — Neuromuscular Control (Weeks 10–20)",
    title: "Proprioception & Reactive Stability Training",
    desc: "Elbow perturbation training, closed-chain weight-bearing exercises, and reactive stability drills. Sport-specific loading patterns introduced. Throwing or sport mechanics correction where applicable.",
  },
  {
    phase: "Phase 4 — Return to Sport / Work (Months 5–12+)",
    title: "Full Functional Restoration",
    desc: "Graduated return to sport-specific activities — throwing programme, gymnastics loading, or occupational tasks. Functional bracing during initial return. Maintenance strength programme established.",
  },
];

const TREATMENTS = [
  {
    title: "Dynamic Stabiliser Strengthening",
    desc: "Progressive flexor–pronator (MCL) or supinator–ECRB (LCL) strengthening — the primary physiotherapy strategy, specifically targeting the muscles whose function most closely replicates the insufficient ligament's stabilising role.",
  },
  {
    title: "Neuromuscular & Proprioceptive Training",
    desc: "Elbow joint position sense training, perturbation exercises, and reactive stability drills — essential for restoring the reflex muscle activation that protects the joint during sudden unexpected loading events.",
  },
  {
    title: "Manual Therapy & Joint Mobilisation",
    desc: "Guided joint mobilisation within the stable arc — restoring full elbow mobility that has been lost through protective guarding, without placing stress on the insufficient ligamentous structures.",
  },
  {
    title: "MFR & Soft Tissue Release",
    desc: "Release of post-injury or post-surgical soft tissue restrictions — addressing capsular tightness and muscle guarding that develop secondary to instability and limit functional recovery.",
  },
  {
    title: "Dry Needling",
    desc: "Targets trigger points in the flexor–pronator and lateral stabiliser muscles — reduces pain and neuromuscular inhibition, restoring the quality and speed of the protective muscle activation response.",
  },
  {
    title: "Taping & Functional Bracing",
    desc: "Sport-specific elbow bracing and kinesio-taping techniques to protect the unstable compartment during rehabilitation and initial return to sport — providing external support while dynamic stability is being built.",
  },
  {
    title: "Closed-Chain Elbow Loading",
    desc: "Progressive weight-bearing through the upper limb — push-up progressions, quadruped exercises, and gymnastic-specific loading — to build the co-contraction patterns that provide functional elbow stability.",
  },
  {
    title: "Post-Surgical Rehabilitation",
    desc: "Following ligament reconstruction or stabilisation surgery, a precisely structured multi-phase protocol is followed — coordinating with the surgical team from early mobilisation through to return to full sport competition.",
  },
];

const RETURN_CRITERIA = [
  "Full pain-free ROM",
  "Strength symmetry ≥90%",
  "Negative apprehension test",
  "Proprioception symmetry",
  "Sport-specific load tolerated",
  "Psychological readiness",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const ElbowInstability = () => {
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
                Elbow Instability
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              When the elbow feels loose, gives way, or lacks confidence during loading —
              explained by your physiotherapy team at Zeromedixine.
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
              src={elbowinstabilityimage}
              alt="Elbow instability illustration"
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
            <SectionTitle title="What is Elbow Instability?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Elbow instability refers to abnormal or excessive movement of the elbow joint — where
              the articulating surfaces of the humerus, radius, and ulna are unable to maintain their
              normal positional relationship during loading and movement. It can present as true
              subluxation (partial dislocation), apprehension (a sense of impending displacement), or
              functional giving way during specific activities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The elbow's stability depends on a complex interplay of <strong>static stabilisers</strong>{" "}
              (ligaments, joint capsule, bony articulations) and <strong>dynamic stabilisers</strong>{" "}
              (muscles crossing the joint). When one or more static stabilisers are compromised — through
              acute dislocation, ligament attenuation, or chronic repetitive microtrauma — the dynamic
              stabilisers must compensate.
            </p>

            {/* Instability types */}
            <h3 className="text-base font-semibold text-gray-800 mt-6 mb-3">
              The four main patterns of elbow instability:
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {INSTABILITY_TYPES.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                >
                  <span className="inline-block text-xs font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded mb-2">
                    {t.badge}
                  </span>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{t.title}</p>
                  <ul className="space-y-1">
                    {t.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                        <CheckCircle size={13} className="text-green-500 shrink-0 mt-0.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Dislocation callout */}
            <div className="mt-4 bg-gray-800 rounded-xl p-5 flex gap-3 items-start">
              <span className="text-2xl shrink-0">⚡</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-blue-300">Elbow Dislocation — The Most Common Cause:</strong>{" "}
                The elbow is the second most commonly dislocated large joint in adults (after the shoulder).
                Without thorough post-reduction physiotherapy, persistent instability, stiffness, and
                functional limitation are common sequelae.
              </p>
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-r-xl p-4 mb-6 text-sm text-gray-700 leading-relaxed">
              <strong className="text-amber-700">🔍 Key Clinical Sign — Apprehension:</strong>{" "}
              A hallmark of elbow instability is apprehension — a subjective sense of impending
              displacement or "something about to give" during specific movements. Patients describe
              the elbow as feeling "loose," "unreliable," or "like it might pop out." This is a
              primary target of our rehabilitation programme.
            </div>

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
        <SectionTitle title="How to Prevent Elbow Instability" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Elbow instability is most effectively prevented through comprehensive rehabilitation after
          any elbow injury and by building the dynamic stabiliser strength that protects ligaments
          from progressive attenuation during repetitive loading activities.
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



      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> Elbow instability is a complex
            condition requiring accurate classification — the type of instability determines the
            specific muscles, techniques, and bracing strategies used in rehabilitation. If you
            experience the feeling of your elbow giving way, apprehension during loading, or
            recurrent subluxation episodes, please book a consultation with our physiotherapy team
            for expert assessment and a personalised stability rehabilitation programme.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Restore Your Elbow Stability?
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

export default ElbowInstability;