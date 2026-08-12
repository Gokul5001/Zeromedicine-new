//Latest present code

// src/Components/HeroSection.jsx
import React from "react";
import {
  Wifi,
  User,
  CalendarCheck,
  Activity,
  ShieldCheck,
  Star,
  Lock,
  PlayCircle,
  ArrowRight,
  Heart,
  Users,
  Headphones,
} from "lucide-react";

import doctor1 from "../assets/dr_kavita_singhal_physiotheraphist.webp";
import doctor2 from "../assets/Dr. Ayman_sha_physiotherapist.webp";
import doctor3 from "../assets/dr_vishnu_priya_physiotherapist.webp";
import doctor4 from "../assets/dr_ravi_shankar_physiotherpist(sports_medicine).webp";

const DOCTOR_AVATARS = [doctor1, doctor2, doctor3, doctor4];

const TEAL = "#40d3b6";
const BLUE = "#1e8fd3";
const GRADIENT = `linear-gradient(90deg, ${TEAL}, ${BLUE})`;
const TEXT_GRADIENT = "linear-gradient(90deg, #2563eb, #06b6d4, #10e07f)";

const FEATURES = [
  { icon: User,          label: "Expert\nPhysiotherapists" },
  { icon: CalendarCheck, label: "Personalized\nCare Plans" },
  { icon: Activity,      label: "Track Progress\n& Improve" },
  { icon: ShieldCheck,   label: "Safe, Effective\n& Convenient" },
];

// Compact stats row (mobile) — icon + number + label
const STATS = [
  { icon: Users,      value: "7K+", label: "Patients\nImproved" },
  { icon: Star,       value: "4.9", label: "(300+ Reviews)" },
  { icon: Headphones, value: "24/7", label: "Support" },
  { icon: ShieldCheck, value: "HIPAA", label: "Compliant" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50/60 pt-24 pb-0 md:pt-28 md:pb-0 md:pt-17">
        {/* ══════ DESKTOP FULL-BLEED BACKGROUND ══════ */}
  <div className="pointer-events-none absolute inset-0 hidden md:block">
    <img
      src="/hero_background.webp"
      alt="Patient stretching during an online physiotherapy session"
      className="h-full w-full object-cover object-center"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
    {/* overlay so left-side text stays readable */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0) 75%)",
      }}
    />
  </div>
  <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 md:grid md:grid-cols-[1fr_1.15fr] md:items-center md:gap-6 md:gap-10 md:px-10 lg:px-16">

        {/* ══════ TOP TEXT ══════ */}
        <div className="order-1 relative z-10 md:order-none md:col-start-1 md:row-start-1">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#40d3b6]/30 bg-white px-4 py-2 text-xs font-semibold tracking-wide md:mb-6"
            style={{ color: BLUE }}
          >
            <Wifi size={14} />
            ONLINE PHYSIOTHERAPY
          </div>

          <h1
            className="text-4xl font-extrabold leading-[1.08] text-[#10243e] md:text-5xl md:text-6xl"
          >
            Feel Better
            <br />
            <span
              style={{
                backgroundImage: TEXT_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Live Better.
            </span>
          </h1>

          <p
            className="mt-3 max-w-md text-base leading-relaxed text-slate-500 md:mt-5 md:text-lg"
          >
            Your friendly digital clinic for chronic pain relief, guided by
            expert physiotherapists.
          </p>

          {/* Compact mobile feature row — single line, no cards */}
          <div
            className="mt-4 grid grid-cols-3 gap-2 md:hidden"
          >
            {FEATURES.slice(0, 3).map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: `${TEAL}1a`, color: TEAL }}
                >
                  <Icon size={16} />
                </div>
                <p className="whitespace-pre-line text-[10.5px] font-semibold leading-tight text-[#10243e]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ══════ IMAGE BLOCK ══════ */}
        <div
          
          className="order-2 relative w-full md:order-none md:col-start-2 md:row-start-1 md:row-span-2 md:h-[640px] lg:h-[720px]"
        >
          <div
            className="pointer-events-none absolute -inset-10 -z-10 hidden rounded-full blur-3xl md:block"
            style={{ background: `radial-gradient(circle, ${TEAL}22, transparent 65%)` }}
          />

          {/* MOBILE: compact combined card */}
          <div className="flex items-stretch overflow-hidden rounded-2xl bg-white shadow-lg md:hidden">
            <div className="min-w-0 flex-1 p-3">
              <div className="mb-1.5 flex -space-x-2">
              {DOCTOR_AVATARS.map((src, i) => (
                  <div
                    key={i}
                    className="flex h-6 w-6 items-center justify-center rounded-full border-3 border-white"
                    style={{ background: i % 2 === 0 ? TEAL : BLUE }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-[19px] w-[19px] rounded-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span
                className="mb-1.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold"
                style={{ background: `${TEAL}1a`, color: TEAL }}
              >
                10+ Years Experience
              </span>
              <p className="text-[11px] leading-snug text-slate-600">
                "We help you move better, feel better and live pain-free."
              </p>
            </div>
            <div className="relative w-[36%] shrink-0">
  <img
    src="/video_consultation.webp"
    alt="Doctor on a video consultation call"
    className="h-full w-full object-cover object-top"
    loading="eager"
    decoding="async"
  />
</div>
          </div>

          {/* DESKTOP: full-bleed image */}
          <div className="relative hidden h-[420px] w-full sm:h-[520px] md:block md:h-[640px] lg:h-[700px]">
      
       <div
  className="pointer-events-none absolute inset-y-0 right-0 w-[4%]"
  style={{
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 100%)",
    maskImage: "linear-gradient(to right, transparent 0%, black 100%)",
  }}
/>
            <div
    
              className="absolute left-2 top-4 w-64 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:left-6 sm:top-8"
            >
              <div className="mb-3 flex items-center gap-2">
              <div className="flex -space-x-2">
                  {DOCTOR_AVATARS.map((src, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white"
                      style={{ background: i % 2 === 0 ? TEAL : BLUE }}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-[30px] w-[26px] rounded-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <span
                className="mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{ background: `${TEAL}1a`, color: TEAL }}
              >
                10+ Years Experience
              </span>
              <p className="text-[13px] leading-snug text-slate-600">
                "We help you move better, feel better and live pain-free."
              </p>
              <Heart size={16} className="ml-auto mt-2" style={{ color: TEAL }} />
            </div>
          </div>
        </div>

        {/* ══════ BOTTOM — desktop feature grid (unchanged) ══════ */}
        <div className="order-3 relative z-10 pb-6 md:order-none md:col-start-1 md:row-start-2 md:pb-12">
          <div
            className="hidden grid-cols-2 gap-3 sm:grid-cols-4 md:grid"
          >
            {FEATURES.map(({ icon: Icon, label }, i) => (
              <div key={i} className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: `${TEAL}1a`, color: TEAL }}
                >
                  <Icon size={18} />
                </div>
                <p className="whitespace-pre-line text-[13px] leading-snug text-slate-600">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: compact icon-stats row */}
          <div
            className="mt-1 grid grid-cols-4 gap-2 border-t border-black/5 pt-4 md:hidden"
          >
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <Icon size={16} className="mb-1" style={{ color: i === 1 ? "#f59e0b" : TEAL }} />
                <p className="text-[13px] font-bold text-[#10243e]">{value}</p>
                <p className="whitespace-pre-line text-[9px] leading-tight text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>

              <div
            className="mt-4 flex flex-wrap items-center gap-3 md:mt-8 md:gap-4"
          >
            <button
              onClick={() => document.querySelector("#doctors-section")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] md:px-7 md:py-4"
              style={{ background: GRADIENT, boxShadow: `0 10px 24px ${TEAL}40` }}
            >
              Start Your Recovery
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3.5 text-sm font-semibold text-[#10243e] transition-colors hover:border-[#40d3b6]/50 md:px-6 md:py-4"
            >
              <PlayCircle size={18} style={{ color: TEAL }} />
              How It Works
            </button>
          </div>

          {/* Desktop: original stats row + HIPAA line */}
      {/* Desktop: icon-stat row, matches mobile style */}
          <div
            className="mt-7 hidden grid-cols-4 gap-4 border-t border-black/5 pt-6 md:grid"
          >
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    background: i === 1 ? "#f59e0b1a" : `${TEAL}1a`,
                    color: i === 1 ? "#f59e0b" : TEAL,
                  }}
                >
                  <Icon size={18} />
                </div>
                <p className="text-lg font-bold text-[#10243e]">{value}</p>
                <p className="whitespace-pre-line text-[12px] leading-tight text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>

      

          {/* CTAs — shown on both, tightened spacing on mobile */}
      

          {/* Mobile trust line */}
          <div
            className="mt-4 flex items-center gap-2 text-[11px] text-slate-500 md:hidden"
          >
            <ShieldCheck size={13} style={{ color: TEAL }} />
            Trusted by thousands. Backed by experts. Focused on you.
          </div>
        </div>
      </div>
    </section>
  );
}