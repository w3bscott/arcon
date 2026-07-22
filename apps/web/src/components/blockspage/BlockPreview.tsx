"use client";

import {
  BalanceCard,
  BridgeWidget,
  SendMoneyForm,
  SwapWidget,
  TransactionStatus,
  WalletConnectButton,
} from "@arc-ui/react";
import {
  mockBalanceData,
  mockBridgeSuccessResult,
  mockBridgeWidgetData,
  mockSendFormData,
  mockSwapWidgetData,
} from "@/lib/mock-data";

interface BlockPreviewProps {
  slug: string;
  className?: string;
}

export function BlockPreview({ slug, className = "" }: BlockPreviewProps) {
  switch (slug) {
    case "wallet-connect-button":
      return (
        <WalletConnectButton
          onConnect={async () => {}}
          className={className}
        />
      );
    case "transaction-status":
      return (
        <TransactionStatus
          bridgeResult={mockBridgeSuccessResult}
          operationType="bridge"
          className={className}
        />
      );
    case "balance-card":
      return <BalanceCard data={mockBalanceData} className={className} />;
    case "send-money-form":
      return <SendMoneyForm data={mockSendFormData} className={className} />;
    case "swap-widget":
      return <SwapWidget data={mockSwapWidgetData} className={className} />;
    case "bridge-widget":
      return <BridgeWidget data={mockBridgeWidgetData} className={className} />;
    default:
      return <div>Component not found</div>;
  }
}
