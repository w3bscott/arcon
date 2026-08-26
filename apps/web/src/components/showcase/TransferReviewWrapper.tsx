"use client";

import { TransferReview } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

interface TransferReviewWrapperProps {
  amount?: string;
  recipient?: string;
  network?: string;
  fee?: string;
  onConfirm?: () => void;
  onBack?: () => void;
  styleVariant?: ShowcaseStyleVariant;
}

export function TransferReviewWrapper({
  amount = "250.00",
  recipient = "0x1234abcd1234abcd1234abcd1234abcd1234abcd",
  network = "Arc Testnet",
  fee = "0.50",
  onConfirm,
  onBack,
  styleVariant = "1",
}: TransferReviewWrapperProps) {
  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <TransferReview
        amount={amount}
        recipient={recipient}
        network={network}
        networkFee={fee}
        token="USDC"
        onConfirm={onConfirm}
        onBack={onBack}
        className={styleVariant === "1" ? "font-[var(--font-lexend)]" : ""}
      />
    </ShowcaseShell>
  );
}
