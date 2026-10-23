"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair } from "@/lib/content";

// Display cap in px — close to the source photo's native width so it stays sharp.
const MAX_WIDTH = 640;

export default function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const displayWidth = Math.min(pair.width, MAX_WIDTH);

  const updateFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label={`${pair.altBefore} / ${pair.altAfter}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={onKeyDown}
      className="relative mx-auto w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,20,60,0.5)] ring-1 ring-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      style={{
        aspectRatio: `${pair.width} / ${pair.height}`,
        maxWidth: displayWidth,
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {/* Both images are requested at the real display size, so Next serves
          small, sharp files instead of full-viewport ones. */}
      <Image
        src={pair.after}
        alt={pair.altAfter}
        fill
        quality={90}
        draggable={false}
        className="object-cover"
        sizes={`(max-width: ${displayWidth}px) 100vw, ${displayWidth}px`}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={pair.before}
          alt={pair.altBefore}
          fill
          quality={90}
          draggable={false}
          className="object-cover"
          sizes={`(max-width: ${displayWidth}px) 100vw, ${displayWidth}px`}
        />
      </div>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.15)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_14px_rgba(0,0,0,0.3)]">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9 7l-5 5 5 5" />
            <path d="M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}