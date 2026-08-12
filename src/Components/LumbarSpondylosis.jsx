import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  AlertCircle,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lumbar_spondylosis from "../assets/Lumbar_spondylosis.webp";
/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Chronic, dull aching pain in the lower back — often worse in the morning or after inactivity",
  "Stiffness in the lumbar spine, particularly after prolonged sitting or upon waking",
  "Reduced range of motion — difficulty bending, twisting, or extending the back",
  "Referred pain, numbness or tingling into the buttocks or legs (if nerve roots are involved)",
  "A grinding or creaking sensation (crepitus) with movement",
];

const PREVENTION = [
  { title: "Stay Active with Low-Impact Exercise",      desc: "Walking, swimming, and cycling maintain disc nutrition, joint health, and spinal mobility without excessive loading." },
  { title: "Build & Maintain a Strong Core",            desc: "The deep stabilising muscles (multifidus and transverse abdominis) act as a natural internal brace, reducing load on degenerating joints and discs." },
  { title: "Maintain a Healthy Body Weight",            desc: "Every extra kilogram increases compressive load on already-stressed lumbar segments, accelerating degenerative change." },
  { title: "Avoid Sustained End-Range Spinal Positions",desc: "Prolonged forward bending, heavy loading in flexion, or sustained excessive lordosis all place asymmetric stress on spondylotic segments." },
  { title: "Practice Good Spinal Hygiene",              desc: "Proper posture during sitting, standing, and lifting throughout the day accumulates into a significant protective effect over time." },
  { title: "Quit Smoking",                              desc: "Smoking impairs blood supply to intervertebral discs, accelerating degeneration and reducing healing capacity — a significant modifiable risk factor." },
  { title: "Stretch Regularly",                         desc: "Maintaining flexibility in the hip flexors, hamstrings, and thoracic spine reduces compensatory strain on the lumbar region." },
  { title: "Seek Early Physiotherapy",                  desc: "Addressing early stiffness, weakness, or postural faults before they become chronic significantly alters the long-term trajectory of lumbar spondylosis." },
];

const TREATMENTS = [
  { title: "Manual Therapy & Joint Mobilisation",  desc: "Skilled passive mobilisation of lumbar facet joints to restore segmental mobility, reduce stiffness and pain, and improve the quality of movement in the lower back." },
  { title: "Myofascial Release (MFR)",              desc: "Targeted release of the thoracolumbar fascia, paraspinal muscles, and quadratus lumborum to reduce the chronic muscular guarding that accompanies spondylotic pain." },
  { title: "Dry Needling",                          desc: "Precise trigger point needling into hyperirritable lumbar and gluteal muscles — rapidly reduces pain, restores muscle function, and improves local circulation in degenerative tissue." },
  { title: "Cupping Therapy",                       desc: "Decompressive cupping along the lumbar and thoracolumbar region promotes blood flow, reduces deep tissue tightness, and provides effective relief from chronic muscular aching." },
  { title: "Lumbar Traction",                       desc: "Manual or mechanical traction to gently decompress spondylotic facet joints and disc spaces, reducing nerve root irritation and improving spinal canal dimensions." },
  { title: "Heat Therapy & Electrotherapy",         desc: "Therapeutic heat improves tissue extensibility and reduces morning stiffness. TENS and interferential therapy (IFT) effectively modulate chronic spondylotic pain." },
  { title: "Spinal Stabilisation Programme",        desc: "A progressive, personalised exercise programme targeting the multifidus, transverse abdominis, and gluteal muscles to rebuild the dynamic support system of the lumbar spine." },
  { title: "Flexibility & Mobility Training",       desc: "Structured lumbar range of motion exercises, hip mobility drills, and hamstring stretching to restore functional movement and reduce stiffness-related pain." },
  { title: "Postural Re-education",                 desc: "Identification and correction of habitual postural faults that accelerate spondylotic change — with practical retraining for sitting, standing, and daily activities." },
  { title: "Hydrotherapy",                          desc: "Warm-water exercise programmes that allow strengthening and mobility work with dramatically reduced gravitational load — ideal for those with significant pain or stiffness." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const LumbarSpondylosis = () => {
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
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Back Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Lumbar{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Spondylosis
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              A guide to understanding spinal degeneration, how to slow it down, and how
              physiotherapy restores your quality of life.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/back-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Back Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center justify-center"
>
  <img
    src={Lumbar_spondylosis}
    alt="Lumber Spondylosis illustration"
    className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
  />
</motion.div>

        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <Section>
        <SectionBadge label="01 — What is it?" />
        <SectionTitle title="What is Lumbar Spondylosis?" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lumbar spondylosis is a degenerative condition of the lower spine caused by the gradual
              wear and tear of the intervertebral discs, vertebral bodies, and facet joints in the
              lumbar region. It is essentially the spine's ageing process — and while it is extremely
              common, it doesn't have to mean a life of pain or limitation.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
              <p className="text-sm text-blue-800 font-medium leading-relaxed">
                Also known as spinal osteoarthritis, lumbar spondylosis is one of the most frequent
                causes of chronic low back pain in adults over 40 — but with the right physiotherapy
                management, most people regain excellent function and comfort.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              As the discs lose water content and height over time, the vertebral bodies come closer
              together. The body responds by forming bone spurs (osteophytes), and the ligaments and
              facet joints can thicken and stiffen. These changes can occasionally narrow the spaces
              where nerve roots exit the spine, leading to referred pain or nerve symptoms.
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
                  transition={{ delay: i * 0.08 }}
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

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How to Prevent Lumbar Spondylosis" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          While age-related change in the spine is natural, physiotherapy research shows that
          lifestyle habits and targeted exercise can significantly slow the progression of lumbar
          spondylosis and reduce its impact on your daily life.
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

      {/* ── TREATMENT ── */}
      {/* <Section bg="gradient">
        <SectionBadge label="03 — Treatment" />
        <SectionTitle title="How We Treat Lumbar Spondylosis at Zeromedixine" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          Our approach combines hands-on treatment to relieve pain and restore movement with an
          active rehabilitation programme that builds lasting strength and resilience. We treat
          the whole person — not just the X-ray findings.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {TREATMENTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h4>
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
            <strong className="text-gray-900">Please note:</strong> Lumbar spondylosis varies
            considerably in its presentation and severity. The information here is for general patient
            education. For an accurate assessment, personalised diagnosis, and treatment plan tailored
            to your spine, please book a consultation with our physiotherapy team at Zeromedixine.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Don't Let Degeneration Define You.
        </h2>
        <p className="text-gray-700 mb-10">
          With the right physiotherapy, most people with lumbar spondylosis regain excellent
          function and a pain-free life.
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

export default LumbarSpondylosis;
