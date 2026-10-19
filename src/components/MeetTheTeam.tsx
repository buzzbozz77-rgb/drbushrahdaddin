"use client";

import Image from "next/image";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function MeetTheTeam() {
  const { t } = useLocale();

  return (
    <section className="mx-auto max-w-[1320px] px-3 py-10 md:px-6 md:py-16">
      <Reveal>
        <h2 className="font-display text-heading-lg text-center text-foreground">
          {t.team.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">{t.team.subheading}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal delay={0.1} className="md:col-span-1">
          <div className="hero-deep-blue overflow-hidden rounded-[28px] p-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[22px]">
              <Image
                src="/photos/dr-bushra.jpg"
                alt={doctor.fullName}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="p-4 text-white">
              <p className="font-display text-lg">{doctor.fullName}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {t.services.items.map((s) => (
                  <li
                    key={s.name}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {[0, 1].map((i) => (
          <Reveal key={i} delay={0.15 + i * 0.05}>
            <div className="hairline flex h-full min-h-[22rem] flex-col items-center justify-center rounded-[28px] border border-dashed text-center">
              <span className="hairline flex h-10 w-10 items-center justify-center rounded-full border text-muted">
                +
              </span>
              <p className="mt-3 max-w-[12rem] text-sm text-muted-soft">{t.team.comingSoon}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
