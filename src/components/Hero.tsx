import React from 'react';
import Link from 'next/link';

export interface HeroProps {
  badgeText: string;
  badgeHref: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  installCommand: string;
}

const defaultProps: HeroProps = {
  badgeText: "New Release",
  badgeHref: "#",
  title: "Build Faster on Arc",
  description: "Pre-built UI components wired directly to the Arc SDK.\nInstall, connect, and ship production ready interfaces faster.",
  primaryButtonText: "Browse Components",
  primaryButtonHref: "#",
  secondaryButtonText: "View Github",
  secondaryButtonHref: "#",
  installCommand: "$ npm install @arc-ui/react @circle-fin/app-kit",
};

const Hero = (props: Partial<HeroProps>) => {
  const {
    badgeText,
    badgeHref,
    title,
    description,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
    installCommand,
  } = { ...defaultProps, ...props };

  return (
    <div className="relative overflow-hidden bg-[#fafafa]">
      {/* Background gradient/blur effects to match the subtle glow in the image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <section className="relative pt-24 pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <Link
          href={badgeHref!}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 rounded-full text-gray-800 hover:bg-gray-50 transition-colors mb-8"
        >
          {badgeText}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M11 11V3M11 11H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6 max-w-4xl">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl whitespace-pre-line">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link
            href={secondaryButtonHref!}
            className="px-6 py-3 text-sm font-medium bg-white border border-gray-200 text-black rounded-lg hover:bg-gray-50 transition-colors"
          >
            {secondaryButtonText}
          </Link>
          <Link
            href={primaryButtonHref!}
            className="px-6 py-3 text-sm font-medium bg-[#111111] text-white rounded-lg hover:bg-black transition-colors shadow-sm"
          >
            {primaryButtonText}
          </Link>
        </div>

        {/* Install Command */}
        <div className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-mono text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm mb-20 w-auto">
          {installCommand}
        </div>

        {/* Mockup Graphic Area */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] bg-[#fdfdfd] border border-gray-100/50 shadow-2xl shadow-gray-200/50 rounded-2xl overflow-hidden flex items-center justify-center p-8 md:p-16">
          {/* Subtle grid background to match the "wired" theme */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
          
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
            {/* The main credit card UI floating in center */}
            <div className="z-10 w-[380px] h-[220px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between p-6 relative">
              <div className="flex justify-between items-start">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-800">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                <div className="font-bold text-xl italic tracking-tighter">VISA</div>
              </div>
              <div className="space-y-4">
                <div className="font-mono text-lg tracking-widest text-gray-800">
                  5367 4567 8901 2345
                </div>
                <div className="flex justify-between text-sm text-gray-500 uppercase tracking-wider">
                  <div>
                    <div className="text-[10px]">Cardholder Name</div>
                    <div className="text-gray-800 font-medium">Méschac Irung</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px]">Exp</div>
                    <div className="text-gray-800 font-medium">12/25</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated connection nodes and code blocks */}
            <div className="absolute top-[10%] left-[20%] text-[10px] text-gray-400 font-mono tracking-widest leading-relaxed">
              EXPERIENCE<br/>SEAMLESS<br/>PAYMENTS.
            </div>

            <div className="absolute top-[30%] right-[15%] w-64 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-lg p-4 shadow-lg text-xs font-mono text-gray-600">
              <div className="flex text-pink-500"><span className="text-gray-400 mr-2">1</span> const axios = require('axios');</div>
              <div className="flex"><span className="text-gray-400 mr-2">2</span></div>
              <div className="flex text-pink-500"><span className="text-gray-400 mr-2">3</span> const response = await axios.post('https:/...', {'{'}</div>
              <div className="flex"><span className="text-gray-400 mr-2">4</span>   key: 'value',</div>
              <div className="flex"><span className="text-gray-400 mr-2">5</span>   anotherKey: 'anotherValue',</div>
              <div className="flex"><span className="text-gray-400 mr-2">6</span> {'}'});</div>
            </div>

            {/* Connecting lines SVG (Decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <path d="M 50% 20% L 50% 40%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 30% 50% L 40% 50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 60% 50% L 70% 50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 50% 60% L 50% 80%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              
              {/* API Node */}
              <rect x="calc(50% - 24px)" y="15%" width="48" height="24" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="1" />
              <text x="50%" y="calc(15% + 16px)" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#6b7280">API</text>
              
              {/* App Connected Node */}
              <rect x="calc(50% - 60px)" y="80%" width="120" height="28" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="calc(50% - 40px)" cy="calc(80% + 14px)" r="4" fill="#22c55e" />
              <text x="calc(50% + 4px)" y="calc(80% + 18px)" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#6b7280" fontWeight="500">App Connected</text>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Hero };
