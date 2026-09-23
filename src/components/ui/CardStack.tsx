"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

// Inline GitHub icon (lucide-react does not export Github)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  githubHref?: string;
  ctaLabel?: string;
  tag?: string;
  techStack?: string[];
  accentColor?: string;
  icon?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 520,
  cardHeight = 360,
  overlap = 0.45,
  spreadDeg = 40,
  perspectivePx = 1100,
  depthPx = 120,
  tiltXDeg = 10,
  activeLiftPx = 20,
  activeScale = 1.02,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 3000,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return;
    if (pauseOnHover && hovering) return;
    const id = window.setInterval(() => {
      if (loop || active < len - 1) next();
    }, Math.max(700, intervalMs));
    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

  if (!len) return null;

  const activeItem = items[active]!;

  return (
    <div
      className={`w-full ${className ?? ""}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full"
        style={{ height: Math.max(420, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* Spotlight wash */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${activeItem.accentColor ?? "#00f2fe"}18, transparent)` }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;
              if (!visible) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 8;
              const z = -abs * depthPx;
              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: unknown,
                      info: { offset: { x: number }; velocity: { x: number } }
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(160, cardWidth * 0.22);
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={`absolute bottom-0 rounded-2xl overflow-hidden shadow-2xl will-change-transform select-none ${
                    isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                  }`}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                    border: `1px solid ${isActive ? (item.accentColor ?? "#00f2fe") + "40" : "rgba(255,255,255,0.06)"}`,
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }}
                  animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                  transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultProjectCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots + CTA */}
      {showDots && (
        <div className="mt-8 flex items-center justify-center gap-4">
          {/* Prev arrow */}
          <button
            onClick={prev}
            disabled={!canGoPrev}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white/80 hover:border-white/30 transition disabled:opacity-20"
            aria-label="Previous"
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className="transition-all duration-300"
                  style={{
                    width: on ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: on ? (activeItem.accentColor ?? "#00f2fe") : "rgba(255,255,255,0.2)",
                  }}
                  aria-label={`Go to ${it.title}`}
                />
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            disabled={!canGoNext}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white/80 hover:border-white/30 transition disabled:opacity-20"
            aria-label="Next"
          >
            ›
          </button>

          {/* Live demo link for active item */}
          {activeItem.href && (
            <Link
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="ml-2 text-white/40 hover:text-white/80 transition"
              aria-label="Open live demo"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          )}
          {activeItem.githubHref && (
            <Link
              href={activeItem.githubHref}
              target="_blank"
              rel="noreferrer"
              className="text-white/40 hover:text-white/80 transition"
              aria-label="Open GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function DefaultProjectCard({ item, active }: { item: CardStackItem; active: boolean }) {
  const accent = item.accentColor ?? "var(--accent-primary)";
  return (
    <div
      className="relative h-full w-full flex flex-col transition-colors duration-300"
      style={{ background: "var(--card-bg)" }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      {/* Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 gap-3 sm:gap-4">
        {/* Icon + category */}
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl">{item.icon ?? "🚀"}</span>
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}30` }}
          >
            {item.tag ?? "Project"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight">{item.title}</h3>

        {/* Description */}
        {item.description && (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">{item.description}</p>
        )}

        {/* Tech pills */}
        {item.techStack && item.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {item.techStack.slice(0, 6).map((tech) => (
              <span key={tech} className="tech-pill">{tech}</span>
            ))}
            {item.techStack.length > 6 && (
              <span className="tech-pill">+{item.techStack.length - 6}</span>
            )}
          </div>
        )}
      </div>

      {/* Bottom CTA bar */}
      <div
        className="px-5 sm:px-6 py-3.5 flex items-center gap-3 border-t"
        style={{ borderColor: "var(--card-border)" }}
      >
        {item.href && (
          <Link
            href={item.href}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90 shadow-md"
            style={{ background: accent, color: "#ffffff" }}
          >
            <SquareArrowOutUpRight className="w-3.5 h-3.5" />
            Live Demo
          </Link>
        )}
        {item.githubHref && (
          <Link
            href={item.githubHref}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub
          </Link>
        )}
        {active && (
          <span className="ml-auto text-xs text-[var(--text-tertiary)] hidden sm:inline font-mono">Drag to navigate</span>
        )}
      </div>

      {/* Active glow overlay */}
      {active && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: `inset 0 0 40px -20px ${accent}30` }}
        />
      )}
    </div>
  );
}
