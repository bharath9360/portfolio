"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Sparkles, ChevronDown } from "lucide-react";

// ── Level config ────────────────────────────────────────────────────────────
const LEVEL_CONFIG: Record<string, { pct: number; label: string; color: string }> = {
  Expert:   { pct: 95, label: "Expert",   color: "#00f2fe" },
  Advanced: { pct: 80, label: "Advanced", color: "#7f52ff" },
  Skilled:  { pct: 65, label: "Skilled",  color: "#10b981" },
};

const DEFAULT_LEVEL = { pct: 65, label: "Skilled", color: "#10b981" };

const CATEGORY_ACCENTS = [
  "#00f2fe",
  "#7f52ff",
  "#f59e0b",
  "#10b981",
];

// ── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({
  name,
  level,
  index,
  accent,
}: {
  name: string;
  level?: string;
  index: number;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const cfg = (level && LEVEL_CONFIG[level]) ? LEVEL_CONFIG[level] : DEFAULT_LEVEL;

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
          />
          <span className="text-sm font-medium text-white/85 group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
        <span
          className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
          style={{ color: cfg.color, background: `${cfg.color}15`, border: `1px solid ${cfg.color}30` }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Bar track */}
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        {/* Glow underneath */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `${accent}20`, filter: "blur(4px)" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${cfg.pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Bar fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${cfg.pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Shine sweep */}
        <motion.div
          className="absolute inset-y-0 w-16 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
          initial={{ left: "-15%" }}
          animate={inView ? { left: "110%" } : { left: "-15%" }}
          transition={{ duration: 1.0, delay: 0.4 + index * 0.07, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ── Category Panel ─────────────────────────────────────────────────────────────
function CategoryPanel({
  category,
  catIndex,
  accent,
}: {
  category: { categoryName: string; skills: { name: string; level?: string }[] };
  catIndex: number;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: catIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl p-px overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accent}30, rgba(255,255,255,0.04), transparent)`,
      }}
    >
      {/* Hover ambient glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}18, transparent 60%)` }}
      />

      <div
        className="relative rounded-[14px] p-5 sm:p-6"
        style={{ background: "rgba(6,8,16,0.95)" }}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between gap-3 mb-0 group/btn"
        >
          <div className="flex items-center gap-3">
            {/* Accent dot */}
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: accent, boxShadow: `0 0 10px ${accent}80` }}
            />
            <h3 className="text-sm sm:text-[15px] font-bold text-white text-left">
              {category.categoryName}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-white/30">
              {category.skills.length} skills
            </span>
            <ChevronDown
              size={14}
              className={`text-white/40 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Skills */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                {category.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={i}
                    accent={accent}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Floating skill pill (decorative top row) ──────────────────────────────────
const TOP_SKILLS = [
  "React.js", "Next.js", "Node.js", "Python", "MongoDB",
  "Tailwind CSS", "LangGraph", "Gemini AI", "WebRTC", "n8n",
];

function FloatingPills() {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16">
      {TOP_SKILLS.map((s, i) => (
        <motion.span
          key={s}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3, scale: 1.05 }}
          className="px-3 py-1.5 rounded-full text-xs font-semibold border cursor-default select-none"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const categories = portfolioData.skills;

  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #06080f 0%, #04050a 100%)" }}
    >
      {/* Background glows */}
      <div
        className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(127,82,255,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[15%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,242,254,0.06) 0%, transparent 70%)" }}
      />
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
            style={{
              background: "rgba(0,242,254,0.06)",
              borderColor: "rgba(0,242,254,0.2)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={12} style={{ color: "#00f2fe" }} />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/50">
              Tech Stack
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-5">
            <span className="text-white">Skills</span>
            <span className="text-white/20"> &amp;</span>
            <br className="sm:hidden" />
            <span
              className="text-transparent bg-clip-text sm:ml-3"
              style={{ backgroundImage: "linear-gradient(135deg, #7f52ff 0%, #00f2fe 100%)" }}
            >
              Technologies
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/40 max-w-md mx-auto leading-relaxed">
            A curated stack built through real-world projects, internships, and autonomous AI systems.
          </p>
        </motion.div>

        {/* Floating pill cloud */}
        <FloatingPills />

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {categories.map((cat, i) => (
            <CategoryPanel
              key={cat.categoryName}
              category={cat}
              catIndex={i}
              accent={CATEGORY_ACCENTS[i % CATEGORY_ACCENTS.length]}
            />
          ))}
        </div>

        {/* Bottom summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { label: "Total Skills", value: categories.reduce((s, c) => s + c.skills.length, 0).toString() },
            { label: "Expert Level", value: categories.reduce((s, c) => s + c.skills.filter(sk => sk.level === "Expert").length, 0).toString() },
            { label: "Categories", value: categories.length.toString() },
            { label: "Years Active", value: "3+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-black mb-0.5 text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #00f2fe, #7f52ff)" }}
              >
                {stat.value}
              </div>
              <div className="text-[11px] text-white/35 uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
