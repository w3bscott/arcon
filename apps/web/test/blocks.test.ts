import { describe, expect, it } from "vitest";
import { blocks } from "../src/data/blocks";
import { registry } from "../../../packages/react/src/registry";

describe("blocks data", () => {
  it("has a corresponding registry item for every block slug", () => {
    const registryKeys = Object.keys(registry);
    for (const block of blocks) {
      expect(registryKeys).toContain(block.slug);
    }
  });
});
