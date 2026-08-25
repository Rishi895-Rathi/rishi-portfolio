import { useInView } from "@/hooks/useInView";
import type { ReactNode } from "react";

export function AnimatedSection({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, isInView } = useInView({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-16 ${className}`}
    >
      <p
        className={`mb-2 flex items-center gap-2 text-[11px] tracking-[0.25em] text-primary uppercase transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[var(--glow-soft)]" />
        {eyebrow}
      </p>
      <h2
        className={`mb-10 text-3xl font-bold sm:text-4xl transition-all duration-700 delay-100 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {title}
      </h2>
      <div
        className={`transition-all duration-700 delay-200 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
