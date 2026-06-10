// src/components/layout/Footer.tsx

"use client";

import { personal } from "@/data/resume";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-card)",
        padding: "2.5rem 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.25rem",
        }}
      >
        {/* Left — name + copyright */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            Madhavan R Mohan
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
            }}
          >
            © {year} · All Rights Reserved
          </span>
        </div>

        {/* Right — links */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href={`mailto:${personal.links.email}`}
            aria-label="Email"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              transition: "color var(--transition-fast)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            <Mail size={14} />
            <span>Email</span>
          </a>

          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              transition: "color var(--transition-fast)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}