"use client";

import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";
import CountStats from "@/components/CountStats";

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="scroll-mt-nav px-3 py-6 md:px-6 md:py-10">
      <div className="glass-on-blue mx-auto max-w-[1200px] rounded-[32px] px-6 py-14 md:rounded-[40px] md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <Reveal>
            <h2 className="font-display text-heading-lg text-white">{t.about.heading}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-2xl text-lg leading-relaxed text-white/75">{t.doctor.bio}</p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {doctor.credentials.map((credential) => (
                <li
                  key={credential}
                  className="rounded-full border border-white/25 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white/70"
                >
                  {credential}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <CountStats />
      </div>
    </section>
  );
}
