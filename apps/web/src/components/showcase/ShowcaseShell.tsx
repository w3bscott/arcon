import React from "react";
import { showcaseThemes, ShowcaseStyleVariant, transitionEasing, animationDurations } from "@/lib/showcase-theme";

interface ShowcaseShellProps {
  children: React.ReactNode;
  styleVariant: ShowcaseStyleVariant;
  className?: string;
  animateEntrance?: boolean;
}

export function ShowcaseShell({
  children,
  styleVariant,
  className = "",
  animateEntrance = true,
}: ShowcaseShellProps) {
  const theme = showcaseThemes[styleVariant];

  return (
    <div className={`w-full min-h-[320px] flex items-center justify-center ${theme.surfaceClass} ${transitionEasing}`}>
      {styleVariant === "3" && theme.gradientClass && (
        <div className={theme.gradientClass} />
      )}
      
      <div 
        className={`
          relative w-full max-w-md mx-auto 
          ${theme.cardClass} 
          ${theme.radiusClass} 
          ${theme.borderClass} 
          ${theme.shadowClass} 
          ${theme.spacingClass}
          ${theme.textClass}
          ${animateEntrance ? animationDurations.entrance : ""}
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}
