import { AppKit, BridgeEstimate, BridgeParams, BridgeResult } from "../types";

export interface BridgeStoreState {
  status: "idle" | "estimating" | "bridging" | "success" | "error";
  estimate?: BridgeEstimate | undefined;
  result?: BridgeResult | undefined;
  error?: Error | undefined;
}

export function createBridgeStore(kit: AppKit) {
  let state: BridgeStoreState = { status: "idle" };
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((l) => l());
  const getState = () => state;

  const getEstimate = async (params: BridgeParams) => {
    state = { ...state, status: "estimating", error: undefined };
    emit();
    try {
      const estimate = await kit.estimateBridge(params);
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

  const bridge = async (params: BridgeParams) => {
    state = { ...state, status: "bridging", error: undefined };
    emit();
    try {
      const result = await kit.bridge(params);
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
    bridge,
    reset,
  };
}
