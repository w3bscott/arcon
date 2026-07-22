"use client";

import { useId } from "react";

/*
 * BoxScanIllustration
 * Drop-in replacement for the <img> in FeatureSection.
 * Uses CSS animation only — no GSAP dependency.
 * useId ensures safe reuse across multiple card instances.
 */

interface BoxScanIllustrationProps {
  className?: string;
}

const BoxScanIllustration = ({ className }: BoxScanIllustrationProps) => {
  // Unique ID prefix — safe to mount multiple instances on the same page
  const uid = useId().replace(/:/g, "");

  const ids = {
    clip:    `${uid}clip`,
    shadow:  `${uid}shadow`,
    bloom:   `${uid}bloom`,
    glow:    `${uid}glow`,
    trail:   `${uid}trail`,
    keyframe:`${uid}scan`,
  };

  return (
    <svg
      width="181"
      height="179"
      viewBox="0 0 181 179"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>

        {/* ── Clip to SVG bounds ── */}
        <clipPath id={ids.clip}>
          <rect width="181" height="179" />
        </clipPath>

        {/* ── Original drop shadow on top face ── */}
        <filter
          id={ids.shadow}
          x="-3.88281" y="-2.61328"
          width="188.424" height="114.472"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix"
            values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="shadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow" result="shape" />
        </filter>

        {/* ── Scan: wide bloom (large soft green haze) ── */}
        <filter id={ids.bloom} x="-60%" y="-400%" width="220%" height="900%">
          <feGaussianBlur stdDeviation="7" />
        </filter>

        {/* ── Scan: tight glow (close halo around line) ── */}
        <filter id={ids.glow} x="-30%" y="-200%" width="160%" height="500%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        {/* ── Trail gradient: green at scan line, fades downward ──
             objectBoundingBox so it's transform-independent          */}
        <linearGradient id={ids.trail} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#00ff87" stopOpacity="0.55" />
          <stop offset="45%"  stopColor="#00ff87" stopOpacity="0.1"  />
          <stop offset="100%" stopColor="#00ff87" stopOpacity="0"    />
        </linearGradient>

      </defs>

      {/* ══════════════════════════════════════════
           STATIC GEOMETRY (unchanged from source)
          ══════════════════════════════════════════ */}
      <g clipPath={`url(#${ids.clip})`}>

        {/* Stacking layer lines — bottom to top */}
        <path d="M13.0503 127.475L87.1872 164.554C88.1628 165.041 89.2385 165.295 90.3291 165.295C91.4197 165.295 92.4954 165.041 93.471 164.554L167.608 127.475"
          stroke="#3E3E44" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M13.0503 115.177L87.1872 152.256C88.1628 152.743 89.2385 152.997 90.3291 152.997C91.4197 152.997 92.4954 152.743 93.471 152.256L167.608 115.177"
          stroke="#3E3E44" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M13.0503 102.879L87.1872 139.958C88.1628 140.446 89.2385 140.7 90.3291 140.7C91.4197 140.7 92.4954 140.446 93.471 139.958L167.608 102.879"
          stroke="#3E3E44" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M13.0503 90.5815L87.1872 127.661C88.1628 128.148 89.2385 128.402 90.3291 128.402C91.4197 128.402 92.4954 128.148 93.471 127.661L167.608 90.5815"
          stroke="#3E3E44" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M13.0503 78.2837L87.1872 115.363C88.1628 115.85 89.2385 116.104 90.3291 116.104C91.4197 116.104 92.4954 115.85 93.471 115.363L167.608 78.2837"
          stroke="#3E3E44" strokeWidth="0.5" strokeLinecap="round" />

        {/* Outer box frame */}
        <path d="M170.997 73.5376C171.386 73.7323 171.713 74.0314 171.942 74.4015C172.171 74.7716 172.292 75.198 172.292 75.633V135.983C172.292 136.418 172.171 136.844 171.942 137.214C171.713 137.584 171.386 137.883 170.997 138.078L94.5184 176.327C93.2178 176.978 91.7836 177.317 90.3295 177.317C88.8753 177.317 87.4411 176.978 86.1405 176.327L9.66151 138.078C9.27259 137.883 8.94552 137.584 8.71693 137.214C8.48833 136.844 8.36723 136.418 8.36719 135.983V75.633C8.36719 74.7455 8.86852 73.9346 9.66151 73.5376L88.2346 34.2396C88.8851 33.9144 89.6023 33.7451 90.3295 33.7451C91.0566 33.7451 91.7738 33.9144 92.4243 34.2396L170.997 73.5376Z"
          stroke="#D0D6E0" strokeWidth="0.5" />

        {/* Top face with drop shadow */}
        <g filter={`url(#${ids.shadow})`}>
          <path d="M170.997 45.4285C171.386 45.6232 171.713 45.9223 171.942 46.2924C172.171 46.6625 172.292 47.0889 172.292 47.5239V53.998C172.292 54.433 172.171 54.8594 171.942 55.2295C171.713 55.5996 171.386 55.8987 170.997 56.0934L93.4713 94.8667C92.4958 95.3544 91.4201 95.6083 90.3295 95.6083C89.2388 95.6083 88.1632 95.3544 87.1876 94.8667L9.66151 56.0934C9.27259 55.8987 8.94552 55.5996 8.71693 55.2295C8.48833 54.8594 8.36723 54.433 8.36719 53.998V47.5239C8.36719 46.6365 8.86852 45.8255 9.66151 45.4285L88.2346 6.13121C88.8851 5.80602 89.6023 5.63672 90.3295 5.63672C91.0566 5.63672 91.7738 5.80602 92.4243 6.13121L170.997 45.4285Z"
            fill="#08090A" />
          <path d="M170.997 45.4285C171.386 45.6232 171.713 45.9223 171.942 46.2924C172.171 46.6625 172.292 47.0889 172.292 47.5239V53.998C172.292 54.433 172.171 54.8594 171.942 55.2295C171.713 55.5996 171.386 55.8987 170.997 56.0934L93.4713 94.8667C92.4958 95.3544 91.4201 95.6083 90.3295 95.6083C89.2388 95.6083 88.1632 95.3544 87.1876 94.8667L9.66151 56.0934C9.27259 55.8987 8.94552 55.5996 8.71693 55.2295C8.48833 54.8594 8.36723 54.433 8.36719 53.998V47.5239C8.36719 46.6365 8.86852 45.8255 9.66151 45.4285L88.2346 6.13121C88.8851 5.80602 89.6023 5.63672 90.3295 5.63672C91.0566 5.63672 91.7738 5.80602 92.4243 6.13121L170.997 45.4285Z"
            stroke="#D0D6E0" strokeWidth="0.5" />
        </g>

        {/* Detail lines on top face */}
        <path d="M13.0503 49.0034L87.1872 86.0824C88.1628 86.5701 89.2385 86.824 90.3291 86.824C91.4197 86.824 92.4954 86.5701 93.471 86.0824L167.608 49.0034"
          stroke="#3E3E44" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M70.609 62.6002C69.9888 62.4082 70.2709 61.9512 71.0003 61.9512H109.658C110.387 61.9512 110.669 62.4082 110.049 62.6002C98.0069 66.3346 82.6513 66.3346 70.609 62.6002ZM62.2147 59.0496C62.3547 59.1295 62.5575 59.1746 62.77 59.1746H117.888C118.1 59.1746 118.303 59.1295 118.444 59.0503C119.554 58.4258 120.622 57.7281 121.639 56.9617C121.96 56.7178 121.604 56.3987 121.02 56.3987H59.6383C59.0536 56.3987 58.6971 56.7178 59.0188 56.9617C60.0365 57.7281 61.1042 58.4251 62.2147 59.0496ZM55.3462 53.3858C55.4555 53.5293 55.7314 53.6222 56.0381 53.6222H124.619C124.926 53.6222 125.202 53.5293 125.312 53.3858C125.836 52.7017 126.278 52.0071 126.636 51.302C126.754 51.0697 126.398 50.8463 125.918 50.8463H54.7404C54.2595 50.8463 53.903 51.0697 54.0218 51.3027C54.3983 52.0364 54.8414 52.7339 55.3455 53.3865L55.3462 53.3858ZM53.6605 48.0705C53.2685 48.0705 52.942 47.9188 52.9201 47.7234C52.3403 42.5802 55.9787 37.34 63.8348 33.4102C78.4671 26.0931 102.191 26.0931 116.823 33.4102C124.679 37.34 128.317 42.5802 127.737 47.7234C127.715 47.9188 127.389 48.0698 126.997 48.0698L53.6605 48.0705Z"
          stroke="#3E3E44" strokeWidth="0.5" />

        {/* Vertical dashed connectors */}
        <path d="M8.66016 57.7881V71.5492M90.3294 98.7798V112.542M171.999 57.7881V71.5492"
          stroke="#3E3E44" strokeLinecap="round" strokeDasharray="1 3" />

      </g>

      {/* ══════════════════════════════════════════
           SCAN OVERLAY
           Local coordinate origin = scan line position.
           The V-shape mirrors the box geometry exactly:
             left (13, 0) → center (90.3, 37) → right (167, 0)
           translateY drives it from y=165 (base) to y=8 (top).
          ══════════════════════════════════════════ */}
      <g
        clipPath={`url(#${ids.clip})`}
        style={{ animation: `${ids.keyframe} 2s linear infinite` }}
      >
        {/* Trail: V-area below scan line, fades out downward */}
        <path
          d="M 13 0 L 90.3 37 L 167 0 L 167 58 L 90.3 95 L 13 58 Z"
          fill={`url(#${ids.trail})`}
        />

        {/* Bloom: wide, soft green haze */}
        <path
          d="M 13 0 L 90.3 37 L 167 0"
          stroke="#00ff87"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter={`url(#${ids.bloom})`}
          opacity="0.45"
        />

        {/* Glow: tight halo */}
        <path
          d="M 13 0 L 90.3 37 L 167 0"
          stroke="#00ff87"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter={`url(#${ids.glow})`}
        />

        {/* Core: sharp bright scan line */}
        <path
          d="M 13 0 L 90.3 37 L 167 0"
          stroke="#00ff87"
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ── Keyframes ──────────────────────────────────────────────────
           0-4%:   scan fades in at base (y=165)
           4-88%:  travels upward to top (y=8), linear
           88-94%: holds at top, fades out
           94-100%: invisible — instant reset to base, imperceptible
          ─────────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes ${ids.keyframe} {
          0%   { transform: translateY(175px); opacity: 0; }
          20%   { transform: translateY(147px); opacity: 0; }
          88%  { transform: translateY(58px);   opacity: 1; }
          90%  { transform: translateY(58px);   opacity: 0; }
          100% { transform: translateY(165px); opacity: 0; }
        }
      `}</style>

    </svg>
  );
};

export { BoxScanIllustration };