import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  AlertCircle,
  Trophy,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import elbowFractureImage from "../assets/elbow-fracture-rehab.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Post-Fracture Elbow Rehab blog)
───────────────────────────────────────────── */

const FRACTURE_TYPES = [
  {
    badge: "Most Common Adult",
    name: "Radial Head Fracture",
    desc: "The most frequent elbow fracture in adults — usually from a fall on an outstretched hand. Mason Type I (undisplaced) managed conservatively; Types II–III often require fixation or replacement. Early mobilisation is critical.",
  },
  {
    badge: "Posterior Tip",
    name: "Olecranon Fracture",
    desc: "Direct impact on the elbow tip or avulsion from the triceps. Most require ORIF with plate or tension-band wiring to restore the extensor mechanism. Physio begins immediately post-operatively.",
  },
  {
    badge: "Most Common Child",
    name: "Supracondylar Fracture",
    desc: "The most common elbow fracture in children — typically a fall on an extended arm. Managed with percutaneous pinning in displaced cases. Neurovascular status must be closely monitored. Stiffness risk is high.",
  },
  {
    badge: "Complex",
    name: "Distal Humerus / Terrible Triad",
    desc: "Intercondylar distal humerus fractures and terrible triad injuries (dislocation + radial head + coronoid fracture) are complex injuries requiring extensive surgical stabilisation followed by intensive, carefully structured rehabilitation.",
  },
];

const SYMPTOMS = [
  "Significant pain, swelling, and bruising immediately after injury",
  "Loss of elbow flexion and extension — often severe in the early post-fracture or post-surgical period",
  "Loss of forearm supination and pronation — particularly after radial head fractures",
  "Muscle weakness and inhibition — the elbow musculature shuts down rapidly after injury",
  "Stiffness that progressively worsens without early mobilisation — the defining challenge of elbow fracture recovery",
  "Neurological symptoms (tingling, weakness) — if adjacent nerves are involved or stretched",
  "Fear of movement — a natural response that physiotherapy education and graded exposure addresses directly",
];

const COMPLICATIONS = [
  { icon: "🦴", title: "Heterotopic Ossification", desc: "Bone in soft tissue — limits motion" },
  { icon: "🔒", title: "Joint Contracture", desc: "Capsular fibrosis — extension loss" },
  { icon: "⚡", title: "Nerve Injury", desc: "Radial, ulnar, median nerve palsy" },
  { icon: "💪", title: "Muscle Weakness", desc: "Disuse atrophy post-immobilisation" },
  { icon: "🔄", title: "Instability", desc: "Post-fracture ligament compromise" },
  { icon: "😣", title: "Chronic Pain", desc: "Persistent pain beyond expected healing" },
];

const CONSERVATIVE_CASES = [
  "Mason Type I radial head (undisplaced)",
  "Stable olecranon avulsions",
  "Non-displaced supracondylar (children)",
  "Brief immobilisation then early mobilisation",
  "Physio commences within 1–2 weeks",
];

const SURGICAL_CASES = [
  "Displaced radial head (Mason II–IV)",
  "Olecranon — most require plate fixation",
  "Intercondylar distal humerus fractures",
  "Terrible triad injuries",
  "Physio commences within days of surgery",
];

const PREVENTION = [
  {
    title: "Begin physiotherapy as early as medically permitted",
    desc: "The single most important factor in preventing post-fracture elbow stiffness. Every day of unnecessary delay is a day of capsular fibrosis. We liaise directly with your surgical team to begin mobilisation at the earliest safe point.",
  },
  {
    title: "Never remain completely immobilised beyond what is clinically necessary",
    desc: "Research consistently shows that early controlled mobilisation after elbow fracture produces superior range of motion outcomes compared with prolonged immobilisation. Surgeons and physiotherapists work together to minimise immobilisation time.",
  },
  {
    title: "Fall prevention strategies for older adults",
    desc: "The majority of radial head and distal humerus fractures in the elderly result from falls. Home hazard assessment, strength training, balance improvement, and vision management significantly reduce fall risk and the consequent elbow fracture burden.",
  },
  {
    title: "Manage osteoporosis proactively",
    desc: "Osteoporotic bone fractures at far lower energy levels and heals more slowly. Calcium, vitamin D, appropriate medication, and weight-bearing exercise to maintain bone density are important long-term prevention strategies for upper limb fractures in at-risk individuals.",
  },
  {
    title: "Perform prehabilitation before elective elbow surgery",
    desc: "For patients with known distal humerus arthritis or conditions likely to require elbow arthroplasty, pre-operative physiotherapy optimises strength, range, and fitness — improving post-operative recovery significantly.",
  },
  {
    title: "Use appropriate protective equipment in contact sport",
    desc: "Elbow guards and pads in rugby, hockey, cycling, and martial arts reduce the frequency and severity of direct elbow trauma, preventing fractures that would otherwise require lengthy rehabilitation.",
  },
];

const REHAB_PHASES = [
  {
    phase: "Phase 1 — Days 1 to 2 Weeks",
    title: "Acute Management & Early Mobilisation",
    desc: "Oedema control with elevation, cryotherapy, and compression. Immediate active-assisted range of motion within the surgically permitted arc. Gentle flexion and extension exercises begin as early as Day 1–3 post-surgery. Wrist and shoulder maintained through full range to prevent stiffness cascade.",
  },
  {
    phase: "Phase 2 — Weeks 2 to 6",
    title: "Range of Motion Restoration",
    desc: "Progressive elbow flexion and extension, forearm supination and pronation restoration. Manual joint mobilisation as soon as healing permits. Scar tissue management commences once the wound is closed. Dynamic splinting introduced if extension lag is developing. Target: functional arc (30–130°) achieved by 6 weeks.",
  },
  {
    phase: "Phase 3 — Weeks 6 to 12",
    title: "Strength & Functional Rehabilitation",
    desc: "Progressive elbow flexor, extensor, and forearm muscle strengthening. Grip and wrist strength restoration. Functional ADL training — dressing, hygiene, driving. Proprioception and neuromuscular retraining. Target: full or near-full range, return to light activities.",
  },
  {
    phase: "Phase 4 — Months 3 to 6+",
    title: "Return to Full Function & Sport",
    desc: "Advanced strengthening and sport-specific conditioning. Return to driving, work, and recreational activities. Throwing rehabilitation for overhead athletes. Ongoing monitoring for heterotopic ossification or instability. Maintenance programme established.",
  },
];

const TREATMENTS = [
  {
    title: "Joint Mobilisation (Grades I–IV)",
    desc: "Progressive humeroradial, humeroulnar, and proximal radioulnar joint mobilisation — the cornerstone of restoring elbow range of motion. Commenced as early as healing allows, precisely graded to the fracture pattern and fixation stability.",
  },
  {
    title: "Dynamic & Static Progressive Splinting",
    desc: "For established elbow contracture — dynamic extension or flexion splints and static progressive splints apply sustained low-load force to the shortened capsule, progressively restoring range without damaging healing tissue.",
  },
  {
    title: "Scar Tissue & Capsular Release (MFR)",
    desc: "Soft tissue release of the anterior and posterior joint capsule, scar tissue adhesions, and peri-articular myofascial tightness — addressing the primary tissue contributors to post-fracture elbow stiffness and contracture.",
  },
  {
    title: "Dry Needling",
    desc: "Applied to the biceps, brachialis, and triceps trigger points — reduces post-fracture muscle inhibition and chronic tightness that restricts elbow motion and slows rehabilitation progress.",
  },
  {
    title: "Cupping Therapy (Post-Healing)",
    desc: "Applied to the biceps, brachialis, and triceps once wound healing is complete — reduces chronic post-fracture soft tissue tightness, improves circulation, and supports the tissue quality of the rehabilitating elbow.",
  },
  {
    title: "Electrotherapy (TENS / IFT / NMES)",
    desc: "TENS and IFT for post-fracture pain management and reduction of swelling. NMES for elbow flexor and extensor re-activation where significant muscle inhibition is present following complex fractures or prolonged immobilisation.",
  },
  {
    title: "Progressive Strengthening Programme",
    desc: "Graded elbow flexor, extensor, forearm supinator, and pronator strengthening — from gravity-minimised activation through to full functional loading. Carefully titrated to the fracture healing timeline and fixation stability at each stage.",
  },
  {
    title: "Functional & ADL Rehabilitation",
    desc: "Dressing, hygiene, driving, cooking, and occupational task retraining with modified techniques as healing progresses — restoring independence and daily function as efficiently as the fracture healing timeline allows.",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const ElbowFractureRehab = () => {
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
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded bg-slate-700 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                💪 Elbow Pain Series
              </span>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded bg-amber-900/50 text-yellow-300 border border-yellow-500/30 uppercase tracking-wider">
                Blog 27 of 27
              </span>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded bg-green-900/50 text-green-300 border border-green-400/30 uppercase tracking-wider">
                🏁 Final Blog
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
              Post-Fracture Elbow{" "}
              <span className="italic font-light text-yellow-300">
                Rehabilitation
              </span>
            </h1>

            <p className="text-base text-white/50 mb-6 max-w-xl leading-relaxed">
              Elbow fractures are notoriously prone to stiffness — the elbow's high susceptibility to
              contracture makes early, expert physiotherapy not just important, but essential for a
              full functional recovery.
            </p>

            {/* Hero stats */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: "🦴", strong: "High Stiffness Risk", label: "Most contracture-prone joint" },
                { icon: "⏱️", strong: "Early Mobilisation", label: "Is critical for outcome" },
                { icon: "🏆", strong: "Full Recovery", label: "With dedicated physio" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/6 border border-white/10 rounded-xl"
                >
                  <span className="text-xl">{stat.icon}</span>
                  <div className="text-xs leading-tight">
                    <strong className="block text-blue-300">{stat.strong}</strong>
                    <span className="text-white/50">{stat.label}</span>
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
                onClick={() => navigate("/pain-relief/elbow-pain")}
                className="px-8 py-4 border border-white/20 rounded-full text-white/70 hover:bg-white/10 transition"
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
              src={elbowFractureImage}
              alt="Post-fracture elbow rehabilitation illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Post-Fracture Elbow Rehabilitation?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Elbow fractures are among the most common upper limb injuries — resulting from falls on
              an outstretched hand, direct impact, or high-energy trauma. The most frequently fractured
              elbow structures include the{" "}
              <strong>radial head, olecranon, distal humerus (supracondylar and intercondylar), and
              coronoid process</strong>. Management ranges from conservative immobilisation to surgical
              fixation (ORIF), radial head replacement, or total elbow arthroplasty.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Regardless of the fracture type or management approach, one fact is universally true: the
              elbow is the <strong>most contracture-prone joint in the body</strong>. Even brief periods
              of immobilisation cause rapid capsular fibrosis, heterotopic ossification risk, and muscle
              shortening that — without aggressive physiotherapy — can produce permanent loss of elbow
              motion. Early, precise, and persistent physiotherapy rehabilitation is therefore not
              optional: it is the <strong>primary determinant of functional outcome</strong>.
            </p>

            {/* Stiffness warning callout */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white/75 leading-relaxed">
              <strong className="text-blue-300">⚠️ The Elbow Stiffness Problem:</strong> The elbow
              joint capsule undergoes rapid fibrotic change following injury or surgery. Heterotopic
              ossification occurs in up to 10% of elbow fractures.{" "}
              <strong className="text-blue-300">
                Every week of delay in commencing elbow physiotherapy significantly worsens the final
                range of motion achieved.
              </strong>{" "}
              We begin as early as the surgical team permits — often within days.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              What Patients Commonly Experience
            </h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0"
                >
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fracture types grid */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Common Elbow Fracture Types
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FRACTURE_TYPES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4"
              >
                <span className="inline-block mb-2 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-slate-700 text-white rounded">
                  {f.badge}
                </span>
                <p className="font-semibold text-gray-900 mb-1">{f.name}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Conservative vs Surgical */}
        <div className="mt-10">
          <p className="text-sm font-semibold text-gray-800 mb-3">
            Conservative vs surgical management — when each applies:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <span className="inline-block mb-3 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-green-700 text-white rounded">
                Conservative
              </span>
              <ul className="space-y-1">
                {CONSERVATIVE_CASES.map((c, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-green-600 font-bold shrink-0">✓</span> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="inline-block mb-3 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-slate-700 text-white rounded">
                Surgical (ORIF / Replacement)
              </span>
              <ul className="space-y-1">
                {SURGICAL_CASES.map((c, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-slate-500 shrink-0">→</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Complications */}
        <div className="mt-10">
          <p className="text-sm font-semibold text-gray-800 mb-3">
            Post-fracture complications physiotherapy monitors and addresses:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COMPLICATIONS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-red-50 border border-red-200 rounded-xl p-3 text-center"
              >
                <span className="text-2xl block mb-1">{c.icon}</span>
                <strong className="block text-red-700 text-xs mb-1">{c.title}</strong>
                <span className="text-xs text-gray-600 leading-snug">{c.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention & Optimisation" />
        <SectionTitle title="Preventing Poor Outcomes After Elbow Fracture" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          While the fracture itself may not always be preventable, the{" "}
          <strong>poor functional outcome</strong> of an elbow fracture is highly preventable with the
          right physiotherapy approach, timing, and patient commitment.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 p-5 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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

      {/* ── TREATMENT ── */}
      <Section>
        <SectionBadge label="03 — Treatment" />
        <SectionTitle title="How We Treat Post-Fracture Elbow Rehabilitation at Zeromedixine" />

        <p className="text-gray-700 leading-relaxed mb-10 max-w-3xl">
          Our post-fracture elbow rehabilitation is{" "}
          <strong>structured, progressive, and precisely coordinated</strong> with your surgical
          team's guidelines. Every phase is guided by the fracture type, healing timeline, surgical
          fixation stability, and your functional goals — with one overriding priority:{" "}
          <strong>
            preventing the elbow stiffness that makes a good surgery a poor outcome.
          </strong>
        </p>

        {/* Rehab timeline */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Rehabilitation Timeline</h3>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-slate-600 to-green-500 rounded" />

            <div className="space-y-4">
              {REHAB_PHASES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-slate-50 border border-slate-200 rounded-xl p-4"
                >
                  {/* dot */}
                  <div className="absolute -left-5 top-4 w-3 h-3 rounded-full bg-slate-600 border-2 border-white" />
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">
                    {p.phase}
                  </p>
                  <p className="font-semibold text-gray-900 mb-1">{p.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key interventions */}
        <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 border-b-2 border-slate-100 pb-2 mb-5">
          Key Physiotherapy Interventions
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {TREATMENTS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <p className="font-semibold text-gray-800 mb-2">{t.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Key insight callout */}
        <div className="mt-8 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5 text-sm text-gray-700 leading-relaxed">
          <strong className="text-amber-700">🔑 The Key to Post-Fracture Elbow Success:</strong>{" "}
          The literature is unequivocal — elbow fracture outcomes are more dependent on the quality
          and timing of physiotherapy than on the surgery itself. A technically perfect surgical
          fixation followed by delayed or inadequate physiotherapy will produce a stiff, functionally
          compromised elbow. Conversely, expert early physiotherapy — even after complex fractures —
          consistently produces functional outcomes that allow patients to return to work, sport, and
          independent daily life. This is the commitment we make to every post-fracture patient at
          Zeromedixine.
        </div>
      </Section>

      {/* ── SERIES COMPLETE NOTE ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/30 rounded-2xl p-6 flex gap-4 items-center">
          <span className="text-4xl shrink-0">🏁</span>
          <p className="text-sm text-slate-300/70 leading-relaxed">
            <strong className="text-green-400">All 27 Blogs Complete!</strong> This is Blog 9 of 9 in
            the Elbow Pain Series, and Blog 27 of 27 across all three series. The complete patient
            education library now covers{" "}
            <strong className="text-slate-200">Back Pain (9), Knee Pain (9), and Elbow Pain (9)</strong>{" "}
            — every major condition treated at Zeromedixine.
          </p>
        </div>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> Post-fracture elbow rehabilitation
            is highly individualised and must be closely coordinated with your surgical team's specific
            guidelines and fracture healing timeline. If you are recovering from an elbow fracture —
            whether managed conservatively or surgically — book a consultation with our physiotherapy
            team at Zeromedixine for early, expert rehabilitation that maximises your functional
            recovery.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Reclaim Full Elbow Function?</h2>
        <p className="text-gray-700 mb-10">
          Expert, early rehabilitation is the most important step in your recovery. Start today.
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

export default ElbowFractureRehab;
