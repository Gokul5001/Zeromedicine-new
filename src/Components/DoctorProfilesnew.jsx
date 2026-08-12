// src/Components/DoctorProfile.jsx
// Route: /:slug

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCurrency } from "../hooks/useCurrency";

const TEAL  = "#3EC6B0";
const GREEN = "#2F8FBE";
const NAVY  = "#10243E";
const FONT  = "";


function driveToImage(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600` : null;
}
function driveToDirectUrl(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  const BASE = import.meta.env.VITE_BACKEND_URL || "";
  return `${BASE}/api/audio-proxy?id=${match[1]}`;
}

const WAVE_HEIGHTS = Array.from({ length: 30 }, (_, i) =>
  30 + Math.abs(Math.sin(i * 0.8 + 1.2) * 55 + Math.cos(i * 0.4) * 20)
);

function VoiceNotePlayer({ url, label }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const directUrl = driveToDirectUrl(url);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(console.error); setPlaying(true); }
  };
  const fmt = (s) => !s || isNaN(s) ? "0:00" : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <audio
        ref={audioRef}
        src={directUrl}
        onTimeUpdate={(e) => { setCurrentTime(e.target.currentTime); setProgress(e.target.duration ? e.target.currentTime / e.target.duration : 0); }}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }}
      />
      <button onClick={toggle} style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(90deg,${TEAL},${GREEN})`, border: "none", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {playing
          ? <svg width="12" height="14" viewBox="0 0 10 12" fill="none"><rect x="0" y="0" width="3" height="12" rx="1" fill="#fff"/><rect x="7" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>
          : <svg width="12" height="14" viewBox="0 0 10 12" fill="none"><path d="M1 1L9 6L1 11V1Z" fill="#fff"/></svg>}
      </button>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 30 }}>
        {WAVE_HEIGHTS.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${Math.min(h,100)}%`, borderRadius: 2, background: (i/WAVE_HEIGHTS.length) <= progress ? `linear-gradient(180deg,${TEAL},${GREEN})` : "#d9f1ee" }} />
        ))}
      </div>
      <span style={{ fontSize: 12, color: "#94a3b8", minWidth: 70 }}>
        {label} · {playing ? fmt(currentTime) : fmt(duration)}
      </span>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span style={{
      padding: "8px 16px", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "#475569",
      background: "linear-gradient(#fff,#fff) padding-box, linear-gradient(180deg,rgba(62,198,176,.6),rgba(47,143,190,.6)) border-box",
      border: "1px solid transparent",
    }}>
      {children}
    </span>
  );
}

function StatBox({ icon, value, label }) {
  return (
    <div style={{ background: "#f6f8f9", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 12, padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ width: 28, height: 28, borderRadius: "50%", background: `${TEAL}1a`, color: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>{value}</div>
        <div style={{ fontSize: 11, color: "#94a3b8" }}>{label}</div>
      </div>
    </div>
  );
}

export default function DoctorProfilenew() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currency, formatFee } = useCurrency();

  const [doctor, setDoctor]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const BASE = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${BASE}/api/doctor-auth/public/doctors/slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Doctor not found");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.success) setDoctor(data.data);
        else setError(data.error || "Doctor not found");
      })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [slug, BASE]);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "140px 24px", fontFamily: FONT, color: "#64748b" }}></div>;
  }
  if (error || !doctor) {
    return (
      <div style={{ textAlign: "center", padding: "140px 24px", fontFamily: FONT }}>
        <p style={{ color: "#64748b", marginBottom: 16 }}>Doctor not found.</p>
        <button onClick={() => navigate("/")} style={{ padding: "10px 24px", borderRadius: 100, border: "none", background: `linear-gradient(90deg,${TEAL},${GREEN})`, color: "#fff", cursor: "pointer" }}>
          Back to all therapists
        </button>
      </div>
    );
  }

  const isINR = currency.code === "INR";
  const rawFee = isINR
    ? (doctor.single_session_price || doctor.session_pricing)
    : (doctor.single_session_price_usd || doctor.single_session_price || doctor.session_pricing);
  const fee = rawFee ? formatFee(rawFee) : "—";

  const conditions = doctor.conditions_treated || [];
  const profileImg = doctor.profile_image
    ? doctor.profile_image.includes("drive.google.com") ? driveToImage(doctor.profile_image) : doctor.profile_image
    : null;

  const handleBook = () => {
    const isLoggedIn = !!localStorage.getItem("patientToken");
    const doctorPayload = {
      id: doctor.doctor_id, name: doctor.name, role: doctor.role,
      consultFee: rawFee, availability: doctor.availability,
      profileImg, voice_note: doctor.voice_note,
      years_of_experience: doctor.years_of_experience,
      packages: doctor.packages || [], packages_usd: doctor.packages_usd || [],
    };
    if (isLoggedIn) {
      navigate(`/clinic/book/${doctor.doctor_id}`, { state: { doctor: doctorPayload } });
    } else {
      navigate(`/patient/login?doctorId=${doctor.doctor_id}&doctorName=${encodeURIComponent(doctor.name || "Doctor")}`, { state: { doctor: doctorPayload } });
    }
  };

  return (
    <section style={{ maxWidth: 1160, margin: "0 auto", padding: "110px 24px 64px", fontFamily: FONT }}>
      <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#64748b", fontSize: 14, cursor: "pointer", marginBottom: 24 }}>
        ← Back to home
      </button>

      {/* ── Hero ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 32, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ flex: 1, minWidth: 280 }}>
        
          <h1 style={{ fontSize: 44, fontWeight: 800, color: NAVY, margin: "0 0 8px" }}>{doctor.name}</h1>
          <p style={{ fontSize: 17, fontWeight: 600, margin: "0 0 16px", color: TEAL }}>{doctor.role}</p>
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#64748b", flexWrap: "wrap" }}>
  {doctor.qualification && (
   <span style={{ fontWeight: 600 }}>{doctor.qualification}</span>
  )}
  
  {doctor.years_of_experience && <span>{doctor.years_of_experience}+ Years Experience</span>}
  <span>✓ {doctor.sessions_completed ? `${doctor.sessions_completed}+` : "1500+"} Sessions Completed</span>
</div>
{doctor.registration_no && (
  <p style={{ fontSize: 13, color: "#94a3b8", margin: "10px 0 0" }}>
    Reg No: <span style={{ color: NAVY, fontWeight: 600 }}>{doctor.registration_no}</span>
  </p>
)}
        </div>
        {profileImg && (
          <img src={profileImg} alt={doctor.name} style={{ width: 280, height: 320, objectFit: "cover", borderRadius: 20, flexShrink: 0 }} />
        )}
      </div>

      {/* ── Condition pills ── */}
      {conditions.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
          {conditions.map((c, i) => <Pill key={i}>{c}</Pill>)}
        </div>
      )}

      {/* ── Body grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {doctor.voice_note && (
            <div style={{ background: "#f6f8f9", borderRadius: 16, padding: 18 }}>
              <VoiceNotePlayer url={doctor.voice_note} label={`About Dr. ${doctor.name?.split(" ").pop()}`} />
            </div>
          )}

          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: 22 }}>
            <h3 style={{ margin: "0 0 10px", color: NAVY, fontSize: 17 }}>👤 About {doctor.name}</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: 0 }}>
              {doctor.name} is a dedicated {doctor.role?.toLowerCase()} with{" "}
              {doctor.years_of_experience ? `over ${doctor.years_of_experience} years` : "extensive"} of experience
              helping patients recover from pain, improve mobility, and restore peak physical performance through
              a personalized, evidence-based approach.
            </p>

        
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <StatBox icon="📅" value={doctor.years_of_experience ? `${doctor.years_of_experience}+` : "—"} label="Years Experience" />
              <StatBox icon="🏆" value={doctor.sessions_completed ? `${doctor.sessions_completed}+` : "1500+"} label="Sessions Completed" />
              <StatBox icon="₹" value={fee} label="Per Session" />
            </div>
          </div>

          {conditions.length > 0 && (
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: 22 }}>
              <h3 style={{ margin: "0 0 14px", color: NAVY, fontSize: 17 }}>⭐ Specialties</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {conditions.map((c, i) => <Pill key={i}>{c}</Pill>)}
              </div>
            </div>
          )}
        </div>

        {/* ── Fee card ── */}
        <div style={{
          background: "#f6f8f9", borderRadius: 16, padding: 24, height: "fit-content",
          position: "sticky", top: 110,
        }}>
          <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 6 }}>Consultation Fee</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: NAVY, lineHeight: 1 }}>{fee}</div>
          <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 18 }}>Per Session</div>
          <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
            🌐 Online Consultation
          </div>
          <button
            onClick={handleBook}
            style={{
              width: "100%", padding: "14px", borderRadius: 100, border: "none",
              background: `linear-gradient(90deg,${TEAL},${GREEN})`, color: "#fff",
              fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em",
              boxShadow: `0 6px 16px ${TEAL}40`,
            }}
          >
            Book a Session
          </button>
        </div>
      </div>
    </section>
  );
}