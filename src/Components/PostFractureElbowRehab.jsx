import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import postfractureimage from "../assets/post-fracture-elbow-rehab.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Post-Fracture Elbow Rehab blog content)
───────────────────────────────────────────── */

const FRACTURE_TYPES = [
  {
    badge: "Most Common Adult",
    title: "Radial Head Fracture",
    desc: "The most frequent elbow fracture in adults — usually from a fall on an outstretched hand. Mason Type I (undisplaced) managed conservatively; Types II–III often require fixation or replacement. Early mobilisation is critical.",
  },
  {
    badge: "Posterior Tip",
    title: "Olecranon Fracture",
    desc: "Direct impact on the elbow tip or avulsion from the triceps. Most require ORIF with plate or tension-band wiring to restore the extensor mechanism. Physio begins immediately post-operatively.",
  },
  {
    badge: "Most Common Child",
    title: "Supracondylar Fracture",
    desc: "The most common elbow fracture in children — typically a fall on an extended arm. Managed with percutaneous pinning in displaced cases. Neurovascular status must be closely monitored. Stiffness risk is high.",
  },
  {
    badge: "Complex",
    title: "Distal Humerus / Terrible Triad",
    desc: "Intercondylar distal humerus fractures and terrible triad injuries (dislocation + radial head + coronoid fracture) are complex injuries requiring extensive surgical stabilisation followed by intensive, carefully structured rehabilitation.",
  },
];

const COMPLICATIONS = [
  { icon: "🦴", title: "Heterotopic Ossification", desc: "Bone in soft tissue — limits motion" },
  { icon: "🔒", title: "Joint Contracture",        desc: "Capsular fibrosis — extension loss" },
  { icon: "⚡", title: "Nerve Injury",              desc: "Radial, ulnar, median nerve palsy" },
  { icon: "💪", title: "Muscle Weakness",           desc: "Disuse atrophy post-immobilisation" },
  { icon: "🔄", title: "Instability",               desc: "Post-fracture ligament compromise" },
  { icon: "😣", title: "Chronic Pain",              desc: "Persistent pain beyond expected healing" },
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

const PREVENTION = [
  {
    title: "Begin Physiotherapy as Early as Medically Permitted",
    desc: "The single most important factor in preventing post-fracture elbow stiffness. Every day of unnecessary delay is a day of capsular fibrosis. We liaise directly with your surgical team to begin mobilisation at the earliest safe point.",
  },
  {
    title: "Never Remain Immobilised Beyond What is Clinically Necessary",
    desc: "Research consistently shows that early controlled mobilisation after elbow fracture produces superior range of motion outcomes compared with prolonged immobilisation. Surgeons and physiotherapists work together to minimise immobilisation time.",
  },
  {
    title: "Fall Prevention Strategies for Older Adults",
    desc: "The majority of radial head and distal humerus fractures in the elderly result from falls. Home hazard assessment, strength training, balance improvement, and vision management significantly reduce fall risk and the consequent elbow fracture burden.",
  },
  {
    title: "Manage Osteoporosis Proactively",
    desc: "Osteoporotic bone fractures at far lower energy levels and heals more slowly. Calcium, vitamin D, appropriate medication, and weight-bearing exercise to maintain bone density are important long-term prevention strategies for upper limb fractures in at-risk individuals.",
  },
  {
    title: "Perform Prehabilitation Before Elective Elbow Surgery",
    desc: "For patients with known distal humerus arthritis or conditions likely to require elbow arthroplasty, pre-operative physiotherapy optimises strength, range, and fitness — improving post-operative recovery significantly.",
  },
  {
    title: "Use Appropriate Protective Equipment in Contact Sport",
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

const ALL_SERIES = [
  {
    label: "🔙 Back Pain Series (9/9)",
    blogs: [
      "Sciatica", "Lumbar Spondylosis", "Disc Herniation",
      "Postural Back Pain", "Mechanical Back Pain", "Lumbar Canal Stenosis",
      "Pregnancy Back Pain", "Scoliosis", "Piriformis Syndrome",
    ],
  },
  {
    label: "🦵 Knee Pain Series (9/9)",
    blogs: [
      "Osteoarthritis", "Runner's Knee (PFPS)", "ACL / PCL Injuries",
      "Meniscus Tear", "Patellar Tendonitis", "Chondromalacia Patella",
      "IT Band Syndrome", "Knee Bursitis", "Post-KR Rehabilitation",
    ],
  },
  {
    label: "💪 Elbow Pain Series (9/9)",
    blogs: [
      "Tennis Elbow", "Golfer's Elbow", "Cubital Tunnel Syndrome",
      "Radial Tunnel Syndrome", "Olecranon Bursitis", "Elbow Ligament Injuries",
      "Posterior Impingement", "Elbow Instability", "Post-Fracture Rehab",
    ],
  },
];

const SERIES_STATS = [
  { num: "27", label: "Blogs Completed" },
  { num: "3",  label: "Condition Series" },
  { num: "81", label: "Sections Written" },
  { num: "∞",  label: "Patients Informed" },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const PostFractureElbowRehab = () => {
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
              Post-Fracture Elbow{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Rehabilitation
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Elbow fractures are notoriously prone to stiffness — the elbow's high susceptibility
              to contracture makes early, expert physiotherapy not just important, but essential for
              a full functional recovery.
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
              src={postfractureimage}
              alt="Post-fracture elbow rehabilitation illustration"
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
            <SectionTitle title="What is Post-Fracture Elbow Rehabilitation?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Elbow fractures are among the most common upper limb injuries — resulting from falls
              on an outstretched hand, direct impact, or high-energy trauma. The most frequently
              fractured elbow structures include the <strong>radial head, olecranon, distal humerus
              (supracondylar and intercondylar), and coronoid process</strong>. Management ranges
              from conservative immobilisation to surgical fixation (ORIF), radial head replacement,
              or total elbow arthroplasty.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Regardless of the fracture type or management approach, one fact is universally true:
              the elbow is the <strong>most contracture-prone joint in the body</strong>. Even brief
              periods of immobilisation cause rapid capsular fibrosis, heterotopic ossification risk,
              and muscle shortening that — without aggressive physiotherapy — can produce permanent
              loss of elbow motion.
            </p>

            {/* Fracture types */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Common elbow fracture types requiring physiotherapy rehabilitation:
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {FRACTURE_TYPES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                >
                  <span className="inline-block text-xs font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded mb-2">
                    {f.badge}
                  </span>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{f.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Stiffness warning */}
            <div className="mt-4 bg-gray-800 rounded-xl p-5 flex gap-3 items-start">
              <span className="text-2xl shrink-0">⚠️</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-blue-300">The Elbow Stiffness Problem — Why Early Physio is Non-Negotiable:</strong>{" "}
                The elbow joint capsule undergoes rapid fibrotic change following injury or surgery.
                Heterotopic ossification occurs in up to 10% of elbow fractures and dramatically
                worsens stiffness. Every week of delay in commencing elbow physiotherapy significantly
                worsens the final range of motion achieved. We begin physiotherapy as early as the
                surgical team permits — often within days of surgery.
              </p>
            </div>
          </div>

          {/* Right column — management, complications, symptoms */}
          <div>
            {/* Conservative vs surgical */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Conservative vs surgical management:
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <span className="inline-block text-xs font-bold uppercase tracking-widest bg-green-600 text-white px-2 py-0.5 rounded mb-3">
                  Conservative
                </span>
                <ul className="space-y-1">
                  {[
                    "Mason Type I radial head (undisplaced)",
                    "Stable olecranon avulsions",
                    "Non-displaced supracondylar (children)",
                    "Brief immobilisation then early mobilisation",
                    "Physio commences within 1–2 weeks",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                      <CheckCircle size={12} className="text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <span className="inline-block text-xs font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded mb-3">
                  Surgical (ORIF)
                </span>
                <ul className="space-y-1">
                  {[
                    "Displaced radial head (Mason II–IV)",
                    "Olecranon — most require plate fixation",
                    "Intercondylar distal humerus fractures",
                    "Terrible triad injuries",
                    "Physio commences within days of surgery",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                      <CheckCircle size={12} className="text-blue-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Complications */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Post-fracture complications we monitor and address:
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {COMPLICATIONS.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-3 text-center"
                >
                  <span className="text-2xl block mb-1">{c.icon}</span>
                  <p className="text-xs font-bold text-red-700 mb-1 leading-tight">{c.title}</p>
                  <p className="text-xs text-gray-500 leading-tight">{c.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Symptoms */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What patients commonly experience:
            </h3>
            <ul className="space-y-3">
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

      {/* ── PREVENTION & OPTIMISATION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention & Optimisation" />
        <SectionTitle title="Preventing Poor Outcomes After Elbow Fracture" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          While the fracture itself may not always be preventable, the poor functional outcome of an
          elbow fracture is highly preventable with the right physiotherapy approach, timing, and
          patient commitment.
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


      {/* ── GRAND FINALE — ALL SERIES COMPLETE ── */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl p-10 border border-green-900 overflow-hidden">
            {/* Glow accents */}
            <div className="absolute -top-36 -right-24 w-96 h-96 rounded-full bg-green-500 opacity-10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-green-400 opacity-[0.06] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-green-900/40 border border-green-500/40 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest text-green-400 mb-6">
                🏁 All 27 Blogs Complete
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Zeromedixine Patient Education Series — Complete!
              </h2>
              <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8">
                All <strong className="text-green-400">27 patient education blogs</strong> across
                three series — Back Pain, Knee Pain, and Elbow Pain — are now complete. Your patients
                can now access comprehensive, accurate, and professionally presented physiotherapy
                information on every major condition you treat at Zeromedixine.
              </p>

              {/* Series panels */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {ALL_SERIES.map((series, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
                      {series.label}
                    </p>
                    <ul className="space-y-1">
                      {series.blogs.map((blog, j) => (
                        <li
                          key={j}
                          className="flex gap-2 items-center text-xs text-gray-400 py-1 border-b border-white/[0.05] last:border-b-0"
                        >
                          <span className="text-[10px]">✅</span>
                          {blog}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {SERIES_STATS.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.04] border border-green-500/15 rounded-xl p-4 text-center"
                  >
                    <span className="block text-3xl font-bold text-green-400 leading-none mb-2">
                      {s.num}
                    </span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide leading-tight">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> Post-fracture elbow rehabilitation
            is highly individualised and must be closely coordinated with your surgical team's
            specific guidelines and fracture healing timeline. If you are recovering from an elbow
            fracture — whether managed conservatively or surgically — please book a consultation with
            our physiotherapy team for early, expert rehabilitation that maximises your functional
            recovery.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Maximise Your Elbow Recovery?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised post-fracture assessment and start your rehabilitation — expert
          physiotherapy from day one.
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

export default PostFractureElbowRehab;
