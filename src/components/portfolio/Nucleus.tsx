import { rings } from "./data";

function Node({
  skill, angle, radius, duration, reverse, dim,
}: {
  skill: string; angle: number; radius: number; duration: number;
  reverse?: boolean; dim?: boolean;
}) {
  return (
    <div
      className="orbit-node"
      style={{ "--a": `${angle}deg`, "--r": `${radius}px`, "--dur": `${duration}s`, "--dir": reverse ? "reverse" : "normal" } as React.CSSProperties}
    >
      <div className="orbit-node-inner group relative -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          className={[
            "cursor-default whitespace-nowrap transition-all duration-200 focus:outline-none",
            "font-mono text-[0.6rem] tracking-wide uppercase",
            "border px-2.5 py-0.5",
            dim
              ? "border-dashed border-[rgba(19,52,50,0.2)] text-[rgba(19,52,50,0.4)] bg-transparent"
              : "border-[rgba(19,52,50,0.2)] text-[var(--teal)] bg-[var(--cream-light)] hover:border-[var(--vermilion)] hover:text-[var(--vermilion)]",
          ].join(" ")}
        >
          {skill}
        </button>
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 border border-[rgba(19,52,50,0.15)] bg-[var(--cream)] px-2 py-1 text-[10px] whitespace-nowrap text-[var(--teal)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-sm z-50">
          {skill}
        </span>
      </div>
    </div>
  );
}

export function Nucleus() {
  return (
    <>
      {/* Desktop: animated orbits */}
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
                style={{ "--dur": `${ring.duration}s`, "--dir": ring.reverse ? "reverse" : "normal" } as React.CSSProperties}
              >
                {ring.skills.map((skill, i) => (
                  <Node
                    key={skill} skill={skill}
                    angle={(360 / ring.skills.length) * i}
                    radius={ring.radius} duration={ring.duration}
                    {...(ring.reverse !== undefined ? { reverse: ring.reverse } : {})}
                    {...(ring.dim !== undefined ? { dim: ring.dim } : {})}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Core — Java */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="nucleus-core flex h-28 w-28 flex-col items-center justify-center border-2 border-[var(--vermilion)] bg-[var(--teal)] text-center">
              <span className="font-display text-xl font-bold text-[var(--cream)]">Java</span>
              <span className="font-mono text-[0.5rem] tracking-[0.2em] text-[rgba(230,226,214,0.6)] uppercase mt-1">nucleus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: clean list */}
      <div className="space-y-3 md:hidden">
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center border-2 border-[var(--vermilion)] bg-[var(--teal)] mb-6">
          <div className="flex flex-col items-center justify-center">
            <span className="font-display text-lg font-bold text-[var(--cream)]">Java</span>
            <span className="font-mono text-[0.5rem] tracking-widest text-[rgba(230,226,214,0.5)] uppercase">nucleus</span>
          </div>
        </div>
        {rings.map((ring) => (
          <div
            key={ring.label}
            className={[
              "border p-4",
              ring.dim
                ? "border-dashed border-[rgba(19,52,50,0.15)] opacity-70"
                : "border-[rgba(19,52,50,0.15)] bg-[var(--cream)]",
            ].join(" ")}
          >
            <p className="mb-3 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] text-[rgba(19,52,50,0.5)] uppercase">
              <span className="h-px w-4 bg-[var(--vermilion)] inline-block" />
              {ring.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {ring.skills.map((s) => (
                <span key={s} className={ring.dim ? "tech-tag opacity-50" : "tech-tag"}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-10 hidden flex-wrap justify-center gap-6 font-mono text-[0.6rem] tracking-[0.15em] text-[rgba(19,52,50,0.45)] uppercase md:flex">
        {rings.map((r) => (
          <span key={r.label} className="flex items-center gap-2">
            <span className={["inline-block h-px w-5", r.dim ? "bg-[rgba(19,52,50,0.3)]" : "bg-[var(--vermilion)]"].join(" ")} />
            {r.label}
          </span>
        ))}
      </div>
    </>
  );
}
