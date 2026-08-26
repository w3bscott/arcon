import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { AppKit, createSendStore } from "@arcforge/core";

export function useSend(kit: AppKit) {
  const store = useMemo(() => createSendStore(kit), [kit]);
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  const getEstimate = store.getEstimate;
  const send = store.send;

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
