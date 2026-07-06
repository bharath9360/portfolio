"use client";

import React, { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  target,
  rel,
  variant = "primary",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const boundingRect = buttonRef.current?.getBoundingClientRect();
    if (!boundingRect) return;
    const { left, top, width, height } = boundingRect;
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer overflow-hidden select-none";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#00f2fe] to-[#7f52ff] text-white shadow-[0_0_25px_-5px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_0px_rgba(127,82,255,0.6)] hover:scale-[1.02]",
    secondary:
      "bg-[#101424]/80 text-white border border-white/10 hover:border-[#00f2fe]/50 hover:bg-[#181e34] hover:shadow-[0_0_20px_-5px_rgba(0,242,254,0.2)]",
    ghost:
      "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10",
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
