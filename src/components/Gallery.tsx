"use client";

import Image from "next/image";
import { gallery } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

const PLACEHOLDER_SLOTS = 6;

export default function Gallery() {
  const { t } = useLocale();

  return (
    <section id="gallery" className="mx-auto max-w-[1200px] px-6 py-10">
      <Reveal>
        <h2 className="font-display text-heading-sm text-center text-foreground">
          {t.gallery.heading}
        </h2>
        <p className="text-body mx-auto mt-3 max-w-xl text-center text-muted">
          {t.gallery.subheading}
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {gallery.length === 0
          ? Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="aspect-square rounded-2xl border border-dashed border-border bg-surface" />
              </Reveal>
            ))
          : gallery.map((item, i) => (
              <Reveal key={item.src} delay={i * 0.05}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface shadow-elevation">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 50vw"
                  />
                </div>
              </Reveal>
            ))}
      </div>
    </section>
  );
}
