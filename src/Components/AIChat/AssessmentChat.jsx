//Assessmentchat.jsx
import { useEffect, useRef, useState } from "react";
import AssessmentSummary from "./AssessmentSummary";
const API_BASE = import.meta.env.VITE_BACKEND_URL;
import DoctorConsultFlow from "./DoctorConsultFlow";

const CONDITIONS = [
  { value: "neck", label: "Neck" },
  { value: "back", label: "Back" },
  { value: "knee", label: "Knee" },
  { value: "shoulder", label: "Shoulder" },
  { value: "hip", label: "Hip" },
  { value: "other", label: "Other" },
];

const DURATIONS = [
  { value: "<1w", label: "Less than a week" },
  { value: "1-2w", label: "1–2 weeks" },
  { value: "2-4w", label: "2–4 weeks" },
  { value: "1-3m", label: "1–3 months" },
  { value: "3m+", label: "3+ months" },
];

const STEPS = ["condition", "painScore", "duration", "age", "previousInjury", "numbness", "swelling", "review"];

// Bot's chat line for each step — same questions, just phrased for a transcript.
const QUESTION_TEXT = {
  condition: "Hi! I'm Zero AI. What hurts today?",
  painScore: "Got it. On a scale of 0–10, how bad is the pain right now?",
  duration: "How long has this been going on?",
  age: "What's your age?",
  previousInjury: "Any previous injury to this area?",
  numbness: "Any numbness or tingling?",
  swelling: "Any visible swelling?",
  review: "Thanks — here's what I've got. Ready for your assessment?",
};

function getSessionId() {
  const key = "zx_session_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function AssessmentChat() {
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState({
    condition: "",
    painScore: null,
    durationBucket: "",
    age: "",
    previousInjury: null,
    numbness: null,
    swelling: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [specialistRequested, setSpecialistRequested] = useState(false);

  const askedSteps = useRef(new Set());
  const hasSubmittedRef = useRef(false);
  const scrollRef = useRef(null);
  const contentRef = useRef(null);
  const step = STEPS[stepIndex];

  // Append the bot's question bubble exactly once per step.
  useEffect(() => {
    if (askedSteps.current.has(step)) return;
    askedSteps.current.add(step);
    setMessages((prev) => [...prev, { id: `bot-${step}`, role: "bot", content: QUESTION_TEXT[step] }]);
  }, [step]);

  // Auto-scroll to bottom whenever the chat's content grows — driven by
  // actual DOM size changes (via ResizeObserver on the inner content
  // wrapper) rather than a fixed list of state deps. This also catches
  // content added by child components after they've mounted — e.g.
  // DoctorConsultFlow loading its doctor list asynchronously after
  // "Find a specialist" is clicked — which the parent has no state hook
  // into and would otherwise miss.
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const contentEl = contentRef.current;
    if (!scrollEl || !contentEl) return;

    const scrollToBottom = () => {
      scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
    };

    const observer = new ResizeObserver(() => {
      scrollToBottom();
    });
    observer.observe(contentEl);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (step === "review" && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function pushUserMessage(label) {
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: "user", content: label }]);
  }

  function next(field, value, label) {
    pushUserMessage(label);
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function resetAssessment() {
    askedSteps.current = new Set();
    hasSubmittedRef.current = false;
    setStepIndex(0);
    setMessages([]);
    setAnswers({
      condition: "",
      painScore: null,
      durationBucket: "",
      age: "",
      previousInjury: null,
      numbness: null,
      swelling: null,
    });
    setSubmitting(false);
    setError(null);
    setResult(null);
    setSpecialistRequested(false);
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/assessment/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          intake: {
            condition: answers.condition,
            painScore: Number(answers.painScore),
            durationBucket: answers.durationBucket,
            age: Number(answers.age),
            previousInjury: answers.previousInjury,
            numbness: answers.numbness,
            swelling: answers.swelling,
          },
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Assessment failed. Please try again.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        <div ref={contentRef} className="space-y-3">
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role}>
              {m.content}
            </ChatBubble>
          ))}
          {submitting && !result && <ChatBubble role="bot">Analyzing your answers…</ChatBubble>}
          {error && !result && <ChatBubble role="bot">{error}</ChatBubble>}
          {result && (
            <div className="space-y-3 pt-2">
              <AssessmentSummary
                result={result}
                onFindSpecialist={() => setSpecialistRequested(true)}
              />
              <DoctorConsultFlow result={result} forceOpen={specialistRequested} />
              <div className="flex justify-start">
                <button
                  onClick={resetAssessment}
                  className="text-xs font-medium text-gray-400 hover:text-gray-600"
                >
                  Start a new assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!result && !(step === "review" && !error) && (
        <div className="border-t border-gray-100 p-4">
          {step === "condition" && (
            <div className="grid grid-cols-2 gap-2">
              {CONDITIONS.map((c) => (
                <OptionButton key={c.value} onClick={() => next("condition", c.value, c.label)}>
                  {c.label}
                </OptionButton>
              ))}
            </div>
          )}

          {step === "painScore" && (
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
              {Array.from({ length: 11 }, (_, n) => n).map((n) => (
                <OptionButton key={n} onClick={() => next("painScore", n, `${n}/10`)} compact>
                  {n}
                </OptionButton>
              ))}
            </div>
          )}

          {step === "duration" && (
            <div className="flex flex-col gap-2">
              {DURATIONS.map((d) => (
                <OptionButton key={d.value} onClick={() => next("durationBucket", d.value, d.label)}>
                  {d.label}
                </OptionButton>
              ))}
            </div>
          )}

          {step === "age" && (
            <input
              type="number"
              min="1"
              max="120"
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-[#3EC6B0] focus:outline-none focus:ring-1 focus:ring-[#3EC6B0]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  next("age", e.currentTarget.value, e.currentTarget.value);
                }
              }}
              placeholder="Enter age and press Enter"
            />
          )}

          {step === "previousInjury" && (
            <YesNoRow onAnswer={(v) => next("previousInjury", v, v ? "Yes" : "No")} />
          )}

          {step === "numbness" && (
            <YesNoRow onAnswer={(v) => next("numbness", v, v ? "Yes" : "No")} />
          )}

          {step === "swelling" && (
            <YesNoRow onAnswer={(v) => next("swelling", v, v ? "Yes" : "No")} />
          )}

          {step === "review" && error && (
            <div className="flex gap-2">
              <OptionButton onClick={submit}>Try again</OptionButton>
              <OptionButton onClick={resetAssessment}>Start over</OptionButton>
            </div>
          )}

          {stepIndex > 0 && step !== "review" && (
            <button onClick={back} className="mt-3 text-sm text-gray-400 hover:text-gray-600">
              ← Back
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ChatBubble({ role, children }) {
  const isBot = role === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-xs ${
          isBot
            ? "rounded-bl-sm bg-gray-100 text-gray-800"
            : "rounded-br-sm bg-gradient-to-r from-[#3EC6B0] to-[#2F8FBE] text-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}


function OptionButton({ children, onClick, compact }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border border-gray-200 text-xs font-medium text-gray-700 transition-colors
                  hover:border-[#3EC6B0] hover:bg-[#3EC6B0]/5 ${compact ? "py-2" : "px-3 py-2.5"}`}
    >
      {children}
    </button>
  );
}

function YesNoRow({ onAnswer }) {
  return (
    <div className="flex gap-3">
      <OptionButton onClick={() => onAnswer(true)}>Yes</OptionButton>
      <OptionButton onClick={() => onAnswer(false)}>No</OptionButton>
    </div>
  );
}