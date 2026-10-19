"use client";

import { serviceSlugs } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-serif text-3xl text-foreground">{t.services.heading}</h2>
          <p className="mt-3 max-w-xl text-muted">{t.services.subheading}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {serviceSlugs.map((slug, i) => {
            const item = t.services.items[i];
            return (
              <Reveal key={slug} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <h3 className="font-serif text-xl text-foreground">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
