"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export interface HeroFuturisticProps {
  children?: React.ReactNode;
  className?: string;
}

export default function HeroFuturistic({
  children,
  className = "",
}: HeroFuturisticProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = theme === "light";
  const isEmerald = theme === "emerald";

  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-colors duration-300 ${
        isLight ? "bg-[#f8fafc]" : isEmerald ? "bg-[#031716]" : "bg-[#04050a]"
      } ${className}`}
    >
      {/* Animated dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isLight
            ? "radial-gradient(circle, rgba(2,132,199,0.3) 1px, transparent 1px)"
            : isEmerald
            ? "radial-gradient(circle, rgba(0,255,157,0.35) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0,242,254,0.45) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          opacity: 0.05,
        }}
      />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: isLight
            ? "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)"
            : isEmerald
            ? "radial-gradient(circle, rgba(0,255,157,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(127,82,255,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
