// components/blockspage/BlocksHeader.tsx
"use client";

import { Sparkles, Component, Box, Blocks as BlocksIcon, Puzzle, Layers } from "lucide-react";

interface DecorativeIcon {
  icon: React.ComponentType<{ className?: string }>;
  left: string;
  top: string;
  rotate: number;
}

// Positions/rotations converted from the Figma spec (original frame ~1190px wide)
const decorativeIcons: DecorativeIcon[] = [
  { icon: Sparkles, left: "7%", top: "111px", rotate: 15 },
  { icon: Component, left: "11.5%", top: "30px", rotate: -6.76 },
  { icon: Box, left: "19.7%", top: "78px", rotate: -30 },
  { icon: BlocksIcon, left: "74.8%", top: "51px", rotate: 150 },
  { icon: Puzzle, left: "81.8%", top: "117px", rotate: 173.24 },
  { icon: Layers, left: "88.5%", top: "37px", rotate: -165 },
];

export function BlocksHeader() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 xl:px-32 pt-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-muted via-muted/60 to-background flex flex-col items-center justify-center gap-3 py-6 md:py-8 px-6">

        <img className="absolute left-[-200] top-[90] grayscale-95 scale-140 opacity-18" src={'/12.jpg'}/>
        {/* <img className="absolute mix-blend-luminosity opacity-20 scale-105 inset-0" src={'/blocks-header.jpg'}/> */}

        {/* Decorative floating icon chips — hidden on mobile to avoid clutter */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          {decorativeIcons.map(({ icon: Icon, left, top, rotate }, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center size-[34px] rounded-lg bg-white/50 border border-gray-200 backdrop-blur-sm"
              style={{ left, top, transform: `rotate(${rotate}deg)` }}
            >
              <Icon className="size-[18px] text-foreground/70" />
            </div>
          ))}
        </div>

        {/* Title + subtitle */}
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-3">
            Forge Blocks
          </h1>
          <p className="text-base font-regular text-muted-foreground leading-6">
            Production-ready financial interface blocks for Arc App Kit.
            <br className="hidden md:block" />
            Install, connect, and ship faster.
          </p>
        </div>
      </div>
    </div>
  );
}