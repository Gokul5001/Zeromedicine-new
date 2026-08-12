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
import radiculopathyimage from "../assets/cervical-radiculopathy.webp";

/* ─────────────────────────────────────────────
   DATA  (sourced from the Cervical Radiculopathy blog content)
───────────────────────────────────────────── */
const SYMPTOMS = [
  "Sharp, shooting, or burning pain from the neck into the shoulder, arm, or fingers",
  "Numbness or tingling along a specific arm pattern",
  "Muscle weakness in the shoulder, arm, or grip",
  "Reduced reflexes in the affected arm",
  "Pain that worsens with neck extension or rotation toward the affected side",
  "Relief when raising the arm above the head — a classic sign of radiculopathy",
];

const PREVENTION = [
  { title: "Postural Correction",          desc: "Sustained forward head posture compresses the foramina through which nerve roots exit." },
  { title: "Cervical Mobility Maintenance", desc: "Stiff joints reduce the available space for nerve roots." },
  { title: "Deep Neck Flexor Strengthening", desc: "Restores segmental control and reduces disc and joint stress." },
  { title: "Avoid Provocative Postures",   desc: "Sustained neck extension and heavy overhead work increase nerve root irritation." },
  { title: "Early Intervention",           desc: "Address neck stiffness and arm heaviness before full radiculopathy develops." },
];

const TREATMENTS = [
  { title: "Myofascial Release (MFR)",  desc: "Releases fascial restrictions in the cervical, periscapular, and upper thoracic regions — reducing nerve compression and improving tissue mobility." },
  { title: "Soft Tissue Release (STR)", desc: "Targets the scalenes, upper trapezius, and suboccipital muscles — which tighten in response to nerve root irritation and can themselves contribute to compression." },
  { title: "Neural Mobilisation",       desc: "Gently moves the affected nerve through surrounding tissues — reducing neural adhesions, decreasing inflammation, and restoring free nerve gliding into the arm." },
  { title: "Cervical Traction",         desc: "Widens the intervertebral foramina — directly reducing pressure on the compressed nerve root. Many patients experience immediate reduction in arm symptoms during traction." },
  { title: "Dry Needling",              desc: "Releases trigger points in the neck, shoulder, and arm muscles — calming the sensitised pain pathways associated with radiculopathy." },
  { title: "Cupping Therapy",           desc: "Decompresses soft tissue layers around the nerve pathway — improving circulation and creating a more favourable environment for nerve recovery." },
  { title: "Pain Management",           desc: "TENS therapy is particularly effective for neuropathic arm pain during the acute phase." },
];

const EXERCISES = [
  "Cervical retraction and extension exercises — to centralise and reduce radicular symptoms",
  "Neural flossing and tensioners — for home nerve mobility practice",
  "Deep neck flexor strengthening — restoring segmental stability",
  "Scapular stabilisation — offloading the cervical spine",
  "Progressive upper limb strengthening — restoring muscle function lost from nerve compression",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const CervicalRadiculopathy = () => {
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
          Neck Pain Conditions
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              Neck Pain Series
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Understanding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Cervical Radiculopathy
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              What it is, how to prevent it, and how physiotherapy helps you recover
              — explained by your physiotherapy team.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => navigate("/pain-relief/neck-pain")}
                className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
              >
                All Neck Conditions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            <img
              src={radiculopathyimage}
              alt="Cervical radiculopathy illustration"
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
            <SectionTitle title="What is Cervical Radiculopathy?" />
            <p className="text-gray-700 leading-relaxed mb-4">
              Cervical Radiculopathy occurs when a nerve root in the cervical spine becomes
              compressed, irritated, or inflamed as it exits the spinal canal — producing pain,
              numbness, and weakness that travels down the arm in a specific pattern.
            </p>
            <p className="text-gray-700 leading-relaxed">
              It is commonly caused by a disc prolapse, bone spur, or narrowing of the nerve canal
              (foraminal stenosis). The most frequently affected levels are C6 (symptoms into the
              thumb and index finger) and C7 (symptoms into the middle finger and triceps).
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
      </Section>

      {/* ── PREVENTION ── */}
      <Section bg="white">
        <SectionBadge label="02 — Prevention" />
        <SectionTitle title="How Can Physiotherapy Prevent It?" />
        <p className="text-gray-600 mb-10 max-w-2xl">
          From a physiotherapy perspective, cervical radiculopathy can often be prevented or
          caught early with consistent habits that protect nerve root space and reduce cervical
          loading.
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



      {/* ── WHAT TO EXPECT ── */}
      <Section bg="white">
        <SectionBadge label="04 — What to Expect" />
        <SectionTitle title="What to Expect" />
        <p className="text-gray-700 leading-relaxed max-w-2xl mb-4">
          Assessment includes a thorough neurological examination — testing sensation, reflexes,
          and muscle strength along each nerve root distribution. Treatment progresses from pain
          relief and nerve decompression through to strength restoration and long-term prevention.
        </p>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Cervical radiculopathy is highly treatable. With the right physiotherapy, most patients
          return to full, pain-free function.
        </p>
      </Section>

      {/* ── DISCLAIMER ── */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This page is intended for general
            patient education. Cervical radiculopathy has several possible presentations and the
            right treatment depends on your individual assessment. If you are experiencing neck or
            arm symptoms, please book a consultation with our physiotherapy team for an accurate
            diagnosis and personalised treatment plan.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Relieve Your Neck and Arm Pain?
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
    <div className="mt-3 h-1 w-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-full" />
  </div>
);

export default CervicalRadiculopathy;
