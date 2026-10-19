"use client";

import { testimonials } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

function Star() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="var(--color-verified-green)" aria-hidden>
      <path d="M10 1.5l2.47 5.4 5.93.62-4.47 4.02 1.3 5.86L10 14.6l-5.23 2.8 1.3-5.86L1.6 7.52l5.93-.62L10 1.5z" />
    </svg>
  );
}

export default function Testimonials() {
  const { t } = useLocale();

  return (
    <section id="testimonials" className="mx-auto max-w-[1200px] px-6 py-10">
      <Reveal>
        <h2 className="font-display text-heading-sm text-center text-foreground">
          {t.testimonials.heading}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <figure className="h-full rounded-3xl bg-surface p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <span className="text-caption font-medium" style={{ color: "var(--color-verified-green)" }}>
                  {t.testimonials.verified}
                </span>
              </div>

              <blockquote
                dir={testimonial.lang === "ar" ? "rtl" : "ltr"}
                className={`text-body-sm mt-4 text-body-ink ${
                  testimonial.lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
