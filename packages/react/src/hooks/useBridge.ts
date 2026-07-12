import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { AppKit, createBridgeStore } from "@arc-ui/core";

export function useBridge(kit: AppKit) {
  const store = useMemo(() => createBridgeStore(kit), [kit]);
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  const getEstimate = useCallback(
    (...args: Parameters<typeof store.getEstimate>) => store.getEstimate(...args),
    [store]
  );

  const bridge = useCallback(
    (...args: Parameters<typeof store.bridge>) => store.bridge(...args),
    [store]
  );

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
