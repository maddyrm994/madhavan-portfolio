// src/components/ui/ScatterCanvas.tsx

"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseOffset: number;
}

interface Connection {
  a: number;
  b: number;
  opacity: number;
}

const POINT_COUNT   = 72;
const MAX_DIST      = 130;
const ACCENT        = "59, 130, 246";   // --accent in RGB
const INDIGO        = "129, 140, 248";  // complementary indigo

export default function ScatterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let points: Point[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initPoints = () => {
      points = Array.from({ length: POINT_COUNT }, () => ({
        x:           Math.random() * canvas.width,
        y:           Math.random() * canvas.height,
        vx:          (Math.random() - 0.5) * 0.35,
        vy:          (Math.random() - 0.5) * 0.35,
        radius:      Math.random() * 2.2 + 1,
        opacity:     Math.random() * 0.5 + 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    const getConnections = (): Connection[] => {
      const connections: Connection[] = [];
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx   = points[i].x - points[j].x;
          const dy   = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            connections.push({ a: i, b: j, opacity: 1 - dist / MAX_DIST });
          }
        }
      }
      return connections;
    };

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move points
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Draw connections
      const connections = getConnections();
      connections.forEach(({ a, b, opacity }) => {
        const pa = points[a];
        const pb = points[b];

        // Alternate accent / indigo along gradient
        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        grad.addColorStop(0, `rgba(${ACCENT}, ${opacity * 0.25})`);
        grad.addColorStop(1, `rgba(${INDIGO},  ${opacity * 0.12})`);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      });

      // Draw points
      points.forEach((p, i) => {
        const pulse = Math.sin(frame * 0.018 + p.pulseOffset) * 0.18;
        const r     = p.radius + pulse;
        const alpha = p.opacity + pulse * 0.4;

        // Outer glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        glow.addColorStop(0, `rgba(${i % 3 === 0 ? INDIGO : ACCENT}, ${alpha * 0.35})`);
        glow.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${i % 4 === 0 ? INDIGO : ACCENT}, ${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    initPoints();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      initPoints();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}