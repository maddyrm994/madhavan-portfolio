// src/components/ui/SectionHeading.tsx

// Section headings are rendered inline in each section component
// using the .heading-line CSS class from globals.css, which appends
// the animated blue-to-indigo underline via ::after.
//
// Example usage already present in every section:
//
//   <div className="reveal heading-line" style={{ ... }}>
//     <h2>About Me</h2>
//   </div>
//
// If you want a reusable component later, here's the canonical shape:

"use client";

interface SectionHeadingProps {
  children: React.ReactNode;
  delay?: number;
}

export default function SectionHeading({ children, delay = 0 }: SectionHeadingProps) {
  return (
    <div
      className="reveal heading-line"
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        marginBottom: "3rem",
      }}
    >
      <h2>{children}</h2>
    </div>
  );
}