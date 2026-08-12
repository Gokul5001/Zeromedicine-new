import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Target,
  Flag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import piriformis_Syndrome from "../assets/Piriformis_Syndrome.webp";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const AGGRAVATORS = [
  { emoji: "🪑", title: "Prolonged Sitting",  desc: "Compresses piriformis directly" },
  { emoji: "🚶", title: "Walking Uphill",     desc: "Increases hip external rotation demand" },
  { emoji: "🏃", title: "Running",            desc: "Repetitive hip flexion-extension loading" },
  { emoji: "🧗", title: "Stair Climbing",     desc: "Piriformis activation under load" },
  { emoji: "🚗", title: "Long Driving",       desc: "Static compression on the buttock" },
  { emoji: "🔄", title: "Hip Rotation",       desc: "Direct piriformis contraction" },
];

const SYMPTOMS = [
  "Deep, aching pain in the buttock — often one-sided, sometimes bilateral",
  "Radiating pain, numbness, or tingling down the posterior thigh and into the leg — mimicking sciatica",
  "Pain worsened by prolonged sitting, particularly on hard surfaces",
  "Tenderness on deep palpation of the piriformis muscle in the buttock",
  "Pain with hip external rotation movements — crossing the legs, getting in and out of a car",
  "Stiffness and reduced hip range of motion — particularly internal rotation",
  "Symptoms relieved by standing, walking slowly, or lying down flat",
  "No clear lumbar spine involvement on assessment — a key differentiating feature from disc-related sciatica",
];

const PREVENTION = [
  { title: "Avoid Prolonged Sitting on Hard Surfaces",         desc: "Sustained compression of the buttock directly loads the piriformis and the underlying sciatic nerve. Use well-padded seating and take regular standing breaks every 30–40 minutes." },
  { title: "Stretch Piriformis & Hip External Rotators",       desc: "The figure-four stretch, seated cross-leg stretch, and prone hip rotation stretches maintain piriformis length and reduce the risk of muscle tightness compressing the sciatic nerve." },
  { title: "Strengthen the Gluteal Muscles",                   desc: "Weak gluteus medius and maximus force the piriformis to compensate as a primary hip stabiliser, leading to overuse, tightening, and eventual nerve irritation. Strong glutes protect the piriformis." },
  { title: "Correct Running & Walking Biomechanics",           desc: "Excessive hip internal rotation, overpronation of the foot, and a crossover running pattern all place abnormal stress on the piriformis. A biomechanical assessment and gait correction removes these drivers." },
  { title: "Address Leg Length Discrepancy or Hip Asymmetry",  desc: "Structural or functional leg length differences alter pelvic alignment and increase asymmetric loading of the piriformis. Orthotics or corrective exercise can address this effectively." },
  { title: "Warm Up Adequately Before Running & Sport",        desc: "Piriformis syndrome is particularly common in runners who increase mileage too quickly without adequate warm-up and hip mobility preparation." },
  { title: "Don't Sit with a Wallet in Your Back Pocket",      desc: "Consistently sitting on a wallet or phone creates a subtle but chronic compression point directly over the piriformis and sciatic nerve — a well-recognised precipitant of symptoms." },
];

const TREATMENTS = [
  { title: "Deep Soft Tissue Release & MFR",         desc: "Direct manual release of the piriformis muscle and surrounding deep hip external rotators — the obturators and gemelli — to decompress the sciatic nerve and restore normal muscle tone. This is the cornerstone of piriformis treatment." },
  { title: "Dry Needling / Trigger Point Needling",   desc: "Highly effective for piriformis syndrome — fine needles placed directly into active trigger points within the piriformis belly produce rapid pain relief, muscle release, and improved neural mobility." },
  { title: "Cupping Therapy",                         desc: "Decompressive cupping applied to the gluteal and piriformis region lifts tissue rather than compressing it — promoting blood flow, reducing deep fascial adhesions, and relieving chronic sciatic nerve tension." },
  { title: "Neural Mobilisation",                     desc: "Sciatic nerve gliding and flossing exercises to restore neural tissue mobility through and around the piriformis — reducing neural adhesions and the hypersensitivity that maintains radiating symptoms." },
  { title: "Piriformis Stretching Protocol",          desc: "A structured, progressive home stretching programme including the figure-four stretch, seated cross-leg, and prone hip rotation — performed daily to maintain muscle length between treatment sessions." },
  { title: "Gluteal & Hip Strengthening",             desc: "Progressive strengthening of gluteus medius and maximus to eliminate the compensatory overloading of the piriformis — addressing the root biomechanical cause of the condition and preventing recurrence." },
  { title: "Electrotherapy (TENS / IFT)",             desc: "Applied to the gluteal and posterior hip region for pain relief, reduction of muscle guarding, and improvement in local circulation during the acute and subacute phases of treatment." },
  { title: "Sacroiliac Joint Assessment & Treatment", desc: "SI joint dysfunction frequently coexists with piriformis syndrome — our physiotherapists assess and treat both simultaneously to ensure a complete and lasting resolution of symptoms." },
  { title: "Biomechanical & Gait Assessment",         desc: "Video gait analysis and lower limb alignment assessment to identify and correct the movement faults — overpronation, Trendelenburg gait, crossover running — that drive piriformis overload." },
  { title: "Activity Modification & Education",       desc: "Practical guidance on seating, driving position, running load management, and daily habits — removing the external factors that perpetuate piriformis compression and sciatic nerve irritation." },
];

const SERIES_COMPLETE = [
  { title: "Sciatica",              blog: "Blog 1 of 9", slug: "/back-pain/sciatica" },
  { title: "Lumbar Spondylosis",    blog: "Blog 2 of 9", slug: "/back-pain/lumbar-spondylosis" },
  { title: "Disc Herniation",       blog: "Blog 3 of 9", slug: "/back-pain/disc-herniation" },
  { title: "Postural Back Pain",    blog: "Blog 4 of 9", slug: "/back-pain/postural-back-pain" },
  { title: "Mechanical Back Pain",  blog: "Blog 5 of 9", slug: "/back-pain/mechanical-back-pain" },
  { title: "Lumbar Canal Stenosis", blog: "Blog 6 of 9", slug: "/back-pain/lumbar-canal-stenosis" },
  { title: "Pregnancy Back Pain",   blog: "Blog 7 of 9", slug: "/back-pain/pregnancy-back-pain" },
  { title: "Scoliosis",             blog: "Blog 8 of 9", slug: "/back-pain/scoliosis" },
  { title: "Piriformis Syndrome",   blog: "Blog 9 of 9", slug: "/back-pain/piriformis-syndrome" },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const PiriformisSyndrome = () => {
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
          Back Pain Conditions
        </button>
        <div className="flex items-center gap-2 mt-1">
    
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Back Pain Series · Final Blog
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Piriformis{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Syndrome
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              A deep buttock condition that mimics sciatica — yet requires a completely different
              treatment approach. Often missed, but highly responsive to the right physiotherapy.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/back-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Back Conditions
              </button>
            </div>
          </motion.div>

          {/* Anatomy cards */}
          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
>
  <img
    src={piriformis_Syndrome}
    alt="piriformis Syndrome illustration"
    className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
  />
</motion.div>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Piriformis Syndrome?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-5">
              Piriformis syndrome is a neuromuscular condition in which the piriformis muscle — a
              small, deep external hip rotator located within the buttock — irritates or compresses
              the sciatic nerve. The result is buttock pain and sciatica-like symptoms that originate
              not in the lumbar spine, but deep within the hip and gluteal region.
            </p>

            {/* Misdiagnosis warning */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-6">
              <p className="text-sm text-amber-800 font-semibold mb-1">⚠️ Commonly Misdiagnosed</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                Piriformis syndrome is frequently confused with lumbar disc herniation or sciatica
                because the symptoms are remarkably similar. The critical difference is that the nerve
                compression occurs at the piriformis muscle in the buttock — not at the lumbar spine.
                Accurate diagnosis requires a skilled physiotherapy assessment; treatment directed at
                the wrong source will not resolve symptoms.
              </p>
            </div>

            {/* Aggravating activities */}
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Activities & Postures That Aggravate
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {AGGRAVATORS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-xl p-3 shadow-sm flex items-start gap-3"
                >
                  <span className="text-xl shrink-0 leading-none">{a.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">Common Symptoms</h3>
            <ul className="space-y-3">
              {SYMPTOMS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`flex items-start gap-3 ${i === SYMPTOMS.length - 1 ? "p-3 bg-blue-50 rounded-xl border border-blue-100" : ""}`}
                >
                  <CheckCircle
                    size={17}
                    className={`shrink-0 mt-0.5 ${i === SYMPTOMS.length - 1 ? "text-blue-500" : "text-green-500"}`}
                  />
                  <span className={`text-sm leading-relaxed ${i === SYMPTOMS.length - 1 ? "text-blue-800 font-medium" : "text-gray-700"}`}>
                    {s}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Piriformis Syndrome" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Piriformis syndrome is largely a preventable condition driven by muscle imbalances,
          prolonged static postures, and biomechanical faults. Addressing these proactively keeps
          the piriformis healthy and the sciatic nerve irritation-free.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {PREVENTION.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 p-5 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
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

   

      {/* ── SERIES COMPLETE ── */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              <Flag size={14} />
              Back Pain Blog Series — Complete!
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              All 9 Back Pain Blogs
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Your patients can now access accurate, professional physiotherapy information on every
              major back condition — from sciatica to scoliosis to piriformis syndrome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SERIES_COMPLETE.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => navigate(item.slug)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`group text-left flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  i === SERIES_COMPLETE.length - 1
                    ? "border-green-200 bg-green-50 hover:bg-green-100"
                    : "border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-100"
                }`}
              >
                <CheckCircle
                  size={18}
                  className={`shrink-0 ${i === SERIES_COMPLETE.length - 1 ? "text-green-500" : "text-green-400"}`}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400">{item.blog}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Please note:</strong> Piriformis syndrome requires a
            skilled differential assessment to distinguish it from lumbar disc herniation and other
            causes of sciatica. If you are experiencing deep buttock pain with or without radiating
            leg symptoms, please book a consultation with our physiotherapy team at Zeromedixine for
            an accurate diagnosis and targeted treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Buttock Pain That Won't Quit? It Could Be Piriformis.
        </h2>
        <p className="text-gray-700 mb-10">
          Precise diagnosis and targeted treatment — get to the right source, and feel the
          difference fast.
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

export default PiriformisSyndrome;
