//AssessmentSummary.jsx
import { AlertTriangle, CheckCircle2, Stethoscope, ChevronRight } from "lucide-react";

const SEVERITY_STYLES = {
  mild: "bg-emerald-50 text-emerald-700",
  moderate: "bg-amber-50 text-amber-700",
  severe: "bg-red-50 text-red-700",
};

export default function AssessmentSummary({ result, onFindSpecialist }) {
  const { conditionCategory, severity, redFlag, patientSummary, summaryForPhysio, assessmentId } = result;

  if (redFlag) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] space-y-3 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 text-center">
          <AlertTriangle size={32} className="mx-auto text-red-500" />
          <p className="text-xs font-semibold text-gray-800">Please seek medical attention</p>
          <p className="text-xs text-gray-600">
            Some of your answers suggest this needs a closer look sooner rather than later.
            We recommend booking a consultation now so a physiotherapist can review this directly.
          </p>
          <a
            href={`/book?assessmentId=${assessmentId}`}
            className="block w-full rounded-lg bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] py-2.5 text-center text-xs font-medium text-white"
          >
            Book a consultation now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-3 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 text-xs text-gray-800">
        <div className="flex items-center gap-2 text-[#2F8FBE]">
          <CheckCircle2 size={18} />
          <p className="font-semibold">Assessment complete</p>
        </div>

        <div>
          <p className="text-gray-500">Condition</p>
          <p className="font-semibold text-gray-800">{conditionCategory}</p>
        </div>

        <div>
          <p className="mb-1 text-gray-500">Severity</p>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${SEVERITY_STYLES[severity] || ""}`}
          >
            {severity}
          </span>
        </div>
          {patientSummary && (
          <p className="leading-relaxed text-gray-600">{patientSummary}</p>
        )}

        {/* {summaryForPhysio && (
          <div>
            <p className="text-gray-500">Note for your physiotherapist</p>
            <p className="text-gray-700">{summaryForPhysio}</p>
          </div>
        )} */}

        <div className="border-t border-gray-200 pt-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3EC6B0]/10 text-[#2F8FBE]">
              <Stethoscope size={16} />
            </span>
            <p className="text-gray-600">Want a physiotherapist to check this in person too?</p>
          </div>
          <button
            type="button"
            onClick={onFindSpecialist}
            className="flex w-full items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] py-2 text-xs font-medium text-white"
          >
            Find a specialist <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}