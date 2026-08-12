// src/Components/ClinicCalendarPage.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const tz = import.meta.env.VITE_CAL_TZ || "Asia/Kolkata";
const API_BASE = import.meta.env.VITE_BACKEND_URL || "";
const localizer = momentLocalizer(moment);

function formatRangeLabel(date, view) {
  const m = moment(date).tz(tz);
  if (view === "month") return m.format("MMMM YYYY");
  if (view === "week") {
    const start = m.clone().startOf("week").format("D MMM");
    const end = m.clone().endOf("week").format("D MMM YYYY");
    return `${start} — ${end}`;
  }
  if (view === "day") return m.format("dddd, D MMM YYYY");
  return m.format("D MMM YYYY");
}

function getEventTooltip(event) {
  const r = event.resource || {};
  const lines = [];
  if (r.patientName || r.name) lines.push(`Patient: ${r.patientName || r.name || "Unknown"}`);
  if (r.phone) lines.push(`Phone: ${r.phone}`);
  if (r.primaryConcern) lines.push(`Concern: ${r.primaryConcern}`);
  if (r.doctorAssignedUsername) lines.push(`Doctor: ${r.doctorAssignedUsername}`);
  return lines.join("\n");
}

export default function ClinicCalendarPage() {
  const { clinicId } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);

  useEffect(() => {
    if (API_BASE) axios.defaults.baseURL = API_BASE;
    axios.defaults.withCredentials = true;
  }, []);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!clinicId) {
        setError("Clinic id missing in URL");
        setEvents([]);
        setLoading(false);
        return;
      }

      const m = moment(date).tz(tz);
      let from, to;
      if (view === "month") {
        from = m.clone().startOf("month").format("YYYY-MM-DD");
        to = m.clone().endOf("month").format("YYYY-MM-DD");
      } else if (view === "week") {
        from = m.clone().startOf("week").format("YYYY-MM-DD");
        to = m.clone().endOf("week").format("YYYY-MM-DD");
      } else if (view === "day") {
        from = m.clone().startOf("day").format("YYYY-MM-DD");
        to = m.clone().endOf("day").format("YYYY-MM-DD");
      } else {
        from = m.clone().subtract(1, "month").format("YYYY-MM-DD");
        to = m.clone().add(2, "months").format("YYYY-MM-DD");
      }

      const url = `/api/calendar/clinic_events/${encodeURIComponent(clinicId)}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
      const resp = await axios.get(url);

      if (resp?.data?.success) {
        // resp.data.events are already ISO start/end strings
        const transformed = resp.data.events.map((ev) => ({
          ...ev,
          start: new Date(ev.start),
          end: new Date(ev.end)
        }));
        setEvents(transformed);
      } else {
        throw new Error(resp?.data?.message || "Invalid response");
      }
    } catch (err) {
      console.error("Clinic calendar fetch error:", err);
      if (err.response) setError(err.response.data?.message || `Error ${err.response.status}`);
      else setError(err.message || "Network error");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [clinicId, date, view]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const onSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setEventDetailsOpen(true);
  }, []);

  const eventStyleGetter = useCallback((event) => {
    const isSession = event.kind === "session";
    const bg = isSession ? "#fff4e6" : "#e8f7ff";
    const borderColor = isSession ? "#ff8a00" : "#1e8fd3";
    return { style: { backgroundColor: bg, borderLeft: `4px solid ${borderColor}`, color: "#0f172a", borderRadius: 6, padding: "6px 8px" } };
  }, []);

  const EventComponent = useMemo(() => ({
    event: ({ event }) => {
      const r = event.resource || {};
      const isSession = event.kind === "session";
      return (
        <div className="flex flex-col text-sm leading-tight">
          <div className="truncate text-xs font-semibold flex items-center gap-1">
            <span className={`inline-block w-2 h-2 rounded-full ${isSession ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
            {event.title}
          </div>
          <div className="truncate text-[11px] text-gray-600">{r.patientName || r.name || ""}</div>
          <div className="truncate text-[10px] text-gray-500">{r.doctorAssignedUsername || r.session_handled_display || ""}</div>
        </div>
      );
    }
  }), []);

  const gotoToday = () => setDate(new Date());
  const gotoPrev = () => {
    const unit = view === "month" ? "months" : view === "week" ? "weeks" : "days";
    setDate(moment(date).tz(tz).subtract(1, unit).toDate());
  };
  const gotoNext = () => {
    const unit = view === "month" ? "months" : view === "week" ? "weeks" : "days";
    setDate(moment(date).tz(tz).add(1, unit).toDate());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-25">
      <div className="flex items-center justify-between mb-4">
        <div>
        <button
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/clinic/dashboard");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1e8fd3] to-[#40d3b6] text-white rounded-xl shadow hover:opacity-95 transition"
          >
          ← Back
        </button>
          <h2 className="text-xl font-semibold py-4">Clinic Calendar</h2>
          <div className="text-xs text-gray-500">Clinic: {clinicId} • {formatRangeLabel(date, view)}</div>
        </div>
        <div className="flex items-center gap-2">
              <div className="inline-flex items-center rounded-md shadow-sm bg-white border p-1">
            <button onClick={gotoPrev} className="px-3">‹</button>
            <button onClick={gotoToday} className="px-3 text-sm font-medium">Today</button>
            <button onClick={gotoNext} className="px-3">›</button>
          </div>
          <select value={view} onChange={(e) => setView(e.target.value)} className="ml-2 rounded border px-2 py-1">
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
            <option value="agenda">Agenda</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-8 bg-white rounded shadow text-center">Loading clinic events…</div>
      ) : error ? (
        <div className="p-4 bg-red-50 rounded border text-red-700">{error}</div>
      ) : events.length === 0 ? (
        <div className="p-8 bg-white rounded shadow text-center">No events for this clinic in the selected period.</div>
      ) : (
        <div className="bg-white rounded shadow p-3" style={{ minHeight: '60vh' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={(v) => setView(v)}
            date={date}
            onNavigate={(d) => setDate(d)}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventStyleGetter}
            components={EventComponent}
            style={{ height: '62vh' }}
            tooltipAccessor={(e) => getEventTooltip(e)}
            titleAccessor={(e) => getEventTooltip(e)}
            popup
          />
        </div>
      )}

      {eventDetailsOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-5 overflow-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
              <button onClick={() => setEventDetailsOpen(false)} className="text-gray-500">✕</button>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              {selectedEvent.resource?.patientName && <div><b>Patient:</b> {selectedEvent.resource.patientName}</div>}
              {selectedEvent.resource?.phone && <div><b>Phone:</b> <a href={`tel:${selectedEvent.resource.phone}`} className="text-blue-600">{selectedEvent.resource.phone}</a></div>}
              {selectedEvent.resource?.primaryConcern && <div><b>Concern:</b> {selectedEvent.resource.primaryConcern}</div>}
              {selectedEvent.resource?.doctorAssignedUsername && <div><b>Doctor:</b> {selectedEvent.resource.doctorAssignedUsername}</div>}
              <div><b>Time:</b> {moment(selectedEvent.start).format("DD MMM YYYY, h:mm A")} — {moment(selectedEvent.end).format("h:mm A")}</div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setEventDetailsOpen(false)} className="px-3 py-1 bg-gray-100 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
