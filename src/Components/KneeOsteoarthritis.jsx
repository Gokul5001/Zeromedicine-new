import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  Stethoscope,
  AlertCircle,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import kneeOAImage from "../assets/knee-osteoarthritis.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Knee OA blog content)
───────────────────────────────────────────── */

const OA_GRADES = [
  {
    grade: "Grade I",
    label: "Doubtful",
    desc: "Minor osteophyte formation, minimal symptoms, joint space largely preserved.",
  },
  {
    grade: "Grade II",
    label: "Mild",
    desc: "Definite osteophytes, possible joint space narrowing beginning to appear.",
  },
  {
    grade: "Grade III",
    label: "Moderate",
    desc: "Marked narrowing, multiple osteophytes, subchondral sclerosis present.",
  },
  {
    grade: "Grade IV",
    label: "Severe",
    desc: "Gross narrowing, large osteophytes, severe sclerosis and visible deformity.",
  },
];

const JOINT_PANELS = [
  {
    title: "Cartilage Loss",
    desc: "Smooth articular cartilage thins, softens, and erodes — reducing the joint's cushioning and increasing bone-on-bone stress.",
  },
  {
    title: "Osteophytes",
    desc: "The body attempts to stabilise the joint by forming bone spurs at the joint margins — these cause pain, restrict movement, and alter joint mechanics.",
  },
  {
    title: "Synovitis",
    desc: "The joint lining becomes inflamed, producing excess fluid (effusion) — causing the characteristic swelling and warmth seen in OA flare-ups.",
  },
];

const LOAD_FACTS = [
  { value: "3×", label: "Body weight through knee during walking" },
  { value: "6×", label: "Body weight through knee when jogging" },
  { value: "4 kg", label: "Knee load reduction per 1 kg of weight lost" },
];

const SYMPTOMS = [
  "Deep, aching pain inside or around the knee — often a dull throb that worsens with activity",
  "Morning stiffness lasting less than 30 minutes — a key distinguishing feature from inflammatory arthritis",
  "Crepitus — audible or palpable grinding, clicking, or creaking during movement",
  "Joint swelling and occasional warmth during flare-ups",
  "Reduced range of motion — difficulty fully straightening or bending the knee",
  "Weakness and instability — the knee may feel like it 'gives way' due to quadriceps weakness",
  "Pain worsened by stairs, prolonged walking, squatting, or sitting with the knee bent",
  "Gradual bowing of the leg (varus deformity) in medial compartment OA — the most common pattern",
];

const PREVENTION = [
  {
    title: "Maintain a Healthy Body Weight",
    desc: "The single most impactful modifiable risk factor. Every kilogram of weight lost reduces the compressive force on each knee by approximately 4 kg during walking.",
  },
  {
    title: "Exercise with Low-Impact Activity",
    desc: "Swimming, cycling, and walking preserve cartilage health, maintain muscle strength, and reduce joint loading without the high impact of running or jumping.",
  },
  {
    title: "Strengthen Quadriceps & Hip Muscles",
    desc: "Strong quadriceps reduce compressive joint loading; strong hip abductors and external rotators reduce valgus knee stress and protect the medial compartment.",
  },
  {
    title: "Treat Previous Knee Injuries Promptly",
    desc: "ACL tears, meniscal damage, and previous fractures dramatically increase OA risk. Thorough physiotherapy rehabilitation after injury is essential prevention.",
  },
  {
    title: "Wear Supportive Footwear",
    desc: "Appropriate footwear and orthotics where indicated reduce abnormal knee loading patterns and protect articular cartilage during daily activity.",
  },
  {
    title: "Avoid Sustained Deep Knee Flexion",
    desc: "Prolonged squatting, kneeling, or deep knee bending increases patellofemoral and tibiofemoral joint compression, accelerating cartilage wear in vulnerable areas.",
  },
  {
    title: "Manage Occupational Knee Loading",
    desc: "Those in trades, agriculture, or jobs requiring prolonged kneeling should use knee pads, modify work practices, and prioritise strengthening to offset cumulative joint stress.",
  },
  {
    title: "Stay Physically Active Long-Term",
    desc: "Cartilage nutrition depends on cyclical joint loading and movement. Sedentary lifestyles impair cartilage health; regular appropriate exercise is genuinely protective.",
  },
];

const HANDS_ON_TREATMENTS = [
  {
    title: "Manual Therapy & Joint Mobilisation",
    desc: "Tibiofemoral and patellofemoral joint mobilisation to restore mobility, reduce stiffness, decrease pain, and improve the quality of movement — highly effective even in moderate-grade OA.",
  },
  {
    title: "Myofascial Release (MFR)",
    desc: "Release of the ITB, quadriceps, hamstrings, and calf fascia — addressing the chronic soft tissue tightness that increases compressive loading on the arthritic knee joint.",
  },
  {
    title: "Dry Needling",
    desc: "Targeted trigger point needling into the vastus medialis, quadriceps, and hamstrings — reduces pain, improves neuromuscular activation, and enhances the response to exercise rehabilitation.",
  },
  {
    title: "Cupping Therapy",
    desc: "Applied to the quadriceps and surrounding musculature to decompress chronic tissue tightness, improve local circulation, and reduce the compressive forces acting on the knee joint.",
  },
  {
    title: "Electrotherapy (TENS / IFT / Ultrasound)",
    desc: "TENS and IFT for effective pain relief; therapeutic ultrasound to reduce joint effusion and support tissue health — particularly valuable during painful flare-ups.",
  },
  {
    title: "Taping Techniques",
    desc: "McConnell patellofemoral taping or Kinesio-taping to correct patellar tracking, unload the medial or lateral compartment, and provide immediate pain relief during rehabilitation.",
  },
];

const ACTIVE_TREATMENTS = [
  {
    title: "Quadriceps & VMO Strengthening",
    desc: "The cornerstone of knee OA rehabilitation — VMO activation, straight leg raises, mini squats, and leg press progressively rebuild the quadriceps' ability to off-load the joint during walking and stairs.",
  },
  {
    title: "Hip Abductor & Glute Strengthening",
    desc: "Strong hip muscles reduce medial compartment loading and valgus knee stress — one of the most effective strategies for reducing pain in medial knee OA.",
  },
  {
    title: "Hydrotherapy",
    desc: "Warm-water exercise significantly reduces joint loading while enabling progressive strengthening — ideal for those with significant pain, obesity, or bilateral OA who cannot yet exercise on land.",
  },
  {
    title: "Aerobic Conditioning Programme",
    desc: "Guided low-impact cardiovascular exercise to manage weight, reduce systemic inflammation, improve mood, and maintain overall physical function — all evidence-based OA management goals.",
  },
  {
    title: "Gait Retraining & Orthotics",
    desc: "Correction of gait patterns that increase medial or lateral compartment loading — combined with footwear advice and orthotic prescription where appropriate to reduce knee joint stress.",
  },
  {
    title: "Education & Self-Management",
    desc: "Empowering you with strategies for pacing activity, managing flare-ups, understanding OA, and maintaining the gains from physiotherapy independently for the long term.",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const KneeOsteoarthritis = () => {
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
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Knee Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Knee{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Osteoarthritis
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              The most common joint disease in the world — yet one of the most successfully managed
              with physiotherapy. Learn what is happening inside your knee and how we help you move
              freely again.
            </p>

            {/* Hero stats */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: "🌍", strong: "Most Common", label: "Joint disease worldwide" },
                { icon: "👴", strong: "1 in 3 Adults", label: "Over age 60 affected" },
                { icon: "💪", strong: "Highly Treatable", label: "Exercise is medicine" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm"
                >
                  <span className="text-xl">{stat.icon}</span>
                  <div className="text-xs leading-tight">
                    <strong className="block text-blue-700">{stat.strong}</strong>
                    <span className="text-gray-500">{stat.label}</span>
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
              src={kneeOAImage}
              alt="Knee osteoarthritis illustration"
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Knee Osteoarthritis?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Knee osteoarthritis (OA) is a <strong>degenerative joint condition</strong> characterised by
              the progressive breakdown of articular cartilage — the smooth, protective tissue that covers
              the ends of bones within the knee joint. As cartilage thins and erodes, the underlying bone
              is exposed, leading to pain, inflammation, stiffness, and reduced function.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              It is the <strong>most common form of arthritis</strong> and one of the leading causes of pain
              and disability worldwide. Knee OA is not purely a disease of old age — while it is more
              prevalent after 50, it can develop earlier following previous knee injury, in those carrying
              excess weight, or in people with high occupational joint loading.
            </p>

            {/* Key insight callout */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 text-sm text-gray-700 leading-relaxed">
              <strong className="text-amber-700">Important:</strong> X-ray findings do <em>not</em> determine
              how much pain or disability you experience. Many people have significant arthritic changes on
              imaging but minimal symptoms — and vice versa.{" "}
              <strong className="text-amber-700">Physiotherapy is effective regardless of your X-ray grade.</strong>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">Common Symptoms</h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 pb-3 border-b border-blue-50 last:border-0"
                >
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* OA Grades */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kellgren–Lawrence Grading Scale
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OA_GRADES.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center"
              >
                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">
                  {g.grade}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{g.label}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What happens inside the knee */}
        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
            What Happens Inside the Knee in OA
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {JOINT_PANELS.map((jp, i) => (
              <div key={i} className="bg-white border border-blue-200 rounded-xl p-4 text-sm">
                <strong className="block text-blue-700 mb-1">{jp.title}</strong>
                <span className="text-gray-600 leading-relaxed">{jp.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Load facts */}
        <div className="mt-10">
          <p className="text-sm font-semibold text-gray-800 mb-3">
            The impact of body weight on knee joint loading:
          </p>
          <div className="flex divide-x divide-blue-200 border border-blue-200 rounded-xl overflow-hidden">
            {LOAD_FACTS.map((lf, i) => (
              <div key={i} className="flex-1 bg-blue-50 p-4 text-center">
                <span className="block text-2xl font-bold text-blue-700">{lf.value}</span>
                <span className="text-xs text-gray-600 leading-snug mt-1 block">{lf.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Knee Osteoarthritis" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          While genetic predisposition and ageing contribute to OA, the majority of modifiable risk
          factors are within your control. Physiotherapy-informed lifestyle strategies can dramatically
          slow the onset and progression of knee OA.
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

   

      {/* ── SERIES NOTE ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900 to-green-950 border border-green-800/30 rounded-2xl p-6 flex gap-4 items-center">
          <span className="text-4xl shrink-0">🦵</span>
          <p className="text-sm text-green-100/70 leading-relaxed">
            <strong className="text-green-300">Welcome to the Knee Pain Series!</strong> This is Blog 1 of 9
            in our Knee Pain collection. Coming next: Runner's Knee, ACL/PCL Injuries, Meniscus Tears,
            Patellar Tendonitis, Chondromalacia Patella, IT Band Syndrome, Knee Bursitis, and
            Post-Knee Replacement Rehabilitation.
          </p>
        </div>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> Knee osteoarthritis management is
            highly individualised. The right programme depends on your grade of OA, symptoms, activity
            level, and goals. If you are experiencing knee pain, stiffness, or reduced function, please
            book a consultation with our physiotherapy team at Zeromedixine for a thorough assessment
            and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Move Freely Again?
        </h2>
        <p className="text-gray-700 mb-10">
          Get a personalised knee assessment and start your recovery — no surgery, no injections.
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

export default KneeOsteoarthritis;
