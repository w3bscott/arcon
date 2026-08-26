"use client";

import { TransferStatus, type TransferStatusState } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

interface TransferStatusWrapperProps {
  status?: TransferStatusState;
  amount?: string;
  txHash?: string;
  explorerUrl?: string;
  errorMessage?: string;
  onAction?: () => void;
  styleVariant?: ShowcaseStyleVariant;
}

export function TransferStatusWrapper({
  status = "success",
  amount = "250.00",
  txHash = "0xabcd1234abcd1234abcd1234abcd1234abcd7890",
  explorerUrl = "https://etherscan.io/tx/0xabcd1234",
  errorMessage,
  onAction,
  styleVariant = "1",
}: TransferStatusWrapperProps) {
  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <TransferStatus
        status={status}
        amount={amount}
        token="USDC"
        network="Arc Testnet"
        txHash={txHash}
        explorerUrl={explorerUrl}
        errorMessage={errorMessage}
        onAction={onAction}
        className={styleVariant === "1" ? "font-[var(--font-lexend)]" : ""}
      />
    </ShowcaseShell>
  );
}
