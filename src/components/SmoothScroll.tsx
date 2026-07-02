"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    let cleanupSmoothScroll: (() => void) | undefined;

    const startSmoothScroll = () => {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const updateLenis = (time: number) => {
        lenis.raf(time * 1000);
      };

      // Synchronize GSAP's ticker with Lenis
      gsap.ticker.add(updateLenis);

      gsap.ticker.lagSmoothing(0);

      cleanupSmoothScroll = () => {
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
      };
    };

    const syncSmoothScroll = () => {
      cleanupSmoothScroll?.();
      cleanupSmoothScroll = undefined;

      if (mediaQuery.matches) {
        startSmoothScroll();
      }
    };

    syncSmoothScroll();
    mediaQuery.addEventListener("change", syncSmoothScroll);

    return () => {
      mediaQuery.removeEventListener("change", syncSmoothScroll);
      cleanupSmoothScroll?.();
    };
  }, []);

  return <>{children}</>;
}
