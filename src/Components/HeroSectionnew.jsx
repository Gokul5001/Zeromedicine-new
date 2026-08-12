import React from "react";
import { useNavigate } from "react-router-dom";
import doctorImage from "../assets/doctor_image.webp";
import googleLogo from "../assets/download.png";
import hipaaLogo from "../assets/hippa.png";

import {
  ArrowRight,
  ShieldCheck,
  Users,
  Activity,
  Heart,
} from "lucide-react";

// Brand colors
const BRAND = {
  primary: "#1e8fd3",
  secondary: "#40d3b6",
  text: "#4d4d4d",
};

const trustFeatures = [
  { icon: ShieldCheck, text: "100% private & confidential consultations" },
  { icon: Users, text: "Experienced doctors & wellness experts" },
  { icon: Activity, text: "Root-cause focused care" },
  { icon: Heart, text: "Personalized treatment protocols" },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
    id="home"
      aria-label="Hero - Zeromedixine"
      className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-6"
      style={{ color: BRAND.text }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(1200px 600px at 10% 10%, ${BRAND.primary}11, transparent 10%), radial-gradient(900px 500px at 90% 90%, ${BRAND.secondary}11, transparent 12%), linear-gradient(180deg,#ffffff, #f6f9f8)`,
        }}
      />

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* LEFT TEXT */}
          <div className="md:col-span-7 lg:col-span-8 text-center md:text-left">

            <p
              className="inline-block text-sm font-medium rounded-full px-3 py-1 mb-4"
              style={{
                background: `${BRAND.primary}22`,
                color: BRAND.primary,
              }}
            >
              Trusted Care • Tele & In-person
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-5xl font-medium mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-tight">
              Take Control of Your Health, Naturally.
            </h1>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
              <span
                className="block text-xl md:text-3xl font-light mt-1"
                style={{ color: BRAND.text }}
              >
                India’s First Non-Surgical, Non-Medicinal Orthopedic Care Platform.
              </span>
            </h2>

            {/* 🔥 LCP TEXT (now instant render) */}
            <p className="text-base md:text-md max-w-2xl text-gray-600 mb-6">
              Get better with a smarter way to recover. Zeromedixine uses advanced
              physiotherapy and personalized care to treat chronic pain at its
              source, helping you get your strength, mobility, and confidence back.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-5 py-3 rounded-full shadow-md hover:shadow-xl transition font-medium"
              >
                <span>Start Your Pain Free Life</span>
                <ArrowRight className="w-4 h-4 mt-0.5" />
              </button>

              <a
                href="#ourservices"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#ourservices")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50"
              >
                Our Services
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              
              <div className="flex items-center gap-2">
                <img
                  src={googleLogo}
                  alt="Google Reviews"
                  className="w-6 h-6"
                  loading="lazy"
                />
                <span className="font-medium text-gray-800">4.9</span>
                <span>(302 Google reviews)</span>
              </div>

              <div className="h-0.5 w-4 bg-gray-200 rounded-full mx-2" />

              <div className="flex items-center gap-2">
                <img
                  src={hipaaLogo}
                  alt="HIPAA Privacy"
                  className="w-6 h-6"
                  loading="lazy"
                />
                <span>HIPAA-level privacy</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
            <img
              src={doctorImage}
              width="448"
              height="448"
              className="w-64 md:w-96 h-auto object-cover"
              alt="Zeromedixine physiotherapy doctor"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>

          {/* TRUST FEATURES */}
          <div className="md:col-span-12 mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {trustFeatures.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-50"
                >
                  <f.icon className="w-6 h-6 text-green-600" />
                  <p className="text-sm font-medium text-gray-700">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}