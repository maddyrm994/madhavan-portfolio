// src/components/sections/Experience.tsx

"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/data/resume";

export default function Experience() {
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
    <section id="experience" ref={sectionRef} className="section">
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
          <h2>Experience</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {experience.map((role, i) => (
            <div
              key={i}
              className="reveal card card-accent"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                padding: "2rem 2.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Role header */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {role.title}
                    </h3>
                    {role.current && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.2rem 0.65rem",
                          borderRadius: "99px",
                          background: "rgba(34, 197, 94, 0.1)",
                          border: "1px solid rgba(34, 197, 94, 0.25)",
                        }}
                      >
                        <span className="live-dot" />
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.65rem",
                            color: "#16A34A",
                            fontWeight: 500,
                            letterSpacing: "0.05em",
                          }}
                        >
                          CURRENT
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      {role.company}
                    </span>
                    <span style={{ color: "var(--border)", fontSize: "0.75rem" }}>·</span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {role.location}
                    </span>
                  </div>
                </div>

                {/* Period badge */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    background: "var(--bg-wash)",
                    border: "1px solid var(--border)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    whiteSpace: "nowrap",
                    alignSelf: "flex-start",
                  }}
                >
                  {role.period}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "linear-gradient(90deg, var(--accent-light), transparent)",
                }}
              />

              {/* Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {role.highlights.map((item, j) => (
                  <HighlightRow key={j} tag={item.tag} description={item.description} index={j} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightRow({
  tag,
  description,
  index,
}: {
  tag: string;
  description: string;
  index: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      {/* Left accent line */}
      <div
        style={{
          width: "2px",
          minHeight: "100%",
          background: `linear-gradient(180deg, var(--accent) 0%, var(--accent-light) 100%)`,
          borderRadius: "99px",
          flexShrink: 0,
          marginTop: "2px",
          opacity: 0.5 + index * 0.15,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {/* Tag pill */}
        <span
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 500,
            color: "var(--accent-dark)",
            background: "var(--bg-ice)",
            border: "1px solid var(--accent-light)",
            padding: "0.15rem 0.6rem",
            borderRadius: "99px",
            letterSpacing: "0.04em",
          }}
        >
          {tag}
        </span>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}