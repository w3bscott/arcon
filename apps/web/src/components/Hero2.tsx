"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroPreview } from "./HeroPreview";

gsap.registerPlugin(ScrollTrigger);

export interface Hero2Props {
  badgeText: string;
  badgeHref: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  installCommand: string;
}

const DEFAULT_PROPS: Hero2Props = {
  badgeText: "Explore Blocks",
  badgeHref: "/blocks",
  title: "Build Faster with ArcForge",
  description:
    "Pre-built UI components for Circle's Arc App Kit.\nInstall, connect, and ship production ready interfaces faster.",
  primaryButtonText: "Browse Blocks",
  primaryButtonHref: "/blocks",
  secondaryButtonText: "View Github",
  secondaryButtonHref: "#",
  installCommand: "$ npm install @arcforge/react @circle-fin/app-kit",
};

const Hero2 = (props: Partial<Hero2Props>) => {
  const {
    badgeText,
    badgeHref,
    title,
    description,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
    installCommand,
  } = { ...DEFAULT_PROPS, ...props };
  const descriptionLines = description.split("\n");

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const content = contentRef.current;
    const dashboard = dashboardRef.current;

    if (!section || !pin || !content || !dashboard) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(dashboard, {
          opacity: 0.99,
          y: 325,
          scale: 0.5,
        });

        gsap.set(".preview-before", { opacity: 1 });
        gsap.set(".preview-before-label", { opacity: 1 });
        gsap.set(".preview-after", { opacity: 0.3 });
        gsap.set(".preview-after-label", { opacity: 0 });
        gsap.set(".preview-after-card", { boxShadow: "none" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top-=86 top",
            end: "+=100%",
            scrub: true,
            pin: pin,
          },
        });

        tl.to(content, {
          z: -800,
          scale: 0.8,
          ease: "none",
          duration: 0.6,
        }, 0);

        tl.to(content, {
          opacity: 0,
          ease: "none",
          duration: 0.5,
        }, 0.1);

        tl.to(dashboard, {
          opacity: 1,
          y: -80,
          scale: 1,
          duration: 0.3,
        }, 0.1);

        tl.to(".preview-before", { opacity: 0.3, duration: 0.15, ease: "power1.inOut" }, 0.5);

        const metrics = { val1: 0, val2: 0 };
        tl.to(metrics, {
          val1: 100,
          val2: 10,
          duration: 0.15,
          ease: "none",
          onUpdate: () => {
            const el1 = section.querySelector(".metric-1-val");
            if (el1) el1.textContent = Math.floor(metrics.val1).toString();
            const el2 = section.querySelector(".metric-2-val");
            if (el2) el2.textContent = Math.floor(metrics.val2).toString();
          },
        }, 0.4);

        tl.to(".preview-after", { opacity: 1, y: 0, duration: 0.15, ease: "power1.inOut" }, 0.4);
        tl.to(".preview-after-card", { boxShadow: "0 25px 50px -12px rgba(255,255,255,0.1)", duration: 0.2 }, 0.6);
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
    >
      <div
        ref={pinRef}
        className="relative overflow-hidden min-h-[560px] h-auto md:min-h-[750px] md:h-[85vh]"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white rounded-full blur-[100px] opacity-50 pointer-events-none" />

        <div
          className="relative h-full px-4 max-w-7xl mx-auto flex flex-col items-center justify-start pt-14 pb-16 md:pt-20 md:pb-0"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={contentRef}
            className="flex flex-col items-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Link
              href={badgeHref}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs md:text-sm font-medium bg-white border border-gray-200 rounded-full text-gray-800 hover:bg-gray-50 transition-colors mb-6 md:mb-8"
            >
              {badgeText}
              <ArrowDownRight className="w-3 h-3" strokeWidth={2} />
            </Link>

            <h1 className="text-[2rem] leading-[0.98] text-center md:text-7xl font-bold tracking-tight text-black mb-5 md:mb-6 md:max-w-[11ch] md:max-w-4xl">
              {title}
            </h1>

            <p className="text-base leading-7 text-center md:text-xl md:leading-8 text-gray-500 mb-8 md:mb-10 max-w-[32rem] md:max-w-2xl whitespace-pre-line">
              {descriptionLines.map((line, index) => (
                <span key={line} className={index > 0 ? "hidden md:block" : "block"}>
                  {line}
                </span>
              ))}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-8 md:mb-12 w-full sm:w-auto max-w-xs sm:max-w-none">
              <Link
                href={secondaryButtonHref}
                className="px-5 md:px-6 py-3 text-sm font-medium bg-white border border-gray-200 text-black rounded-xl hover:bg-gray-50 transition-colors text-center"
              >
                {secondaryButtonText}
              </Link>
              <Link
                href={primaryButtonHref}
                className="px-5 md:px-6 py-3 text-sm font-medium bg-[#111111] text-white rounded-xl hover:bg-black transition-colors shadow-sm text-center"
              >
                {primaryButtonText}
              </Link>
            </div>

            <div className="inline-flex items-center justify-center px-3 md:px-4 py-2.5 text-[11px] sm:text-xs md:text-sm font-mono text-gray-600 bg-white/6 border border-gray-200/5 rounded-full shadow-sm w-full max-w-[22rem] md:w-auto md:max-w-none overflow-hidden text-ellipsis whitespace-nowrap">
              {installCommand}
            </div>
          </div>

          <div
            ref={dashboardRef}
            className="absolute hidden md:block inset-x-0 top-1/2 -translate-y-1/2 w-full max-w-5xl mx-auto flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero2 };
