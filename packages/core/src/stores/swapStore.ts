import { AppKit, SwapEstimate, SwapParams, SwapResult } from "../types";

export interface SwapStoreState {
  status: "idle" | "estimating" | "swapping" | "success" | "error";
  estimate?: SwapEstimate | undefined;
  result?: SwapResult | undefined;
  error?: Error | undefined;
}

export function createSwapStore(kit: AppKit) {
  let state: SwapStoreState = { status: "idle" };
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((l) => l());
  const getState = () => state;

  const getEstimate = async (params: SwapParams) => {
    state = { ...state, status: "estimating", error: undefined };
    emit();
    try {
      const estimate = await kit.estimateSwap(params);
      state = { ...state, status: "idle", estimate };
    } catch (err) {
      state = {
        ...state,
        status: "error",
        error: err instanceof Error ? err : new Error(String(err)),
      };
    }
    emit();
  };

  const swap = async (params: SwapParams) => {
    state = { ...state, status: "swapping", error: undefined };
    emit();
    try {
      const result = await kit.swap(params);
      state = { ...state, status: "success", result };
    } catch (err) {
      state = {
        ...state,
        status: "error",
        error: err instanceof Error ? err : new Error(String(err)),
      };
    }
    emit();
  };

  const reset = () => {
    state = { status: "idle" };
    emit();
  };

  return {
    getState,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getEstimate,
    swap,
    reset,
  };
}
