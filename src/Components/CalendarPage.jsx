// src/Components/CalendarPage.jsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const tz = import.meta.env.VITE_CAL_TZ || "Asia/Kolkata";
// IMPORTANT: default to your backend port if env not set
const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const localizer = momentLocalizer(moment);

// ---------- helpers ----------
const formatRangeLabel = (date, view) => {
  const m = moment(date).tz(tz);
  if (view === "month") return m.format("MMMM YYYY");
  if (view === "week") {
    const start = m.clone().startOf("week").format("D MMM");
    const end = m.clone().endOf("week").format("D MMM YYYY");
    return `${start} — ${end}`;
  }
  if (view === "day") return m.format("dddd, D MMM YYYY");
  return m.format("D MMM YYYY");
};

function parseDateTime(dateStr, timeStr) {
  if (!dateStr) return null;
  const date = (dateStr || "").toString();
  const time = (timeStr || "").toString();
  const formats = [
    "YYYY-MM-DD HH:mm:ss",
    "YYYY-MM-DD HH:mm",
    "YYYY-MM-DDTHH:mm:ss",
    "YYYY-MM-DDTHH:mm",
    "YYYY-MM-DD"
  ];
  let m = null;
  for (const format of formats) {
    m = moment.tz(`${date} ${time}`.trim(), format, tz);
    if (m.isValid()) break;
  }
  if (!m || !m.isValid()) {
    m = moment.tz(date, "YYYY-MM-DD", tz);
  }
  return m.isValid() ? m.toDate() : null;
}

const getEventTooltip = (event) => {
  const r = event.resource || {};
  const lines = [];
  if (r.patientName || r.name) lines.push(`Patient: ${r.patientName || r.name || "Unknown"}`);
  if (r.phone) lines.push(`Phone: ${r.phone}`);
  if (r.primaryConcern) lines.push(`Concern: ${typeof r.primaryConcern === 'object' ? r.primaryConcern.concern : r.primaryConcern}`);
  if (r.packageName) lines.push(`Package: ${r.packageName}`);
  if (r.sessionIndex) lines.push(`Session #${r.sessionIndex}`);
  if (r.doctorAssignedUsername) lines.push(`Doctor: ${r.doctorAssignedUsername}`);
  if (r.chiefComplaints) lines.push(`Chief Complaint: ${r.chiefComplaints}`);
  if (r.enquiryNotes) lines.push(`Notes: ${r.enquiryNotes}`);
  return lines.join('\n');
};

// ---------- component ----------
const CalendarPage = () => {
  const { username: routeUsername, doctorId: routeDoctorId } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // axios defaults
  useEffect(() => {
    axios.defaults.baseURL = API_BASE;
    axios.defaults.withCredentials = true;
  }, []);

  // fetch events
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const m = moment(date).tz(tz);
      let from, to;
      switch (view) {
        case "month":
          from = m.clone().startOf("month").format("YYYY-MM-DD");
          to = m.clone().endOf("month").format("YYYY-MM-DD");
          break;
        case "week":
          from = m.clone().startOf("week").format("YYYY-MM-DD");
          to = m.clone().endOf("week").format("YYYY-MM-DD");
          break;
        case "day":
          from = m.clone().startOf("day").format("YYYY-MM-DD");
          to = m.clone().endOf("day").format("YYYY-MM-DD");
          break;
        default:
          from = m.clone().subtract(1, "month").format("YYYY-MM-DD");
          to = m.clone().add(2, "months").format("YYYY-MM-DD");
      }

      const params = new URLSearchParams();
      if (from) params.append("from", from);
      if (to) params.append("to", to);

      if (routeDoctorId) params.append("doctorId", routeDoctorId);
      if (routeUsername) params.append("username", routeUsername);

      // fallback querystring
      try {
        const pageParams = new URLSearchParams(window.location.search);
        if (!routeDoctorId && pageParams.get("doctorId")) params.append("doctorId", pageParams.get("doctorId"));
        if (!routeUsername && pageParams.get("username")) params.append("username", pageParams.get("username"));
      } catch (e) {}

      const url = `${API_BASE}/api/calendar/specific_events?${params.toString()}`;
      const resp = await axios.get(url);

      if (resp.data && resp.data.success) {
        const transformedEvents = resp.data.events.map((event) => {
          const resource = event.resource || {};
          const isSession = event.kind === "session";
          let start, end;

          if (event.start && event.end) {
            start = new Date(event.start);
            end = new Date(event.end);
          } else {
            if (isSession) {
              const sessionData = resource.sessionData || {};
              start = parseDateTime(sessionData.date, sessionData.time) || new Date();
              end = moment(start).add(resource.durationMinutes || 60, "minutes").toDate();
            } else {
              start = parseDateTime(resource.appointment_date || resource.cdate, resource.appointment_time || resource.ctime) || new Date();
              end = moment(start).add(30, "minutes").toDate();
            }
          }

          // Map resource fields to friendly names where possible
          const patientName = resource.patientName || resource.name || (resource.raw && (resource.raw.name || resource.raw.patientName)) || "Patient";
          const primaryConcern = resource.primaryConcern || (resource.raw && resource.raw.primaryConcern) || null;
          const doctorAssignedUsername = resource.doctorAssignedUsername || (resource.raw && (resource.raw.doctorAssignedUsername || resource.raw.doctorAssignedName)) || null;
          const phone = resource.phone || (resource.raw && resource.raw.phone) || null;

          return {
            id: event.id || `evt_${Math.random().toString(36).slice(2)}`,
            title: event.title || (isSession ? `Session: ${resource.packageName || ""}` : `Appt: ${patientName}`),
            start,
            end,
            allDay: !!event.allDay,
            resource: {
              ...resource,
              raw: resource.raw || resource,
              kind: event.kind,
              color: event.color,
              patientName,
              primaryConcern,
              phone,
              cdate: resource.cdate,
              ctime: resource.ctime,
              appointment_date: resource.appointment_date,
              appointment_time: resource.appointment_time,
              doctorAssignedUsername,
              packageName: resource.packageName,
              sessionIndex: resource.sessionIndex,
              session_handled_display: resource.session_handled_display,
              chiefComplaints: resource.chiefComplaints || resource.raw?.chiefComplaint,
              enquiryNotes: resource.enquiryNotes || resource.raw?.enquiryNotes,
              twilioRoomPatient: resource.twilioRoomPatient || resource.raw?.twilioRoomPatient,
              appointmentId: resource.appointmentId || resource.raw?._id,
              _id: resource._id || resource.raw?._id
            },
            kind: event.kind || "appointment",
            color: event.color || (isSession ? "#fff4e6" : "#e8f7ff")
          };
        });

        setEvents(transformedEvents);
      } else {
        throw new Error(resp.data?.message || "Invalid response from server");
      }
    } catch (err) {
      console.error("Error loading calendar events:", err);
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError("Unauthorized - Please login again");
            break;
          case 403:
            setError("Access forbidden - You don't have permission");
            break;
          case 404:
            setError("Calendar endpoint not found (check backend route)");
            break;
          case 500:
            setError("Server error - Please try again later");
            break;
          default:
            setError(err.response.data?.message || `Error ${err.response.status}: ${err.response.statusText}`);
        }
      } else if (err.request) {
        setError("Network error - Check backend URL and CORS");
      } else {
        setError(err.message || "Error fetching calendar events");
      }
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [date, view, routeDoctorId, routeUsername]);

  // initial + refresh fetch
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, refreshCounter]);

  // on select event - open modal
  const onSelectEvent = useCallback((event) => {
    console.log("onSelectEvent fired:", event); // <-- debug: check console
    setSelectedEvent(event);
    setEventDetailsOpen(true);
  }, []);

  // event style
  const eventStyleGetter = useCallback((event) => {
    const isSession = event.kind === "session";
    const bg = isSession ? "#fff4e6" : "#e8f7ff";
    const borderColor = isSession ? "#ff8a00" : "#1e8fd3";
    return {
      style: {
        backgroundColor: bg,
        borderLeft: `4px solid ${borderColor}`,
        color: "#0f172a",
        padding: "6px 8px",
        borderRadius: "6px",
        fontWeight: 600,
        boxSizing: "border-box",
        cursor: "pointer"
      }
    };
  }, []);

  // quick handlers (view/call/whatsapp)
  const handleEventAction = useCallback((action, event) => {
    const r = event.resource || {};
    const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
    if (action === "view") {
      if (r.twilioRoomPatient?.link) window.open(r.twilioRoomPatient.link, "_blank");
      else if (r._id) window.location.href = `${FRONTEND_URL}/patient/${r._id}`;
    } else if (action === "call") {
      if (r.phone) window.location.href = `tel:${r.phone}`;
    } else if (action === "whatsapp") {
      if (r.phone) {
        const message = `Hi ${r.patientName || 'there'}, this is regarding your appointment.`;
        window.open(`https://wa.me/${r.phone}?text=${encodeURIComponent(message)}`, "_blank");
      }
    }
    setEventDetailsOpen(false);
  }, []);

  // small navigation helpers
  const gotoToday = () => setDate(new Date());
  const refresh = () => setRefreshCounter(c => c + 1);

  // formatted date text
  const formattedDate = useMemo(() => moment(date).tz(tz).format("dddd, D MMMM YYYY"), [date]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Calendar</h2>
          <p className="mt-1 text-sm text-gray-500">Appointments & Sessions — organized view for your clinics</p>
          <p className="mt-1 text-xs text-gray-400">{formattedDate} • Timezone: {tz} • API: {API_BASE}</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={gotoToday} className="px-3 py-1 rounded-md border">Today</button>
          <button onClick={refresh} className="px-3 py-1 rounded-md bg-[#1e8fd3] text-white">Refresh</button>
        </div>
      </div>

      {loading && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">Loading events from {API_BASE}...</div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="p-6 bg-white rounded shadow">No events found for this doctor/period.</div>
      )}

      {!loading && !error && events.length > 0 && (
        <div style={{ height: "62vh" }} className="bg-white rounded-lg p-2 shadow-sm">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={(v) => setView(v)}
            date={date}
            onNavigate={(d) => setDate(d)}
            views={{ month: true, week: true, day: true, agenda: true }}
            step={30}
            timeslots={2}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventStyleGetter}
            popup
            selectable={false}
            style={{ height: "100%" }}
            titleAccessor={(event) => getEventTooltip(event)}
            tooltipAccessor={(event) => getEventTooltip(event)}
          />
        </div>
      )}

      {/* Modal (opens when eventDetailsOpen && selectedEvent) */}
      {eventDetailsOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{selectedEvent.title}</h3>
                <button onClick={() => setEventDetailsOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
              </div>

              <div className="space-y-3">
                {selectedEvent.resource?.patientName && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Patient:</span>
                    <span className="ml-2 text-gray-800">{selectedEvent.resource.patientName}</span>
                  </div>
                )}

                {selectedEvent.resource?.phone && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <span className="ml-2 text-gray-800">
                      <a href={`tel:${selectedEvent.resource.phone}`} className="text-blue-600 hover:text-blue-800">{selectedEvent.resource.phone}</a>
                    </span>
                  </div>
                )}

                {selectedEvent.resource?.primaryConcern && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Concern:</span>
                    <span className="ml-2 text-gray-800">{typeof selectedEvent.resource.primaryConcern === "object" ? (selectedEvent.resource.primaryConcern.concern || JSON.stringify(selectedEvent.resource.primaryConcern)) : selectedEvent.resource.primaryConcern}</span>
                  </div>
                )}

                {selectedEvent.resource?.doctorAssignedUsername && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Doctor:</span>
                    <span className="ml-2 text-gray-800">{selectedEvent.resource.doctorAssignedUsername}</span>
                  </div>
                )}

                <div>
                  <span className="text-sm font-medium text-gray-500">Time:</span>
                  <span className="ml-2 text-gray-800">
                    {moment(selectedEvent.start).format("DD MMM YYYY, h:mm A")} - {moment(selectedEvent.end).format("h:mm A")}
                  </span>
                </div>

                {selectedEvent.resource?.cdate && selectedEvent.resource?.ctime && (
                  <div className="text-xs text-gray-400">Created: {selectedEvent.resource.cdate} {selectedEvent.resource.ctime}</div>
                )}
              </div>

              {/* <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                {selectedEvent.resource?.twilioRoomPatient?.link && (
                  <button onClick={() => handleEventAction("view", selectedEvent)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors flex items-center gap-1">
                    <span>🎥</span><span>Join Video Call</span>
                  </button>
                )}

                {selectedEvent.resource?._id && (
                  <button onClick={() => handleEventAction("view", selectedEvent)} className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors flex items-center gap-1">
                    <span>👤</span><span>View Patient</span>
                  </button>
                )}

                {selectedEvent.resource?.phone && (
                  <>
                    <button onClick={() => handleEventAction("call", selectedEvent)} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors flex items-center gap-1">
                      <span>📞</span><span>Call</span>
                    </button>
                    <button onClick={() => handleEventAction("whatsapp", selectedEvent)} className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1DA851] text-white rounded text-sm transition-colors flex items-center gap-1">
                      <span>💬</span><span>WhatsApp</span>
                    </button>
                  </>
                )}

                <button onClick={() => setEventDetailsOpen(false)} className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm transition-colors">Close</button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
