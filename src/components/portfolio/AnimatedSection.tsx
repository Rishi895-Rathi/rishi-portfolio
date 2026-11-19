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
  const { ref, isInView } = useInView({ threshold: 0.07 });

  return (
    <section
      ref={ref}
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-20 ${className}`}
    >
      {/* Eyebrow */}
      <p
        className={`mb-3 font-mono text-[0.6875rem] tracking-[0.3em] text-[var(--accent-2)] uppercase transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        〉 {eyebrow}
      </p>

      {/* Title */}
      <h2
        className={`mb-12 text-3xl font-bold leading-tight sm:text-4xl transition-all duration-700 delay-100 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        {title}
      </h2>

      {/* Content */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
