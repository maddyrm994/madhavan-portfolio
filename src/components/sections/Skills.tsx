// src/components/sections/Skills.tsx

"use client";

import { useEffect, useRef } from "react";
import { skills } from "@/data/resume";

const CATEGORY_ICONS: Record<string, string> = {
  "Languages":             "{ }",
  "AI/ML & Data Science":  "∂",
  "Libraries & Frameworks":"⌬",
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="skills" ref={sectionRef} className="section section-wash">
      <div className="container">

        {/* Heading */}
        <div
          className="reveal heading-line"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            marginBottom: "3rem",
          }}
        >
          <h2>Skills</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="skills-grid"
        >
          {Object.entries(skills).map(([category, items], i) => (
            <div
              key={category}
              className="reveal card"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    color: "var(--accent)",
                    lineHeight: 1,
                    userSelect: "none",
                    minWidth: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {CATEGORY_ICONS[category] ?? "#"}
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {category}
                </h4>
              </div>

              {/* Thin divider */}
              <div
                style={{
                  height: "1px",
                  background: "linear-gradient(90deg, var(--accent-light), transparent)",
                }}
              />

              {/* Skill pills */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {items.map((skill) => (
                  <SkillPill key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function SkillPill({ label }: { label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className="pill"
      style={{ cursor: "default" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--bg-ice)";
        e.currentTarget.style.color = "var(--accent-dark)";
        e.currentTarget.style.borderColor = "var(--accent-light)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {label}
    </span>
  );
}