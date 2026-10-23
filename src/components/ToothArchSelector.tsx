"use client";

import { useState } from "react";

// Tooth polygons were hand-digitized against the real full-arch photo
// (public/arch/arch-full.jpg — a single correct, un-merged render with a
// correct bite) by reading pixel coordinates off a gridded overlay of the
// photo and verifying the result against a debug overlay before shipping.
// The SVG viewBox matches the photo's own pixel space 1:1, so each polygon
// sits directly over its real tooth with no offset.
const IMAGE_W = 1600;
const IMAGE_H = 900;
const IMAGE_SRC = "/arch/arch-full.jpg";
const SELECT_COLOR = "#ffb020";
// Sampled directly from the photo's background (averaged corner pixels).
const BG_COLOR = "#0130b2";

export const UPPER_TEETH: [number, number][][] = [
  [[145, 245], [195, 205], [195, 320.0], [145, 320.0]],
  [[195, 205], [290, 178], [290, 346.5], [195, 346.5]],
  [[290, 178], [395, 162], [395, 360.0], [290, 360.0]],
  [[395, 162], [495, 170], [495, 391.0], [445.0, 409.0], [395, 391.0]],
  [[495, 170], [590, 202], [590, 421.0], [495, 421.0]],
  [[590, 202], [800, 210], [800, 481.0], [590, 481.0]],
  [[800, 210], [1010, 202], [1010, 481.0], [800, 481.0]],
  [[1010, 202], [1100, 170], [1100, 421.0], [1010, 421.0]],
  [[1100, 170], [1200, 162], [1200, 391.0], [1150.0, 409.0], [1100, 391.0]],
  [[1200, 162], [1300, 178], [1300, 360.0], [1200, 360.0]],
  [[1300, 178], [1400, 205], [1400, 346.5], [1300, 346.5]],
  [[1400, 205], [1450, 245], [1450, 320.0], [1400, 320.0]],
];

export const LOWER_TEETH: [number, number][][] = [
  [[145, 707.8], [195, 707.8], [195, 789.8], [145, 815.8]],
  [[195, 626.0], [290, 626.0], [290, 772.2], [195, 789.8]],
  [[290, 577.0], [395, 577.0], [395, 761.8], [290, 772.2]],
  [[445.0, 521.4], [495, 539.4], [495, 767.0], [395, 761.8], [395, 539.4]],
  [[495, 542.4], [590, 542.4], [590, 787.8], [495, 767.0]],
  [[590, 515.4], [800, 515.4], [800, 793.0], [590, 787.8]],
  [[800, 515.4], [1010, 515.4], [1010, 787.8], [800, 793.0]],
  [[1010, 542.4], [1100, 542.4], [1100, 767.0], [1010, 787.8]],
  [[1150.0, 521.4], [1200, 539.4], [1200, 761.8], [1100, 767.0], [1100, 539.4]],
  [[1200, 577.0], [1300, 577.0], [1300, 772.2], [1200, 761.8]],
  [[1300, 626.0], [1400, 626.0], [1400, 789.8], [1300, 772.2]],
  [[1400, 707.8], [1450, 707.8], [1450, 815.8], [1400, 789.8]],
];

export type ToothId = `${"upper" | "lower"}-${number}`;

type Tooth = {
  id: ToothId;
  points: string;
  cx: number;
  cy: number;
  minY: number;
  maxY: number;
  arch: "upper" | "lower";
};

const TEETH: Tooth[] = (
  [
    ["upper", UPPER_TEETH],
    ["lower", LOWER_TEETH],
  ] as const
).flatMap(([arch, teeth]) =>
  teeth.map((pts, i) => {
    const ys = pts.map(([, y]) => y);
    return {
      id: `${arch}-${i}` as ToothId,
      arch,
      points: pts.map(([x, y]) => `${x},${y}`).join(" "),
      cx: pts.reduce((s, [x]) => s + x, 0) / pts.length,
      cy: pts.reduce((s, [, y]) => s + y, 0) / pts.length,
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  })
);

export default function ToothArchSelector({
  selected,
  onToggle,
  onClear,
  toothLabel,
  countLabel,
  clearLabel,
  hintLabel,
}: {
  selected: Set<ToothId>;
  onToggle: (id: ToothId) => void;
  onClear: () => void;
  toothLabel: (id: ToothId) => string;
  countLabel: (n: number) => string;
  clearLabel: string;
  hintLabel: string;
}) {
  // The tooth under the pointer / keyboard focus. Drives the floating name
  // label, so people see *which* tooth they're about to pick before tapping.
  const [active, setActive] = useState<ToothId | null>(null);
  const activeTooth = TEETH.find((t) => t.id === active) ?? null;

  // Upper-arch labels sit just below the tooth, lower-arch labels just above
  // it — both land in the bite gap, never off the top/bottom of the photo.
  const labelY = activeTooth
    ? activeTooth.arch === "upper"
      ? activeTooth.maxY + 18
      : activeTooth.minY - 18
    : 0;

  return (
    <div>
      <div className="relative overflow-hidden rounded-[20px]" style={{ backgroundColor: BG_COLOR }}>
        <svg
          viewBox={`0 0 ${IMAGE_W} ${IMAGE_H}`}
          className="block h-full w-full touch-manipulation select-none"
          style={{ aspectRatio: `${IMAGE_W} / ${IMAGE_H}` }}
          role="group"
          aria-label={hintLabel}
        >
          <defs>
            {/* Feathers the photo's own edges into the solid, color-matched
                background behind it, so there is no visible seam/box. */}
            <radialGradient id="arch-feather" cx="50%" cy="50%" r="62%">
              <stop offset="78%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="arch-feather-mask">
              <rect x={0} y={0} width={IMAGE_W} height={IMAGE_H} fill="url(#arch-feather)" />
            </mask>
          </defs>

          <image
            href={IMAGE_SRC}
            x={0}
            y={0}
            width={IMAGE_W}
            height={IMAGE_H}
            pointerEvents="none"
            mask="url(#arch-feather-mask)"
          />

          {TEETH.map((tooth) => {
            const isSelected = selected.has(tooth.id);
            const isActive = active === tooth.id;
            return (
              <g key={tooth.id}>
                <polygon
                  points={tooth.points}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={toothLabel(tooth.id)}
                  className={`cursor-pointer outline-none transition-[fill,stroke,stroke-width] duration-200 ${
                    isSelected ? "tooth-selected" : ""
                  }`}
                  fill={
                    isSelected
                      ? "rgba(255,176,32,0.34)"
                      : isActive
                        ? "rgba(255,255,255,0.14)"
                        : "rgba(255,255,255,0.001)"
                  }
                  stroke={isSelected || isActive ? SELECT_COLOR : "rgba(255,255,255,0.1)"}
                  strokeWidth={isSelected ? 5 : isActive ? 3.5 : 1.25}
                  strokeLinejoin="round"
                  onClick={() => onToggle(tooth.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onToggle(tooth.id);
                    }
                  }}
                  onPointerEnter={() => setActive(tooth.id)}
                  onPointerLeave={() => setActive((cur) => (cur === tooth.id ? null : cur))}
                  onFocus={() => setActive(tooth.id)}
                  onBlur={() => setActive((cur) => (cur === tooth.id ? null : cur))}
                />
                {isSelected && (
                  <g pointerEvents="none">
                    <circle cx={tooth.cx} cy={tooth.cy} r={17} fill={SELECT_COLOR} stroke="white" strokeWidth={3} />
                    <path
                      d={`M ${tooth.cx - 7} ${tooth.cy} l 4.5 5 l 9 -9.5`}
                      stroke="white"
                      strokeWidth={3.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {activeTooth && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold whitespace-nowrap text-ink shadow-[0_6px_18px_-6px_rgba(0,0,0,0.5)]"
            style={{
              left: `${Math.min(88, Math.max(12, (activeTooth.cx / IMAGE_W) * 100))}%`,
              top: `${(labelY / IMAGE_H) * 100}%`,
            }}
          >
            {toothLabel(activeTooth.id)}
          </div>
        )}
      </div>

      <div className="mt-3 flex min-h-9 items-center justify-between gap-3 px-1 text-xs">
        <span className="text-white/70" aria-live="polite">
          {selected.size > 0 ? countLabel(selected.size) : hintLabel}
        </span>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full border border-white/30 px-3 py-1.5 font-medium text-white/85 transition-colors hover:border-white/60 hover:text-white"
          >
            {clearLabel}
          </button>
        )}
      </div>
    </div>
  );
}
