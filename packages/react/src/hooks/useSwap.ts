import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { AppKit, createSwapStore } from "@arc-ui/core";

export function useSwap(kit: AppKit) {
  const store = useMemo(() => createSwapStore(kit), [kit]);
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  const getEstimate = useCallback(
    (...args: Parameters<typeof store.getEstimate>) => store.getEstimate(...args),
    [store]
  );

  const swap = useCallback(
    (...args: Parameters<typeof store.swap>) => store.swap(...args),
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
    swap,
    reset,
  };
}
