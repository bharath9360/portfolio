"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Trophy, Medal, Award, Flame, ExternalLink } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AchievementsGrid() {
  const [activeTab, setActiveTab] = useState<"technical" | "discipline">("technical");
  const { theme } = useTheme();

  const technicalAwards = portfolioData.achievements.filter((a) => a.isTechnical);
  const disciplineAwards = portfolioData.achievements.filter((a) => !a.isTechnical);

  return (
    <section
      id="achievements"
      className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-[var(--bg-obsidian)] border-t border-[var(--card-border)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-xs font-mono uppercase tracking-widest text-amber-500 mb-4"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Achievements</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] max-w-2xl"
            >
              National Symposiums &amp;{" "}
              <span className="text-gradient-cyan">Unwavering Discipline.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--text-secondary)] text-base sm:text-lg font-light max-w-md leading-relaxed"
          >
            Proof of high performance under pressure—from algorithmic debugging competitions to relentless state-level athletic training.
          </motion.p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-3 mb-12 border-b border-[var(--card-border)] pb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("technical")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "technical"
                ? "bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)] text-[var(--accent-primary)] font-bold shadow-md"
                : "bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Medal className="w-4 h-4" />
            <span>Technical &amp; Research Championships ({technicalAwards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("discipline")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "discipline"
                ? "bg-amber-500/15 border border-amber-500/40 text-amber-500 font-bold shadow-md"
                : "bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Discipline &amp; Dedication: State Athletics ({disciplineAwards.length})</span>
          </button>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {(activeTab === "technical" ? technicalAwards : disciplineAwards).map(
            (award, idx) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider border"
                      style={{
                        backgroundColor: activeTab === "technical" ? "var(--accent-primary)15" : "#f59e0b15",
                        borderColor: activeTab === "technical" ? "var(--accent-primary)40" : "#f59e0b40",
                        color: activeTab === "technical" ? "var(--accent-primary)" : "#f59e0b",
                      }}
                    >
                      {award.badge || "Award"}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">
                      {award.date}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
                    {award.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--text-secondary)] mb-4">
                    {award.organization}
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light mb-6">
                    {award.description}
                  </p>
                </div>

                {award.image && (
                  <div className="pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
                    <span>Verified Credibility</span>
                    <a
                      href={award.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[var(--accent-primary)] hover:underline"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </motion.div>
            )
          )}
        </div>

        {/* Certifications Sub-grid */}
        <div className="pt-12 border-t border-[var(--card-border)]">
          <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-6">
            <Award className="w-4 h-4 text-[var(--accent-secondary)]" />
            <span>Additional Hackathons &amp; Workshops ({portfolioData.certifications.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioData.certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] tracking-tight mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-mono text-[var(--text-secondary)]">{cert.issuer}</p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--card-border)] text-[11px] font-mono text-[var(--text-tertiary)]">
                  <span>{cert.date}</span>
                  {cert.image && (
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-primary)] hover:underline"
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
