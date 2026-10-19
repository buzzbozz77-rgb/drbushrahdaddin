import Image from "next/image";
import { doctor, stats } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/60 via-background to-background" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-dark">
            {doctor.title}
          </p>
          <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
            {doctor.tagline}
          </h1>
          <p className="mt-6 max-w-md text-muted">{doctor.bio}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={doctor.whatsappHref}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Book a consultation
            </a>
            <a
              href={doctor.mapsHref}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              {doctor.location}
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-2xl text-foreground">{stat.value}</dd>
                <dd className="mt-1 text-xs text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-surface shadow-xl shadow-primary/10">
          <Image
            src={doctor.portrait}
            alt={doctor.fullName}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 24rem, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
