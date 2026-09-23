"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Cpu, BrainCircuit, Workflow, Sparkles, Bot, Database, Zap } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import HeroFuturistic from "@/components/ui/HeroFuturistic";
import { useTheme } from "@/context/ThemeContext";

const iconMap: Record<string, any> = {
  Cpu,
  BrainCircuit,
  Workflow,
  Layers,
};

const TITLE_WORDS = ["What", "I", "Build"];

export default function ExpertiseSection() {
  const capabilities = portfolioData.capabilities;
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isLight = theme === "light";
  const isEmerald = theme === "emerald";

  return (
    <section id="expertise" className="relative overflow-hidden w-full">
      {/* ── TOP: Premium animated Expertise hero ── */}
      <div className="relative min-h-[75vh] md:min-h-[85vh] py-16 md:py-24 w-full overflow-hidden flex items-center justify-center">
        <HeroFuturistic className="absolute inset-0" />

        {/* Semi-transparent overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isLight
              ? "rgba(248,250,252,0.4)"
              : isEmerald
              ? "rgba(3,23,22,0.5)"
              : "rgba(4,5,10,0.45)",
          }}
        />

        {/* Horizontal scan line */}
        <motion.div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, var(--accent-primary) 40%, var(--accent-secondary) 60%, transparent 100%)",
          }}
          animate={{ top: ["30%", "70%", "30%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Corner HUD brackets */}
        {[
          { top: "8%" as const, left: "4%" as const,   borderTop: "1px solid var(--accent-primary)", borderLeft: "1px solid var(--accent-primary)" },
          { top: "8%" as const, right: "4%" as const,  borderTop: "1px solid var(--accent-primary)", borderRight: "1px solid var(--accent-primary)" },
          { bottom: "8%" as const, left: "4%" as const,   borderBottom: "1px solid var(--accent-primary)", borderLeft: "1px solid var(--accent-primary)" },
          { bottom: "8%" as const, right: "4%" as const,  borderBottom: "1px solid var(--accent-primary)", borderRight: "1px solid var(--accent-primary)" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 sm:w-12 sm:h-12 pointer-events-none hidden sm:block opacity-30"
            style={pos}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={mounted ? { opacity: 0.3, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.8 + i * 0.1 }}
          />
        ))}

        {/* Main content — 100% Centered Layout */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6 select-none">
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--accent-primary)]" />
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-[var(--accent-primary)]">
              EXPERTISE
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--accent-secondary)]" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
            {TITLE_WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight text-center"
                style={{
                  background: i === 2 ? "var(--hero-gradient)" : undefined,
                  WebkitBackgroundClip: i === 2 ? "text" : undefined,
                  WebkitTextFillColor: i === 2 ? "transparent" : "var(--text-primary)",
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

          <motion.p
            className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed mb-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            From autonomous AI agents and RAG knowledge bases to zero-touch automation &amp; production web systems —<br className="hidden sm:block" /> every layer, end-to-end.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            {[
              { label: "LangGraph · AI Agents", color: "#7f52ff" },
              { label: "RAG · Vector Search", color: "#00f2fe" },
              { label: "Zero-Touch Automation · n8n", color: "#10b981" },
              { label: "Next.js · Full-Stack Systems", color: "#2575fc" },
            ].map((pill, i) => (
              <motion.span
                key={pill.label}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-2 shadow-sm"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                  color: pill.color,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.07 }}
                whileHover={{ y: -2, scale: 1.05 }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: pill.color }} />
                <span>{pill.label}</span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM: Core Capabilities grid with AI, RAG & Automation Themes ── */}
      <div className="relative py-16 md:py-24 bg-[var(--bg-obsidian)] transition-colors duration-300">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Core Engineering Pillars</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mt-1">
              AI Agents · RAG · Automation · Full-Stack
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto mt-2">
              Specialized technical architectures delivered with production reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {capabilities.map((cap, i) => {
              const Icon = iconMap[cap.icon] ?? Layers;
              return (
                <motion.div
                  key={cap.id}
                  className="premium-card p-6 sm:p-8 group relative overflow-hidden flex flex-col justify-between"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Subtle top background glow */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-500 blur-2xl"
                    style={{ background: cap.accent }}
                  />

                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
                        style={{ background: `${cap.accent}18`, border: `1px solid ${cap.accent}40` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: cap.accent }} />
                      </div>

                      {cap.badge && (
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border shadow-sm"
                          style={{
                            color: cap.accent,
                            background: `${cap.accent}15`,
                            borderColor: `${cap.accent}35`,
                          }}
                        >
                          <span className="relative flex h-2 w-2">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{ background: cap.accent }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-2 w-2"
                              style={{ background: cap.accent }}
                            />
                          </span>
                          <span>{cap.badge}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2.5 leading-snug">
                      {cap.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                      {cap.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-4 border-t border-[var(--card-border)]">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all"
                          style={{
                            color: cap.accent,
                            background: `${cap.accent}12`,
                            border: `1px solid ${cap.accent}25`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
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
