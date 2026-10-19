"use client";

import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <Reveal>
          <h2 className="font-serif text-3xl text-foreground">{t.about.heading}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{t.doctor.bio}</p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {doctor.credentials.map((credential) => (
              <li
                key={credential}
                className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium uppercase tracking-wide text-primary-dark"
              >
                {credential}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
