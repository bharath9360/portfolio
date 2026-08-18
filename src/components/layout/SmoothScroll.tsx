"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

type LenisWithEvents = Lenis & {
  on: (event: string, cb: () => void) => void;
  off: (event: string, cb: () => void) => void;
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    }) as LenisWithEvents;

    // Expose on window immediately so CinematicHeroScene01 can find it
    (window as Window & { __lenis?: LenisWithEvents }).__lenis = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      delete (window as Window & { __lenis?: LenisWithEvents }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
