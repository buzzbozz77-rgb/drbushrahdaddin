"use client";

import { serviceSlugs } from "@/lib/content";
import { serviceDescriptions } from "@/config/services";
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
  const { locale, t } = useLocale();

  const items = serviceSlugs.map((slug, i) => {
    const desc = serviceDescriptions.find((d) => d.slug === slug);
    return {
      slug,
      image: images[slug],
      name: t.services.items[i].name,
      description: desc ? (locale === "ar" ? desc.descAr : desc.descEn) : "",
    };
  });

  return (
    <section id="services" className="scroll-mt-nav px-3 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <h2 className="font-display text-heading-lg text-center text-white">
            {t.services.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/70">
            {t.services.subheading}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 hidden lg:block">
          <ServicesExpandRow items={items} />
        </Reveal>

        <Reveal delay={0.1} className="mt-10 lg:hidden">
          <ServicesAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
