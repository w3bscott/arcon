import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Components — Arc UI",
  description: "Browse the available Arc UI components.",
};

const components = [
  { slug: "wallet-connect-button", name: "Wallet Connect Button", desc: "Connect a user wallet before entering an Arc App Kit flow." },
  { slug: "transaction-status", name: "Transaction Status", desc: "Track and present transaction lifecycle states." },
  { slug: "balance-card", name: "Balance Card", desc: "Display Unified Balance across supported chains." },
  { slug: "send-money-form", name: "Send Money Form", desc: "Collect recipient, amount, and asset details for payments." },
  { slug: "swap-widget", name: "Swap Widget", desc: "Allow users to swap tokens natively within your app." },
  { slug: "bridge-widget", name: "Bridge Widget", desc: "Move tokens cross-chain via CCTP bridge." },
];

export default function ComponentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-[#09090b]">Components</h1>
      <p className="text-lg text-[#71717a]">
        Explore the available React components for Arc App Kit.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        {components.map((comp) => (
          <Link 
            key={comp.slug} 
            href={`/blocks/${comp.slug}`}
            className="group block rounded-lg border border-[#e4e4e7] bg-white p-6 hover:border-[#09090b] transition-colors"
          >
            <h3 className="font-semibold text-[#09090b] mb-2 group-hover:underline">
              {comp.name}
            </h3>
            <p className="text-sm text-[#71717a]">
              {comp.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
