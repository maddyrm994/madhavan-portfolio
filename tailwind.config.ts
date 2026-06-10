// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body:    ["Inter",         "sans-serif"],
        mono:    ["JetBrains Mono","monospace" ],
      },
      colors: {
        accent: {
          DEFAULT: "#3B82F6",
          light:   "#BFDBFE",
          dark:    "#1D4ED8",
          glow:    "rgba(59,130,246,0.15)",
        },
        bg: {
          DEFAULT: "#F7F9FC",
          wash:    "#EFF4FB",
          card:    "#FFFFFF",
          ice:     "#E0F2FE",
        },
        text: {
          primary:   "#0F172A",
          secondary: "#64748B",
          muted:     "#94A3B8",
        },
        border: {
          DEFAULT: "#E2E8F0",
          hover:   "#CBD5E1",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
      },
      boxShadow: {
        sm:     "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)",
        md:     "0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04)",
        lg:     "0 12px 40px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.06)",
        accent: "0 4px 24px rgba(59,130,246,0.18)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":      { transform: "translateY(-6px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1",   transform: "scale(1)"    },
          "50%":      { opacity: "0.6", transform: "scale(1.15)" },
        },
      },
      animation: {
        "fade-up":  "fadeUp 0.4s ease both",
        "fade-in":  "fadeIn 0.4s ease both",
        "shimmer":  "shimmer 4s linear infinite",
        "float":    "float 3s ease-in-out infinite",
        "pulse-dot":"pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;