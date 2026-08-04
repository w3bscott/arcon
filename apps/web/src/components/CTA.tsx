import Link from 'next/link';
import { Cuboid, Monitor, ExternalLink } from 'lucide-react';
import { Footer } from './Footer';

export interface CTAFramework {
  name: string;
  icon: string;
  active: boolean;
}

export interface CTATool {
  name: string;
  description: string;
  href: string;
}

export interface CTAProps {
  heading: string;
  subheading: string;
  command: string;
  frameworks: CTAFramework[];
  featureHeading: string;
  featureDescription: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  tools: CTATool[];
}

const defaultProps: CTAProps = {
  heading: "Choose your stack",
  subheading: "Compatible with all popular frameworks",
  command: "$ npx create-react-app my-app",
  frameworks: [
    { name: "Next", icon: "N", active: false },
    { name: "Astro", icon: "A", active: false },
    { name: "Laravel", icon: "L", active: false },
    { name: "React", icon: "R", active: true },
    { name: "Remix", icon: "R", active: false },
    { name: "Gatsby", icon: "G", active: false },
    { name: "Vite", icon: "V", active: false },
  ],
  featureHeading: "Drop in production-ready UI blocks instead of building from scratch",
  featureDescription: "Open-source components designed for Arc App Kits.\nAuthentication, wallets, balances, transfers, and many more.",
  primaryButtonText: "Browse Blocks",
  primaryButtonHref: "/blocks",
  secondaryButtonText: "View Github",
  secondaryButtonHref: "#",
  tools: [
    { name: "Blocks", description: "Browse Arc UI website blocks", href: "/blocks" },
    { name: "Docs", description: "Read installation and usage guidance", href: "/docs" },
    { name: "GitHub", description: "Follow the open-source project", href: "#" },
  ],
};

const CTA = (props: Partial<CTAProps>) => {
  const {
    featureHeading,
    featureDescription,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
    tools,
  } = { ...defaultProps, ...props };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-12">
      <div className="relative">
        {/* 4 Corner Dots */}
        <div className="absolute hidden md:block -top-[-10%] -left-3 w-6 h-6 rounded-full bg-black border border-7 border-background z-10" />
        <div className="absolute hidden md:block -top-[-10%] -right-3 w-6 h-6 rounded-full bg-black border border-7 border-background z-10" />
        <div className="absolute hidden md:block -bottom-[-42.8%] -left-3 w-6 h-6 rounded-full bg-black border border-7 border-background z-10" />
        <div className="absolute hidden md:block -bottom-[-42.8%] -right-3 w-6 h-6 rounded-full bg-black border border-7 border-background z-10" />

        {/* Outer Border */}
        <div className="border border-gray-200 rounded-none overflow-hidden border-t-transparent">
            <div className="absolute bottom-0 -left-4 -right-4 xl:-left-14 xl:-right-14 h-px bg-gray-200 z-20" />

          {/* ===== Top Section: Choose Your Stack ===== */}
          {/* <div className="px-8 md:px-16 py-16 pt-36 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {heading}
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              {subheading}
            </p> */}

            {/* Command */}
            {/* <div className="inline-flex items-center gap-3 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm font-mono text-gray-600 mb-10">
              {command}
              <Copy className='w-[14px]'/>
            </div> */}

            {/* Frameworks Row */}
            {/* <div className="flex items-center justify-center gap-2 md:gap-6 flex-wrap">
              {frameworks?.map((fw, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    fw.active
                      ? 'border border-gray-300 text-foreground bg-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <span className="text-base">{fw.icon}</span>
                  <span>{fw.name}</span>
                </div>
              ))}
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column */}
            <div className="px-5 md:px-16 py-10 md:py-16 flex flex-col justify-between">
              {/* Icon */}
              <div className="mb-6 md:mb-8">
                <Cuboid className="w-12 h-12 md:w-16 md:h-16 text-foreground" strokeWidth={1} />
              </div>

              {/* Heading & Description */}
              <div className="mb-7 md:mb-8">
                <h3 className="text-xl leading-7 md:text-3xl md:leading-tight font-bold tracking-tight text-foreground mb-3 md:mb-4 max-w-md">
                  {featureHeading}
                </h3>
                <p className="text-gray-500 text-sm leading-6 whitespace-pre-line max-w-sm">
                  {featureDescription}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                <Link
                  href={primaryButtonHref!}
                  className="px-5 py-2.5 text-sm font-medium bg-[#111111] text-white rounded-lg hover:bg-black transition-colors shadow-sm text-center"
                >
                  {primaryButtonText}
                </Link>
                <Link
                  href={secondaryButtonHref!}
                  className="px-5 py-2.5 text-sm font-medium bg-white text-foreground border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  {secondaryButtonText}
                </Link>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-auto bottom-0 w-px bg-gray-200 self-stretch" style={{ height: 'calc(-70%)' }} />

            {/* Right Column */}
            <div className="border-t md:border-t-0 md:border-l border-gray-200 px-5 md:px-16 py-10 md:py-16 flex flex-col">
              {/* Icon */}
              <div className="mb-6 md:mb-8">
                <Cuboid className="w-12 h-12 md:w-16 md:h-16 text-foreground" strokeWidth={1} />
              </div>

              {/* Tool List */}
              <div className="flex flex-col gap-4">
                {tools?.map((tool, i) => (
                  <Link
                    key={i}
                    href={tool.href}
                    className="flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <Monitor className="w-5 h-5 text-gray-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground">{tool.name}</div>
                      <div className="text-xs text-gray-500 leading-5">{tool.description}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-foreground transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ===== Horizontal Divider ===== */}
          <div className="border-t border-gray-200 mt-0" />

          {/* ===== Bottom Section: Two Columns ===== */}
                <Footer />
        </div>
      </div>
    </section>

  
  );
};

export { CTA };
