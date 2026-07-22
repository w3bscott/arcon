import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PreviewAreaProps {
  children?: React.ReactNode;
  className?: string;
  slug?: string;
}

export function PreviewArea({ children, className, slug }: PreviewAreaProps) {
  // Determine if it's the dark variant (Style 4)
  const isDark = className?.includes("bg-zinc-950") || className?.includes("bg-black");
  
  return (
    <div className={`relative ${isDark ? 'bg-zinc-900' : 'bg-[#fafafa]'} border border-[#e4e4e7] rounded-xl min-h-[320px] flex items-center justify-center p-8 transition-colors duration-200`}>
      {slug && (
        <Link
          href={`/blocks/${slug}/preview`}
          target="_blank"
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors"
          title="Open isolated preview"
        >
          <SquareArrowOutUpRight className="w-5 h-5" />
        </Link>
      )}
      
      {children ? (
        children
      ) : (
        <p className={`font-sans text-sm ${isDark ? 'text-zinc-400' : 'text-[#71717a]'} text-center`}>
          Live preview — coming in Phase 2
        </p>
      )}
    </div>
  );
}
