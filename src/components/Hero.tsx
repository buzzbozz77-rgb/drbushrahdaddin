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
        className="animate-drift absolute -top-24 -left-24 -z-10 h-80 w-80 rounded-full bg-primary-light/50 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift absolute top-32 right-0 -z-10 h-72 w-72 rounded-full bg-accent/60 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-accent/30 via-background to-background" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-28">
        <Reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-dark">
            {t.doctor.title}
          </p>
          <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
            {t.doctor.tagline}
          </h1>
          <p className="mt-6 max-w-md text-muted">{t.doctor.bio}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={doctor.whatsappHref}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              {t.hero.ctaBook}
            </a>
            <a
              href={doctor.mapsHref}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              {t.doctor.location}
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {statValues.map((value, i) => (
              <div key={value}>
                <dt className="sr-only">{t.stats[i]}</dt>
                <dd className="font-serif text-2xl text-foreground">{value}</dd>
                <dd className="mt-1 text-xs text-muted">{t.stats[i]}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="animate-float relative h-full w-full overflow-hidden rounded-[2rem] bg-surface shadow-2xl shadow-primary/20 ring-1 ring-border/60">
              <Image
                src={doctor.portrait}
                alt={doctor.fullName}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 24rem, 90vw"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-full border border-border bg-surface/90 px-5 py-2 text-xs font-medium text-muted shadow-lg backdrop-blur">
              {doctor.credentials.join(" · ")}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
