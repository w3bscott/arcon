import { use } from "react";
import { notFound } from "next/navigation";
import { getBlockBySlug } from "@/data/blocks";
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

export default function PreviewPage({
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
  const isDark = className.includes("bg-zinc-950") || className.includes("bg-black");

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
    <div className={`min-h-screen w-full flex items-center justify-center p-8 ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
      {ComponentPreview}
    </div>
  );
}
