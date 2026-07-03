"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import { getBlockBySlug } from "@/data/blocks";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/blockspage/StatusBadge";
import { SectionHeading } from "@/components/blockspage/SectionHeading";
import { CodeBlock } from "@/components/blockspage/CodeBlock";
import { PropsTable } from "@/components/blockspage/PropsTable";

const SIDEBAR_ITEMS = [
  { label: "Overview", id: "section-overview" },
  { label: "Installation", id: "section-installation" },
  { label: "Preview", id: "section-preview" },
  { label: "Props", id: "section-props" },
  { label: "States", id: "section-states" },
  { label: "SDK", id: "section-sdk" },
  { label: "Examples", id: "section-examples" },
];

const MOCK_PROPS = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS class names to apply to the root element.",
  },
  {
    name: "onSuccess",
    type: "(result: unknown) => void",
    default: "undefined",
    description: "Callback invoked when the SDK call resolves successfully.",
  },
  {
    name: "onError",
    type: "(error: Error) => void",
    default: "undefined",
    description: "Callback invoked if the SDK call throws or rejects.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the interactive elements within the block.",
    required: false,
  },
];

const STATES = [
  { label: "Loading", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { label: "Empty", color: "bg-gray-50 text-gray-500 border-gray-100" },
  { label: "Error", color: "bg-red-50 text-red-600 border-red-100" },
  { label: "Success", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
];

export default function BlockDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const block = getBlockBySlug(slug);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section-overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    SIDEBAR_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!block) notFound();

  const installCommand = `npx arc-ui add ${block.slug}`;
  const codeExample = `import { ${block.name} } from "@arc-ui/react";\n\nexport default function App() {\n  return <${block.name} />;\n}`;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden sticky top-[68px] z-30 bg-[#fafafa]/90 backdrop-blur-sm border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/blocks" className="hover:text-gray-700 transition-colors">
            Blocks
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700 font-medium">{block.name}</span>
        </nav>
        <button
          onClick={() => setMobileSidebarOpen((v) => !v)}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 flex"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div className="w-56 bg-white border-r border-gray-200 py-6 px-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3 px-1">
              On this page
            </p>
            <nav>
              {SIDEBAR_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block px-2 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 flex gap-12">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          {/* Breadcrumb (desktop) */}
          <nav
            aria-label="Breadcrumb"
            className="hidden lg:flex items-center gap-1.5 text-xs text-gray-400 mb-8"
          >
            <Link href="/blocks" className="hover:text-gray-700 transition-colors">
              Blocks
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium">{block.name}</span>
          </nav>

          {/* Title block */}
          <div id="section-overview" className="mb-12 scroll-mt-24">
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {block.name}
              </h1>
              <StatusBadge status={block.status} className="mt-1.5" />
            </div>
            <p className="text-base text-gray-500 leading-7 max-w-prose">
              {block.description}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-full text-[11px] font-medium text-gray-500">
              {block.category}
            </div>
          </div>

          {/* Installation */}
          <section id="section-installation" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Installation"
              description="Add this block to your project using the Arc UI CLI."
            />
            <CodeBlock code={installCommand} language="bash" />
          </section>

          {/* Live Preview */}
          <section id="section-preview" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Preview"
              description="Interactive live preview of the component."
            />
            <div className="flex items-center justify-center h-56 rounded-xl border border-dashed border-gray-200 bg-white">
              <p className="text-sm text-gray-400">Coming in Phase 2</p>
            </div>
          </section>

          {/* Code Example */}
          <section className="mb-12">
            <SectionHeading
              title="Usage"
              description="Import and render the block in your React application."
            />
            <CodeBlock code={codeExample} language="tsx" />
          </section>

          {/* Props */}
          <section id="section-props" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Props"
              description="Component API. Populated from generated TypeScript metadata."
            />
            <PropsTable props={MOCK_PROPS} />
          </section>

          {/* States */}
          <section id="section-states" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="States"
              description="Visual states the component can enter."
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATES.map((s) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-center h-24 rounded-lg border text-sm font-medium ${s.color}`}
                >
                  {s.label}
                </div>
              ))}
            </div>
          </section>

          {/* SDK Methods */}
          <section id="section-sdk" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="SDK Methods"
              description="Arc SDK methods wrapped by this block."
            />
            <div className="flex flex-col gap-2">
              {block.sdkMethods.map((method) => (
                <div
                  key={method}
                  className="flex items-center gap-3 px-4 py-3 bg-gray-950 rounded-lg border border-gray-800"
                >
                  <span className="text-xs font-mono text-gray-200">{method}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Examples placeholder */}
          <section id="section-examples" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Examples"
              description="Real-world usage patterns and variants."
            />
            <div className="flex items-center justify-center h-32 rounded-xl border border-dashed border-gray-200 bg-white">
              <p className="text-sm text-gray-400">Examples coming soon.</p>
            </div>
          </section>
        </article>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-44 shrink-0">
          <div className="sticky top-[100px]">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              On this page
            </p>
            <nav>
              {SIDEBAR_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block px-2 py-1.5 text-xs rounded-md transition-colors ${
                    activeSection === item.id
                      ? "text-gray-900 font-semibold bg-gray-100"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
