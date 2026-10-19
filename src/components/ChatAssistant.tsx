"use client";

import { useState } from "react";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

type Message = { role: "bot" | "user"; text: string };

export default function ChatAssistant() {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t.chat.greeting },
  ]);

  const quickReplies: { key: keyof typeof t.chat.answers; label: string }[] = [
    { key: "services", label: t.chat.quickReplies.services },
    { key: "book", label: t.chat.quickReplies.book },
    { key: "location", label: t.chat.quickReplies.location },
    { key: "hours", label: t.chat.quickReplies.hours },
  ];

  function respond(userText: string, answerKey?: keyof typeof t.chat.answers) {
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    const lower = userText.toLowerCase();
    let key = answerKey;
    if (!key) {
      if (/service|خدم/i.test(lower)) key = "services";
      else if (/book|appoint|حجز|موعد/i.test(lower)) key = "book";
      else if (/where|location|موقع|وين/i.test(lower)) key = "location";
      else if (/hour|time|دوام|وقت/i.test(lower)) key = "hours";
      else key = "fallback";
    }

    const answer = t.chat.answers[key];
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
    }, 400);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    respond(trimmed);
    setInput("");
  }

  return (
    <>
      {open && (
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="fixed bottom-24 left-6 z-50 flex h-[28rem] w-[92vw] max-w-sm flex-col overflow-hidden rounded-[28px] bg-surface shadow-elevation"
        >
          <div className="bg-brand-gradient flex items-center justify-between px-5 py-4">
            <span className="text-body-sm font-medium text-white">{t.chat.assistantName}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-white/90 transition-opacity hover:opacity-70"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-body-sm max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  m.role === "bot"
                    ? "bg-surface-warm text-body-ink"
                    : "ms-auto bg-foreground text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {quickReplies.map((q) => (
              <button
                key={q.key}
                type="button"
                onClick={() => respond(q.label, q.key)}
                className="text-caption rounded-xl border border-border px-3 py-1.5 text-muted-strong transition-colors hover:text-foreground"
              >
                {q.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              className="text-body-sm flex-1 rounded-xl bg-surface-warm px-3 py-2 text-body-ink outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-foreground px-3 py-2 text-body-sm font-medium text-white"
            >
              →
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.chat.assistantName}
        className="bg-brand-gradient animate-pulse-ring fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-elevation transition-transform hover:scale-105"
      >
        {open ? (
          "✕"
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <span className="sr-only">{doctor.fullName}</span>
    </>
  );
}
