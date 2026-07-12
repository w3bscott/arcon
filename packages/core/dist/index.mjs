// src/formatters/index.ts
function formatAddress(address, startChars = 6, endChars = 4) {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}\u2026${address.slice(-endChars)}`;
}
function formatBalance(amount) {
  if (!amount) return "0.00";
  const num = parseFloat(amount);
  return isNaN(num) ? "0.00" : num.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
}
function formatChainName(chain) {
  if (!chain) return "";
  return chain.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
function formatFee(fee, token) {
  if (!fee || parseFloat(fee) === 0) return "Free";
  return `${fee} ${token || ""}`.trim();
}

// src/validators/index.ts
function isValidAddress(address) {
  if (!address) return false;
  return address.length >= 32;
}
function isValidAmount(amount) {
  if (!amount) return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}

// src/stores/balanceStore.ts
function createBalanceStore(options) {
  let state = { status: "idle" };
  const listeners = /* @__PURE__ */ new Set();
  let pollTimer = null;
  const emit = () => listeners.forEach((l) => l());
  const getState = () => state;
  const fetchBalances = async () => {
    state = { ...state, status: "loading", error: void 0 };
    emit();
    try {
      const result = await options.kit.unifiedBalance.getBalances({
        sources: options.sources,
        token: options.token,
        includePending: options.includePending,
        networkType: options.networkType
      });
      state = { status: "success", data: result };
    } catch (err) {
      state = {
        status: "error",
        error: err instanceof Error ? err : new Error(String(err)),
        data: state.data
        // Keep old data on error
      };
    }
    emit();
    return state;
  };
  const startPolling = (intervalMs) => {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(() => {
      fetchBalances().catch(() => {
      });
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
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    refetch: fetchBalances,
    startPolling,
    stopPolling
  };
}

// src/stores/sendStore.ts
function createSendStore(kit) {
  let state = { status: "idle" };
  const listeners = /* @__PURE__ */ new Set();
  const emit = () => listeners.forEach((l) => l());
  const getState = () => state;
  const getEstimate = async (params) => {
    state = { ...state, status: "estimating", error: void 0 };
    emit();
    try {
      const estimate = await kit.estimateSend(params);
      state = { ...state, status: "idle", estimate };
    } catch (err) {
      state = {
        ...state,
        status: "error",
        error: err instanceof Error ? err : new Error(String(err))
      };
    }
    emit();
  };
  const send = async (params) => {
    state = { ...state, status: "sending", error: void 0 };
    emit();
    try {
      const result = await kit.send(params);
      state = { ...state, status: "success", result };
    } catch (err) {
      state = {
        ...state,
        status: "error",
        error: err instanceof Error ? err : new Error(String(err))
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
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getEstimate,
    send,
    reset
  };
}

// src/stores/swapStore.ts
function createSwapStore(kit) {
  let state = { status: "idle" };
  const listeners = /* @__PURE__ */ new Set();
  const emit = () => listeners.forEach((l) => l());
  const getState = () => state;
  const getEstimate = async (params) => {
    state = { ...state, status: "estimating", error: void 0 };
    emit();
    try {
      const estimate = await kit.estimateSwap(params);
      state = { ...state, status: "idle", estimate };
    } catch (err) {
      state = {
        ...state,
        status: "error",
        error: err instanceof Error ? err : new Error(String(err))
      };
    }
    emit();
  };
  const swap = async (params) => {
    state = { ...state, status: "swapping", error: void 0 };
    emit();
    try {
      const result = await kit.swap(params);
      state = { ...state, status: "success", result };
    } catch (err) {
      state = {
        ...state,
        status: "error",
        error: err instanceof Error ? err : new Error(String(err))
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
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getEstimate,
    swap,
    reset
  };
}

// src/stores/bridgeStore.ts
function createBridgeStore(kit) {
  let state = { status: "idle" };
  const listeners = /* @__PURE__ */ new Set();
  const emit = () => listeners.forEach((l) => l());
  const getState = () => state;
  const getEstimate = async (params) => {
    state = { ...state, status: "estimating", error: void 0 };
    emit();
    try {
      const estimate = await kit.estimateBridge(params);
      state = { ...state, status: "idle", estimate };
    } catch (err) {
      state = {
        ...state,
        status: "error",
        error: err instanceof Error ? err : new Error(String(err))
      };
    }
    emit();
  };
  const bridge = async (params) => {
    state = { ...state, status: "bridging", error: void 0 };
    emit();
    try {
      const result = await kit.bridge(params);
      state = { ...state, status: "success", result };
    } catch (err) {
      state = {
        ...state,
        status: "error",
        error: err instanceof Error ? err : new Error(String(err))
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
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getEstimate,
    bridge,
    reset
  };
}
export {
  createBalanceStore,
  createBridgeStore,
  createSendStore,
  createSwapStore,
  formatAddress,
  formatBalance,
  formatChainName,
  formatFee,
  isValidAddress,
  isValidAmount
};
//# sourceMappingURL=index.mjs.map