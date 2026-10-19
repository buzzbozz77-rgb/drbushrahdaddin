"use client";

import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <Reveal>
          <h2 className="font-serif text-heading text-foreground">{t.about.heading}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{t.doctor.bio}</p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {doctor.credentials.map((credential) => (
              <li
                key={credential}
                className="hairline rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted"
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
