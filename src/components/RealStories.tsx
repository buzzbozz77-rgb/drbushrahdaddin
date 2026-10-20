"use client";

import { useState } from "react";
import Image from "next/image";
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
    <section id="testimonials" className="scroll-mt-nav px-3 py-6 md:px-6 md:py-10">
      <div className="glass-on-blue mx-auto max-w-[1200px] rounded-[32px] px-6 py-14 md:rounded-[40px] md:px-12 md:py-20">
        <Reveal>
          <h2 className="font-display text-heading-lg text-center text-white">
            {t.stories.heading}
          </h2>
          <p className="mt-2 text-center text-white/70">{t.stories.subheading}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActiveTab(tab.slug)}
              className={`tap-target rounded-full border px-4 text-sm font-medium transition-colors ${
                activeTab === tab.slug
                  ? "border-white bg-white text-ink"
                  : "border-white/30 text-white/70 hover:border-white/60 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-white/60">{t.stories.empty}</p>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {filtered.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.08} className="h-full">
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-7">
                  <blockquote
                    dir={testimonial.lang === "ar" ? "rtl" : "ltr"}
                    className={`text-base leading-relaxed text-white/90 ${
                      testimonial.lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  {testimonial.author && (
                    <figcaption className="mt-6 text-xs font-medium uppercase tracking-wide text-white/50">
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
            <>
              <BeforeAfterSlider pair={beforeAfterPairs[0]} />

              {beforeAfterPairs.length > 1 && (
                <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-3">
                  {beforeAfterPairs.slice(1).map((pair, i) => (
                    <div key={i} className="flex overflow-hidden rounded-xl border border-white/15">
                      <div className="relative h-20 w-16">
                        <Image src={pair.before} alt={pair.altBefore} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="relative h-20 w-16">
                        <Image src={pair.after} alt={pair.altAfter} fill className="object-cover" sizes="64px" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="mx-auto flex aspect-[4/3] max-w-md items-center justify-center rounded-2xl border border-dashed border-white/25">
              <p className="max-w-sm text-center text-sm text-white/60">
                {t.stories.beforeAfterPlaceholder}
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
