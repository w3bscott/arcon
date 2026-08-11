"use client";

import { useEffect } from "react";
import { useFlowState } from "@/hooks/use-flow-state";
import { SendMoneyFormWrapper } from "@/components/showcase/SendMoneyFormWrapper";
import { TransactionStatusWrapper } from "@/components/showcase/TransactionStatusWrapper";
import { ShowcaseShell } from "@/components/showcase/ShowcaseShell";
import { skins } from "@/lib/showcase-theme";
import { Loader2, ArrowRight } from "lucide-react";

const STYLE_VARIANT = "1";

function ReviewStep({ onConfirm }: { onConfirm: () => void }) {
  const skin = skins[STYLE_VARIANT];

  return (
    <ShowcaseShell styleVariant={STYLE_VARIANT}>
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h3 className={`text-lg font-semibold ${skin.textPrimary}`}>
            Review Transfer
          </h3>
          <p className={`text-[13px] ${skin.textMuted}`}>
            Please confirm the details below
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-[13px] ${skin.textMuted}`}>Send</span>
            <span className={`text-[14px] font-medium ${skin.textPrimary}`}>250.00 USDC</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[13px] ${skin.textMuted}`}>To</span>
            <span className={`text-[13px] font-mono ${skin.textSecondary}`}>0x1234…abcd</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[13px] ${skin.textMuted}`}>Network</span>
            <span className={`text-[13px] font-medium ${skin.textSecondary}`}>Arc Testnet</span>
          </div>
          
          <div className={`h-px w-full ${skin.divider}`} />
          
          <div className="flex justify-between items-center">
            <span className={`text-[13px] ${skin.textMuted}`}>Network Fee</span>
            <span className={`text-[13px] font-medium ${skin.textSecondary}`}>0.50 USDC</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[14px] font-semibold ${skin.textPrimary}`}>Total</span>
            <span className={`text-[15px] font-bold ${skin.textPrimary}`}>250.50 USDC</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          className={`
            w-full py-3 rounded-xl text-[14px] font-semibold
            transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2
            ${skin.buttonPrimaryBg} ${skin.buttonPrimaryText} ${skin.buttonPrimaryHover}
          `}
        >
          Confirm Send
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </ShowcaseShell>
  );
}

function PendingStep({ onComplete }: { onComplete: () => void }) {
  const skin = skins[STYLE_VARIANT];

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <ShowcaseShell styleVariant={STYLE_VARIANT}>
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <Loader2 className={`w-10 h-10 animate-spin ${skin.accentGreen}`} />
        <div className="text-center space-y-1">
          <h3 className={`text-[16px] font-semibold ${skin.textPrimary}`}>
            Processing Transaction
          </h3>
          <p className={`text-[13px] ${skin.textMuted}`}>
            Confirming on Arc Testnet...
          </p>
        </div>
      </div>
    </ShowcaseShell>
  );
}

export function SendUsdcFlow() {
  const { currentStep, goToStep, resetFlow } = useFlowState();

  switch (currentStep) {
    case "input":
      return <SendMoneyFormWrapper styleVariant={STYLE_VARIANT} onAction={() => goToStep("review")} />;
    case "review":
      return <ReviewStep onConfirm={() => goToStep("pending")} />;
    case "pending":
      return <PendingStep onComplete={() => goToStep("success")} />;
    case "success":
    case "error":
      return <TransactionStatusWrapper styleVariant={STYLE_VARIANT} onAction={resetFlow} />;
    default:
      return null;
  }
}
