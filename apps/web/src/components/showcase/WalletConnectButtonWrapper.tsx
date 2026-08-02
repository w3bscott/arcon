"use client";

import { WalletConnectButton } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import { skins, type ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { Wallet, Loader2 } from "lucide-react";

export function WalletConnectButtonWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  const skin = skins[styleVariant];

  const handleConnect = async () => {
    return new Promise<void>((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      {/* Registry component — semantic backbone */}
      <WalletConnectButton onConnect={handleConnect} className="sr-only" />

      {/* Visual presentation */}
      <div className="flex flex-col items-center gap-6 py-4">
        {/* Decorative icon */}
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center
          ${skin.interactiveBg} ${skin.textMuted}
        `}>
          <Wallet className="w-7 h-7" />
        </div>

        {/* Title */}
        <div className="text-center space-y-1.5">
          <h3 className={`text-lg font-semibold ${skin.textPrimary}`}>
            Connect your wallet
          </h3>
          <p className={`text-[13px] ${skin.textMuted}`}>
            Link a wallet to get started with Arc
          </p>
        </div>

        {/* CTA button */}
        <button
          type="button"
          className={`
            w-full py-3 px-6 rounded-xl text-[15px] font-semibold
            transition-colors duration-150 cursor-pointer
            ${skin.buttonPrimaryBg} ${skin.buttonPrimaryText} ${skin.buttonPrimaryHover}
          `}
        >
          Connect Wallet
        </button>

        {/* Secondary info */}
        <p className={`text-[11px] ${skin.textMuted}`}>
          Powered by Circle App Kit
        </p>
      </div>
    </ShowcaseShell>
  );
}
