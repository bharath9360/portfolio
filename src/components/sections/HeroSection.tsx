"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import MagneticButton from "../ui/MagneticButton";
import { ArrowDown, ArrowUpRight, MapPin, Circle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import Image from "next/image";

const ROLES = [
  "AI Engineer",
  "GenAI Product Architect",
  "Full-Stack Developer",
  "LangGraph & LLM Builder",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7f52ff]/8 blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00f2fe]/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── LEFT: Text Content ── */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Available for new opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.06] mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient-ai">Bharath K</span>
          </motion.h1>

          {/* Animated Role Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="flex items-center gap-2.5 h-9 mb-6 overflow-hidden"
          >
            <span className="text-slate-400 text-lg font-light">I build as a</span>
            <div className="h-9 overflow-hidden relative w-64">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIndex]}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -36, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center text-lg font-semibold text-[#00f2fe] whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="text-slate-400 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl"
          >
            I design and ship autonomous AI agents, LangGraph orchestration pipelines, real-time WebRTC systems, and production-grade full-stack applications. Currently pursuing B.E. in Computer Science Engineering.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-10"
          >
            <MapPin className="w-4 h-4 text-slate-500" />
            <span>{portfolioData.personal.location}</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <MagneticButton
              onClick={scrollToProjects}
              variant="primary"
              className="px-7 py-3.5 text-sm font-semibold"
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="px-7 py-3.5 text-sm font-semibold"
            >
              <span>Download Resume</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="flex items-center gap-4 pt-8 border-t border-white/[0.07] w-full max-w-xl"
          >
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
              aria-label="GitHub"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#00f2fe]/30 group-hover:bg-white/[0.08] transition-all">
                <GithubIcon className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline font-medium">GitHub</span>
            </a>

            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
              aria-label="LinkedIn"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#7f52ff]/30 group-hover:bg-white/[0.08] transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline font-medium">LinkedIn</span>
            </a>

            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group ml-auto"
            >
              <span className="font-mono text-xs text-slate-500 hover:text-[#00f2fe] transition-colors truncate">
                {portfolioData.personal.email}
              </span>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Animated Profile Picture ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -inset-3 rounded-full border border-dashed border-[#7f52ff]/30"
            />

            {/* Slower counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute -inset-6 rounded-full border border-dashed border-[#00f2fe]/15"
            />

            {/* Glowing background pulse */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7f52ff]/30 to-[#00f2fe]/20 blur-2xl"
            />

            {/* Floating dots orbiting the photo */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  backgroundColor: i % 2 === 0 ? "#00f2fe" : "#7f52ff",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "#00f2fe" : "#7f52ff"}`,
                }}
                animate={{
                  x: Math.cos((deg * Math.PI) / 180) * 150 - 5,
                  y: Math.sin((deg * Math.PI) / 180) * 150 - 5,
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  x: { repeat: Infinity, duration: 10 + i * 2, ease: "linear" },
                  y: { repeat: Infinity, duration: 10 + i * 2, ease: "linear" },
                  opacity: { repeat: Infinity, duration: 2.5 + i * 0.4, ease: "easeInOut" },
                  scale: { repeat: Infinity, duration: 2.5 + i * 0.4, ease: "easeInOut" },
                }}
              />
            ))}

            {/* Profile Photo Container */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-[#7f52ff]/20"
              style={{
                background: "linear-gradient(135deg, rgba(127,82,255,0.2), rgba(0,242,254,0.15))",
              }}
            >
              <Image
                src={portfolioData.personal.profileImg}
                alt="Bharath K — AI Engineer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 340px"
                priority
              />

              {/* Subtle inner rim gradient */}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
            </motion.div>

            {/* Status badge floating at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0c16]/95 border border-white/10 text-xs font-medium text-slate-200 shadow-xl backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Open to Work
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs font-medium"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
