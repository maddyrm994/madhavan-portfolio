// src/app/layout.tsx

import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Madhavan R Mohan — Portfolio",
  description:
    "Portfolio of Madhavan R Mohan, a Data Scientist based in Chennai, India. Specializing in Computer Vision, Generative AI, and Predictive Modeling.",
  keywords: [
    "Data Science",
    "Machine Learning",
    "Computer Vision",
    "Generative AI",
    "IIT Madras",
    "Chennai",
    "Python",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}