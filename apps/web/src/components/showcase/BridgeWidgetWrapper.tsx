"use client";

import { BridgeWidget } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockBridgeWidgetData } from "@/lib/mock-data";

export function BridgeWidgetWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <BridgeWidget data={mockBridgeWidgetData} />
    </ShowcaseShell>
  );
}
