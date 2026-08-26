import React, { useId } from "react";
import { skins, styleVariables, type ShowcaseStyleVariant } from "@/lib/showcase-theme";

interface ShowcaseShellProps {
  children: React.ReactNode;
  styleVariant: ShowcaseStyleVariant;
  className?: string;
  backgroundImage?: string | undefined;
}

export function ShowcaseShell({
  children,
  styleVariant,
  className = "",
  backgroundImage,
}: ShowcaseShellProps) {
  const skin = skins[styleVariant];
  const vars = styleVariables[styleVariant];
  const shellId = "shell-" + useId().replace(/:/g, "");

  // Automatically apply the Style 1 background if not explicitly overridden
  const effectiveBgImage = backgroundImage !== undefined
    ? backgroundImage
    : (styleVariant === "1" ? "/style1_bg.jpg" : undefined);

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
        {effectiveBgImage ? (
          /* Two-layer: outer clip container + inner card, with image peeking at bottom */
          <div
            className={[
              "relative w-[340px] mx-auto overflow-clip",
              "animate-[riseIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both]",
              skin.cardBorder,
              skin.cardShadow,
              skin.cardRadius,
              skin.textPrimary,
              className,
            ].join(" ")}
          >
            {/* Background image — sits at the very bottom of the outer container */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[408px] h-[70px] pointer-events-none overflow-hidden">
              <img
                alt=""
                src={effectiveBgImage}
                style={{ height: "582.86%", top: "-241.43%", position: "absolute", width: "100%" }}
              />
            </div>
            {/* White card — doesn't extend all the way down, leaving ~16px for image peek */}
            <div className={`relative ${skin.cardBg} ${skin.cardRadius} ${skin.cardPadding} mb-[-1px]`}>
              {children}
            </div>
            {/* Spacer — the gap where the image is visible */}
            <div className="h-[10px] relative" />
          </div>
        ) : (
          /* Standard single-layer card — no background image */
          <div
            className={[
              "relative w-[340px] mx-auto overflow-clip",
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
            <div className="relative">
              {children}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
