"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

const icons: Record<string, React.ReactNode> = {
  "cosmetic-dentistry": <path d="M12 3c2.5 0 4.5 1.5 4.5 4.5 0 2-.6 3.3-1 5.3-.4 2-.7 4.2-2 6.2-.4.6-1 1-1.5 1s-1.1-.4-1.5-1c-1.3-2-1.6-4.2-2-6.2-.4-2-1-3.3-1-5.3C7.5 4.5 9.5 3 12 3Z" />,
  "dental-oral-surgery": (
    <>
      <path d="M7 3l4 4-6 6a2.8 2.8 0 1 0 4 4l6-6 4 4" />
      <path d="M16 3l-3 3" />
    </>
  ),
  "botox-fillers": (
    <>
      <rect x="9" y="3" width="6" height="7" rx="1" />
      <path d="M11 10v10M13 10v10M9 14h6" />
    </>
  ),
  "veneers-implants": (
    <>
      <path d="M12 3l6 3v4c0 4.5-2.6 7.9-6 11-3.4-3.1-6-6.5-6-11V6l6-3Z" />
      <path d="M9 11l2 2 4-4" />
    </>
  ),
};

// Fixed numeric coordinate space (matches the image container's 16:9 box)
// so chip positions stay proportional at any viewport size.
const CHIP_VIEW_W = 1000;
const CHIP_VIEW_H = 562.5;

// Symmetric 2-left / 2-right cluster, pulled in close to the tooth and kept
// well clear of both the hotspot ring and the bottom-right assistant FAB.
const chipAnchors = [
  { x: 165, y: 155 },
  { x: 835, y: 155 },
  { x: 165, y: 305 },
  { x: 835, y: 305 },
];

const toPercent = (x: number, y: number) => ({
  left: `${(x / CHIP_VIEW_W) * 100}%`,
  top: `${(y / CHIP_VIEW_H) * 100}%`,
});

export default function Hero() {
  const { t } = useLocale();
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hotspotRef = useRef<HTMLButtonElement>(null);

  const chips = [
    { slug: "cosmetic-dentistry", name: t.services.items[0].name },
    { slug: "dental-oral-surgery", name: t.services.items[1].name },
    { slug: "botox-fillers", name: t.services.items[2].name },
    { slug: "veneers-implants", name: t.services.items[3].name },
  ];

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const els = chipRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { opacity: 0, y: 12, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, delay: 0.5, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleHotspot = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion) {
      if (hotspotRef.current) {
        gsap.fromTo(
          hotspotRef.current,
          { scale: 1 },
          { scale: 1.6, opacity: 0, duration: 0.6, ease: "power2.out", yoyo: true, repeat: 1 }
        );
      }
      chipRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          scale: 1.08,
          duration: 0.2,
          delay: i * 0.05,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });
      });
    }

    window.setTimeout(
      () => {
        document.getElementById("plan")?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      },
      reduceMotion ? 0 : 350
    );
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-16 md:px-10 md:pt-32">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 lg:grid-cols-2 lg:gap-6">
        <Reveal className="order-2 text-center lg:order-1 lg:text-left rtl:lg:text-right">
          <h1 className="font-display text-hero text-balance text-white">{t.doctor.tagline}</h1>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-white/75 lg:mx-0">
            {t.doctor.bio}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 lg:items-start">
            <a
              href={doctor.whatsappHref}
              className="tap-target inline-flex items-center rounded-full bg-white px-8 text-base font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaBook}
            </a>

            <div className="glass-on-blue flex items-center gap-3 rounded-2xl px-4 py-2.5">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/50">
                <Image
                  src="/photos/dr-bushra.jpg"
                  alt={doctor.fullName}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-xs font-semibold text-white">{doctor.fullName}</p>
                <p className="text-[11px] text-white/70">{t.doctor.title}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="relative order-1 mx-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-[28px] lg:order-2"
        >
          {/* Scaled up ~1.3x so the hand/tooth reads bigger in frame — the
              container (and so the chips' % positions below) keeps its size,
              this just zooms/clips the photo itself. */}
          <Image
            src="/hero/dentist-tooth.webp"
            alt={doctor.fullName}
            fill
            priority
            className="scale-[1.3] object-contain"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />

          <button
            ref={hotspotRef}
            type="button"
            onClick={handleHotspot}
            aria-label={t.planner.heading}
            className="tap-target animate-pulse-ring absolute top-[34%] left-[67%] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60"
          />

          {chips.map((chip, i) => (
            <div
              key={chip.slug}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              className="glass-chip-strong absolute hidden w-[124px] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl px-2.5 py-2 md:flex"
              style={toPercent(chipAnchors[i].x, chipAnchors[i].y)}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[chip.slug]}
                </svg>
              </span>
              <span className="text-xs leading-tight font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                {chip.name}
              </span>
            </div>
          ))}
        </Reveal>

        {/* Mobile: same four services as a simple 2x2 grid below the image. */}
        <div className="order-3 grid grid-cols-2 gap-3 md:hidden">
          {chips.map((chip) => (
            <div
              key={chip.slug}
              className="glass-chip-strong flex items-center gap-2 rounded-xl px-3 py-2.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[chip.slug]}
                </svg>
              </span>
              <span className="text-xs leading-tight font-medium text-white">{chip.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
