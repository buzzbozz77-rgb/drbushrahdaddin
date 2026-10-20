"use client";

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

export default function ToothArchSelector({
  selected,
  onToggle,
  toothLabel,
}: {
  selected: Set<ToothId>;
  onToggle: (id: ToothId) => void;
  toothLabel: (id: ToothId) => string;
}) {
  const arches: { arch: "upper" | "lower"; teeth: typeof UPPER_TEETH }[] = [
    { arch: "upper", teeth: UPPER_TEETH },
    { arch: "lower", teeth: LOWER_TEETH },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-[20px]"
      style={{ backgroundColor: BG_COLOR }}
    >
      <svg
        viewBox={`0 0 ${IMAGE_W} ${IMAGE_H}`}
        className="h-full w-full"
        style={{ aspectRatio: `${IMAGE_W} / ${IMAGE_H}` }}
        role="group"
        aria-label="Tooth selector"
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

        {arches.map(({ arch, teeth }) =>
          teeth.map((points, i) => {
            const id = `${arch}-${i}` as ToothId;
            const isSelected = selected.has(id);
            const pointsAttr = points.map(([x, y]) => `${x},${y}`).join(" ");
            const cx = points.reduce((sum, [x]) => sum + x, 0) / points.length;
            const cy = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
            const badgeR = 26;

            return (
              <g key={id}>
                <polygon
                  points={pointsAttr}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={toothLabel(id)}
                  className="group cursor-pointer outline-none"
                  fill={isSelected ? "rgba(255,176,32,0.38)" : "rgba(255,255,255,0.001)"}
                  stroke={isSelected ? SELECT_COLOR : "rgba(255,255,255,0.4)"}
                  strokeWidth={isSelected ? 6 : 1.5}
                  strokeLinejoin="round"
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
                      e.currentTarget.style.stroke = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.strokeWidth = "1.5";
                      e.currentTarget.style.filter = "none";
                    }
                  }}
                />
                {isSelected && (
                  <g pointerEvents="none">
                    <circle cx={cx} cy={cy} r={badgeR} fill={SELECT_COLOR} stroke="white" strokeWidth={3} />
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
    </div>
  );
}
