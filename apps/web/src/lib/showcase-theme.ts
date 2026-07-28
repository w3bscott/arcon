export type ShowcaseStyleVariant = "1" | "2" | "3";

export interface ShowcaseThemeTokens {
  surfaceClass: string;
  cardClass: string;
  radiusClass: string;
  spacingClass: string;
  shadowClass: string;
  borderClass: string;
  blurClass?: string;
  gradientClass?: string;
  textClass: string;
  mutedTextClass: string;
}

export const showcaseThemes: Record<ShowcaseStyleVariant, ShowcaseThemeTokens> = {
  // Style 1: Arc Default (Canonical)
  "1": {
    surfaceClass: "bg-[#fafafa]",
    cardClass: "bg-white",
    radiusClass: "rounded-xl",
    spacingClass: "p-6",
    shadowClass: "shadow-sm",
    borderClass: "border border-border",
    textClass: "text-foreground",
    mutedTextClass: "text-muted-foreground",
  },
  
  // Style 2: Minimal / Editorial
  "2": {
    surfaceClass: "bg-white",
    cardClass: "bg-white",
    radiusClass: "rounded-none",
    spacingClass: "p-8",
    shadowClass: "shadow-none",
    borderClass: "border-2 border-gray-900",
    textClass: "text-gray-900",
    mutedTextClass: "text-gray-500",
  },
  
  // Style 3: Dark Arc
  "3": {
    surfaceClass: "bg-zinc-950 relative overflow-hidden",
    cardClass: "bg-zinc-900/80 backdrop-blur-md relative z-10",
    radiusClass: "rounded-2xl",
    spacingClass: "p-6",
    shadowClass: "shadow-2xl shadow-green-900/20",
    borderClass: "border border-white/10",
    gradientClass: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/20 blur-[100px] rounded-full pointer-events-none z-0",
    textClass: "text-zinc-50",
    mutedTextClass: "text-zinc-400",
  }
};

export const transitionEasing = "transition-all duration-300 ease-out";
export const animationDurations = {
  entrance: "animate-in fade-in zoom-in-95 duration-500",
  shimmer: "animate-pulse duration-1000",
};

// Chain colors (presentation only, not passed into internal components)
export const chainColors: Record<string, string> = {
  Ethereum: "bg-blue-500",
  Optimism: "bg-red-500",
  Arbitrum: "bg-sky-500",
  Polygon: "bg-purple-500",
  Base: "bg-blue-600",
  Arc_Testnet: "bg-green-500",
};
