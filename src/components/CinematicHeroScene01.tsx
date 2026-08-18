"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Configuration ────────────────────────────────────────────────────────────
const TOTAL_FRAMES  = 100;
const FRAME_BASE    = "/cinematic/scene-01/frames/ezgif-frame-";
const FRAME_EXT     = ".png";
const SCROLL_HEIGHT = "500vh";
const BATCH_SIZE    = 8;

function frameUrl(n: number): string {
  return `${FRAME_BASE}${String(n).padStart(3, "0")}${FRAME_EXT}`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  if (!img.naturalWidth || !img.naturalHeight) return;
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;
  let dw: number, dh: number, ox: number, oy: number;
  if (cr > ir) { dw = cw; dh = cw / ir; }
  else         { dh = ch; dw = ch * ir; }
  ox = (cw - dw) / 2;
  oy = (ch - dh) / 2;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, ox, oy, dw, dh);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CinematicHeroScene01() {
  const [mounted, setMounted]               = useState(false);
  const [loadProgress, setLoadProgress]     = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [isMobile, setIsMobile]             = useState(false);

  const wrapperRef      = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const framesRef       = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);
  const rafIdRef        = useRef(0);
  const targetFrameRef  = useRef(0);

  // ── Mount guard (SSR safe) ─────────────────────────────────────────────────
  useEffect(() => { setMounted(true); }, []);

  // ── Mobile detection ───────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Resize canvas (HiDPI) ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = "100%";
      canvas.style.height = "100%";
      // Redraw current frame after resize
      const img = framesRef.current[currentFrameRef.current];
      if (img) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          drawCover(ctx, img, canvas.width, canvas.height);
        }
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ── Frame preloading ──────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          framesRef.current[i] = img;
          loaded++;
          setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          // Draw first frame as soon as it's ready
          if (i === 0) {
            setFirstFrameReady(true);
            const canvas = canvasRef.current;
            if (canvas) {
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
        img.onerror = () => { loaded++; setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100)); resolve(); };
        img.src = frameUrl(i + 1); // frames are 1-indexed on disk
      });

    const loadAll = async () => {
      // Load frame 0 first (renders immediately)
      await loadOne(0);
      // Load remaining in parallel batches
      for (let i = 1; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        const batch: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
          batch.push(loadOne(j));
        }
        await Promise.all(batch);
      }
    };

    loadAll();
  }, []);

  // ── Scroll-driven animation (no GSAP / no Lenis dependency) ──────────────
  useEffect(() => {
    if (isMobile) return;
    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    // Lerp the frame for smoothness
    let currentLerp = 0;
    let lastDrawn   = -1;

    const drawFrame = (f: number) => {
      const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(f)));
      if (idx === lastDrawn) return;
      lastDrawn = idx;
      currentFrameRef.current = idx;
      const img = framesRef.current[idx];
      if (img && ctx) drawCover(ctx, img, canvas.width, canvas.height);
    };

    const tick = () => {
      currentLerp += (targetFrameRef.current - currentLerp) * 0.12;
      drawFrame(currentLerp);
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    // Scroll position reader — works with Lenis virtual scroll
    const onScroll = () => {
      const rect        = wrapper.getBoundingClientRect();
      const totalScroll = wrapper.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled  = -rect.top;
      const progress  = Math.max(0, Math.min(1, scrolled / totalScroll));
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      // Fade overlay text out as scrolling begins (first 8%)
      const overlay = wrapper.querySelector<HTMLElement>(".cinematic-overlay");
      if (overlay) {
        const fadeEnd = 0.08;
        overlay.style.opacity = String(Math.max(0, 1 - progress / fadeEnd));
      }
    };

    // Native scroll (works once Lenis has scrolled)
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hook Lenis directly — reads position from Lenis's own scroll data
    type LenisInstance = { on: (e: string, cb: (data: { scroll: number }) => void) => void; off: (e: string, cb: (data: { scroll: number }) => void) => void };
    let lenisInstance: LenisInstance | null = null;

    const onLenisScroll = (data: { scroll: number }) => {
      const totalScroll = wrapper.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, data.scroll / totalScroll));
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      const overlay = wrapper.querySelector<HTMLElement>(".cinematic-overlay");
      if (overlay) {
        const fadeEnd = 0.08;
        overlay.style.opacity = String(Math.max(0, 1 - progress / fadeEnd));
      }
    };

    // Try to hook Lenis — it should be on window by now, retry briefly if not
    const tryHookLenis = () => {
      const l = (window as Window & { __lenis?: LenisInstance }).__lenis;
      if (l) { lenisInstance = l; l.on("scroll", onLenisScroll); return true; }
      return false;
    };

    if (!tryHookLenis()) {
      const t1 = setTimeout(() => { if (!tryHookLenis()) setTimeout(tryHookLenis, 400); }, 150);
      return () => {
        clearTimeout(t1);
        cancelAnimationFrame(rafIdRef.current);
        window.removeEventListener("scroll", onScroll);
        lenisInstance?.off("scroll", onLenisScroll);
      };
    }

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", onScroll);
      lenisInstance?.off("scroll", onLenisScroll);
    };
  }, [isMobile]);

  if (!mounted) return null;

  // ─── Mobile fallback ────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        id="hero"
        className="relative w-full overflow-hidden bg-[#04050a]"
        style={{ height: "100svh", minHeight: "600px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameUrl(1)}
          alt="Bharath K — Developer Portfolio"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
          }}
          loading="eager"
        />
        <div className="cinematic-vignette" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div
          className="cinematic-overlay"
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 1.5rem",
            zIndex: 10, pointerEvents: "none",
          }}
        >
          <p className="cinematic-label fade-in"  style={{ animationDelay: "0.2s", opacity: 0 }}>Full Stack Developer</p>
          <h1 className="cinematic-name fade-in"  style={{ animationDelay: "0.4s", opacity: 0 }}>BHARATH K</h1>
          <p className="cinematic-tagline fade-in-subtitle" style={{ animationDelay: "0.6s", opacity: 0 }}>AI · AUTOMATION · WEB</p>
        </div>
      </section>
    );
  }

  // ─── Desktop layout ─────────────────────────────────────────────────────
  return (
    <div ref={wrapperRef} id="hero" style={{ height: SCROLL_HEIGHT, position: "relative" }}>
      <div
        ref={stickyRef}
        style={{ position: "sticky", top: 0, width: "100%", height: "100vh", overflow: "hidden", background: "#04050a" }}
      >
        {/* Loading bar */}
        {loadProgress < 100 && (
          <div className="cinematic-loading-bar" style={{ width: `${loadProgress}%` }} />
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            display: "block", width: "100%", height: "100%",
            opacity: firstFrameReady ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        />

        {/* Vignette + glow */}
        <div className="cinematic-vignette" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="cinematic-glow"     style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

        {/* Text overlay */}
        <div
          className="cinematic-overlay"
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 1.5rem",
            zIndex: 10, pointerEvents: "none",
            transition: "opacity 0.1s linear",
          }}
        >
          <p className="cinematic-label fade-in"  style={{ animationDelay: "0.4s", opacity: 0 }}>Full Stack Developer</p>
          <h1 className="cinematic-name fade-in"  style={{ animationDelay: "0.6s", opacity: 0 }}>BHARATH K</h1>
          <p className="cinematic-tagline fade-in-subtitle" style={{ animationDelay: "0.8s", opacity: 0 }}>AI · AUTOMATION · WEB</p>
          <div className="cinematic-scroll-hint fade-in-subtitle" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <span>SCROLL TO ENTER</span>
            <svg className="cinematic-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
