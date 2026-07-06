"use client";

import React from "react";
import { motion } from "framer-motion";
import { Capability } from "@/types";
import TechBadge from "./TechBadge";
import { Cpu, BrainCircuit, Radio, Workflow, Layers, Sparkles } from "lucide-react";

interface BentoCardProps {
  capability: Capability;
  index: number;
}

export default function BentoCard({ capability, index }: BentoCardProps) {
  const renderIcon = (iconName: string) => {
    const props = { className: "w-6 h-6", style: { color: capability.accent } };
    switch (iconName) {
      case "Cpu":
        return <Cpu {...props} />;
      case "BrainCircuit":
        return <BrainCircuit {...props} />;
      case "Radio":
        return <Radio {...props} />;
      case "Workflow":
        return <Workflow {...props} />;
      case "Layers":
        return <Layers {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group ${capability.span}`}
    >
      {/* Background ambient glow */}
      <div
        className="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: capability.accent }}
      />

      <div>
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform duration-300"
            style={{ borderColor: `${capability.accent}30` }}
          >
            {renderIcon(capability.icon)}
          </div>
          <span
            className="text-xs font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-slate-400"
          >
            <span className="text-xs font-mono text-slate-600">
            0{index + 1}
          </span>
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
          {capability.title}
        </h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-light">
          {capability.description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
        {capability.tags.map((tag) => (
          <TechBadge key={tag} name={tag} accent={capability.accent} />
        ))}
      </div>
    </motion.div>
  );
}
