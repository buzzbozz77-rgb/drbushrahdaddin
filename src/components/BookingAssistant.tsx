"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocale } from "@/components/LocaleProvider";
import { serviceOptions } from "@/config/services";
import { contact } from "@/config/contact";

type Step = "menu" | "service" | "day" | "name";

export default function BookingAssistant() {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("menu");
  const [service, setService] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [name, setName] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

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

  const dayOptions = [
    { id: "today", label: t.assistant.dayToday },
    { id: "tomorrow", label: t.assistant.dayTomorrow },
    { id: "week", label: t.assistant.dayThisWeek },
    { id: "flexible", label: t.assistant.dayFlexible },
  ];

  const sendToWhatsapp = () => {
    const serviceLabel = serviceOptions.find((s) => s.slug === service);
    const dayLabel = dayOptions.find((d) => d.id === day);
    const lines = [
      t.assistant.whatsappIntro,
      `${t.booking.serviceLabel}: ${serviceLabel ? (locale === "ar" ? serviceLabel.labelAr : serviceLabel.labelEn) : ""}`,
      `${t.booking.dateLabel}: ${dayLabel ? dayLabel.label : ""}`,
      `${t.booking.nameLabel}: ${name.trim()}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
    setOpen(false);
    setStep("menu");
    setService(null);
    setDay(null);
    setName("");
  };

  const reset = () => setStep("menu");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.assistant.name}
        className="glass-on-blue animate-pulse-ring tap-target fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white"
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
        className="glass-on-blue fixed inset-x-3 bottom-24 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-[28px] sm:inset-x-auto sm:end-6 sm:w-96"
        style={{ display: "none" }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm font-medium text-white">{t.assistant.name}</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-white/80">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {step === "menu" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-white/85">{t.assistant.greeting}</p>
              <button
                type="button"
                onClick={() => setStep("service")}
                className="tap-target rounded-xl bg-white px-4 text-sm font-medium text-ink"
              >
                {t.assistant.quickBook}
              </button>
              <a
                href="#services"
                onClick={() => setOpen(false)}
                className="tap-target flex items-center rounded-xl border border-white/30 px-4 text-sm text-white"
              >
                {t.assistant.quickServices}
              </a>
              <div className="rounded-xl border border-white/20 px-4 py-3 text-sm text-white/80">
                {t.assistant.locationInfo}
              </div>
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target flex items-center rounded-xl border border-white/30 px-4 text-sm text-white"
              >
                {t.assistant.quickWhatsapp}
              </a>
            </div>
          )}

          {step === "service" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-white">{t.assistant.pickService}</p>
              {serviceOptions.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => {
                    setService(s.slug);
                    setStep("day");
                  }}
                  className="tap-target rounded-xl border border-white/30 px-4 text-sm text-white text-left rtl:text-right"
                >
                  {locale === "ar" ? s.labelAr : s.labelEn}
                </button>
              ))}
              <button type="button" onClick={reset} className="mt-1 text-xs text-white/60">
                {t.assistant.back}
              </button>
            </div>
          )}

          {step === "day" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-white">{t.assistant.pickDay}</p>
              {dayOptions.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setDay(d.id);
                    setStep("name");
                  }}
                  className="tap-target rounded-xl border border-white/30 px-4 text-sm text-white text-left rtl:text-right"
                >
                  {d.label}
                </button>
              ))}
              <button type="button" onClick={() => setStep("service")} className="mt-1 text-xs text-white/60">
                {t.assistant.back}
              </button>
            </div>
          )}

          {step === "name" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-white">{t.assistant.namePrompt}</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.assistant.namePlaceholder}
                className="tap-target rounded-xl border border-white/30 bg-white/10 px-4 text-sm text-white placeholder-white/50 outline-none"
              />
              <button
                type="button"
                disabled={!name.trim()}
                onClick={sendToWhatsapp}
                className="tap-target rounded-xl bg-white px-4 text-sm font-medium text-ink disabled:opacity-50"
              >
                {t.assistant.send}
              </button>
              <button type="button" onClick={() => setStep("day")} className="mt-1 text-xs text-white/60">
                {t.assistant.back}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
