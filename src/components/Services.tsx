"use client";

import { serviceSlugs } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";
import ServicesExpandRow from "@/components/ServicesExpandRow";
import ServicesAccordion from "@/components/ServicesAccordion";

const images: Record<(typeof serviceSlugs)[number], string> = {
  "cosmetic-dentistry": "/services/whitening-glow.webp",
  "dental-oral-surgery": "/services/tooth-molar.webp",
  "botox-fillers": "/services/droplet.webp",
  "veneers-implants": "/services/full-smile-arch.webp",
};

export default function Services() {
  const { t } = useLocale();

  const items = serviceSlugs.map((slug, i) => ({
    slug,
    image: images[slug],
    name: t.services.items[i].name,
    description: t.services.items[i].description,
  }));

  return (
    <section id="services" className="mx-auto max-w-[1320px] px-3 py-10 md:px-6 md:py-16">
      <Reveal>
        <h2 className="font-display text-heading-lg text-center text-foreground">
          {t.services.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">{t.services.subheading}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 hidden lg:block">
        <ServicesExpandRow items={items} />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 lg:hidden">
        <ServicesAccordion items={items} />
      </Reveal>
    </section>
  );
}
