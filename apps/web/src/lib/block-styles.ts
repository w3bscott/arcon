export type StyleVariant = "1" | "2" | "3" | "4";

const baseStyles = {
  "1": "bg-white border border-gray-200 rounded-xl p-6 shadow-sm",
  "2": "bg-white border-2 border-gray-900 rounded-lg p-6 shadow-md",
  "3": "bg-zinc-100 border border-zinc-200 rounded-2xl p-6",
  "4": "bg-zinc-950 text-zinc-50 border border-green-500 rounded-xl p-6 shadow-lg shadow-green-900/20",
};

export function getBlockStyle(slug: string, style: StyleVariant): string {
  // We can apply specific overrides per slug if needed, but for now we use consistent variants
  return baseStyles[style] || baseStyles["1"];
}
