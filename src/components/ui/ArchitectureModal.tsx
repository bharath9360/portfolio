"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import TechBadge from "./TechBadge";
import MagneticButton from "./MagneticButton";
import { X, ExternalLink, CheckCircle2, Layers, Cpu, AlertCircle } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ArchitectureModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitectureModal({
  project,
  isOpen,
  onClose,
}: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = React.useState<"specs" | "preview">("specs");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveTab("specs");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, project?.id]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#04050a]/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto bg-[#0a0c16] border border-white/10 rounded-3xl shadow-2xl z-10 p-6 sm:p-8 md:p-10 text-slate-200 custom-scrollbar"
            style={{
              boxShadow: `0 0 50px -15px ${project.accentColor}30`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Title Header */}
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider border"
                  style={{
                    backgroundColor: `${project.accentColor}15`,
                    borderColor: `${project.accentColor}40`,
                    color: project.accentColor,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  SYSTEM ARCHITECTURE // SPEC
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-400 font-light mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Tab Navigation (only show if demoUrl exists) */}
            {project.demoUrl && (
              <div className="flex flex-wrap items-center gap-2 mb-8 p-1 rounded-2xl bg-white/[0.03] border border-white/10 w-fit">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "specs"
                      ? "bg-white/[0.1] text-white font-bold shadow-md border border-white/15"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Architecture & Specs</span>
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "preview"
                      ? "bg-gradient-to-r from-[#00f2fe] to-[#7f52ff] text-white font-bold shadow-lg shadow-[#7f52ff]/30 border border-white/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <ExternalLink className="w-4 h-4 animate-pulse" />
                  <span>Live Interactive Preview ⚡</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: PREVIEW */}
            {activeTab === "preview" && project.demoUrl ? (
              <div className="space-y-4 mb-8 animate-fadeIn">
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#04050a] shadow-2xl">
                  {/* Browser bar */}
                  <div className="px-4 py-3 bg-[#0d101d] border-b border-white/10 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="w-full sm:flex-1 max-w-md mx-auto px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-slate-300 overflow-hidden order-3 sm:order-2 mt-2 sm:mt-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                      <span className="truncate">{project.demoUrl}</span>
                    </div>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00f2fe]/20 to-[#7f52ff]/20 hover:from-[#00f2fe]/40 hover:to-[#7f52ff]/40 border border-[#00f2fe]/40 text-xs font-mono text-white transition-all flex items-center gap-1.5 cursor-pointer order-2 sm:order-3"
                    >
                      <span>Launch Fullscreen</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#00f2fe]" />
                    </a>
                  </div>
                  {/* Iframe preview */}
                  <div className="relative w-full h-[450px] sm:h-[550px] bg-[#080b14] flex items-center justify-center overflow-hidden">
                    <iframe
                      src={project.demoUrl}
                      title={`${project.title} Live Preview`}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-2 flex-wrap">
                  <span>💡 Note: If a live preview fails to load inside this embedded window due to browser security policies (X-Frame-Options), click &ldquo;Launch Fullscreen&rdquo; above.</span>
                </div>
              </div>
            ) : (
              /* TAB CONTENT: SPECS */
              <div className="animate-fadeIn">
                {/* Tagline Box */}
                <div
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border mb-8"
                  style={{ borderColor: `${project.accentColor}30` }}
                >
                  <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed italic">
                    &ldquo;{project.tagline}&rdquo;
                  </p>
                </div>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-5 rounded-2xl bg-[#0f1222] border border-red-500/10">
                    <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-3">
                      <AlertCircle className="w-4 h-4" />
                      <span>THE PROBLEM BOTTLENECK</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0f1222] border border-emerald-500/10">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
                      <Cpu className="w-4 h-4" />
                      <span>THE ENGINEERED SOLUTION</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Architecture Highlights */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                    <Layers className="w-5 h-5 text-[#00f2fe]" />
                    <h3>Key Architectural Implementation</h3>
                  </div>
                  <div className="space-y-3">
                    {project.architectureHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: project.accentColor }}
                        />
                        <span className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Matrix */}
                <div className="mb-8 pt-6 border-t border-white/[0.08]">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-3">
                    DEPLOYED TECH STACK // TOKENS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <TechBadge
                        key={tech}
                        name={tech}
                        accent={project.accentColor}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-white/[0.08]">
              {project.githubUrl && (
                <MagneticButton
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source Repo</span>
                </MagneticButton>
              )}
              {project.demoUrl && (
                <MagneticButton
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-4 h-4" />
                </MagneticButton>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
