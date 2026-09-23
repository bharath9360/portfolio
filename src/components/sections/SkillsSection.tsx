"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Sparkles, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const LEVEL_CONFIG: Record<string, { pct: number; label: string; color: string }> = {
  Expert:   { pct: 95, label: "Expert",   color: "var(--accent-primary)" },
  Advanced: { pct: 80, label: "Advanced", color: "var(--accent-secondary)" },
  Skilled:  { pct: 65, label: "Skilled",  color: "#10b981" },
};

const DEFAULT_LEVEL = { pct: 65, label: "Skilled", color: "#10b981" };

const CATEGORY_ACCENTS = [
  "var(--accent-primary)",
  "var(--accent-secondary)",
  "#f59e0b",
  "#10b981",
];

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
            style={{ background: accent }}
          />
          <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-colors">
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

      <div className="relative h-1.5 rounded-full overflow-hidden bg-[var(--card-border)]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${cfg.pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

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
      className="relative rounded-2xl p-px overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)]"
    >
      <div className="relative rounded-[14px] p-5 sm:p-6 backdrop-blur-xl">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between gap-3 mb-0 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: accent }}
            />
            <h3 className="text-sm sm:text-[15px] font-bold text-[var(--text-primary)] text-left">
              {category.categoryName}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              {category.skills.length} skills
            </span>
            <ChevronDown
              size={14}
              className={`text-[var(--text-secondary)] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </button>

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
          className="px-3 py-1.5 rounded-full text-xs font-semibold border cursor-default select-none transition-colors"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
            color: "var(--text-secondary)",
          }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const categories = portfolioData.skills;
  const { theme } = useTheme();

  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-obsidian)] transition-colors duration-300"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
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
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={12} className="text-[var(--accent-primary)]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[var(--accent-primary)]">
              Tech Stack
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-5">
            <span className="text-[var(--text-primary)]">Skills</span>
            <span className="text-[var(--text-tertiary)]"> &amp;</span>
            <br className="sm:hidden" />
            <span className="section-heading-accent sm:ml-3">
              Technologies
            </span>
          </h2>
          <p className="section-subtext max-w-md mx-auto">
            A curated stack built through real-world projects, internships, and autonomous AI systems.
          </p>
        </motion.div>

        <FloatingPills />

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
              <div className="text-3xl sm:text-4xl font-black mb-0.5 text-gradient-ai">
                {stat.value}
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-widest font-semibold font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
