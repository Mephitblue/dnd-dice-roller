"use client";
import { useState, useEffect } from "react";

export default function DungeonBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "radial-gradient(ellipse at 50% 30%, #14141f 0%, #0a0a0f 70%)",
        overflow: "hidden",
      }}
    >
      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(212,168,67,0.3)",
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
