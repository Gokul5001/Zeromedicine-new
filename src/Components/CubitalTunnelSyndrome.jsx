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
import cubitaltunnelimage from "../assets/Cubital_tunnel.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Cubital Tunnel Syndrome blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Aching pain on the inner side of the elbow — at or just posterior to the medial epicondyle",
  "Numbness, tingling, or pins-and-needles in the ring and little fingers — often the first and most prominent symptom",
  "Symptoms worsened by sustained elbow flexion — phone use, driving, sleeping with a bent elbow",
  "Nocturnal symptoms — waking at night with numb or tingling ring and little fingers is highly characteristic",
  "Weakness of grip and pinch — difficulty with fine motor tasks, opening jars, or turning keys",
  "In moderate cases: clumsiness of the hand, difficulty with precision tasks",
  "In severe cases: visible wasting of the hypothenar muscles and interossei — flattening of the palm",
  "Positive Tinel's sign — tapping over the cubital tunnel reproduces tingling in the ring and little fingers",
];

const PREVENTION = [
  { title: "Avoid Prolonged Elbow Flexion",   desc: "Use a headset or speakerphone instead of cradling the phone with a bent elbow. Keep the elbow supported at or near 90° rather than fully flexed." },
  { title: "Pad Hard Resting Surfaces",       desc: "Driving with the elbow on the window, or leaning on a desk, compresses the cubital tunnel directly. Foam elbow pads or padded arm rests reduce this pressure." },
  { title: "Modify Sleep Position",           desc: "Sleeping with the elbow deeply flexed under a pillow is a common cause of nocturnal symptoms. Train yourself to sleep with a straighter elbow, or wrap a soft towel around it." },
  { title: "Take Breaks from Elbow Flexion",  desc: "Musicians, cyclists, and anyone with prolonged bent-elbow tasks should build regular extension breaks into their schedule to decompress the ulnar nerve." },
  { title: "Practise Nerve Gliding Exercises", desc: "Regular ulnar nerve gliding maintains mobility within the cubital tunnel and prevents the neural adhesions that contribute to entrapment." },
  { title: "Address Elbow Issues Early",      desc: "Ganglion cysts, post-traumatic swelling, or medial epicondyle enthesopathy reduce space in the cubital tunnel. Early treatment of these is an important preventive strategy." },
];

const TREATMENTS = [
  { title: "Neural Mobilisation — Ulnar Nerve Gliding", desc: "Ulnar nerve slider and tensioner exercises mobilise the nerve within the cubital tunnel and restore its ability to glide freely during elbow movement." },
  { title: "Manual Therapy & Elbow Mobilisation",       desc: "Elbow joint mobilisation restores full extension range and reduces cubital tunnel stress, combined with cervical and thoracic assessment to exclude double crush syndrome." },
  { title: "MFR — Flexor–Pronator & Arcade of Struthers", desc: "Targeted myofascial release of the flexor–pronator group and the arcade of Struthers reduces tethering and traction irritation of the ulnar nerve." },
  { title: "Dry Needling",                              desc: "Applied to the flexor carpi ulnaris and medial forearm trigger points to reduce muscle guarding and the compressive environment around the nerve." },
  { title: "Cupping Therapy",                           desc: "Applied to the medial forearm and elbow region to reduce fascial tightness and improve local circulation around the cubital tunnel." },
  { title: "Electrotherapy (TENS / IFT)",               desc: "For pain management at the medial elbow and reduction of nerve-related hypersensitivity in the acute and moderate phases." },
  { title: "Home Neural Gliding Programme",             desc: "A personalised daily ulnar nerve gliding programme maintains the neural mobility gains achieved during treatment and prevents recurrence." },
  { title: "Ergonomic & Postural Modification",         desc: "Workstation assessment, phone use guidance, and driving position correction eliminate the external compression factors that perpetuate irritation." },
  { title: "Intrinsic Hand Strengthening",              desc: "Progressive interossei and hypothenar muscle strengthening rebuilds hand strength lost through ulnar nerve dysfunction." },
  { title: "Cervical Spine Assessment & Treatment",     desc: "A double crush phenomenon — compression at both neck and elbow — worsens prognosis and must be treated simultaneously for full resolution." },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const CubitalTunnelSyndrome = () => {
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
                Cubital Tunnel Syndrome
              </span>
            </h1>

            <p className="text-sm text-gray-500 italic mb-4">
              Ulnar Nerve Entrapment at the Elbow — the "Funny Bone" Nerve
            </p>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              The second most common peripheral nerve entrapment in the upper limb —
              producing the characteristic tingling in the ring and little fingers that
              many dismiss until it becomes significant weakness.
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
    src={cubitaltunnelimage}
    alt="Cubital tunnel syndrome illustration"
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
            <SectionTitle title="What is Cubital Tunnel Syndrome?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Cubital tunnel syndrome is the compression or traction of the ulnar nerve as
              it passes through the cubital tunnel — a narrow fibromuscular channel on the
              inner side of the elbow, just posterior to the medial epicondyle. The ulnar
              nerve supplies motor function to the intrinsic hand muscles and sensation to
              the ring and little fingers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When the nerve is compressed or stretched at this site — due to sustained
              elbow flexion, direct pressure, anatomical factors, or inflammatory thickening
              of the cubital tunnel — it produces inner elbow aching, ring and little finger
              tingling, and in more severe cases, significant hand weakness.
            </p>
            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-r-xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-amber-700">The "funny bone" explained:</strong>{" "}
                The electric jolt you feel knocking your elbow is the ulnar nerve being
                struck where it's most exposed in the cubital tunnel. In cubital tunnel
                syndrome the nerve is chronically compressed or stretched rather than
                acutely struck — producing persistent, progressive symptoms instead of a
                momentary jolt.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              It's second only to carpal tunnel syndrome in prevalence among peripheral
              nerve entrapments — and is significantly underdiagnosed, with many patients
              attributing symptoms to "tiredness" in the hand before getting the correct
              diagnosis.
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

        {/* Aggravating activities */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Activities & Positions That Aggravate It
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "📱", label: "Phone Use", desc: "Prolonged elbow flexion" },
              { icon: "🚗", label: "Driving", desc: "Elbow resting on window" },
              { icon: "💻", label: "Desk Work", desc: "Elbow on hard surface" },
              { icon: "😴", label: "Sleeping", desc: "Elbow bent under pillow" },
              { icon: "🏋️", label: "Weightlifting", desc: "Sustained elbow flexion" },
              { icon: "🎸", label: "Musicians", desc: "Prolonged instrument playing" },
            ].map((a, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <span className="text-2xl block mb-1">{a.icon}</span>
                <p className="font-semibold text-blue-700 text-sm mb-0.5">{a.label}</p>
                <p className="text-xs text-gray-600">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Severity grading */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Mild</p>
            <p className="font-semibold text-gray-900 mb-2">Intermittent</p>
            <p className="text-sm text-gray-600">Tingling with provocation only — fully resolves. No weakness.</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Moderate</p>
            <p className="font-semibold text-gray-900 mb-2">Persistent</p>
            <p className="text-sm text-gray-600">Regular numbness and tingling. Early grip weakness may be present.</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Severe</p>
            <p className="font-semibold text-gray-900 mb-2">Constant</p>
            <p className="text-sm text-gray-600">Constant symptoms, significant weakness, intrinsic wasting. Surgical referral indicated.</p>
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Cubital Tunnel Syndrome" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Cubital tunnel syndrome is largely driven by sustained elbow flexion and direct
          nerve compression — both of which are highly modifiable with the right habits and
          awareness.
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
        <SectionTitle title="How We Treat Cubital Tunnel Syndrome at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Physiotherapy is the first-line treatment for mild to moderate cubital tunnel
          syndrome and produces excellent outcomes when initiated early. Severe cases with
          significant weakness or intrinsic muscle wasting require prompt surgical referral,
          with physiotherapy playing a critical role in pre- and post-operative management.
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
            <strong className="text-gray-900">Important:</strong> Cubital tunnel syndrome
            requires accurate diagnosis to differentiate it from cervical radiculopathy,
            carpal tunnel syndrome, and medial epicondylalgia. If you are experiencing
            persistent tingling in your ring and little fingers, inner elbow aching, or hand
            weakness, please book a consultation with our physiotherapy team for a thorough
            neurological assessment and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Relieve Your Nerve Symptoms?
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

export default CubitalTunnelSyndrome;