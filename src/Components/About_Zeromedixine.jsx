import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  Target,
  Eye,
  Heart,
  Activity,
  ShieldCheck,
  Users,
  Award,
  Smile,
  Stethoscope,
  ClipboardCheck,
  Move,
} from "lucide-react";

// ── Lazy-loaded sections reused from the Home page ──
// Adjust the import paths below if this file lives in a different
// folder relative to these components (they currently assume both
// files sit in the same "Components" directory, matching App.jsx).
const FounderReelSection = lazy(() => import("./FounderReelSection"));
const WhyChooseUs        = lazy(() => import("./WhyChooseUs"));
const BMICalculator      = lazy(() => import("./BMICalculator"));
const OurClinics         = lazy(() => import("./OurClinics"));
const Testimonials       = lazy(() => import("./Testimonial"));

const BRAND = {
  primary: "#1e8fd3",
  secondary: "#40d3b6",
  text: "#4d4d4d",
};

/* Animation */
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

/** Simple fallback shown while a lazy section loads */
const SectionLoader = () => <div className="text-center py-10"></div>;

/**
 * Eyebrow + gradient-title heading, matching the
 * "WHY CHOOSE ZEROMEDIXINE — 12,000+ Patients Trust Us" style.
 * Pass `dark` when the section sits on a dark/colored background.
 */
const SectionHeading = ({
  eyebrow,
  titleStart,
  titleEnd,
  subtitle,
  dark = false,
  align = "center",
}) => (
  <motion.div
    variants={itemVariants}
    className={`mb-12 ${align === "center" ? "text-center mx-auto" : ""} max-w-2xl`}
  >
    <div
      className={`flex items-center gap-2 mb-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span
        className="w-7 h-px"
        style={{ background: dark ? "rgba(255,255,255,0.6)" : BRAND.primary }}
      />
      <span
        className="text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: dark ? "rgba(255,255,255,0.85)" : BRAND.primary }}
      >
        {eyebrow}
      </span>
    </div>

    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
      {dark ? (
        <span className="text-white">
          {titleStart} {titleEnd}
        </span>
      ) : (
        <>
          <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            {titleStart}
          </span>{" "}
          <span className="text-gray-900">{titleEnd}</span>
        </>
      )}
    </h2>

    {subtitle && (
      <p
        className={
          dark ? "text-white/85 text-lg" : "text-gray-600 text-lg"
        }
      >
        {subtitle}
      </p>
    )}
  </motion.div>
);

/* ── Trust stats — edit these numbers to match your real figures ── */
const STATS = [
  { icon: Users, value: "12,000+", label: "Patients Trust Us" },
  { icon: Award, value: "10+", label: "Years of Experience" },
  { icon: Smile, value: "95%", label: "Recovery Success Rate" },
  { icon: Stethoscope, value: "20+", label: "Expert Physiotherapists" },
];

/* ── What We Do — now paired with icons ── */
const WHAT_WE_DO = [
  {
    icon: Activity,
    title: "Advanced physiotherapy techniques",
    desc: "Evidence-based methods tailored to your body's needs.",
  },
  {
    icon: ClipboardCheck,
    title: "Personalised recovery plans",
    desc: "Every program is built around your unique condition and goals.",
  },
  {
    icon: Stethoscope,
    title: "Root-cause diagnosis",
    desc: "We look beyond symptoms to find and treat the real problem.",
  },
  {
    icon: Move,
    title: "Functional movement correction",
    desc: "Restoring natural, pain-free movement for the long term.",
  },
];

export default function AboutUs() {
  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>About Us | Zeromedixine</title>
        <meta
          name="description"
          content="Learn about Zeromedixine – a modern physiotherapy platform focused on root-cause healing, chronic pain recovery, and long-term wellness without surgery or medication."
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Zeromedixine",
            url: "https://zeromedixine.com",
            description:
              "A modern physiotherapy platform focused on treating chronic pain and lifestyle diseases at the root cause.",
          })}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="relative pt-32 pb-2 px-6 text-center">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(1200px 600px at 10% 10%, ${BRAND.primary}11, transparent),
                         radial-gradient(900px 500px at 90% 90%, ${BRAND.secondary}11, transparent),
                         linear-gradient(180deg,#ffffff, #f6f9f8)`,
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-semibold mb-4"
          >
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Zeromedixine
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg leading-relaxed"
          >
            A modern health and recovery platform focused on treating the root
            cause of pain — not just symptoms.
          </motion.p>
        </motion.div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow="Our Story"
            titleStart="Who We"
            titleEnd="Are"
          />

          <motion.p variants={itemVariants} className="text-gray-600 mb-4">
            Zeromedixine is a modern health and recovery platform dedicated to
            addressing the underlying causes of pain, rather than just managing
            symptoms.
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-600 mb-4">
            We believe true healing goes beyond temporary relief — it’s about
            rebuilding strength, movement, and balance.
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-600 mb-10">
            Using advanced physiotherapy and tailored care, we help individuals
            recover better, move freely, and build lasting health.
          </motion.p>

          {/* Trust stat strip */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-md shadow-slate-200/70 p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div
                  className="mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.primary}1a, ${BRAND.secondary}1a)`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: BRAND.primary }} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Specialisations */}
          <motion.ul
            variants={containerVariants}
            className="grid sm:grid-cols-3 gap-4"
          >
            {[
              "Chronic pain management",
              "Sports injury rehabilitation",
              "Lifestyle-related conditions",
            ].map((item, i) => (
              <motion.li
                variants={itemVariants}
                key={i}
                className="bg-white p-4 rounded-xl shadow-md shadow-slate-200/70 text-gray-700 flex items-center gap-2"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: BRAND.secondary }}
                />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-green-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <SectionHeading
            eyebrow="Our Approach"
            titleStart="What We"
            titleEnd="Do"
            subtitle="We combine science, physiotherapy, and personalized care to treat pain at its foundation — helping you regain mobility, strength, and confidence."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_WE_DO.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                variants={itemVariants}
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md shadow-slate-200/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${BRAND.secondary}1f` }}
                >
                  <Icon className="w-5 h-5" style={{ color: BRAND.secondary }} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Our Purpose"
          titleStart="Mission &"
          titleEnd="Vision"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md shadow-slate-200/70 p-8 hover:shadow-xl transition-shadow"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${BRAND.secondary}1f` }}
            >
              <Target className="w-5 h-5" style={{ color: BRAND.secondary }} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To help people heal from within — without surgery or medication —
              using personalized, evidence-based care that improves health and
              lifestyle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md shadow-slate-200/70 p-8 hover:shadow-xl transition-shadow"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${BRAND.primary}1f` }}
            >
              <Eye className="w-5 h-5" style={{ color: BRAND.primary }} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A world where people live pain-free by addressing root causes,
              staying active, and avoiding unnecessary medical dependency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTIONS BROUGHT IN FROM THE HOME PAGE
      ══════════════════════════════════════ */}

      <Suspense fallback={<SectionLoader />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <FounderReelSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <BMICalculator />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <OurClinics />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
{/* 
      <section className="py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
            <Heart className="text-white w-7 h-7" />
          </div>

          <SectionHeading
            eyebrow="Our Commitment"
            titleStart="Our"
            titleEnd="Promise"
            subtitle="We don’t just treat pain — we help change lives."
            dark
          />

          <p className="text-xl font-medium text-white mb-8">
            Help you move better, feel stronger, and live pain-free.
          </p>

          <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Trusted by 12,000+ patients across our clinics</span>
          </div>
        </motion.div>
      </section> */}
    </>
  );
}

