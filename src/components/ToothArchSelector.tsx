"use client";

// Tooth regions were calibrated against the real merged arch photo
// (public/arch/arch-merged.webp, composited from two real crystal-tooth
// renders via a lighten blend — see assets-src/hero-v3) using OpenCV
// contour detection, then hand-completed for the two front teeth the
// detector missed (verified against a debug overlay before shipping).
// The SVG viewBox matches the photo's own pixel space 1:1, so each region
// sits exactly over its real tooth with no offset.
const IMAGE_W = 1600;
const IMAGE_H = 1217;
const IMAGE_SRC = "/arch/arch-merged.webp";
const SELECT_COLOR = "#ffb020";

const UPPER_BOXES: [number, number, number, number][] = [
  [77, 280, 64, 195],
  [137, 294, 82, 212],
  [281, 334, 116, 247],
  [432, 351, 106, 244],
  [538, 335, 261, 250],
  [799, 335, 261, 250],
  [1060, 350, 106, 247],
  [1208, 332, 109, 253],
  [1382, 307, 74, 198],
];

const LOWER_BOXES: [number, number, number, number][] = [
  [108, 718, 85, 165],
  [198, 652, 105, 184],
  [322, 591, 116, 241],
  [483, 604, 128, 197],
  [648, 569, 139, 227],
  [821, 569, 140, 227],
  [997, 607, 122, 194],
  [1162, 591, 116, 241],
  [1287, 653, 117, 181],
  [1404, 717, 82, 194],
];

export type ToothId = `${"upper" | "lower"}-${number}`;

export default function ToothArchSelector({
  selected,
  onToggle,
  toothLabel,
}: {
  selected: Set<ToothId>;
  onToggle: (id: ToothId) => void;
  toothLabel: (id: ToothId) => string;
}) {
  const arches: { arch: "upper" | "lower"; boxes: typeof UPPER_BOXES }[] = [
    { arch: "upper", boxes: UPPER_BOXES },
    { arch: "lower", boxes: LOWER_BOXES },
  ];

  return (
    <svg
      viewBox={`0 0 ${IMAGE_W} ${IMAGE_H}`}
      className="h-full w-full"
      style={{ aspectRatio: `${IMAGE_W} / ${IMAGE_H}` }}
      role="group"
      aria-label="Tooth selector"
    >
      {/* Shared real photo — always visible underneath, undistorted */}
      <image href={IMAGE_SRC} x={0} y={0} width={IMAGE_W} height={IMAGE_H} pointerEvents="none" />

      {arches.map(({ arch, boxes }) =>
        boxes.map(([x, y, w, h], i) => {
          const id = `${arch}-${i}` as ToothId;
          const isSelected = selected.has(id);
          const rx = w * 0.3;
          const cx = x + w / 2;
          const cy = y + h / 2;
          const badgeR = Math.min(w, h) * 0.18;

          return (
            <g key={id}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={rx}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={toothLabel(id)}
                className="group cursor-pointer outline-none"
                fill={isSelected ? "rgba(255,176,32,0.38)" : "rgba(255,255,255,0.001)"}
                stroke={isSelected ? SELECT_COLOR : "rgba(255,255,255,0.45)"}
                strokeWidth={isSelected ? 6 : 1.5}
                style={{
                  filter: isSelected
                    ? `drop-shadow(0 0 10px ${SELECT_COLOR}) drop-shadow(0 0 20px ${SELECT_COLOR})`
                    : "none",
                  transition:
                    "filter 0.2s ease, fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease",
                }}
                onClick={() => onToggle(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle(id);
                  }
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.stroke = SELECT_COLOR;
                    e.currentTarget.style.strokeWidth = "3";
                    e.currentTarget.style.filter = `drop-shadow(0 0 8px ${SELECT_COLOR})`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.stroke = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.strokeWidth = "1.5";
                    e.currentTarget.style.filter = "none";
                  }
                }}
              />
              {isSelected && (
                <g pointerEvents="none">
                  <circle cx={cx} cy={cy} r={badgeR} fill={SELECT_COLOR} stroke="white" strokeWidth={2} />
                  <path
                    d={`M ${cx - badgeR * 0.5} ${cy} l ${badgeR * 0.3} ${badgeR * 0.35} l ${badgeR * 0.55} -${badgeR * 0.6}`}
                    stroke="white"
                    strokeWidth={badgeR * 0.22}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}
