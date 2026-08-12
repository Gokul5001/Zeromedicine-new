import { useParams } from "react-router-dom";
import RecoveryPlanView from "./RecoveryPlanView";

export default function RecoveryPlanViewPage() {
  const { assessmentId } = useParams();
  return <RecoveryPlanView assessmentId={assessmentId} />;
}