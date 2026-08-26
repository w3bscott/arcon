"use client";
import { SquareArrowOutUpRight, Moon, Sun } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

interface PreviewAreaProps {
  children?: React.ReactNode;
  styleVariant?: ShowcaseStyleVariant;
  slug?: string;
}

export function PreviewArea({ children, styleVariant = "1", slug }: PreviewAreaProps) {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <div className={`relative border border-border rounded-xl flex flex-col transition-colors duration-200 overflow-hidden ${isDark ? "dark" : ""}`}>
      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-1 z-50">
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors p-1"
          title="Toggle light/dark mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {slug && (
          <Link
            href={`/blocks/${slug}/preview?style=${styleVariant}&dark=${isDark}`}
            target="_blank"
            className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors p-1"
            title="Open isolated preview"
          >
            <SquareArrowOutUpRight className="w-5 h-5" />
          </Link>
        )}
      </div>
      
      {children ? (
        children
      ) : (
        <div className={`flex items-center justify-center min-h-[320px] bg-background`}>
          <p className={`font-sans text-sm text-muted-foreground text-center`}>
            Live preview — coming in Phase 2
          </p>
        </div>
      )}
    </div>
  );
}
