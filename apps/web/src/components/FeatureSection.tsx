"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BoxScanIllustration } from "@/components/BoxScanIllustration";


gsap.registerPlugin(ScrollTrigger);

/* ── Types ──────────────────────────────────────────────────────────── */

interface Feature {
  title: string;
  description: string;
  // image: { src: string; alt: string };
  align: "left" | "right";
}

export interface FeatureSectionProps {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaHref: string;
  features: Feature[];
  className: string;
}

/* ── Constants ──────────────────────────────────────────────────────── */

// const PLACEHOLDER_IMAGE =
//   "https://www.figma.com/api/mcp/asset/85444bcb-567f-4829-b3fe-64bc749572ef";

const IMAGE_HEIGHT = 208;

const defaultProps: FeatureSectionProps = {
  heading: "From primitives\nto complete flows",
  subheading:
    "ArcForge gives developers reusable building blocks that compose into multi-step product experiences. Build Arc-specific transaction UX with polished starting points.",
  ctaText: "Read the docs",
  ctaHref: "/docs/introduction",
  features: [
    {
      title: "Installable UI Blocks",
      description:
        "Reusable, unopinionated building blocks you can install directly into your codebase. You own the code, the styling, and the structure.",
      // image: { src: PLACEHOLDER_IMAGE, alt: "Installable UI Blocks" },
      align: "left",
    },
    {
      title: "Complete Flows",
      description:
        "Higher-level compositions assembled from blocks. Drop in an entire multi-step transfer experience instead of wiring up individual inputs.",
      // image: { src: PLACEHOLDER_IMAGE, alt: "Complete Flows" },
      align: "right",
    },
    {
      title: "Built for Arc Infrastructure",
      description:
        "Every block is designed specifically for Arc Network capabilities. Map directly to SDK methods without writing boilerplate integration logic.",
      // image: { src: PLACEHOLDER_IMAGE, alt: "Built for Arc Infrastructure" },
      align: "left",
    },
  ],
  className: "",
};

/* ── Component ──────────────────────────────────────────────────────── */

const FeatureSection = (props: Partial<FeatureSectionProps>) => {
  const { heading, subheading, ctaText, ctaHref, features, className } = {
    ...defaultProps,
    ...props,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs      = useRef<(HTMLDivElement | null)[]>([]);

  const setActiveDot = useCallback((index: number) => {
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.height     = i === index ? "22px" : "9px";
      dot.style.background = i === index ? "#374151" : "#9ca3af";
    });
  }, []);

  useEffect(() => {
    if (!features?.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        features.forEach((_, i) => {
          const card  = cardRefs.current[i];
          const image = imageRefs.current[i];
          if (!card || !image) return;

        /* ── Tween ──────────────────────────────────────────────────── */

          const tween = gsap.fromTo(
            image,
            { height: 0 },
            {
              height: IMAGE_HEIGHT,
              duration: 0.55,
              ease: "power2.out",
              paused: true,
            // onComplete: () => {
            //   // Card fully open — play trigger no longer needed
            //   playTrigger.kill();
            // },
            // onReverseComplete: () => {
            //   // Card fully closed — re-arm the play trigger
            //   // so the card can animate again on next scroll down
            //   playTrigger = createPlayTrigger();
            // },
            }
          );

          ScrollTrigger.create({
            trigger: card,
            start: i === 0
              ? "top 30%"
              : i === 1
              ? "top 10%"
              : "top -20%",

            onEnter: () => {
              setActiveDot(i);
              if (!tween.isActive()) tween.play();
            },

            onEnterBack: () => {
              setActiveDot(i);
              if (!tween.isActive()) tween.play();
            },

            onLeaveBack: () => {
              if (!tween.isActive()) tween.reverse();
            },
          });

        /* ── Play trigger factory ───────────────────────────────────── */
        // Extracted into a function so it can be recreated after a reverse

        // const createPlayTrigger = () =>
        //   ScrollTrigger.create({
        //     trigger: card,
        //     markers: true,
        //     start: "top 30%",
        //     onEnter:     () => { if (!tween.isActive()) tween.play(); },
        //     onEnterBack: () => { if (!tween.isActive()) tween.play(); },
        //   });

        // let playTrigger = createPlayTrigger();

        /* ── Reverse trigger ────────────────────────────────────────── */
        // 50px buffer: fires when user scrolls back so card top
        // is 50px below the viewport top, giving a small grace zone

        // ScrollTrigger.create({
        //   trigger: card,
        //   start: "top top+=90",
        //   onLeaveBack: () => tween.reverse(),
        // });

        /* ── Dot tracker ────────────────────────────────────────────── */

        // ScrollTrigger.create({
        //   trigger: card,
        //   start: "top 20%",
        //   end: "bottom center",
        //   markers:true,
        //   onEnter:     () => setActiveDot(i),
        //   onEnterBack: () => setActiveDot(i),
        // });
        });
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [features, setActiveDot]);

  /* ── Render ─────────────────────────────────────────────────────────── */

  return (
    <section
      ref={containerRef}
      className={`w-full bg-black py-24 md:py-48 ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 md:gap-6 mb-14 md:mb-20">
          <h2 className="text-[2.15rem] md:text-5xl font-semibold text-center text-gray-100 leading-[1.05] md:leading-none tracking-tight">
            {heading?.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          <p className="text-base md:text-lg text-gray-300 text-center max-w-[682px] leading-7">
            {subheading}
          </p>

          <Link
            href={ctaHref!}
            className="mt-2 inline-flex items-center gap-2 border border-gray-200 text-sm font-medium text-gray-100 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 hover:text-black transition-colors"
          >
            {ctaText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Cards + dot indicator */}
        <div className="relative max-w-[1024px] mx-auto">

          {/* Sticky dot column */}
          <div className="absolute hidden lg:flex inset-0 justify-center pointer-events-none">
            <div className="sticky top-1/2 -translate-y-1/2 h-fit flex flex-col gap-1 self-start mt-[50vh]">
              {features?.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="w-[9px] rounded-[10px] transition-all duration-300"
                  style={{ height: "9px", background: "#9ca3af" }}
                />
              ))}
            </div>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-5 md:gap-6">
            {features?.map((feature, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`flex justify-start ${feature.align === "right" ? "md:justify-end" : "md:justify-start"}`}
              >
                <div className={`bg-white ${i === 0 ? "mt-8 md:mt-16" : "mt-5 md:mt-20"} border border-gray-100 rounded-xl md:rounded-2xl p-5 md:p-6 w-full md:max-w-[437px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]`}>

                  <p className="text-base md:text-lg font-semibold text-gray-900 leading-6 md:leading-7 mb-4">
                    {feature.title}
                  </p>

                  {/* Animated image container */}
                  <div
                    ref={(el) => { imageRefs.current[i] = el; }}
                    className="w-full flex items-center justify-center overflow-hidden"
                  >
                   <BoxScanIllustration className="h-[150px] w-[152px] md:h-[179px] md:w-[181px]" />
                  </div>

                  <p className="text-sm md:text-base text-gray-500 leading-6 mt-4">
                    {feature.description}
                  </p>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export { FeatureSection };
