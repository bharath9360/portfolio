"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { ArrowUp, Terminal } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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

const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    href: portfolioData.personal.github,
    Icon: GithubSVG,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: portfolioData.personal.linkedin,
    Icon: LinkedInSVG,
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
  const { theme } = useTheme();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative z-10 bg-[var(--bg-obsidian)] border-t border-[var(--card-border)] overflow-hidden transition-colors duration-300"
    >
      {/* Top: Connect Card */}
      <div className="w-full flex flex-col items-center justify-center px-4 py-16 sm:py-20">
        <div className="w-full max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Connect{" "}
            <span className="text-gradient-ai">With Me</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            {portfolioData.personal.availabilityStatus} — reach out via any channel below.
          </p>
        </div>

        <div className="relative w-full max-w-lg">
          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-3xl overflow-hidden p-8 sm:p-10 shadow-xl">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {SOCIALS.map(({ id, label, href, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target={id !== "email" ? "_blank" : undefined}
                  rel={id !== "email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative transition-all duration-300 border border-[var(--card-border)] bg-[var(--card-hover-bg)] group-hover:scale-110 shadow-md">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--text-primary)]" />
                  </div>
                  <span className="mt-3 text-xs sm:text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-all">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div className="px-4 sm:px-6 md:px-12 pb-8 pt-8 border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white shadow-lg">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-mono text-base font-bold text-[var(--text-primary)] tracking-tight">Bharath K</span>
                <p className="text-[11px] text-[var(--text-tertiary)] leading-tight">{portfolioData.personal.title}</p>
              </div>
            </button>

            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const el = document.querySelector(link.href);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-tertiary)]">
            <div>
              © {new Date().getFullYear()} Bharath K · Built with Next.js, Tailwind CSS &amp; Three.js
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
            >
              <span>Back to top</span>
              <div className="w-6 h-6 rounded-full bg-[var(--card-border)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-all">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
