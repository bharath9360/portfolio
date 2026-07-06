"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import TechBadge from "./TechBadge";
import { ArrowUpRight, Cpu, ExternalLink, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({
  project,
  index,
  onOpenModal,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl glass-panel glass-panel-hover p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden cursor-pointer"
      onClick={() => onOpenModal(project)}
      style={{
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute -right-32 -top-32 w-80 h-80 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: project.accentColor }}
      />

      <div>
        {/* Top Header: Category & Spec Number */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider border transition-colors"
              style={{
                backgroundColor: `${project.accentColor}15`,
                borderColor: `${project.accentColor}40`,
                color: project.accentColor,
              }}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-mono uppercase bg-white/[0.05] border border-white/10 text-slate-300">
                FLAGSHIP
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-slate-500 tracking-widest">
            <span className="text-xs font-mono text-slate-600">
              0{index + 1}
            </span>
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#00f2fe] transition-colors flex items-center gap-2">
            <span>{project.title}</span>
            <ArrowUpRight
              className="w-6 h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
              style={{ color: project.accentColor }}
            />
          </h3>
          <p className="text-sm sm:text-base text-slate-400 font-light mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Live URL Browser Preview Mockup */}
        {project.demoUrl && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 bg-[#060810]/80 shadow-inner group-hover:border-white/20 transition-all">
            {/* Browser Bar */}
            <div className="px-3.5 py-2.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 max-w-[200px] sm:max-w-[260px] mx-2 px-2.5 py-1 rounded-md bg-black/40 border border-white/5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-300 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="truncate">{project.demoUrl.replace(/^https?:\/\//, '')}</span>
              </div>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#00f2fe]/20 to-[#7f52ff]/20 hover:from-[#00f2fe]/40 hover:to-[#7f52ff]/40 border border-[#00f2fe]/30 text-[11px] font-mono text-white transition-all flex items-center gap-1 flex-shrink-0 z-20"
                title="Open Live Website in New Tab"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3 text-[#00f2fe]" />
              </a>
            </div>

            {/* Visual Preview Box */}
            <div className="relative h-40 sm:h-44 bg-gradient-to-br from-[#0c1020] via-[#080b16] to-[#04050a] p-4 flex flex-col items-center justify-center text-center group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div
                className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ backgroundColor: project.accentColor }}
              />

              <div className="relative z-10 space-y-2 max-w-xs">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl shadow-lg shadow-black/50">
                  {project.icon || "🌐"}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Interactive Web System
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 font-light">
                  Click to explore architecture or launch live system
                </p>
              </div>

              {/* Hover action overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00f2fe] to-[#7f52ff] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-white/20">
                  <span>Explore Specs & Preview</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tagline / Problem excerpt */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light line-clamp-3">
          {project.tagline}
        </p>

        {/* Key Architecture Bullet Highlight */}
        <div
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-6 group-hover:border-white/10 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
            <span>Architecture Highlight</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
            // {project.architectureHighlights[0]}
          </p>
        </div>
      </div>

      {/* Footer: Tech Stack & Action Prompt */}
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 5).map((tech) => (
            <TechBadge key={tech} name={tech} accent={project.accentColor} />
          ))}
          {project.techStack.length > 5 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] border border-white/5 text-slate-400">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono tracking-wider uppercase text-slate-400 group-hover:text-white transition-colors">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4" style={{ color: project.accentColor }} />
            <span>Click to view system architecture</span>
          </span>
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all"
            style={{ color: project.accentColor }}
          >
            <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
