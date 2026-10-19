import Image from "next/image";
import { gallery } from "@/lib/content";

const PLACEHOLDER_SLOTS = 6;

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif text-3xl text-foreground">Case gallery</h2>
      <p className="mt-3 max-w-xl text-muted">
        Real results, real patients. This section fills in as case photos are
        added.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {gallery.length === 0
          ? Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl border border-dashed border-border bg-surface"
              />
            ))
          : gallery.map((item) => (
              <div
                key={item.src}
                className="relative aspect-square overflow-hidden rounded-2xl bg-surface"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 33vw, 50vw"
                />
              </div>
            ))}
      </div>
    </section>
  );
}
