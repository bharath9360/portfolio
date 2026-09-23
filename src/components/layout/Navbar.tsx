"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { useTheme, Theme } from "@/context/ThemeContext";

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
  const { theme, setTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getThemeIcon = () => {
    if (theme === "light") return <Sun className="w-4 h-4 text-amber-500" />;
    if (theme === "emerald") return <Sparkles className="w-4 h-4 text-emerald-400" />;
    return <Moon className="w-4 h-4 text-cyan-400" />;
  };

  const getThemeLabel = () => {
    if (theme === "light") return "Light";
    if (theme === "emerald") return "Emerald";
    return "Dark";
  };

  return (
    <>
      {/* ── Floating pill bar ─────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`flex items-center justify-between px-5 py-2.5 rounded-full w-full max-w-4xl relative transition-all duration-300 pointer-events-auto ${
            scrolled
              ? "bg-[var(--nav-bg)] backdrop-blur-2xl border border-[var(--card-border)] shadow-2xl shadow-black/20"
              : "bg-[var(--nav-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-lg shadow-black/10"
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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-bold text-[13px] shadow-md transition-shadow">
              BK
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[13px] font-bold text-[var(--text-primary)] tracking-tight">Bharath K</span>
              <span className="text-[10px] text-[var(--text-secondary)] font-normal mt-0.5">AI Engineer</span>
            </div>
          </motion.a>

          {/* ── Desktop nav ───────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-border)] transition-all cursor-pointer"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
              </motion.button>
            ))}
          </nav>

          {/* ── Right Controls (Theme Switcher + CTA) ────────────────────── */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              title={`Switch Theme (Current: ${getThemeLabel()})`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all cursor-pointer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {getThemeIcon()}
              <span>{getThemeLabel()}</span>
            </motion.button>

            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[var(--text-secondary)] border border-[var(--card-border)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-all group"
            >
              Resume
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[13px] font-semibold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-90 transition-opacity shadow-md cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.button>
          </motion.div>

          {/* ── Mobile Menu & Theme Toggle ────────────────────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[var(--card-border)] text-[var(--text-primary)] transition-all"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </button>
            <motion.button
              className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Mobile full-screen overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[var(--bg-obsidian)]/98 backdrop-blur-2xl z-40 flex flex-col pt-24 px-8 md:hidden overflow-y-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              onClick={() => setIsOpen(false)}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <motion.div
              className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--card-border)]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-bold text-sm">
                  BK
                </div>
                <div>
                  <p className="text-[var(--text-primary)] font-bold text-lg">Bharath K</p>
                  <p className="text-[var(--text-secondary)] text-xs">AI Engineer</p>
                </div>
              </div>
            </motion.div>

            {/* Theme Selector inside Mobile Menu */}
            <div className="mb-6 p-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                Theme
              </span>
              <div className="flex items-center gap-1">
                {(["dark", "light", "emerald"] as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono capitalize transition-all ${
                      theme === t
                        ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile nav links */}
            <div className="flex flex-col gap-1 mb-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, () => setIsOpen(false))}
                  className="text-left px-4 py-3 rounded-xl text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)] transition-colors cursor-pointer"
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
              className="flex flex-col gap-3 pb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-sm font-medium text-[var(--text-primary)] border border-[var(--card-border)] hover:bg-[var(--card-hover-bg)] transition-colors"
              >
                View Resume
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
              <button
                onClick={() => handleNavClick("#contact", () => setIsOpen(false))}
                className="w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-90 transition-opacity cursor-pointer"
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
