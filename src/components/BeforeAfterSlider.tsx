"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair } from "@/lib/content";

const STEP = 15;

export default function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const step = (delta: number) => {
    setPosition((prev) => Math.min(100, Math.max(0, prev + delta)));
  };

  return (
    <div
      ref={trackRef}
      className="relative mx-auto w-full touch-none select-none overflow-hidden rounded-2xl"
      style={{ aspectRatio: `${pair.width} / ${pair.height}`, maxWidth: pair.width }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
    >
      <Image src={pair.after} alt={pair.altAfter} fill className="object-cover" sizes="100vw" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={pair.before} alt={pair.altBefore} fill className="object-cover" sizes="100vw" />
      </div>

      <div
        className="absolute inset-y-0 w-0.5 bg-white"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
          ↔
        </div>
      </div>

      <button
        type="button"
        aria-label="Reveal more before"
        onClick={(e) => {
          e.stopPropagation();
          step(-STEP);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-ink shadow-md transition-colors hover:bg-white"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Reveal more after"
        onClick={(e) => {
          e.stopPropagation();
          step(STEP);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-ink shadow-md transition-colors hover:bg-white"
      >
        ›
      </button>
    </div>
  );
}
