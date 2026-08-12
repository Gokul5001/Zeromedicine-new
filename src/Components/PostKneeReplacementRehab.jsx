import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import kneeReplacementImage from "../assets/post-knee-replacement-rehab.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Post-Knee Replacement Rehab blog)
───────────────────────────────────────────── */

const HERO_STATS = [
  { icon: "🏥", strong: "TKR & PKR",         label: "Total & partial replacement" },
  { icon: "📅", strong: "6–12 Months",        label: "Full rehabilitation timeline" },
  { icon: "🏆", strong: "Outcomes Depend",    label: "On quality of rehab" },
];

const SURGERY_TYPES = [
  {
    badge: "TKR",
    name: "Total Knee Replacement",
    points: [
      "All three knee compartments replaced",
      "Indicated for tricompartmental OA",
      "Most common knee replacement type",
      "Prosthesis typically lasts 15–20+ years",
      "Full rehabilitation 6–12 months",
    ],
  },
  {
    badge: "PKR",
    name: "Partial Knee Replacement",
    points: [
      "One compartment replaced (medial most common)",
      "Indicated for single-compartment OA",
      "Less bone removal — faster recovery",
      "More natural knee feel post-operatively",
      "Rehabilitation typically 3–6 months",
    ],
  },
];

const OUTCOME_MILESTONES = [
  { time: "Day 1–2",   label: "Standing and first steps with assistance" },
  { time: "2 Weeks",   label: "Walking short distances, wound healed" },
  { time: "6 Weeks",   label: "Driving, light household activities" },
  { time: "3 Months",  label: "Most daily activities comfortable" },
  { time: "6 Months",  label: "Swimming, cycling, social activities" },
  { time: "12 Months", label: "Full function and activity return" },
];

const POST_OP_EXPERIENCES = [
  "Significant pain and swelling in the first 2–6 weeks — managed with medication, ice, elevation, and physiotherapy",
  "Reduced range of motion initially — regaining full extension is the immediate priority after surgery",
  "Quadriceps inhibition — the quadriceps muscle is significantly weakened by surgery and requires active reactivation",
  "Altered gait pattern — an antalgic limp is common early and must be corrected progressively through rehabilitation",
  "Scar tissue formation — without regular mobilisation, the knee can develop adhesions that limit long-term flexion",
  "Psychological adjustment — adapting to the new joint sensation and building confidence in the prosthesis takes time",
  "Gradual but progressive improvement — consistent rehabilitation produces steady, measurable gains week by week",
];

const PREHAB_ITEMS = [
  {
    title: "Maximise Quadriceps Strength Before Surgery",
    desc: "Every percentage of pre-operative quad strength is retained post-operatively. Stronger quads going in means faster activation, less inhibition, and better early function after surgery.",
  },
  {
    title: "Optimise Knee Range of Motion Pre-Operatively",
    desc: "Patients who enter surgery with better flexion and full extension tend to achieve better post-operative range. Physiotherapy removes preventable stiffness before surgery.",
  },
  {
    title: "Improve Cardiovascular Fitness",
    desc: "General aerobic conditioning before surgery accelerates recovery, reduces anaesthetic risk, and improves the body's capacity for tissue healing post-operatively.",
  },
  {
    title: "Achieve and Maintain Healthy Body Weight",
    desc: "Excess weight increases surgical risk, slows wound healing, and places greater stress on the new prosthesis during rehabilitation. Weight optimisation before surgery improves outcomes significantly.",
  },
  {
    title: "Cease Smoking Pre-Operatively",
    desc: "Smoking impairs wound healing, increases infection risk, and reduces bone-implant integration quality. Cessation at least 4 weeks before surgery is strongly recommended.",
  },
  {
    title: "Learn Post-Operative Exercises in Advance",
    desc: "Practising the exercises that will be prescribed after surgery makes post-operative participation far easier and more effective, particularly when pain and fatigue are at their peak.",
  },
];

const REHAB_PHASES = [
  {
    phase: "Phase 1 — Days 1 to 2 Weeks",
    title: "Acute Recovery & Early Mobilisation",
    desc: "Oedema control with elevation, cryotherapy, and compression. Immediate quadriceps activation (quads sets, straight leg raises). Restoration of full knee extension is the top priority. Assisted walking progressed daily.",
  },
  {
    phase: "Phase 2 — Weeks 2 to 6",
    title: "Range of Motion & Strength Foundation",
    desc: "Progressive knee flexion restoration (target 90°+ by 6 weeks). Scar tissue mobilisation. Mini squats, sit-to-stand practice, and step training introduced. Gait normalisation and walking distance progressed.",
  },
  {
    phase: "Phase 3 — Weeks 6 to 12",
    title: "Progressive Strengthening",
    desc: "Leg press, bike ergometer, and pool walking for progressive loading. Hip and calf strengthening to support the replaced knee. Target knee flexion of 120°+. Stair training — up and down — normalised.",
  },
  {
    phase: "Phase 4 — Months 3 to 6",
    title: "Functional Rehabilitation & Community Return",
    desc: "Outdoor walking, shopping, driving, and social activities. Swimming and cycling introduced. ADL training for car transfers, bathing, and dressing. Continued strength gains and confidence building.",
  },
  {
    phase: "Phase 5 — Months 6 to 12",
    title: "Full Activity Return & Maintenance",
    desc: "Low-impact sport return (golf, swimming, bowling, social tennis). Home exercise maintenance programme established. Annual review recommended. Prosthesis lifespan optimised through appropriate activity management.",
  },
];

const KEY_INTERVENTIONS = [
  {
    title: "Joint Mobilisation & Manual Therapy",
    desc: "Patellofemoral and tibiofemoral mobilisation to restore knee flexion and extension, prevent capsular adhesions, and improve the quality of prosthetic joint movement throughout rehabilitation.",
  },
  {
    title: "Scar Tissue & Soft Tissue Release",
    desc: "Progressive scar desensitisation and cross-friction massage once the incision is healed — prevents subcutaneous adhesions that restrict knee flexion and alter the feel of the knee surface.",
  },
  {
    title: "MFR & Soft Tissue Release",
    desc: "Addresses post-surgical quadriceps inhibition, hamstring tightness, and calf restriction — secondary soft tissue effects of surgery and immobilisation that impair rehabilitation progress.",
  },
  {
    title: "Cupping Therapy (Post-Healing)",
    desc: "Applied to the quadriceps and hamstrings once the wound is fully healed — reduces chronic post-surgical soft tissue tightness and improves the circulation and tissue quality around the new joint.",
  },
  {
    title: "Electrotherapy (NMES / TENS / IFT)",
    desc: "Neuromuscular electrical stimulation (NMES) is particularly valuable for quadriceps re-activation after knee replacement — one of the most evidence-based early post-surgical electrotherapy applications.",
  },
  {
    title: "Dry Needling",
    desc: "Targets quadriceps, VMO, and hamstring trigger points — restores neuromuscular activation in inhibited muscles and reduces post-surgical pain that slows rehabilitation engagement.",
  },
  {
    title: "Progressive Strengthening Programme",
    desc: "A carefully graded quadriceps, hamstring, hip abductor, and calf programme — from gravity-minimised activation through to full functional loading — the backbone of long-term prosthesis protection.",
  },
  {
    title: "Gait Retraining",
    desc: "Normalising walking pattern, reducing antalgic gait, correcting trunk lean, and building the walking endurance and confidence needed for community participation and an active lifestyle.",
  },
];

const RETURN_ACTIVITIES = [
  { icon: "🚶", time: "6 Weeks",      text: "Walking outdoors & community distances" },
  { icon: "🚗", time: "6–8 Weeks",    text: "Driving (right knee — as per surgeon)" },
  { icon: "🏊", time: "8–12 Weeks",   text: "Swimming (once wound fully healed)" },
  { icon: "🚴", time: "8–12 Weeks",   text: "Stationary & outdoor cycling" },
  { icon: "⛳", time: "3–6 Months",   text: "Golf, bowls, social activities" },
  { icon: "🎾", time: "6–12 Months",  text: "Social tennis & light sport" },
];

const SERIES_BLOGS = [
  { title: "Osteoarthritis",       blog: "Blog 1 of 9" },
  { title: "Runner's Knee",        blog: "Blog 2 of 9" },
  { title: "ACL / PCL Injuries",   blog: "Blog 3 of 9" },
  { title: "Meniscus Tear",        blog: "Blog 4 of 9" },
  { title: "Patellar Tendonitis",  blog: "Blog 5 of 9" },
  { title: "Chondromalacia",       blog: "Blog 6 of 9" },
  { title: "IT Band Syndrome",     blog: "Blog 7 of 9" },
  { title: "Knee Bursitis",        blog: "Blog 8 of 9" },
  { title: "Post-KR Rehab",        blog: "Blog 9 of 9" },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const PostKneeReplacementRehab = () => {
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
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
                Knee Pain Series  
              </span>
            
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Post-Knee Replacement{" "}
              <span className="bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent">
                Rehabilitation
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              Surgery is the beginning — not the end. A structured, expert physiotherapy
              rehabilitation programme after knee replacement is what transforms a successful
              operation into a life-changing outcome.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {HERO_STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <span className="text-xl">{s.icon}</span>
                  <div className="text-xs leading-tight">
                    <strong className="block text-blue-700">{s.strong}</strong>
                    <span className="text-gray-500">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-700 to-green-500 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
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
              src={kneeReplacementImage}
              alt="Post knee replacement rehabilitation illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Knee Replacement Rehabilitation?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Total Knee Replacement (TKR) and Partial Knee Replacement (PKR / Unicompartmental
              Knee Arthroplasty) are surgical procedures in which the{" "}
              <strong>damaged articular surfaces of the knee are replaced with prosthetic
              implants</strong>. They are primarily indicated for end-stage knee osteoarthritis
              where conservative management has been exhausted, restoring a pain-free, functional
              joint.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              While the surgery itself is highly successful, the{" "}
              <strong>quality of physiotherapy rehabilitation</strong> in the weeks and months that
              follow is the single greatest determinant of long-term outcome. Patients who engage
              fully in structured rehabilitation achieve dramatically better range of motion,
              strength, function, and quality of life than those who do not.
            </p>

            {/* Surgery types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {SURGERY_TYPES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-100 border border-slate-300 rounded-xl p-4"
                >
                  <span className={`inline-block px-2 py-0.5 mb-2 text-xs font-bold uppercase tracking-widest text-white rounded ${i === 0 ? "bg-blue-700" : "bg-blue-500"}`}>
                    {s.badge}
                  </span>
                  <p className="font-bold text-gray-900 text-sm mb-2">{s.name}</p>
                  <ul className="space-y-1">
                    {s.points.map((pt, j) => (
                      <li key={j} className="text-xs text-gray-700 flex gap-2">
                        <span className="text-blue-500 shrink-0">•</span>{pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Prehab callout */}
            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-600 rounded-r-xl p-4 text-sm text-gray-800 leading-relaxed">
              <strong className="text-amber-700">🏋️ The Power of Prehabilitation:</strong>{" "}
              Research consistently shows that patients who undergo physiotherapy{" "}
              <em>before</em> knee replacement surgery — building quadriceps strength, range of
              motion, and general fitness — have significantly faster post-operative recovery,
              shorter hospital stays, and better 3-month outcomes. We strongly recommend a
              prehabilitation programme of 4–8 weeks before surgery whenever possible.
            </div>
          </div>

          <div>
            {/* Recovery milestones */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Realistic recovery timeline milestones:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {OUTCOME_MILESTONES.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-slate-100 border border-slate-300 rounded-xl p-3 text-center"
                >
                  <span className="block text-base font-bold text-blue-700 leading-none mb-1">{m.time}</span>
                  <p className="text-xs text-gray-600 leading-snug">{m.label}</p>
                </motion.div>
              ))}
            </div>

            {/* What patients experience */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What patients commonly experience post-operatively:
            </h3>
            <ul className="space-y-3">
              {POST_OP_EXPERIENCES.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0"
                >
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── PREHABILITATION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prehabilitation" />
        <SectionTitle title="Optimising Your Outcome Before Surgery" />
        <p className="text-gray-600 mb-8 max-w-2xl">
          In knee replacement, prevention of a poor outcome begins{" "}
          <strong>before the operation</strong>. Prehabilitation — physiotherapy in the weeks
          before surgery — is one of the most impactful investments a patient can make in their
          surgical outcome.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {PREHAB_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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

      {/* ── REHABILITATION ── */}
      <Section bg="gradient">
        <SectionBadge label="03 — Rehabilitation" />
        <SectionTitle title="Post-Operative Rehabilitation at Zeromedixine" />
        <p className="text-gray-600 mb-6 max-w-2xl">
          Our post-knee replacement rehabilitation programme is{" "}
          <strong>structured, progressive, and evidence-based</strong> — carefully coordinated
          with your surgical team's guidelines. Every patient receives an individualised programme
          based on their surgery type, pre-operative fitness, age, and personal goals.
        </p>

        {/* Rehab timeline (vertical with connector) */}
        <div className="relative pl-8 mb-10">
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-600 to-green-500 rounded-full" />
          {REHAB_PHASES.map((ph, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative mb-4 bg-slate-100 border border-slate-300 rounded-xl p-4"
            >
              <div className="absolute -left-5 top-4 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">{ph.phase}</p>
              <p className="font-bold text-gray-900 text-sm mb-1">{ph.title}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{ph.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Key interventions */}
        <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-4 pb-2 border-b-2 border-slate-200">
          Key Physiotherapy Interventions
        </p>
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {KEY_INTERVENTIONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span className="text-blue-400 text-xs">◆</span>
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Return to activities */}
        <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">
          Return to Activities — General Timeline:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {RETURN_ACTIVITIES.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-green-50 border border-green-200 rounded-xl p-3 text-center"
            >
              <span className="text-2xl block mb-1">{a.icon}</span>
              <p className="text-xs font-bold text-green-700 mb-0.5">{a.time}</p>
              <p className="text-xs text-gray-600 leading-snug">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── SERIES COMPLETE ── */}
      <section className="py-16 bg-gradient-to-br from-green-950 to-green-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-green-800/50 border border-green-500/40 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-green-300 mb-4">
            🏁 Knee Series Complete
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Knee Pain Blog Series — Complete!</h3>
          <p className="text-green-200/70 text-sm mb-6 max-w-xl">
            All <strong className="text-green-300">9 Knee Pain blogs</strong> for Zeromedixine
            are now complete. Your patients have access to comprehensive, accurate physiotherapy
            information on every major knee condition you treat.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {SERIES_BLOGS.map((b, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <strong className="block text-green-300 text-sm mb-0.5">✅ {b.title}</strong>
                <span className="text-white/40 text-xs">{b.blog}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> Post-knee replacement
            rehabilitation is highly individualised and must be coordinated with your surgical
            team's specific guidelines. If you are preparing for or recovering from knee
            replacement surgery, book a consultation with our physiotherapy team at Zeromedixine
            for a personalised prehabilitation or rehabilitation programme designed to maximise
            your surgical outcome.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Maximise Your Knee Replacement Outcome?
        </h2>
        <p className="text-gray-700 mb-10">
          Whether you're preparing for surgery or already recovering, our team at Zeromedixine
          will build you a personalised programme to achieve the best possible result.
        </p>
        <button
          onClick={() => navigate("/book-appointment")}
          className="px-10 py-5 bg-gradient-to-r from-blue-700 to-green-500 text-white rounded-full text-lg shadow-xl hover:scale-105 transition"
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
    bg === "gradient" ? "bg-gradient-to-br from-slate-50 to-blue-50"
    : bg === "white"  ? "bg-white"
    : "bg-gray-50";
  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4">{children}</div>
    </section>
  );
};

const SectionBadge = ({ label }) => (
  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">{label}</p>
);

const SectionTitle = ({ title }) => (
  <div className="mb-8">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">{title}</h2>
    <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-700 to-green-500 rounded-full" />
  </div>
);

export default PostKneeReplacementRehab;
