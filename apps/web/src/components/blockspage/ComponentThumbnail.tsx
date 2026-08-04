import React from "react";

export function ComponentThumbnail({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-[200px] bg-background rounded-xl overflow-hidden flex items-center justify-center pointer-events-none border border-gray-100 mb-4">
      {/* 
        We use a very large inner container scaled down so the component renders 
        at its natural desktop size, but visually fits into the thumbnail box.
      */}
      <div className="absolute flex justify-center items-center w-[800px] h-[400px] origin-center transform scale-[0.5]">
        {children}
      </div>
    </div>
  );
}
