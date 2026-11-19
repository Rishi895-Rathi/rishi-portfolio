import { createFileRoute } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  ChevronDown,
  Download,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Nucleus } from "@/components/portfolio/Nucleus";
import { AnimatedSection } from "@/components/portfolio/AnimatedSection";
import { AnimatedCounter } from "@/components/portfolio/AnimatedCounter";
import {
  timeline,
  learningRepos,
  certifications,
  links,
} from "@/components/portfolio/data";
import rishiPortrait from "@/assets/rishi-portrait.png";
import resumePdf from "@/assets/RISHI_RATHI_RESUME.pdf";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rishi Rathi",
  "jobTitle": "Java Backend Developer",
  "url": "https://rishi-portfolio-taupe.vercel.app/",
  "sameAs": [
    "https://github.com/Rishi895-Rathi",
    "https://www.linkedin.com/in/er-rishirathi/"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "addressCountry": "India"
  },
  "knowsAbout": ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Backend Development"],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Arya College of Engineering"
  }
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rishi Rathi | Java Backend Developer & API Architect" },
      {
        name: "description",
        content:
          "Portfolio of Rishi Rathi, an aspiring Java Backend Developer specializing in scalable, secure systems with Spring Boot, REST APIs, and PostgreSQL. Based in Jaipur, India.",
      },
      { property: "og:title", content: "Rishi Rathi | Java Backend Developer" },
      {
        property: "og:description",
        content:
          "Discover the projects, experience, and skills of Rishi Rathi, a Java Backend Developer building secure REST APIs and scalable architectures.",
      },
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema)
      }
    ]
  }),
  component: Portfolio,
});

/* ─── Typing Effect ─── */
function useTypingEffect(
  texts: string[],
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 2200
) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex] ?? "";
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((p) => p + 1);
          if (charIndex + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((p) => p - 1);
          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setTextIndex((p) => (p + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

/* ═══ CHIBI CHARACTER: Tanjiro Kamado — Demon Slayer ═══ */
function TanjiroChibi({ style }: { style?: React.CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents:"none", userSelect:"none", ...style }}>
      {/* Hair back */}
      <path d="M20 55 Q18 20 50 8 Q82 20 80 55" fill="#1a1a2a"/>
      <path d="M20 55 Q14 35 18 22 Q12 42 18 60Z" fill="#0d0d1a"/>
      <path d="M80 55 Q86 35 82 22 Q88 42 82 60Z" fill="#0d0d1a"/>
      {/* Red tips on hair */}
      <path d="M50 8 Q46 2 54 2 Q58 5 50 8Z" fill="#e63946"/>
      <path d="M34 12 Q30 6 36 7Z" fill="#e63946"/>
      <path d="M66 12 Q70 6 64 7Z" fill="#e63946"/>
      {/* Head */}
      <ellipse cx="50" cy="52" rx="30" ry="32" fill="#f5e6d3"/>
      {/* Hair front */}
      <path d="M20 48 Q22 25 38 16 Q50 10 62 16 Q78 25 80 48" fill="#1a1a2a"/>
      <path d="M20 48 Q16 38 20 55 Q22 50 26 52Z" fill="#0d0d1a"/>
      <path d="M80 48 Q84 38 80 55 Q78 50 74 52Z" fill="#0d0d1a"/>
      {/* Forehead scar — X mark, Tanjiro's signature */}
      <path d="M44 32 L48 38" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M48 32 L44 38" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Eyes */}
      <ellipse cx="38" cy="54" rx="6" ry="7" fill="#1a1a2a"/>
      <ellipse cx="38" cy="54" rx="4" ry="5.5" fill="#2d6a4f"/>
      <ellipse cx="38" cy="54" rx="2" ry="3" fill="#090b13"/>
      <ellipse cx="36.5" cy="52" rx="1.2" ry="1.2" fill="white" opacity="0.9"/>
      <ellipse cx="62" cy="54" rx="6" ry="7" fill="#1a1a2a"/>
      <ellipse cx="62" cy="54" rx="4" ry="5.5" fill="#2d6a4f"/>
      <ellipse cx="62" cy="54" rx="2" ry="3" fill="#090b13"/>
      <ellipse cx="60.5" cy="52" rx="1.2" ry="1.2" fill="white" opacity="0.9"/>
      {/* Eyebrows — determined expression */}
      <path d="M32 47 Q38 44 44 47" stroke="#1a1a2a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M56 47 Q62 44 68 47" stroke="#1a1a2a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Nose & mouth */}
      <path d="M48 63 Q50 66 52 63" stroke="#c9a98a" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M44 70 Q50 74 56 70" stroke="#c9a98a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Hanafuda earring — left */}
      <circle cx="20" cy="58" r="5" fill="#e63946" stroke="#fff" strokeWidth="1"/>
      <circle cx="20" cy="58" r="2.5" fill="#fff"/>
      <circle cx="20" cy="58" r="1" fill="#e63946"/>
      {/* Hanafuda earring — right */}
      <circle cx="80" cy="58" r="5" fill="#e63946" stroke="#fff" strokeWidth="1"/>
      <circle cx="80" cy="58" r="2.5" fill="#fff"/>
      <circle cx="80" cy="58" r="1" fill="#e63946"/>
      {/* Neck */}
      <rect x="43" y="81" width="14" height="10" rx="3" fill="#f5e6d3"/>
      {/* Haori — green & black checker */}
      <path d="M18 130 Q16 108 26 96 L43 84 L50 94 L57 84 L74 96 Q84 108 82 130Z" fill="#2d6a4f"/>
      {/* Checker pattern on haori */}
      {[0,1,2,3].map(i => [0,1,2,3].map(j => (
        (i+j) % 2 === 0 ? <rect key={`${i}-${j}`} x={18+i*16} y={96+j*10} width="8" height="5" fill="#1a1a2a" opacity="0.7"/> : null
      )))}
      {/* Haori collar */}
      <path d="M42 84 L50 94 L58 84 L55 84 L50 92 L45 84Z" fill="#e8d5b0"/>
      {/* Shirt under */}
      <path d="M46 84 L50 92 L54 84" fill="#fff" opacity="0.5"/>
      {/* Arms */}
      <path d="M26 96 Q10 108 14 125" stroke="#2d6a4f" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M74 96 Q90 108 86 125" stroke="#2d6a4f" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <ellipse cx="14" cy="125" rx="6" ry="5" fill="#f5e6d3"/>
      <ellipse cx="86" cy="125" rx="6" ry="5" fill="#f5e6d3"/>
      {/* Sword handle — right hand */}
      <rect x="86" y="118" width="4" height="22" rx="2" fill="#1a1a2a" transform="rotate(-20 88 128)"/>
      <rect x="84" y="116" width="8" height="3" rx="1" fill="#e8c84a" transform="rotate(-20 88 128)"/>
      {/* Legs */}
      <path d="M28 130 L30 148 L46 148 L48 136 L52 136 L54 148 L70 148 L72 130Z" fill="#1a1a2a"/>
      {/* Ground shadow */}
      <ellipse cx="50" cy="149" rx="28" ry="3" fill="#2d6a4f" opacity="0.25"/>
    </svg>
  );
}

/* ═══ CHIBI CHARACTER: Gojo Satoru — Jujutsu Kaisen ═══ */
function GojoChibi({ style }: { style?: React.CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents:"none", userSelect:"none", ...style }}>
      {/* Hair — white/silver fluffy */}
      <path d="M18 52 Q16 18 50 6 Q84 18 82 52" fill="#d8d8e8"/>
      <path d="M18 52 Q12 32 16 18 Q10 38 16 58Z" fill="#b8b8d0"/>
      <path d="M82 52 Q88 32 84 18 Q90 38 84 58Z" fill="#b8b8d0"/>
      {/* Fluffy hair tufts */}
      <circle cx="30" cy="14" r="8" fill="#d8d8e8"/>
      <circle cx="50" cy="8"  r="9" fill="#e0e0f0"/>
      <circle cx="70" cy="14" r="8" fill="#d8d8e8"/>
      <circle cx="22" cy="22" r="6" fill="#c8c8e0"/>
      <circle cx="78" cy="22" r="6" fill="#c8c8e0"/>
      {/* Head */}
      <ellipse cx="50" cy="52" rx="30" ry="31" fill="#f5e8e0"/>
      {/* Hair front floof */}
      <path d="M22 44 Q24 20 40 14 Q50 10 60 14 Q76 20 78 44" fill="#d8d8e8"/>
      <path d="M22 44 Q18 34 22 50 Q24 46 28 48Z" fill="#c8c8e0"/>
      <path d="M78 44 Q82 34 78 50 Q76 46 72 48Z" fill="#c8c8e0"/>
      {/* ── Blindfold — Gojo's most iconic feature ── */}
      <rect x="22" y="49" width="56" height="12" rx="4" fill="#0d0d1a"/>
      {/* Infinity symbol hint on blindfold */}
      <path d="M38 55 Q42 51 46 55 Q42 59 38 55Z" stroke="#6366f1" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M54 55 Q58 51 62 55 Q58 59 54 55Z" stroke="#6366f1" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Six Eyes glow under blindfold */}
      <ellipse cx="38" cy="55" rx="5" ry="3" fill="#6366f1" opacity="0.3"/>
      <ellipse cx="62" cy="55" rx="5" ry="3" fill="#6366f1" opacity="0.3"/>
      {/* Eyebrows above blindfold */}
      <path d="M30 46 Q38 42 46 46" stroke="#888" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M54 46 Q62 42 70 46" stroke="#888" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Smug smile */}
      <path d="M42 72 Q50 78 58 72" stroke="#c9a98a" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M42 72 Q41 69 44 70" stroke="#c9a98a" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* Neck */}
      <rect x="43" y="81" width="14" height="10" rx="3" fill="#f5e8e0"/>
      {/* Jujutsu Tech uniform — dark */}
      <path d="M18 130 Q16 108 26 96 L43 84 L50 94 L57 84 L74 96 Q84 108 82 130Z" fill="#1a1a2e"/>
      {/* Collar */}
      <path d="M42 84 L50 94 L58 84 L55 84 L50 90 L45 84Z" fill="#2d2d4a"/>
      <path d="M46 84 L50 90 L54 84" fill="#fff" opacity="0.3"/>
      {/* Infinity aura rings */}
      <circle cx="50" cy="110" r="38" stroke="#6366f1" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" fill="none"/>
      <circle cx="50" cy="110" r="30" stroke="#818cf8" strokeWidth="0.5" opacity="0.3" fill="none"/>
      {/* Arms */}
      <path d="M26 96 Q10 108 14 125" stroke="#1a1a2e" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M74 96 Q90 108 86 125" stroke="#1a1a2e" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <ellipse cx="14" cy="125" rx="6" ry="5" fill="#f5e8e0"/>
      <ellipse cx="86" cy="125" rx="6" ry="5" fill="#f5e8e0"/>
      {/* Legs */}
      <path d="M28 130 L30 148 L46 148 L48 136 L52 136 L54 148 L70 148 L72 130Z" fill="#12121f"/>
      {/* Ground shadow */}
      <ellipse cx="50" cy="149" rx="28" ry="3" fill="#6366f1" opacity="0.2"/>
    </svg>
  );
}

/* ═══ CHIBI CHARACTER: Sung Jin-Woo — Solo Leveling ═══ */
function SungJinwooChibi({ style }: { style?: React.CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents:"none", userSelect:"none", ...style }}>
      {/* Shadow monarch aura */}
      <ellipse cx="50" cy="120" rx="42" ry="28" fill="#4c1d95" opacity="0.2"/>
      {/* Hair — dark black, slightly messy */}
      <path d="M20 54 Q18 18 50 6 Q82 18 80 54" fill="#0d0d14"/>
      <path d="M20 54 Q14 34 18 20 Q10 40 18 60Z" fill="#06060c"/>
      <path d="M80 54 Q86 34 82 20 Q90 40 82 60Z" fill="#06060c"/>
      {/* Hair spikes — sharp, edgy */}
      <path d="M50 6 Q46 -2 52 2Z" fill="#0d0d14"/>
      <path d="M62 10 Q66 2 64 6Z" fill="#0d0d14"/>
      <path d="M38 10 Q34 2 36 6Z" fill="#0d0d14"/>
      {/* Head */}
      <ellipse cx="50" cy="52" rx="29" ry="31" fill="#e8ddd8"/>
      {/* Hair front */}
      <path d="M22 46 Q24 22 40 14 Q50 10 60 14 Q76 22 78 46" fill="#0d0d14"/>
      <path d="M22 46 Q18 36 22 54 Q24 50 28 52Z" fill="#06060c"/>
      <path d="M78 46 Q82 36 78 54 Q76 50 72 52Z" fill="#06060c"/>
      {/* Hair fringe — covers forehead */}
      <path d="M34 28 Q38 20 50 18 Q62 20 66 28 Q60 24 50 24 Q40 24 34 28Z" fill="#06060c"/>
      {/* Eyes — purple/dark monarch eyes */}
      <ellipse cx="38" cy="55" rx="6.5" ry="8" fill="#0d0d14"/>
      <ellipse cx="38" cy="55" rx="4.5" ry="6" fill="#6d28d9"/>
      <ellipse cx="38" cy="55" rx="2.5" ry="3.5" fill="#0d0d14"/>
      <ellipse cx="36.5" cy="52.5" rx="1.3" ry="1.3" fill="white" opacity="0.9"/>
      {/* Purple glow in eyes */}
      <ellipse cx="38" cy="57" rx="2" ry="1" fill="#8b5cf6" opacity="0.5"/>
      <ellipse cx="62" cy="55" rx="6.5" ry="8" fill="#0d0d14"/>
      <ellipse cx="62" cy="55" rx="4.5" ry="6" fill="#6d28d9"/>
      <ellipse cx="62" cy="55" rx="2.5" ry="3.5" fill="#0d0d14"/>
      <ellipse cx="60.5" cy="52.5" rx="1.3" ry="1.3" fill="white" opacity="0.9"/>
      <ellipse cx="62" cy="57" rx="2" ry="1" fill="#8b5cf6" opacity="0.5"/>
      {/* Sharp eyebrows — intense */}
      <path d="M31 47 L44 45" stroke="#0d0d14" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M56 45 L69 47" stroke="#0d0d14" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Nose & stoic mouth */}
      <path d="M48 64 Q50 67 52 64" stroke="#b8a898" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M44 72 Q50 74 56 72" stroke="#b8a898" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Neck */}
      <rect x="43" y="80" width="14" height="11" rx="3" fill="#e8ddd8"/>
      {/* Shadow Monarch armor — dark purple/black */}
      <path d="M16 132 Q14 108 25 96 L43 83 L50 93 L57 83 L75 96 Q86 108 84 132Z" fill="#1e0a3c"/>
      {/* Armor chest plate */}
      <path d="M34 100 Q50 94 66 100 Q62 115 50 118 Q38 115 34 100Z" fill="#2d1458"/>
      {/* Armor details */}
      <path d="M50 94 L50 118" stroke="#7c3aed" strokeWidth="1" opacity="0.6"/>
      <path d="M34 100 Q50 97 66 100" stroke="#7c3aed" strokeWidth="0.8" opacity="0.4"/>
      {/* Shoulder pauldrons */}
      <ellipse cx="24" cy="97" rx="10" ry="6" fill="#2d1458"/>
      <ellipse cx="76" cy="97" rx="10" ry="6" fill="#2d1458"/>
      <path d="M20 95 Q24 90 28 95" stroke="#7c3aed" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M72 95 Q76 90 80 95" stroke="#7c3aed" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Collar V */}
      <path d="M42 83 L50 93 L58 83 L55 83 L50 90 L45 83Z" fill="#2d1458"/>
      {/* Arms */}
      <path d="M25 96 Q9 110 13 128" stroke="#1e0a3c" strokeWidth="13" strokeLinecap="round" fill="none"/>
      <path d="M75 96 Q91 110 87 128" stroke="#1e0a3c" strokeWidth="13" strokeLinecap="round" fill="none"/>
      <ellipse cx="13" cy="128" rx="6" ry="5" fill="#e8ddd8"/>
      <ellipse cx="87" cy="128" rx="6" ry="5" fill="#e8ddd8"/>
      {/* Legs */}
      <path d="M26 132 L28 148 L46 148 L48 135 L52 135 L54 148 L72 148 L74 132Z" fill="#12071e"/>
      {/* Shadow particles floating around */}
      <circle cx="12" cy="100" r="2" fill="#7c3aed" opacity="0.6"/>
      <circle cx="88" cy="105" r="1.5" fill="#7c3aed" opacity="0.5"/>
      <circle cx="8"  cy="115" r="1" fill="#8b5cf6" opacity="0.4"/>
      <circle cx="92" cy="90"  r="1.2" fill="#6d28d9" opacity="0.5"/>
      <circle cx="15" cy="88"  r="1.5" fill="#7c3aed" opacity="0.4"/>
      {/* Ground shadow — purple tinted */}
      <ellipse cx="50" cy="149" rx="28" ry="3.5" fill="#6d28d9" opacity="0.3"/>
    </svg>
  );
}

/* ─── Section Divider ─── */
function SectionRule({ label }: { label?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 flex items-center gap-6 py-2">
      <div className="section-rule flex-1" />
      {label && (
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--border-bright)] uppercase shrink-0">
          {label}
        </span>
      )}
      <div className="section-rule flex-1" />
    </div>
  );
}

/* ═══════════════ MAIN PORTFOLIO ═══════════════ */
function Portfolio() {
  const typedText = useTypingEffect([
    "Java Backend Developer",
    "Spring Boot Engineer",
    "REST API Architect",
    "Problem Solver",
  ]);

  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Featured = first 2, rest are list */
  const featuredProjects = timeline.slice(0, 2);
  const listProjects = timeline.slice(2);

  return (
    <main className="noise-bg min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ═══════ HERO ═══════ */}
      <header className="scan-lines relative min-h-screen overflow-hidden">

        {/* Single ambient glow — far background, barely visible */}
        <div
          className="hero-bg-glow"
          style={{
            width: "700px",
            height: "700px",
            top: "-100px",
            left: "-200px",
            background: "var(--primary)",
          }}
        />
        <div
          className="hero-bg-glow"
          style={{
            width: "400px",
            height: "400px",
            bottom: "0px",
            right: "-100px",
            background: "var(--accent)",
            opacity: "0.07",
          }}
        />

        {/* ── Anime characters scattered around hero — hidden on small screens ── */}
        <div className="hidden md:block">
          {/* Tanjiro — bottom left corner */}
          <TanjiroChibi style={{ position:"absolute", bottom:"32px", left:"16px", width:"96px", opacity:0.22 }} />
          {/* Gojo — top right, sitting behind nav area */}
          <GojoChibi style={{ position:"absolute", top:"80px", right:"20px", width:"88px", opacity:0.18 }} />
          {/* Sung Jin-Woo — bottom right */}
          <SungJinwooChibi style={{ position:"absolute", bottom:"28px", right:"120px", width:"100px", opacity:0.2 }} />
        </div>

        {/* ── Asymmetric hero layout ── */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6">

          {/* Top spacer for nav */}
          <div className="h-20" />

          {/* Main content — left aligned, asymmetric */}
          <div className="flex flex-col-reverse gap-12 py-8 md:flex-row md:items-center md:gap-0">

            {/* ── Left: Text block ── */}
            <div className="flex-1 md:pr-12">

              {/* Status badge */}
              <div
                className={`mb-8 transition-all duration-700 ${heroReady ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
              >
                <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-widest text-[var(--muted-foreground)] uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Open to backend roles
                  <span className="text-[var(--border-bright)]">·</span>
                  <MapPin className="h-3 w-3" /> Jaipur, India
                </span>
              </div>

              {/* Name — huge, left-aligned, two lines */}
              <div
                className={`transition-all duration-700 delay-150 ${heroReady ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
              >
                {/* Thin vertical accent rule */}
                <div className="mb-4 flex items-stretch gap-4">
                  <div className="w-px bg-[var(--primary)] self-stretch shrink-0" />
                  <div>
                    <h1 className="font-display font-bold leading-[0.9] tracking-tight text-[var(--foreground)]"
                      style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}>
                      RISHI<br />RATHI
                    </h1>
                  </div>
                </div>
              </div>

              {/* Typed role */}
              <p
                className={`mt-5 font-mono text-sm text-[var(--accent-2)] transition-all duration-700 delay-300 ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <span className="typing-cursor">{typedText}</span>
              </p>

              {/* Description */}
              <p
                className={`mt-5 max-w-md text-base leading-relaxed text-[var(--muted-foreground)] transition-all duration-700 delay-[400ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                Building scalable, secure backend systems with Java &amp; Spring Boot.
                Turning complex problems into clean, reliable APIs.
              </p>

              {/* Tech stack line */}
              <p
                className={`mt-5 font-mono text-[0.7rem] tracking-wide text-[var(--border-bright)] transition-all duration-700 delay-[500ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                {"< Java / Spring Boot / PostgreSQL / Docker / REST APIs />"}
              </p>

              {/* CTAs */}
              <div
                className={`mt-10 flex flex-wrap gap-3 transition-all duration-700 delay-[600ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <a href="#projects" className="btn-primary">
                  View Projects <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href={resumePdf} download="RISHI_RATHI_RESUME.pdf" className="btn-outline">
                  <Download className="h-3.5 w-3.5" /> Resume
                </a>
                <a href="#contact" className="btn-ghost">
                  Contact
                </a>
              </div>

              {/* Social row */}
              <div
                className={`mt-10 flex flex-wrap gap-5 text-xs text-[var(--muted-foreground)] transition-all duration-700 delay-[750ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <a className="social-link flex items-center gap-1.5" href={links.github} target="_blank" rel="noreferrer">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a className="social-link flex items-center gap-1.5" href={links.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
                <a className="social-link flex items-center gap-1.5" href={links.leetcode} target="_blank" rel="noreferrer">
                  <Code2 className="h-3.5 w-3.5" /> LeetCode
                </a>
              </div>
            </div>

            {/* ── Right: Portrait ── */}
            <div
              className={`flex shrink-0 justify-center md:justify-end transition-all duration-1000 delay-200 ${heroReady ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="relative">
                {/* Subtle glow behind portrait */}
                <div className="absolute inset-0 rounded-2xl blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(124,106,240,0.2) 0%, transparent 70%)" }}
                />
                {/* Portrait — no spinning borders, clean */}
                <img
                  src={rishiPortrait}
                  alt="Rishi Rathi - Java Backend Developer"
                  fetchPriority="high"
                  className="relative h-56 w-56 rounded-2xl object-cover object-top sm:h-72 sm:w-72"
                  style={{
                    filter: "contrast(1.05) saturate(0.8)",
                    boxShadow: "0 0 0 1px var(--border), var(--shadow-panel)",
                  }}
                />
                {/* Corner accent */}
                <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-[var(--primary)] opacity-60" />
                <div className="absolute -top-3 -left-3 h-16 w-16 border-t border-l border-[var(--accent)] opacity-40" />
              </div>
            </div>
          </div>

          {/* Scroll indicator — bottom */}
          <div className="flex justify-center pb-10">
            <a
              href="#about"
              className="scroll-indicator flex flex-col items-center gap-2 font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase opacity-60 transition hover:opacity-100"
            >
              scroll
              <ChevronDown className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ═══════ ABOUT — BENTO ═══════ */}
      <SectionRule label="profile" />
      <AnimatedSection id="about" eyebrow="About" title="Education & background">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Education — spans 2 cols */}
          <div className="panel p-6 sm:col-span-2 lg:col-span-2">
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              B.Tech, Computer Science & Engineering
            </h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Arya College of Engineering · RTU, Jaipur
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
              Aug 2023 – Jul 2027
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--muted-foreground)]">
              I spend most of my time in the backend: designing REST APIs, modelling relational
              data and keeping services correct under concurrent load. Java and Spring Boot are
              the core I build everything else around.
            </p>
          </div>

          {/* CGPA */}
          <div className="panel-accent p-6">
            <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">CGPA</p>
            <p className="mt-3 stat-num gradient-text-static">
              <AnimatedCounter target={9.12} duration={2000} />
            </p>
            <p className="mt-2 font-mono text-[0.6rem] text-[var(--muted-foreground)]">/ 10.0</p>
          </div>

          {/* Location */}
          <div className="panel p-6">
            <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">Based in</p>
            <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">Jaipur</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">Rajasthan, India</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ SKILLS ═══════ */}
      <SectionRule label="stack" />
      <AnimatedSection id="skills" eyebrow="Skills" title="The Nucleus">
        <p className="-mt-6 mb-10 max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          Java sits at the core. Everything else orbits it in shells — hover to pause the orbit and
          inspect a node. The outer dashed shell is what I'm currently exploring.
        </p>
        <Nucleus />
      </AnimatedSection>

      {/* ═══════ PROJECTS ═══════ */}
      <SectionRule label="work" />
      <AnimatedSection id="projects" eyebrow="Work" title="Projects & experience">

        {/* Featured — top 2 projects, card style */}
        <div className="grid gap-5 md:grid-cols-2 mb-16">
          {featuredProjects.map((item, idx) => (
            <article key={item.title} className="project-featured">
              {/* Number index */}
              <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
                0{idx + 1}
              </span>

              <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <span className="font-mono text-[0.6rem] tracking-wide border border-[var(--primary-border)] bg-[var(--primary-dim)] text-[var(--primary)] rounded-sm px-2 py-0.5 uppercase">
                  {item.badge}
                </span>
              </div>

              <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">{item.period}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">{item.body}</p>

              {item.note && (
                <p className="mt-4 border-l-2 border-[var(--accent)] pl-3 text-xs text-[var(--foreground)]/70">
                  {item.note}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <span key={s} className="tech-tag">{s}</span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-5">
                {item.repo && (
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--primary)] transition hover:text-[var(--accent)] hover:gap-2.5"
                  >
                    <Github className="h-3.5 w-3.5" /> View repository <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-2)] transition hover:gap-2.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Rest — editorial list entries */}
        <div className="border-t border-[var(--border)]">
          {listProjects.map((item, idx) => (
            <article key={item.title} className="project-entry group">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.55rem] tracking-widest text-[var(--muted-foreground)]">
                    0{idx + 3}
                  </span>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">{item.period}</span>
                  <span className="font-mono text-[0.55rem] tracking-wide border border-[var(--border-bright)] text-[var(--muted-foreground)] rounded-sm px-2 py-0.5 uppercase">
                    {item.badge}
                  </span>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)]">{item.body}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <span key={s} className="tech-tag">{s}</span>
                  ))}
                </div>
                {item.repo && (
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--primary)] transition hover:text-[var(--accent)] ml-auto"
                  >
                    <Github className="h-3.5 w-3.5" /> Repo <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Learning log */}
        <div className="mt-14 border-t border-[var(--border)] pt-8">
          <p className="mb-4 font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
            〉 Learning log — in-progress, not shipped work
          </p>
          <ul className="space-y-2">
            {learningRepos.map((r) => (
              <li key={r.name} className="flex flex-wrap items-center gap-x-3 text-sm">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link font-mono text-xs text-[var(--accent-2)]"
                >
                  {r.name}
                </a>
                <span className="text-[var(--border-bright)]">—</span>
                <span className="text-xs text-[var(--muted-foreground)]">{r.line}</span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* ═══════ ACHIEVEMENTS ═══════ */}
      <SectionRule label="achievements" />
      <AnimatedSection id="achievements" eyebrow="Proof of work" title="Achievements">
        {/* Horizontal counter strip */}
        <div className="grid gap-px border border-[var(--border)] rounded-md overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {/* Pull Shark */}
          <div className="bg-[var(--surface-2)] p-6">
            <span className="text-3xl" role="img" aria-label="shark">🦈</span>
            <p className="mt-3 font-semibold text-[var(--foreground)]">Pull Shark</p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">GitHub achievement</p>
          </div>

          {/* LeetCode Badges */}
          <a
            href={links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--surface-2)] p-6 transition hover:bg-[var(--surface)] group"
          >
            <span className="text-3xl" role="img" aria-label="medal">🏅</span>
            <p className="mt-3 stat-num gradient-text-teal">
              <AnimatedCounter target={6} duration={1500} />
            </p>
            <p className="mt-1 font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-2)]">
              LeetCode Badges
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">_BAKI_HANMA_</p>
          </a>

          {/* Public repos */}
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--surface-2)] p-6 transition hover:bg-[var(--surface)] group"
          >
            <p className="stat-num gradient-text-static">
              <AnimatedCounter target={16} duration={1800} />
            </p>
            <p className="mt-3 font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
              Public Repos
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">GitHub</p>
          </a>

          {/* LeetCode solved */}
          <a
            href={links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--surface-2)] p-6 transition hover:bg-[var(--surface)] group"
          >
            <p className="stat-num gradient-text-static">
              <AnimatedCounter target={400} suffix="+" duration={2000} />
            </p>
            <p className="mt-3 font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
              Problems Solved
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">LeetCode</p>
          </a>
        </div>
      </AnimatedSection>

      {/* ═══════ CERTIFICATIONS ═══════ */}
      <SectionRule label="credentials" />
      <AnimatedSection id="certifications" eyebrow="Credentials" title="Certifications">
        <div className="flex flex-wrap gap-2">
          {certifications.map((c) => (
            <span
              key={c}
              className="tech-tag cursor-default px-3 py-1 text-xs"
              style={{ fontSize: "0.75rem", padding: "0.3rem 0.75rem" }}
            >
              {c}
            </span>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══════ CONTACT ═══════ */}
      <SectionRule label="contact" />
      <AnimatedSection id="contact" eyebrow="Contact" title="Let's build something">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left — CTA text + links */}
          <div>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)] max-w-sm">
              I'm always open to discussing backend architecture, Java projects, or new
              opportunities. If you have something interesting in mind, reach out.
            </p>

            <div className="mt-8 space-y-4">
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={`mailto:${links.email}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                {links.email}
              </a>
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={`tel:${links.phone.replace(/\s/g, "")}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                {links.phone}
              </a>
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={links.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Github className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                github.com/Rishi895-Rathi
              </a>
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Linkedin className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                LinkedIn
              </a>
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={links.leetcode}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Code2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                _BAKI_HANMA_ · LeetCode
              </a>
            </div>
          </div>

          {/* Right — Contact form, simplified */}
          <form
            action={`mailto:${links.email}`}
            method="post"
            encType="text/plain"
            className="panel p-6 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block font-mono text-[0.6rem] tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-2">
                Name
              </label>
              <input id="name" name="name" required className="input-field" />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-[0.6rem] tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-2">
                Email
              </label>
              <input id="email" name="email" type="email" required className="input-field" />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-[0.6rem] tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-2">
                Message
              </label>
              <textarea id="message" name="message" rows={4} required className="input-field resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Send message
            </button>
            <p className="text-center font-mono text-[0.6rem] text-[var(--muted-foreground)]">
              Opens your mail client · <a className="text-[var(--primary)] hover:underline" href={`mailto:${links.email}`}>{links.email}</a>
            </p>
          </form>
        </div>
      </AnimatedSection>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-[var(--border)] py-10 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--muted-foreground)]">
            <a
              className="btn-outline text-xs px-4 py-2"
              href={resumePdf}
              download="RISHI_RATHI_RESUME.pdf"
            >
              <Download className="h-3 w-3" /> Resume
            </a>
            <span className="text-[var(--border-bright)]">·</span>
            <span className="font-mono">© {new Date().getFullYear()} Rishi Rathi</span>
            <span className="text-[var(--border-bright)]">·</span>
            <span className="font-mono opacity-50">Built with Java-shaped patience · 一期一会</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
