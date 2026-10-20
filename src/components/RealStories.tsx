"use client";

import { testimonials, beforeAfterPairs } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function RealStories() {
  const { t } = useLocale();

  return (
    <section id="testimonials" className="scroll-mt-nav px-3 py-6 md:px-6 md:py-10">
      <div className="glass-on-blue mx-auto max-w-[1200px] rounded-[32px] px-6 py-14 md:rounded-[40px] md:px-12 md:py-20">
        <Reveal>
          <h2 className="font-display text-heading-lg text-center text-white">
            {t.stories.heading}
          </h2>
          <p className="mt-2 text-center text-white/70">{t.stories.subheading}</p>
        </Reveal>

        {testimonials.length === 0 ? (
          <p className="mt-12 text-center text-sm text-white/60">{t.stories.empty}</p>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
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
            <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
              {beforeAfterPairs.map((pair, i) => (
                <BeforeAfterSlider key={i} pair={pair} />
              ))}
            </div>
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
