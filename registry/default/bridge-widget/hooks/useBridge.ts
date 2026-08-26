import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { AppKit, createBridgeStore } from "@arcforge/core";

export function useBridge(kit: AppKit) {
  const store = useMemo(() => createBridgeStore(kit), [kit]);
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  const getEstimate = store.getEstimate;
  const bridge = store.bridge;

  const reset = useCallback(() => {
    store.reset();
  }, [store]);

  useEffect(() => {
    return () => store.reset();
  }, [store]);

  return {
    ...state,
    getEstimate,
    bridge,
    reset,
  };
}
