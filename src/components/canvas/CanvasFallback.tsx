"use client";

import React from "react";

export default function CanvasFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#04050a]">
      {/* Deep radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00f2fe]/10 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7f52ff]/10 blur-[140px]" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#2575fc]/10 blur-[150px]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
