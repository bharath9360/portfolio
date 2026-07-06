"use client";

import { cn } from "@/utils/cn";

interface TechBadgeProps {
  name: string;
  className?: string;
  accent?: string;
}

export default function TechBadge({ name, className, accent }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono tracking-wider transition-all duration-200",
        "bg-[#101424]/80 border border-white/10 text-slate-300 hover:text-white hover:border-[#00f2fe]/40 hover:bg-[#181e34]",
        className
      )}
      style={accent ? { borderColor: `${accent}40`, color: accent } : undefined}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5 opacity-70"
        style={{ backgroundColor: accent || "#00f2fe" }}
      />
      {name}
    </span>
  );
}
