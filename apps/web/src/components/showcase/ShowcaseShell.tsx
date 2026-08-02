"use client";

import React from "react";
import { skins, type ShowcaseStyleVariant } from "@/lib/showcase-theme";

interface ShowcaseShellProps {
  children: React.ReactNode;
  styleVariant: ShowcaseStyleVariant;
  className?: string;
}

export function ShowcaseShell({
  children,
  styleVariant,
  className = "",
}: ShowcaseShellProps) {
  const skin = skins[styleVariant];

  return (
    <div className={`w-full min-h-[320px] flex items-center justify-center p-8 ${skin.surfaceBg} transition-colors duration-300`}>
      <div
        className={[
          "relative w-[340px] mx-auto overflow-hidden",
          "animate-[riseIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both]",
          skin.cardBg,
          skin.cardBorder,
          skin.cardShadow,
          skin.cardRadius,
          skin.cardPadding,
          skin.textPrimary,
          className,
        ].join(" ")}
      >
        {/* Decorative glow for Style 3 */}
        {skin.glowGradient && (
          <div
            className="absolute -top-[60%] -left-[20%] w-[240px] h-[240px] pointer-events-none"
            style={{ background: skin.glowGradient }}
          />
        )}

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
