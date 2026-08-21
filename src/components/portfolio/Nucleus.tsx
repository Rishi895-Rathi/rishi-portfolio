import { rings } from "./data";

function Node({
  skill,
  angle,
  radius,
  duration,
  reverse,
  dim,
}: {
  skill: string;
  angle: number;
  radius: number;
  duration: number;
  reverse?: boolean | undefined;
  dim?: boolean | undefined;
}) {
  return (
    <div
      className="orbit-node"
      style={
        {
          "--a": `${angle}deg`,
          "--r": `${radius}px`,
          "--dur": `${duration}s`,
          "--dir": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      <div className="orbit-node-inner group relative -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          className={[
            "cursor-default rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap backdrop-blur-sm transition",
            "focus:outline-none",
            dim
              ? "border-dashed border-border bg-surface/60 text-muted-foreground"
              : "border-border bg-surface/90 text-foreground/90",
            "hover:border-primary hover:text-primary hover:shadow-[var(--glow-soft)]",
          ].join(" ")}
        >
          {skill}
        </button>
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md border border-border bg-popover px-2 py-1 text-[10px] whitespace-nowrap text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {skill}
        </span>
      </div>
    </div>
  );
}

export function Nucleus() {
  return (
    <>
      {/* Desktop / tablet: animated orbits */}
      <div className="hidden h-[600px] items-center justify-center overflow-hidden md:flex lg:h-[840px]">
        <div className="orbit-stage relative h-[840px] w-[840px] scale-[0.68] lg:scale-100">
          {rings.map((ring) => (
            <div
              key={ring.label}
              className="orbit-ring"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                borderStyle: ring.dim ? "dashed" : "solid",
                opacity: ring.dim ? 0.5 : 1,
              }}
            >
              <div
                className="orbit-spinner"
                style={
                  {
                    "--dur": `${ring.duration}s`,
                    "--dir": ring.reverse ? "reverse" : "normal",
                  } as React.CSSProperties
                }
              >
                {ring.skills.map((skill, i) => (
                  <Node
                    key={skill}
                    skill={skill}
                    angle={(360 / ring.skills.length) * i}
                    radius={ring.radius}
                    duration={ring.duration}
                    reverse={ring.reverse}
                    dim={ring.dim}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="nucleus-core flex h-32 w-32 flex-col items-center justify-center rounded-full border border-primary/60 bg-primary/15 text-center">
              <span className="font-display text-2xl font-bold text-primary">Java</span>
              <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                nucleus
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: static concentric shells, metaphor intact */}
      <div className="space-y-4 md:hidden">
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-primary/50 bg-primary/10 shadow-[var(--glow-soft)]">
          <span className="absolute inset-4 rounded-full border border-dashed border-primary/25" />
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-primary/60 bg-primary/15">
            <span className="font-display text-xl font-bold text-primary">Java</span>
            <span className="text-[9px] tracking-widest text-muted-foreground uppercase">
              nucleus
            </span>
          </div>
        </div>
        {rings.map((ring) => (
          <div
            key={ring.label}
            className={[
              "rounded-2xl border bg-card/60 p-4",
              ring.dim ? "border-dashed border-border opacity-80" : "border-border",
            ].join(" ")}
          >
            <p className="mb-3 flex items-center gap-2 text-[11px] tracking-widest text-muted-foreground uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {ring.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {ring.skills.map((s) => (
                <span
                  key={s}
                  className={[
                    "rounded-full border px-3 py-1 text-xs",
                    ring.dim
                      ? "border-dashed border-border text-muted-foreground"
                      : "border-border text-foreground/90",
                  ].join(" ")}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 hidden flex-wrap justify-center gap-3 text-[11px] tracking-widest text-muted-foreground uppercase md:flex">
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
    </>
  );
}
