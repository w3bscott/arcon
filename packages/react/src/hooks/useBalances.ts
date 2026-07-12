import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { createBalanceStore, BalanceStoreOptions } from "@arc-ui/core";

export interface UseBalancesOptions extends BalanceStoreOptions {
  refreshInterval?: number | undefined;
}

export function useBalances({ refreshInterval, ...storeOptions }: UseBalancesOptions) {
  // Memoize store creation keyed on kit and other options to prevent unnecessary recreations
  const store = useMemo(
    () => createBalanceStore(storeOptions),
    [storeOptions.kit, storeOptions.sources, storeOptions.token, storeOptions.includePending, storeOptions.networkType]
  );

  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  const refetch = useCallback(() => {
    return store.refetch();
  }, [store]);

  useEffect(() => {
    // Initial fetch on mount if no data is present
    store.refetch().catch(() => {});
  }, [store]);

  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      store.startPolling(refreshInterval);
    }
    return () => {
      store.stopPolling();
    };
  }, [store, refreshInterval]);

  return {
    status: state.status,
    data: state.data,
    error: state.error,
    refetch,
  };
}
