"use client";

import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-10">
      <div className="rounded-[40px] bg-surface px-8 py-14 shadow-elevation md:px-16">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <Reveal>
            <h2 className="font-display text-heading-sm text-foreground">{t.about.heading}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-2xl text-body-ink">{t.doctor.bio}</p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {doctor.credentials.map((credential) => (
                <li
                  key={credential}
                  className="text-caption rounded-xl bg-surface-warm px-4 py-2 font-medium uppercase tracking-wide text-muted-strong"
                >
                  {credential}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
