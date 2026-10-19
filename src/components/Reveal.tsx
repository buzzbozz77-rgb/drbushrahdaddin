"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Safety net: web fonts finishing load after mount can shift layout and
    // invalidate ScrollTrigger's cached offsets. Never leave content stuck
    // invisible — force it in if the trigger hasn't fired within 2s.
    const safety = window.setTimeout(() => {
      if (gsap.getProperty(el, "opacity") === 0) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.4 });
      }
    }, 2000);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            once: true,
          },
        }
      );
    }, el);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
