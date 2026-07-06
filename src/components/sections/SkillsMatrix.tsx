"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Terminal, CheckCircle2, Cpu, Code2, Layers, Cloud } from "lucide-react";

export default function SkillsMatrix() {
  const renderCategoryIcon = (idx: number) => {
    const props = { className: "w-5 h-5" };
    switch (idx) {
      case 0:
        return <Cpu {...props} className="w-5 h-5 text-[#7f52ff]" />;
      case 1:
        return <Code2 {...props} className="w-5 h-5 text-[#00f2fe]" />;
      case 2:
        return <Layers {...props} className="w-5 h-5 text-[#2575fc]" />;
      default:
        return <Cloud {...props} className="w-5 h-5 text-emerald-400" />;
    }
  };

  const renderCategoryAccent = (idx: number) => {
    switch (idx) {
      case 0:
        return "#7f52ff";
      case 1:
        return "#00f2fe";
      case 2:
        return "#2575fc";
      default:
        return "#10b981";
    }
  };

  return (
    <section
      id="skills"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#04050a] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-[#00f2fe] mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
              <span>Tech Stack</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl"
            >
              My{" "}
              <span className="text-gradient-cyan">Technical Skills.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg font-light max-w-md leading-relaxed"
          >
            Technologies I use to design, build, and ship intelligent applications — from LLM orchestration to production web systems.
          </motion.p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {portfolioData.skills.map((cat, catIdx) => {
            const accent = renderCategoryAccent(catIdx);
            return (
              <motion.div
                key={cat.categoryName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden"
              >
                {/* Top Category Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/10"
                      style={{ borderColor: `${accent}30` }}
                    >
                      {renderCategoryIcon(catIdx)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {cat.categoryName}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    // 0{catIdx + 1}
                  </span>
                </div>

                {/* Skills Grid inside card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      {skill.level && (
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider border"
                          style={{
                            backgroundColor: `${accent}10`,
                            borderColor: `${accent}30`,
                            color: accent,
                          }}
                        >
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
