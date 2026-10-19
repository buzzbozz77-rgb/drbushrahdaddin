"use client";

import Image from "next/image";
import { doctor, statValues } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="animate-drift absolute -top-24 -left-24 -z-10 h-80 w-80 rounded-full bg-lilac/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift absolute top-32 right-0 -z-10 h-72 w-72 rounded-full bg-surface-warm blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-16 text-center md:py-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-caption font-medium text-foreground">
            <span aria-hidden>✦</span>
            {t.hero.trustPill}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="font-display text-display mt-6 max-w-3xl text-foreground">
            {t.doctor.tagline}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-body-lg mt-4 max-w-xl text-muted">{t.doctor.bio}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={doctor.whatsappHref}
              className="rounded-full bg-foreground px-7 py-3.5 text-body-sm font-medium text-white shadow-elevation transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaBook}
            </a>
            <a
              href={doctor.mapsHref}
              className="rounded-full border border-border px-7 py-3.5 text-body-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              {t.doctor.location}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32} className="mt-16 w-full">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="animate-float relative h-full w-full overflow-hidden rounded-[40px] bg-surface shadow-elevation">
              <Image
                src={doctor.portrait}
                alt={doctor.fullName}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 24rem, 90vw"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-xl border border-border bg-surface px-5 py-2.5 text-caption font-medium text-muted-strong shadow-elevation">
              {doctor.credentials.join("  ·  ")}
            </div>
          </div>
        </Reveal>

        <dl className="mt-24 grid w-full max-w-md grid-cols-3 gap-4">
          {statValues.map((value, i) => (
            <Reveal key={value} delay={i * 0.08}>
              <dt className="sr-only">{t.stats[i]}</dt>
              <dd className="font-display text-heading-sm text-foreground">{value}</dd>
              <dd className="text-caption mt-1 text-muted-strong">{t.stats[i]}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
