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
import radialtunnelimage from "../assets/Radial_Tunnel.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Radial Tunnel Syndrome blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Aching pain in the lateral elbow and proximal forearm — often deep, diffuse, and difficult to localise precisely",
  "Maximum tenderness 4–5 cm distal to the lateral epicondyle — over the mobile wad, NOT over the epicondyle itself",
  "Pain reproduced by resisted forearm supination and resisted middle finger extension",
  "Worsened by sustained forearm rotation and repetitive wrist extension activities",
  "Nocturnal lateral elbow aching — characteristic of neural involvement, often absent in pure tendinopathy",
  "No neurological deficit — no weakness of wrist or finger extension, no numbness (pure PIN entrapment is motor only)",
  "History of failed tennis elbow treatment — a strong diagnostic indicator",
  "Pain that radiates distally into the posterior forearm in some cases",
];

const PREVENTION = [
  { title: "Avoid Sustained Supination Under Load", desc: "Activities combining forearm supination with wrist extension and resistance (screwdriving, hammering, racket backhand) are the primary mechanical drivers of radial tunnel nerve stress." },
  { title: "Progressive Forearm Strengthening",      desc: "A well-conditioned supinator and forearm extensor group reduces peak neuromuscular demand on the radial tunnel region during activity." },
  { title: "Correct Posture & Upper Limb Mechanics", desc: "Sustained elbow extension with forearm pronation during repetitive tasks places the PIN under repeated tension. Ergonomic correction reduces cumulative neural stress." },
  { title: "Regular Breaks from Tool Use",           desc: "Frequent micro-breaks of 30–60 seconds every 20–30 minutes of sustained tool work significantly reduce compressive and tensile load cycles on the PIN." },
  { title: "Address Lateral Elbow Pain Early",        desc: "Accurate early diagnosis is the most important prevention strategy. Months of misdirected tennis elbow treatment allows progressive nerve irritation and a more protracted recovery." },
];

const TREATMENTS = [
  { title: "Radial Nerve Neurodynamic Mobilisation", desc: "Radial nerve slider and tensioner exercises restore PIN mobility within the radial tunnel and reduce neural adhesions at the arcade of Frohse." },
  { title: "MFR — Supinator & ECRB Release",         desc: "Targeted myofascial release of the supinator muscle, ECRB tendinous border, and radial tunnel fascia directly decompresses the PIN at its entrapment sites." },
  { title: "Dry Needling",                           desc: "Applied to the supinator, ECRB, and lateral forearm muscles to release trigger points and reduce muscular tension that narrows the PIN's passage." },
  { title: "Manual Therapy & Elbow Mobilisation",    desc: "Elbow joint and proximal radioulnar joint mobilisation restores forearm rotation and reduces mechanical stress on the PIN during supination and pronation." },
  { title: "Cupping Therapy",                        desc: "Decompressive cupping over the lateral and posterior forearm separates fascial layers around the radial tunnel and improves local circulation." },
  { title: "Electrotherapy (TENS / IFT)",            desc: "Pain modulation at the lateral elbow and proximal forearm reduces nerve hypersensitivity, enabling more comfortable active rehabilitation." },
  { title: "Home Neural Gliding Programme",          desc: "A personalised radial nerve gliding programme for daily practice maintains neural mobility and reduces the PIN's susceptibility to irritation." },
  { title: "Progressive Forearm Strengthening",      desc: "Graduated supinator, wrist extensor, and forearm pronator strengthening, progressing through full range as neural symptoms settle." },
  { title: "Activity & Ergonomic Modification",      desc: "Reducing repetitive forearm rotation activities and correcting workstation ergonomics minimises cumulative PIN compression." },
  { title: "Proximal Kinetic Chain Strengthening",   desc: "Shoulder, scapular stabiliser, and rotator cuff strengthening reduces compensatory demand on the forearm muscles." },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const RadialTunnelSyndrome = () => {
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
                Radial Tunnel Syndrome
              </span>
            </h1>

            <p className="text-sm text-gray-500 italic mb-4">
              Posterior Interosseous Nerve Entrapment — frequently mistaken for resistant Tennis Elbow
            </p>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              A nerve entrapment condition of the outer elbow and proximal forearm that is
              persistently underdiagnosed — often treated for years as tennis elbow without
              improvement. Accurate diagnosis changes everything.
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
    src={radialtunnelimage}
    alt="Radial tunnel syndrome illustration"
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
            <SectionTitle title="What is Radial Tunnel Syndrome?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Radial tunnel syndrome is an entrapment neuropathy of the posterior interosseous
              nerve (PIN) — the deep motor branch of the radial nerve — as it passes through
              the radial tunnel, a fibromuscular channel roughly 5 cm long just distal to the
              lateral elbow. Compression here produces lateral elbow and proximal forearm pain
              without the weakness or numbness typically seen in more severe nerve entrapments.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              It's one of the most persistently underdiagnosed conditions in upper limb
              physiotherapy — frequently treated for months or years as resistant tennis elbow
              without improvement, because the pain distributions overlap significantly.
            </p>
            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-r-xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-amber-700">The most commonly missed diagnosis in lateral elbow pain:</strong>{" "}
                Tennis elbow responds to tendon loading; radial tunnel syndrome requires neural
                decompression. The key distinguishing feature is the location of maximum
                tenderness — over the lateral epicondyle in tennis elbow, and 4–5 cm distal to
                the epicondyle (over the radial tunnel) in radial tunnel syndrome.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Four sites can compress the nerve within the tunnel: the <strong>arcade of
              Frohse</strong> (the most common site, at the supinator's proximal edge), the{" "}
              <strong>radial recurrent vessels</strong> (leash of Henry), the tendinous border
              of the <strong>ECRB</strong>, and the <strong>distal supinator edge</strong>.
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

        {/* Test comparison */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-teal-600 text-white px-2.5 py-1 rounded mb-3">
              Radial Tunnel
            </span>
            <p className="font-semibold text-gray-900 mb-2 text-sm">Key Clinical Features</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Tenderness 4–5 cm distal to the lateral epicondyle. Positive resisted middle
              finger extension test. Pain reproduced by resisted forearm supination. No
              tender spot over the lateral epicondyle. Often no crepitus.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-orange-600 text-white px-2.5 py-1 rounded mb-3">
              Tennis Elbow
            </span>
            <p className="font-semibold text-gray-900 mb-2 text-sm">Key Clinical Features</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Maximum tenderness directly over the lateral epicondyle. Positive Cozen's test
              (resisted wrist extension). Pain with gripping and wrist extension. Tender
              lateral epicondyle on palpation. Often crepitus present.
            </p>
          </div>
        </div>
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Radial Tunnel Syndrome" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Radial tunnel syndrome is primarily driven by repetitive forearm supination, wrist
          extension under load, and sustained compression of the radial tunnel region.
          Prevention focuses on reducing cumulative mechanical stress on the PIN at its
          entrapment sites.
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
        <SectionTitle title="How We Treat Radial Tunnel Syndrome at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Successful treatment begins with accurate diagnosis — distinguishing radial tunnel
          syndrome clearly from lateral epicondylalgia. Once confirmed, treatment targets the
          radial tunnel directly with neural decompression, soft tissue release, and
          progressive forearm rehabilitation.
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
            <strong className="text-gray-900">Important:</strong> Radial tunnel syndrome
            requires expert clinical assessment to distinguish it from tennis elbow and other
            lateral elbow conditions. If you have persistent lateral elbow pain that hasn't
            responded to tennis elbow treatment, please book a consultation with our
            physiotherapy team for an accurate differential assessment and targeted plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Get the Right Diagnosis?
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

export default RadialTunnelSyndrome;