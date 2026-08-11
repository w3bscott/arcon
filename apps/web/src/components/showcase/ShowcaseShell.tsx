import React, { useId } from "react";
import { skins, styleVariables, type ShowcaseStyleVariant } from "@/lib/showcase-theme";

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
  const vars = styleVariables[styleVariant];
  const shellId = "shell-" + useId().replace(/:/g, "");

  const css = `
    .${shellId} {
      ${Object.entries(vars.light).map(([k, v]) => `${k}: ${v};`).join("\n      ")}
    }
    .dark .${shellId}, .dark.${shellId} {
      ${Object.entries(vars.dark).map(([k, v]) => `${k}: ${v};`).join("\n      ")}
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={`w-full min-h-[320px] flex items-center justify-center p-8 bg-background transition-colors duration-300 font-sans ${shellId}`}>
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
          {/* Decorative glow for Style 3 is removed in standard Shadcn setups, but we keep the fallback structure if needed */}
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
