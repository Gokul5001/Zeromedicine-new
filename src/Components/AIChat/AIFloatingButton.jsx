//AIFloatingButton.jsx
import { useState } from "react";
import { Bot } from "lucide-react";
import AIChatWindow from "./AIChatWindow";

// Sits above your existing WhatsApp floating button.
// Adjust `bottom-24` if your WhatsApp button uses a different offset.
export default function AIFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Physio Assistant"
        className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full
                   bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] px-4 py-3 text-white
                   shadow-lg shadow-[#2F8FBE]/30 transition-transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-[#3EC6B0] focus:ring-offset-2"
      >
        <Bot size={20} />
        <span className="hidden text-sm font-medium sm:inline">Zero AI</span>
      </button>

      {open && <AIChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
