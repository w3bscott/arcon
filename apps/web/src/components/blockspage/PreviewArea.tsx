import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

interface PreviewAreaProps {
  children?: React.ReactNode;
  styleVariant?: ShowcaseStyleVariant;
  slug?: string;
}

export function PreviewArea({ children, styleVariant = "1", slug }: PreviewAreaProps) {
  // Determine if it's the dark variant (Style 3)
  const isDark = styleVariant === "3";
  
  return (
    <div className={`relative border border-[#e4e4e7] rounded-xl flex flex-col transition-colors duration-200 overflow-hidden`}>
      {slug && (
        <Link
          href={`/blocks/${slug}/preview?style=${styleVariant}`}
          target="_blank"
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors z-50"
          title="Open isolated preview"
        >
          <SquareArrowOutUpRight className="w-5 h-5" />
        </Link>
      )}
      
      {children ? (
        children
      ) : (
        <div className={`flex items-center justify-center min-h-[320px] ${isDark ? 'bg-zinc-900' : 'bg-[#fafafa]'}`}>
          <p className={`font-sans text-sm ${isDark ? 'text-zinc-400' : 'text-[#71717a]'} text-center`}>
            Live preview — coming in Phase 2
          </p>
        </div>
      )}
    </div>
  );
}
