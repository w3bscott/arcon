"use client";

import { TransactionStatus } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import { skins, type ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockBridgeSuccessResult } from "@/lib/mock-data";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { formatAddress } from "@arc-ui/react";

export function TransactionStatusWrapper({ 
  styleVariant,
  onAction,
}: { 
  styleVariant: ShowcaseStyleVariant;
  onAction?: () => void;
}) {
  const skin = skins[styleVariant];
  const data = mockBridgeSuccessResult;

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      {/* Registry component — semantic backbone */}
      <TransactionStatus
        bridgeResult={data}
        operationType="bridge"
        className="sr-only"
      />

      {/* Visual presentation */}
      <div className="flex flex-col items-center gap-5">
        {/* Success icon */}
        <div className={`
          w-14 h-14 rounded-full flex items-center justify-center
          ${styleVariant === "3" ? "bg-[rgba(13,242,70,0.12)]" : "bg-[#ecfdf3]"}
        `}>
          <CheckCircle2 className={`w-7 h-7 ${skin.accentGreen}`} />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h3 className={`text-lg font-semibold ${skin.textPrimary}`}>
            Bridge successful
          </h3>
          <p className={`text-[13px] ${skin.textMuted}`}>
            Your funds have arrived
          </p>
        </div>

        {/* Steps */}
        <div className="w-full space-y-0">
          {data.steps.map((step, idx) => (
            <div
              key={idx}
              className={`
                flex items-center justify-between py-3
                ${idx > 0 ? `border-t ${skin.chainRowBorder}` : ""}
              `}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${styleVariant === "3" ? "bg-[#0df246]" : "bg-[#16c268]"}`} />
                <span className={`text-[13.5px] font-medium ${skin.textSecondary}`}>
                  {step.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[12px] font-mono ${skin.textMuted}`}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {step.txHash ? formatAddress(step.txHash) : "—"}
                </span>
                {step.explorerUrl && (
                  <a
                    href={step.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${skin.textMuted} hover:${skin.textSecondary} transition-colors`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={`h-px w-full ${skin.divider}`} />

        {/* Footer */}
        <button
          type="button"
          onClick={onAction}
          className={`
            w-full py-2.5 rounded-xl text-[13.5px] font-medium
            border transition-colors duration-150 cursor-pointer
            ${skin.buttonSecondaryBg} ${skin.buttonSecondaryText} ${skin.buttonSecondaryBorder}
          `}
        >
          Done
        </button>
      </div>
    </ShowcaseShell>
  );
}
