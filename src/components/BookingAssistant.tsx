"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useLocale } from "@/components/LocaleProvider";
import { contact } from "@/config/contact";

type Message = { role: "user" | "assistant"; content: string };

export default function BookingAssistant() {
  const { locale, t } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (open) {
      el.style.display = "flex";
      if (!reduceMotion) {
        gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      }
    } else if (el.style.display === "flex") {
      if (reduceMotion) {
        el.style.display = "none";
      } else {
        gsap.to(el, {
          opacity: 0,
          y: 24,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      }
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, locale }),
      });
      const data = await res.json();
      const reply: string = data.reply ?? (locale === "ar" ? t.assistant.locationInfo : t.assistant.locationInfo);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t.assistant.locationInfo }]);
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = (() => {
    const transcript = messages
      .slice(-8)
      .map((m) => `${m.role === "user" ? (locale === "ar" ? "أنا" : "Me") : (locale === "ar" ? "المساعد" : "Assistant")}: ${m.content}`)
      .join("\n");
    const intro = locale === "ar" ? "أهلاً، كنت أتحدث مع مساعد الحجز:" : "Hi, I was chatting with the booking assistant:";
    const text = encodeURIComponent(transcript ? `${intro}\n\n${transcript}` : intro);
    return `https://wa.me/${contact.whatsappNumber}?text=${text}`;
  })();

  const quickActions = [
    {
      label: t.assistant.quickBook,
      onClick: () => send(locale === "ar" ? "بدي أحجز موعد" : "I'd like to book an appointment"),
    },
    {
      label: t.assistant.quickServices,
      onClick: () => send(locale === "ar" ? "شو الخدمات المتوفرة عندكم؟" : "What services do you offer?"),
    },
    {
      label: t.assistant.quickLocation,
      onClick: () => send(locale === "ar" ? "وين موقع العيادة وشو ساعات الدوام؟" : "Where is the clinic and what are your hours?"),
    },
  ];

  const panel = (
    <>
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[998] bg-ink/60 backdrop-blur-sm transition-opacity sm:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.assistant.name}
        className="glass-on-blue animate-pulse-ring tap-target fixed bottom-6 end-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full text-white"
      >
        {open ? (
          <span className="text-xl">✕</span>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div
        ref={panelRef}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="fixed inset-x-3 bottom-24 z-[999] flex max-h-[75vh] flex-col overflow-hidden rounded-[28px] border border-white/15 shadow-2xl sm:inset-x-auto sm:bottom-24 sm:end-6 sm:w-96"
        style={{ display: "none", backgroundColor: "#0c1c66" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <span className="block text-sm font-medium text-white">{t.assistant.name}</span>
            <span className="block text-[11px] text-white/50">{t.assistant.disclosure}</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-white/80">
            ✕
          </button>
        </div>

        <div ref={threadRef} className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-3">
            <div className="max-w-[85%] rounded-2xl rounded-ss-sm bg-white/10 px-4 py-2.5 text-sm text-white/90">
              {t.assistant.greeting}
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "self-end rounded-ee-sm bg-white text-ink"
                    : "self-start rounded-ss-sm bg-white/10 text-white/90"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="self-start rounded-2xl rounded-ss-sm bg-white/10 px-4 py-2.5 text-sm text-white/60">
                {t.assistant.typing}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
          {quickActions.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              disabled={loading}
              className="rounded-full border border-white/25 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white/50 hover:text-white disabled:opacity-40"
            >
              {a.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.assistant.inputPlaceholder}
            className="tap-target flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label={t.assistant.sendAria}
            className="tap-target flex items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-ink disabled:opacity-40"
          >
            →
          </button>
        </form>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target flex items-center justify-center gap-2 border-t border-white/10 text-sm font-medium text-white/90 hover:text-white"
        >
          {t.assistant.continueWhatsapp}
        </a>
      </div>
    </>
  );

  if (!mounted) return null;
  return createPortal(panel, document.body);
}
