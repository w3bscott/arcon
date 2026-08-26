import type { BlockMetadata } from "@/data/blocks";
import { BlockCard } from "./BlockCard";
import { ComponentThumbnail } from "./ComponentThumbnail";
import { WalletConnectButtonWrapper } from "../showcase/WalletConnectButtonWrapper";
import { TransactionStatusWrapper } from "../showcase/TransactionStatusWrapper";
import { BalanceCardWrapper } from "../showcase/BalanceCardWrapper";
import { SendMoneyFormWrapper } from "../showcase/SendMoneyFormWrapper";
import { SwapWidgetWrapper } from "../showcase/SwapWidgetWrapper";
import { BridgeWidgetWrapper } from "../showcase/BridgeWidgetWrapper";
import { TransferFormWrapper } from "../showcase/TransferFormWrapper";
import { TransferReviewWrapper } from "../showcase/TransferReviewWrapper";
import { TransferStatusWrapper } from "../showcase/TransferStatusWrapper";

interface BlockGridProps {
  blocks: BlockMetadata[];
  emptyMessage?: string;
}

function getPreviewForSlug(slug: string) {
  let content = null;
  switch (slug) {
    case "wallet-connect-button":
      content = <WalletConnectButtonWrapper styleVariant="1" />;
      break;
    case "transaction-status":
      content = <TransactionStatusWrapper styleVariant="1" />;
      break;
    case "balance-card":
      content = <BalanceCardWrapper styleVariant="1" />;
      break;
    case "send-money-form":
      content = <SendMoneyFormWrapper styleVariant="1" />;
      break;
    case "swap-widget":
      content = <SwapWidgetWrapper styleVariant="1" />;
      break;
    case "bridge-widget":
      content = <BridgeWidgetWrapper styleVariant="1" />;
      break;
    case "transfer-form":
      content = <TransferFormWrapper styleVariant="1" />;
      break;
    case "transfer-review":
      content = <TransferReviewWrapper styleVariant="1" />;
      break;
    case "transfer-status":
      content = <TransferStatusWrapper styleVariant="1" />;
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
