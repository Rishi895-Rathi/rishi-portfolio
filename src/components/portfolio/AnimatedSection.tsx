import { useInView } from "@/hooks/useInView";
import type { ReactNode } from "react";

export function AnimatedSection({
  id,
  eyebrow,
  title,
  children,
  className = "",
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const { ref, isInView } = useInView({ threshold: 0.07 });

  return (
    <section
      ref={ref}
      id={id}
      className={`mx-auto w-full max-w-7xl px-6 py-20 md:py-28 ${className}`}
    >
      {/* Eyebrow — Swiss label */}
      <p
        className={`label-sm mb-4 transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {eyebrow}
      </p>

      {/* Swiss rule under eyebrow */}
      <div className={`swiss-rule-vermilion mb-8 transition-all duration-700 delay-75 ${
        isInView ? "w-12 opacity-100" : "w-0 opacity-0"
      }`} />

      {/* Title */}
      <h2
        className={[
          "mb-14 font-display font-bold leading-tight transition-all duration-700 delay-100",
          "text-3xl sm:text-4xl md:text-5xl",
          dark ? "text-[var(--cream)]" : "text-[var(--teal)]",
          isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        ].join(" ")}
      >
        {title}
      </h2>

      {/* Content */}
      <div className={`transition-all duration-700 delay-200 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}>
        {children}
      </div>
    </section>
  );
}
