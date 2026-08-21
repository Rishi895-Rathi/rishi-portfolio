export function OrbitDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-10" aria-hidden="true">
      <span className="h-px w-1/4 bg-gradient-to-r from-transparent to-border" />
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-dashed border-primary/40" />
        <span className="h-2 w-2 rounded-full bg-primary shadow-[var(--glow-soft)]" />
      </span>
      <span className="h-px w-1/4 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}
