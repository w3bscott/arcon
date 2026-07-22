import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { AppKit, createSendStore } from "@arc-ui/core";

export function useSend(kit: AppKit) {
  const store = useMemo(() => createSendStore(kit), [kit]);
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  const getEstimate = useCallback(
    (...args: Parameters<typeof store.getEstimate>) => store.getEstimate(...args),
    [store]
  );

  const send = useCallback(
    (...args: Parameters<typeof store.send>) => store.send(...args),
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
    send,
    reset,
  };
}
