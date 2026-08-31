"use client";

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

/* ── Before: manual SDK integration ─────────────────────────────────── */
const BeforeCode = () => (
  <div className="text-left w-full">
    <Chrome filename="balance.tsx — manual integration" />
    <Line tokens={[
      { text: "const ", color: t.keyword },
      { text: "[balances, setBalances]", color: t.white },
      { text: " = ", color: t.muted },
      { text: "useState", color: t.fn },
      { text: "<", color: t.muted },
      { text: "Balance[]", color: t.white },
      { text: ">([])", color: t.muted },
    ]} />
    <Line tokens={[
      { text: "const ", color: t.keyword },
      { text: "[loading, setLoading]", color: t.white },
      { text: " = ", color: t.muted },
      { text: "useState", color: t.fn },
      { text: "(", color: t.muted },
      { text: "true", color: t.keyword },
      { text: ")", color: t.muted },
    ]} />
    <Line tokens={[
      { text: "const ", color: t.keyword },
      { text: "[error, setError]", color: t.white },
      { text: " = ", color: t.muted },
      { text: "useState", color: t.fn },
      { text: "<", color: t.muted },
      { text: "Error", color: t.white },
      { text: ">()", color: t.muted },
    ]} />
    <BlankLine />
    <Line tokens={[
      { text: "useEffect", color: t.fn },
      { text: "(() => {", color: t.muted },
    ]} />
    <Line indent={1} tokens={[{ text: "// fetch balances across chains", color: t.comment }]} />
    <Line indent={1} tokens={[{ text: "// normalize token decimals", color: t.comment }]} />
    <Line indent={1} tokens={[{ text: "// aggregate pending amounts", color: t.comment }]} />
    <Line indent={1} tokens={[{ text: "// handle refresh interval", color: t.comment }]} />
    <Line indent={1} tokens={[{ text: "// format currency display", color: t.comment }]} />
    <Line indent={1} tokens={[{ text: "// build loading skeleton", color: t.comment }]} />
    <Line indent={1} tokens={[{ text: "// wire error retry logic", color: t.comment }]} />
    <Line tokens={[{ text: "}, [])", color: t.muted }]} />
  </div>
);

/* ── After: install a block and use it ──────────────────────────────── */
const AfterCode = () => (
  <div className="text-left w-full">
    <Chrome filename="terminal + page.tsx" />
    <Line tokens={[{ text: "# install the block", color: t.comment }]} />
    <Line tokens={[
      { text: "npx ", color: t.white },
      { text: "shadcn add ", color: t.fn },
      { text: "balance-card", color: t.string },
    ]} />
    <BlankLine />
    <Line tokens={[{ text: "// use it", color: t.comment }]} />
    <Line tokens={[
      { text: "import ", color: t.keyword },
      { text: "{ ", color: t.muted },
      { text: "BalanceCard", color: t.white },
      { text: " } ", color: t.muted },
      { text: "from ", color: t.keyword },
      { text: "'./components/balance-card'", color: t.string },
    ]} />
    <BlankLine />
    <Line tokens={[
      { text: "<", color: t.tag },
      { text: "BalanceCard ", color: t.tag },
      { text: "walletId", color: t.attr },
      { text: "={", color: t.muted },
      { text: "id", color: t.white },
      { text: "} ", color: t.muted },
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
    <div className={`bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl p-4 w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* ── Row 1 ── */}
        {/* Before code card */}
        <div className="preview-before-card md:col-span-2 bg-[#0d1117] h-[260px] rounded-2xl overflow-hidden relative shrink-0">
          <div className="preview-before absolute inset-0 p-5 pb-12 flex items-start justify-start will-change-transform will-change-opacity">
            <BeforeCode />
          </div>
        </div>

        {/* 100+ metric card */}
        <div className="metric-card md:col-span-1 bg-muted h-[260px] rounded-2xl p-10 overflow-hidden shrink-0">
          <div className="flex flex-col h-full justify-end text-left gap-4">
            <p className="text-5xl font-normal text-foreground leading-none flex">
              <span className="metric-1-val">0</span>
              <span className="metric-1-plus">+</span>
            </p>
            <p className="text-lg font-normal text-foreground leading-7">
              Lines of manual integration code
            </p>
          </div>
        </div>

        {/* ── Row 2 ── */}
        {/* 10 metric card */}
        <div className="metric-card md:col-span-1 bg-muted h-[260px] rounded-2xl p-10 overflow-hidden shrink-0">
          <div className="flex flex-col h-full justify-end text-left gap-4">
            <p className="text-5xl font-normal text-foreground leading-none metric-2-val">0</p>
            <p className="text-lg font-normal text-foreground leading-7">
              Lines with ArcForge
            </p>
          </div>
        </div>

        {/* After code card */}
        <div className="preview-after-card md:col-span-2 bg-[#0d1117] h-[260px] rounded-2xl overflow-hidden relative shrink-0 transition-shadow duration-300">
          <div className="preview-after absolute inset-0 p-5 pb-12 flex items-start justify-start will-change-transform will-change-opacity">
            <AfterCode />
          </div>
        </div>

      </div>
    </div>
  );
};

export { HeroPreview };
