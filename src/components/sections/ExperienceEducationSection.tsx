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
import { useTheme } from "@/context/ThemeContext";

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
      accent: exp.accent || "var(--accent-primary)",
    });
  });
  entries.push({
    type: "education",
    title: "B.E. Computer Science Engineering",
    org: "M.A.M College of Engineering and Technology",
    period: "2022 – 2026",
    description: "CGPA: 8.0 · Specialization in AI, Full-Stack Systems, and Computer Science fundamentals.",
    accent: "var(--accent-secondary)",
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
  experience: { icon: BriefcaseIcon, label: "Experience" },
  education: { icon: GraduationCap, label: "Education" },
  certification: { icon: Award, label: "Certification" },
};

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
      {/* Mobile view */}
      <div className="flex md:hidden items-start gap-4 w-full">
        <div className="flex flex-col items-center shrink-0 pt-1">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg shrink-0"
            style={{
              background: entry.accent,
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

        <motion.div
          className="flex-1 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        >
          <ExperienceCard entry={entry} cfg={cfg} accent={entry.accent} />
        </motion.div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] w-full items-start gap-6">
        <div className="flex justify-end">
          {isRight ? (
            <motion.div
              className="w-full max-w-[420px]"
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

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-xl shrink-0"
            style={{
              background: entry.accent,
              boxShadow: `0 0 24px ${entry.accent}55`,
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

        <div className="flex justify-start">
          {!isRight ? (
            <motion.div
              className="w-full max-w-[420px]"
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

function ExperienceCard({
  entry,
  cfg,
  accent,
  alignRight,
}: {
  entry: CardEntry;
  cfg: (typeof TYPE_CONFIG)[keyof typeof TYPE_CONFIG];
  accent: string;
  alignRight?: boolean;
}) {
  return (
    <div
      className="relative group rounded-2xl p-px overflow-hidden border border-[var(--card-border)]"
      style={{
        background: "var(--card-bg)",
      }}
    >
      <div className="relative rounded-[14px] p-5 sm:p-6 bg-[var(--card-bg)] backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
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
          <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] font-mono text-xs">
            <CalendarDays size={12} />
            <span>{entry.period}</span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-snug mb-1.5">
          {entry.title}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <Building2 size={13} style={{ color: accent }} className="shrink-0" />
          <p className="text-xs text-[var(--text-secondary)] font-medium leading-snug">{entry.org}</p>
        </div>

        {entry.description && (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 border-l-2 pl-3"
            style={{ borderColor: `${accent}60` }}
          >
            {entry.description}
          </p>
        )}

        {entry.bullets && entry.bullets.length > 0 && (
          <ul className="space-y-2">
            {entry.bullets.map((b, bi) => (
              <li key={bi} className="flex gap-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                <CheckCircle2
                  size={14}
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

export default function ExperienceEducationSection() {
  const entries = buildEntries();

  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-obsidian)] transition-colors duration-300"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">
            Timeline
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-5">
            <span className="text-[var(--text-primary)]">Experience</span>
            <span className="text-[var(--text-tertiary)]"> &amp;</span>
            <br />
            <span className="section-heading-accent">
              Education
            </span>
          </h2>
          <p className="section-subtext max-w-md mx-auto">
            My professional journey — real-world internships, university education, and continuous learning.
          </p>
        </motion.div>

        <div className="flex flex-col gap-0">
          {entries.map((entry, i) => (
            <TimelineItem key={i} entry={entry} index={i} isLast={i === entries.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
