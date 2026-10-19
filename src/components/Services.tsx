import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-serif text-3xl text-foreground">Services</h2>
        <p className="mt-3 max-w-xl text-muted">
          A focused set of cosmetic, surgical, and aesthetic treatments — each
          planned around your individual facial structure and goals.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-lg hover:shadow-primary/10"
            >
              <h3 className="font-serif text-xl text-foreground">{service.name}</h3>
              <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
