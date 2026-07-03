"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  showCopy = true,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div
      className={`relative group rounded-lg bg-gray-950 border border-gray-800 overflow-hidden ${className}`}
    >
      {/* Language label */}
      {language && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
          <span className="text-[11px] font-mono font-medium text-gray-400 uppercase tracking-wider">
            {language}
          </span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-[11px]"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code */}
      <pre className="px-4 py-4 text-sm font-mono text-gray-200 overflow-x-auto leading-6 whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
