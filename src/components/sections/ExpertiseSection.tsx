"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Cpu, BrainCircuit, Workflow } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const iconMap: Record<string, any> = {
  Layers,
  Cpu,
  BrainCircuit,
  Workflow,
};

const TITLE_WORDS = ["What", "I", "Build"];

export default function ExpertiseSection() {
  const capabilities = portfolioData.capabilities;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="expertise" className="relative overflow-hidden">
      {/* ── TOP: Premium animated Expertise hero ── */}
      <div
        className="relative h-svh w-full flex items-center justify-center overflow-hidden"
        style={{ background: "#04050a" }}
      >
        {/* Deep radial bg gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(13,26,58,0.9) 0%, #04050a 70%)",
          }}
        />

        {/* Animated dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,242,254,0.45) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            opacity: 0.045,
          }}
        />

        {/* Large ambient glow orbs */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 700, height: 700,
            top: "50%", left: "30%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(127,82,255,0.12) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 500, height: 500,
            top: "50%", left: "70%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(0,242,254,0.09) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Horizontal scan line */}
        <motion.div
          className="absolute inset-x-0 pointer-events-none"
          style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(0,242,254,0.2) 40%, rgba(127,82,255,0.2) 60%, transparent 100%)" }}
          animate={{ top: ["30%", "70%", "30%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Corner brackets — cinematic HUD feel */}
        {[
          { top: "10%" as const, left: "5%" as const,   borderTop: "1px solid rgba(0,242,254,0.25)", borderLeft: "1px solid rgba(0,242,254,0.25)" },
          { top: "10%" as const, right: "5%" as const,  borderTop: "1px solid rgba(0,242,254,0.25)", borderRight: "1px solid rgba(0,242,254,0.25)" },
          { bottom: "10%" as const, left: "5%" as const,   borderBottom: "1px solid rgba(0,242,254,0.25)", borderLeft: "1px solid rgba(0,242,254,0.25)" },
          { bottom: "10%" as const, right: "5%" as const,  borderBottom: "1px solid rgba(0,242,254,0.25)", borderRight: "1px solid rgba(0,242,254,0.25)" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 sm:w-12 sm:h-12 pointer-events-none"
            style={pos}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.8 + i * 0.1 }}
          />
        ))}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 select-none">
          {/* Label */}
          <motion.div
            className="flex items-center gap-2 mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00f2fe]" />
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-white/40">Expertise</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#7f52ff]" />
          </motion.div>

          {/* Main heading */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
            {TITLE_WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight"
                style={{
                  background: i === 2
                    ? "linear-gradient(135deg, #00f2fe 0%, #7f52ff 100%)"
                    : undefined,
                  WebkitBackgroundClip: i === 2 ? "text" : undefined,
                  WebkitTextFillColor: i === 2 ? "transparent" : "rgba(255,255,255,0.95)",
                  backgroundClip: i === 2 ? "text" : undefined,
                }}
                initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
                animate={mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Sub-line */}
          <motion.p
            className="text-sm sm:text-base text-white/40 max-w-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            From autonomous AI agents to production-grade web systems —<br className="hidden sm:block" /> every layer, end-to-end.
          </motion.p>

          {/* Animated capability pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-xl"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            {["React · Next.js", "Node.js · Express", "Gemini AI · LangGraph", "WebRTC · n8n", "MongoDB · REST APIs"].map((pill, i) => (
              <motion.span
                key={pill}
                className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: i % 2 === 0 ? "rgba(0,242,254,0.2)" : "rgba(127,82,255,0.2)",
                  color: i % 2 === 0 ? "rgba(0,242,254,0.7)" : "rgba(127,82,255,0.7)",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.07 }}
                whileHover={{ y: -2, scale: 1.05 }}
              >
                {pill}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/25">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,242,254,0.4)" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>


      {/* ── BOTTOM: Capabilities bento grid ───────────────────────────────── */}
      <div
        className="relative py-16 md:py-24"
        style={{ background: "linear-gradient(to bottom, #04050a 0%, #060810 100%)" }}
      >
        {/* Side glows — hidden on small screens */}
        <div
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse at left, rgba(127,82,255,0.5), transparent 70%)" }}
        />
        <div
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse at right, rgba(0,242,254,0.4), transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Core Capabilities</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mt-1">
              Full-Stack · AI · Systems Engineering
            </h3>
          </motion.div>

          {/* Bento grid — 1 col mobile, 2 col sm, 3 col md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {capabilities.map((cap, i) => {
              const Icon = iconMap[cap.icon] ?? Layers;
              const isWide = cap.span?.includes("col-span-2");
              return (
                <motion.div
                  key={cap.id}
                  className={`premium-card p-5 sm:p-6 md:p-7 group relative overflow-hidden ${
                    isWide ? "sm:col-span-2" : ""
                  }`}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${cap.accent}22 0%, transparent 70%)`,
                      transform: "translate(30%, -30%)",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${cap.accent}18`, border: `1px solid ${cap.accent}30` }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: cap.accent }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {cap.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{cap.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full"
                        style={{
                          color: cap.accent,
                          background: `${cap.accent}15`,
                          border: `1px solid ${cap.accent}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, ${cap.accent}, transparent)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
