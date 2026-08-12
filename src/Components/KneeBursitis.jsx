import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import kneeBursitisImage from "../assets/knee-bursitis.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Knee Bursitis blog)
───────────────────────────────────────────── */

const HERO_STATS = [
  { icon: "🦵", strong: "3 Main Types",         label: "Prepatellar · Infrapatellar · Pes Anserine" },
  { icon: "🏗️", strong: "Occupational Risk",    label: "Kneeling trades & manual work" },
  { icon: "✅", strong: "Highly Responsive",    label: "To physiotherapy management" },
];

const BURSA_TYPES = [
  {
    badge: "Most Common",
    name: "Prepatellar Bursitis",
    aka: "\"Housemaid's Knee\"",
    desc: "Inflammation of the bursa directly in front of the kneecap — the most common type. Caused by repetitive kneeling or direct impact. Presents as a characteristic fluid-filled lump at the front of the knee.",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-700",
  },
  {
    badge: "Below Patella",
    name: "Infrapatellar Bursitis",
    aka: "\"Clergyman's Knee\"",
    desc: "Inflammation just below the kneecap, between the patellar tendon and the tibia. Associated with deep kneeling or prolonged prayer positions. Tender on palpation below the patella.",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-green-700",
  },
  {
    badge: "Inner Knee",
    name: "Pes Anserine Bursitis",
    aka: "\"Goose Foot Bursitis\"",
    desc: "Affects the bursa on the inner (medial) side of the knee, below the joint. Common in overweight individuals, those with knee OA, and runners with tight hamstrings. Pain 3–5 cm below the medial joint line.",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-500",
  },
];

const TRAUMATIC_CAUSES = [
  "Repetitive kneeling (occupational)",
  "Direct blow to the knee",
  "Repetitive friction from sport",
  "Overuse in running or cycling",
  "Tight hamstrings (pes anserine)",
];

const SYSTEMIC_CAUSES = [
  "Gout — uric acid crystal deposition",
  "Rheumatoid arthritis",
  "Pseudogout",
  "Septic bursitis (bacterial infection)",
  "Obesity increasing medial knee load",
];

const SYMPTOMS = [
  "Localised swelling — often a visibly fluid-filled lump at a specific point around the knee",
  "Tenderness on direct palpation of the affected bursa",
  "Pain with movement — particularly knee flexion or activities that compress the bursa",
  "Warmth and redness over the swollen area — especially in acute or septic cases",
  "Limited range of knee motion — stiffness from the mechanical bulk of the distended bursa",
  "Prepatellar: swelling at the front of the kneecap, pain when kneeling",
  "Pes anserine: inner knee pain below the joint line, worse at night and on stairs",
  "Infrapatellar: tenderness and swelling just below the kneecap, worse with deep kneeling",
];

const PREVENTION = [
  {
    title: "Use Knee Padding for Occupational Kneeling",
    desc: "Anyone who kneels regularly for work should use high-quality, well-cushioned knee pads to distribute pressure away from the prepatellar bursa. This is the single most effective prevention for Housemaid's Knee.",
  },
  {
    title: "Take Regular Breaks from Sustained Kneeling",
    desc: "Even with knee pads, prolonged uninterrupted kneeling increases bursal pressure. Regular rest positions — standing or sitting — reduce cumulative bursal loading throughout the working day.",
  },
  {
    title: "Treat Acute Knee Injuries Promptly",
    desc: "Direct blows to the knee that cause bleeding into the prepatellar bursa (traumatic bursitis) are best managed immediately with ice, compression, and early physiotherapy to prevent chronic bursal thickening.",
  },
  {
    title: "Maintain a Healthy Body Weight",
    desc: "Obesity is a significant risk factor for pes anserine bursitis due to increased medial knee compressive loading. Weight management reduces the mechanical stress on the medial knee structures.",
  },
  {
    title: "Stretch the Hamstrings Regularly",
    desc: "Tight hamstrings increase the compressive load on the pes anserine bursa during knee flexion activities. Regular hamstring stretching is a simple and effective preventive measure, particularly for runners.",
  },
  {
    title: "Strengthen the Muscles Around the Knee",
    desc: "A well-conditioned quadriceps, hamstring, and hip complex distributes forces away from vulnerable bursae during activity, reducing the peak compressive loads that trigger inflammation.",
  },
  {
    title: "Manage Underlying Inflammatory Conditions",
    desc: "Gout, rheumatoid arthritis, and pseudogout are leading causes of non-mechanical bursitis. Optimal medical management of these conditions, in combination with physiotherapy, significantly reduces the frequency and severity of bursal flare-ups.",
  },
];

const REHAB_PHASES = [
  { label: "Phase 1", text: "Inflammation control & pain relief" },
  { label: "Phase 2", text: "Mobility & tissue restoration" },
  { label: "Phase 3", text: "Strengthening & prevention" },
];

const ACUTE_TREATMENTS = [
  {
    title: "RICE Protocol & Compression",
    desc: "Rest from provocative activities, ice application (15–20 minutes, 3–4× daily), compression bandaging, and elevation — the immediate first-line management to control bursal fluid accumulation and acute inflammation.",
  },
  {
    title: "Electrotherapy (IFT / Ultrasound / TENS)",
    desc: "Therapeutic ultrasound is particularly indicated for bursitis — it directly reduces bursal inflammation, promotes fluid reabsorption, and softens chronic bursal thickening. IFT and TENS provide effective pain relief.",
  },
  {
    title: "Activity Modification & Padding",
    desc: "Education on complete avoidance of direct bursal compression during the acute phase — combined with provision and fitting of appropriate knee padding to protect the bursa during any necessary weight-bearing activity.",
  },
  {
    title: "Medical Coordination (If Required)",
    desc: "For significantly distended bursae, we coordinate with the treating physician regarding aspiration (drainage) or corticosteroid injection — physiotherapy begins immediately after to prevent recurrence.",
  },
];

const REHAB_TREATMENTS = [
  {
    title: "Manual Therapy & Soft Tissue Release",
    desc: "Once acute inflammation settles, hands-on soft tissue release of the patellar retinaculum, quadriceps, and pes anserine muscles (sartorius, gracilis, semitendinosus) to reduce mechanical bursal irritation.",
  },
  {
    title: "Myofascial Release (MFR)",
    desc: "Release of the posterior capsule, hamstrings, and medial soft tissue structures — particularly important for pes anserine bursitis where hamstring and medial muscle tightness directly compresses the bursa.",
  },
  {
    title: "Dry Needling",
    desc: "Addresses surrounding muscle trigger points in the quadriceps, hamstrings, and peri-bursal musculature — reduces the secondary muscle guarding and tightness that perpetuates mechanical bursal compression.",
  },
  {
    title: "Cupping Therapy",
    desc: "Applied to the quadriceps, hamstrings, and surrounding soft tissue — once the acute phase has resolved — to reduce chronic tissue tightness and improve the mechanical environment around the affected bursa.",
  },
  {
    title: "Progressive Strengthening",
    desc: "Graded quadriceps, hamstring, and hip strengthening programme — beginning with non-provocative exercises and progressing to functional loading to restore full knee strength and reduce abnormal bursal stress.",
  },
  {
    title: "Hamstring Stretching (Pes Anserine)",
    desc: "Targeted hamstring flexibility programme — essential for pes anserine bursitis where hamstring tightness is a primary driver. Regular stretching significantly reduces the compressive load on the medial bursa during activity.",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const KneeBursitis = () => {
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

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Knee{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Bursitis
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              Inflammation of the small fluid-filled sacs around the knee — causing localised
              swelling, tenderness, and pain. Understand which bursa is involved, what caused it,
              and how we treat it.
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
              src={kneeBursitisImage}
              alt="Knee bursitis illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Knee Bursitis?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Bursae are small, fluid-filled sacs that act as{" "}
              <strong>cushions between tendons, muscles, and bone</strong> throughout the body,
              reducing friction during movement. The knee has several bursae, and when any one of
              them becomes inflamed — due to trauma, repetitive pressure, infection, or inflammatory
              disease — the result is <strong>bursitis</strong>: a painful, swollen, tender
              condition that limits knee movement and function.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Knee bursitis is particularly common in people who kneel frequently for work —
              plumbers, tilers, gardeners, and carpet layers — as well as in athletes and those
              with underlying inflammatory conditions such as gout or rheumatoid arthritis.
            </p>

            {/* Three bursae */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {BURSA_TYPES.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`border rounded-xl p-4 ${b.color}`}
                >
                  <span className={`inline-block px-2 py-0.5 mb-2 text-xs font-bold uppercase tracking-widest text-white rounded ${b.badgeColor}`}>
                    {b.badge}
                  </span>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">{b.name}</p>
                  <p className="text-xs text-green-700 italic mb-2">{b.aka}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Causes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-2">🔴 Traumatic / Mechanical</p>
                <ul className="space-y-1">
                  {TRAUMATIC_CAUSES.map((c, i) => (
                    <li key={i} className="text-xs text-gray-700 flex gap-2">
                      <span className="text-amber-500 shrink-0">•</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-2">🟡 Systemic / Inflammatory</p>
                <ul className="space-y-1">
                  {SYSTEMIC_CAUSES.map((c, i) => (
                    <li key={i} className="text-xs text-gray-700 flex gap-2">
                      <span className="text-amber-500 shrink-0">•</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Septic warning */}
            <div className="bg-gray-950 border border-blue-900/40 rounded-xl p-4 flex gap-3 items-start mt-5">
              <span className="text-xl shrink-0">🚨</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-green-300">Septic Bursitis — Seek Urgent Medical Assessment:</strong>{" "}
                If the swollen bursa is accompanied by significant warmth, redness, fever, rapidly
                increasing size, or a recent skin wound near the knee — this may indicate{" "}
                <strong>septic (infected) bursitis</strong>, a medical emergency requiring urgent
                antibiotic treatment. Do not attempt to treat a hot, rapidly swelling, febrile
                knee bursitis with physiotherapy alone — see a doctor immediately.
              </p>
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
        <SectionTitle title="How to Prevent Knee Bursitis" />
        <p className="text-gray-600 mb-8 max-w-2xl">
          Many cases of knee bursitis are <strong>directly preventable</strong> — particularly the
          occupational and mechanical types. Reducing direct compression and managing the
          biomechanical risk factors significantly reduces incidence.
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
              <div className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
            <strong className="text-gray-900">Please note:</strong> If you have a hot, rapidly
            enlarging, or painful knee swelling accompanied by fever, please seek urgent medical
            assessment before attending physiotherapy to rule out septic bursitis. For all other
            presentations of knee bursitis, our team at Zeromedixine provides accurate assessment
            and effective physiotherapy management. Book a consultation today.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Resolve Your Knee Swelling?</h2>
        <p className="text-gray-700 mb-10">
          Get a personalised bursitis assessment and an effective, phase-driven physiotherapy
          management plan from our team at Zeromedixine.
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

export default KneeBursitis;