import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, BookOpen, Zap, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation — Arc UI",
  description:
    "Learn how to install and use Arc UI blocks in your Arc App Kit project.",
};

const docSections = [
  {
    icon: Zap,
    title: "Getting Started",
    description:
      "Install the Arc UI package and render your first block in minutes.",
    href: "/docs/getting-started",
    label: "Read guide",
  },
  {
    icon: Package,
    title: "Blocks",
    description:
      "Browse every available block, their props, SDK methods, and usage examples.",
    href: "/blocks",
    label: "Browse blocks",
  },
  {
    icon: BookOpen,
    title: "Architecture",
    description:
      "Understand the three-layer design: core logic, framework adapters, and pre-built blocks.",
    href: "/docs/getting-started#architecture",
    label: "Learn more",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-24">
        {/* Header */}
        <header className="max-w-2xl mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Documentation
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Arc UI Docs
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-7">
            Everything you need to install, configure, and ship Arc UI blocks
            in your Arc App Kit project.
          </p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {docSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group flex flex-col p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="mb-4 w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors">
                  <Icon className="w-4 h-4 text-gray-600" strokeWidth={1.8} />
                </div>
                <h2 className="text-sm font-semibold text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-xs text-gray-500 leading-5 flex-1 mb-4">
                  {section.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-900 group-hover:gap-2 transition-all">
                  {section.label}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
