"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardStack, CardStackItem } from "@/components/ui/CardStack";
import { portfolioData } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";

const projectItems: CardStackItem[] = portfolioData.projects.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.tagline,
  href: p.demoUrl,
  tag: p.category,
  techStack: p.techStack,
  accentColor: p.accentColor,
  icon: p.icon,
}));

function useCardSize() {
  const [size, setSize] = useState({ w: 520, h: 370 });

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setSize({ w: Math.min(vw - 32, 380), h: 420 });
      } else if (vw < 768) {
        setSize({ w: Math.min(vw - 40, 440), h: 400 });
      } else if (vw < 1024) {
        setSize({ w: 480, h: 370 });
      } else {
        setSize({ w: 540, h: 370 });
      }
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);

  return size;
}

export default function ProjectsSection() {
  const { w, h } = useCardSize();
  const { theme } = useTheme();

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 overflow-hidden bg-[var(--bg-obsidian)] transition-colors duration-300"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent-primary) 1px, transparent 1px), linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="section-label">Selected Work</p>
          <h2 className="section-heading-accent mb-4">What I&apos;ve Built</h2>
          <p className="section-subtext max-w-2xl mx-auto px-4">
            A curated collection of full-stack, AI, and enterprise systems — each shipped end-to-end.
          </p>
        </motion.div>

        {/* Card Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <CardStack
            items={projectItems}
            initialIndex={0}
            maxVisible={5}
            cardWidth={w}
            cardHeight={h}
            spreadDeg={36}
            overlap={0.44}
            loop
            showDots
            autoAdvance={false}
          />
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-10 text-xs text-[var(--text-tertiary)] tracking-widest uppercase font-mono"
        >
          {projectItems.length} projects · Tap or drag cards to explore
        </motion.p>
      </div>
    </section>
  );
}
