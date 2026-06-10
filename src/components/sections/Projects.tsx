// src/components/sections/Projects.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/resume";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ML:          { bg: "rgba(59,130,246,0.08)",  text: "var(--accent-dark)",  border: "var(--accent-light)"    },
  Analytics:   { bg: "rgba(99,102,241,0.08)",  text: "#4338CA",             border: "rgba(99,102,241,0.3)"   },
  Engineering: { bg: "rgba(16,185,129,0.08)",  text: "#065F46",             border: "rgba(16,185,129,0.3)"   },
};

const ALL_CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const sectionRef   = useRef<HTMLElement>(null);
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const children = el.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section">
      <div className="container">

        {/* Heading */}
        <div
          className="reveal heading-line"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            marginBottom: "2rem",
          }}
        >
          <h2>Projects</h2>
        </div>

        {/* Filter tabs */}
        <div
          className="reveal"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "0.35rem 1rem",
                borderRadius: "99px",
                border: active === cat
                  ? "1px solid var(--accent)"
                  : "1px solid var(--border)",
                background: active === cat ? "var(--accent)" : "var(--bg-card)",
                color: active === cat ? "#fff" : "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 500,
                cursor: "pointer",
                transition:
                  "background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast)",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => {
                if (active !== cat) {
                  e.currentTarget.style.borderColor = "var(--accent-light)";
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== cat) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="projects-grid"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const colors = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS["ML"];

  // Tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)";
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="card card-accent"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "transform 0.15s ease, box-shadow var(--transition-base), border-color var(--transition-base)",
        transformStyle: "preserve-3d",
        animationDelay: `${index * 0.08}s`,
        cursor: "default",
      }}
    >
      {/* Top row — category badge + period */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 500,
            padding: "0.2rem 0.65rem",
            borderRadius: "99px",
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {project.category}
        </span>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--text-muted)",
          }}
        >
          {project.period}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: hovered ? "var(--accent)" : "var(--text-primary)",
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
          transition: "color var(--transition-fast)",
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.75,
          margin: 0,
          flexGrow: 1,
        }}
      >
        {project.description}
      </p>

      {/* Bottom row — stack pills + metric */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginTop: "auto",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Stack pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="pill pill-neutral"
              style={{ fontSize: "0.68rem", padding: "0.15rem 0.55rem" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metric callout */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--accent)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {project.metric.value}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {project.metric.label}
          </span>
        </div>
      </div>
    </div>
  );
}