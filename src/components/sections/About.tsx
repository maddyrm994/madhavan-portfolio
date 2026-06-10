// src/components/sections/About.tsx

"use client";

import React, { useEffect, useRef } from "react";
import { personal, education, stats } from "@/data/resume";
import { MapPin, Mail, Linkedin, ExternalLink } from "lucide-react";

function StatCard({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const start = performance.now();
          const duration = 1400;

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * value);
            if (countRef.current) countRef.current.textContent = String(current);
            if (progress < 1) requestAnimationFrame(tick);
          };

          setTimeout(() => requestAnimationFrame(tick), delay);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.25rem",
        padding: "1.5rem 1rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        flex: "1 1 120px",
        minWidth: "100px",
        transition: "box-shadow var(--transition-base), transform var(--transition-base)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-accent)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "var(--accent-light)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          fontWeight: 700,
          color: "var(--accent)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        <span ref={countRef}>0</span>
        {suffix}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          textAlign: "center",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function About() {
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
      { threshold: 0.15 }
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section section-wash"
    >
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
          <h2>About Me</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left — bio + links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

            {/* Summary */}
            <div
              className="reveal"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
              }}
            >
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "var(--text-secondary)",
                }}
              >
                {personal.summary}
              </p>
            </div>

            {/* Contact links */}
            <div
              className="reveal"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <ContactRow
                icon={<MapPin size={14} />}
                label={personal.location}
                href={undefined}
              />
              <ContactRow
                icon={<Mail size={14} />}
                label={personal.links.email}
                href={`mailto:${personal.links.email}`}
              />
              <ContactRow
                icon={<Linkedin size={14} />}
                label="LinkedIn Profile"
                href={personal.links.linkedin}
              />
            </div>
          </div>

          {/* Right — education */}
          <div
            className="reveal"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Education
            </span>

            {education.map((edu, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: edu.status === "Expected" ? "var(--accent)" : "var(--text-muted)",
                      background: edu.status === "Expected" ? "var(--bg-ice)" : "var(--bg-wash)",
                      border: `1px solid ${edu.status === "Expected" ? "var(--accent-light)" : "var(--border)"}`,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "99px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {edu.status}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  {edu.institution}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          className="reveal"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "3rem",
          }}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 120}
            />
          ))}
        </div>
      </div>

      {/* Responsive grid collapse */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const inner = (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        color: href ? "var(--text-secondary)" : "var(--text-secondary)",
        fontSize: "0.875rem",
        transition: "color var(--transition-fast)",
      }}
    >
      <span style={{ color: "var(--accent)", flexShrink: 0, display: "flex" }}>
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );

  if (!href) return inner;

  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{ display: "inline-flex" }}
      onMouseEnter={(e) =>
        ((e.currentTarget.firstChild as HTMLElement).style.color = "var(--accent)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget.firstChild as HTMLElement).style.color = "var(--text-secondary)")
      }
    >
      {inner}
    </a>
  );
}