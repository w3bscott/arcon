"use client";

import { SwapWidget } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import { skins, type ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockSwapWidgetData } from "@/lib/mock-data";
import { ArrowDownUp } from "lucide-react";

export function SwapWidgetWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  const skin = skins[styleVariant];
  const estimate = mockSwapWidgetData.estimate;

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      {/* Registry component */}
      <SwapWidget data={mockSwapWidgetData} className="sr-only" />

      {/* Visual presentation */}
      <div className="space-y-4">
        {/* Header */}
        <h3 className={`text-[15px] font-semibold ${skin.textPrimary}`}>Swap</h3>

        {/* Sell field */}
        <div className={`
          w-full rounded-[10px] border p-4 space-y-2
          ${skin.inputBg} ${skin.inputBorder}
        `}>
          <span className={`text-[11px] font-medium uppercase tracking-wider ${skin.textMuted}`}>You pay</span>
          <div className="flex items-center justify-between">
            <span
              className={`text-[28px] font-bold tracking-[-0.01em] ${skin.textPrimary}`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              1,000.00
            </span>
            <span className={`text-[13px] font-medium px-3 py-1.5 rounded-full ${skin.interactiveBg} ${skin.textSecondary}`}>
              USDC
            </span>
          </div>
        </div>

        {/* Swap icon */}
        <div className="flex justify-center -my-1">
          <div className={`
            w-9 h-9 rounded-full border flex items-center justify-center
            ${skin.cardBg} ${skin.chainRowBorder} ${skin.textMuted}
          `}>
            <ArrowDownUp className="w-4 h-4" />
          </div>
        </div>

        {/* Buy field */}
        <div className={`
          w-full rounded-[10px] border p-4 space-y-2
          ${skin.inputBg} ${skin.inputBorder}
        `}>
          <span className={`text-[11px] font-medium uppercase tracking-wider ${skin.textMuted}`}>You receive</span>
          <div className="flex items-center justify-between">
            <span
              className={`text-[28px] font-bold tracking-[-0.01em] ${skin.textPrimary}`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {estimate?.estimatedOutput || "—"}
            </span>
            <span className={`text-[13px] font-medium px-3 py-1.5 rounded-full ${skin.interactiveBg} ${skin.textSecondary}`}>
              USDT
            </span>
          </div>
        </div>

        {/* Fee breakdown */}
        {estimate && (
          <div className="space-y-2 pt-1">
            {estimate.fees.map((fee, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className={`text-[12.5px] capitalize ${skin.textMuted}`}>{fee.type} fee</span>
                <span
                  className={`text-[12.5px] font-medium ${skin.textSecondary}`}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {fee.amount} {fee.token}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className={`text-[12.5px] ${skin.textMuted}`}>Price impact</span>
              <span className={`text-[12.5px] font-medium ${skin.accentGreen}`}>
                {estimate.priceImpact}%
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          className={`
            w-full py-3 rounded-xl text-[14px] font-semibold
            transition-colors duration-150 cursor-pointer
            ${skin.buttonPrimaryBg} ${skin.buttonPrimaryText} ${skin.buttonPrimaryHover}
          `}
        >
          Review Swap
        </button>
      </div>
    </ShowcaseShell>
  );
}
