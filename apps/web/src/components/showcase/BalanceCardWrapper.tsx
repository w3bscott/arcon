"use client";

import { BalanceCard } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockBalanceData } from "@/lib/mock-data";

export function BalanceCardWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <BalanceCard data={mockBalanceData} />
    </ShowcaseShell>
  );
}
