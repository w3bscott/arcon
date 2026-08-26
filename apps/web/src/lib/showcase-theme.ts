export type ShowcaseStyleVariant = "1" | "2" | "3" | "4";

export const semanticColors = {
  accentGreen: "#0df246",
  success: "#008026",
  successBg: "#e9fdee",
  error: "#ef4444",
  warning: "#9a6500",
  info: "#0097c7",
} as const;

export const style1 = {
  fontFamily: "Lexend, Inter, sans-serif",
  card: "bg-white rounded-[28px] p-8 flex flex-col gap-6 w-[400px] min-h-[470px]",
  inputBox: "bg-[#f4f4f5] rounded-[16px]",
  inputBoxError: "bg-[#f4f4f5] rounded-[16px] border border-[#ef4444]",
  labelText: "font-lexend font-medium text-[12px] uppercase text-[#71717a]",
  errorText: "font-lexend font-medium text-[12px] text-[#ef4444]",
  amountText: "font-lexend font-bold text-[28px]",
  titleText: "font-lexend font-extrabold text-[22px] text-[#09090b]",
  button: "w-full h-14 rounded-full bg-[#09090b] text-white font-lexend font-semibold text-[16px]",
  buttonDisabled: "opacity-70 cursor-not-allowed",
  divider: "h-px w-full bg-[#e4e4e7]",
  closeButton: "border border-[#d4d4d4] rounded-full p-[10px] flex items-center justify-center",
} as const;
export const styleVariables: Record<
  ShowcaseStyleVariant,
  { light: React.CSSProperties; dark: React.CSSProperties }
> = {
  "1": {
    light: {
      "--background": "#f4f4f5",
      "--foreground": "#09090b",
      "--card": "#ffffff",
      "--card-foreground": "#09090b",
      "--border": "#e4e4e7",
      "--primary": "#09090b",
      "--primary-foreground": "#ffffff",
      "--muted": "#f4f4f5",
      "--muted-foreground": "#71717a",
      "--radius": "20px",
    },
    dark: {
      "--background": "#09090b",
      "--foreground": "#fafafa",
      "--card": "#18181b",
      "--card-foreground": "#fafafa",
      "--border": "#27272a",
      "--primary": "#fafafa",
      "--primary-foreground": "#09090b",
      "--muted": "#27272a",
      "--muted-foreground": "#a1a1aa",
      "--radius": "20px",
    },
  },
  "2": {
    light: {
      "--background": "#ffffff",
      "--foreground": "#000000",
      "--card": "#ffffff",
      "--card-foreground": "#000000",
      "--border": "#000000",
      "--primary": "#bef264",
      "--primary-foreground": "#000000",
      "--secondary": "#f472b6",
      "--secondary-foreground": "#000000",
      "--muted": "#f3f4f6",
      "--muted-foreground": "#374151",
      "--radius": "0px",
    },
    dark: {
      "--background": "#000000",
      "--foreground": "#ffffff",
      "--card": "#000000",
      "--card-foreground": "#ffffff",
      "--border": "#ffffff",
      "--primary": "#bef264",
      "--primary-foreground": "#000000",
      "--secondary": "#f472b6",
      "--secondary-foreground": "#000000",
      "--muted": "#1f2937",
      "--muted-foreground": "#d1d5db",
      "--radius": "0px",
    },
  },
  "3": {
    light: {
      "--background": "oklch(1 0 0)",
      "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.145 0 0)",
      "--border": "oklch(0.922 0 0)",
      "--primary": "oklch(0.205 0 0)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.97 0 0)",
      "--muted-foreground": "oklch(0.556 0 0)",
      "--radius": "0.875rem",
    },
    dark: {
      "--background": "oklch(0.145 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.205 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(1 0 0 / 10%)",
      "--primary": "oklch(0.922 0 0)",
      "--primary-foreground": "oklch(0.205 0 0)",
      "--muted": "oklch(0.269 0 0)",
      "--muted-foreground": "oklch(0.708 0 0)",
      "--radius": "0.875rem",
    },
  },
  "4": {
    light: {
      "--background": "oklch(1 0 0)",
      "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.145 0 0)",
      "--border": "oklch(0.922 0 0)",
      "--primary": "oklch(0.205 0 0)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.97 0 0)",
      "--muted-foreground": "oklch(0.556 0 0)",
      "--radius": "0",
      "--font-geist-sans": "var(--font-outfit)",
    },
    dark: {
      "--background": "oklch(0.145 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.205 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(1 0 0 / 10%)",
      "--primary": "oklch(0.922 0 0)",
      "--primary-foreground": "oklch(0.205 0 0)",
      "--muted": "oklch(0.269 0 0)",
      "--muted-foreground": "oklch(0.708 0 0)",
      "--radius": "0",
      "--font-geist-sans": "var(--font-outfit)",
    },
  },
} as Record<ShowcaseStyleVariant, { light: Record<string, string>; dark: Record<string, string> }>;

export interface ShowcaseSkinTokens {
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  cardRadius: string;
  cardPadding: string;
  surfaceBg: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentGreen: string;
  accentAmber: string;
  divider: string;
  interactiveBg: string;
  interactiveText: string;
  chainRowBorder: string;
  livePillBg: string;
  livePillText: string;
  liveDotColor: string;
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputFocusBorder: string;
  buttonPrimaryBg: string;
  buttonPrimaryText: string;
  buttonPrimaryHover: string;
  buttonSecondaryBg: string;
  buttonSecondaryText: string;
  buttonSecondaryBorder: string;
}

const defaultSkin: ShowcaseSkinTokens = {
  cardBg: "bg-card",
  cardBorder: "border border-border",
  cardShadow: "shadow-sm",
  cardRadius: "rounded-[var(--radius)]",
  cardPadding: "p-7",
  surfaceBg: "bg-background",
  textPrimary: "text-foreground",
  textSecondary: "text-foreground/80",
  textMuted: "text-muted-foreground",
  accentGreen: "text-emerald-500",
  accentAmber: "text-amber-500",
  divider: "bg-border",
  interactiveBg: "bg-muted",
  interactiveText: "text-muted-foreground",
  chainRowBorder: "border-border",
  livePillBg: "bg-primary/10",
  livePillText: "text-primary",
  liveDotColor: "var(--primary)",
  inputBg: "bg-background",
  inputBorder: "border-border",
  inputText: "text-foreground",
  inputPlaceholder: "placeholder-muted-foreground",
  inputFocusBorder: "focus:border-primary",
  buttonPrimaryBg: "bg-primary",
  buttonPrimaryText: "text-primary-foreground",
  buttonPrimaryHover: "hover:opacity-90",
  buttonSecondaryBg: "bg-muted",
  buttonSecondaryText: "text-foreground",
  buttonSecondaryBorder: "border border-border",
};

export const skins: Record<ShowcaseStyleVariant, ShowcaseSkinTokens> = {
  "1": { ...defaultSkin, cardShadow: "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)]" },
  "2": {
    cardBg: "bg-card",
    cardBorder: "border-4 border-border",
    cardShadow: "shadow-[8px_8px_0px_0px_var(--border)]",
    cardRadius: "rounded-none",
    cardPadding: "p-8",
    surfaceBg: "bg-background",
    textPrimary: "text-foreground font-black tracking-tighter",
    textSecondary: "text-foreground font-mono font-bold tracking-tight",
    textMuted: "text-muted-foreground font-mono",
    accentGreen: "text-foreground",
    accentAmber: "text-foreground",
    divider: "bg-border",
    interactiveBg: "bg-primary border-4 border-border shadow-[2px_2px_0px_0px_var(--border)]",
    interactiveText: "text-primary-foreground font-black uppercase",
    chainRowBorder: "border-border border-b",
    livePillBg: "bg-primary border-2 border-border shadow-[2px_2px_0px_0px_var(--border)] !rounded-none",
    livePillText: "text-primary-foreground font-black uppercase tracking-tighter",
    liveDotColor: "var(--foreground)",
    inputBg: "bg-card shadow-[4px_4px_0px_0px_var(--border)] !rounded-none",
    inputBorder: "border-4 border-border",
    inputText: "text-foreground font-mono",
    inputPlaceholder: "placeholder-muted-foreground font-mono",
    inputFocusBorder: "focus:border-border focus:ring-0 focus:outline-none",
    buttonPrimaryBg: "bg-primary !rounded-none border-4 border-border shadow-[4px_4px_0px_0px_var(--border)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all",
    buttonPrimaryText: "text-primary-foreground font-black uppercase tracking-tighter",
    buttonPrimaryHover: "hover:opacity-90",
    buttonSecondaryBg: "bg-secondary !rounded-none border-4 border-border shadow-[4px_4px_0px_0px_var(--border)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all",
    buttonSecondaryText: "text-secondary-foreground font-black uppercase tracking-tighter",
    buttonSecondaryBorder: "border-transparent",
  },
  "3": defaultSkin,
  "4": defaultSkin,
};

export const skeletonClass: Record<ShowcaseStyleVariant, string> = {
  "1": "bg-gradient-to-r from-muted via-background to-muted bg-[length:400%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]",
  "2": "bg-muted border-4 border-border !rounded-none animate-pulse",
  "3": "bg-gradient-to-r from-muted via-background to-muted bg-[length:400%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]",
  "4": "bg-gradient-to-r from-muted via-background to-muted bg-[length:400%_100%] animate-[shimmer_1.6s_ease-in-out_infinite] !rounded-none",
};

export const chainColors: Record<string, string> = {
  Ethereum: "#627eea",
  Optimism: "#ff0420",
  Arbitrum: "#28a0f0",
  Polygon: "#8247e5",
  Base: "#0052ff",
  Arc_Testnet: "#0df246",
};
