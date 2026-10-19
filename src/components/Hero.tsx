"use client";

import Image from "next/image";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-[1400px] items-stretch md:grid-cols-2">
        <div className="relative order-2 flex flex-col justify-center px-6 py-10 md:order-1 md:px-16 md:py-24 lg:px-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              {t.doctor.title}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-serif text-display mt-5 text-foreground">
              {t.doctor.tagline}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              {t.doctor.bio}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10">
              <a
                href={doctor.whatsappHref}
                className="tap-target inline-flex items-center rounded-full bg-ink px-8 text-base font-medium text-ivory transition-opacity hover:opacity-85"
              >
                {t.hero.ctaBook}
              </a>
              <p className="mt-4 text-sm text-muted-soft">{t.doctor.location}</p>
            </div>
          </Reveal>
        </div>

        <div className="relative order-1 h-[46vh] overflow-hidden sm:h-[52vh] md:order-2 md:h-auto md:aspect-auto">
          <Parallax strength={50} className="absolute inset-0 -top-[8%] h-[116%] w-full">
            <Image
              src={doctor.portrait}
              alt={doctor.fullName}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
