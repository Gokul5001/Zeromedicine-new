import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import aclPclImage from "../assets/acl-pcl-injuries.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the ACL / PCL blog)
───────────────────────────────────────────── */

const HERO_PILLS = [
  { icon: "⚡", strong: "ACL",           label: "Most common sports ligament injury" },
  { icon: "🏥", strong: "PCL",           label: "Often from direct trauma" },
  { icon: "🏆", strong: "12–18 Months",  label: "Full rehab timeline" },
];

const ACL_POINTS = [
  "Prevents forward movement of the tibia on the femur",
  "Controls rotational stability of the knee",
  "Most commonly torn in non-contact pivoting, cutting, or landing",
  "High incidence in football, netball, basketball, skiing",
  "Often requires surgical reconstruction in active individuals",
  "2–3× more common in females than males",
];

const PCL_POINTS = [
  "Prevents backward movement of the tibia on the femur",
  "Stronger and larger than the ACL",
  "Often injured by direct blow to the front of the tibia",
  "Common in dashboard injuries, falls on a flexed knee",
  "More frequently managed conservatively than ACL",
  "Isolated PCL tears often have good outcomes with physio",
];

const GRADES = [
  { label: "Grade I",  name: "Sprain",          desc: "Micro-tears, ligament intact, mild pain and swelling" },
  { label: "Grade II", name: "Partial Tear",     desc: "Significant fibre disruption, some instability, moderate symptoms" },
  { label: "Grade III",name: "Complete Rupture", desc: "Full tear, significant instability, requires surgical evaluation" },
];

const SYMPTOMS = [
  "A sudden \"pop\" or tearing sensation at the time of injury — especially ACL",
  "Immediate pain followed by rapid swelling of the knee within hours",
  "Feeling of the knee \"giving way\" or being unable to bear weight",
  "Significant loss of range of motion — difficulty bending or straightening the knee",
  "Joint instability during walking, stairs, or rotational movements",
  "Haemarthrosis — blood in the joint causing a tense, warm, swollen knee",
  "Apprehension and lack of confidence in the knee during activity",
  "PCL injury: posterior knee pain, pain going down stairs, pain in deep knee flexion",
];

const PREVENTION = [
  {
    title: "Strengthen Hip Abductors & External Rotators",
    desc: "Controlling dynamic knee valgus during cutting and landing is the single most important biomechanical factor in ACL injury prevention. Strong glutes protect the ACL.",
  },
  {
    title: "Train Proper Jump-Landing Mechanics",
    desc: "Landing softly with hips and knees bent, trunk upright, and avoiding knee cave reduces ACL loading by up to 40% compared with stiff, valgus landings.",
  },
  {
    title: "Develop Neuromuscular Control & Proprioception",
    desc: "Single-leg balance, reactive agility training, and perturbation exercises improve the knee's dynamic stability and reduce the risk of injury during unpredictable sport movements.",
  },
  {
    title: "Implement Neuromuscular Warm-Up Programmes",
    desc: "Programmes such as FIFA 11+ and PEP have robust evidence for reducing ACL injury incidence in team sport athletes when performed consistently before training and matches.",
  },
  {
    title: "Address Previous Knee Injuries Fully",
    desc: "A history of previous ACL or knee injury is the strongest risk factor for re-injury. Completing full rehabilitation with criteria-based return to sport is essential before returning to competition.",
  },
  {
    title: "Correct Strength Asymmetries",
    desc: "Significant side-to-side differences in quadriceps and hamstring strength increase ACL injury risk. Physiotherapy screening and strength testing identifies these before they become problems.",
  },
];

const REHAB_PHASES = [
  {
    phase: "Phase 1 — Weeks 0 to 2",
    title: "Acute Management & Swelling Control",
    desc: "PRICE protocol, cryotherapy, compression, and electrotherapy to control haemarthrosis. Restoration of full knee extension is the immediate priority. Early quadriceps activation with straight leg raises and quads sets begins immediately.",
  },
  {
    phase: "Phase 2 — Weeks 2 to 6",
    title: "Range of Motion & Early Strengthening",
    desc: "Progressive restoration of knee flexion range, closed kinetic chain exercises (leg press, mini squats), and proprioceptive training. Manual therapy to restore joint mobility; soft tissue release for quadriceps inhibition.",
  },
  {
    phase: "Phase 3 — Weeks 6 to 16",
    title: "Strength Rehabilitation",
    desc: "Progressive loading of quadriceps, hamstrings, hip, and calf. Limb symmetry testing guides progression. Neuromuscular training, agility drills, and straight-line running introduced when criteria are met.",
  },
  {
    phase: "Phase 4 — Weeks 16 to 36+",
    title: "Sport-Specific Rehabilitation & Return to Sport",
    desc: "Reactive agility, cutting, jumping, pivoting, and contact drills progressively reintroduced. Psychological readiness assessed alongside physical criteria. Return to full training and competition when all criteria are met.",
  },
];

const TREATMENTS = [
  {
    title: "Manual Therapy & Joint Mobilisation",
    desc: "Restores post-injury and post-surgical knee extension and flexion, reduces swelling, and addresses compensatory stiffness in the hip, ankle, and lumbar spine.",
  },
  {
    title: "MFR & Soft Tissue Release",
    desc: "Addresses post-injury quadriceps inhibition, hamstring tightness, iliotibial band tension, and calf restriction — secondary effects that impair rehabilitation progress.",
  },
  {
    title: "Dry Needling",
    desc: "Targets VMO, quadriceps, and hamstring trigger points — restores neuromuscular activation in inhibited muscles and reduces pain that slows rehabilitation.",
  },
  {
    title: "Cupping Therapy",
    desc: "Applied to the quadriceps and hamstrings to reduce post-injury or post-surgical soft tissue tightness, improve circulation, and support tissue recovery.",
  },
  {
    title: "Electrotherapy (NMES / TENS)",
    desc: "Neuromuscular electrical stimulation (NMES) is particularly effective for quadriceps re-activation after ACL surgery — one of the most evidence-based post-surgical electrotherapy applications.",
  },
  {
    title: "Neuromuscular & Proprioceptive Training",
    desc: "Progressive single-leg balance, perturbation training, and reactive stability exercises to restore the joint's position sense and dynamic control lost through injury.",
  },
  {
    title: "Progressive Strength Rehabilitation",
    desc: "Quadriceps, hamstring (critical for ACL graft protection), hip, and calf strengthening — progressively loaded from open kinetic chain to closed kinetic chain to sport-specific patterns.",
  },
  {
    title: "Sport-Specific Rehabilitation",
    desc: "Running, cutting, jumping, and pivoting drills reintroduced in controlled and then reactive environments — preparing the knee for the true demands of your sport.",
  },
];

const RTS_CRITERIA = [
  "Limb Symmetry Index ≥90%",
  "Single-leg hop tests passed",
  "Quad & hamstring strength symmetry",
  "Psychological readiness",
  "Sport-specific agility cleared",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const ACLPCLInjuries = () => {
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
              Knee Pain Series · Blog 3 of 9
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              ACL / PCL{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Injuries
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              Two of the most significant knee ligament injuries in sport and trauma — requiring
              precise diagnosis, structured rehabilitation, and expert physiotherapy to restore full
              function and confidence.
            </p>

            {/* Hero pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {HERO_PILLS.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm"
                >
                  <span className="text-xl">{p.icon}</span>
                  <div className="text-xs leading-tight">
                    <strong className="block text-blue-700">{p.strong}</strong>
                    <span className="text-gray-500">{p.label}</span>
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
              src={aclPclImage}
              alt="ACL / PCL knee ligament injury illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What are ACL & PCL Injuries?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>anterior cruciate ligament (ACL)</strong> and{" "}
              <strong>posterior cruciate ligament (PCL)</strong> are the two primary stabilising
              ligaments within the knee joint. They cross each other in the centre of the joint —
              giving them their name (<em>cruciate</em> = cross-shaped) — and together control the
              anteroposterior and rotational stability of the knee.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Injuries range from mild sprains to complete tears (ruptures) and can have significant
              consequences for knee function, sport participation, and long-term joint health. Both
              require expert physiotherapy — whether managed conservatively or following surgical
              reconstruction.
            </p>

            {/* Classic ACL injury callout */}
            <div className="bg-gray-950 border border-red-900/40 rounded-xl p-5 flex gap-4 items-start mb-6">
              <span className="text-2xl shrink-0">💥</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-red-300">The Classic ACL Injury Presentation:</strong> Most
                ACL tears are immediately dramatic — a sudden non-contact deceleration, pivot, or
                awkward landing, followed by an audible or felt <em>"pop"</em>, immediate pain, rapid
                swelling within 2–4 hours (haemarthrosis), and inability to continue activity. The
                knee often feels unstable or like it "gave way." If you have experienced this, seek
                assessment promptly.
              </p>
            </div>

            {/* Grading strip */}
            <p className="text-sm font-semibold text-gray-800 mb-3">Ligament injury grading:</p>
            <div className="flex divide-x divide-blue-200 border border-blue-200 rounded-xl overflow-hidden">
              {GRADES.map((g, i) => (
                <div key={i} className="flex-1 bg-blue-50 p-4 text-center">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{g.label}</p>
                  <p className="font-bold text-gray-900 text-sm mb-1">{g.name}</p>
                  <p className="text-xs text-gray-600 leading-snug">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* ACL vs PCL comparison cards */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {/* ACL */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-red-50 border-2 border-red-200 rounded-xl p-5"
              >
                <span className="inline-block px-3 py-1 mb-3 text-xs font-extrabold tracking-widest uppercase bg-red-600 text-white rounded">
                  ACL
                </span>
                <p className="font-bold text-gray-900 mb-3 text-sm">Anterior Cruciate Ligament</p>
                <ul className="space-y-2">
                  {ACL_POINTS.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed border-b border-red-100 pb-2 last:border-0 last:pb-0">
                      <span className="text-red-500 shrink-0 mt-0.5">•</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* PCL */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5"
              >
                <span className="inline-block px-3 py-1 mb-3 text-xs font-extrabold tracking-widest uppercase bg-gray-800 text-white rounded">
                  PCL
                </span>
                <p className="font-bold text-gray-900 mb-3 text-sm">Posterior Cruciate Ligament</p>
                <ul className="space-y-2">
                  {PCL_POINTS.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed border-b border-blue-100 pb-2 last:border-0 last:pb-0">
                      <span className="text-blue-500 shrink-0 mt-0.5">•</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Symptoms */}
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
        <SectionTitle title="How to Prevent ACL / PCL Injuries" />
        <p className="text-gray-600 mb-6 max-w-2xl">
          ACL injuries in particular are among the most studied sports injuries from a prevention
          standpoint — and the evidence is compelling. Structured neuromuscular training programmes
          can <strong>reduce ACL injury rates by up to 50%</strong> in at-risk athletes.
        </p>

        {/* FIFA 11+ callout */}
        <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-r-xl p-5 text-sm text-gray-800 leading-relaxed mb-8">
          <strong className="text-amber-700">🏆 FIFA 11+ Prevention Programme:</strong> The FIFA 11+
          warm-up programme and similar neuromuscular training protocols have been extensively validated
          for reducing ACL injury risk in team sport athletes. They include progressive strengthening,
          balance training, and jump-landing mechanics — all of which address the key risk factors for
          ACL injury. We recommend these programmes for all footballers, netballers, and basketball players.
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 p-5 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
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
            <strong className="text-gray-900">Please note:</strong> ACL and PCL injuries require
            accurate diagnosis — ideally confirmed with MRI — before a rehabilitation plan is
            determined. If you have sustained a knee injury with significant swelling, instability,
            or inability to bear weight, please seek prompt assessment. Our physiotherapy team at
            Zeromedixine will guide you through every stage of recovery — from the first week
            post-injury to your return to full sport.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Rebuild Your Knee Confidence?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised ligament assessment and start your structured recovery programme —
          from day one to return to sport.
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

export default ACLPCLInjuries;
