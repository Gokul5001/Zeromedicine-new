// RecoveryPlanApproval.jsx
// Clinician-facing. Renders an AI-drafted plan clearly labeled as such,
// lets a physio tweak sets/reps/instructions, then approve or discard.
// Wire `physioId` from your existing physio auth/session state.
import { useState } from "react";
import { AlertCircle, Check, Trash2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function RecoveryPlanApproval({ plan, physioId, onResolved }) {
  const [exercises, setExercises] = useState(plan.exercises);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function updateExercise(index, field, value) {
    setExercises((prev) =>
      prev.map((ex, i) => (i === index ? { ...ex, [field]: value } : ex))
    );
  }

  function removeExercise(index) {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleApprove() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/recovery-plan/${plan._id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ physioId, physioNotes: notes, exercises }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not approve this plan.");
      }
      const updated = await res.json();
      onResolved?.(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDiscard() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/recovery-plan/${plan._id}/discard`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Could not discard this plan.");
      const updated = await res.json();
      onResolved?.(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-3 flex items-center gap-2 rounded-lg bg-amber-50 p-2 text-amber-800">
        <AlertCircle size={16} />
        <p className="text-xs font-medium">AI-drafted plan — review before approving</p>
      </div>

      <div className="space-y-4">
        {exercises.map((ex, i) => (
          <div key={ex.exerciseId || i} className="rounded-xl border border-gray-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium text-gray-800">{ex.name}</p>
              <button
                onClick={() => removeExercise(i)}
                className="text-gray-400 hover:text-red-500"
                aria-label={`Remove ${ex.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mb-2 flex gap-3">
              <label className="text-xs text-gray-500">
                Sets
                <input
                  type="number"
                  min={1}
                  value={ex.sets}
                  onChange={(e) => updateExercise(i, "sets", Number(e.target.value))}
                  className="ml-2 w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                />
              </label>
              <label className="text-xs text-gray-500">
                Reps
                <input
                  type="number"
                  min={1}
                  value={ex.reps}
                  onChange={(e) => updateExercise(i, "reps", Number(e.target.value))}
                  className="ml-2 w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                />
              </label>
            </div>

            <textarea
              value={ex.instructions}
              onChange={(e) => updateExercise(i, "instructions", e.target.value)}
              rows={2}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
              placeholder="Patient-facing instructions"
            />
            {ex.precautions && (
              <p className="mt-1 text-xs text-amber-700">⚠ {ex.precautions} (set by protocol, not editable here)</p>
            )}
          </div>
        ))}
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="Optional note to the patient"
        className="mt-4 w-full rounded border border-gray-300 px-2 py-1 text-sm"
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleApprove}
          disabled={submitting || exercises.length === 0}
          className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          <Check size={16} /> {submitting ? "Saving…" : "Approve plan"}
        </button>
        <button
          onClick={handleDiscard}
          disabled={submitting}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-60"
        >
          Discard, build manually
        </button>
      </div>
    </div>
  );
}
