import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import patellarTendonitisImage from "../assets/patellar-tendonitis.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Patellar Tendonitis blog)
───────────────────────────────────────────── */

const HERO_STATS = [
  { icon: "🏀", strong: "Jumper's Knee",     label: "Basketball, volleyball, athletics" },
  { icon: "📈", strong: "Overuse Injury",     label: "Load exceeds tendon capacity" },
  { icon: "💪", strong: "Loading is the Cure", label: "Progressive tendon rehab" },
];

const VISA_BANDS = [
  { score: "80–100", label: "Mild — symptoms only with heavy sport loading" },
  { score: "50–80",  label: "Moderate — symptoms affect training and sport" },
  { score: "<50",    label: "Severe — pain limits daily activities and sport" },
];

const AGG_ACTIVITIES = [
  { icon: "🏀", name: "Jumping",           sub: "High eccentric quad load" },
  { icon: "🏃", name: "Running",           sub: "Repetitive tendon loading" },
  { icon: "🏋️", name: "Squatting",        sub: "Deep knee bend under load" },
  { icon: "🪜", name: "Stairs",            sub: "Eccentric quad deceleration" },
  { icon: "🚴", name: "Cycling",           sub: "Sustained quad loading" },
  { icon: "🪑", name: "Prolonged Sitting", sub: "Compressive tendon load" },
];

const SYMPTOMS = [
  "Pain at the inferior pole of the patella — localised, point-tender on palpation",
  "Pain that is worse at the start of activity, often eases with warm-up, then returns after cooling down",
  "Progressive worsening with increasing training loads — particularly jumping and sprinting volume",
  "Morning stiffness at the tendon that eases within minutes of activity",
  "Reduced jumping performance and power — the tendon fails to store and release energy efficiently",
  "Pain with deep squatting, lunging, and stair descent",
  "Chronic cases: constant pain that no longer resolves with warm-up, affecting daily activities",
];

const PREVENTION = [
  {
    title: "Progressively Load the Patellar Tendon in Training",
    desc: "Avoid sudden spikes in jumping volume, sprint distance, or training intensity. Tendons adapt slowly — over weeks, not days. The 10% rule is a minimum; tendon loading should be even more gradual.",
  },
  {
    title: "Include Heavy Slow Resistance (HSR) Training",
    desc: "Progressive quadriceps strengthening through heavy loaded squats and leg press builds tendon capacity and resilience. This is the most effective long-term prevention strategy for athletes.",
  },
  {
    title: "Warm Up Thoroughly Before Jumping and Sprint Sessions",
    desc: "Isometric quad holds before training reduce tendon pain and prepare the patellar tendon for the high forces of explosive sport movements.",
  },
  {
    title: "Ensure Adequate Recovery Between High-Volume Sessions",
    desc: "The patellar tendon requires 48–72 hours to fully recover from high-load jumping sessions. Back-to-back heavy training days without recovery is a key risk factor.",
  },
  {
    title: "Monitor for Early Warning Signs",
    desc: "A VISA-P score below 80, or pain the morning after training that rates above 3/10, signals that load is exceeding tendon capacity. Reduce training load immediately and seek physiotherapy.",
  },
  {
    title: "Avoid Training on Hard Surfaces Excessively",
    desc: "Concrete and other hard training surfaces increase impact forces transmitted through the patellar tendon. Varying training surfaces reduces cumulative tendon stress.",
  },
  {
    title: "Address Quad and Calf Flexibility",
    desc: "Tight quadriceps and gastrocnemius increase the compressive load on the patellar tendon during knee flexion activities. Regular flexibility maintenance is a simple but effective preventive measure.",
  },
  {
    title: "Strengthen the Full Kinetic Chain",
    desc: "Hip, glute, and calf strength reduce the quad's overreliance as the primary force producer during jumping and landing, lowering the peak loading on the patellar tendon.",
  },
];

const REHAB_PHASES = [
  {
    phase: "Phase 1",
    title: "Isometric Loading",
    desc: "45° Spanish squat holds and leg press isometrics — provide immediate pain relief and begin neural drive restoration without reactive tendon loading.",
  },
  {
    phase: "Phase 2",
    title: "Isotonic Loading",
    desc: "Slow heavy squats, leg press, and decline board squats — drive tendon collagen remodelling through progressive compressive and tensile load.",
  },
  {
    phase: "Phase 3",
    title: "Energy Storage Loading",
    desc: "Bounding, skipping, and plyometric exercises — restore the tendon's ability to store and release elastic energy during sport movements.",
  },
  {
    phase: "Phase 4",
    title: "Return to Sport",
    desc: "Full jumping, landing, and sport-specific training reintroduced progressively — guided by VISA-P score and symptom response.",
  },
];

const HANDS_ON_TREATMENTS = [
  {
    title: "Dry Needling / Trigger Point Needling",
    desc: "Highly effective for patellar tendinopathy — needling into the tendon and surrounding quadriceps trigger points reduces pain, stimulates a local healing response, and restores neuromuscular activation.",
  },
  {
    title: "Extracorporeal Shockwave Therapy (ESWT)",
    desc: "Strong clinical evidence for chronic patellar tendinopathy — high-energy acoustic waves stimulate collagen synthesis, disrupt pathological neovascularisation, and promote tendon structural remodelling.",
  },
  {
    title: "Myofascial Release (MFR)",
    desc: "Release of the quadriceps muscle, retropatellar tissue, and patellar fat pad — reduces compressive forces on the patellar tendon at the inferior pole during knee flexion activities.",
  },
  {
    title: "Cupping Therapy",
    desc: "Decompressive cupping to the quadriceps and patellar region to improve local circulation, reduce chronic tissue tightness, and support the tendon's biological healing environment.",
  },
  {
    title: "Electrotherapy (Ultrasound / TENS)",
    desc: "Therapeutic ultrasound to stimulate tenocyte activity and reduce pathological tendon changes; TENS for pain management to facilitate earlier active loading.",
  },
  {
    title: "Patellar Tendon Taping",
    desc: "Infrapatellar taping techniques to reduce tendon load and pain during the rehabilitation process — particularly effective during the transition back to jumping activities.",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const PatellarTendonitis = () => {
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
          Knee Pain Conditions
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Knee Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-2">
              Patellar{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Tendonitis
              </span>
            </h1>

            <p className="text-sm text-gray-400 italic mb-4">
              Also known as Jumper's Knee · Clinically: Patellar Tendinopathy
            </p>

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              A progressive overuse injury of the patellar tendon — common in jumping and running
              athletes, and notoriously stubborn without the right treatment approach. We know exactly
              how to fix it.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {HERO_STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <span className="text-xl">{s.icon}</span>
                  <div className="text-xs leading-tight">
                    <strong className="block text-green-700">{s.strong}</strong>
                    <span className="text-gray-500">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/knee-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Knee Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            <img
              src={patellarTendonitisImage}
              alt="Patellar tendonitis knee illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Patellar Tendonitis?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Patellar tendonitis — more accurately termed <strong>patellar tendinopathy</strong> —
              is a painful overuse condition affecting the patellar tendon, the thick cord of tissue
              connecting the <strong>patella (kneecap) to the tibial tuberosity</strong> (the bony
              bump just below the knee). This tendon transmits the enormous forces generated by the
              quadriceps muscle to extend the knee — making it vulnerable to overload in jumping and
              running athletes.
            </p>

            {/* Anatomy callout */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-5 flex gap-4 items-start">
              <span className="text-4xl shrink-0">🦵</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">The Patellar Tendon</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The patellar tendon runs from the <strong>inferior pole of the patella</strong> to
                  the tibial tuberosity. Pain in patellar tendinopathy is typically located at the{" "}
                  <strong>inferior patellar pole</strong> — the point where the tendon attaches to
                  the bottom of the kneecap. This is the most common site of tendon failure under
                  repetitive eccentric loading.
                </p>
              </div>
            </div>

            {/* Tendinitis vs Tendinopathy */}
            <div className="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-700 rounded-r-xl p-4 text-sm text-gray-800 leading-relaxed mb-5">
              <strong className="text-blue-800">Tendinitis vs Tendinopathy — An Important Distinction:</strong>{" "}
              The term "tendonitis" implies acute inflammation, but research shows that chronic
              patellar tendon pain involves degenerative changes within the tendon structure rather
              than classic inflammation. The more accurate clinical term is{" "}
              <strong>tendinopathy</strong> — a failed healing response producing disorganised
              collagen, neovascularisation, and pain. This distinction matters because
              anti-inflammatory treatments alone are insufficient — the tendon needs{" "}
              <em>progressive loading</em> to remodel and heal.
            </div>

            {/* VISA-P strip */}
            <p className="font-semibold text-gray-800 mb-3 text-sm">Patellar tendinopathy severity — VISA-P Score (0–100):</p>
            <div className="grid grid-cols-3 rounded-xl overflow-hidden border border-green-200 mb-5">
              {VISA_BANDS.map((b, i) => (
                <div key={i} className="bg-green-50 px-3 py-3 text-center border-r border-green-200 last:border-0">
                  <span className="block text-xl font-bold text-green-600 leading-none mb-1">{b.score}</span>
                  <span className="text-xs text-gray-600 leading-snug">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Aggravating activities */}
            <p className="font-semibold text-gray-800 mb-3 text-sm">Activities that aggravate patellar tendinopathy:</p>
            <div className="grid grid-cols-3 gap-2">
              {AGG_ACTIVITIES.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-3 text-center"
                >
                  <span className="text-2xl block mb-1">{a.icon}</span>
                  <strong className="block text-xs text-green-700 mb-0.5">{a.name}</strong>
                  <p className="text-xs text-gray-500 leading-snug">{a.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Symptoms</h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 pb-3 border-b border-blue-50 last:border-0"
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
        <SectionTitle title="How to Prevent Patellar Tendinopathy" />
        <p className="text-gray-600 mb-8 max-w-2xl">
          Patellar tendinopathy is a <strong>load management condition</strong> — it develops when
          the cumulative stress placed on the tendon exceeds its capacity to adapt and recover.
          Prevention centres on building tendon capacity and managing load intelligently.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-0.5">{item.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
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
            <strong className="text-gray-900">Please note:</strong> Patellar tendinopathy is
            highly treatable but requires a structured, correctly dosed programme. Continuing to
            train through high levels of pain, or resting completely without rehabilitation, both
            worsen long-term outcomes. If you are experiencing inferior patellar pole pain with
            jumping or sport, book a consultation with our physiotherapy team at Zeromedixine for
            an accurate assessment and a personalised loading programme.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Reload Your Tendon the Right Way?</h2>
        <p className="text-gray-700 mb-10">
          Get a personalised tendinopathy assessment and a structured loading programme designed
          to get you back jumping, running, and performing at your best.
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

/* ── Shared sub-components ── */

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

export default PatellarTendonitis;