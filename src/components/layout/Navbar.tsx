"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#04050a]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/30"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Name */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 group"
        >
          {/* Avatar initials */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00f2fe]/80 to-[#7f52ff] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#7f52ff]/30 group-hover:shadow-[#00f2fe]/30 transition-shadow">
            BK
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-sm font-bold text-white tracking-tight">Bharath K</span>
            <span className="text-[11px] text-slate-400 font-normal mt-0.5">AI Engineer</span>
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-1"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer font-medium"
            >
              {link.name}
            </button>
          ))}
        </motion.nav>

        {/* Right actions */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-3"
        >
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all group"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#00f2fe] to-[#7f52ff] hover:opacity-90 transition-opacity shadow-md shadow-[#7f52ff]/20 cursor-pointer"
          >
            Hire Me
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#04050a]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  {link.name}
                </button>
              ))}

              <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <a
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg text-sm font-medium text-white bg-white/[0.05] border border-white/10 text-center hover:bg-white/[0.1] transition-colors"
                >
                  View Resume
                </a>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="px-4 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#00f2fe] to-[#7f52ff] text-center cursor-pointer"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
