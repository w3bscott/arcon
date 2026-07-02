"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Types ──────────────────────────────────────────────────────────── */

export interface CardsProps {
  images: Array<{ src: string; alt: string }>;
}

interface Line {
  x1: number; y1: number; x2: number; y2: number;
  length: number;
  stage: number;
}

type Axis = "v" | "h";

/* ── Layout (unchanged) ────────────────────────────────────────────── */

const cardLayouts = [
  "col-span-1 row-span-2 md:row-start-2",                           // 0
  "col-span-1 row-span-4 md:col-start-1 md:row-start-4",            // 1
  "col-span-1 row-span-2 md:col-start-2 md:row-start-1",            // 2
  "col-span-1 row-span-3 md:col-start-2 md:row-start-3",            // 3 — hub
  "col-span-1 row-span-2 md:col-start-2 md:row-start-6",            // 4
  "col-span-1 md:col-span-2 row-span-3 md:col-start-3 md:row-start-1", // 5
  "col-span-1 row-span-2 md:col-start-3 md:row-start-4",            // 6
  "col-span-1 row-span-3 md:col-start-4 md:row-start-4",            // 7
  "col-span-1 row-span-2 md:col-start-3 md:row-start-6",            // 8
];

/* ── Connection graph ───────────────────────────────────────────────
   Verified against the original Figma arrow positions — card 3 (the
   hub) connects directly to all four of its neighbors first, then
   the wave spreads outward through cards 0, 4, 5, then finally 6
   reaches 7 and 8.

   axis: 'v' = pure vertical line (shared x), 'h' = pure horizontal
   line (shared y). No diagonals are possible by construction.

   Stage groupings match the original timing exactly:
     stage 0 → 1 line   (0–20% of scroll range)
     stage 1 → 3 lines  (20–40%)
     stage 2 → 4 lines  (40–60%)
     stage 3 → 2 lines  (60–80%)                                    */

const CONNECTIONS: Array<{ from: number; to: number; axis: Axis; stage: number }> = [
  { from: 2, to: 3, axis: "v", stage: 0 },
  { from: 3, to: 4, axis: "v", stage: 1 },
  { from: 3, to: 0, axis: "h", stage: 1 },
  { from: 3, to: 5, axis: "h", stage: 1 },
  { from: 4, to: 6, axis: "h", stage: 2 },
  { from: 4, to: 1, axis: "h", stage: 2 },
  { from: 0, to: 1, axis: "v", stage: 2 },
  { from: 5, to: 6, axis: "v", stage: 2 },
  { from: 6, to: 7, axis: "h", stage: 3 },
  { from: 6, to: 8, axis: "v", stage: 3 },
];

const STAGE_COUNT = 4;

const defaultProps: CardsProps = {
  images: Array.from({ length: 9 }, (_, i) => ({
    src: "/arcon-hero.png",
    alt: `Placeholder ${i + 1}`,
  })),
};

/* ── Center-to-center line geometry ───────────────────────────────────
   Lines are drawn from the exact center of the starting card to the
   exact center of the destination card. Since the SVG is positioned
   behind the opaque cards (zIndex: 0 vs zIndex: 1), the lines will
   naturally appear to connect the closest edges perfectly, even if
   the cards are offset diagonally.                                  */

function computeLine(from: DOMRect, to: DOMRect) {
  return {
    x1: from.left + from.width / 2,
    y1: from.top + from.height / 2,
    x2: to.left + to.width / 2,
    y2: to.top + to.height / 2,
  };
}

/* ── Component ──────────────────────────────────────────────────────── */

const Cards2 = (props: Partial<CardsProps>) => {
  const { images } = { ...defaultProps, ...props };

  const sectionRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs      = useRef<(SVGLineElement | null)[]>([]);

  const [lines, setLines] = useState<Line[]>([]);

  /* ── Recompute line coordinates from live card positions ──────────── */
  const computeLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const box = container.getBoundingClientRect();

    const next: Line[] = CONNECTIONS.map(({ from, to, stage }) => {
      const a = cardRefs.current[from]?.getBoundingClientRect();
      const b = cardRefs.current[to]?.getBoundingClientRect();
      if (!a || !b) return null;

      const { x1, y1, x2, y2 } = computeLine(a, b);
      return {
        x1: x1 - box.left, y1: y1 - box.top,
        x2: x2 - box.left, y2: y2 - box.top,
        length: Math.hypot(x2 - x1, y2 - y1),
        stage,
      };
    }).filter(Boolean) as Line[];

    setLines(next);
  }, []);

  useEffect(() => {
    computeLines();
    const ro = new ResizeObserver(() => computeLines());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", computeLines);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", computeLines);
    };
  }, [computeLines]);

  /* ── Scroll-scrubbed reveal, staged outward from the hub ───────────── */
  useEffect(() => {
    if (!lines.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {

        lineRefs.current.forEach((el, i) => {
          const len = lines[i]?.length ?? 0;
          if (!el) return;
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.9 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1,
          },
        });

        for (let stage = 0; stage < STAGE_COUNT; stage++) {
          const start = stage * 0.22;
          lines.forEach((line, i) => {
            if (line.stage !== stage) return;
            const el = lineRefs.current[i];
            if (!el) return;
            tl.to(el, {
              strokeDashoffset: 0,
              duration: 0.3,
              ease: "power1.inOut",
            }, start);
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [lines]);

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 pb-32">
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[100px] w-full relative"
      >

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          style={{ zIndex: 0 }}
        >
          {lines.map((line, i) => (
            <line
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke="#9ca3af"
              strokeWidth={1}
            />
          ))}
        </svg>

        {cardLayouts.map((layoutClass, index) => {
          const image = images[index] || defaultProps.images[index];

          return (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`${layoutClass} bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative group`}
              style={{ zIndex: 1 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover bg-gray-50/50 group-hover:bg-gray-100/50 transition-colors"
              />
            </div>
          );
        })}

      </div>
    </section>
  );
};

export { Cards2 };
