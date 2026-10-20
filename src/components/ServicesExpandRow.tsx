"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

type Item = { slug: string; image: string; name: string; description: string };

export default function ServicesExpandRow({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    items.forEach((_, i) => {
      const el = refs.current[i];
      const textEl = textRefs.current[i];
      if (!el) return;
      const isActive = i === active;

      if (reduceMotion) {
        el.style.flexBasis = isActive ? "40%" : `${60 / (items.length - 1)}%`;
        if (textEl) textEl.style.opacity = isActive ? "1" : "0";
        return;
      }

      gsap.to(el, {
        flexBasis: isActive ? "40%" : `${60 / (items.length - 1)}%`,
        duration: 0.6,
        ease: "power3.out",
      });
      if (textEl) {
        gsap.to(textEl, {
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 8,
          duration: 0.4,
          delay: isActive ? 0.15 : 0,
        });
      }
    });
  }, [active, items]);

  return (
    <div className="flex h-[26rem] gap-3">
      {items.map((item, i) => (
        <div
          key={item.slug}
          ref={(el) => {
            refs.current[i] = el;
          }}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
          role="button"
          tabIndex={0}
          style={{ flexBasis: `${60 / (items.length - 1)}%` }}
          className="glass-on-blue relative min-w-0 shrink-0 cursor-pointer overflow-hidden rounded-[28px]"
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover opacity-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h3 className="font-display text-lg text-white">{item.name}</h3>
            <div
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="opacity-0"
            >
              <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-white/80">
                {item.description}
              </p>
              <span className="rtl:rotate-180 mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                →
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
