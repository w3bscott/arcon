"use client";

import { SwapWidget } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockSwapWidgetData } from "@/lib/mock-data";

export function SwapWidgetWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <SwapWidget data={mockSwapWidgetData} />
    </ShowcaseShell>
  );
}
