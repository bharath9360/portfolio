"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import {
  BriefcaseIcon,
  GraduationCap,
  Award,
  CheckCircle2,
  CalendarDays,
  Building2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type CardEntry = {
  type: "experience" | "education" | "certification";
  title: string;
  org: string;
  period: string;
  description: string;
  bullets?: string[];
  accent: string;
};

function buildEntries(): CardEntry[] {
  const entries: CardEntry[] = [];
  portfolioData.experience.forEach((exp) => {
    entries.push({
      type: "experience",
      title: exp.role,
      org: exp.company,
      period: exp.period,
      description: exp.description,
      bullets: exp.keyAchieved,
      accent: exp.accent,
    });
  });
  entries.push({
    type: "education",
    title: "B.E. Computer Science Engineering",
    org: "M.A.M College of Engineering and Technology",
    period: "2022 – 2026",
    description: "CGPA: 8.0 · Specialization in AI, Full-Stack Systems, and Computer Science fundamentals.",
    accent: "#7f52ff",
  });
  portfolioData.certifications.slice(0, 2).forEach((cert) => {
    entries.push({
      type: "certification",
      title: cert.title,
      org: cert.issuer,
      period: cert.date,
      description: "",
      accent: "#10b981",
    });
  });
  return entries;
}

const TYPE_CONFIG = {
  experience: {
    icon: BriefcaseIcon,
    label: "Experience",
  },
  education: {
    icon: GraduationCap,
    label: "Education",
  },
  certification: {
    icon: Award,
    label: "Certification",
  },
};

// ── Single Timeline Item ────────────────────────────────────────────────────
function TimelineItem({
  entry,
  index,
  isLast,
}: {
  entry: CardEntry;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cfg = TYPE_CONFIG[entry.type];
  const Icon = cfg.icon;
  const isRight = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-0 md:gap-8">
      {/* ── MOBILE: simple left-aligned layout ────────── */}
      <div className="flex md:hidden items-start gap-4 w-full">
        {/* Dot + line */}
        <div className="flex flex-col items-center shrink-0 pt-1">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg shrink-0"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${entry.accent}, ${entry.accent}88)`,
              boxShadow: `0 0 20px ${entry.accent}50`,
            }}
          >
            <Icon size={16} className="text-white" />
          </motion.div>
          {!isLast && (
            <div
              className="w-px flex-1 mt-2"
              style={{
                background: `linear-gradient(to bottom, ${entry.accent}60, transparent)`,
                minHeight: "60px",
              }}
            />
          )}
        </div>

        {/* Card */}
        <motion.div
          className="flex-1 mb-10"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        >
          <ExperienceCard entry={entry} cfg={cfg} accent={entry.accent} />
        </motion.div>
      </div>

      {/* ── DESKTOP: alternating two-column layout ─── */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] w-full items-start gap-6">
        {/* LEFT card or spacer */}
        <div className="flex justify-end">
          {isRight ? (
            <motion.div
              className="w-full max-w-[400px]"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ExperienceCard entry={entry} cfg={cfg} accent={entry.accent} alignRight />
            </motion.div>
          ) : (
            <div />
          )}
        </div>

        {/* CENTER dot + line */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-xl shrink-0"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${entry.accent}, ${entry.accent}88)`,
              boxShadow: `0 0 24px ${entry.accent}55`,
              border: `2px solid ${entry.accent}40`,
            }}
          >
            <Icon size={18} className="text-white" />
          </motion.div>
          {!isLast && (
            <div
              className="w-px flex-1 mt-1"
              style={{
                background: `linear-gradient(to bottom, ${entry.accent}50, transparent)`,
                minHeight: "80px",
              }}
            />
          )}
        </div>

        {/* RIGHT card or spacer */}
        <div className="flex justify-start">
          {!isRight ? (
            <motion.div
              className="w-full max-w-[400px]"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ExperienceCard entry={entry} cfg={cfg} accent={entry.accent} />
            </motion.div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Card Component ──────────────────────────────────────────────────────────
function ExperienceCard({
  entry,
  cfg,
  accent,
  alignRight = false,
}: {
  entry: CardEntry;
  cfg: (typeof TYPE_CONFIG)[keyof typeof TYPE_CONFIG];
  accent: string;
  alignRight?: boolean;
}) {
  return (
    <div
      className="relative group rounded-2xl p-px overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accent}30, rgba(255,255,255,0.05), transparent)`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at ${alignRight ? "bottom right" : "bottom left"}, ${accent}20, transparent 70%)`,
        }}
      />
      <div
        className="relative rounded-[14px] p-5 sm:p-6"
        style={{ background: "rgba(6, 8, 16, 0.96)" }}
      >
        {/* Top row: label + period */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
            style={{
              color: accent,
              background: `${accent}15`,
              borderColor: `${accent}30`,
            }}
          >
            {cfg.label}
          </span>
          <div className="flex items-center gap-1.5 text-white/40">
            <CalendarDays size={11} />
            <span className="text-[11px] font-mono">{entry.period}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[15px] sm:text-base font-bold text-white leading-snug mb-2">
          {entry.title}
        </h3>

        {/* Org */}
        <div className="flex items-center gap-1.5 mb-3">
          <Building2 size={12} style={{ color: accent }} className="shrink-0" />
          <p className="text-xs text-white/50 leading-snug">{entry.org}</p>
        </div>

        {/* Description */}
        {entry.description && (
          <p className="text-xs sm:text-[13px] text-white/45 leading-relaxed mb-4 border-l-2 pl-3"
            style={{ borderColor: `${accent}40` }}
          >
            {entry.description}
          </p>
        )}

        {/* Bullets */}
        {entry.bullets && entry.bullets.length > 0 && (
          <ul className="space-y-2">
            {entry.bullets.map((b, bi) => (
              <li key={bi} className="flex gap-2 text-xs text-white/60 leading-relaxed">
                <CheckCircle2
                  size={13}
                  style={{ color: accent }}
                  className="shrink-0 mt-0.5"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function ExperienceEducationSection() {
  const entries = buildEntries();

  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #04050a 0%, #06080f 100%)" }}
    >
      {/* Background ambient glows */}
      <div className="absolute top-[15%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(127,82,255,0.07) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,242,254,0.07) 0%, transparent 70%)" }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "100% 48px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-white/35 mb-4">
            Timeline
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-5">
            <span className="text-white">Experience</span>
            <span className="text-white/20"> &amp;</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00f2fe 0%, #7f52ff 100%)",
              }}
            >
              Education
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/40 max-w-md mx-auto leading-relaxed">
            My professional journey — real-world internships, university education, and continuous learning.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col gap-0">
          {entries.map((entry, i) => (
            <TimelineItem key={i} entry={entry} index={i} isLast={i === entries.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
