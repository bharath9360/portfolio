"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const NAV_LINKS = [
  { name: "Projects",     href: "#projects" },
  { name: "Skills",       href: "#skills" },
  { name: "Experience",   href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact",      href: "#contact" },
];

const handleNavClick = (href: string, close?: () => void) => {
  close?.();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Floating pill bar ─────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`flex items-center justify-between px-5 py-2.5 rounded-full w-full max-w-3xl relative transition-all duration-300 ${
            scrolled
              ? "bg-[#0a0d1a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40"
              : "bg-[#0d1225]/70 backdrop-blur-xl border border-white/[0.07] shadow-lg shadow-black/20"
          }`}
        >
          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 group shrink-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2 }}
          >
            {/* Gradient avatar */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00f2fe] to-[#7f52ff] flex items-center justify-center text-white font-bold text-[13px] shadow-md shadow-[#7f52ff]/40 group-hover:shadow-[#00f2fe]/40 transition-shadow">
              BK
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[13px] font-bold text-white tracking-tight">Bharath K</span>
              <span className="text-[10px] text-slate-400 font-normal mt-0.5">AI Engineer</span>
            </div>
          </motion.a>

          {/* ── Desktop nav ───────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
              </motion.button>
            ))}
          </nav>

          {/* ── Right CTA ─────────────────────────────────────────────────── */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white/80 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all group"
            >
              Resume
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[13px] font-semibold text-[#04050a] bg-gradient-to-r from-[#00f2fe] to-[#7f52ff] hover:opacity-90 transition-opacity shadow-md shadow-[#7f52ff]/25 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.button>
          </motion.div>

          {/* ── Mobile menu toggle ────────────────────────────────────────── */}
          <motion.button
            className="md:hidden p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.div>

      {/* ── Mobile full-screen overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#04050a]/98 backdrop-blur-2xl z-40 flex flex-col pt-24 px-8 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors"
              onClick={() => setIsOpen(false)}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Logo inside mobile menu */}
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f2fe] to-[#7f52ff] flex items-center justify-center text-white font-bold text-sm">
                BK
              </div>
              <div>
                <p className="text-white font-bold text-lg">Bharath K</p>
                <p className="text-slate-400 text-xs">AI Engineer</p>
              </div>
            </motion.div>

            {/* Mobile nav links */}
            <div className="flex flex-col gap-1 mb-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, () => setIsOpen(false))}
                  className="text-left px-4 py-3 rounded-xl text-lg font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ delay: i * 0.07 + 0.15 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            {/* Mobile CTA */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.45 }}
            >
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-sm font-medium text-white border border-white/10 hover:bg-white/[0.08] transition-colors"
              >
                View Resume
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
              <button
                onClick={() => handleNavClick("#contact", () => setIsOpen(false))}
                className="w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-[#04050a] bg-gradient-to-r from-[#00f2fe] to-[#7f52ff] hover:opacity-90 transition-opacity cursor-pointer"
              >
                Hire Me
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
