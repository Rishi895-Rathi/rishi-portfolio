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
            "cursor-default whitespace-nowrap transition-all duration-200",
            "font-mono text-[0.6rem] tracking-wide",
            "border rounded-sm px-2.5 py-0.5",
            dim
              ? "border-dashed border-[var(--border-bright)] text-[var(--muted-foreground)] bg-transparent"
              : "border-[var(--border-bright)] text-[var(--accent-2)] bg-[var(--surface)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
            "focus:outline-none",
          ].join(" ")}
        >
          {skill}
        </button>
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded border border-[var(--border-bright)] bg-[var(--surface-2)] px-2 py-1 text-[10px] whitespace-nowrap text-[var(--foreground)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-md z-50">
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
                opacity: ring.dim ? 0.4 : 1,
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

          {/* Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="nucleus-core flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[rgba(124,106,240,0.5)] bg-[rgba(124,106,240,0.1)] text-center">
              <span className="font-display text-xl font-bold text-[var(--primary)]">
                Java
              </span>
              <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--muted-foreground)] uppercase mt-1">
                nucleus
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: clean group list */}
      <div className="space-y-3 md:hidden">
        <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-[rgba(124,106,240,0.4)] bg-[rgba(124,106,240,0.08)] mb-6">
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-[rgba(124,106,240,0.5)] bg-[rgba(124,106,240,0.12)]">
            <span className="font-display text-lg font-bold text-[var(--primary)]">Java</span>
            <span className="font-mono text-[0.5rem] tracking-widest text-[var(--muted-foreground)] uppercase">nucleus</span>
          </div>
        </div>
        {rings.map((ring) => (
          <div
            key={ring.label}
            className={[
              "rounded border p-4",
              ring.dim ? "border-dashed border-[var(--border)] opacity-70" : "border-[var(--border)] bg-[var(--surface-2)]",
            ].join(" ")}
          >
            <p className="mb-3 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              <span className="h-1 w-3 bg-[var(--primary)] inline-block" />
              {ring.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {ring.skills.map((s) => (
                <span
                  key={s}
                  className={[
                    "font-mono text-[0.6rem] tracking-wide border rounded-sm px-2 py-0.5",
                    ring.dim
                      ? "border-dashed border-[var(--border-bright)] text-[var(--muted-foreground)]"
                      : "border-[var(--border-bright)] text-[var(--accent-2)]",
                  ].join(" ")}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 hidden flex-wrap justify-center gap-6 font-mono text-[0.6rem] tracking-[0.15em] text-[var(--muted-foreground)] uppercase md:flex">
        {rings.map((r) => (
          <span key={r.label} className="flex items-center gap-2">
            <span
              className={[
                "inline-block h-px w-5",
                r.dim ? "bg-[var(--border-bright)]" : "bg-[var(--primary)]",
              ].join(" ")}
            />
            {r.label}
          </span>
        ))}
      </div>
    </>
  );
}
