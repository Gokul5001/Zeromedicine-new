import { useEffect, useState } from "react";
import RecoveryPlanApproval from "./RecoveryPlanApproval";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function PhysioReviewPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/recovery-plan/pending-review`)
      .then((r) => r.json())
      .then(setPlans)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8 text-center">Loading pending plans…</p>;
  if (plans.length === 0) return <p className="p-8 text-center">No plans pending review.</p>;

  return (
    <div className="mx-auto max-w-xl space-y-6 py-30">
      {plans.map((plan) => (
        <RecoveryPlanApproval
          key={plan._id}
          plan={plan}
          physioId="000000000000000000000001"
          onResolved={(updated) =>
            setPlans((prev) => prev.filter((p) => p._id !== updated._id))
          }
        />
      ))}
    </div>
  );
}