"use client";

import Image from "next/image";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function MeetTheTeam() {
  const { t } = useLocale();

  return (
    <section id="team" className="scroll-mt-nav px-3 py-6 md:px-6 md:py-10">
      <div className="glass-on-blue mx-auto max-w-[1200px] rounded-[32px] px-6 py-14 md:rounded-[40px] md:px-12 md:py-20">
        <Reveal>
          <h2 className="font-display text-heading-lg text-center text-white">
            {t.team.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/70">{t.team.subheading}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <div className="relative aspect-[3/4] w-full max-w-sm shrink-0 overflow-hidden rounded-[28px] ring-4 ring-white/25 md:w-80">
            <Image
              src="/photos/dr-bushra.jpg"
              alt={doctor.fullName}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>

          <div className="text-center md:text-left rtl:md:text-right">
            <p className="font-display text-heading text-white">{doctor.fullName}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start rtl:md:justify-end">
              {t.services.items.map((s) => (
                <li
                  key={s.name}
                  className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium text-white/70"
                >
                  {s.name}
                </li>
              ))}
            </ul>
            <a
              href={doctor.whatsappHref}
              className="tap-target mt-6 inline-flex items-center rounded-full bg-white px-7 text-sm font-medium text-ink transition-opacity hover:opacity-85"
            >
              {t.hero.ctaBook}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
