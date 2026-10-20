"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/config/stats";
import { useLocale } from "@/components/LocaleProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(counter.val)}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <div>
      <div ref={ref} className="font-display text-heading text-white">
        0{suffix}
      </div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}

export default function CountStats() {
  const { locale } = useLocale();
  const entries = stats.filter((s): s is typeof s & { value: number } => s.value !== null);
  if (entries.length === 0) return null;

  return (
    <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 sm:grid-cols-4">
      {entries.map((stat) => (
        <StatCounter
          key={stat.id}
          value={stat.value}
          suffix={stat.suffix}
          label={locale === "ar" ? stat.labelAr : stat.labelEn}
        />
      ))}
    </div>
  );
}
