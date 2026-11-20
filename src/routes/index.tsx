import { createFileRoute } from "@tanstack/react-router";
import {
  Github, Linkedin, Mail, Phone, MapPin,
  ExternalLink, Code2, ChevronDown, Download, ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Nucleus } from "@/components/portfolio/Nucleus";
import { AnimatedSection } from "@/components/portfolio/AnimatedSection";
import { AnimatedCounter } from "@/components/portfolio/AnimatedCounter";
import { timeline, learningRepos, certifications, links } from "@/components/portfolio/data";
import rishiPortrait from "@/assets/rishi-portrait.png";
import resumePdf from "@/assets/RISHI_RATHI_RESUME.pdf";

/* ── SEO Schema ── */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishi Rathi",
  jobTitle: "Java Backend Developer",
  url: "https://rishi-portfolio-taupe.vercel.app/",
  sameAs: ["https://github.com/Rishi895-Rathi", "https://www.linkedin.com/in/er-rishirathi/"],
  address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "India" },
  knowsAbout: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Backend Development"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Arya College of Engineering" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rishi Rathi | Java Backend Developer & API Architect" },
      { name: "description", content: "Portfolio of Rishi Rathi, an aspiring Java Backend Developer specializing in scalable, secure systems with Spring Boot, REST APIs, and PostgreSQL. Based in Jaipur, India." },
      { property: "og:title", content: "Rishi Rathi | Java Backend Developer" },
      { property: "og:description", content: "Discover the projects, experience, and skills of Rishi Rathi, a Java Backend Developer building secure REST APIs and scalable architectures." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://rishi-portfolio-taupe.vercel.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rishi Rathi | Java Backend Developer" },
      { name: "twitter:description", content: "Discover the projects, experience, and skills of Rishi Rathi, a Java Backend Developer." },
    ],
    links: [
      { rel: "canonical", href: "https://rishi-portfolio-taupe.vercel.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(personSchema) }],
  }),
  component: Portfolio,
});

/* ─── Typing Effect ─── */
function useTypingEffect(texts: string[], typingSpeed = 70, deletingSpeed = 35, pauseDuration = 2200) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex]     = useState(0);
  const [charIndex, setCharIndex]     = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);

  useEffect(() => {
    const current = texts[textIndex] ?? "";
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((p) => p + 1);
        if (charIndex + 1 === current.length) setTimeout(() => setIsDeleting(true), pauseDuration);
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((p) => p - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((p) => (p + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

/* ═══════════════ MAIN PORTFOLIO ═══════════════ */
function Portfolio() {
  const typedText = useTypingEffect(["Java Backend Developer", "Spring Boot Engineer", "REST API Architect", "Problem Solver"]);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const featuredProjects = timeline.slice(0, 2);
  const listProjects     = timeline.slice(2);

  return (
    <main className="min-h-screen" style={{ background: "var(--cream-light)", color: "var(--teal)" }}>

      {/* ═══════════════════════════════════════
          HERO — Vermilion Red · Swiss Editorial
      ═══════════════════════════════════════ */}
      <header className="hero-section">
        {/* Halftone dot grid */}
        <div className="halftone-bg" />
        {/* Diagonal stripe — top-right accent */}
        <div className="stripe-accent" style={{ top: 0, right: 0, width: "280px", height: "280px" }} />

        {/* Oversized editorial BG text — Swiss poster typography */}
        <span
          className="editorial-bg-text select-none"
          style={{ top: "50%", left: "-2%", transform: "translateY(-50%)", opacity: 0.05, color: "var(--teal)" }}
          aria-hidden="true"
        >
          DEV
        </span>

        {/* ── Hero content ── */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6">
          {/* Spacer for navbar */}
          <div className="h-20" />

          {/* Main layout — asymmetric */}
          <div className="flex flex-col gap-10 py-6 md:flex-row md:items-end md:gap-0">

            {/* ── Left: Typography block ── */}
            <div className="flex-1 md:pr-10">

              {/* Status */}
              <div className={`mb-8 transition-all duration-700 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: "rgba(230,226,214,0.7)" }}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Open to backend roles
                  <span style={{ color: "rgba(230,226,214,0.3)" }}>·</span>
                  <MapPin className="h-3 w-3" /> Jaipur, India
                </span>
              </div>

              {/* Name — massive Swiss poster type */}
              <div className={`transition-all duration-700 delay-100 ${heroReady ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                {/* Thin teal rule beside name */}
                <div className="flex gap-5 items-stretch">
                  <div className="w-[3px] self-stretch shrink-0" style={{ background: "var(--teal)" }} />
                  <div>
                    <h1
                      className="font-display font-extrabold"
                      style={{
                        fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
                        lineHeight: 0.88,
                        letterSpacing: "-0.04em",
                        color: "var(--cream-light)",
                      }}
                    >
                      RISHI<br />RATHI
                    </h1>
                  </div>
                </div>
              </div>

              {/* Role — typing */}
              <p className={`hero-typing mt-7 font-mono transition-all duration-700 delay-200 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ color: "rgba(230,226,214,0.9)", fontSize: "1.125rem", letterSpacing: "0.02em" }}
              >
                <span className="typing-cursor">{typedText}</span>
              </p>

              {/* Description */}
              <p className={`hero-desc mt-6 max-w-lg transition-all duration-700 delay-300 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ color: "rgba(230,226,214,0.85)", fontWeight: 400, fontSize: "1.25rem", lineHeight: 1.6 }}
              >
                Building scalable, secure backend systems with Java &amp; Spring Boot.
                Turning complex problems into clean, reliable APIs.
              </p>

              {/* Tech stack — monospace label row */}
              <div className={`mt-7 flex flex-wrap gap-2 transition-all duration-700 delay-[400ms] ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {["Java", "Spring Boot", "PostgreSQL", "Docker", "REST APIs"].map((t) => (
                  <span key={t} className="tech-tag-cream">{t}</span>
                ))}
              </div>

              {/* CTAs */}
              <div className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-500 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a href="#projects" className="btn-hero-primary">
                  View Projects <ArrowRight className="h-4 w-4" />
                </a>
                <a href={resumePdf} download="RISHI_RATHI_RESUME.pdf" className="btn-hero-outline">
                  <Download className="h-4 w-4" /> Resume
                </a>
              </div>

              {/* Social */}
              <div className={`mt-10 flex flex-wrap gap-6 transition-all duration-700 delay-[600ms] ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a className="social-link-cream" href={links.github} target="_blank" rel="noreferrer">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a className="social-link-cream" href={links.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
                <a className="social-link-cream" href={links.leetcode} target="_blank" rel="noreferrer">
                  <Code2 className="h-3.5 w-3.5" /> LeetCode
                </a>
              </div>
            </div>

            {/* ── Right: Portrait — Swiss geometric frame ── */}
            <div className={`flex shrink-0 justify-center md:justify-end md:pb-6 transition-all duration-1000 delay-200 ${heroReady ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="portrait-frame">
                <img
                  src={rishiPortrait}
                  alt="Rishi Rathi — Java Backend Developer"
                  fetchPriority="high"
                  className="relative block h-64 w-56 object-cover object-top sm:h-80 sm:w-72"
                  style={{
                    filter: "contrast(1.08) saturate(0.75)",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-start pb-10 pl-1">
            <a href="#about"
              className="scroll-indicator flex flex-col items-center gap-2 font-mono text-[0.6rem] tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition"
              style={{ color: "var(--cream-light)" }}
            >
              scroll <ChevronDown className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom edge — teal strip as transition */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "var(--teal)" }} />
      </header>

      {/* ═══════════════════════════════════════
          ABOUT — Cream bg · Swiss layout
      ═══════════════════════════════════════ */}
      <div style={{ background: "var(--cream-light)" }}>
        <AnimatedSection id="about" eyebrow="Profile" title="Education & background">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

            {/* Large text block */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--teal)" }}>
                B.Tech, Computer Science & Engineering
              </h3>
              <p className="font-mono text-xs tracking-wide mb-1" style={{ color: "rgba(19,52,50,0.5)" }}>
                Arya College of Engineering · RTU, Jaipur · Aug 2023 – Jul 2027
              </p>
              <div className="swiss-rule my-6" />
              <p className="text-base leading-relaxed" style={{ color: "rgba(19,52,50,0.7)", fontWeight: 300, maxWidth: "52ch" }}>
                I spend most of my time in the backend — designing REST APIs, modelling relational
                data, and keeping services correct under concurrent load. Java and Spring Boot are
                the core I build everything else around.
              </p>
              <p className="text-base leading-relaxed mt-4" style={{ color: "rgba(19,52,50,0.7)", fontWeight: 300, maxWidth: "52ch" }}>
                Beyond code, I'm drawn to systems that are both technically sound and thoughtfully
                designed. I believe good software tells a story — to users, to future maintainers,
                and to the people it serves.
              </p>
            </div>

            {/* Stats column */}
            <div className="space-y-8">
              {/* CGPA */}
              <div className="skill-category">
                <p className="label-sm mb-3">CGPA</p>
                <p className="stat-num">
                  <AnimatedCounter target={9.12} duration={2000} />
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: "rgba(19,52,50,0.4)" }}>/ 10.0 · Current</p>
              </div>

              {/* Location */}
              <div className="skill-category">
                <p className="label-sm mb-3">Based in</p>
                <p className="text-2xl font-bold" style={{ color: "var(--teal)" }}>Jaipur</p>
                <p className="font-mono text-xs mt-1" style={{ color: "rgba(19,52,50,0.4)" }}>Rajasthan, India</p>
              </div>

              {/* Status */}
              <div className="skill-category">
                <p className="label-sm mb-3">Status</p>
                <span className="inline-flex items-center gap-2 font-mono text-xs" style={{ color: "var(--teal)" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Open to backend roles
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ═══════════════════════════════════════
          SKILLS — Teal bg · Editorial list
      ═══════════════════════════════════════ */}
      <div style={{ background: "var(--teal)" }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="label-sm mb-4" style={{ color: "var(--vermilion)" }}>Stack</p>
          <div className="swiss-rule-vermilion mb-8" />
          <h2
            className="mb-16 font-display font-bold"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--cream)", letterSpacing: "-0.03em" }}
            id="skills"
          >
            The Nucleus
          </h2>
          <p className="-mt-10 mb-14 max-w-xl text-sm leading-relaxed" style={{ color: "rgba(230,226,214,0.65)", fontWeight: 300 }}>
            Java sits at the core. Everything else orbits it in shells — hover to pause the orbit and inspect a node. The outer dashed shell is what I'm currently exploring.
          </p>
          <Nucleus />

          {/* Certifications — integrated into teal section */}
          <div className="mt-20 pt-14" style={{ borderTop: "1px solid rgba(230,226,214,0.1)" }} id="certifications">
            <p className="label-sm mb-6" style={{ color: "var(--vermilion)" }}>Credentials</p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span key={c} className="tech-tag-cream">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          PROJECTS — Swiss editorial · Mixed layout
      ═══════════════════════════════════════ */}
      <div style={{ background: "var(--cream-light)" }}>
        <AnimatedSection id="projects" eyebrow="Work" title="Projects & experience">

          {/* Featured — 2 blocks side by side */}
          <div className="grid gap-0 md:grid-cols-2 mb-16">
            {featuredProjects.map((item, idx) => (
              <article
                key={item.title}
                className={idx === 0 ? "project-featured-block" : "project-secondary-block"}
              >
                {/* Index */}
                <span className="proj-index font-mono text-[0.6rem] tracking-[0.3em] uppercase">
                  0{idx + 1}
                </span>

                <div className="mt-4 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="proj-title font-display text-xl font-bold leading-tight" style={{ maxWidth: "32ch" }}>
                    {item.title}
                  </h3>
                </div>

                <p className={`mt-1 font-mono text-[0.6rem] tracking-widest uppercase ${idx === 0 ? "" : ""}`}
                  style={{ color: idx === 0 ? "rgba(230,226,214,0.4)" : "rgba(19,52,50,0.4)" }}>
                  {item.period} · {item.badge}
                </p>

                <p className="proj-desc mt-5 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {item.body}
                </p>

                {item.note && (
                  <p className="mt-4 text-xs pl-3 leading-relaxed"
                    style={{ borderLeft: `2px solid var(--vermilion)`, color: idx === 0 ? "rgba(230,226,214,0.6)" : "rgba(19,52,50,0.6)" }}>
                    {item.note}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <span key={s} className={idx === 0 ? "tech-tag-cream" : "tech-tag"}>{s}</span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-5">
                  {item.repo && (
                    <a href={item.repo} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition hover:gap-3"
                      style={{ color: idx === 0 ? "var(--cream)" : "var(--teal)" }}>
                      <Github className="h-3.5 w-3.5" /> Repo <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition hover:gap-3"
                      style={{ color: "var(--vermilion)" }}>
                      <ExternalLink className="h-3.5 w-3.5" /> Live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Rest — Swiss editorial list rows */}
          <div style={{ borderTop: "1px solid rgba(19,52,50,0.12)" }}>
            {listProjects.map((item, idx) => (
              <article
                key={item.title}
                style={{ borderBottom: "1px solid rgba(19,52,50,0.1)", padding: "2.5rem 0" }}
                className="group grid grid-cols-[2.5rem_1fr] gap-6 transition-all duration-250 hover:pl-5"
              >
                {/* Number */}
                <span className="font-mono text-[0.6rem] tracking-[0.3em] pt-1" style={{ color: "var(--vermilion)" }}>
                  0{idx + 3}
                </span>

                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-bold" style={{ color: "var(--teal)" }}>
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs" style={{ color: "rgba(19,52,50,0.4)" }}>{item.period}</span>
                      <span className="font-mono text-[0.55rem] tracking-widest uppercase border px-2 py-0.5"
                        style={{ color: "rgba(19,52,50,0.5)", borderColor: "rgba(19,52,50,0.15)" }}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "rgba(19,52,50,0.65)", fontWeight: 300 }}>
                    {item.body}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((s) => <span key={s} className="tech-tag">{s}</span>)}
                    </div>
                    {item.repo && (
                      <a href={item.repo} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition hover:gap-3 ml-auto"
                        style={{ color: "var(--teal)" }}>
                        <Github className="h-3.5 w-3.5" /> Repo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Learning log */}
          <div className="mt-14 pt-10" style={{ borderTop: "1px solid rgba(19,52,50,0.1)" }}>
            <p className="label-sm mb-6">Learning log — in progress</p>
            <ul className="space-y-3">
              {learningRepos.map((r) => (
                <li key={r.name} className="flex flex-wrap items-center gap-x-3 text-sm">
                  <a href={r.url} target="_blank" rel="noreferrer"
                    className="social-link font-mono text-xs" style={{ color: "var(--vermilion)" }}>
                    {r.name}
                  </a>
                  <span style={{ color: "rgba(19,52,50,0.2)" }}>—</span>
                  <span className="text-xs" style={{ color: "rgba(19,52,50,0.5)", fontWeight: 300 }}>{r.line}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>

      {/* ═══════════════════════════════════════
          ACHIEVEMENTS — Vermilion bg · Bold numbers
      ═══════════════════════════════════════ */}
      <div style={{ background: "var(--vermilion)" }} id="achievements">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="label-sm mb-4" style={{ color: "var(--teal)" }}>Proof of work</p>
          <div className="swiss-rule-vermilion mb-8" style={{ background: "var(--teal)" }} />
          <h2 className="mb-16 font-display font-bold"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--cream-light)", letterSpacing: "-0.03em" }}>
            Achievements
          </h2>

          <div className="grid gap-px" style={{ background: "rgba(19,52,50,0.2)" }}
            /* 4-column strip */
          >
            {[
              { emoji: "🦈", num: null, label: "Pull Shark", sub: "GitHub Achievement", href: links.github },
              { emoji: "🏅", num: 6, label: "LeetCode Badges", sub: "_BAKI_HANMA_", href: links.leetcode },
              { emoji: null, num: 16, label: "Public Repos", sub: "GitHub", href: links.github },
              { emoji: null, num: 400, suffix: "+", label: "Problems Solved", sub: "LeetCode", href: links.leetcode },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col justify-between p-8 transition"
                style={{ background: "var(--cream-light)", gridColumn: "span 1" }}
                /* hover handled inline */
                onMouseEnter={e => (e.currentTarget.style.background = "var(--teal)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--cream-light)")}
              >
                {item.emoji && <span className="text-4xl mb-2">{item.emoji}</span>}
                {item.num !== null && item.num !== undefined && (
                  <p className="stat-num">
                    <AnimatedCounter target={item.num} suffix={item.suffix ?? ""} duration={2000} />
                  </p>
                )}
                <div className="mt-auto pt-4">
                  <p className="font-display font-bold text-lg" style={{ color: "var(--teal)" }}
                    /* peer hover handled via JS above — text changes too */
                  >{item.label}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: "rgba(19,52,50,0.45)" }}>{item.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CONTACT — Cream bg · Minimal
      ═══════════════════════════════════════ */}
      <div style={{ background: "var(--cream-light)" }}>
        <AnimatedSection id="contact" eyebrow="Contact" title="Let's build something">
          <div className="grid gap-16 md:grid-cols-2">

            {/* Left — text + links */}
            <div>
              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(19,52,50,0.65)", fontWeight: 300, maxWidth: "40ch" }}>
                I'm always open to discussing backend architecture, Java projects, or new
                opportunities. If you have something interesting in mind, reach out.
              </p>

              <div className="space-y-5">
                {[
                  { icon: <Mail className="h-4 w-4" />, label: links.email, href: `mailto:${links.email}` },
                  { icon: <Phone className="h-4 w-4" />, label: links.phone, href: `tel:${links.phone.replace(/\s/g, "")}` },
                  { icon: <Github className="h-4 w-4" />, label: "github.com/Rishi895-Rathi", href: links.github, external: true },
                  { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: links.linkedin, external: true },
                  { icon: <Code2 className="h-4 w-4" />, label: "_BAKI_HANMA_ · LeetCode", href: links.leetcode, external: true },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="social-link"
                    {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[rgba(19,52,50,0.15)] bg-[var(--cream)] transition group-hover:border-[var(--vermilion)]">
                      <span style={{ color: "var(--vermilion)" }}>{item.icon}</span>
                    </span>
                    <span className="text-sm">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — minimal form, underline style */}
            <form
              action={`mailto:${links.email}`}
              method="post"
              encType="text/plain"
              className="space-y-8"
            >
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="label-sm block mb-2">{f.label}</label>
                  <input id={f.id} name={f.id} type={f.type} required className="input-field" placeholder={`Your ${f.label.toLowerCase()}`} />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="label-sm block mb-2">Message</label>
                <textarea id="message" name="message" rows={4} required className="input-field resize-none" placeholder="Your message" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Send message
              </button>
              <p className="text-center font-mono text-[0.6rem]" style={{ color: "rgba(19,52,50,0.4)" }}>
                Opens your mail client · <a href={`mailto:${links.email}`} className="hover:underline" style={{ color: "var(--vermilion)" }}>{links.email}</a>
              </p>
            </form>
          </div>
        </AnimatedSection>
      </div>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer style={{ background: "var(--teal)", borderTop: "2px solid var(--vermilion)" }}>
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <span className="font-display font-bold tracking-widest uppercase text-sm" style={{ color: "var(--cream)" }}>
              Rishi Rathi
            </span>
            <a href={resumePdf} download="RISHI_RATHI_RESUME.pdf" className="btn-hero-outline text-xs py-2 px-4">
              <Download className="h-3.5 w-3.5" /> Download Resume
            </a>
            <div className="flex flex-wrap gap-4 text-xs font-mono" style={{ color: "rgba(230,226,214,0.4)" }}>
              <span>© {new Date().getFullYear()} Rishi Rathi</span>
              <span>·</span>
              <span>Built with Java-shaped patience · 一期一会</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
