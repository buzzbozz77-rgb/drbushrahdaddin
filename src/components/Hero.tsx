"use client";

import Image from "next/image";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";

export default function Hero() {
  const { locale, toggleLocale, t } = useLocale();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#book", label: t.nav.contact },
  ];

  return (
    <section className="px-3 pt-4 pb-10 md:px-6 md:pt-6 md:pb-16">
      <div className="relative mx-auto max-w-[1320px] rounded-[32px] bg-white px-5 py-6 md:rounded-[40px] md:px-10 md:py-8">
        <nav className="flex items-center justify-between">
          <span className="font-display text-lg text-foreground">{doctor.shortName}</span>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLocale}
              className="tap-target hairline flex items-center gap-1 rounded-full border px-3 text-xs font-medium text-muted transition-colors hover:text-foreground"
              aria-label="Toggle language"
            >
              <span className={locale === "en" ? "text-foreground" : undefined}>EN</span>
              <span className="text-border">/</span>
              <span className={locale === "ar" ? "text-foreground" : undefined}>AR</span>
            </button>
            <a
              href={doctor.whatsappHref}
              className="tap-target hidden items-center rounded-full bg-ink px-5 text-sm font-medium text-white transition-opacity hover:opacity-85 sm:flex"
            >
              {t.nav.book}
            </a>
          </div>
        </nav>

        <div className="mt-10 flex flex-col gap-10 md:mt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <Reveal className="text-center lg:max-w-lg lg:text-left">
            <h1 className="font-display text-hero text-balance text-foreground">
              {t.doctor.tagline}
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-muted lg:mx-0">
              {t.doctor.bio}
            </p>
          </Reveal>

          <div className="relative mx-auto w-48 shrink-0 pb-10 sm:w-64 lg:w-72">
            <Parallax strength={22}>
              <Reveal delay={0.15} className="animate-float-slow">
                <Image
                  src="/hero/tooth-transparent.png"
                  alt=""
                  width={760}
                  height={1040}
                  priority
                  className="h-auto w-full drop-shadow-2xl"
                />
              </Reveal>
            </Parallax>

            <Reveal
              delay={0.3}
              className="glass absolute -bottom-8 left-1/2 flex w-max max-w-[230px] -translate-x-1/2 items-center gap-3 rounded-2xl px-3 py-2.5"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/photos/dr-bushra.jpg"
                  alt={doctor.fullName}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-xs font-medium text-foreground">{doctor.fullName}</p>
                <p className="text-[11px] leading-snug text-muted-soft">
                  {t.doctor.title} · {t.doctor.location}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.4}
            className="flex flex-col items-center gap-3 lg:items-end lg:text-right"
          >
            <a
              href={doctor.whatsappHref}
              className="tap-target inline-flex items-center rounded-full bg-ink px-8 text-base font-medium text-white transition-opacity hover:opacity-85"
            >
              {t.hero.ctaBook}
            </a>
            <p className="text-sm text-muted-soft">{t.doctor.location}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
