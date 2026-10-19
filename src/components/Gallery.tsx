"use client";

import Image from "next/image";
import { gallery } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

const PLACEHOLDER_SLOTS = 6;

export default function Gallery() {
  const { t } = useLocale();

  return (
    <section id="gallery" className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="font-serif text-heading text-foreground">{t.gallery.heading}</h2>
        <p className="mt-3 max-w-xl text-muted">{t.gallery.subheading}</p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {gallery.length === 0
          ? Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="hairline aspect-square rounded-xl border border-dashed" />
              </Reveal>
            ))
          : gallery.map((item, i) => (
              <Reveal key={item.src} delay={i * 0.05}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 50vw"
                  />
                </div>
              </Reveal>
            ))}
      </div>
    </section>
  );
}
