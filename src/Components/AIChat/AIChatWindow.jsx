//AIChatWindow.jsx
import { X } from "lucide-react";
import AssessmentChat from "./AssessmentChat";

export default function AIChatWindow({ onClose }) {
  return (
    <>
      {/* Invisible click-catcher so tapping outside the widget closes it — no dark overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

      <div
        className="fixed bottom-40 right-5 z-50 flex h-[60vh] max-h-[440px] w-[88vw] max-w-[340px]
                   origin-bottom-right flex-col overflow-hidden rounded-2xl bg-white shadow-2xl
                   ring-1 ring-black/5 animate-[chatpop_180ms_ease-out]
                   sm:bottom-40 sm:h-[520px] sm:w-[340px]"
        style={{ animationFillMode: "backwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes chatpop {
            from { opacity: 0; transform: translateY(8px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div className="flex items-center justify-between bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] px-4 py-3 text-white">
          <div>
            <p className="text-sm font-semibold">Zero AI Assistant</p>
            <p className="text-xs text-white/80">Quick Pain Assessment · ~1 min</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close assistant"
            className="rounded-full p-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AssessmentChat onClose={onClose} />
        </div>
      </div>
    </>
  );
}