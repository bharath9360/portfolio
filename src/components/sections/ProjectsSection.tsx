"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardStack, CardStackItem } from "@/components/ui/CardStack";
import { portfolioData } from "@/data/portfolioData";

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
  const [size, setSize] = useState({ w: 520, h: 360 });

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setSize({ w: vw - 32, h: 420 });        // full-width on xs
      } else if (vw < 768) {
        setSize({ w: Math.min(vw - 40, 420), h: 400 });  // sm
      } else if (vw < 1024) {
        setSize({ w: 480, h: 370 });             // md
      } else {
        setSize({ w: 540, h: 370 });             // lg+
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

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #04050a 0%, #060810 100%)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,242,254,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,254,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(37,117,252,0.3) 0%, transparent 70%)",
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
          <h2 className="section-heading-accent mb-4">What I've Built</h2>
          <p className="section-subtext max-w-2xl mx-auto px-4">
            A curated collection of full-stack, AI, and enterprise systems — each shipped end-to-end.
          </p>
        </motion.div>

        {/* Card Stack — responsive width from hook */}
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
          className="text-center mt-8 md:mt-10 text-xs text-white/25 tracking-widest uppercase"
        >
          {projectItems.length} projects · Tap or drag to explore
        </motion.p>
      </div>
    </section>
  );
}
