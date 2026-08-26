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
  TransferForm: () => TransferForm,
  TransferReview: () => TransferReview,
  TransferStatus: () => TransferStatus,
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
function useBalances(options) {
  const { kit, sources, token, networkType, includePending, refreshInterval } = options;
  const storeOptions = (0, import_react.useMemo)(() => ({
    kit,
    sources,
    token,
    networkType,
    includePending
  }), [kit, sources, token, networkType, includePending]);
  const store = (0, import_react.useMemo)(
    () => (0, import_core.createBalanceStore)(storeOptions),
    [storeOptions]
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
  const getEstimate = store.getEstimate;
  const send = store.send;
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
  const getEstimate = store.getEstimate;
  const swap = store.swap;
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
  const getEstimate = store.getEstimate;
  const bridge = store.bridge;
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
var import_react9 = require("react");
var import_core11 = require("@arc-ui/core");

// src/components/transfer-form/index.tsx
var import_react8 = require("react");
var import_lucide_react = require("lucide-react");
var import_core8 = require("@arc-ui/core");
var import_jsx_runtime4 = require("react/jsx-runtime");
function toNumber(value) {
  if (value === void 0 || value === "") return void 0;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value.replace(/,/g, ""));
  return Number.isNaN(parsed) ? void 0 : parsed;
}
function formatAmount(value) {
  const parsed = toNumber(value);
  if (parsed === void 0) return "0.00";
  return parsed.toLocaleString(void 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  });
}
function defaultValidateRecipient(value) {
  return (0, import_core8.isValidAddress)(value);
}
function TransferForm({
  recipient,
  amount,
  onRecipientChange,
  onAmountChange,
  balance,
  networkFee = 0,
  token = "USDC",
  recentRecipients = [],
  validateRecipient = defaultValidateRecipient,
  validateAmount = import_core8.isValidAmount,
  onReview,
  className = "",
  style
}) {
  const formId = (0, import_react8.useId)();
  const recipientId = `${formId}-recipient`;
  const recipientErrorId = `${formId}-recipient-error`;
  const amountId = `${formId}-amount`;
  const amountErrorId = `${formId}-amount-error`;
  const [isRecipientFocused, setIsRecipientFocused] = (0, import_react8.useState)(false);
  const [recipientTouched, setRecipientTouched] = (0, import_react8.useState)(false);
  const [amountTouched, setAmountTouched] = (0, import_react8.useState)(false);
  const balanceNumber = toNumber(balance);
  const amountNumber = toNumber(amount);
  const hasRecipient = recipient.length > 0;
  const recipientValid = validateRecipient(recipient);
  const amountFormatValid = validateAmount(amount);
  const amountWithinBalance = balanceNumber === void 0 || amountNumber === void 0 || amountNumber <= balanceNumber;
  const recipientError = recipientTouched && hasRecipient && !recipientValid ? "Invalid address or username" : "";
  const amountError = (0, import_react8.useMemo)(() => {
    if (!amountTouched || !amount) return "";
    if (!amountFormatValid) return "Invalid amount";
    if (!amountWithinBalance) return "Insufficient balance";
    return "";
  }, [amount, amountFormatValid, amountTouched, amountWithinBalance]);
  const isReady = hasRecipient && recipientValid && amount.length > 0 && amountNumber !== void 0 && amountNumber > 0 && amountWithinBalance && !recipientError && !amountError;
  function handleSubmit(event) {
    event.preventDefault();
    setRecipientTouched(true);
    setAmountTouched(true);
    if (!isReady) return;
    onReview?.({ recipient, amount, token, networkFee });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "form",
    {
      "data-state": isReady ? "ready" : "idle",
      className: `flex min-h-[470px] flex-col gap-6 ${className}`,
      style,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-[22px] font-extrabold leading-normal text-foreground", children: "Send Money" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "flex items-center justify-center rounded-full border border-border p-[10px] text-foreground transition-colors hover:border-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react.ArrowUpRight, { className: "h-4 w-4", "aria-hidden": "true" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative flex flex-col gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "label",
              {
                htmlFor: recipientId,
                className: "text-[12px] font-medium uppercase tracking-wider text-muted-foreground",
                children: "Recipient"
              }
            ),
            recipientError ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-right text-[12px] font-medium text-destructive", children: recipientError }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "div",
            {
              className: `flex h-[51px] items-center gap-2 rounded-[16px] border bg-muted px-4 transition-colors ${recipientError ? "border-destructive" : "border-transparent"}`,
              children: [
                hasRecipient && !recipientError ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "h-5 w-5 shrink-0 overflow-hidden rounded-full", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "block h-full w-full bg-gradient-to-br from-[#191bac] via-[#b97ff0] to-[#f17249]" }) }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "input",
                  {
                    id: recipientId,
                    type: "text",
                    value: recipient,
                    onChange: (event) => onRecipientChange(event.target.value),
                    onFocus: () => setIsRecipientFocused(true),
                    onBlur: () => {
                      setIsRecipientFocused(false);
                      setRecipientTouched(true);
                    },
                    placeholder: "Enter public address (0x) or Username",
                    "aria-invalid": !!recipientError,
                    "aria-describedby": recipientError ? recipientErrorId : void 0,
                    className: "min-w-0 flex-1 bg-transparent text-[16px] font-medium text-foreground outline-none placeholder:text-muted-foreground"
                  }
                ),
                hasRecipient ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => onRecipientChange(""),
                    className: "shrink-0 text-muted-foreground transition-colors hover:text-foreground",
                    "aria-label": "Clear recipient",
                    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react.X, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
                  }
                ) : null
              ]
            }
          ),
          recipientError ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { id: recipientErrorId, className: "sr-only", children: recipientError }) : null,
          isRecipientFocused && !recipient && recentRecipients.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "absolute left-0 top-[calc(100%+4px)] z-50 w-full rounded-[12px] border border-border bg-card p-1 shadow-lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: "Recent" }),
            recentRecipients.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "button",
              {
                type: "button",
                onMouseDown: (event) => {
                  event.preventDefault();
                  onRecipientChange(item.address);
                  setRecipientTouched(true);
                  setIsRecipientFocused(false);
                },
                className: "flex w-full items-center gap-3 rounded-[10px] px-2 py-2 text-left transition-colors hover:bg-muted",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "h-8 w-8 shrink-0 overflow-hidden rounded-full", children: item.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "img",
                    {
                      src: item.avatarUrl,
                      alt: "",
                      className: "h-full w-full object-cover"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "block h-full w-full bg-gradient-to-br from-[#191bac] via-[#b97ff0] to-[#f17249]" }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "flex min-w-0 flex-col items-start", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[12px] font-medium text-foreground", children: item.name }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-[12px] font-medium text-muted-foreground", children: [
                      item.address.slice(0, 6),
                      "...",
                      item.address.slice(-4)
                    ] })
                  ] })
                ]
              },
              item.address
            ))
          ] }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "label",
              {
                htmlFor: amountId,
                className: "text-[12px] font-medium uppercase tracking-wider text-muted-foreground",
                children: "Amount"
              }
            ),
            amountError ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-right text-[12px] font-medium text-destructive", children: amountError }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "div",
            {
              className: `flex items-center justify-between rounded-[16px] border bg-muted p-5 transition-colors ${amountError ? "border-destructive" : "border-transparent"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "input",
                  {
                    id: amountId,
                    type: "text",
                    inputMode: "decimal",
                    value: amount,
                    placeholder: "0.00",
                    onChange: (event) => onAmountChange(event.target.value),
                    onBlur: () => setAmountTouched(true),
                    "aria-invalid": !!amountError,
                    "aria-describedby": amountError ? amountErrorId : void 0,
                    className: "w-[140px] bg-transparent text-[28px] font-bold text-foreground outline-none placeholder:text-muted-foreground",
                    style: { fontVariantNumeric: "tabular-nums" }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-[14px] font-semibold text-muted-foreground", children: token })
              ]
            }
          ),
          amountError ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { id: amountErrorId, className: "sr-only", children: amountError }) : null,
          balanceNumber !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-[12px] font-medium text-muted-foreground", children: [
              "Balance: ",
              formatAmount(balance)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                onClick: () => onAmountChange(String(balanceNumber)),
                className: "text-[14px] font-normal text-foreground underline",
                children: "Max"
              }
            )
          ] }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-px w-full bg-border" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between py-1 text-[14px]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-medium text-muted-foreground", children: "Network fee" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "span",
            {
              className: `font-semibold ${isReady ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                formatAmount(networkFee),
                " ",
                token
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "submit",
            disabled: !isReady,
            className: `h-14 w-full rounded-full bg-primary text-[16px] font-semibold text-primary-foreground transition-opacity ${isReady ? "hover:opacity-90" : "cursor-not-allowed opacity-70"}`,
            children: "Review Send"
          }
        )
      ]
    }
  );
}

// src/components/transfer-review/index.tsx
var import_core9 = require("@arc-ui/core");
var import_jsx_runtime5 = require("react/jsx-runtime");
function toNumber2(value) {
  if (value === void 0 || value === "") return 0;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value.replace(/,/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}
function formatAmount2(value) {
  return toNumber2(value).toLocaleString(void 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  });
}
function TransferReview({
  recipient,
  amount,
  network = "Ethereum",
  networkFee = 0,
  token = "USDC",
  onConfirm,
  onBack,
  className = "",
  style
}) {
  const total = toNumber2(amount) + toNumber2(networkFee);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      "data-state": "review",
      className: `flex flex-col items-center gap-5 ${className}`,
      style,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-1 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-lg font-semibold text-foreground", children: "Review Transfer" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-[13px] text-muted-foreground", children: "Please confirm the details below" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dl", { className: "w-full space-y-0", children: [
          { label: "Send", value: `${formatAmount2(amount)} ${token}` },
          { label: "To", value: (0, import_core9.formatAddress)(recipient), mono: true },
          { label: "Network", value: network }
        ].map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "div",
          {
            className: `flex items-center justify-between gap-4 py-3 ${index > 0 ? "border-t border-border" : ""}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { className: "text-[13.5px] font-medium text-muted-foreground", children: row.label }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "dd",
                {
                  className: `truncate text-right text-[13.5px] font-medium text-foreground ${row.mono ? "font-mono" : ""}`,
                  title: row.value,
                  children: row.value
                }
              )
            ]
          },
          row.label
        )) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "h-px w-full bg-border" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("dl", { className: "w-full space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { className: "text-[12.5px] text-muted-foreground", children: "Network Fee" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("dd", { className: "text-[12.5px] font-medium text-foreground", children: [
              formatAmount2(networkFee),
              " ",
              token
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { className: "text-[13.5px] font-bold text-foreground", children: "Total" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("dd", { className: "text-[14px] font-bold text-foreground", children: [
              formatAmount2(total),
              " ",
              token
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex w-full gap-2", children: [
          onBack ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              type: "button",
              onClick: onBack,
              className: "h-11 flex-1 rounded-xl border border-border bg-card text-[14px] font-semibold text-foreground transition-colors hover:bg-muted",
              children: "Back"
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              type: "button",
              onClick: onConfirm,
              className: "h-11 flex-1 rounded-xl bg-primary text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90",
              children: "Confirm Send"
            }
          )
        ] })
      ]
    }
  );
}

// src/components/transfer-status/index.tsx
var import_lucide_react2 = require("lucide-react");
var import_core10 = require("@arc-ui/core");
var import_jsx_runtime6 = require("react/jsx-runtime");
function TransferStatus({
  status,
  amount = "0.00",
  token = "USDC",
  network = "Arc Testnet",
  txHash,
  explorerUrl,
  errorMessage = "There was an error processing your transfer.",
  onAction,
  actionLabel,
  className = "",
  style
}) {
  if (status === "pending") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        "data-state": "pending",
        className: `flex min-h-[180px] flex-col items-center justify-center gap-4 ${className}`,
        style,
        "aria-live": "polite",
        "aria-busy": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            import_lucide_react2.Loader2,
            {
              className: "h-10 w-10 animate-spin text-emerald-500",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-1 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "text-[15px] font-semibold text-foreground", children: "Processing Transaction" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-[13px] text-muted-foreground", children: [
              "Confirming on ",
              network,
              "..."
            ] })
          ] })
        ]
      }
    );
  }
  if (status === "error") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        "data-state": "error",
        className: `flex flex-col items-center gap-5 ${className}`,
        style,
        role: "alert",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.XCircle, { className: "h-7 w-7 text-destructive", "aria-hidden": "true" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-1 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "text-lg font-semibold text-foreground", children: "Transfer Failed" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-[13px] text-muted-foreground", children: errorMessage })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-px w-full bg-border" }),
          onAction ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              type: "button",
              onClick: onAction,
              className: "w-full rounded-xl bg-primary py-2.5 text-[13.5px] font-medium text-primary-foreground transition-opacity hover:opacity-90",
              children: actionLabel ?? "Try Again"
            }
          ) : null
        ]
      }
    );
  }
  const txLabel = txHash ? (0, import_core10.formatAddress)(txHash) : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      "data-state": "success",
      className: `flex flex-col items-center gap-5 ${className}`,
      style,
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/15", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          import_lucide_react2.CheckCircle2,
          {
            className: "h-7 w-7 text-emerald-700 dark:text-emerald-400",
            "aria-hidden": "true"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-1 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "text-lg font-semibold text-foreground", children: "Completed" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-[13px] text-muted-foreground", children: [
            "You just sent ",
            amount,
            " ",
            token
          ] })
        ] }),
        txHash ? explorerUrl ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "a",
          {
            href: explorerUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex h-8 items-center gap-2 rounded-full bg-muted px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "font-mono", children: txLabel }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.ExternalLink, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
            ]
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "flex h-8 items-center rounded-full bg-muted px-4 text-[13px] font-medium text-muted-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "font-mono", children: txLabel }) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-px w-full bg-border" }),
        onAction ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            type: "button",
            onClick: onAction,
            className: "w-full rounded-xl bg-primary py-2.5 text-[13.5px] font-medium text-primary-foreground transition-opacity hover:opacity-90",
            children: actionLabel ?? "Done"
          }
        ) : null
      ]
    }
  );
}

// src/components/send-money-form/index.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function mapSendStatus(status, isMocked) {
  if (status === "error") return "error";
  if (status === "success" || isMocked) return "success";
  return "pending";
}
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
  const [stage, setStage] = (0, import_react9.useState)("input");
  const [recipient, setRecipient] = (0, import_react9.useState)(defaultRecipient);
  const [amount, setAmount] = (0, import_react9.useState)(defaultAmount);
  const completedRef = (0, import_react9.useRef)(false);
  const erroredRef = (0, import_react9.useRef)(false);
  const recipientValid = (0, import_core11.isValidAddress)(recipient);
  const amountValid = (0, import_core11.isValidAmount)(amount);
  const { getEstimate } = hookResult;
  (0, import_react9.useEffect)(() => {
    if (isMocked) return;
    if (!recipientValid || !amountValid) return;
    getEstimate({
      from: { chain },
      to: recipient,
      amount,
      token
    }).catch(console.error);
  }, [
    recipient,
    amount,
    recipientValid,
    amountValid,
    chain,
    token,
    isMocked,
    getEstimate
  ]);
  (0, import_react9.useEffect)(() => {
    if (stage !== "result") {
      completedRef.current = false;
      erroredRef.current = false;
      return;
    }
    if (status === "success" && result && !completedRef.current) {
      completedRef.current = true;
      onSuccess?.(result);
    }
    if (status === "error" && error && !erroredRef.current) {
      erroredRef.current = true;
      onError?.(error);
    }
  }, [stage, status, result, error, onSuccess, onError]);
  function handleReview() {
    if (recipientValid && amountValid) {
      setStage("review");
    }
  }
  function handleConfirm() {
    setStage("result");
    if (isMocked) return;
    hookResult.send({
      from: { chain },
      to: recipient,
      amount,
      token
    });
  }
  function handleReset() {
    if (!isMocked) hookResult.reset();
    setStage("input");
  }
  if (stage === "review") {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      TransferReview,
      {
        recipient,
        amount,
        network: chain,
        networkFee: estimate?.fee,
        token,
        onBack: () => setStage("input"),
        onConfirm: status === "estimating" ? void 0 : handleConfirm,
        className,
        style
      }
    );
  }
  if (stage === "result") {
    const transferStatus = mapSendStatus(status, isMocked);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      TransferStatus,
      {
        status: transferStatus,
        amount,
        token,
        network: chain,
        txHash: result?.txHash,
        explorerUrl: result?.explorerUrl,
        errorMessage: error?.message,
        onAction: handleReset,
        actionLabel: transferStatus === "error" ? "Try Again" : "Done",
        className,
        style
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    TransferForm,
    {
      recipient,
      amount,
      onRecipientChange: setRecipient,
      onAmountChange: setAmount,
      networkFee: estimate?.fee,
      token,
      validateRecipient: import_core11.isValidAddress,
      validateAmount: import_core11.isValidAmount,
      onReview: handleReview,
      className,
      style
    }
  );
}

// src/components/swap-widget/index.tsx
var import_react10 = require("react");
var import_core12 = require("@arc-ui/core");
var import_jsx_runtime8 = require("react/jsx-runtime");
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
  const [stage, setStage] = (0, import_react10.useState)("input");
  const [tokenIn, setTokenIn] = (0, import_react10.useState)(defaultTokenIn);
  const [tokenOut, setTokenOut] = (0, import_react10.useState)(defaultTokenOut);
  const [amountIn, setAmountIn] = (0, import_react10.useState)(defaultAmountIn);
  const [amountTouched, setAmountTouched] = (0, import_react10.useState)(false);
  const amountValid = (0, import_core12.isValidAmount)(amountIn);
  const { getEstimate } = hookResult;
  (0, import_react10.useEffect)(() => {
    if (isMocked) return;
    if (amountValid && tokenIn && tokenOut && chain) {
      getEstimate({
        from: { chain },
        tokenIn,
        tokenOut,
        amountIn
      }).catch(console.error);
    }
  }, [amountIn, tokenIn, tokenOut, amountValid, chain, isMocked, getEstimate]);
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
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { "data-state": status, className, style, children: [
      status === "swapping" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { "aria-busy": "true", children: "Swapping..." }),
      status !== "swapping" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
      status === "error" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { children: "Review Swap" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { children: [
        "Sell: ",
        amountIn,
        " ",
        tokenIn
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { children: [
        "Buy: ",
        estimate ? `${estimate.estimatedOutput} ${tokenOut}` : "Calculating..."
      ] }),
      estimate && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("ul", { children: estimate.fees.map((fee, idx) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("li", { children: [
          fee.type,
          ": ",
          (0, import_core12.formatFee)(fee.amount, fee.token)
        ] }, idx)) }),
        estimate.priceImpact > 1.5 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { role: "alert", style: { color: "red" }, children: [
          "Warning: High price impact (",
          estimate.priceImpact,
          "%)"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating" || !estimate, children: "Confirm Swap" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { children: "Sell" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("select", { value: tokenIn, onChange: (e) => setTokenIn(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "ETH", children: "ETH" })
      ] }),
      amountTouched && !amountValid && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { children: "Buy" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("select", { value: tokenOut, onChange: (e) => setTokenOut(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "ETH", children: "ETH" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
      status === "estimating" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { children: "Fetching estimate\u2026" }),
      status === "idle" && estimate && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { children: [
        "You will receive ~",
        estimate.estimatedOutput,
        " ",
        tokenOut
      ] }),
      status === "error" && !isMocked && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { children: "Unable to estimate swap" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "submit", disabled: !amountValid, children: "Review" })
  ] }) });
}

// src/components/bridge-widget/index.tsx
var import_react11 = require("react");
var import_core13 = require("@arc-ui/core");
var import_jsx_runtime9 = require("react/jsx-runtime");
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
  const [stage, setStage] = (0, import_react11.useState)("input");
  const [chainFrom, setChainFrom] = (0, import_react11.useState)(defaultChainFrom);
  const [chainTo, setChainTo] = (0, import_react11.useState)(defaultChainTo);
  const [token, setToken] = (0, import_react11.useState)(defaultToken);
  const [amount, setAmount] = (0, import_react11.useState)(defaultAmount);
  const [amountTouched, setAmountTouched] = (0, import_react11.useState)(false);
  const amountValid = (0, import_core13.isValidAmount)(amount);
  const { getEstimate } = hookResult;
  (0, import_react11.useEffect)(() => {
    if (isMocked) return;
    if (amountValid && chainFrom && chainTo && token) {
      getEstimate({
        from: { chain: chainFrom },
        to: { chain: chainTo },
        amount,
        token
      }).catch(console.error);
    }
  }, [amount, chainFrom, chainTo, token, amountValid, isMocked, getEstimate]);
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
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { "data-state": status, className, style, children: [
      status === "bridging" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { "aria-busy": "true", children: "Bridging..." }),
      status !== "bridging" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
      status === "error" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { children: "Review Bridge Transfer" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { children: [
        "From: ",
        chainFrom
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { children: [
        "To: ",
        chainTo
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { children: [
        "Amount: ",
        amount,
        " ",
        token
      ] }),
      estimate && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ul", { children: estimate.fees.map((fee, idx) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("li", { children: [
        fee.type,
        ": ",
        (0, import_core13.formatFee)(fee.amount, fee.token)
      ] }, idx)) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating" || !estimate, children: "Confirm Bridge" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("label", { children: "From Chain" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("select", { value: chainFrom, onChange: (e) => setChainFrom(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "Ethereum", children: "Ethereum" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "Optimism", children: "Optimism" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "Arbitrum", children: "Arbitrum" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("label", { children: "To Chain" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("select", { value: chainTo, onChange: (e) => setChainTo(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "Arc_Testnet", children: "Arc Testnet" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "Base", children: "Base" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "Polygon", children: "Polygon" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("label", { children: "Amount" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("select", { value: token, onChange: (e) => setToken(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "ETH", children: "ETH" })
      ] }),
      amountTouched && !amountValid && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
      status === "estimating" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Fetching estimate\u2026" }),
      status === "error" && !isMocked && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Unable to estimate bridge" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "submit", disabled: !amountValid, children: "Review" })
  ] }) });
}

// src/registry.ts
function componentFile(name) {
  return {
    path: `registry/default/${name}/index.tsx`,
    type: "registry:component",
    target: `@components/arc-ui/${name}/index.tsx`
  };
}
function includedComponentFile(owner, name) {
  return {
    path: `registry/default/${owner}/${name}/index.tsx`,
    type: "registry:component",
    target: `@components/arc-ui/${name}/index.tsx`
  };
}
function hookFile(owner, name) {
  return {
    path: `registry/default/${owner}/hooks/${name}.ts`,
    type: "registry:hook",
    target: `@components/arc-ui/hooks/${name}.ts`
  };
}
var registry = {
  "wallet-connect-button": {
    name: "wallet-connect-button",
    type: "registry:block",
    title: "WalletConnectButton",
    description: "Connect a user wallet before entering an Arc App Kit flow.",
    dependencies: ["@arc-ui/core", "@circle-fin/app-kit"],
    files: [componentFile("wallet-connect-button")]
  },
  "transaction-status": {
    name: "transaction-status",
    type: "registry:block",
    title: "TransactionStatus",
    description: "Track and present transaction lifecycle states.",
    dependencies: ["@arc-ui/core"],
    files: [componentFile("transaction-status")]
  },
  "balance-card": {
    name: "balance-card",
    type: "registry:block",
    title: "BalanceCard",
    description: "Display Unified Balance across supported chains.",
    dependencies: ["@arc-ui/core"],
    files: [componentFile("balance-card"), hookFile("balance-card", "useBalances")]
  },
  "send-money-form": {
    name: "send-money-form",
    type: "registry:block",
    title: "SendMoneyForm",
    description: "Collect recipient, amount, and asset details for payments.",
    dependencies: ["@arc-ui/core", "lucide-react"],
    files: [
      componentFile("send-money-form"),
      hookFile("send-money-form", "useSend"),
      includedComponentFile("send-money-form", "transfer-form"),
      includedComponentFile("send-money-form", "transfer-review"),
      includedComponentFile("send-money-form", "transfer-status")
    ]
  },
  "swap-widget": {
    name: "swap-widget",
    type: "registry:block",
    title: "SwapWidget",
    description: "Allow users to swap tokens natively within your app.",
    dependencies: ["@arc-ui/core"],
    files: [
      componentFile("swap-widget"),
      hookFile("swap-widget", "useSwap"),
      includedComponentFile("swap-widget", "transaction-status")
    ]
  },
  "bridge-widget": {
    name: "bridge-widget",
    type: "registry:block",
    title: "BridgeWidget",
    description: "Move tokens cross-chain via CCTP bridge.",
    dependencies: ["@arc-ui/core"],
    files: [
      componentFile("bridge-widget"),
      hookFile("bridge-widget", "useBridge"),
      includedComponentFile("bridge-widget", "transaction-status")
    ]
  },
  "transfer-form": {
    name: "transfer-form",
    type: "registry:block",
    title: "TransferForm",
    description: "Collect recipient and amount for a token transfer.",
    dependencies: ["@arc-ui/core", "lucide-react"],
    files: [componentFile("transfer-form")]
  },
  "transfer-review": {
    name: "transfer-review",
    type: "registry:block",
    title: "TransferReview",
    description: "Review transfer details before execution.",
    dependencies: ["@arc-ui/core"],
    files: [componentFile("transfer-review")]
  },
  "transfer-status": {
    name: "transfer-status",
    type: "registry:block",
    title: "TransferStatus",
    description: "Display pending, success, and error states for a transfer.",
    dependencies: ["@arc-ui/core", "lucide-react"],
    files: [componentFile("transfer-status")]
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
  TransferForm,
  TransferReview,
  TransferStatus,
  WalletConnectButton,
  registry,
  useBalances,
  useBridge,
  useSend,
  useSwap,
  ...require("@arc-ui/core")
});
//# sourceMappingURL=index.js.map