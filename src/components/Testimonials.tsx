import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif text-3xl text-foreground">What patients say</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <figure
            key={index}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <blockquote
              dir={testimonial.lang === "ar" ? "rtl" : "ltr"}
              className={`text-sm leading-relaxed text-foreground ${
                testimonial.lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              “{testimonial.quote}”
            </blockquote>
            {testimonial.author && (
              <figcaption className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
                {testimonial.author}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
