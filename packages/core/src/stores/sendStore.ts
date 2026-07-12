import { AppKit, SendEstimateResult, SendParams, BridgeStep } from "../types";

export interface SendStoreState {
  status: "idle" | "estimating" | "sending" | "success" | "error";
  estimate?: SendEstimateResult | undefined;
  result?: BridgeStep | undefined;
  error?: Error | undefined;
}

export function createSendStore(kit: AppKit) {
  let state: SendStoreState = { status: "idle" };
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((l) => l());
  const getState = () => state;

  const getEstimate = async (params: SendParams) => {
    state = { ...state, status: "estimating", error: undefined };
    emit();
    try {
      // Expect kit.estimateSend to return an estimate.
      const estimate = await kit.estimateSend(params);
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

  const send = async (params: SendParams) => {
    state = { ...state, status: "sending", error: undefined };
    emit();
    try {
      // Expect kit.send to return a BridgeStep
      const result = await kit.send(params);
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
    send,
    reset,
  };
}
