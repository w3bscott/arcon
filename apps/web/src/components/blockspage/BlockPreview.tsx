"use client";

import { WalletConnectButtonWrapper } from "../showcase/WalletConnectButtonWrapper";
import { TransactionStatusWrapper } from "../showcase/TransactionStatusWrapper";
import { BalanceCardWrapper } from "../showcase/BalanceCardWrapper";
import { SendMoneyFormWrapper } from "../showcase/SendMoneyFormWrapper";
import { SwapWidgetWrapper } from "../showcase/SwapWidgetWrapper";
import { BridgeWidgetWrapper } from "../showcase/BridgeWidgetWrapper";
import { TransferFormWrapper } from "../showcase/TransferFormWrapper";
import { TransferReviewWrapper } from "../showcase/TransferReviewWrapper";
import { TransferStatusWrapper } from "../showcase/TransferStatusWrapper";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

interface BlockPreviewProps {
  slug: string;
  styleVariant?: ShowcaseStyleVariant;
}

export function BlockPreview({ slug, styleVariant = "1" }: BlockPreviewProps) {
  switch (slug) {
    case "wallet-connect-button":
      return <WalletConnectButtonWrapper styleVariant={styleVariant} />;
    case "transaction-status":
      return <TransactionStatusWrapper styleVariant={styleVariant} />;
    case "balance-card":
      return <BalanceCardWrapper styleVariant={styleVariant} />;
    case "send-money-form":
      return <SendMoneyFormWrapper styleVariant={styleVariant} />;
    case "swap-widget":
      return <SwapWidgetWrapper styleVariant={styleVariant} />;
    case "bridge-widget":
      return <BridgeWidgetWrapper styleVariant={styleVariant} />;
    case "transfer-form":
      return <TransferFormWrapper styleVariant={styleVariant} />;
    case "transfer-review":
      return <TransferReviewWrapper styleVariant={styleVariant} />;
    case "transfer-status":
      return <TransferStatusWrapper styleVariant={styleVariant} />;
    default:
      return <div>Component not found</div>;
  }
}
