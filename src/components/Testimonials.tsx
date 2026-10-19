"use client";

import { testimonials } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  const { t } = useLocale();

  return (
    <section id="testimonials" className="hairline border-t bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="font-serif text-heading text-foreground">{t.testimonials.heading}</h2>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 0.08} className="h-full">
              <figure className="hairline flex h-full flex-col justify-between rounded-2xl border p-7">
                <blockquote
                  dir={testimonial.lang === "ar" ? "rtl" : "ltr"}
                  className={`text-base leading-relaxed text-foreground ${
                    testimonial.lang === "ar" ? "text-right font-serif" : "text-left"
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
      </div>
    </section>
  );
}
