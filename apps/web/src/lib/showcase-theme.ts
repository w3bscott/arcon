export type ShowcaseStyleVariant = "1" | "2" | "3";

/* ── Per-skin color tokens ─────────────────────────────────────────── */

export interface ShowcaseSkinTokens {
  // Card shell
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  cardRadius: string;
  cardPadding: string;

  // Outer surface (behind the card in PreviewArea)
  surfaceBg: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Accents
  accentGreen: string;
  accentAmber: string;

  // Divider
  divider: string;

  // Interactive surfaces (refresh btn, hover surfaces)
  interactiveBg: string;
  interactiveText: string;

  // Chain row separator
  chainRowBorder: string;

  // Live pill
  livePillBg: string;
  livePillText: string;
  liveDotColor: string;

  // Input surfaces (for form components)
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputFocusBorder: string;

  // Buttons
  buttonPrimaryBg: string;
  buttonPrimaryText: string;
  buttonPrimaryHover: string;
  buttonSecondaryBg: string;
  buttonSecondaryText: string;
  buttonSecondaryBorder: string;

  // Decorative glow (Style 3 only)
  glowGradient?: string;
}

export const skins: Record<ShowcaseStyleVariant, ShowcaseSkinTokens> = {
  /* ── Style 1 — Arc Default (light, rounded) ──────────────────────── */
  "1": {
    cardBg: "bg-white",
    cardBorder: "border border-[#e4e4e7]",
    cardShadow: "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)]",
    cardRadius: "rounded-[20px]",
    cardPadding: "p-7",
    surfaceBg: "bg-[#f4f4f5]",
    textPrimary: "text-[#09090b]",
    textSecondary: "text-[#3f3f46]",
    textMuted: "text-[#71717a]",
    accentGreen: "text-[#16c268]",
    accentAmber: "text-[#d97706]",
    divider: "bg-[#f0f0f1]",
    interactiveBg: "bg-[#f4f4f5]",
    interactiveText: "text-[#71717a]",
    chainRowBorder: "border-[#f4f4f5]",
    livePillBg: "bg-[#ecfdf3]",
    livePillText: "text-[#0a7d3a]",
    liveDotColor: "#16c268",
    inputBg: "bg-white",
    inputBorder: "border-[#e4e4e7]",
    inputText: "text-[#09090b]",
    inputPlaceholder: "placeholder-[#a1a1aa]",
    inputFocusBorder: "focus:border-[#09090b]",
    buttonPrimaryBg: "bg-[#09090b]",
    buttonPrimaryText: "text-white",
    buttonPrimaryHover: "hover:bg-[#27272a]",
    buttonSecondaryBg: "bg-[#f4f4f5]",
    buttonSecondaryText: "text-[#3f3f46]",
    buttonSecondaryBorder: "border-[#e4e4e7]",
  },

  "2": {
    cardBg: "bg-white",
    cardBorder: "border-4 border-black",
    cardShadow: "shadow-[8px_8px_0px_0px_#000]",
    cardRadius: "rounded-none",
    cardPadding: "p-8",
    surfaceBg: "bg-white",
    textPrimary: "text-black font-black tracking-tighter",
    textSecondary: "text-black font-mono font-bold tracking-tight",
    textMuted: "text-gray-800 font-mono",
    accentGreen: "text-black",
    accentAmber: "text-black",
    divider: "bg-black",
    interactiveBg: "bg-[#bef264] border-4 border-black shadow-[2px_2px_0px_0px_#000]",
    interactiveText: "text-black font-black uppercase",
    chainRowBorder: "border-black border-b",
    livePillBg: "bg-[#bef264] border-2 border-black shadow-[2px_2px_0px_0px_#000] !rounded-none",
    livePillText: "text-black font-black uppercase tracking-tighter",
    liveDotColor: "#000",
    inputBg: "bg-white shadow-[4px_4px_0px_0px_#000] !rounded-none",
    inputBorder: "border-4 border-black",
    inputText: "text-black font-mono",
    inputPlaceholder: "placeholder-gray-500 font-mono",
    inputFocusBorder: "focus:border-black focus:ring-0 focus:outline-none",
    buttonPrimaryBg: "bg-[#bef264] !rounded-none border-4 border-black shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all",
    buttonPrimaryText: "text-black font-black uppercase tracking-tighter",
    buttonPrimaryHover: "hover:bg-[#a3e635]",
    buttonSecondaryBg: "bg-[#f472b6] !rounded-none border-4 border-black shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all",
    buttonSecondaryText: "text-black font-black uppercase tracking-tighter",
    buttonSecondaryBorder: "border-transparent",
  },

  /* ── Style 3 — Dark Arc (dark, glow) ─────────────────────────────── */
  "3": {
    cardBg: "bg-[#0b0b0d]",
    cardBorder: "border border-[#1c1c20]",
    cardShadow: "shadow-[0_0_0_1px_rgba(13,242,70,0.06),0_20px_40px_-16px_rgba(0,0,0,0.6)]",
    cardRadius: "rounded-[20px]",
    cardPadding: "p-7",
    surfaceBg: "bg-[#09090b]",
    textPrimary: "text-[#fafafa]",
    textSecondary: "text-[#d4d4d8]",
    textMuted: "text-[#a1a1aa]",
    accentGreen: "text-[#0df246]",
    accentAmber: "text-[#f0b429]",
    divider: "bg-[#1c1c20]",
    interactiveBg: "bg-[#18181b]",
    interactiveText: "text-[#a1a1aa]",
    chainRowBorder: "border-[#18181b]",
    livePillBg: "bg-[rgba(13,242,70,0.1)]",
    livePillText: "text-[#0df246]",
    liveDotColor: "#0df246",
    glowGradient: "radial-gradient(circle, rgba(13,242,70,0.14), transparent 70%)",
    inputBg: "bg-[#18181b]",
    inputBorder: "border-[#27272a]",
    inputText: "text-[#fafafa]",
    inputPlaceholder: "placeholder-[#52525b]",
    inputFocusBorder: "focus:border-[#0df246]",
    buttonPrimaryBg: "bg-[#0df246]",
    buttonPrimaryText: "text-[#09090b]",
    buttonPrimaryHover: "hover:bg-[#3bff6f]",
    buttonSecondaryBg: "bg-[#18181b]",
    buttonSecondaryText: "text-[#d4d4d8]",
    buttonSecondaryBorder: "border-[#27272a]",
  },
};

/* ── Chain colors (presentation only) ──────────────────────────────── */

export const chainColors: Record<string, string> = {
  Ethereum: "#627eea",
  Optimism: "#ff0420",
  Arbitrum: "#28a0f0",
  Polygon: "#8247e5",
  Base: "#0052ff",
  Arc_Testnet: "#0df246",
};

/* ── Skeleton theme helpers ────────────────────────────────────────── */

export const skeletonClass: Record<ShowcaseStyleVariant, string> = {
  "1": "bg-gradient-to-r from-[#ececed] via-[#f6f6f7] to-[#ececed] bg-[length:400%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]",
  "2": "bg-gray-300 border-4 border-black !rounded-none animate-pulse",
  "3": "bg-gradient-to-r from-[#1c1c20] via-[#27272a] to-[#1c1c20] bg-[length:400%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]",
};
