"use client";

import { useState } from "react";
import { testimonials, beforeAfterPairs } from "@/lib/content";
import { serviceOptions } from "@/config/services";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function RealStories() {
  const { locale, t } = useLocale();
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [{ slug: "all", label: t.stories.tabAll }, ...serviceOptions.map((s) => ({
    slug: s.slug,
    label: locale === "ar" ? s.labelAr : s.labelEn,
  }))];

  const filtered =
    activeTab === "all" ? testimonials : testimonials.filter((s) => s.category === activeTab);

  return (
    <section id="testimonials" className="hairline border-t bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="font-display text-heading-lg text-center text-foreground">
            {t.stories.heading}
          </h2>
          <p className="mt-2 text-center text-muted">{t.stories.subheading}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActiveTab(tab.slug)}
              className={`tap-target rounded-full border px-4 text-sm font-medium transition-colors ${
                activeTab === tab.slug
                  ? "border-ink bg-ink text-white"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-soft">{t.stories.empty}</p>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {filtered.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.08} className="h-full">
                <figure className="hairline flex h-full flex-col justify-between rounded-2xl border p-7">
                  <blockquote
                    dir={testimonial.lang === "ar" ? "rtl" : "ltr"}
                    className={`text-base leading-relaxed text-foreground ${
                      testimonial.lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  {testimonial.author && (
                    <figcaption className="mt-6 text-xs font-medium uppercase tracking-wide text-muted-soft">
                      {testimonial.author}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.15} className="mt-16">
          {beforeAfterPairs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {beforeAfterPairs.map((pair, i) => (
                <BeforeAfterSlider key={i} pair={pair} />
              ))}
            </div>
          ) : (
            <div className="hairline flex aspect-[21/9] items-center justify-center rounded-2xl border border-dashed">
              <p className="max-w-sm text-center text-sm text-muted-soft">
                {t.stories.beforeAfterPlaceholder}
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
