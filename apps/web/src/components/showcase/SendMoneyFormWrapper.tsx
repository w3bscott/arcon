"use client";

import { SendMoneyForm } from "@arc-ui/react";
import { ShowcaseShell } from "./ShowcaseShell";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { mockSendFormData } from "@/lib/mock-data";

export function SendMoneyFormWrapper({ styleVariant }: { styleVariant: ShowcaseStyleVariant }) {
  return (
    <ShowcaseShell styleVariant={styleVariant}>
      <SendMoneyForm data={mockSendFormData} />
    </ShowcaseShell>
  );
}
