"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BalanceCard: () => BalanceCard,
  BridgeWidget: () => BridgeWidget,
  SendMoneyForm: () => SendMoneyForm,
  SwapWidget: () => SwapWidget,
  TransactionStatus: () => TransactionStatus,
  WalletConnectButton: () => WalletConnectButton,
  registry: () => registry,
  useBalances: () => useBalances,
  useBridge: () => useBridge,
  useSend: () => useSend,
  useSwap: () => useSwap
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useBalances.ts
var import_react = require("react");
var import_core = require("@arc-ui/core");
function useBalances({ refreshInterval, ...storeOptions }) {
  const store = (0, import_react.useMemo)(
    () => (0, import_core.createBalanceStore)(storeOptions),
    [storeOptions.kit, storeOptions.sources, storeOptions.token, storeOptions.includePending, storeOptions.networkType]
  );
  const state = (0, import_react.useSyncExternalStore)(store.subscribe, store.getState, store.getState);
  const refetch = (0, import_react.useCallback)(() => {
    return store.refetch();
  }, [store]);
  (0, import_react.useEffect)(() => {
    store.refetch().catch(() => {
    });
  }, [store]);
  (0, import_react.useEffect)(() => {
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
    refetch
  };
}

// src/hooks/useSend.ts
var import_react2 = require("react");
var import_core2 = require("@arc-ui/core");
function useSend(kit) {
  const store = (0, import_react2.useMemo)(() => (0, import_core2.createSendStore)(kit), [kit]);
  const state = (0, import_react2.useSyncExternalStore)(store.subscribe, store.getState, store.getState);
  const getEstimate = (0, import_react2.useCallback)(
    (...args) => store.getEstimate(...args),
    [store]
  );
  const send = (0, import_react2.useCallback)(
    (...args) => store.send(...args),
    [store]
  );
  const reset = (0, import_react2.useCallback)(() => {
    store.reset();
  }, [store]);
  (0, import_react2.useEffect)(() => {
    return () => store.reset();
  }, [store]);
  return {
    ...state,
    getEstimate,
    send,
    reset
  };
}

// src/hooks/useSwap.ts
var import_react3 = require("react");
var import_core3 = require("@arc-ui/core");
function useSwap(kit) {
  const store = (0, import_react3.useMemo)(() => (0, import_core3.createSwapStore)(kit), [kit]);
  const state = (0, import_react3.useSyncExternalStore)(store.subscribe, store.getState, store.getState);
  const getEstimate = (0, import_react3.useCallback)(
    (...args) => store.getEstimate(...args),
    [store]
  );
  const swap = (0, import_react3.useCallback)(
    (...args) => store.swap(...args),
    [store]
  );
  const reset = (0, import_react3.useCallback)(() => {
    store.reset();
  }, [store]);
  (0, import_react3.useEffect)(() => {
    return () => store.reset();
  }, [store]);
  return {
    ...state,
    getEstimate,
    swap,
    reset
  };
}

// src/hooks/useBridge.ts
var import_react4 = require("react");
var import_core4 = require("@arc-ui/core");
function useBridge(kit) {
  const store = (0, import_react4.useMemo)(() => (0, import_core4.createBridgeStore)(kit), [kit]);
  const state = (0, import_react4.useSyncExternalStore)(store.subscribe, store.getState, store.getState);
  const getEstimate = (0, import_react4.useCallback)(
    (...args) => store.getEstimate(...args),
    [store]
  );
  const bridge = (0, import_react4.useCallback)(
    (...args) => store.bridge(...args),
    [store]
  );
  const reset = (0, import_react4.useCallback)(() => {
    store.reset();
  }, [store]);
  (0, import_react4.useEffect)(() => {
    return () => store.reset();
  }, [store]);
  return {
    ...state,
    getEstimate,
    bridge,
    reset
  };
}

// src/components/wallet-connect-button/index.tsx
var import_react5 = require("react");
var import_core5 = require("@arc-ui/core");
var import_jsx_runtime = require("react/jsx-runtime");
function deriveState(isConnected, isLoading, internalError) {
  if (isLoading) return "connecting";
  if (isConnected) return "connected";
  if (internalError) return "error";
  return "disconnected";
}
function WalletConnectButton({
  onConnect,
  onDisconnect,
  isConnected,
  isLoading,
  address,
  connectLabel = "Connect Wallet",
  disconnectLabel = "Disconnect",
  onError,
  className,
  style
}) {
  const [internalError, setInternalError] = (0, import_react5.useState)(null);
  const [copied, setCopied] = (0, import_react5.useState)(false);
  const copyTimerRef = (0, import_react5.useRef)(null);
  const state = deriveState(isConnected, isLoading, internalError);
  const handleConnect = (0, import_react5.useCallback)(async () => {
    setInternalError(null);
    try {
      await onConnect();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setInternalError(error);
      onError?.(error);
    }
  }, [onConnect, onError]);
  const handleDisconnect = (0, import_react5.useCallback)(async () => {
    if (!onDisconnect) return;
    try {
      await onDisconnect();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setInternalError(error);
      onError?.(error);
    }
  }, [onDisconnect, onError]);
  const handleCopy = (0, import_react5.useCallback)(() => {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1500);
    });
  }, [address]);
  if (state === "disconnected") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-state": "disconnected", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        onClick: handleConnect,
        "aria-label": "Connect wallet",
        children: connectLabel
      }
    ) });
  }
  if (state === "connecting") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-state": "connecting", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        disabled: true,
        "aria-busy": "true",
        "aria-label": "Connect wallet",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u23F3" }),
          " Connecting\u2026"
        ]
      }
    ) });
  }
  if (state === "error" && internalError) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { "data-state": "error", className, style, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { role: "alert", children: internalError.message }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          onClick: handleConnect,
          "aria-label": "Connect wallet",
          children: connectLabel
        }
      )
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { "data-state": "connected", className, style, children: [
    address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { "aria-label": `Connected: ${address}`, children: [
      (0, import_core5.formatAddress)(address),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          onClick: handleCopy,
          "aria-label": copied ? "Address copied" : "Copy address",
          children: copied ? "Copied" : "\u{1F4CB}"
        }
      )
    ] }),
    onDisconnect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        onClick: handleDisconnect,
        "aria-label": "Disconnect wallet",
        children: disconnectLabel
      }
    )
  ] });
}

// src/components/transaction-status/index.tsx
var import_react6 = require("react");
var import_core6 = require("@arc-ui/core");
var import_jsx_runtime2 = require("react/jsx-runtime");
function deriveState2(bridgeResult, sendResult, spendResult) {
  if (bridgeResult) return bridgeResult.state;
  if (sendResult) return sendResult.state;
  if (spendResult) return "success";
  return "idle";
}
function TransactionStatus({
  bridgeResult,
  sendResult,
  spendResult,
  txHash,
  explorerUrl,
  operationType = "send",
  onComplete,
  onError,
  className,
  style
}) {
  const state = deriveState2(bridgeResult, sendResult, spendResult);
  const hasCompleted = (0, import_react6.useRef)(false);
  const hasErrored = (0, import_react6.useRef)(false);
  (0, import_react6.useEffect)(() => {
    if (state === "success" && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete?.();
    }
    if (state === "error" && !hasErrored.current) {
      hasErrored.current = true;
      let err;
      if (bridgeResult?.state === "error") {
        const failedStep = bridgeResult.steps.find((s) => s.state === "error");
        err = failedStep?.error || new Error(failedStep?.errorMessage || "Unknown bridge error");
      } else if (sendResult?.state === "error") {
        err = sendResult.error || new Error(sendResult.errorMessage || "Unknown send error");
      } else {
        err = new Error("Unknown error");
      }
      onError?.(err);
    }
    if (state === "pending" || state === "idle") {
      hasCompleted.current = false;
      hasErrored.current = false;
    }
  }, [state, onComplete, onError, bridgeResult, sendResult]);
  const resolvedExplorerUrl = (0, import_react6.useMemo)(() => {
    if (explorerUrl) return explorerUrl;
    if (sendResult?.explorerUrl) return sendResult.explorerUrl;
    if (spendResult?.explorerUrl) return spendResult.explorerUrl;
    if (bridgeResult?.steps) {
      const lastSuccess = [...bridgeResult.steps].reverse().find((s) => s.explorerUrl);
      if (lastSuccess) return lastSuccess.explorerUrl;
    }
    return void 0;
  }, [explorerUrl, sendResult, spendResult, bridgeResult]);
  const resolvedTxHash = (0, import_react6.useMemo)(() => {
    if (txHash) return txHash;
    if (sendResult?.txHash) return sendResult.txHash;
    if (spendResult?.txHash) return spendResult.txHash;
    if (bridgeResult?.steps) {
      const lastSuccess = [...bridgeResult.steps].reverse().find((s) => s.txHash);
      if (lastSuccess) return lastSuccess.txHash;
    }
    return void 0;
  }, [txHash, sendResult, spendResult, bridgeResult]);
  if (state === "idle") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-state": "idle", className, style });
  }
  if (state === "pending") {
    if (bridgeResult) {
      const stepsToRender = bridgeResult.steps.filter((s) => s.state !== "noop");
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { "data-state": "pending", className, style, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
          "Processing ",
          operationType,
          "..."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { "aria-label": "Transaction steps", children: stepsToRender.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "li",
          {
            "data-state": step.state,
            "aria-current": step.state === "pending" ? "step" : void 0,
            children: [
              step.name,
              ": ",
              step.state
            ]
          },
          idx
        )) })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-state": "pending", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
      "Processing ",
      operationType,
      "..."
    ] }) });
  }
  if (state === "error") {
    let errorMessage = "An error occurred.";
    if (bridgeResult) {
      const failed = bridgeResult.steps.find((s) => s.state === "error");
      if (failed?.errorMessage) errorMessage = failed.errorMessage;
    } else if (sendResult?.errorMessage) {
      errorMessage = sendResult.errorMessage;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-state": "error", className, style, role: "alert", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
      "Failed: ",
      errorMessage
    ] }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { "data-state": "success", className, style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
      operationType.charAt(0).toUpperCase() + operationType.slice(1),
      " successful!"
    ] }),
    resolvedExplorerUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "a",
      {
        href: resolvedExplorerUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        children: [
          "View on Explorer ",
          resolvedTxHash ? `(${(0, import_core6.formatAddress)(resolvedTxHash)})` : ""
        ]
      }
    ) : resolvedTxHash ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
      "Tx: ",
      (0, import_core6.formatAddress)(resolvedTxHash),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          onClick: () => navigator.clipboard.writeText(resolvedTxHash),
          "aria-label": "Copy transaction hash",
          children: "\u{1F4CB}"
        }
      )
    ] }) : null
  ] });
}

// src/components/balance-card/index.tsx
var import_react7 = require("react");
var import_core7 = require("@arc-ui/core");
var import_jsx_runtime3 = require("react/jsx-runtime");
function BalanceCard({
  kit,
  sources,
  token = "USDC",
  includePending = false,
  networkType,
  refreshInterval,
  onBalanceFetched,
  onError,
  renderChainIcon,
  data: injectedData,
  className,
  style
}) {
  const hookResult = useBalances({
    kit,
    sources,
    token,
    includePending,
    networkType,
    refreshInterval: injectedData ? 0 : refreshInterval
    // Disable polling if injected
  });
  const isMocked = !!injectedData;
  const status = isMocked ? "success" : hookResult.status;
  const data = isMocked ? injectedData : hookResult.data;
  const error = isMocked ? void 0 : hookResult.error;
  (0, import_react7.useEffect)(() => {
    if (isMocked) return;
    if (status === "success" && data) {
      onBalanceFetched?.(data);
    }
  }, [status, data, onBalanceFetched, isMocked]);
  (0, import_react7.useEffect)(() => {
    if (isMocked) return;
    if (status === "error" && error) {
      onError?.(error);
    }
  }, [status, error, onError, isMocked]);
  if (status === "loading" || status === "idle") {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-state": "loading", className, style, "aria-busy": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "sr-only", children: "Loading balance..." }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: "\u23F3" })
    ] });
  }
  if (status === "error") {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-state": "error", className, style, role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: error?.message || "Failed to load balance." }),
      !isMocked && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: hookResult.refetch, children: "Retry" })
    ] });
  }
  const totalConf = parseFloat(data?.totalConfirmedBalance || "0");
  const totalPend = parseFloat(data?.totalPendingBalance || "0");
  const isEmpty = totalConf === 0 && (!includePending || totalPend === 0);
  if (status === "success" && isEmpty) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-state": "empty", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "No balance found." }) });
  }
  if (status === "success" && data) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-state": "loaded", className, style, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
        (0, import_core7.formatBalance)(data.totalConfirmedBalance),
        " ",
        data.token
      ] }),
      includePending && totalPend > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
        "Pending: ",
        (0, import_core7.formatBalance)(data.totalPendingBalance),
        " ",
        data.token
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", { children: data.breakdown.map((b, idx) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
        renderChainIcon?.(b.chain),
        (0, import_core7.formatChainName)(b.chain),
        ": ",
        (0, import_core7.formatBalance)(b.confirmedBalance)
      ] }, idx)) })
    ] });
  }
  return null;
}

// src/components/send-money-form/index.tsx
var import_react8 = require("react");
var import_core8 = require("@arc-ui/core");
var import_jsx_runtime4 = require("react/jsx-runtime");
function SendMoneyForm({
  kit,
  chain = "Ethereum",
  token = "USDC",
  defaultRecipient = "",
  defaultAmount = "",
  onSuccess,
  onError,
  data: injectedData,
  className,
  style
}) {
  const hookResult = useSend(kit);
  const isMocked = !!injectedData;
  const status = isMocked ? injectedData.status : hookResult.status;
  const estimate = isMocked ? injectedData.estimate : hookResult.estimate;
  const result = isMocked ? injectedData.result : hookResult.result;
  const error = isMocked ? injectedData.error : hookResult.error;
  const [stage, setStage] = (0, import_react8.useState)("input");
  const [recipient, setRecipient] = (0, import_react8.useState)(defaultRecipient);
  const [amount, setAmount] = (0, import_react8.useState)(defaultAmount);
  const [recipientTouched, setRecipientTouched] = (0, import_react8.useState)(false);
  const [amountTouched, setAmountTouched] = (0, import_react8.useState)(false);
  const recipientValid = (0, import_core8.isValidAddress)(recipient);
  const amountValid = (0, import_core8.isValidAmount)(amount);
  (0, import_react8.useEffect)(() => {
    if (isMocked) return;
    if (recipientValid && amountValid) {
      const timer = setTimeout(() => {
        hookResult.getEstimate({
          from: { chain },
          to: recipient,
          amount,
          token
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [recipient, amount, recipientValid, amountValid, chain, token, isMocked, hookResult.getEstimate]);
  (0, import_react8.useEffect)(() => {
    if (status === "sending" && stage !== "result") {
      setStage("result");
    }
  }, [status, stage]);
  const handleReview = (e) => {
    e.preventDefault();
    if (recipientValid && amountValid) {
      setStage("review");
    }
  };
  const handleConfirm = () => {
    if (isMocked) {
      setStage("result");
      return;
    }
    hookResult.send({
      from: { chain },
      to: recipient,
      amount,
      token
    });
  };
  const handleRetry = () => {
    if (!isMocked) hookResult.reset();
    setStage("input");
  };
  if (stage === "result") {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { "data-state": status, className, style, children: [
      status === "sending" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { "aria-busy": "true", children: "Sending..." }),
      status !== "sending" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        TransactionStatus,
        {
          sendResult: result || (error ? { name: "Send", state: "error", error } : void 0),
          operationType: "send",
          onComplete: () => {
            if (result) onSuccess?.(result);
          },
          onError: (err) => onError?.(err instanceof Error ? err : new Error(String(err)))
        }
      ),
      status === "error" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { children: "Review Summary" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { children: [
        "Recipient: ",
        (0, import_core8.formatAddress)(recipient)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { children: [
        "Amount: ",
        amount,
        " ",
        token
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { children: [
        "Network fee: ",
        estimate ? (0, import_core8.formatFee)(estimate.fee, token) : "Calculating..."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating", children: "Confirm Send" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { children: "Recipient Address" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "text",
          value: recipient,
          onChange: (e) => setRecipient(e.target.value),
          onBlur: () => setRecipientTouched(true),
          placeholder: "0x..."
        }
      ),
      recipientTouched && !recipientValid && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { role: "alert", children: "Invalid address" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { children: [
        "Amount (",
        token,
        ")"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "number",
          step: "any",
          value: amount,
          onChange: (e) => setAmount(e.target.value),
          onBlur: () => setAmountTouched(true),
          placeholder: "0.00"
        }
      ),
      amountTouched && !amountValid && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
      status === "estimating" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: "Fetching fee\u2026" }),
      status === "idle" && estimate && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { children: [
        "Network fee: ",
        (0, import_core8.formatFee)(estimate.fee, token)
      ] }),
      status === "error" && !isMocked && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: "Unable to estimate fee" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "submit", disabled: !recipientValid || !amountValid, children: "Review" })
  ] }) });
}

// src/components/swap-widget/index.tsx
var import_react9 = require("react");
var import_core9 = require("@arc-ui/core");
var import_jsx_runtime5 = require("react/jsx-runtime");
function SwapWidget({
  kit,
  chain = "Ethereum",
  defaultTokenIn = "USDC",
  defaultTokenOut = "USDT",
  defaultAmountIn = "",
  onSuccess,
  onError,
  data: injectedData,
  className,
  style
}) {
  const hookResult = useSwap(kit);
  const isMocked = !!injectedData;
  const status = isMocked ? injectedData.status : hookResult.status;
  const estimate = isMocked ? injectedData.estimate : hookResult.estimate;
  const result = isMocked ? injectedData.result : hookResult.result;
  const error = isMocked ? injectedData.error : hookResult.error;
  const [stage, setStage] = (0, import_react9.useState)("input");
  const [tokenIn, setTokenIn] = (0, import_react9.useState)(defaultTokenIn);
  const [tokenOut, setTokenOut] = (0, import_react9.useState)(defaultTokenOut);
  const [amountIn, setAmountIn] = (0, import_react9.useState)(defaultAmountIn);
  const [amountTouched, setAmountTouched] = (0, import_react9.useState)(false);
  const amountValid = (0, import_core9.isValidAmount)(amountIn);
  (0, import_react9.useEffect)(() => {
    if (isMocked) return;
    if (amountValid && tokenIn && tokenOut) {
      const timer = setTimeout(() => {
        hookResult.getEstimate({
          from: { chain },
          tokenIn,
          tokenOut,
          amountIn
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [amountIn, tokenIn, tokenOut, amountValid, chain, isMocked, hookResult.getEstimate]);
  (0, import_react9.useEffect)(() => {
    if (status === "swapping" && stage !== "result") {
      setStage("result");
    }
  }, [status, stage]);
  const handleReview = (e) => {
    e.preventDefault();
    if (amountValid) setStage("review");
  };
  const handleConfirm = () => {
    if (isMocked) {
      setStage("result");
      return;
    }
    hookResult.swap({
      from: { chain },
      tokenIn,
      tokenOut,
      amountIn
    });
  };
  const handleRetry = () => {
    if (!isMocked) hookResult.reset();
    setStage("input");
  };
  if (stage === "result") {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { "data-state": status, className, style, children: [
      status === "swapping" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { "aria-busy": "true", children: "Swapping..." }),
      status !== "swapping" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        TransactionStatus,
        {
          txHash: result?.txHash,
          operationType: "swap",
          onComplete: () => {
            if (result) onSuccess?.(result);
          },
          onError: (err) => onError?.(err instanceof Error ? err : new Error(String(err)))
        }
      ),
      status === "error" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { children: "Review Swap" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
        "Sell: ",
        amountIn,
        " ",
        tokenIn
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
        "Buy: ",
        estimate ? `${estimate.estimatedOutput} ${tokenOut}` : "Calculating..."
      ] }),
      estimate && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { children: estimate.fees.map((fee, idx) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
          fee.type,
          ": ",
          (0, import_core9.formatFee)(fee.amount, fee.token)
        ] }, idx)) }),
        estimate.priceImpact > 1.5 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { role: "alert", style: { color: "red" }, children: [
          "Warning: High price impact (",
          estimate.priceImpact,
          "%)"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating" || !estimate, children: "Confirm Swap" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { children: "Sell" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "input",
        {
          type: "number",
          step: "any",
          value: amountIn,
          onChange: (e) => setAmountIn(e.target.value),
          onBlur: () => setAmountTouched(true),
          placeholder: "0.00"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("select", { value: tokenIn, onChange: (e) => setTokenIn(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "ETH", children: "ETH" })
      ] }),
      amountTouched && !amountValid && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { children: "Buy" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("select", { value: tokenOut, onChange: (e) => setTokenOut(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "ETH", children: "ETH" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
      status === "estimating" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Fetching estimate\u2026" }),
      status === "idle" && estimate && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
        "You will receive ~",
        estimate.estimatedOutput,
        " ",
        tokenOut
      ] }),
      status === "error" && !isMocked && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Unable to estimate swap" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "submit", disabled: !amountValid, children: "Review" })
  ] }) });
}

// src/components/bridge-widget/index.tsx
var import_react10 = require("react");
var import_core10 = require("@arc-ui/core");
var import_jsx_runtime6 = require("react/jsx-runtime");
function BridgeWidget({
  kit,
  defaultChainFrom = "Ethereum",
  defaultChainTo = "Arc_Testnet",
  defaultToken = "USDC",
  defaultAmount = "",
  onSuccess,
  onError,
  data: injectedData,
  className,
  style
}) {
  const hookResult = useBridge(kit);
  const isMocked = !!injectedData;
  const status = isMocked ? injectedData.status : hookResult.status;
  const estimate = isMocked ? injectedData.estimate : hookResult.estimate;
  const result = isMocked ? injectedData.result : hookResult.result;
  const error = isMocked ? injectedData.error : hookResult.error;
  const [stage, setStage] = (0, import_react10.useState)("input");
  const [chainFrom, setChainFrom] = (0, import_react10.useState)(defaultChainFrom);
  const [chainTo, setChainTo] = (0, import_react10.useState)(defaultChainTo);
  const [token, setToken] = (0, import_react10.useState)(defaultToken);
  const [amount, setAmount] = (0, import_react10.useState)(defaultAmount);
  const [amountTouched, setAmountTouched] = (0, import_react10.useState)(false);
  const amountValid = (0, import_core10.isValidAmount)(amount);
  (0, import_react10.useEffect)(() => {
    if (isMocked) return;
    if (amountValid && chainFrom && chainTo && token) {
      const timer = setTimeout(() => {
        hookResult.getEstimate({
          from: { chain: chainFrom },
          to: { chain: chainTo },
          amount,
          token
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [amount, chainFrom, chainTo, token, amountValid, isMocked, hookResult.getEstimate]);
  (0, import_react10.useEffect)(() => {
    if (status === "bridging" && stage !== "result") {
      setStage("result");
    }
  }, [status, stage]);
  const handleReview = (e) => {
    e.preventDefault();
    if (amountValid) setStage("review");
  };
  const handleConfirm = () => {
    if (isMocked) {
      setStage("result");
      return;
    }
    hookResult.bridge({
      from: { chain: chainFrom },
      to: { chain: chainTo },
      amount,
      token
    });
  };
  const handleRetry = () => {
    if (!isMocked) hookResult.reset();
    setStage("input");
  };
  if (stage === "result") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { "data-state": status, className, style, children: [
      status === "bridging" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { "aria-busy": "true", children: "Bridging..." }),
      status !== "bridging" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        TransactionStatus,
        {
          bridgeResult: result || (error ? { state: "error", steps: [{ name: "Bridge", state: "error", error }] } : void 0),
          operationType: "bridge",
          onComplete: () => {
            if (result) onSuccess?.(result);
          },
          onError: (err) => onError?.(err instanceof Error ? err : new Error(String(err)))
        }
      ),
      status === "error" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { children: "Review Bridge Transfer" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { children: [
        "From: ",
        chainFrom
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { children: [
        "To: ",
        chainTo
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { children: [
        "Amount: ",
        amount,
        " ",
        token
      ] }),
      estimate && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { children: estimate.fees.map((fee, idx) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("li", { children: [
        fee.type,
        ": ",
        (0, import_core10.formatFee)(fee.amount, fee.token)
      ] }, idx)) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating" || !estimate, children: "Confirm Bridge" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { children: "From Chain" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("select", { value: chainFrom, onChange: (e) => setChainFrom(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "Ethereum", children: "Ethereum" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "Optimism", children: "Optimism" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "Arbitrum", children: "Arbitrum" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { children: "To Chain" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("select", { value: chainTo, onChange: (e) => setChainTo(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "Arc_Testnet", children: "Arc Testnet" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "Base", children: "Base" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "Polygon", children: "Polygon" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { children: "Amount" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "input",
        {
          type: "number",
          step: "any",
          value: amount,
          onChange: (e) => setAmount(e.target.value),
          onBlur: () => setAmountTouched(true),
          placeholder: "0.00"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("select", { value: token, onChange: (e) => setToken(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "ETH", children: "ETH" })
      ] }),
      amountTouched && !amountValid && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      status === "estimating" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "Fetching estimate\u2026" }),
      status === "error" && !isMocked && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "Unable to estimate bridge" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "submit", disabled: !amountValid, children: "Review" })
  ] }) });
}

// src/registry.ts
var registry = {
  "wallet-connect-button": {
    name: "wallet-connect-button",
    type: "registry:block",
    title: "WalletConnectButton",
    description: "Connect a user wallet before entering an Arc App Kit flow.",
    dependencies: ["@arc-ui/core", "@circle-fin/app-kit"],
    files: [
      {
        path: "registry/default/wallet-connect-button/index.tsx",
        type: "registry:component"
      }
    ]
  },
  "transaction-status": {
    name: "transaction-status",
    type: "registry:block",
    title: "TransactionStatus",
    description: "Track and present transaction lifecycle states.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/transaction-status/index.tsx",
        type: "registry:component"
      }
    ]
  },
  "balance-card": {
    name: "balance-card",
    type: "registry:block",
    title: "BalanceCard",
    description: "Display Unified Balance across supported chains.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/balance-card/index.tsx",
        type: "registry:component"
      }
    ]
  },
  "send-money-form": {
    name: "send-money-form",
    type: "registry:block",
    title: "SendMoneyForm",
    description: "Collect recipient, amount, and asset details for payments.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/send-money-form/index.tsx",
        type: "registry:component"
      }
    ]
  },
  "swap-widget": {
    name: "swap-widget",
    type: "registry:block",
    title: "SwapWidget",
    description: "Allow users to swap tokens natively within your app.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/swap-widget/index.tsx",
        type: "registry:component"
      }
    ]
  },
  "bridge-widget": {
    name: "bridge-widget",
    type: "registry:block",
    title: "BridgeWidget",
    description: "Move tokens cross-chain via CCTP bridge.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/bridge-widget/index.tsx",
        type: "registry:component"
      }
    ]
  }
};

// src/index.ts
__reExport(index_exports, require("@arc-ui/core"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BalanceCard,
  BridgeWidget,
  SendMoneyForm,
  SwapWidget,
  TransactionStatus,
  WalletConnectButton,
  registry,
  useBalances,
  useBridge,
  useSend,
  useSwap,
  ...require("@arc-ui/core")
});
//# sourceMappingURL=index.js.map