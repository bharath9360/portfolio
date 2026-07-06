"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Terminal, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#04050a] border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00f2fe] mb-4"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Work Experience</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl"
            >
              Applied Experience &{" "}
              <span className="text-gradient-cyan">Engineering Growth.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg font-light max-w-md leading-relaxed"
          >
            A chronological record of hands-on internships, system architecture contributions, and formal engineering education.
          </motion.p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 md:ml-32 pl-6 sm:pl-8 md:pl-12 space-y-16">
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Glowing Node */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] md:-left-[55px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#04050a] transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: exp.accent, boxShadow: `0 0 15px ${exp.accent}` }}
              />

              {/* Period Pill (Desktop left side, mobile top) */}
              <div className="md:absolute md:-left-44 md:top-1 text-xs font-mono tracking-widest uppercase text-slate-500 md:text-right w-32 mb-2 md:mb-0">
                {exp.period}
              </div>

              {/* Experience Glass Card */}
              <div
                className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden"
                style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
              >
                <div
                  className="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
                  style={{ backgroundColor: exp.accent }}
                />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                      style={{ borderColor: `${exp.accent}30` }}
                    >
                      <Briefcase className="w-5 h-5" style={{ color: exp.accent }} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-mono text-slate-400">
                        {exp.company}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                  {exp.description}
                </p>

                {/* Key Achievements Bullet points */}
                <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                  {exp.keyAchieved.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 font-light">
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: exp.accent }}
                      />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="relative group"
          >
            <div className="absolute -left-[31px] sm:-left-[39px] md:-left-[55px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#04050a] bg-emerald-400 shadow-[0_0_15px_#10b981]" />

            <div className="md:absolute md:-left-44 md:top-1 text-xs font-mono tracking-widest uppercase text-slate-500 md:text-right w-32 mb-2 md:mb-0">
              In Progress
            </div>

            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Bachelor of Engineering — Computer Science Engineering
                  </h3>
                  <div className="text-sm font-mono text-emerald-400">
                    M.A.M College of Engineering and Technology
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Rigorous study in data structures, algorithms, computer networks, database systems, and artificial intelligence architectures. Active participant and champion in national-level technical symposiums and full-stack coding competitions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
