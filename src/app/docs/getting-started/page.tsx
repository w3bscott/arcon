import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CodeBlock } from "@/components/blockspage/CodeBlock";
import { SectionHeading } from "@/components/blockspage/SectionHeading";

export const metadata: Metadata = {
  title: "Getting Started — Arc UI",
  description:
    "Install Arc UI and render your first block in an Arc App Kit project.",
};

const INSTALL_CMD = "npm install @arc-ui/react @circle-fin/app-kit";
const PROVIDER_EXAMPLE = `import { ArcKitProvider } from "@circle-fin/app-kit";
import "@arc-ui/react/styles.css";

export default function RootLayout({ children }) {
  return (
    <ArcKitProvider config={{ /* your config */ }}>
      {children}
    </ArcKitProvider>
  );
}`;
const BLOCK_EXAMPLE = `import { WalletConnectButton } from "@arc-ui/react";

export default function Page() {
  return (
    <main>
      <WalletConnectButton />
    </main>
  );
}`;

const SIDEBAR_ITEMS = [
  { label: "Prerequisites", id: "prerequisites" },
  { label: "Installation", id: "installation" },
  { label: "Setup Provider", id: "provider" },
  { label: "Add a Block", id: "add-block" },
  { label: "Architecture", id: "architecture" },
  { label: "Next Steps", id: "next-steps" },
];

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 flex gap-12">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-gray-400 mb-8"
          >
            <Link href="/docs" className="hover:text-gray-700 transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium">Getting Started</span>
          </nav>

          {/* Title */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Getting Started
            </h1>
            <p className="text-base text-gray-500 leading-7 max-w-prose">
              Install Arc UI and render your first production-ready block inside
              an Arc App Kit project in under five minutes.
            </p>
          </div>

          {/* Prerequisites */}
          <section id="prerequisites" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Prerequisites"
              description="Before installing Arc UI, make sure your project meets these requirements."
            />
            <ul className="space-y-2 text-sm text-gray-600 leading-6">
              {[
                "Node.js 20.9 or later",
                "React 18 or later",
                "An Arc App Kit account and API credentials",
                "A React framework (Next.js, Vite, Remix, etc.)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Installation */}
          <section id="installation" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Installation"
              description="Install the Arc UI package and the Arc App Kit peer dependency."
            />
            <CodeBlock code={INSTALL_CMD} language="bash" />
          </section>

          {/* Provider setup */}
          <section id="provider" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Setup Provider"
              description="Wrap your application with ArcKitProvider to give all blocks access to the SDK context."
            />
            <CodeBlock code={PROVIDER_EXAMPLE} language="tsx" />
          </section>

          {/* Add a Block */}
          <section id="add-block" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Add a Block"
              description="Import any block from @arc-ui/react and drop it into your page."
            />
            <CodeBlock code={BLOCK_EXAMPLE} language="tsx" />
          </section>

          {/* Architecture */}
          <section id="architecture" className="mb-12 scroll-mt-24">
            <SectionHeading
              title="Architecture"
              description="Arc UI follows a three-layer design."
            />
            <div className="flex flex-col gap-3">
              {[
                {
                  layer: "@arc-ui/core",
                  description:
                    "Framework-agnostic business logic. Works in any JS environment.",
                },
                {
                  layer: "@arc-ui/react",
                  description:
                    "React adapter. Exports hooks and pre-built block components.",
                },
                {
                  layer: "Blocks",
                  description:
                    "Opinionated, production-ready UI components wired to the Arc SDK.",
                },
              ].map((item, i) => (
                <div
                  key={item.layer}
                  className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-500">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 font-mono mb-0.5">
                      {item.layer}
                    </p>
                    <p className="text-xs text-gray-500 leading-5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Next steps */}
          <section id="next-steps" className="mb-12 scroll-mt-24">
            <SectionHeading title="Next Steps" />
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/blocks"
                className="flex-1 flex items-center justify-between px-5 py-4 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors text-sm font-medium"
              >
                Browse Blocks
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="flex-1 flex items-center justify-between px-5 py-4 bg-white border border-gray-200 text-gray-800 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                View on GitHub
                <ChevronRight className="w-4 h-4" />
              </Link>
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
                  className="block px-2 py-1.5 text-xs text-gray-500 hover:text-gray-800 rounded-md transition-colors"
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
