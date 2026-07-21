import type { BlockMetadata } from "@/data/blocks";
import { BlockCard } from "./BlockCard";
import { ComponentThumbnail } from "./ComponentThumbnail";
import { getBlockStyle } from "@/lib/block-styles";
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

interface BlockGridProps {
  blocks: BlockMetadata[];
  emptyMessage?: string;
}

function getPreviewForSlug(slug: string) {
  const className = getBlockStyle(slug, "1"); // Use Style 1 for thumbnails
  
  let content = null;
  switch (slug) {
    case "wallet-connect-button":
      content = <WalletConnectButton onConnect={async () => {}} className={className} />;
      break;
    case "transaction-status":
      content = <TransactionStatus bridgeResult={mockBridgeSuccessResult} operationType="bridge" className={className} />;
      break;
    case "balance-card":
      content = <BalanceCard data={mockBalanceData} className={className} />;
      break;
    case "send-money-form":
      content = <SendMoneyForm data={mockSendFormData} className={className} />;
      break;
    case "swap-widget":
      content = <SwapWidget data={mockSwapWidgetData} className={className} />;
      break;
    case "bridge-widget":
      content = <BridgeWidget data={mockBridgeWidgetData} className={className} />;
      break;
    default:
      return null;
  }
  
  return <ComponentThumbnail>{content}</ComponentThumbnail>;
}

export function BlockGrid({
  blocks,
  emptyMessage = "No blocks match your search.",
}: BlockGridProps) {
  if (blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {blocks.map((block) => (
        <BlockCard 
          key={block.slug} 
          block={block} 
          preview={getPreviewForSlug(block.slug)}
        />
      ))}
    </div>
  );
}
