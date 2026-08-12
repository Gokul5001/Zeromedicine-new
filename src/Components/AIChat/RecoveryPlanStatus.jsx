// RecoveryPlanStatus.jsx
// Lives inline inside the chat transcript. Polls for the Stage 2 plan
// tied to this assessment and shows progressive status — never navigates
// away from the chat window.
import { useEffect, useRef, useState } from "react";
import { Clock, CheckCircle2, Dumbbell } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;
const POLL_MS = 4000;

export default function RecoveryPlanStatus({ assessmentId }) {
  const [phase, setPhase] = useState("generating"); // generating | in_review | approved | discarded
  const [plan, setPlan] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!assessmentId) return;
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(`${API_BASE}/api/recovery-plan/by-assessment/${assessmentId}`);
        if (res.status === 404) {
          if (!cancelled) setPhase("generating");
          return;
        }
        if (!res.ok) return; // transient error — try again next tick
        const data = await res.json();
        if (cancelled) return;

        setPlan(data);
        if (data.status === "discarded") setPhase("discarded");
        else if (data.approvedByPhysio) setPhase("approved");
        else setPhase("in_review");
      } catch {
        // network hiccup — silently retry on next interval
      }
    }

    poll();
    intervalRef.current = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(intervalRef.current);
    };
  }, [assessmentId]);

  // Stop polling once we hit a final state — nothing more will change.
  useEffect(() => {
    if (phase === "approved" || phase === "discarded") {
      clearInterval(intervalRef.current);
    }
  }, [phase]);

  if (phase === "discarded") {
    return (
      <StatusCard icon={<Clock size={18} className="text-gray-400" />} tone="gray">
        Your physiotherapist is building your recovery plan by hand — you'll be notified
        when it's ready.
      </StatusCard>
    );
  }

  if (phase === "generating" || phase === "in_review") {
    return (
      <StatusCard icon={<Clock size={18} className="text-[#2F8FBE]" />} tone="blue">
        {phase === "generating"
          ? "Preparing your recovery plan…"
          : "Your recovery plan is in review by a physiotherapist."}
      </StatusCard>
    );
  }

  // phase === "approved"
  return (
    <StatusCard icon={<CheckCircle2 size={18} className="text-emerald-600" />} tone="green">
      <div className="flex items-center justify-between gap-3">
        <span>Your recovery plan is approved!</span>
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="shrink-0 rounded-lg bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] px-3 py-1.5 text-xs font-medium text-white"
          >
            Check my recovery plan
          </button>
        )}
      </div>

      {expanded && plan && (
        <div className="mt-3 space-y-2">
          {plan.exercises
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((ex) => (
              <div key={ex.exerciseId} className="rounded-lg border border-emerald-100 bg-white p-3">
                <div className="mb-1 flex items-center gap-2">
                  <Dumbbell size={14} className="text-[#3EC6B0]" />
                  <p className="text-sm font-medium text-gray-800">{ex.name}</p>
                </div>
                <p className="text-xs text-gray-600">
                  {ex.sets} sets × {ex.reps} reps
                </p>
                {ex.instructions && <p className="mt-1 text-xs text-gray-700">{ex.instructions}</p>}
                {ex.precautions && (
                  <p className="mt-1 text-xs text-amber-700">⚠ {ex.precautions}</p>
                )}
              </div>
            ))}

          {plan.physioNotes && (
            <div className="rounded-lg bg-white p-2 text-xs text-gray-700">
              <span className="font-medium">Note from your physiotherapist: </span>
              {plan.physioNotes}
            </div>
          )}
        </div>
      )}
    </StatusCard>
  );
}

const TONE_STYLES = {
  gray: "bg-gray-50 text-gray-700",
  blue: "bg-[#2F8FBE]/10 text-gray-800",
  green: "bg-emerald-50 text-gray-800",
};

function StatusCard({ icon, tone, children }) {
  return (
    <div className={`flex items-start gap-2 rounded-2xl rounded-bl-sm px-4 py-3 text-sm ${TONE_STYLES[tone]}`}>
      <span className="mt-0.5">{icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}