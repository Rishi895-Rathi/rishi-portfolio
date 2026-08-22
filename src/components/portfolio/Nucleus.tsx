import { rings, ATOM_SIZE, type Ring } from "./data";

const C = ATOM_SIZE / 2;

function ellipsePath(rx: number, ry: number) {
  return `M ${C - rx},${C} a ${rx},${ry} 0 1,0 ${rx * 2},0 a ${rx},${ry} 0 1,0 ${-rx * 2},0`;
}

function OrbitRing({ ring }: { ring: Ring }) {
  const path = ellipsePath(ring.rx, ring.ry);
  return (
    <div
      className="atom-ring"
      style={{ "--tilt": `${ring.tilt}deg` } as React.CSSProperties}
      aria-label={ring.label}
    >
      <svg
        className="pointer-events-none absolute inset-0"
        viewBox={`0 0 ${ATOM_SIZE} ${ATOM_SIZE}`}
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <ellipse
          cx={C}
          cy={C}
          rx={ring.rx}
          ry={ring.ry}
          fill="none"
          stroke="currentColor"
          strokeWidth={ring.dim ? 1 : 1.25}
          strokeDasharray={ring.dim ? "6 8" : undefined}
          className={ring.dim ? "text-primary/25" : "text-primary/40"}
        />
      </svg>

      {ring.skills.map((skill, i) => (
        <div
          key={skill}
          className="electron"
          style={
            {
              "--path": `path("${path}")`,
              "--dur": `${ring.duration}s`,
              "--dir": ring.reverse ? "reverse" : "normal",
              "--delay": `${-(ring.duration / ring.skills.length) * i}s`,
            } as React.CSSProperties
          }
        >
          <div className="electron-label group">
            <span
              tabIndex={0}
              className={[
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap backdrop-blur-sm transition outline-none",
                ring.dim
                  ? "border-dashed border-primary/30 bg-surface/70 text-muted-foreground"
                  : "border-primary/35 bg-surface/85 text-foreground/90",
                "hover:border-primary hover:text-primary hover:shadow-[var(--glow-soft)] focus-visible:border-primary",
              ].join(" ")}
            >
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full",
                  ring.dim ? "bg-muted-foreground/60" : "bg-primary shadow-[var(--glow-soft)]",
                ].join(" ")}
              />
              {skill}
            </span>
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md border border-border bg-popover px-2 py-1 text-[10px] whitespace-nowrap text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              {skill}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Nucleus() {
  return (
    <div className="atom-viewport">
      <div className="atom-stage" style={{ width: ATOM_SIZE, height: ATOM_SIZE }}>
        {rings.map((ring) => (
          <OrbitRing key={ring.label} ring={ring} />
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="nucleus-core flex h-40 w-40 flex-col items-center justify-center rounded-full text-center">
            <span className="font-display text-3xl font-bold text-primary-foreground">Java</span>
            <span className="text-[10px] tracking-[0.3em] text-primary-foreground/70 uppercase">
              nucleus
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] tracking-widest text-muted-foreground uppercase">
        {rings.map((r) => (
          <span key={r.label} className="flex items-center gap-2">
            <span
              className={[
                "h-2 w-2 rounded-full",
                r.dim ? "bg-muted-foreground/50" : "bg-primary/70",
              ].join(" ")}
            />
            {r.label}
          </span>
        ))}
      </div>
    </div>
  );
}
