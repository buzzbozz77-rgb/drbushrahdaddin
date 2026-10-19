"use client";

import { statsTODO } from "@/lib/config.todo";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

// Not rendered on the page until src/lib/config.todo.ts has real values —
// see the TODO comment there. Import and drop <StatsStrip /> into page.tsx
// once Dr. Bushra confirms real numbers.
export default function StatsStrip() {
  const { locale } = useLocale();
  const entries = statsTODO.filter((s) => s.value !== null);
  if (entries.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="grid grid-cols-3 gap-4 text-center">
        {entries.map((stat) => (
          <Reveal key={stat.labelEn}>
            <div className="font-display text-heading text-foreground">{stat.value}</div>
            <div className="mt-1 text-sm text-muted-soft">
              {locale === "ar" ? stat.labelAr : stat.labelEn}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
