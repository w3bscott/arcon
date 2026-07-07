import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CodeBlock } from "@/components/blockspage/CodeBlock";

export const metadata: Metadata = {
  title: "Documentation — Arc UI",
  description: "Learn how to install and use Arc UI blocks.",
};

const setupCode = `import { AppKit } from "@circle-fin/app-kit"
import { createViemAdapter } from "@circle-fin/adapter-viem-v2"

const adapter = createViemAdapter({ walletClient })
const kit = new AppKit()`;

const usageCode = `import { BalanceCard } from "@/components/arc-ui/balance-card"

<BalanceCard
  kit={kit}
  sources={{ walletAddresses: [{ address, blockchain: "Arc_Testnet" }] }}
  className="your-styles-here"
/>`;

const components = [
  "wallet-connect-button",
  "balance-card",
  "transaction-status",
  "send-money-form",
  "swap-widget",
  "bridge-widget",
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar sticky={false} />

      <main className="w-full max-w-[860px] mx-auto px-4 md:px-8 py-16">
        {/* Architecture Notice */}
        <section className="mb-12">
          <h1 className="text-3xl font-bold text-[#09090b] mb-4">Architecture</h1>
          <p className="text-[#71717a] mb-4 leading-relaxed">
            Arc UI is built as a <strong>shadcn registry</strong>. Components are distributed through the CLI rather than as precompiled React package components.
          </p>
          <p className="text-[#71717a] mb-4 leading-relaxed">
            The goal is to let developers copy production-ready source code directly into their own projects, where they retain full ownership and customization.
          </p>
          <ul className="list-disc pl-5 text-[#71717a] space-y-1 mb-4">
            <li><strong>Arc UI owns:</strong> Component structure, behavior, accessibility, Arc SDK integration, documentation, and registry metadata.</li>
            <li><strong>You own:</strong> Styling, theme, design tokens, and future customizations.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#09090b] mb-4">Getting Started</h2>
          <div className="mb-4">
            <CodeBlock code="npx arc-ui init" language="bash" />
          </div>
          <p className="text-[#71717a] leading-relaxed">
            Initialize Arc UI in your project to set up the registry components. Arc UI is an open-source React component library for the Arc App Kits SDK. Components are unstyled by default — bring your own CSS, Tailwind, or any styling solution.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#09090b] mb-4">Setup</h2>
          <CodeBlock code={setupCode} language="typescript" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#09090b] mb-4">Usage</h2>
          <p className="text-[#71717a] mb-4 leading-relaxed">
            Import any component you have added and pass your kit instance. All components accept a <code>className</code> prop for styling.
          </p>
          <CodeBlock code={usageCode} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#09090b] mb-4">Components</h2>
          <ul className="flex flex-col gap-3">
            {components.map((slug) => {
              const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
              return (
                <li key={slug}>
                  <Link 
                    href={`/blocks/${slug}`}
                    className="text-[#09090b] hover:underline font-medium"
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="pt-8 border-t border-[#e4e4e7]">
          <p className="text-sm text-[#71717a]">
            Full component docs and live previews are available on the <Link href="/blocks" className="text-[#09090b] hover:underline">Blocks page</Link>.
          </p>
        </footer>
      </main>

      <Footer />
    </div>
  );
}
