


// src/Components/Doctors.jsx
// Route: /doctors

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bannerImg from "../assets/Banner.webp";
import { useCurrency } from "../hooks/useCurrency";

// ── Brand tokens ───────────────────────────────────────────────────────────────
const TEAL  = "#3EC6B0";
const GREEN = "#2F8FBE";
const NAVY  = "#10243E";
const FONT  = "";

// ── Specialisation filter options ──────────────────────────────────────────────
const SPECS = ["All", "Physio", "Orthopedic", "Nutrition", "Other"];

// ── Language filter options ────────────────────────────────────────────────────
const LANGUAGES = [
  "All Languages",
  "English",
  "Tamil",
  "Malayalam",
  "Hindi",
  "Telugu",
  "Kannada",
  "Bengali",
  "Marathi",
];
// ── Convert "HH:MM" 24h → "H:MM AM/PM" ───────────────────────────────────────
function formatTime12h(time24) {
  if (!time24) return "";
  const [h, m] = time24.split(":").map(Number);
  const ampm   = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// ── Convert Google Drive webViewLink → thumbnail URL ─────────────────────────
function driveToImage(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
}

// ── Next available helper ─────────────────────────────────────────────────────
// function getNextAvailable(availability) {
//   if (!availability?.days?.length || !availability?.start_time) return null;
//   const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//   const now = new Date();
//   for (let i = 0; i < 7; i++) {
//     const d = new Date(now);
//     d.setDate(now.getDate() + i);
//     const dayName = dayNames[d.getDay()];
//     if (availability.days.includes(dayName)) {
//       const time = formatTime12h(availability.start_time);
//       if (i === 0) return `Today · ${time}`;
//       if (i === 1) return `Tomorrow · ${time}`;
//       return `${dayName} · ${time}`;
//     }
//   }
//   return null;
// }

// REPLACE the existing getNextAvailable function with this:
function getNextAvailable(availability) {
  if (!availability?.days?.length || !availability?.start_time) return null;
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // Parse doctor's end time to check if today's slots are exhausted
  const [endH, endM] = (availability.end_time || "23:59").split(":").map(Number);
  const endTotal = endH * 60 + endM;

  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dayName = dayNames[d.getDay()];
    if (availability.days.includes(dayName)) {
      // For today: check if there are still slots left (end_time not yet passed, with 30-min buffer)
      if (i === 0 && nowMinutes + 30 >= endTotal) continue; // all today's slots are past

      const [startH, startM] = availability.start_time.split(":").map(Number);
      const startTotal = startH * 60 + startM;

      // For today: show next upcoming slot time, not start_time
      let displayH = startH, displayM = startM;
      if (i === 0) {
        // Find the next 30-min slot after now + 30 buffer
        let slotMinutes = startTotal;
        while (slotMinutes <= nowMinutes + 30) slotMinutes += 30;
        displayH = Math.floor(slotMinutes / 60);
        displayM = slotMinutes % 60;
      }

      const ampm   = displayH < 12 ? "AM" : "PM";
      const hour12 = displayH % 12 === 0 ? 12 : displayH % 12;
      const time   = `${hour12}:${String(displayM).padStart(2, "0")} ${ampm}`;

      if (i === 0) return `Today · ${time}`;
      if (i === 1) return `Tomorrow · ${time}`;
      return `${dayName} · ${formatTime12h(availability.start_time)}`;
    }
  }
  return null;
}

// ── Waveform bars ─────────────────────────────────────────────────────────────
const WAVE_HEIGHTS = Array.from({ length: 30 }, (_, i) =>
  30 + Math.abs(Math.sin(i * 0.8 + 1.2) * 55 + Math.cos(i * 0.4) * 20)
);

// ── Voice Note Player ─────────────────────────────────────────────────────────
function driveToDirectUrl(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  const fileId = match[1];
  const BASE = import.meta.env.VITE_BACKEND_URL || "";
  return `${BASE}/api/audio-proxy?id=${fileId}`;
}

// ── Sort priority helper ──────────────────────────────────────────────────────
function availabilityPriority(avail) {
  const label = getNextAvailable(avail);
  if (!label) return 3 * 10000;

  // Extract the time part after "·"
  const timePart = label.split("·")[1]?.trim() || "";

  // Convert "H:MM AM/PM" → total minutes since midnight
  const timeMinutes = (() => {
    const match = timePart.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    let [, h, m, ampm] = match;
    h = parseInt(h); m = parseInt(m);
    if (ampm.toUpperCase() === "PM" && h !== 12) h += 12;
    if (ampm.toUpperCase() === "AM" && h === 12) h = 0;
    return h * 60 + m;
  })();

  if (label.startsWith("Today"))    return 0 * 10000 + timeMinutes;
  if (label.startsWith("Tomorrow")) return 1 * 10000 + timeMinutes;
  return                                     2 * 10000 + timeMinutes;
}

function VoiceNotePlayer({ url }) {
  const audioRef                      = useRef(null);
  const [playing, setPlaying]         = useState(false);
  const [progress, setProgress]       = useState(0);
  const [duration, setDuration]       = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [srcLoaded, setSrcLoaded]     = useState(false); // ← new
  const directUrl                     = driveToDirectUrl(url);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;

    if (!srcLoaded) {
      a.src = directUrl;   // ← only assign src on first play click
      setSrcLoaded(true);
      a.load();
      a.play().catch(console.error);
      setPlaying(true);
      return;
    }

    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(console.error); setPlaying(true); }
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };


  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
       <audio
        ref={audioRef}
        preload="none"   // ← extra safety: no auto-fetch even if src were set
        onTimeUpdate={(e) => {
          const a = e.target;
          setCurrentTime(a.currentTime);
          setProgress(a.duration ? a.currentTime / a.duration : 0);
        }}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause voice note" : "Play voice note"}
        style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(90deg,#3ec6b0,#2f8fbe)",
          border: "none", cursor: "pointer", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {playing ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <rect x="0" y="0" width="3" height="12" rx="1" fill="#fff" />
            <rect x="7" y="0" width="3" height="12" rx="1" fill="#fff" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M1 1L9 6L1 11V1Z" fill="#fff" />
          </svg>
        )}
      </button>

      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 30, overflow: "hidden" }}>
        {WAVE_HEIGHTS.map((h, i) => {
          const filled = (i / WAVE_HEIGHTS.length) <= progress;
          return (
            <div key={i} style={{
              flex: 1,
              height: `${Math.min(h, 100)}%`,
              borderRadius: 2,
              background: filled ? "linear-gradient(180deg,#3ec6b0,#2f8fbe)" : "#d9f1ee",
              transition: "background 0.1s",
            }} />
          );
        })}
      </div>

      <span style={{ fontSize: 11, color: "#94a3b8", flexShrink: 0, minWidth: 28, textAlign: "right" }}>
        {playing ? fmt(currentTime) : fmt(duration)}
      </span>
    </div>
  );
}

// ── Single Doctor Card ─────────────────────────────────────────────────────────
// `formatFee` converts the raw INR single-session price → user's local currency display string.
// `doctor.consultFee` holds the correct currency-specific fee set during mapping in fetchDoctors.
function DoctorCard({ doctor, onBook, formatFee }) {
  const [hovered, setHovered] = useState(false);
  const [showAllConds, setShowAllConds] = useState(false); // ← add this
  const navigate = useNavigate();

  const goToProfile = () => {
    if (doctor.slug) navigate(`/${doctor.slug}`);
  };

  const displayName = doctor.name || "Doctor";
  const displayRole = doctor.role || "";

  // ── Fee display ───────────────────────────────────────────────────────────
  // doctor.consultFee is already the right value for the detected currency
  // (single_session_price for INR users, single_session_price_usd for others).
  // formatFee handles formatting with the correct symbol.
  const fee = doctor.consultFee ? formatFee(doctor.consultFee) : "—";

  const conditions = doctor.conditions || doctor.conditions_treated || [];
  const langShort  = Array.isArray(doctor.languages)
    ? doctor.languages[0]
    : (doctor.languages || "English").split(",")[0].trim();

    const visibleConds = showAllConds ? conditions : conditions.slice(0, 3);
    const extraCount   = conditions.length - 3;
  const nextAvail    = getNextAvailable(doctor.availability);

  return (
    <div
    onClick={goToProfile}                 // ← whole card navigates

      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",                  // ← signal it's clickable

        background: "#fff",
        borderRadius: 20,
        border: `1px solid ${hovered ? TEAL : "rgba(0,0,0,0.06)"}`,
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        boxShadow: hovered
          ? "0 12px 28px rgba(19,176,165,0.12)"
          : "0 2px 12px rgba(16,36,62,0.05)",
        transform: hovered ? "translateY(-2px)" : "none",
        fontFamily: FONT,
      }}
    >
      {/* ── Hero banner ── */}
      <div style={{
        position: "relative",
        padding: "28px",
        overflow: "hidden",
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: 180,
        display: "flex",
        alignItems: "center",
        marginTop: "-5px",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
        <div style={{ display: "flex", gap: 16, position: "relative", zIndex: 1 }}>
          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontFamily: FONT,
              fontSize: 24, fontWeight: 1000, color: NAVY,
              margin: "0 0 4px", lineHeight: 1.15,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{displayName}</h3>
            <p style={{
              fontSize: 14, fontWeight: 600, margin: "0 0 12px",
              background: "linear-gradient(90deg,#3ec6b0,#2f8fbe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {displayRole}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            {doctor.qualification && (
    <>
      <span style={{ fontSize: 11.5, color: "#64748b", display: "flex", alignItems: "center", gap: 4, fontWeight: 500 }}>
        {doctor.qualification}
      </span>
      <span style={{ width: 1, height: 10, background: "rgba(0,0,0,0.12)" }} />
    </>
  )}
  {doctor.years_of_experience && (
    <>
      <span style={{ fontSize: 11.5, color: "#64748b", display: "flex", alignItems: "center", gap: 4, fontWeight: 500 }}>
        {doctor.years_of_experience}+ Years Experience
      </span>
      <span style={{ width: 1, height: 10, background: "rgba(0,0,0,0.12)" }} />
    </>
  )}
  <span style={{ fontSize: 11.5, color: "#64748b", display: "flex", alignItems: "center", gap: 4, fontWeight: 500 }}>
    <span style={{ color: TEAL }}>✓</span> {doctor.sessions_completed ? `${doctor.sessions_completed}+` : "1500+"} Sessions Completed
  </span>
</div>
          </div>

          {/* Doctor photo */}
          <div style={{
            flexShrink: 0,
            width: 100, height: 130,  
            borderRadius: 14,
            overflow: "hidden",
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginTop: -21,
          }}>
            {doctor.profileImg ? (
              <img
                src={doctor.profileImg}
                alt={displayName}
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                style={{
                  width: "128%", height: "125%",
                  objectFit: "cover", objectPosition: "top center",
                  borderRadius: 10,
                  position: "relative", zIndex: 1,
                }}
              />
            ) : null}
            <span style={{
              fontSize: 36,
              display: doctor.profileImg ? "none" : "flex",
              alignItems: "center", justifyContent: "center",
              width: "100%", height: "100%", color: TEAL,
            }}>👤</span>
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: "0 18px 18px" }}>

        {/* Condition pills */}
        {visibleConds.length > 0 && (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
    {visibleConds.map((c, i) => (
      <span key={i} style={{
        padding: "6px 14px",
        borderRadius: 100,
        fontSize: 12,
        color: "#6b7280",
        fontWeight: 500,
        border: "1px solid transparent",
        background: "linear-gradient(#fff,#fff) padding-box, linear-gradient(180deg,rgba(62,198,176,.6),rgba(47,143,190,.6)) border-box",
        boxSizing: "border-box",
        animation: "zm-pill-in 0.25s ease",
      }}>
        {c}
      </span>
    ))}

    {!showAllConds && extraCount > 0 && (
      <button
        onClick={() => setShowAllConds(true)}
        style={{
          padding: "6px 14px", borderRadius: 100,
          border: "1px solid rgba(0,0,0,0.08)",
          fontSize: 12, color: TEAL, background: "#f8f8f8",
          fontWeight: 600, cursor: "pointer", fontFamily: FONT,
        }}
      >
        +{extraCount} More
      </button>
    )}

    {showAllConds && conditions.length > 3 && (
      <button
        onClick={() => setShowAllConds(false)}
        style={{
          padding: "6px 14px", borderRadius: 100,
          border: "1px solid rgba(0,0,0,0.08)",
          fontSize: 12, color: "#94a3b8", background: "#f8f8f8",
          fontWeight: 600, cursor: "pointer", fontFamily: FONT,
        }}
      >
        Show less
      </button>
    )}
  </div>
)}

        {/* Voice note / profile row */}
        <div style={{ background: "#f6f8f9", borderRadius: 14, padding: "10px 14px", marginBottom: 14 }}
          onClick={(e) => e.stopPropagation()}   // ← add this
          >
          {doctor.voice_note ? (
            <VoiceNotePlayer url={doctor.voice_note} />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>Profile &amp; Introduction</span>
              <button style={{
                padding: "8px 18px", borderRadius: 100,
                border: "none",
                background: "linear-gradient(90deg,#3ec6b0,#2f8fbe)",
                color: "#fff", fontSize: 12.5, fontWeight: 600,
                cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
              }}>View Profile</button>
            </div>
          )}
        </div>

        {/* ── Stats grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
  {/* Sessions Completed */}
  <div style={{
    background: "#f6f8f9", border: "1px solid rgba(0,0,0,0.04)",
    borderRadius: 12, padding: "10px 10px 9px",
    display: "flex", flexDirection: "column", gap: 6,
  }}>
    <span style={{
      width: 26, height: 26, borderRadius: "50%",
      background: `${TEAL}1a`, color: TEAL,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
    }}>🕐</span>
    <div>
      {/* <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, lineHeight: 1.25 }}>1500+</div> */}
      <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, lineHeight: 1.25 }}>{doctor.sessions_completed ? `${doctor.sessions_completed}+` : "—"}</div>
      <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.3 }}>Sessions Completed</div>
    </div>
  </div>

  {/* Languages — rotating */}
  <div style={{
    background: "#f6f8f9", border: "1px solid rgba(0,0,0,0.04)",
    borderRadius: 12, padding: "10px 10px 9px",
    display: "flex", flexDirection: "column", gap: 6,
  }}>
    <span style={{
      width: 26, height: 26, borderRadius: "50%",
      background: `${TEAL}1a`, color: TEAL,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
    }}>🌐</span>
    <div>
      <LanguageRotator languages={doctor.languages} />
      <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.3 }}>Languages</div>
    </div>
  </div>

  {/* Per Session */}
  <div style={{
    background: "#f6f8f9", border: "1px solid rgba(0,0,0,0.04)",
    borderRadius: 12, padding: "10px 10px 9px",
    display: "flex", flexDirection: "column", gap: 6,
  }}>
    <span style={{
      width: 26, height: 26, borderRadius: "50%",
      background: `${TEAL}1a`, color: TEAL,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
    }}>₹</span>
    <div>
      <div style={{
        fontSize: String(fee).length > 6 ? 11 : 13,
        fontWeight: 700, color: NAVY, lineHeight: 1.25,
      }}> {fee}</div>
      <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.3 }}>Per Session</div>
    </div>
  </div>
</div>
        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.06)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 30, height: 30, borderRadius: "50%",
                background: `${GREEN}1a`, color: GREEN,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15,
              }}>📅</span>
              <div>
                <div style={{ fontSize: 10.5, color: "#94a3b8" }}>Next available</div>
                <div style={{
                  fontSize: 14, fontWeight: 700,
                  background: "linear-gradient(90deg,#3ec6b0,#2f8fbe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {nextAvail || "—"}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBook(doctor);
              }}
              style={{
                padding: "11px 24px", borderRadius: 100,
                border: "none",
                background: "linear-gradient(90deg,#3ec6b0,#2f8fbe)",
                color: "#fff", fontSize: 12.5, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.04em", fontFamily: FONT,
                transition: "opacity 0.15s", boxShadow: `0 6px 16px ${TEAL}40`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 0.9}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
            >BOOK NOW</button>
            <span style={{ fontSize: 10.5, color: "#cbd5e1" }}>🛡 Secure &amp; Confidential</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton loader ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{
      background: "#fff", borderRadius: 20,
      border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden",
      fontFamily: FONT,
    }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .zm-skel {
          background: linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%);
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
          border-radius: 8px;
        }
        @keyframes zm-pill-in {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={{ padding: "22px 18px 18px" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div className="zm-skel" style={{ height: 24, width: "70%", marginBottom: 8 }} />
            <div className="zm-skel" style={{ height: 14, width: "40%", marginBottom: 14 }} />
            <div className="zm-skel" style={{ height: 12, width: "80%" }} />
          </div>
          <div className="zm-skel" style={{ width: 96, height: 110, borderRadius: 14, flexShrink: 0 }} />
        </div>
      </div>
      <div style={{ padding: "0 18px 18px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <div className="zm-skel" style={{ height: 28, width: 90, borderRadius: 100 }} />
          <div className="zm-skel" style={{ height: 28, width: 80, borderRadius: 100 }} />
        </div>
        <div className="zm-skel" style={{ height: 50, marginBottom: 14, borderRadius: 14 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
          <div className="zm-skel" style={{ height: 56, borderRadius: 12 }} />
          <div className="zm-skel" style={{ height: 56, borderRadius: 12 }} />
          <div className="zm-skel" style={{ height: 56, borderRadius: 12 }} />
        </div>
        <div className="zm-skel" style={{ height: 44, borderRadius: 100 }} />
      </div>
    </div>
  );
}

// ── Language dropdown ─────────────────────────────────────────────────────────
function LangDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filtered = LANGUAGES.filter((l) =>
    l.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: 280,
        flexShrink: 0,
        zIndex: 9999,
      }}
    >
      <div
        onClick={() => setOpen(true)}
        style={{
          height: 46,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderRadius: 999,
          border: `1.5px solid ${open ? TEAL : "#e5e7eb"}`,
          background: "#fff",
          cursor: "text",
        }}
      >
        🌐

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          placeholder={
            value === "All Languages"
              ? "Search language..."
              : value
          }
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            fontSize: 14,
            background: "transparent",
          }}
        />
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 55,
            left: 0,
            width: "100%",
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.12)",
            overflow: "hidden",
            maxHeight: 280,
            overflowY: "auto",
            zIndex: 99999,
          }}
        >
          {filtered.map((lang) => (
            <div
              key={lang}
              onClick={() => {
                onChange(lang);
                setSearch("");
                setOpen(false);
              }}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: 14,
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "#f8fafc")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "#fff")
              }
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ── Currency Badge ─────────────────────────────────────────────────────────────
function countryCodeToFlag(cc) {
  if (!cc || cc.length !== 2) return null;
  return [...cc.toUpperCase()].map(c =>
    String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  ).join("");
}

function CurrencyBadge({ currency, countryCode }) {
  if (!currency || currency.code === "INR") return null;
  const flagEmoji = countryCodeToFlag(countryCode);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      padding: "6px 12px", borderRadius: 100,
      background: `${TEAL}12`,
      border: `1px solid ${TEAL}30`,
      fontSize: 12, fontWeight: 600,
      color: TEAL, flexShrink: 0,
      whiteSpace: "nowrap",
    }}>
      {flagEmoji && <span>{flagEmoji}</span>}
      Prices in {currency.code}
    </div>
  );
}

// ── Rotating Language Display ──────────────────────────────────────────────
// ── Rotating Language Display ──────────────────────────────────────────────
function LanguageRotator({ languages }) {
  const langs = Array.isArray(languages) && languages.length > 0
    ? languages
    : ["English"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (langs.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % langs.length);
    }, 1800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langs.length]);

  return (
    <div style={{ height: 16, position: "relative", overflow: "hidden" }}>
      <div
        key={index} // ← forces remount so the fade-in transition replays each swap
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: NAVY,
          lineHeight: 1.25,
          whiteSpace: "nowrap",
          opacity: 0,
          animation: "zm-lang-fade 0.4s ease forwards",
        }}
      >
        {langs[index % langs.length]}
      </div>
      <style>{`
        @keyframes zm-lang-fade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function DoctorsPage() {
  const navigate = useNavigate();

  // Currency detection — resolves once on mount
  const { currency, countryCode, loading: currencyLoading, formatFee } = useCurrency();

  const [doctors, setDoctors]         = useState([]);
  const [total, setTotal]             = useState(0);
  const [page, setPage]               = useState(1);
  const [loading, setLoading]         = useState(false);
  const [hasMore, setHasMore]         = useState(true);
  const [search, setSearch]           = useState("");
  const [activeSpec, setActiveSpec]   = useState("All");
  const [activeLang, setActiveLang]   = useState("All Languages");
  const [searchInput, setSearchInput] = useState("");

  const BASE  = import.meta.env.VITE_BACKEND_URL || "";
  const LIMIT = 12;


  const filteredDoctors = doctors.filter((doctor) => {
    if (
      !activeLang ||
      activeLang === "All Languages"
    ) {
      return true;
    }
  
    const doctorLanguages = Array.isArray(
      doctor.languages
    )
      ? doctor.languages
      : String(
          doctor.languages || ""
        )
          .split(",")
          .map((l) => l.trim());
  
    return doctorLanguages.some((lang) =>
      lang
        .toLowerCase()
        .includes(activeLang.toLowerCase())
    );
  });


  // Debounce search
  const debounceRef = useRef(null);
  const handleSearchInput = (val) => {
    setSearchInput(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(val.trim());
      setPage(1);
      setDoctors([]);
      setHasMore(true);
    }, 400);
  };

  const fetchDoctors = useCallback(
    async (pageNum, reset = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page:  pageNum,
          limit: LIMIT,
          ...(search && { q: search }),
          ...(activeSpec !== "All" && { specialisation: activeSpec }),
          ...(activeLang !== "All Languages" && { language: activeLang }),
        });

        const res  = await fetch(`${BASE}/api/doctor-auth/public/doctors?${params}`);
        const data = await res.json();

        if (data.success) {
          const isINR = currency.code === "INR";

          const mapped = data.data.map((doc) => ({
            id:                  doc._id,
            slug: doc.slug || doc.name?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-"), // ← add this

            name:                doc.name,
            role:                doc.role,
            specialisation:      doc.role,

            // ── KEY FIX: pick the right single-session price based on currency ──
            // For INR users  → use single_session_price (if set) else fall back to session_pricing
            // For non-INR users → use single_session_price_usd (if set) else null
            // formatFee in DoctorCard will then format this correctly.
            // NOTE: for INR, formatFee(x) just returns ₹x (rate=1)
            //       for USD, single_session_price_usd is already in USD so rate must be 1 too
            //       — this works because useCurrency.formatFee multiplies by currency.rate,
            //         so make sure rate=1 for USD in your useCurrency hook, and
            //         single_session_price_usd stores the already-converted USD price.
            consultFee: isINR
              ? (doc.single_session_price || doc.session_pricing || null)
              : (doc.single_session_price_usd || null),

            // Keep both so handleBook can pass them to ClinicBooking
            consultFeeINR: doc.single_session_price || doc.session_pricing || null,
            consultFeeUSD: doc.single_session_price_usd || null,

            years_of_experience: doc.years_of_experience,
            qualification: doc.qualification || null,   // ← add this line

            profileImg: doc.profile_image
              ? doc.profile_image.includes("drive.google.com")
                ? driveToImage(doc.profile_image)
                : doc.profile_image
              : null,

            voice_note:   doc.voice_note || null,
            timing:       doc.availability?.start_time && doc.availability?.end_time
              ? `${doc.availability.start_time} - ${doc.availability.end_time}`
              : null,
            conditions:   doc.conditions_treated,
            languages:    doc.languages,
            availability: doc.availability,

            // Pass package arrays through for ClinicBooking Step 1
            packages:     doc.packages     || [],
            packages_usd: doc.packages_usd || [],
            sessions_completed: doc.sessions_completed || 0,
          }));


  // ← ADD THIS
  mapped.sort((a, b) =>
  availabilityPriority(a.availability) - availabilityPriority(b.availability)
);

          setDoctors((prev) => (reset || pageNum === 1) ? mapped : [...prev, ...mapped]);
          setTotal(data.total || 0);
          setHasMore(pageNum < (data.totalPages || 1));
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, activeSpec, activeLang, BASE]
    //                                               ↑ re-fetch when currency resolves
  );

  // Reset + re-fetch when filters change
  useEffect(() => {
    setPage(1);
    setDoctors([]);
    setHasMore(true);
  }, [search, activeSpec, activeLang]);

  // Re-fetch when currency resolves (so consultFee mapping uses the right field)
  useEffect(() => {
    if (currencyLoading || currency.code === "INR") return;
    setDoctors((prev) =>
      prev.map((d) => ({
        ...d,
        consultFee: d.consultFeeUSD || d.consultFee,
      }))
    );
  }, [currency.code, currencyLoading]);

  // Fetch on page / filter change
// Fetch on page / filter change — deferred so it doesn't compete with hero paint
useEffect(() => {
  const start = () => fetchDoctors(page, page === 1);
  let idleId, timerId;
  if ('requestIdleCallback' in window) {
    idleId = requestIdleCallback(start, { timeout: 2000 });
  } else {
    timerId = setTimeout(start, 200);
  }
  return () => {
    if (idleId && 'cancelIdleCallback' in window) cancelIdleCallback(idleId);
    if (timerId) clearTimeout(timerId);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page, search, activeSpec, activeLang]);


  // ── Book handler: pass both INR and USD fees + packages to ClinicBooking ──
  const handleBook = (doctor) => {
    const isINR = currency.code === "INR";

    const doctorPayload = {
      id:            doctor.id,
      name:          doctor.name,
      role:          doctor.role,
      specialisation: doctor.role,

      // The fee in the currently active currency (for display in booking flow)
      consultFee:    isINR
        ? (doctor.consultFeeINR || doctor.consultFee)
        : (doctor.consultFeeUSD || doctor.consultFee),

      // Keep both so ClinicBooking can re-resolve if needed
      consultFeeINR: doctor.consultFeeINR,
      consultFeeUSD: doctor.consultFeeUSD,

      // Both package arrays — ClinicBooking picks the right one based on currency
      packages:      doctor.packages     || [],
      packages_usd:  doctor.packages_usd || [],

      availability:        doctor.availability,
      profileImg:          doctor.profileImg,
      voice_note:          doctor.voice_note,
      years_of_experience: doctor.years_of_experience,
    };

    const isLoggedIn = !!localStorage.getItem("patientToken");

    if (isLoggedIn) {
      navigate(`/clinic/book/${doctor.id}`, { state: { doctor: doctorPayload } });
    } else {
      navigate(
        `/patient/login?doctorId=${doctor.id}&doctorName=${encodeURIComponent(doctor.name || "Doctor")}`,
        { state: { doctor: doctorPayload } }
      );
    }
  };

  const handleSpecChange = (spec) => {
    setActiveSpec(spec);
    setPage(1);
    setDoctors([]);
    setHasMore(true);
  };

  return (
    
    <>
      <style>{`

        .zm-filter-row {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: visible;
          padding-bottom: 4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .zm-filter-row::-webkit-scrollbar { display: none; }

        .zm-search-wrap {
          position: relative;
          flex-shrink: 0;
          width: 224px;
        }
        .zm-search-wrap svg {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); pointer-events: none;
        }
        .zm-search {
          width: 100%; box-sizing: border-box;
          padding: 8px 14px 8px 36px;
          border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.1);
          font-size: 13px; font-family: ${FONT}; color: ${NAVY};
          background: #fff; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .zm-search:focus {
          border-color: ${TEAL};
          box-shadow: 0 0 0 3px ${TEAL}1a;
        }
        .zm-search::placeholder { color: #94a3b8; }

        .zm-sep {
          width: 1px; height: 24px;
          background: rgba(0,0,0,0.1);
          flex-shrink: 0;
        }

        .zm-pill {
          flex-shrink: 0;
          white-space: nowrap;
          padding: 8px 16px;
          border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: #fff;
          font-size: 13px; font-weight: 500; color: #64748b;
          cursor: pointer; font-family: ${FONT};
          transition: all 0.15s;
        }
        .zm-pill:hover { border-color: ${TEAL}; color: ${TEAL}; }
        .zm-pill.active {
          background: linear-gradient(135deg, ${TEAL}, ${GREEN});
          color: #fff;
          border-color: transparent;
          box-shadow: 0 3px 10px ${TEAL}40;
        }

        .zm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .zm-grid { grid-template-columns: 1fr !important; }
          .zm-search-wrap { width: 100% !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .zm-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        .zm-load-more {
          padding: 12px 32px; border-radius: 100px;
          border: 1.5px solid ${TEAL};
          background: transparent; color: ${TEAL};
          font-size: 14px; font-weight: 500; cursor: pointer;
          font-family: ${FONT}; transition: all 0.15s;
        }
        .zm-load-more:hover {
          background: linear-gradient(135deg, ${TEAL}, ${GREEN});
          color: #fff; border-color: transparent;
          box-shadow: 0 4px 14px ${TEAL}40;
        }
        .zm-load-more:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <section 
           id="doctors-section"
           style={{
        background: "linear-gradient(180deg, #f6fbfa 0%, #fff 100%)",
        minHeight: "80vh",
        padding: "98px 24px 64px",
        fontFamily: FONT,
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>

          {/* ── Page header ── */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${TEAL}, ${GREEN})` }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: TEAL, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Our doctors &amp; specialists
              </span>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${GREEN}, ${TEAL})` }} />
            </div>

            <h1 style={{
              fontFamily: FONT,
              fontSize: 42, fontWeight: 700, color: NAVY,
              letterSpacing: "-0.6px", lineHeight: 1.15, margin: "0 0 12px",
            }}>
              Meet Our{" "}
              <span style={{
                background: `linear-gradient(135deg, ${TEAL} 10%, ${GREEN} 90%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Expert Specialists
              </span>
            </h1>

            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Book a consultation with our verified physiotherapy and wellness experts — in-person or online.
            </p>
          </div>

          {/* ── Filter bar ── */}
          <div className="zm-filter-row" style={{ marginBottom: 32 }}>

            {/* Search */}
            <div className="zm-search-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="zm-search"
                type="text"
                placeholder="Search doctor or condition…"
                value={searchInput}
                onChange={(e) => handleSearchInput(e.target.value)}
              />
            </div>

            <span className="zm-sep" aria-hidden="true" />

            {/* Language dropdown */}
            <LangDropdown
  value={activeLang}
  onChange={(lang) => {
    setActiveLang(lang);
  }}
/>
            <span className="zm-sep" aria-hidden="true" />

            {/* Specialty pills */}
            {SPECS.map((spec) => (
              <button
                key={spec}
                className={`zm-pill${activeSpec === spec ? " active" : ""}`}
                onClick={() => handleSpecChange(spec)}
              >
                {spec}
              </button>
            ))}

            {/* Currency badge — only for non-Indian users, appears once detected */}
            {!currencyLoading && (
              <CurrencyBadge currency={currency} countryCode={countryCode} />
            )}
          </div>

          {/* ── Doctor grid ── */}
          {doctors.length === 0 && !loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 12 }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p style={{ fontSize: 16, margin: 0 }}>No doctors found</p>
              <p style={{ fontSize: 13, margin: "6px 0 0" }}>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="zm-grid">
{filteredDoctors.map((doc) => (                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  onBook={handleBook}
                  formatFee={formatFee}
                />
              ))}
              {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
            </div>
          )}

          {/* ── Load more ── */}
          {hasMore && !loading && doctors.length > 0 && (
            <div style={{ textAlign: "center" }}>
              <button
                className="zm-load-more"
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
              >
                Load more doctors
              </button>
            </div>
          )}

          {!hasMore && doctors.length > 0 && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 16 }}>
              All {total} specialist{total !== 1 ? "s" : ""} shown
            </p>
          )}

        </div>
      </section>
    </>
  );
}