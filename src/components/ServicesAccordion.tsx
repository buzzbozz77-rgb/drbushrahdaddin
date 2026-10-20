"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

type Item = { slug: string; image: string; name: string; description: string };

export default function ServicesAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    items.forEach((_, i) => {
      const panel = panelRefs.current[i];
      if (!panel) return;
      const isOpen = i === open;
      const targetHeight = isOpen ? panel.scrollHeight : 0;

      if (reduceMotion) {
        panel.style.height = `${targetHeight}px`;
        return;
      }
      gsap.to(panel, { height: targetHeight, duration: 0.45, ease: "power2.out" });
    });
  }, [open, items]);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={item.slug} className="glass-on-blue relative overflow-hidden rounded-3xl">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="tap-target relative flex w-full items-center justify-between px-5 py-4 text-left rtl:text-right"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base text-white">{item.name}</span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>

            <div
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="relative overflow-hidden"
              style={{ height: 0 }}
            >
              <p className="px-5 pb-5 text-sm leading-relaxed text-white/80">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
