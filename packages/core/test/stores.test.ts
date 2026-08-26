import { describe, expect, it, vi } from "vitest";
import {
  createBalanceStore,
  createSendStore,
  createSwapStore,
  createBridgeStore,
} from "../src/stores";
import type { AppKit } from "../src/types";

describe("stores", () => {
  const mockAppKit = {
    unifiedBalance: {
      getBalances: vi.fn(),
    },
    estimateSend: vi.fn(),
    send: vi.fn(),
    estimateSwap: vi.fn(),
    swap: vi.fn(),
    estimateBridge: vi.fn(),
    bridge: vi.fn(),
  } as unknown as AppKit;

  describe("balanceStore", () => {
    it("transitions from idle to loading to success", async () => {
      vi.mocked(mockAppKit.unifiedBalance.getBalances).mockResolvedValueOnce({
        totalConfirmedBalance: "100",
        token: "USDC",
        breakdown: [],
      });

      const store = createBalanceStore({ kit: mockAppKit, sources: ["0x123"] });
      expect(store.getState().status).toBe("idle");

      const promise = store.refetch();
      expect(store.getState().status).toBe("loading");

      await promise;
      expect(store.getState().status).toBe("success");
      expect(store.getState().data?.totalConfirmedBalance).toBe("100");
    });

    it("transitions from loading to error", async () => {
      vi.mocked(mockAppKit.unifiedBalance.getBalances).mockRejectedValueOnce(new Error("Network Error"));

      const store = createBalanceStore({ kit: mockAppKit, sources: ["0x123"] });
      await store.refetch();
      expect(store.getState().status).toBe("error");
      expect(store.getState().error?.message).toBe("Network Error");
    });
  });

  describe("sendStore", () => {
    it("transitions to estimating and success", async () => {
      vi.mocked(mockAppKit.estimateSend).mockResolvedValueOnce({ fee: "1" });
      const store = createSendStore(mockAppKit);

      const promise = store.getEstimate({ from: { chain: "Base" }, to: "0x123", amount: "10" });
      expect(store.getState().status).toBe("estimating");
      await promise;
      expect(store.getState().status).toBe("idle");
      expect(store.getState().estimate?.fee).toBe("1");
    });

    it("transitions to sending and error", async () => {
      vi.mocked(mockAppKit.send).mockRejectedValueOnce(new Error("Send failed"));
      const store = createSendStore(mockAppKit);

      const promise = store.send({ from: { chain: "Base" }, to: "0x123", amount: "10" });
      expect(store.getState().status).toBe("sending");
      await promise;
      expect(store.getState().status).toBe("error");
      expect(store.getState().error?.message).toBe("Send failed");
    });
  });

  describe("swapStore", () => {
    it("transitions to estimating and success", async () => {
      vi.mocked(mockAppKit.estimateSwap).mockResolvedValueOnce({ estimatedOutput: "9.9", fees: [], priceImpact: 0 });
      const store = createSwapStore(mockAppKit);

      const promise = store.getEstimate({ from: { chain: "Base" }, tokenIn: "USDC", tokenOut: "USDT", amountIn: "10" });
      expect(store.getState().status).toBe("estimating");
      await promise;
      expect(store.getState().status).toBe("idle");
      expect(store.getState().estimate?.estimatedOutput).toBe("9.9");
    });

    it("transitions to swapping and error", async () => {
      vi.mocked(mockAppKit.swap).mockRejectedValueOnce(new Error("Swap failed"));
      const store = createSwapStore(mockAppKit);

      const promise = store.swap({ from: { chain: "Base" }, tokenIn: "USDC", tokenOut: "USDT", amountIn: "10" });
      expect(store.getState().status).toBe("swapping");
      await promise;
      expect(store.getState().status).toBe("error");
      expect(store.getState().error?.message).toBe("Swap failed");
    });
  });

  describe("bridgeStore", () => {
    it("transitions to estimating and success", async () => {
      vi.mocked(mockAppKit.estimateBridge).mockResolvedValueOnce({ fees: [] });
      const store = createBridgeStore(mockAppKit);

      const promise = store.getEstimate({ from: { chain: "Base" }, to: { chain: "Ethereum" }, amount: "10" });
      expect(store.getState().status).toBe("estimating");
      await promise;
      expect(store.getState().status).toBe("idle");
      expect(store.getState().estimate).toBeDefined();
    });

    it("transitions to bridging and error", async () => {
      vi.mocked(mockAppKit.bridge).mockRejectedValueOnce(new Error("Bridge failed"));
      const store = createBridgeStore(mockAppKit);

      const promise = store.bridge({ from: { chain: "Base" }, to: { chain: "Ethereum" }, amount: "10" });
      expect(store.getState().status).toBe("bridging");
      await promise;
      expect(store.getState().status).toBe("error");
      expect(store.getState().error?.message).toBe("Bridge failed");
    });
  });
});
