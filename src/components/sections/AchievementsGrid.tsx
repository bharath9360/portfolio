"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Trophy, Medal, Award, Flame, Terminal, ExternalLink } from "lucide-react";

export default function AchievementsGrid() {
  const [activeTab, setActiveTab] = useState<"technical" | "discipline">("technical");

  const technicalAwards = portfolioData.achievements.filter((a) => a.isTechnical);
  const disciplineAwards = portfolioData.achievements.filter((a) => !a.isTechnical);

  return (
    <section
      id="achievements"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#04050a] border-t border-white/[0.06]"
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Achievements</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl"
            >
              National Symposiums &{" "}
              <span className="text-gradient-cyan">Unwavering Discipline.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg font-light max-w-md leading-relaxed"
          >
            Proof of high performance under pressure—from algorithmic debugging competitions to relentless state-level athletic training.
          </motion.p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-3 mb-12 border-b border-white/[0.08] pb-6 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab("technical")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "technical"
                ? "bg-[#00f2fe]/10 border border-[#00f2fe]/40 text-[#00f2fe] shadow-[0_0_20px_-5px_rgba(0,242,254,0.3)] font-bold"
                : "bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white"
            }`}
          >
            <Medal className="w-4 h-4" />
            <span>Technical & Research Championships ({technicalAwards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("discipline")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "discipline"
                ? "bg-amber-500/10 border border-amber-500/40 text-amber-400 shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)] font-bold"
                : "bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Discipline & Dedication: State Athletics ({disciplineAwards.length})</span>
          </button>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
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
                <div
                  className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
                  style={{
                    backgroundColor: activeTab === "technical" ? "#00f2fe" : "#f59e0b",
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider border"
                      style={{
                        backgroundColor: activeTab === "technical" ? "#00f2fe15" : "#f59e0b15",
                        borderColor: activeTab === "technical" ? "#00f2fe40" : "#f59e0b40",
                        color: activeTab === "technical" ? "#00f2fe" : "#f59e0b",
                      }}
                    >
                      {award.badge || "Award"}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {award.date}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                    {award.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-4">
                    {award.organization}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                    {award.description}
                  </p>
                </div>

                {award.image && (
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Verified Credibility</span>
                    <a
                      href={award.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#00f2fe] hover:underline"
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
        <div className="pt-12 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-sm font-mono text-slate-400 uppercase tracking-widest mb-6">
            <Award className="w-4 h-4 text-[#7f52ff]" />
            <span>Additional Hackathons & Workshops ({portfolioData.certifications.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioData.certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">{cert.issuer}</p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.04] text-[11px] font-mono text-slate-500">
                  <span>{cert.date}</span>
                  {cert.image && (
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7f52ff] hover:underline"
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
