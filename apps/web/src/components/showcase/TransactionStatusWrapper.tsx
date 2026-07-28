"use client";

import { TransactionStatus } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockBridgeSuccessResult } from "@/lib/mock-data";

export function TransactionStatusWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <TransactionStatus 
        bridgeResult={mockBridgeSuccessResult} 
        operationType="bridge" 
      />
    </ShowcaseShell>
  );
}
