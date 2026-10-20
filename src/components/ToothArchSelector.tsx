"use client";

// Tooth regions were calibrated against the real arch photo
// (assets-src/crystal-renders/full-smile-arch.jpg, 1600x900) using OpenCV
// contour detection on the lower row, mirrored to the upper row. The SVG
// viewBox matches the photo's own pixel space 1:1, so each region sits
// exactly over its real tooth with no offset.
const IMAGE_W = 1600;
const IMAGE_H = 900;
const IMAGE_SRC = "/services/full-smile-arch.webp";
const SELECT_COLOR = "#ffb020";

const LOWER_BOXES: [number, number, number, number][] = [
  [317, 491, 86, 134],
  [411, 491, 91, 178],
  [527, 510, 113, 165],
  [659, 508, 129, 179],
  [811, 509, 131, 178],
  [948, 510, 122, 155],
  [1096, 486, 95, 183],
  [1201, 493, 90, 131],
  [1309, 540, 90, 145],
];

const UPPER_BOXES: [number, number, number, number][] = LOWER_BOXES.map(
  ([x, , w]) => [x, 258, w, 195]
);

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
  const arches: { arch: "upper" | "lower"; boxes: typeof LOWER_BOXES }[] = [
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
          const badgeR = Math.min(w, h) * 0.22;

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
