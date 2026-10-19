"use client";

import { testimonials } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  const { t } = useLocale();

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="font-serif text-3xl text-foreground">{t.testimonials.heading}</h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <figure className="h-full rounded-2xl border border-border bg-surface p-6">
              <blockquote
                dir={testimonial.lang === "ar" ? "rtl" : "ltr"}
                className={`text-sm leading-relaxed text-foreground ${
                  testimonial.lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              {testimonial.author && (
                <figcaption className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
                  {testimonial.author}
                </figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
