// ─────────────────────────────────────────────────────────────────────────────
//  SCHEDULE TAB — Drop this into WhatsAppBulkDashboard.jsx
//
//  CHANGES NEEDED IN WhatsAppBulkDashboard.jsx:
//  1. Add "schedule" to the tab bar (see TAB BAR PATCH below)
//  2. Add the <ScheduleTab> render block inside the main <div> (see RENDER PATCH)
//  3. Add scheduleHistory state + fetchSchedules (see STATE PATCH)
//  4. This file exports <ScheduleTab> — import or paste inline
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env?.VITE_BACKEND_URL;

// ── Tiny helpers ──────────────────────────────────────────────────────────────
function pad(n) { return String(n).padStart(2, "0"); }

function formatDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function statusColor(s) {
  if (s === "sent")      return { bg: "rgba(34,197,94,.15)",  fg: "#22c55e" };
  if (s === "failed")    return { bg: "rgba(220,38,38,.15)",  fg: "#f87171" };
  if (s === "running")   return { bg: "rgba(56,189,248,.15)", fg: "#38bdf8" };
  if (s === "cancelled") return { bg: "rgba(161,161,170,.1)", fg: "#71717a" };
  /* pending */          return { bg: "rgba(250,204,21,.12)", fg: "#fbbf24" };
}

// ── Calendar ──────────────────────────────────────────────────────────────────
function MiniCalendar({ selectedDate, onChange }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear]   = useState(selectedDate?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate?.getMonth()    ?? today.getMonth());

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const firstDay   = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ userSelect: "none" }}>
      {/* Month nav */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <button onClick={prevMonth} style={{ background:"#27272a", border:"1px solid #3f3f46", color:"#a1a1aa", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>
        <span style={{ fontWeight:700, fontSize:14, color:"#e4e4e7" }}>{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} style={{ background:"#27272a", border:"1px solid #3f3f46", color:"#a1a1aa", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>›</button>
      </div>

      {/* Day headers */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign:"center", fontSize:10, fontWeight:700, color:"#52525b", padding:"4px 0", letterSpacing:1 }}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const thisDate = new Date(viewYear, viewMonth, day);
          const isPast   = thisDate < today;
          const isSel    = selectedDate
            && selectedDate.getDate()     === day
            && selectedDate.getMonth()    === viewMonth
            && selectedDate.getFullYear() === viewYear;
          const isToday  = thisDate.getTime() === today.getTime();

          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => {
                const d = new Date(viewYear, viewMonth, day);
                onChange(d);
              }}
              style={{
                background: isSel ? "linear-gradient(135deg,#22c55e,#16a34a)"
                          : isToday ? "rgba(34,197,94,.1)"
                          : "transparent",
                border: isToday && !isSel ? "1px solid #22c55e44" : "1px solid transparent",
                borderRadius: 8,
                color: isSel ? "#fff" : isPast ? "#3f3f46" : "#e4e4e7",
                cursor: isPast ? "not-allowed" : "pointer",
                fontSize: 13,
                fontWeight: isSel ? 700 : 400,
                padding: "7px 0",
                textAlign: "center",
                transition: "background .15s",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Time Picker ───────────────────────────────────────────────────────────────
function TimePicker({ hour, minute, ampm, onChange }) {
  const hours   = Array.from({ length: 12 }, (_, i) => pad(i + 1));
  const minutes = Array.from({ length: 60 }, (_, i) => pad(i));

  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <select
        value={hour}
        onChange={e => onChange({ hour: e.target.value, minute, ampm })}
        style={{ background:"#09090b", border:"1px solid #3f3f46", color:"#e4e4e7", borderRadius:8, padding:"8px 19px", fontSize:14, cursor:"pointer", outline:"none" }}
      >
        {hours.map(h => <option key={h} value={h}>{h}</option>)}
      </select>
      <span style={{ color:"#52525b", fontWeight:700, fontSize:18 }}>:</span>
      <select
        value={minute}
        onChange={e => onChange({ hour, minute: e.target.value, ampm })}
        style={{ background:"#09090b", border:"1px solid #3f3f46", color:"#e4e4e7", borderRadius:8, padding:"8px 10px", fontSize:14, cursor:"pointer", outline:"none" }}
      >
        {minutes.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <div style={{ display:"flex", borderRadius:8, overflow:"hidden", border:"1px solid #3f3f46" }}>
        {["AM","PM"].map(p => (
          <button
            key={p}
            onClick={() => onChange({ hour, minute, ampm: p })}
            style={{
              background: ampm === p ? "linear-gradient(135deg,#22c55e,#16a34a)" : "#09090b",
              color: ampm === p ? "#fff" : "#71717a",
              border: "none",
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "background .15s",
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main ScheduleTab component ────────────────────────────────────────────────
export default function ScheduleTab({ contacts, imageUrl }) {
  // Date / time state
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState({ hour: "09", minute: "00", ampm: "AM" });

  // Schedule list
  const [schedules, setSchedules]         = useState([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [expandedSched, setExpandedSched] = useState(null);
  const [schedPage, setSchedPage]         = useState(1);
  const [schedTotal, setSchedTotal]       = useState(0);

  // UI
  const [scheduling, setScheduling]   = useState(false);
  const [schedError, setSchedError]   = useState("");
  const [schedSuccess, setSchedSuccess] = useState("");

  const SCHED_LIMIT = 20;

  useEffect(() => { fetchSchedules(1); }, []);

  // ── Fetch scheduled jobs ─────────────────────────────────────────────────
  async function fetchSchedules(page = 1) {
    if (!API_BASE) return;
    setSchedulesLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/whatsapp-bulk/schedules?page=${page}&limit=${SCHED_LIMIT}`);
      const d = await r.json();
      setSchedules(d.schedules || []);
      setSchedTotal(d.total || 0);
      setSchedPage(page);
    } catch {
      setSchedules([]);
    } finally {
      setSchedulesLoading(false);
    }
  }

  // ── Cancel a pending schedule ────────────────────────────────────────────
  async function cancelSchedule(id) {
    if (!window.confirm("Cancel this scheduled campaign?")) return;
    try {
      const r = await fetch(`${API_BASE}/api/whatsapp-bulk/schedules/${id}/cancel`, { method: "POST" });
      if (!r.ok) throw new Error("Cancel failed");
      fetchSchedules(schedPage);
    } catch (e) {
      alert("Could not cancel: " + e.message);
    }
  }

  // ── Build scheduled DateTime ─────────────────────────────────────────────
  function buildScheduledAt() {
    if (!selectedDate) return null;
    const d    = new Date(selectedDate);
    let h      = parseInt(time.hour, 10);
    const m    = parseInt(time.minute, 10);
    if (time.ampm === "PM" && h !== 12) h += 12;
    if (time.ampm === "AM" && h === 12) h  = 0;
    d.setHours(h, m, 0, 0);
    return d;
  }

  const scheduledAt  = buildScheduledAt();
  const isInFuture   = scheduledAt && scheduledAt > new Date();

  // ── Schedule handler ─────────────────────────────────────────────────────
  async function handleSchedule() {
    setSchedError(""); setSchedSuccess("");
    if (!contacts?.length)   return setSchedError("Upload contacts first (go to Compose tab).");
    if (!scheduledAt)        return setSchedError("Pick a date.");
    if (!isInFuture)         return setSchedError("Scheduled time must be in the future.");

    setScheduling(true);
    try {
      const r = await fetch(`${API_BASE}/api/whatsapp-bulk/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contacts,
          templateName: "hi_followup",
          language: "en",
          imageUrl: imageUrl || null,
          scheduledAt: scheduledAt.toISOString(),
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Schedule failed.");
      setSchedSuccess(`✓ Scheduled for ${formatDateTime(scheduledAt.toISOString())} — ${contacts.length} contacts across ${Math.ceil(contacts.length / 5)} batches.`);
      fetchSchedules(1);
    } catch (e) {
      setSchedError(e.message);
    } finally {
      setScheduling(false);
    }
  }

  const totalSchedPages = Math.ceil(schedTotal / SCHED_LIMIT);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:32 }}>

        {/* ── LEFT: Date + Time picker ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Template info */}
          <div className="wa-card" style={{ padding:20 }}>
            <div className="section-label">Template to Schedule</div>
            <div style={{ background:"rgba(56,189,248,.06)", border:"1.5px solid #0ea5e9", borderRadius:12, padding:"14px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:"#38bdf8" }}>Hi Follow-Up</div>
                  <div style={{ fontSize:11, color:"#52525b", marginTop:3, fontFamily:"monospace" }}>hi_followup</div>
                </div>
                <span style={{ background:"rgba(56,189,248,.12)", color:"#38bdf8", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600 }}>UTILITY</span>
              </div>
              <div style={{ marginTop:12, background:"#0c1a2e", border:"1px solid #0c2a3f", borderRadius:10, padding:"12px 14px", fontSize:13, color:"#bae6fd", lineHeight:1.7 }}>
                Hi 👋<br />
                Just checking in regarding your session with Zeromedixine.<br /><br />
                Are you available to start your treatment? 😊<br /><br />
                Please reply to this message
              </div>
            </div>
          </div>

          {/* Contact summary */}
          <div className="wa-card" style={{ padding:20 }}>
            <div className="section-label">Contacts Loaded</div>
            {contacts?.length > 0 ? (
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:48, height:48, borderRadius:12, background:"rgba(34,197,94,.15)", border:"1px solid #166534", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>👥</div>
                <div>
                  <div style={{ fontSize:22, fontWeight:700, color:"#22c55e", fontFamily:"'Syne',sans-serif" }}>{contacts.length}</div>
                  <div style={{ fontSize:12, color:"#71717a", marginTop:2 }}>
                    contacts → {Math.ceil(contacts.length / 5)} batches × 5 &nbsp;·&nbsp; 10s gap
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color:"#52525b", fontSize:13, padding:"10px 0" }}>
                ⚠️ No contacts loaded. Go to <strong style={{ color:"#a1a1aa" }}>Compose</strong> tab and upload an .xlsx first.
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Calendar + time + schedule btn ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div className="wa-card" style={{ padding:24 }}>
            <div className="section-label">Pick Date &amp; Time</div>

            <MiniCalendar
              selectedDate={selectedDate}
              onChange={(d) => { setSelectedDate(d); setSchedSuccess(""); setSchedError(""); }}
            />

            <div style={{ height:1, background:"#27272a", margin:"18px 0" }} />

            <div style={{ marginBottom:6, fontSize:12, color:"#71717a" }}>Time</div>
            <TimePicker {...time} onChange={setTime} />

            {scheduledAt && (
              <div style={{ marginTop:14, background: isInFuture ? "rgba(34,197,94,.06)" : "rgba(220,38,38,.06)", border: `1px solid ${isInFuture ? "#166534" : "#7f1d1d"}`, borderRadius:10, padding:"10px 14px", fontSize:13, color: isInFuture ? "#22c55e" : "#f87171", fontWeight:600 }}>
                {isInFuture ? "🗓️ " : "⚠️ "}{formatDateTime(scheduledAt.toISOString())}
                {!isInFuture && " — must be in the future"}
              </div>
            )}
          </div>

          {schedError && (
            <div style={{ background:"rgba(220,38,38,.08)", border:"1px solid #7f1d1d", borderRadius:12, padding:"12px 16px", color:"#f87171", fontSize:13 }}>
              ⚠️ {schedError}
            </div>
          )}
          {schedSuccess && (
            <div style={{ background:"rgba(34,197,94,.08)", border:"1px solid #166534", borderRadius:12, padding:"12px 16px", color:"#22c55e", fontSize:13 }}>
              {schedSuccess}
            </div>
          )}

          <button
            className="btn-primary"
            onClick={handleSchedule}
            disabled={scheduling || !contacts?.length || !isInFuture}
            style={{ justifyContent:"center", width:"100%" }}
          >
            {scheduling
              ? <><span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin .8s linear infinite", display:"inline-block" }} />Scheduling…</>
              : <>🗓️ Schedule for {contacts?.length ?? 0} Contact{contacts?.length !== 1 ? "s" : ""}</>}
          </button>
        </div>
      </div>

      {/* ── Scheduled Jobs list ── */}
      <div style={{ borderTop:"1px solid #27272a", paddingTop:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, color:"#f4f4f5" }}>Scheduled Campaigns</div>
            <div style={{ fontSize:12, color:"#52525b", marginTop:2 }}>{schedTotal} total schedule{schedTotal !== 1 ? "s" : ""}</div>
          </div>
          <button className="btn-ghost" onClick={() => fetchSchedules(schedPage)} style={{ display:"flex", alignItems:"center", gap:6 }}>
            {schedulesLoading
              ? <span style={{ width:12, height:12, border:"2px solid #3f3f46", borderTopColor:"#a1a1aa", borderRadius:"50%", animation:"spin .8s linear infinite", display:"inline-block" }} />
              : "↻"} Refresh
          </button>
        </div>

        {schedulesLoading && schedules.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#52525b" }}>
            <span style={{ width:28, height:28, border:"3px solid #27272a", borderTopColor:"#22c55e", borderRadius:"50%", animation:"spin .8s linear infinite", display:"inline-block" }} />
            <div style={{ marginTop:14, fontSize:14 }}>Loading schedules…</div>
          </div>
        ) : schedules.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#52525b" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🗓️</div>
            <div style={{ fontSize:16 }}>No scheduled campaigns yet.</div>
          </div>
        ) : (
          <>
            {schedules.map((sch) => {
              const isOpen = expandedSched === sch._id;
              const sc     = statusColor(sch.status);
              const successRate = sch.totalContacts > 0
                ? Math.round(((sch.sentCount ?? 0) / sch.totalContacts) * 100) : 0;

              return (
                <div key={sch._id} className="history-row">
                  <div className="history-header" onClick={() => setExpandedSched(isOpen ? null : sch._id)}>
                    {/* Status dot */}
                    <div style={{ width:10, height:10, borderRadius:"50%", flexShrink:0, background:sc.fg, boxShadow: sch.status === "running" ? `0 0 8px ${sc.fg}` : "none" }} />

                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:600, fontSize:14, color:"#e4e4e7" }}>hi_followup — {sch.totalContacts} contacts</div>
                      <div style={{ fontSize:11, color:"#52525b", marginTop:2 }}>
                        Scheduled: {formatDateTime(sch.scheduledAt)}
                        {sch.executedAt && <> &nbsp;·&nbsp; Ran: {formatDateTime(sch.executedAt)}</>}
                      </div>
                    </div>

                    <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                      <span style={{ background:sc.bg, color:sc.fg, borderRadius:20, padding:"3px 12px", fontSize:12, fontWeight:600 }}>
                        {sch.status.charAt(0).toUpperCase() + sch.status.slice(1)}
                      </span>
                      {sch.status === "sent" && <span className="badge-sent">{sch.sentCount} sent</span>}
                      {sch.failedCount > 0 && <span className="badge-failed">{sch.failedCount} failed</span>}
                      {sch.status === "pending" && (
                        <button
                          className="btn-ghost"
                          onClick={(e) => { e.stopPropagation(); cancelSchedule(sch._id); }}
                          style={{ padding:"4px 10px", fontSize:12, color:"#f87171", borderColor:"#7f1d1d" }}
                        >
                          ✕ Cancel
                        </button>
                      )}
                    </div>

                    <div style={{ color:"#52525b", fontSize:12, marginLeft:8, transform:isOpen?"rotate(180deg)":"rotate(0deg)", transition:"transform .2s" }}>▼</div>
                  </div>

                  {isOpen && sch.contacts?.length > 0 && (
                    <div className="history-contacts">
                      {sch.status === "sent" && (
                        <div className="progress-track" style={{ marginBottom:12 }}>
                          <div className="progress-fill" style={{ width:`${successRate}%` }} />
                        </div>
                      )}
                      <div style={{ overflow:"hidden", borderRadius:10, border:"1px solid #27272a" }}>
                        <table className="contact-table">
                          <thead>
                            <tr><th>#</th><th>Name</th><th>Phone</th><th>Status</th><th>Error</th></tr>
                          </thead>
                          <tbody>
                            {sch.contacts.map((c, i) => (
                              <tr key={i}>
                                <td style={{ color:"#52525b" }}>{i+1}</td>
                                <td>{c.name}</td>
                                <td style={{ fontFamily:"monospace", fontSize:12 }}>{c.phone}</td>
                                <td>
                                  {c.status
                                    ? <span className={c.status === "sent" ? "badge-sent" : "badge-failed"}>{c.status === "sent" ? "✓ Sent" : "✗ Failed"}</span>
                                    : <span className="badge-pending">Pending</span>}
                                </td>
                                <td style={{ fontSize:11, color:"#f87171" }}>{c.error || "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {totalSchedPages > 1 && (
              <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:20, justifyContent:"center" }}>
                <button className="page-btn" disabled={schedPage <= 1} onClick={() => fetchSchedules(schedPage - 1)}>← Prev</button>
                <span style={{ fontSize:13, color:"#71717a" }}>Page {schedPage} of {totalSchedPages}</span>
                <button className="page-btn" disabled={schedPage >= totalSchedPages} onClick={() => fetchSchedules(schedPage + 1)}>Next →</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
//  PATCH 1 — Add to tab bar array in WhatsAppBulkDashboard.jsx
//  Find the tabs array and add this entry:
//
//   { key:"schedule", label:"🗓️ Schedule" },
//
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
//  PATCH 2 — Add inside the main <div> after the HISTORY block:
//
//   {activeTab === "schedule" && (
//     <ScheduleTab contacts={contacts} imageUrl={imageUrl} />
//   )}
//
// ─────────────────────────────────────────────────────────────────────────────
