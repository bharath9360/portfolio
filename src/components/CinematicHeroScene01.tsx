"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";

// ─── Frame configuration ──────────────────────────────────────────────────────
const TOTAL_FRAMES   = 160;
const FRAME_BASE_URL = "/cinematic/scene-01/frames/ezgif-frame-";
const WEBP_BASE_URL  = "/cinematic/scene-01/frames/webp/ezgif-frame-";
const SCROLL_HEIGHT  = "600vh";
const BATCH_SIZE     = 32;   // larger batches → fewer await gaps
const LERP_SPEED     = 0.12;

/** Detect WebP support once, synchronously at module level */
let supportsWebP: boolean | null = null;
function getSupportsWebP(): boolean {
  if (supportsWebP !== null) return supportsWebP;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    supportsWebP = canvas.toDataURL("image/webp").startsWith("data:image/webp");
  } catch {
    supportsWebP = false;
  }
  return supportsWebP;
}

function frameUrl(n: number): string {
  const pad = String(n).padStart(3, "0");
  if (typeof window !== "undefined" && getSupportsWebP()) {
    return `${WEBP_BASE_URL}${pad}.webp`;
  }
  return `${FRAME_BASE_URL}${pad}.jpg`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
): void {
  if (!img.naturalWidth || !img.naturalHeight) return;
  const imgRatio    = img.naturalWidth / img.naturalHeight;
  const canvasRatio = cw / ch;
  let dw: number, dh: number;
  if (canvasRatio > imgRatio) {
    dw = cw; dh = cw / imgRatio;
  } else {
    dh = ch; dw = ch * imgRatio;
  }
  const ox = (cw - dw) / 2;
  const oy = (ch - dh) / 2;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, ox, oy, dw, dh);
}

export default function CinematicHeroScene01() {
  const [mounted, setMounted]               = useState(false);
  const [loadPct, setLoadPct]               = useState(0);
  const [firstReady, setFirstReady]         = useState(false);
  const [isMobileView, setIsMobileView]     = useState(false);
  const { theme }                           = useTheme();

  const wrapperRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const lerpRef      = useRef(0);
  const targetRef    = useRef(0);
  const lastDrawnRef = useRef(-1);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    setIsMobileView(window.innerWidth < 768);
    gsap.registerPlugin(ScrollTrigger);

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mounted || isMobileView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width        = window.innerWidth  * dpr;
      canvas.height       = window.innerHeight * dpr;
      canvas.style.width  = "100%";
      canvas.style.height = "100%";

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      const img = framesRef.current[Math.round(lerpRef.current)] || framesRef.current[0];
      if (img) {
        lastDrawnRef.current = Math.round(lerpRef.current);
        drawCover(ctx, img, canvas.width, canvas.height);
      } else {
        lastDrawnRef.current = -1;
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [mounted, isMobileView]);

  useEffect(() => {
    if (!mounted || isMobileView) return;

    let loaded = 0;

    const loadFrame = (index: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new window.Image();

        const onLoad = async () => {
          // Decode off-main-thread for smoother first paint
          try { await img.decode(); } catch { /* ignore */ }
          framesRef.current[index] = img;
          loaded++;
          setLoadPct(Math.round((loaded / TOTAL_FRAMES) * 100));

          if (index === 0) {
            setFirstReady(true);
            const canvas = canvasRef.current;
            if (canvas) {
              if (canvas.width === 0) {
                const dpr    = Math.min(window.devicePixelRatio || 1, 2);
                canvas.width  = window.innerWidth  * dpr;
                canvas.height = window.innerHeight * dpr;
                canvas.style.width  = "100%";
                canvas.style.height = "100%";
              }
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                drawCover(ctx, img, canvas.width, canvas.height);
              }
            }
          }
          resolve();
        };

        img.onload  = onLoad;
        img.onerror = () => {
          loaded++;
          setLoadPct(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve();
        };

        // Prioritize first 5 frames with fetchpriority hint
        if (index < 5) {
          (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";
        }
        img.src = frameUrl(index + 1);
      });

    const preloadAll = async () => {
      // Load frame 0 first (critical for first paint)
      await loadFrame(0);

      // Load next 4 frames immediately (user sees these in the first second)
      await Promise.all([1, 2, 3, 4].map(loadFrame));

      // Load the rest in large parallel batches
      for (let start = 5; start < TOTAL_FRAMES; start += BATCH_SIZE) {
        const end   = Math.min(start + BATCH_SIZE, TOTAL_FRAMES);
        const batch: Promise<void>[] = [];
        for (let j = start; j < end; j++) batch.push(loadFrame(j));
        await Promise.all(batch);
      }
    };

    preloadAll();
  }, [mounted, isMobileView]);

  useEffect(() => {
    if (!mounted || isMobileView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const tick = () => {
      lerpRef.current += (targetRef.current - lerpRef.current) * LERP_SPEED;
      const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(lerpRef.current)));
      const img = framesRef.current[idx];
      if (img && idx !== lastDrawnRef.current) {
        lastDrawnRef.current = idx;
        drawCover(ctx, img, canvas.width, canvas.height);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted, isMobileView]);

  useEffect(() => {
    if (!mounted || isMobileView) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const tryProxy = () => {
      const lenis = (window as Window & { __lenis?: { scrollTo: (t: number) => void; on: (e: string, cb: () => void) => void } }).__lenis;
      if (lenis) {
        ScrollTrigger.scrollerProxy(document.documentElement, {
          scrollTop(value) {
            if (arguments.length && value !== undefined) {
              lenis.scrollTo(value);
            }
            return window.scrollY;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
        });
        lenis.on("scroll", ScrollTrigger.update);
      }
    };

    tryProxy();
    if (!(window as Window & { __lenis?: unknown }).__lenis) {
      setTimeout(tryProxy, 200);
    }

    const st = ScrollTrigger.create({
      trigger:  wrapper,
      start:    "top top",
      end:      "bottom bottom",
      pin:      false,
      scrub:    1.5,
      onUpdate: (self) => {
        targetRef.current = self.progress * (TOTAL_FRAMES - 1);

        const overlay = wrapper.querySelector<HTMLElement>(".cinematic-overlay-text");
        if (overlay) {
          const fade = Math.max(0, 1 - self.progress / 0.06);
          overlay.style.opacity = String(fade);
        }
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.clearScrollMemory();
    };
  }, [mounted, isMobileView]);

  if (!mounted) return null;

  if (isMobileView) {
    return (
      <section
        id="hero"
        className="relative w-full overflow-hidden flex flex-col justify-center items-center text-center px-6 py-24 transition-colors duration-300"
        style={{
          minHeight: "100svh",
          background: "var(--bg-obsidian)",
        }}
      >
        {/* Ambient background glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
          style={{ background: "var(--hero-gradient)", opacity: 0.15 }}
        />

        <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
          <span className="cinematic-label fade-in">Full Stack Developer</span>
          <h1 className="cinematic-name fade-in text-4xl sm:text-5xl font-black">
            BHARATH K
          </h1>
          <p className="cinematic-tagline fade-in-subtitle text-xs tracking-[0.25em] mb-8">
            AI · AUTOMATION · WEB
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg transition-transform active:scale-95"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-xs font-bold font-mono uppercase tracking-wider border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={wrapperRef}
      id="hero"
      style={{ height: SCROLL_HEIGHT, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg-obsidian)",
          transition: "background-color 0.3s ease",
        }}
      >
        {loadPct < 100 && (
          <div className="cinematic-loading-bar" style={{ width: `${loadPct}%` }} />
        )}

        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            opacity: firstReady ? 1 : 0,
            transition: "opacity 0.9s ease-in-out",
          }}
        />

        <div
          className="cinematic-vignette"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        <div
          className="cinematic-glow"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        <div
          className="cinematic-overlay-text"
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 1.5rem",
            zIndex: 10, pointerEvents: "none",
            transition: "opacity 0.08s linear",
          }}
        >
          <p className="cinematic-label fade-in" style={{ animationDelay: "0.4s" }}>
            Full Stack Developer
          </p>
          <h1 className="cinematic-name fade-in" style={{ animationDelay: "0.6s" }}>
            BHARATH K
          </h1>
          <p className="cinematic-tagline fade-in-subtitle" style={{ animationDelay: "0.8s" }}>
            AI · AUTOMATION · WEB
          </p>
          <div
            className="cinematic-scroll-hint fade-in-subtitle"
            style={{ animationDelay: "1.2s" }}
          >
            <span>SCROLL TO ENTER</span>
            <svg
              className="cinematic-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
