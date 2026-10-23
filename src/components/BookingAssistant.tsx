"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
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
      const reply: string = data.reply ?? t.assistant.errorReply;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t.assistant.errorReply }]);
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

  const ar = locale === "ar";
  const quickActions = [
    { label: t.assistant.quickBook, prompt: ar ? "بدي أحجز موعد" : "I'd like to book an appointment" },
    { label: t.assistant.quickServices, prompt: ar ? "شو الخدمات المتوفرة عندكم؟" : "What treatments do you offer?" },
    { label: t.assistant.quickDoctor, prompt: ar ? "احكيلي عن الدكتورة بشرى" : "Tell me about Dr. Bushra" },
    { label: t.assistant.quickLocation, prompt: ar ? "وين موقع العيادة؟" : "Where is the clinic?" },
  ];

  const panel = (
    <>
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[998] bg-ink/60 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.assistant.name}
        aria-expanded={open}
        className={`glass-on-blue tap-target fixed end-4 bottom-24 z-[999] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 active:scale-95 md:end-6 md:bottom-6 ${
          open ? "max-sm:hidden" : "animate-pulse-ring"
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      <div
        ref={panelRef}
        role="dialog"
        aria-label={t.assistant.name}
        dir={ar ? "rtl" : "ltr"}
        className="fixed inset-x-0 bottom-0 z-[999] flex max-h-[85dvh] flex-col overflow-hidden rounded-t-[28px] border border-white/15 shadow-2xl sm:inset-x-auto sm:end-6 sm:bottom-[10.5rem] sm:max-h-[min(640px,70vh)] md:bottom-24 sm:w-[400px] sm:rounded-[28px]"
        style={{ display: "none", backgroundColor: "#0c1c66" }}
      >
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/25 sm:hidden" aria-hidden />

        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
            <Image src="/photos/dr-bushra.jpg" alt="" fill sizes="40px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">{t.assistant.name}</span>
            <span className="flex items-center gap-1.5 text-[11px] text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              {t.assistant.disclosure}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.assistant.closeAria}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div ref={threadRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
          <div className="flex flex-col gap-2.5">
            <div className="bubble-in max-w-[85%] rounded-2xl rounded-ss-md bg-white/10 px-4 py-2.5 text-sm leading-relaxed text-white/90">
              {t.assistant.greeting}
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`bubble-in max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  m.role === "user"
                    ? "self-end rounded-ee-md bg-white text-ink"
                    : "self-start rounded-ss-md bg-white/10 text-white/90"
                }`}
              >
                <RichText text={m.content} onDark={m.role !== "user"} />
              </div>
            ))}

            {loading && (
              <div
                className="bubble-in flex items-center gap-1 self-start rounded-2xl rounded-ss-md bg-white/10 px-4 py-3.5"
                role="status"
                aria-label={t.assistant.typing}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 [scrollbar-width:none]">
          {quickActions.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => send(a.prompt)}
              disabled={loading}
              className="shrink-0 rounded-full border border-white/25 px-3.5 py-2 text-xs text-white/85 transition-colors hover:border-white/60 hover:bg-white/5 hover:text-white disabled:opacity-40"
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
            maxLength={500}
            enterKeyHint="send"
            className="tap-target min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-base text-white placeholder-white/40 outline-none transition-colors focus:border-white/50 sm:text-sm"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label={t.assistant.sendAria}
            className="tap-target flex items-center justify-center rounded-xl bg-white px-4 text-ink transition-opacity disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target flex items-center justify-center gap-2 border-t border-white/10 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-sm font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.7 2.2 13.9 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.3 3.7C18.1 1.4 15.1.2 12 .2 5.5.2.2 5.5.2 12c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.6c1.7.9 3.7 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3z" />
          </svg>
          {t.assistant.continueWhatsapp}
        </a>
      </div>
    </>
  );

  if (!mounted) return null;
  return createPortal(panel, document.body);
}

// Turns URLs in a reply into tappable links with a readable label, so the
// bot can point to WhatsApp or the map without showing a raw URL.
function RichText({ text, onDark }: { text: string; onDark: boolean }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!/^https?:\/\//.test(part)) return <span key={i}>{part}</span>;
        const url = part.replace(/[.,،)]+$/, "");
        const trailing = part.slice(url.length);
        const label = url.includes("wa.me")
          ? "WhatsApp"
          : url.includes("instagram.com")
            ? "Instagram"
            : url.includes("maps") || url.includes("goo.gl")
              ? "Google Maps"
              : url.replace(/^https?:\/\//, "");
        return (
          <span key={i}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold underline decoration-1 underline-offset-2 ${onDark ? "text-white" : "text-ink"}`}
            >
              {label}
            </a>
            {trailing}
          </span>
        );
      })}
    </>
  );
}
