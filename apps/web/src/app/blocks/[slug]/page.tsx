import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getBlockBySlug, blocks } from "@/data/blocks";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/blockspage/StatusBadge";
import { CodeBlock } from "@/components/blockspage/CodeBlock";
import { PreviewArea } from "@/components/blockspage/PreviewArea";
import { InstallChip } from "@/components/blockspage/InstallChip";
import { getBlockStyle, type StyleVariant } from "@/lib/block-styles";
import {
  WalletConnectButton,
  TransactionStatus,
  BalanceCard,
  SendMoneyForm,
  SwapWidget,
  BridgeWidget,
} from "@arc-ui/react";
import {
  mockBalanceData,
  mockSendFormData,
  mockSwapWidgetData,
  mockBridgeWidgetData,
  mockBridgeSuccessResult,
} from "@/lib/mock-data";

export default function BlockDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ style?: string }>;
}) {
  const { slug } = use(params);
  const { style } = use(searchParams);
  const block = getBlockBySlug(slug);

  if (!block) notFound();

  const activeStyle = (style || "1") as StyleVariant;
  const className = getBlockStyle(slug, activeStyle);

  let ComponentPreview = null;

  switch (slug) {
    case "wallet-connect-button":
      ComponentPreview = <WalletConnectButton onConnect={async () => {}} className={className} />;
      break;
    case "transaction-status":
      ComponentPreview = <TransactionStatus bridgeResult={mockBridgeSuccessResult} operationType="bridge" className={className} />;
      break;
    case "balance-card":
      ComponentPreview = <BalanceCard data={mockBalanceData} className={className} />;
      break;
    case "send-money-form":
      ComponentPreview = <SendMoneyForm data={mockSendFormData} className={className} />;
      break;
    case "swap-widget":
      ComponentPreview = <SwapWidget data={mockSwapWidgetData} className={className} />;
      break;
    case "bridge-widget":
      ComponentPreview = <BridgeWidget data={mockBridgeWidgetData} className={className} />;
      break;
    default:
      ComponentPreview = <div>Component not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar sticky={false} />

      <main className="w-full max-w-[860px] mx-auto px-4 md:px-8 py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-[#71717a] mb-8 font-sans"
        >
          <Link href="/blocks" className="hover:text-gray-900 transition-colors">
            Blocks
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/blocks?category=${block.category}`} className="hover:text-gray-900 transition-colors">
            {block.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#09090b] font-medium">{block.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-[30px] font-bold text-[#09090b] font-sans leading-tight">
              {block.name}
            </h1>
            <StatusBadge status={block.status} className="mt-1" />
          </div>
          <p className="text-base text-[#71717a] font-sans">
            {block.description}
          </p>
        </div>

        {/* Preview Area with Style Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {(["1", "2", "3", "4"] as StyleVariant[]).map((s) => (
              <Link
                key={s}
                href={`/blocks/${slug}?style=${s}`}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeStyle === s
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Style {s}
              </Link>
            ))}
          </div>
          <PreviewArea className={className} slug={slug}>
            {ComponentPreview}
          </PreviewArea>
        </div>

        {/* Install Section */}
        <div className="mb-8">
          <InstallChip command={block.installCommand} />
        </div>

        {/* Usage Section */}
        <div>
          <CodeBlock code={block.codeExample} language="tsx" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Static params for all known blocks
export async function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.slug }));
}
