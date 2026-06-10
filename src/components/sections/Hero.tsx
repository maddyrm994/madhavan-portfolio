// src/components/sections/Hero.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { personal, stats } from "@/data/resume";
import ScatterCanvas from "@/components/ui/ScatterCanvas";
import { ArrowDown, Mail, Linkedin, ExternalLink } from "lucide-react";

const TYPED_STRINGS = [
  "Data Science",
  "Machine Learning",
  "Computer Vision",
  "Generative AI",
];

function useTypewriter(strings: string[], speed = 70, pause = 1800) {
  const [display, setDisplay]   = useState("");
  const [strIndex, setStrIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIndex + 1));
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIndex((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIndex - 1));
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setStrIndex((s) => (s + 1) % strings.length);
            setCharIndex(0);
          } else {
            setCharIndex((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [display, charIndex, deleting, strIndex, strings, speed, pause]);

  return display;
}

export default function Hero() {
  const typed      = useTypewriter(TYPED_STRINGS);
  const heroRef    = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax on mouse move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 12;
      const y = (e.clientY / h - 0.5) * 8;
      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const onLeave = () => {
      if (contentRef.current) {
        contentRef.current.style.transform = "translate(0, 0)";
      }
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Staggered entrance
  useEffect(() => {
    const items = contentRef.current?.querySelectorAll<HTMLElement>(".hero-item");
    items?.forEach((el, i) => {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(28px)";
      setTimeout(() => {
        el.style.transition = `opacity 0.65s ease, transform 0.65s ease`;
        el.style.opacity    = "1";
        el.style.transform  = "translateY(0)";
      }, 200 + i * 120);
    });
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="noise"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(160deg, var(--bg) 0%, var(--bg-ice) 50%, var(--bg) 100%)",
      }}
    >
      {/* Scatter plot canvas */}
      <ScatterCanvas />

      {/* Radial glow behind text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 2, paddingTop: "5rem" }}
      >
        <div
          ref={contentRef}
          style={{
            maxWidth: "720px",
            transition: "transform 0.12s ease-out",
          }}
        >

          {/* Eyebrow */}
          <div
            className="hero-item"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.5rem",
              padding: "0.35rem 0.85rem 0.35rem 0.5rem",
              borderRadius: "99px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                padding: "0.15rem 0.5rem",
                borderRadius: "99px",
                background: "var(--accent)",
                color: "#fff",
                letterSpacing: "0.06em",
                fontWeight: 500,
              }}
            >
              OPEN TO WORK
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                letterSpacing: "0.03em",
              }}
            >
              Chennai, India · Full-time
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-item"
            style={{ marginBottom: "0.5rem" }}
          >
            <span
              className="shimmer-text"
              style={{
                display: "block",
                fontWeight: 700,
              }}
            >
              Madhavan R Mohan
            </span>
          </h1>

          {/* Typewriter role */}
          <div
            className="hero-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              height: "2rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                color: "var(--accent)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              {typed}
            </span>
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.1em",
                background: "var(--accent)",
                borderRadius: "1px",
                animation: "pulse-dot 0.9s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
          </div>

          {/* Summary */}
          <p
            className="hero-item"
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              maxWidth: "560px",
              marginBottom: "2.25rem",
            }}
          >
            {personal.summary}
          </p>

          {/* CTA row */}
          <div
            className="hero-item"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "3rem",
            }}
          >
            {/* Primary CTA */}
            <a
              href={`mailto:${personal.links.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.5rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--accent)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                boxShadow: "var(--shadow-accent)",
                transition:
                  "background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background  = "var(--accent-dark)";
                e.currentTarget.style.transform   = "translateY(-2px)";
                e.currentTarget.style.boxShadow   = "0 8px 32px rgba(59,130,246,0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background  = "var(--accent)";
                e.currentTarget.style.transform   = "translateY(0)";
                e.currentTarget.style.boxShadow   = "var(--shadow-accent)";
              }}
            >
              <Mail size={15} />
              Get in Touch
            </a>

            {/* Secondary CTA */}
            <a
              href={personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.5rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                transition:
                  "border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-light)";
                e.currentTarget.style.transform   = "translateY(-2px)";
                e.currentTarget.style.boxShadow   = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform   = "translateY(0)";
                e.currentTarget.style.boxShadow   = "var(--shadow-sm)";
              }}
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>

          {/* Mini stats strip */}
          <div
            className="hero-item"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              paddingTop: "1.75rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}{s.suffix}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          opacity: 0.6,
          transition: "opacity var(--transition-fast)",
          animation: "float 2.8s ease-in-out infinite",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <ArrowDown size={14} color="var(--text-muted)" />
      </button>
    </section>
  );
}