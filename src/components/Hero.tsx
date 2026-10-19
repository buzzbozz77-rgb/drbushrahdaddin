"use client";

import Image from "next/image";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

const chips = [
  { key: "cosmetic", top: "18%", side: "6%" as const },
  { key: "surgery", top: "48%", side: "92%" as const },
  { key: "veneers", top: "78%", side: "10%" as const },
];

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-10 md:pb-28 md:pt-16">
        <Reveal className="flex justify-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-foreground">
            {t.doctor.title}
          </span>
        </Reveal>

        <div className="relative mx-auto mt-8 max-w-4xl text-center md:mt-10">
          <Reveal>
            <h1 className="font-display text-display text-balance text-foreground">
              {t.doctor.tagline}
            </h1>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-8 flex max-w-sm justify-center md:mt-10 md:max-w-none">
          {/* Decorative connector chips — desktop only, non-essential content */}
          <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              {chips.map((chip) => (
                <line
                  key={chip.key}
                  x1={chip.side}
                  y1={chip.top}
                  x2="50%"
                  y2="50%"
                  stroke="var(--color-hairline)"
                  strokeWidth="1"
                />
              ))}
            </svg>
            {chips.map((chip, i) => (
              <Reveal
                key={chip.key}
                delay={0.3 + i * 0.1}
                className="glass absolute -translate-x-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-medium text-muted"
                style={{ top: chip.top, left: chip.side }}
              >
                {t.services.items[i].name}
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="animate-float-slow relative z-10 w-56 sm:w-72 md:w-96">
            <Image
              src="/hero/tooth.png"
              alt=""
              width={760}
              height={1040}
              priority
              className="h-auto w-full drop-shadow-2xl"
            />
          </Reveal>
        </div>

        <Reveal delay={0.35} className="mt-10 flex flex-col items-center gap-4">
          <a
            href={doctor.whatsappHref}
            className="tap-target inline-flex items-center rounded-full bg-ink px-8 text-base font-medium text-white transition-opacity hover:opacity-85"
          >
            {t.hero.ctaBook}
          </a>
          <p className="text-sm text-muted-soft">{t.doctor.location}</p>
        </Reveal>
      </div>
    </section>
  );
}
