"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Mail, ArrowUp, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#04050a] pt-16 pb-12 px-4 sm:px-6 md:px-12 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00f2fe] to-[#7f52ff] flex items-center justify-center text-white font-mono font-bold text-sm shadow-lg shadow-[#00f2fe]/20">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              Bharath K
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-light leading-relaxed">
            {portfolioData.personal.subTitle}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-[#00f2fe]/40 transition-all group"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-[#7f52ff]/40 transition-all group"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-emerald-500/40 transition-all group"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} Bharath K. Built with Next.js 15,
          Tailwind CSS & R3F.
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
        >
          <span>Back to top</span>
          <div className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-[#00f2fe]/20 group-hover:text-[#00f2fe] transition-all">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </footer>
  );
}
