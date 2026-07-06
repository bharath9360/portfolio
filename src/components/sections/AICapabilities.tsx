"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import BentoCard from "../ui/BentoCard";
import { Cpu, Terminal } from "lucide-react";

export default function AICapabilities() {
  return (
    <section
      id="capabilities"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#04050a] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-[#7f52ff] mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7f52ff]" />
              <span>What I Do</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl"
            >
              My Core{" "}
              <span className="text-gradient-violet">Areas of Expertise.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg font-light max-w-md leading-relaxed"
          >
            My engineering philosophy centers on building systems that are intelligent, fast, and reliable — from autonomous AI agents to scalable web products.
          </motion.p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.capabilities.map((cap, idx) => (
            <BentoCard key={cap.id} capability={cap} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
