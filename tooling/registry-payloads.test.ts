import { describe, expect, it } from "vitest";
import { registryPayloads } from "../apps/web/src/generated/registry-payloads";
import { registry } from "../packages/react/src/registry";

const requiredTargets: Record<string, string[]> = {
  "balance-card": [
    "@components/arc-ui/balance-card/index.tsx",
    "@components/arc-ui/hooks/useBalances.ts",
  ],
  "send-money-form": [
    "@components/arc-ui/send-money-form/index.tsx",
    "@components/arc-ui/hooks/useSend.ts",
    "@components/arc-ui/transfer-form/index.tsx",
    "@components/arc-ui/transfer-review/index.tsx",
    "@components/arc-ui/transfer-status/index.tsx",
  ],
  "swap-widget": [
    "@components/arc-ui/swap-widget/index.tsx",
    "@components/arc-ui/hooks/useSwap.ts",
    "@components/arc-ui/transaction-status/index.tsx",
  ],
  "bridge-widget": [
    "@components/arc-ui/bridge-widget/index.tsx",
    "@components/arc-ui/hooks/useBridge.ts",
    "@components/arc-ui/transaction-status/index.tsx",
  ],
};

describe("generated registry payloads", () => {
  it("covers every source registry item", () => {
    expect(Object.keys(registryPayloads).sort()).toEqual(
      Object.keys(registry).sort(),
    );
  });

  it("inlines non-empty content for every file", () => {
    for (const [name, payload] of Object.entries(registryPayloads)) {
      expect(payload.files.length, `${name} files`).toBeGreaterThan(0);

      for (const file of payload.files) {
        expect(file.content.trim(), `${name}:${file.path}`).not.toBe("");
      }
    }
  });

  it("ships companion files needed by composed components", () => {
    for (const [name, targets] of Object.entries(requiredTargets)) {
      const payload = registryPayloads[name as keyof typeof registryPayloads];
      expect(payload, name).toBeDefined();

      const actualTargets = payload.files.map((file) => file.target);
      expect(actualTargets).toEqual(expect.arrayContaining(targets));
    }
  });
});
