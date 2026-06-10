// src/components/layout/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import { personal } from "@/data/resume";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen,     setMenuOpen]     = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background var(--transition-base), box-shadow var(--transition-base)",
          background: scrolled
            ? "rgba(247, 249, 252, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Madhavan
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--accent)",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              PORTFOLIO
            </span>
          </button>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: isActive ? "var(--accent-glow)" : "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    transition:
                      "color var(--transition-fast), background var(--transition-fast)",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.background = "var(--bg-wash)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.background = "none";
                    }
                  }}
                >
                  {link.label}
                </button>
              );
            })}

            {/* CTA */}
            <a
              href={`mailto:${personal.links.email}`}
              style={{
                marginLeft: "0.5rem",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--accent)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                transition:
                  "background var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast)",
                boxShadow: "var(--shadow-accent)",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-dark)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="mobile-menu-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
              color: "var(--text-primary)",
              display: "none",
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 49,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          zIndex: 49,
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border)",
          padding: menuOpen ? "1rem 0 1.5rem" : "0",
          maxHeight: menuOpen ? "320px" : "0",
          overflow: "hidden",
          transition: "max-height var(--transition-slow), padding var(--transition-slow)",
          boxShadow: menuOpen ? "var(--shadow-md)" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: isActive ? "var(--accent-glow)" : "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.75rem 0.85rem",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  textAlign: "left",
                  width: "100%",
                  transition: "color var(--transition-fast), background var(--transition-fast)",
                }}
              >
                {link.label}
              </button>
            );
          })}

          <a
            href={`mailto:${personal.links.email}`}
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem 0.85rem",
              borderRadius: "var(--radius-sm)",
              background: "var(--accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 500,
              textAlign: "center",
              display: "block",
            }}
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* Hide/show desktop vs mobile nav via plain CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav   { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}