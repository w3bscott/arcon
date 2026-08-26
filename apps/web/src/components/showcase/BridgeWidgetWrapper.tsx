"use client";

import { BridgeWidget } from "@arcforge/react";
import { ShowcaseShell } from "./ShowcaseShell";
import { skins, chainColors, type ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockBridgeWidgetData } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export function BridgeWidgetWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  const skin = skins[styleVariant];
  const estimate = mockBridgeWidgetData.estimate;

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      {/* Registry component */}
      <BridgeWidget data={mockBridgeWidgetData} className="sr-only" />

      {/* Visual presentation */}
      <div className="space-y-5">
        {/* Header */}
        <h3 className={`text-[15px] font-semibold ${skin.textPrimary}`}>Bridge</h3>

        {/* Chain selector row */}
        <div className="flex items-center gap-3">
          {/* From */}
          <div className={`
            flex-1 flex items-center gap-2.5 rounded-[10px] border px-4 py-3
            ${skin.inputBg} ${skin.inputBorder}
          `}>
            <span
              className="w-[9px] h-[9px] rounded-full shrink-0"
              style={{ backgroundColor: chainColors.Ethereum }}
            />
            <span className={`text-[13.5px] font-medium ${skin.textSecondary}`}>Ethereum</span>
          </div>

          {/* Arrow */}
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center shrink-0
            ${skin.interactiveBg} ${skin.textMuted}
          `}>
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* To */}
          <div className={`
            flex-1 flex items-center gap-2.5 rounded-[10px] border px-4 py-3
            ${skin.inputBg} ${skin.inputBorder}
          `}>
            <span
              className="w-[9px] h-[9px] rounded-full shrink-0"
              style={{ backgroundColor: chainColors.Arc_Testnet }}
            />
            <span className={`text-[13.5px] font-medium ${skin.textSecondary}`}>Arc Testnet</span>
          </div>
        </div>

        {/* Amount field */}
        <div className="space-y-1.5">
          <label className={`text-[12px] font-medium uppercase tracking-wider ${skin.textMuted}`}>
            Amount
          </label>
          <div className={`
            w-full flex items-center justify-between px-4 py-3 rounded-[10px] border
            ${skin.inputBg} ${skin.inputBorder}
          `}>
            <span
              className={`text-[24px] font-bold tracking-[-0.01em] ${skin.textPrimary}`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              500.00
            </span>
            <span className={`text-[13px] font-medium ${skin.textMuted}`}>USDC</span>
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
          </div>
        )}

        {/* Divider */}
        <div className={`h-px ${skin.divider}`} />

        {/* CTA */}
        <button
          type="button"
          className={`
            w-full py-3 rounded-xl text-[14px] font-semibold
            transition-colors duration-150 cursor-pointer
            ${skin.buttonPrimaryBg} ${skin.buttonPrimaryText} ${skin.buttonPrimaryHover}
          `}
        >
          Review Bridge
        </button>
      </div>
    </ShowcaseShell>
  );
}
