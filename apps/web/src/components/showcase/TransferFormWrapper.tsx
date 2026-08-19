"use client";

import { useState } from "react";
import { TransferForm, type TransferFormSubmit } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

const MOCK_BALANCE = 10000;
const RECENT_RECIPIENTS = [
  {
    name: "vitalik.eth",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  },
];

interface TransferFormWrapperProps {
  onAction?: (details: TransferFormSubmit) => void;
  styleVariant?: ShowcaseStyleVariant;
}

export function TransferFormWrapper({
  onAction,
  styleVariant = "1",
}: TransferFormWrapperProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const networkFee = recipient && amount ? "0.50" : "0.00";

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <TransferForm
        recipient={recipient}
        amount={amount}
        onRecipientChange={setRecipient}
        onAmountChange={setAmount}
        balance={MOCK_BALANCE}
        networkFee={networkFee}
        token="USDC"
        recentRecipients={RECENT_RECIPIENTS}
        onReview={onAction}
        className={styleVariant === "1" ? "font-[var(--font-lexend)]" : ""}
      />
    </ShowcaseShell>
  );
}
