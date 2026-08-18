"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { ArrowUp, Mail, Terminal } from "lucide-react";

// ── Inline SVG social icons ────────────────────────────────────────────────────
const GithubSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── Social icon data using real portfolio links ────────────────────────────────
const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    href: portfolioData.personal.github,
    Icon: GithubSVG,
    hoverBg: "#1a1a1a",
    hoverGlow: "rgba(51,51,51,0.7)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: portfolioData.personal.linkedin,
    Icon: LinkedInSVG,
    hoverBg: "#0077b5",
    hoverGlow: "rgba(0,119,181,0.6)",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${portfolioData.personal.email}`,
    Icon: ({ className }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    hoverBg: "#0e7490",
    hoverGlow: "rgba(0,242,254,0.5)",
  },
];

const NAV_LINKS = [
  { name: "Projects",     href: "#projects" },
  { name: "Skills",       href: "#skills" },
  { name: "Experience",   href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact",      href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative z-10 bg-[#04050a] overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* ── Top: "Connect With Me" glow card (from footer.txt) ─────────────── */}
      <div
        className="w-full flex flex-col items-center justify-center px-4 py-20"
        style={{ background: "linear-gradient(to bottom, #060810 0%, #04050a 100%)" }}
      >
        {/* Heading */}
        <div className="w-full max-w-2xl mx-auto text-center mb-12">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{
              background: "linear-gradient(to right, #a78bfa, #ec4899, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Connect{" "}
            <span style={{ WebkitTextFillColor: "white" }}>With Me</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            {portfolioData.personal.availabilityStatus} — reach out via any channel below.
          </p>
        </div>

        {/* 3D Glowing social card */}
        <div className="relative w-full max-w-lg">
          <div
            className="rounded-3xl border border-white/10 backdrop-blur-3xl overflow-hidden p-10 transition-transform duration-500 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, rgba(30,30,60,0.8) 0%, rgba(10,12,28,0.95) 100%)",
              boxShadow: "0 0 60px rgba(127,82,255,0.5), 0 0 100px rgba(127,82,255,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex flex-wrap justify-center gap-8">
              {SOCIALS.map(({ id, label, href, Icon, hoverBg, hoverGlow }) => (
                <a
                  key={id}
                  href={href}
                  target={id !== "email" ? "_blank" : undefined}
                  rel={id !== "email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="social-connect-icon flex flex-col items-center group"
                  style={{ textDecoration: "none" }}
                >
                  {/* Icon container */}
                  <div
                    className="social-connect-container w-20 h-20 rounded-full flex items-center justify-center relative transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      // CSS vars for hover override via inline style + classname trick
                    }}
                    // We'll use inline group-hover via tailwind's arbitrary + global css below
                    data-hover-bg={hoverBg}
                    data-hover-glow={hoverGlow}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  {/* Label */}
                  <span className="mt-3 text-sm font-medium text-white/70 group-hover:text-white/100 transition-all duration-300 translate-y-0 group-hover:translate-y-1">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom footer bar ──────────────────────────────────────────────── */}
      <div
        className="px-4 sm:px-6 md:px-12 pb-8 pt-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Brand + nav row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Brand */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00f2fe] to-[#7f52ff] flex items-center justify-center text-white shadow-lg shadow-[#00f2fe]/20 group-hover:shadow-[#00f2fe]/40 transition-shadow">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-mono text-base font-bold text-white tracking-tight">Bharath K</span>
                <p className="text-[11px] text-slate-500 leading-tight">{portfolioData.personal.title}</p>
              </div>
            </button>

            {/* Nav links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const el = document.querySelector(link.href);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-slate-500 hover:text-white transition-colors font-medium cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Copyright + back-to-top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
            <div>
              © {new Date().getFullYear()} Bharath K · Built with Next.js, Tailwind CSS &amp; Three.js/WebGPU
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer group"
            >
              <span>Back to top</span>
              <div className="w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-[#00f2fe]/20 group-hover:text-[#00f2fe] transition-all">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Social icon hover styles (scoped global) ──────────────────────── */}
      <style>{`
        .social-connect-icon:hover .social-connect-container {
          transform: translateY(-10px) scale(1.1);
        }
        .social-connect-icon:hover svg {
          animation: social-shake 0.5s ease;
        }
        @keyframes social-shake {
          0%,100% { transform: translateX(0) rotate(0); }
          20%      { transform: translateX(-5px) rotate(-5deg); }
          40%      { transform: translateX(5px) rotate(5deg); }
          60%      { transform: translateX(-5px) rotate(-5deg); }
          80%      { transform: translateX(5px) rotate(5deg); }
        }
        a[data-hover-bg="github"]:hover .social-connect-container,
        a[href*="github"]:hover .social-connect-container {
          background: #1a1a1a;
          box-shadow: 0 0 24px rgba(51,51,51,0.7);
        }
        a[href*="linkedin"]:hover .social-connect-container {
          background: #0077b5;
          box-shadow: 0 0 24px rgba(0,119,181,0.6);
        }
        a[href*="mailto"]:hover .social-connect-container {
          background: #0e7490;
          box-shadow: 0 0 24px rgba(0,242,254,0.5);
        }
      `}</style>
    </footer>
  );
}
