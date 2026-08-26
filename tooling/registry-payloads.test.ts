import { describe, expect, it } from "vitest";
import { registryPayloads } from "../apps/web/src/generated/registry-payloads";
import { registry } from "../packages/react/src/registry";

const requiredTargets: Record<string, string[]> = {
  "balance-card": [
    "@components/arcforge/balance-card/index.tsx",
    "@components/arcforge/hooks/useBalances.ts",
  ],
  "send-money-form": [
    "@components/arcforge/send-money-form/index.tsx",
    "@components/arcforge/hooks/useSend.ts",
    "@components/arcforge/transfer-form/index.tsx",
    "@components/arcforge/transfer-review/index.tsx",
    "@components/arcforge/transfer-status/index.tsx",
  ],
  "swap-widget": [
    "@components/arcforge/swap-widget/index.tsx",
    "@components/arcforge/hooks/useSwap.ts",
    "@components/arcforge/transaction-status/index.tsx",
  ],
  "bridge-widget": [
    "@components/arcforge/bridge-widget/index.tsx",
    "@components/arcforge/hooks/useBridge.ts",
    "@components/arcforge/transaction-status/index.tsx",
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
