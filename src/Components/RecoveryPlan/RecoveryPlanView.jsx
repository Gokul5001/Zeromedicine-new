// RecoveryPlanView.jsx
// Patient-facing, view-only. Mirrors AssessmentSummary.jsx's structure/theme.
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Dumbbell } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function RecoveryPlanView({ assessmentId }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!assessmentId) return;
    let cancelled = false;

    async function fetchPlan() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/recovery-plan/by-assessment/${assessmentId}`);
        if (res.status === 404) {
          if (!cancelled) setPlan(null);
          return;
        }
        if (!res.ok) throw new Error("Could not load your recovery plan.");
        const data = await res.json();
        if (!cancelled) setPlan(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlan();
  }, [assessmentId]);

  if (loading) {
    return <div className="p-6 text-center text-sm text-gray-500">Loading your recovery plan…</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-sm text-red-600">{error}</div>;
  }

  // No plan yet, or plan exists but a physio hasn't approved it —
  // the patient must never see an unapproved AI draft.
  if (!plan || !plan.approvedByPhysio) {
    return (
      <div className="flex flex-col items-center gap-3 p-8 text-center">
        <Clock size={32} className="text-[#2F8FBE]" />
        <p className="font-semibold text-gray-800">Your recovery plan is being reviewed</p>
        <p className="text-sm text-gray-600">
          A licensed physiotherapist is finalizing your personalized exercise plan. You'll be notified
          as soon as it's ready.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-2 text-[#2F8FBE]">
        <CheckCircle2 size={22} />
        <p className="font-semibold">Your recovery plan</p>
      </div>

      <div className="space-y-3">
        {plan.exercises
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((ex) => (
            <div key={ex.exerciseId} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Dumbbell size={16} className="text-[#3EC6B0]" />
                <p className="font-medium text-gray-800">{ex.name}</p>
              </div>
              <p className="text-sm text-gray-600">
                {ex.sets} sets × {ex.reps} reps
              </p>
              {ex.instructions && <p className="mt-1 text-sm text-gray-700">{ex.instructions}</p>}
              {ex.precautions && (
                <p className="mt-1 text-xs text-amber-700">⚠ {ex.precautions}</p>
              )}
            </div>
          ))}
      </div>

      {plan.physioNotes && (
        <div className="mt-4 rounded-lg bg-[#3EC6B0]/10 p-3 text-sm text-gray-700">
          <span className="font-medium">Note from your physiotherapist: </span>
          {plan.physioNotes}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        This plan was drafted with AI assistance and reviewed and approved by a licensed
        physiotherapist before being shown to you.
      </p>
    </div>
  );
}
