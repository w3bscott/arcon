import { AppKit, GetBalancesResult, Sources, SupportedTokenInput } from "../types";

export interface BalanceStoreState {
  status: "idle" | "loading" | "success" | "error";
  data?: GetBalancesResult | undefined;
  error?: Error | undefined;
}

export interface BalanceStoreOptions {
  kit: AppKit;
  sources: Sources;
  token?: SupportedTokenInput | undefined;
  includePending?: boolean | undefined;
  networkType?: "mainnet" | "testnet" | undefined;
}

export function createBalanceStore(options: BalanceStoreOptions) {
  let state: BalanceStoreState = { status: "idle" };
  const listeners = new Set<() => void>();
  let pollTimer: ReturnType<typeof setTimeout> | null = null;

  const emit = () => listeners.forEach((l) => l());

  const getState = () => state;

  const fetchBalances = async () => {
    state = { ...state, status: "loading", error: undefined };
    emit();

    try {
      // If kit is fully mocked, this might be simulated
      // Expected SDK API: kit.unifiedBalance.getBalances(...)
      const result = await options.kit.unifiedBalance.getBalances({
        sources: options.sources,
        token: options.token,
        includePending: options.includePending,
        networkType: options.networkType,
      });

      state = { status: "success", data: result };
    } catch (err) {
      state = {
        status: "error",
        error: err instanceof Error ? err : new Error(String(err)),
        data: state.data, // Keep old data on error
      };
    }
    emit();
    return state;
  };

  const startPolling = (intervalMs: number) => {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(() => {
      fetchBalances().catch(() => {});
    }, intervalMs);
  };

  const stopPolling = () => {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  };

  return {
    getState,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    refetch: fetchBalances,
    startPolling,
    stopPolling,
  };
}
