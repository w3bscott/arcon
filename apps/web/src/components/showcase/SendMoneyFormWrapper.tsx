"use client";

import { SendMoneyForm } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import { skins, type ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockSendFormData } from "@/lib/mock-data";
import { ArrowUpRight } from "lucide-react";

export function SendMoneyFormWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  const skin = skins[styleVariant];

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      {/* Registry component */}
      <SendMoneyForm data={mockSendFormData} className="sr-only" />

      {/* Visual presentation */}
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className={`text-[15px] font-semibold ${skin.textPrimary}`}>Send Money</h3>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${skin.interactiveBg}`}>
            <ArrowUpRight className={`w-4 h-4 ${skin.interactiveText}`} />
          </div>
        </div>

        {/* Recipient field */}
        <div className="space-y-1.5">
          <label className={`text-[12px] font-medium uppercase tracking-wider ${skin.textMuted}`}>
            Recipient
          </label>
          <div className={`
            w-full px-4 py-3 rounded-[10px] border text-[14px] font-medium
            ${skin.inputBg} ${skin.inputBorder} ${skin.inputText} ${skin.inputPlaceholder}
          `}>
            0x1234…abcd
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
              250.00
            </span>
            <span className={`text-[13px] font-medium ${skin.textMuted}`}>USDC</span>
          </div>
        </div>

        {/* Fee line */}
        <div className="flex items-center justify-between">
          <span className={`text-[12.5px] ${skin.textMuted}`}>Network fee</span>
          <span className={`text-[12.5px] font-medium ${skin.textSecondary}`}>
            {mockSendFormData.estimate?.fee || "—"} USDC
          </span>
        </div>

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
          Review Send
        </button>
      </div>
    </ShowcaseShell>
  );
}
