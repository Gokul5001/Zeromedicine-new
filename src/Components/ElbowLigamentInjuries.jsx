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
import elbowligamentimage from "../assets/Elbow_ligament.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Elbow Ligament Injuries blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Medial or lateral elbow pain — localised to the affected ligament, often point-specific on palpation",
  "Pain at the moment of injury — a sudden pop or tearing sensation, particularly in acute complete tears",
  "Swelling and bruising around the medial or lateral elbow — depending on which complex is injured",
  "Feeling of instability — the elbow feels loose, \"wobbly,\" or gives way during loading or throwing",
  "Pain reproduced by valgus stress test (MCL) or varus and posterolateral drawer tests (LCL)",
  "In throwing athletes: a characteristic \"dead arm\" or sudden loss of velocity and accuracy at release",
  "Reduced elbow range of motion — guarding against movement that stresses the injured ligament",
  "In UCL insufficiency: medial elbow aching that builds progressively through a throwing session",
];

const PREVENTION = [
  { title: "Implement Pitch & Throw Count Limits", desc: "Adhering strictly to evidence-based pitch count guidelines and mandatory rest days is the single most effective prevention strategy for UCL injuries." },
  { title: "Strengthen the Flexor–Pronator Group", desc: "These muscles are the primary dynamic stabilisers of the medial elbow. Strong, well-conditioned flexor–pronators dramatically reduce peak valgus load on the UCL at ball release." },
  { title: "Correct Throwing Mechanics Early",  desc: "Faults such as the \"inverted W\" arm position or early trunk rotation place abnormal valgus stress on the medial elbow with every throw." },
  { title: "Avoid Year-Round Single-Sport Specialisation", desc: "Early specialisation in throwing sports is a major driver of UCL injury risk in adolescents. Multiple sports and off-season rest reduce cumulative stress." },
  { title: "Monitor Early Symptoms & Respond Fast", desc: "The UCL degenerates progressively before complete rupture. Early medial elbow aching with throwing requires prompt assessment and load reduction." },
  { title: "Build Proprioception & Dynamic Stability", desc: "Perturbation training and reactive stability drills improve neuromuscular protection of elbow ligaments during unpredictable competitive loads." },
];

const TREATMENTS = [
  { title: "Manual Therapy & Joint Mobilisation", desc: "Restores elbow ROM in a protected range during healing, avoiding ligament stress, and addresses compensatory stiffness in the shoulder and wrist." },
  { title: "MFR & Soft Tissue Release",       desc: "Release of the flexor–pronator group (MCL) or lateral extensor complex (LCL) addresses protective muscle guarding and tightness." },
  { title: "Dry Needling",                    desc: "Targets trigger points in the flexor–pronator or lateral compartment muscles, restoring neuromuscular activation for dynamic ligament support." },
  { title: "Cupping Therapy",                 desc: "Applied to medial or lateral forearm musculature to reduce post-injury tightness and support tissue recovery around the ligament complex." },
  { title: "Dynamic Stabiliser Strengthening", desc: "Flexor–pronator (MCL) or supinator–extensor (LCL) strengthening, progressing from isometric to sport-specific patterns." },
  { title: "Proprioception & Neuromuscular Training", desc: "Joint position sense, perturbation training, and reactive stability exercises restore the neural reflexes that protect ligaments." },
  { title: "Taping & Bracing",                desc: "Functional bracing and taping protect the recovering ligament during rehab and early return to sport while allowing progressive loading." },
  { title: "Post-Surgical Rehabilitation (Tommy John)", desc: "A highly structured 12–18 month protocol following UCL reconstruction, coordinated with the surgical team at every stage." },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const ElbowLigamentInjuries = () => {
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
                Elbow Ligament Injuries
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              The stabilising ligaments of the elbow are among the most stressed structures
              in throwing and overhead sport — when they are injured, the right
              rehabilitation approach determines whether an athlete returns fully to
              competition or not.
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
    src={elbowligamentimage}
    alt="Elbow ligament injury illustration"
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
            <SectionTitle title="What are Elbow Ligament Injuries?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              The elbow joint is stabilised by a complex of ligaments that resist the forces
              generated during movement, loading, and throwing. The two primary ligament
              complexes are the medial collateral ligament (MCL — also called the ulnar
              collateral ligament, UCL) on the inner side, and the lateral collateral
              ligament (LCL) complex on the outer side. Injuries range from mild sprains to
              complete ruptures.
            </p>

            {/* MCL vs LCL */}
            <div className="space-y-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded mb-2">
                  MCL / UCL
                </span>
                <p className="font-semibold text-gray-900 text-sm mb-2">Medial Collateral Ligament</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Runs from medial epicondyle to coronoid process</li>
                  <li>• Primary restraint to valgus (inward) stress</li>
                  <li>• Most commonly injured elbow ligament</li>
                  <li>• Classic in overhead throwing athletes</li>
                  <li>• Three bands: anterior oblique (key), posterior oblique, transverse</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-green-600 text-white px-2 py-0.5 rounded mb-2">
                  LCL Complex
                </span>
                <p className="font-semibold text-gray-900 text-sm mb-2">Lateral Collateral Ligament</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Includes RCL, LUCL, and annular ligament</li>
                  <li>• Primary restraint to varus and rotatory stress</li>
                  <li>• LUCL key for posterolateral rotatory stability</li>
                  <li>• Less commonly injured than MCL</li>
                  <li>• Often injured with elbow dislocation</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-r-xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-amber-700">Tommy John surgery — UCL reconstruction:</strong>{" "}
                Complete UCL tears in throwing athletes typically require surgical
                reconstruction — known as Tommy John surgery — replacing the torn UCL with a
                tendon graft. It requires a 12–18 month rehabilitation programme, making
                physiotherapy central to the outcome. Physiotherapy is also the primary
                treatment for Grade I and II MCL injuries, often avoiding surgery entirely.
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

        {/* Severity grading */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Grade I</p>
            <p className="font-semibold text-gray-900 mb-2">Mild Sprain</p>
            <p className="text-sm text-gray-600">Microtrauma, ligament intact, localised tenderness, no instability.</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Grade II</p>
            <p className="font-semibold text-gray-900 mb-2">Partial Tear</p>
            <p className="text-sm text-gray-600">Significant fibre disruption, mild instability, moderate pain and swelling.</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Grade III</p>
            <p className="font-semibold text-gray-900 mb-2">Complete Rupture</p>
            <p className="text-sm text-gray-600">Full tear, gross instability, significant functional deficit, surgical evaluation required.</p>
          </div>
        </div>

        {/* High-risk sports */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">Sports With the Highest Risk</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "⚾", label: "Baseball", desc: "Pitchers — repetitive valgus stress" },
              { icon: "🏏", label: "Cricket", desc: "Fast bowlers — medial elbow load" },
              { icon: "🥎", label: "Javelin", desc: "Release phase valgus torque" },
              { icon: "🎾", label: "Tennis", desc: "Serve — medial elbow stress" },
              { icon: "🏸", label: "Badminton", desc: "Overhead smash loading" },
              { icon: "🤸", label: "Gymnastics", desc: "Weight-bearing & vaulting" },
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
        <SectionTitle title="How to Prevent Elbow Ligament Injuries" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Elbow ligament injuries — particularly UCL injuries in throwers — are among the
          most preventable injuries in sport with appropriate load management and
          biomechanical preparation.
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
        <SectionTitle title="How We Treat Elbow Ligament Injuries at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Treatment is guided by the grade of injury, ligament involved, patient age, and
          functional goals. Grade I and II MCL injuries are managed conservatively with
          excellent outcomes; Grade III tears in throwing athletes typically require surgical
          reconstruction followed by intensive physiotherapy rehabilitation.
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
            <strong className="text-gray-900">Important:</strong> Elbow ligament injuries
            vary significantly in severity and the optimal management approach depends on
            accurate diagnosis — including clinical stress testing and MRI confirmation where
            indicated. If you are a throwing athlete experiencing medial elbow pain, or have
            sustained an acute elbow injury with instability, please book a consultation with
            our physiotherapy team for expert assessment and a tailored rehabilitation programme.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Get Back to Full Strength?
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

export default ElbowLigamentInjuries;