"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

const icons: Record<string, React.ReactNode> = {
  "cosmetic-dentistry": (
    <path d="M12 3c2.5 0 4.5 1.5 4.5 4.5 0 2-.6 3.3-1 5.3-.4 2-.7 4.2-2 6.2-.4.6-1 1-1.5 1s-1.1-.4-1.5-1c-1.3-2-1.6-4.2-2-6.2-.4-2-1-3.3-1-5.3C7.5 4.5 9.5 3 12 3Z" />
  ),
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

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */
// One shared coordinate space (the image box is exactly 16:9, and the photo
// is 16:9 too, so object-cover crops nothing and % positions map 1:1 onto
// the photo). Chips, hotspot and leader lines all live in this space.
const VIEW_W = 1000;
const VIEW_H = 562.5;

// The tooth. Measured on the *unscaled* photo (the old 1.3x zoom is gone, so
// the old 67% / 23% mapped back to ~63% / ~38%).
const HOTSPOT = { x: 630, y: 214 };

// 2-left / 2-right, symmetric around the tooth's vertical axis of attention.
const chipAnchors = [
  { x: 150, y: 150 },
  { x: 850, y: 150 },
  { x: 150, y: 330 },
  { x: 850, y: 330 },
];

const pct = (x: number, y: number) => ({
  left: `${(x / VIEW_W) * 100}%`,
  top: `${(y / VIEW_H) * 100}%`,
});

export default function Hero() {
  const { t } = useLocale();

  const stageRef = useRef<HTMLDivElement>(null);
  const hotspotRef = useRef<HTMLButtonElement>(null);

  const chips = [
    { slug: "cosmetic-dentistry", name: t.services.items[0].name },
    { slug: "dental-oral-surgery", name: t.services.items[1].name },
    { slug: "botox-fillers", name: t.services.items[2].name },
    { slug: "veneers-implants", name: t.services.items[3].name },
  ];

  /* ---------------------------------------------------------------- */
  /* One orchestrated entrance: lines draw → chips settle → hotspot   */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const chipEls = stage.querySelectorAll<HTMLElement>("[data-chip]");
    const lineEls = stage.querySelectorAll<SVGLineElement>("[data-line]");
    const hotspot = stage.querySelector<HTMLElement>("[data-hotspot]");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set([...chipEls, ...lineEls, hotspot], { clearProps: "all", opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      lineEls.forEach((l) => {
        const len = l.getTotalLength();
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      });

      gsap
        .timeline({ delay: 0.55, defaults: { ease: "power3.out" } })
        .fromTo(hotspot, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5 })
        .to(lineEls, { strokeDashoffset: 0, duration: 0.7, stagger: 0.08 }, "-=0.1")
        .fromTo(
          chipEls,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.5"
        );
    }, stage);

    return () => ctx.revert();
  }, []);

  /* ---------------------------------------------------------------- */
  /* Hotspot → planner                                                */
  /* ---------------------------------------------------------------- */
  const handleHotspot = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion && stageRef.current) {
      const chipEls = stageRef.current.querySelectorAll<HTMLElement>("[data-chip]");
      gsap.fromTo(
        chipEls,
        { scale: 1 },
        { scale: 1.05, duration: 0.18, stagger: 0.04, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }

    window.setTimeout(
      () => {
        document.getElementById("plan")?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      },
      reduceMotion ? 0 : 300
    );
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-16 md:px-10 md:pt-32">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        {/* ------------------------------ Copy ------------------------------ */}
        <Reveal className="order-2 text-center lg:order-1 lg:text-start">
          <h1 className="font-display text-hero text-balance text-white">{t.doctor.tagline}</h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-[1.7] text-white/80 lg:mx-0 lg:text-[17px]">
            {t.doctor.bio}
          </p>

          <div className="mt-9 flex flex-col items-center gap-5 lg:items-start">
            <a
              href={doctor.whatsappHref}
              className="tap-target inline-flex items-center rounded-full bg-white px-9 text-base font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t.hero.ctaBook}
            </a>

            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/60">
                <Image
                  src="/photos/dr-bushra.jpg"
                  alt={doctor.fullName}
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="text-start">
                <p className="text-sm font-semibold leading-tight text-white">{doctor.fullName}</p>
                <p className="mt-0.5 text-xs leading-tight text-white/70">{t.doctor.title}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------ Stage ----------------------------- */}
        <Reveal delay={0.1} className="order-1 w-full lg:order-2">
          <div
            ref={stageRef}
            className="relative mx-auto aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-[28px] bg-white/5 shadow-[0_40px_80px_-30px_rgba(0,20,60,0.55)] ring-1 ring-white/20 lg:max-w-none"
          >
            {/* Native 16:9 photo in a 16:9 box: no zoom, no crop, no resampling blur. */}
            <Image
              src="/hero/dentist-tooth.webp"
              alt={doctor.fullName}
              fill
              priority
              quality={95}
              className="object-cover object-center"
              sizes="(min-width: 1400px) 780px, (min-width: 1024px) 56vw, 100vw"
            />

            {/* Soft edge vignette so chips stay legible on any part of the photo. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,20,60,0.28)_100%)]"
            />

            {/* Leader lines: chip → tooth (desktop only) */}
            <svg
              aria-hidden
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            >
              {chipAnchors.map((a, i) => (
                <line
                  key={i}
                  data-line
                  x1={a.x}
                  y1={a.y}
                  x2={HOTSPOT.x}
                  y2={HOTSPOT.y}
                  stroke="white"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{ opacity: 0 }}
                />
              ))}
            </svg>

            {/* Hotspot */}
            <button
              ref={hotspotRef}
              data-hotspot
              type="button"
              onClick={handleHotspot}
              aria-label={t.planner.heading}
              style={{ ...pct(HOTSPOT.x, HOTSPOT.y), opacity: 0 }}
              className="tap-target animate-pulse-ring absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.25)]" />
            </button>

            {/* Service callouts (desktop) */}
            {chips.map((chip, i) => (
              <a
                key={chip.slug}
                data-chip
                href="#services"
                style={{ ...pct(chipAnchors[i].x, chipAnchors[i].y), opacity: 0 }}
                className="glass-chip-strong absolute z-10 hidden w-[132px] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl px-2.5 py-2 transition-colors duration-200 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex"
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
                    aria-hidden
                  >
                    {icons[chip.slug]}
                  </svg>
                </span>
                <span className="text-start text-xs leading-tight font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
                  {chip.name}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* ------------------- Mobile: services as 2x2 --------------------- */}
        <ul className="order-3 grid grid-cols-2 gap-3 md:hidden lg:col-span-2">
          {chips.map((chip) => (
            <li key={chip.slug}>
              <a
                href="#services"
                className="glass-chip-strong flex items-center gap-2.5 rounded-xl px-3 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {icons[chip.slug]}
                  </svg>
                </span>
                <span className="text-start text-xs leading-tight font-medium text-white">
                  {chip.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}