"use client";

import { serviceSlugs } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="hairline border-t bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="font-serif text-heading text-foreground">{t.services.heading}</h2>
          <p className="mt-3 max-w-xl text-muted">{t.services.subheading}</p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2" style={{ background: "var(--border)" }}>
          {serviceSlugs.map((slug, i) => {
            const item = t.services.items[i];
            return (
              <Reveal key={slug} delay={i * 0.06} className="bg-surface p-8">
                <h3 className="font-serif text-subheading text-foreground">{item.name}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
