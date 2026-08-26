"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  content: string;
  className?: string;
}

export function CopyButton({ content, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`relative flex items-center justify-center p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10 ${className}`}
      aria-label="Copy code"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Check
          className={`absolute w-4 h-4 text-emerald-400 transition-all duration-300 ${
            copied ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
          }`}
        />
        <Copy
          className={`absolute w-4 h-4 transition-all duration-300 ${
            copied ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"
          }`}
        />
      </div>
    </button>
  );
}
