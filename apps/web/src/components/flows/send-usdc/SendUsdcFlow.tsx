"use client";

import { useEffect, useState } from "react";
import {
  TransferForm,
  TransferReview,
  TransferStatus,
  type TransferFormSubmit,
  isValidAddress,
} from "@arcforge/react";
import { useFlowState } from "@/hooks/use-flow-state";
import { ShowcaseShell } from "@/components/showcase/ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

const STYLE_VARIANT: ShowcaseStyleVariant = "1";
const MOCK_BALANCE = 10000;
const MOCK_NETWORK = "Arc Testnet";
const MOCK_TX_HASH =
  "0xabcd1234abcd1234abcd1234abcd1234abcd7890";
const RECENT_RECIPIENTS = [
  {
    name: "vitalik.eth",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  },
];

export function SendUsdcFlow() {
  const { currentStep, goToStep, resetFlow } = useFlowState();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const networkFee = recipient && amount ? "0.50" : "0.00";

  useEffect(() => {
    if (currentStep !== "pending") return;

    const timer = setTimeout(() => goToStep("success"), 1000);
    return () => clearTimeout(timer);
  }, [currentStep, goToStep]);

  function handleReview(details: TransferFormSubmit) {
    setRecipient(details.recipient);
    setAmount(details.amount);
    goToStep("review");
  }

  function handleReset() {
    setRecipient("");
    setAmount("");
    resetFlow();
  }

  return (
    <ShowcaseShell styleVariant={STYLE_VARIANT}>
      {currentStep === "input" ? (
        <TransferForm
          recipient={recipient}
          amount={amount}
          onRecipientChange={setRecipient}
          onAmountChange={setAmount}
          balance={MOCK_BALANCE}
          networkFee={networkFee}
          token="USDC"
          recentRecipients={RECENT_RECIPIENTS}
          validateRecipient={(value) => isValidAddress(value, { allowUsernames: true })}
          onReview={handleReview}
          className="font-[var(--font-lexend)]"
        />
      ) : null}

      {currentStep === "review" ? (
        <TransferReview
          amount={amount}
          recipient={recipient}
          network={MOCK_NETWORK}
          networkFee={networkFee}
          token="USDC"
          onBack={() => goToStep("input")}
          onConfirm={() => goToStep("pending")}
          className="font-[var(--font-lexend)]"
        />
      ) : null}

      {currentStep === "pending" ? (
        <TransferStatus
          status="pending"
          amount={amount}
          token="USDC"
          network={MOCK_NETWORK}
          className="font-[var(--font-lexend)]"
        />
      ) : null}

      {currentStep === "success" ? (
        <TransferStatus
          status="success"
          amount={amount}
          token="USDC"
          network={MOCK_NETWORK}
          txHash={MOCK_TX_HASH}
          explorerUrl="https://etherscan.io/tx/0xabcd1234"
          onAction={handleReset}
          className="font-[var(--font-lexend)]"
        />
      ) : null}

      {currentStep === "error" ? (
        <TransferStatus
          status="error"
          amount={amount}
          token="USDC"
          network={MOCK_NETWORK}
          onAction={handleReset}
          className="font-[var(--font-lexend)]"
        />
      ) : null}
    </ShowcaseShell>
  );
}
