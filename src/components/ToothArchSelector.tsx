"use client";

const TEETH_PER_ARCH = 8;

function archPositions(arch: "upper" | "lower") {
  const positions: { x: number; y: number }[] = [];
  const baseY = arch === "upper" ? 55 : 175;
  const amp = arch === "upper" ? 18 : -18;
  const margin = 50;
  const width = 400 - margin * 2;

  for (let i = 0; i < TEETH_PER_ARCH; i++) {
    const u = i / (TEETH_PER_ARCH - 1);
    const x = margin + u * width;
    const y = baseY + amp * 4 * u * (1 - u);
    positions.push({ x, y });
  }
  return positions;
}

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
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" role="group" aria-label="Tooth selector">
      <defs>
        <linearGradient id="tooth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(190,215,255,0.45)" />
        </linearGradient>
        <linearGradient id="tooth-fill-selected" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#bcd4ff" />
        </linearGradient>
      </defs>

      {(["upper", "lower"] as const).map((arch) =>
        archPositions(arch).map((pos, i) => {
          const id = `${arch}-${i}` as ToothId;
          const isSelected = selected.has(id);
          const h = 40;
          const w = 28;

          return (
            <g
              key={id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={toothLabel(id)}
              className="cursor-pointer outline-none"
              onClick={() => onToggle(id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle(id);
                }
              }}
            >
              <rect
                x={pos.x - w / 2}
                y={arch === "upper" ? pos.y : pos.y - h}
                width={w}
                height={h}
                rx={10}
                fill={isSelected ? "url(#tooth-fill-selected)" : "url(#tooth-fill)"}
                stroke={isSelected ? "#ffffff" : "rgba(255,255,255,0.35)"}
                strokeWidth={isSelected ? 2 : 1}
                style={{
                  filter: isSelected
                    ? "drop-shadow(0 0 10px rgba(255,255,255,0.85))"
                    : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                  transition: "filter 0.25s ease, fill 0.25s ease",
                }}
                className="hover:[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.6))]"
              />
            </g>
          );
        })
      )}
    </svg>
  );
}
