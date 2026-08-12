import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  Stethoscope,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import olecranonbursitisimage from "../assets/Olecranon_Bursitis.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Olecranon Bursitis blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Visible, soft, fluctuant swelling at the very tip of the elbow — often described as an \"egg\" or \"golf ball\" on the elbow",
  "Localised tenderness over the olecranon tip — often uncomfortable on direct palpation or pressure",
  "Relatively preserved elbow range of motion — unlike joint pathology, movement is less restricted unless the bursa is very large",
  "Pain with direct pressure — leaning on the elbow, resting on a desk or armrest",
  "In traumatic cases: may develop rapidly after a direct blow, with bruising present",
  "In inflammatory cases: may be associated with systemic symptoms (joint swelling elsewhere, skin changes in gout)",
  "In septic cases: hot, red, exquisitely tender, rapidly enlarging swelling — with fever and feeling unwell",
  "Chronic cases: thick-walled, less fluctuant, persistent swelling with intermittent flares over months or years",
];

const PREVENTION = [
  { title: "Use Elbow Padding for High-Risk Activities", desc: "Anyone who crawls, kneels on elbows, or works in confined spaces should wear elbow guards. Contact sport athletes should wear elbow protectors to prevent direct trauma." },
  { title: "Avoid Prolonged Leaning on Hard Surfaces", desc: "Desk workers, students, and drivers who habitually rest elbow tips on hard surfaces accumulate compressive bursal stress. Use soft armrests or padded supports." },
  { title: "Treat Acute Elbow Trauma Promptly", desc: "A direct blow causing immediate swelling is best managed with ice, compression, and early physiotherapy — preventing progression to chronic bursal thickening." },
  { title: "Keep Skin Abrasions Near the Elbow Covered", desc: "Septic bursitis most commonly enters through skin breaks near the olecranon. Prompt wound care significantly reduces infection risk." },
  { title: "Manage Underlying Inflammatory Conditions", desc: "For gout, rheumatoid arthritis, or pseudogout, controlling the systemic condition with your physician is the most important preventive strategy." },
  { title: "Avoid Repetitive Friction Without Protection", desc: "Occupations requiring crawling or elbow-weight-bearing on rough surfaces should use protective equipment and monitor for early swelling." },
];

const TREATMENTS = [
  { title: "RICE Protocol & Compression Bandaging", desc: "Rest, ice (15–20 min, 3–4× daily), firm compression bandaging, and elevation — the cornerstone of acute management to control fluid accumulation." },
  { title: "Therapeutic Ultrasound",            desc: "Applied directly over the olecranon bursa to promote fluid reabsorption, reduce inflammation, and soften chronic bursal wall thickening." },
  { title: "Electrotherapy (IFT / TENS)",       desc: "For pain management and reduction of local tissue reactivity, enabling more comfortable movement during recovery." },
  { title: "Protective Padding & Elbow Guard Fitting", desc: "Fitting of elbow padding or a donut-shaped pressure pad protects the inflamed bursa from further compression during daily activities." },
  { title: "Soft Tissue Release & MFR",         desc: "Release of the posterior elbow soft tissue and triceps aponeurosis addresses tightness and adhesions that restrict elbow extension." },
  { title: "Manual Therapy & Elbow Mobilisation", desc: "Gentle elbow joint mobilisation restores full flexion and extension range, particularly if the bursa has limited motion." },
  { title: "Dry Needling",                      desc: "Applied to the triceps and posterior elbow musculature to address secondary trigger points from bursal swelling and altered loading." },
  { title: "Cupping Therapy",                   desc: "Applied to the triceps and posterior elbow once acute inflammation has settled, to improve circulation and reduce tightness." },
  { title: "Progressive Elbow Strengthening",   desc: "Graded triceps, biceps, and forearm strengthening restores full elbow function as the bursa reduces and symptoms resolve." },
  { title: "Activity Modification & Ergonomic Education", desc: "Guidance on eliminating the provocative activities and pressure points that caused or perpetuate the bursitis, preventing recurrence." },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const OlecranonBursitis = () => {
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
                Olecranon Bursitis
              </span>
            </h1>

            <p className="text-sm text-gray-500 italic mb-4">
              Also known as "Student's Elbow" or "Miner's Elbow" — swelling at the tip of the elbow
            </p>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              A visibly swollen, fluid-filled lump at the back of the elbow — often alarming
              in appearance but highly manageable with the right physiotherapy approach when
              correctly identified and treated.
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
    src={olecranonbursitisimage}
    alt="Olecranon bursitis illustration"
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
            <SectionTitle title="What is Olecranon Bursitis?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Olecranon bursitis is the inflammation and distension of the olecranon bursa —
              a small, normally flat fluid-filled sac directly over the bony tip of the elbow
              (the olecranon process of the ulna). In its healthy state, this bursa is barely
              detectable, letting the skin slide freely over the olecranon during movement.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When the bursa becomes irritated — through direct pressure, repeated trauma,
              infection, or systemic inflammatory conditions — it fills with excess fluid,
              producing the characteristic soft, fluid-filled swelling at the elbow tip.
              Despite its often dramatic appearance, most non-septic cases respond well to
              physiotherapy and conservative care.
            </p>

            {/* Three types */}
            <p className="font-semibold text-gray-800 mb-3">Three distinct types — each managed differently:</p>
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-gray-600 text-white px-2 py-0.5 rounded mb-2">
                  Traumatic
                </span>
                <p className="font-semibold text-gray-900 text-sm mb-1">Acute or Repetitive</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Caused by a direct blow or repeated pressure from prolonged leaning. Common
                  in students, tradespeople, and contact sport athletes. Fluid is serous (clear).
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded mb-2">
                  Inflammatory
                </span>
                <p className="font-semibold text-gray-900 text-sm mb-1">Systemic Disease</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Associated with gout, rheumatoid arthritis, or pseudogout. Crystal deposition
                  drives inflammation. Requires concurrent management of the underlying condition.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 rounded mb-2">
                  ⚠️ Septic
                </span>
                <p className="font-semibold text-gray-900 text-sm mb-1">Infected — Urgent</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Bacterial infection (most commonly Staphylococcus aureus) via skin breach or
                  bloodborne spread. Hot, red, painful, rapidly enlarging. Requires urgent
                  antibiotics — see a doctor immediately.
                </p>
              </div>
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

        {/* Causes grid */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">Common Causes & Risk Factors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🛡️", label: "Direct Impact", desc: "Fall on elbow tip, contact sport" },
              { icon: "📚", label: "Prolonged Leaning", desc: "Desk study, elbow on hard surface" },
              { icon: "⛏️", label: "Occupational", desc: "Mining, crawling, plumbing" },
              { icon: "🦠", label: "Skin Wound", desc: "Abrasion near the olecranon" },
              { icon: "🫙", label: "Gout / RA", desc: "Crystal or immune-mediated" },
              { icon: "💊", label: "Haematogenous", desc: "Bloodborne bacteria — rare" },
            ].map((c, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <span className="text-2xl block mb-1">{c.icon}</span>
                <p className="font-semibold text-blue-700 text-sm mb-0.5">{c.label}</p>
                <p className="text-xs text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Septic warning - safety critical */}
        <div className="mt-10 max-w-3xl mx-auto bg-red-50 border-2 border-red-300 rounded-2xl p-6 flex gap-4">
          <AlertTriangle size={24} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-800 leading-relaxed">
            <strong className="text-red-700">URGENT — Septic Olecranon Bursitis Requires Immediate Medical Assessment:</strong>{" "}
            If your elbow swelling is accompanied by significant warmth, redness, fever, rapid
            increase in size, or a recent skin abrasion or wound near the elbow — this may
            indicate septic bursitis, a medical emergency. Do not attend physiotherapy alone —
            see a doctor or emergency department immediately. Septic bursitis requires
            antibiotics and often aspiration or surgical drainage, and can progress to serious
            infection if untreated.
          </p>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Olecranon Bursitis" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Most cases of traumatic and repetitive olecranon bursitis are entirely preventable
          with simple protective strategies. Inflammatory types require management of the
          underlying systemic condition alongside protective measures.
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
        <SectionTitle title="How We Treat Olecranon Bursitis at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Our physiotherapy management begins with accurate classification of the type —
          traumatic, inflammatory, or septic — as each requires a distinctly different
          approach. Non-septic bursitis responds excellently to physiotherapy; septic
          bursitis requires concurrent medical management.
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
            <strong className="text-gray-900">Important:</strong> If your elbow swelling is
            hot, rapidly enlarging, or associated with fever or a recent skin wound, please
            seek urgent medical assessment before attending physiotherapy — septic bursitis
            is a medical emergency. For all non-septic presentations, our physiotherapy team
            provides thorough assessment and effective management.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Resolve Your Elbow Swelling?
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

export default OlecranonBursitis;
