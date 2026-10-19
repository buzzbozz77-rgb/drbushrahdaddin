"use client";

import { serviceSlugs } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="mx-auto max-w-[1200px] px-6 py-10">
      <Reveal>
        <h2 className="font-display text-heading-sm text-center text-foreground">
          {t.services.heading}
        </h2>
        <p className="text-body mx-auto mt-3 max-w-xl text-center text-muted">
          {t.services.subheading}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {serviceSlugs.map((slug, i) => {
          const item = t.services.items[i];
          return (
            <Reveal key={slug} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-surface p-6 shadow-elevation transition-transform hover:-translate-y-1">
                <h3 className="font-display text-subheading text-foreground">{item.name}</h3>
                <p className="text-body-sm mt-2 text-muted-strong">{item.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
