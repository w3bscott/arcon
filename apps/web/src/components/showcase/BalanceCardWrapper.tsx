"use client";

import { BalanceCard } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import { skins, chainColors, skeletonClass, type ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockBalanceData } from "@/lib/mock-data";
import { RefreshCw } from "lucide-react";

export function BalanceCardWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  const skin = skins[styleVariant];
  const skelCls = skeletonClass[styleVariant];

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      {/* The actual registry component renders its semantic DOM.
          We compose around it: all decorative presentation lives here. */}
      <BalanceCard
        data={mockBalanceData}
        includePending
        className="sr-only"
        renderChainIcon={() => null}
      />

      {/* ── Visual presentation layer ────────────────────────────────── */}
      <BalanceCardVisual styleVariant={styleVariant} skin={skin} skelCls={skelCls} />
    </ShowcaseShell>
  );
}

/* ── The visual layer — reads mock data, builds the rich card ─────── */

function BalanceCardVisual({
  styleVariant,
  skin,
  skelCls,
}: {
  styleVariant: ShowcaseStyleVariant;
  skin: typeof skins["1"];
  skelCls: string;
}) {
  const data = mockBalanceData;

  return (
    <div className="group">
      {/* Refresh button — hover-revealed */}
      <button
        type="button"
        aria-label="Refresh balance"
        className={`
          absolute top-[26px] right-[26px] w-7 h-7 rounded-lg
          flex items-center justify-center cursor-pointer z-20
          opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in
          ${skin.interactiveBg} ${skin.interactiveText}
        `}
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className={`text-[13px] font-medium tracking-[0.01em] ${skin.textMuted}`}>
          Total balance
        </span>
        <span className={`
          flex items-center gap-1.5 text-[11px] font-medium
          px-2.5 py-1 rounded-full
          ${skin.livePillBg} ${skin.livePillText}
        `}>
          <span
            className="relative w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: skin.liveDotColor, color: skin.liveDotColor }}
          >
            <span className="absolute inset-[-4px] rounded-full animate-[pulse-ring_2s_ease-out_infinite]" />
          </span>
          Live
        </span>
      </div>

      {/* Balance */}
      <div className="mb-1.5">
        <div className="flex items-baseline gap-2" style={{ fontVariantNumeric: "tabular-nums" }}>
          <span className={`text-[40px] font-bold tracking-[-0.02em] leading-none ${skin.textPrimary}`}>
            {data.totalConfirmedBalance}
          </span>
          <span className={`text-[15px] font-medium ${skin.textMuted}`}>
            {data.token}
          </span>
        </div>
        {data.totalPendingBalance && parseFloat(data.totalPendingBalance.replace(/,/g, "")) > 0 && (
          <div className={`flex items-center gap-1.5 text-[12.5px] font-medium mt-1.5 ${skin.accentAmber}`}>
            +{data.totalPendingBalance} pending
          </div>
        )}
      </div>

      {/* Divider */}
      <div className={`h-px my-[22px] ${skin.divider}`} />

      {/* Chain breakdown */}
      <div>
        {data.breakdown.map((b, idx) => (
          <div
            key={b.chain}
            className={`
              flex items-center justify-between py-[11px]
              ${idx > 0 ? `border-t ${skin.chainRowBorder}` : ""}
            `}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-[9px] h-[9px] rounded-full shrink-0"
                style={{ backgroundColor: chainColors[b.chain] || "#71717a" }}
              />
              <span className={`text-[13.5px] font-medium ${skin.textSecondary}`}>
                {b.chain === "Arc_Testnet" ? "Arc Testnet" : b.chain}
              </span>
            </div>
            <span
              className={`text-[13.5px] font-medium ${skin.textPrimary}`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {b.confirmedBalance}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Loading skeleton (exported for potential reuse) ──────────────── */

export function BalanceCardSkeleton({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  const skin = skins[styleVariant];
  const skelCls = skeletonClass[styleVariant];

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <div className={`${skelCls} rounded-md w-[70px] h-3 mb-6`} />
      <div className={`${skelCls} rounded-md w-[160px] h-[34px] mb-6`} />
      <div className={`h-px my-[22px] ${skin.divider}`} />
      <div className={`${skelCls} rounded-md w-full h-[15px] my-3.5`} />
      <div className={`${skelCls} rounded-md w-full h-[15px] my-3.5`} />
    </ShowcaseShell>
  );
}
