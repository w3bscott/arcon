"use client";

import { WalletConnectButton } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

export function WalletConnectButtonWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  // Using data-state simulation for showcase if the underlying component supports it, 
  // or just mocking the connection action.
  const handleConnect = async () => {
    return new Promise<void>((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <div className="flex justify-center w-full py-4">
        <WalletConnectButton onConnect={handleConnect} />
      </div>
    </ShowcaseShell>
  );
}
