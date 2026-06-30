"use client";

import { ChevronUp, ArrowRight } from "lucide-react";

/* ── Syntax token colors ────────────────────────────────────────────── */
const t = {
  comment:  "#8b949e", // Brightened for better contrast in dark mode
  keyword:  "#c792ea",
  string:   "#c3e88d",
  tag:      "#89ddff",
  attr:     "#80cbc4",
  num:      "#f78c6c",
  fn:       "#82aaff",
  muted:    "#a6b0c3",
  white:    "#e2e8f0",
};

/* ── Reusable code line ─────────────────────────────────────────────── */
type Token = { text: string; color: string };
const Line = ({ tokens, indent = 0 }: { tokens: Token[]; indent?: number }) => (
  <div
    className="leading-[1.7] whitespace-pre font-mono text-[12.5px]"
    style={{ paddingLeft: indent * 16 }}
  >
    {tokens.map((tk, i) => (
      <span key={i} style={{ color: tk.color }}>{tk.text}</span>
    ))}
  </div>
);
const BlankLine = () => <div className="h-[1.3em]" />;

/* ── Window chrome ──────────────────────────────────────────────────── */
const Chrome = ({ filename }: { filename: string }) => (
  <div className="flex items-center gap-1.5 mb-4">
    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    <span className="ml-2 text-[11px] font-mono text-[#4d5566]">{filename}</span>
  </div>
);

/* ── Before: manual boilerplate ─────────────────────────────────────── */
const BeforeCode = () => (
  <div className="text-left w-full">
    <Chrome filename="balance.tsx" />
    <Line tokens={[{ text: "// fetch chain balances manually", color: t.comment }]} />
    <Line tokens={[
      { text: "const ", color: t.keyword },
      { text: "kit", color: t.white },
      { text: " = new ", color: t.muted },
      { text: "AppKit", color: t.fn },
      { text: "()", color: t.muted },
    ]} />
    <Line tokens={[
      { text: "const ", color: t.keyword },
      { text: "[data, setData]", color: t.white },
      { text: " = ", color: t.muted },
      { text: "useState", color: t.fn },
      { text: "(", color: t.muted },
      { text: "null", color: t.keyword },
      { text: ")", color: t.muted },
    ]} />
    <BlankLine />
    <Line tokens={[{ text: "// ...chain normalization", color: t.comment }]} />
    <Line tokens={[{ text: "// ...pending amount aggregation", color: t.comment }]} />
    <Line tokens={[{ text: "// ...loading skeleton", color: t.comment }]} />
    <Line tokens={[{ text: "// ...error boundary + retry", color: t.comment }]} />
  </div>
);

/* ── After: arc/ui one-liner ────────────────────────────────────────── */
const AfterCode = () => (
  <div className="text-left w-full">
    <Chrome filename="page.tsx" />
    <Line tokens={[
      { text: "import ", color: t.keyword },
      { text: "{ ", color: t.muted },
      { text: "BalanceCard", color: t.white },
      { text: " } ", color: t.muted },
      { text: "from ", color: t.keyword },
      { text: "'@arc-ui/react'", color: t.string },
    ]} />
    <BlankLine />
    <Line tokens={[
      { text: "<", color: t.tag },
      { text: "BalanceCard", color: t.tag },
    ]} />
    <Line indent={1} tokens={[
      { text: "kit", color: t.attr },
      { text: "={", color: t.muted },
      { text: "kit", color: t.white },
      { text: "}", color: t.muted },
    ]} />
    <Line indent={1} tokens={[
      { text: "sources", color: t.attr },
      { text: "={", color: t.muted },
      { text: "sources", color: t.white },
      { text: "}", color: t.muted },
    ]} />
    {/* <Line indent={1} tokens={[
      { text: "includePending", color: t.attr },
    ]} /> */}
    <Line indent={1} tokens={[
      { text: "theme", color: t.attr },
      { text: "=", color: t.muted },
      { text: '"dark"', color: t.string },
    ]} />
    <Line indent={1} tokens={[
      { text: "className", color: t.attr },
      { text: "=", color: t.muted },
      { text: '"w-full max-w-sm"', color: t.string },
    ]} />
    <Line indent={1} tokens={[
      { text: "refreshInterval", color: t.attr },
      { text: "={", color: t.muted },
      { text: "30000", color: t.num },
      { text: "}", color: t.muted },
    ]} />
    <Line tokens={[
      { text: "/>", color: t.tag },
    ]} />
  </div>
);

/* ── Types ──────────────────────────────────────────────────────────── */
interface HeroPreviewProps {
  className?: string;
}

/* ── Component ──────────────────────────────────────────────────────── */
// Note: Animations are now fully driven by Hero.tsx using class selectors.
const HeroPreview = ({ className = "" }: HeroPreviewProps) => {
  return (
    <div className={`bg-gray-200 border border-white/40 rounded-3xl p-4 w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* ── Row 1 ── */}
        {/* Before code card */}
        <div className="preview-before-card md:col-span-2 bg-[#0d1117] h-[260px] rounded-2xl overflow-hidden relative shrink-0">
          <div className="preview-before absolute inset-0 p-5 pb-12 flex items-start justify-start will-change-transform will-change-opacity">
            <BeforeCode />
          </div>
          {/* <div className="preview-before-label absolute bottom-0 left-0 p-5 flex items-center gap-1.5">
            <span className="text-[15px] font-medium text-white/90">Before</span>
            <ChevronUp className="w-3.5 h-3.5 text-white/90" />
          </div> */}
        </div>

        {/* 100+ metric card */}
        <div className="metric-card md:col-span-1 bg-[#f4f4f5] h-[260px] rounded-2xl p-10 overflow-hidden shrink-0">
          <div className="flex flex-col h-full justify-end text-left gap-4">
            <p className="text-5xl font-normal text-[#09090b] leading-none flex">
              <span className="metric-1-val">0</span>
              <span className="metric-1-plus">+</span>
            </p>
            <p className="text-lg font-normal text-[#09090b] leading-7">
              Unoptimized lines of code and workflows
            </p>
          </div>
        </div>

        {/* ── Row 2 ── */}
        {/* 10 metric card */}
        <div className="metric-card md:col-span-1 bg-[#f4f4f5] h-[260px] rounded-2xl p-10 overflow-hidden shrink-0">
          <div className="flex flex-col h-full justify-end text-left gap-4">
            <p className="text-5xl font-normal text-[#09090b] leading-none metric-2-val">0</p>
            <p className="text-lg font-normal text-[#09090b] leading-7">
              Streamlined workflow and maintainable code
            </p>
          </div>
        </div>

        {/* After code card */}
        <div className="preview-after-card md:col-span-2 bg-[#0d1117] h-[260px] rounded-2xl overflow-hidden relative shrink-0 transition-shadow duration-300">
          <div className="preview-after absolute inset-0 p-5 pb-12 flex items-start justify-start will-change-transform will-change-opacity">
            <AfterCode />
          </div>
          {/* <div className="preview-after-label absolute bottom-0 left-0 p-5 flex items-center gap-2">
            <span className="text-[15px] font-medium text-white/90">After</span>
            <ArrowRight className="w-4 h-4 text-white/90" />
          </div> */}
        </div>

      </div>
    </div>
  );
};

export { HeroPreview };