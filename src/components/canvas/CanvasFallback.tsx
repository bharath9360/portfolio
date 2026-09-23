"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function CanvasFallback() {
  const { theme } = useTheme();

  const isLight = theme === "light";
  const isEmerald = theme === "emerald";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 transition-colors duration-300 ${
        isLight ? "bg-[#f8fafc]" : isEmerald ? "bg-[#031716]" : "bg-[#04050a]"
      }`}
    >
      {/* Deep radial gradients */}
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] ${
          isLight
            ? "bg-[#0284c7]/15"
            : isEmerald
            ? "bg-[#00ff9d]/15"
            : "bg-[#00f2fe]/10"
        }`}
      />
      <div
        className={`absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] ${
          isLight
            ? "bg-[#6366f1]/15"
            : isEmerald
            ? "bg-[#00e5ff]/15"
            : "bg-[#7f52ff]/10"
        }`}
      />
      <div
        className={`absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px] ${
          isLight
            ? "bg-[#0d9488]/15"
            : isEmerald
            ? "bg-[#10b981]/15"
            : "bg-[#2575fc]/10"
        }`}
      />

      {/* Subtle grid pattern */}
      <div
        className={`absolute inset-0 ${isLight ? "opacity-[0.05]" : "opacity-[0.03]"}`}
        style={{
          backgroundImage: isLight
            ? "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)"
            : "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
