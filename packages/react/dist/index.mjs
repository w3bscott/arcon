"use client";

// src/hooks/useBalances.ts
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { createBalanceStore } from "@arcforge/core";
function useBalances(options) {
  const { kit, sources, token, networkType, includePending, refreshInterval } = options;
  const storeOptions = useMemo(() => ({
    kit,
    sources,
    token,
    networkType,
    includePending
  }), [kit, sources, token, networkType, includePending]);
  const store = useMemo(
    () => createBalanceStore(storeOptions),
    [storeOptions]
  );
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const refetch = useCallback(() => {
    return store.refetch();
  }, [store]);
  useEffect(() => {
    store.refetch().catch(() => {
    });
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
    refetch
  };
}

// src/hooks/useSend.ts
import { useCallback as useCallback2, useEffect as useEffect2, useMemo as useMemo2, useSyncExternalStore as useSyncExternalStore2 } from "react";
import { createSendStore } from "@arcforge/core";
function useSend(kit) {
  const store = useMemo2(() => createSendStore(kit), [kit]);
  const state = useSyncExternalStore2(store.subscribe, store.getState, store.getState);
  const getEstimate = store.getEstimate;
  const send = store.send;
  const reset = useCallback2(() => {
    store.reset();
  }, [store]);
  useEffect2(() => {
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
import { useCallback as useCallback3, useEffect as useEffect3, useMemo as useMemo3, useSyncExternalStore as useSyncExternalStore3 } from "react";
import { createSwapStore } from "@arcforge/core";
function useSwap(kit) {
  const store = useMemo3(() => createSwapStore(kit), [kit]);
  const state = useSyncExternalStore3(store.subscribe, store.getState, store.getState);
  const getEstimate = store.getEstimate;
  const swap = store.swap;
  const reset = useCallback3(() => {
    store.reset();
  }, [store]);
  useEffect3(() => {
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
import { useCallback as useCallback4, useEffect as useEffect4, useMemo as useMemo4, useSyncExternalStore as useSyncExternalStore4 } from "react";
import { createBridgeStore } from "@arcforge/core";
function useBridge(kit) {
  const store = useMemo4(() => createBridgeStore(kit), [kit]);
  const state = useSyncExternalStore4(store.subscribe, store.getState, store.getState);
  const getEstimate = store.getEstimate;
  const bridge = store.bridge;
  const reset = useCallback4(() => {
    store.reset();
  }, [store]);
  useEffect4(() => {
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
import {
  useCallback as useCallback5,
  useRef,
  useState
} from "react";
import { formatAddress } from "@arcforge/core";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const [internalError, setInternalError] = useState(null);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);
  const state = deriveState(isConnected, isLoading, internalError);
  const handleConnect = useCallback5(async () => {
    setInternalError(null);
    try {
      await onConnect();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setInternalError(error);
      onError?.(error);
    }
  }, [onConnect, onError]);
  const handleDisconnect = useCallback5(async () => {
    if (!onDisconnect) return;
    try {
      await onDisconnect();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setInternalError(error);
      onError?.(error);
    }
  }, [onDisconnect, onError]);
  const handleCopy = useCallback5(() => {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1500);
    });
  }, [address]);
  if (state === "disconnected") {
    return /* @__PURE__ */ jsx("div", { "data-state": "disconnected", className, style, children: /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx("div", { "data-state": "connecting", className, style, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        disabled: true,
        "aria-busy": "true",
        "aria-label": "Connect wallet",
        children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u23F3" }),
          " Connecting\u2026"
        ]
      }
    ) });
  }
  if (state === "error" && internalError) {
    return /* @__PURE__ */ jsxs("div", { "data-state": "error", className, style, children: [
      /* @__PURE__ */ jsx("p", { role: "alert", children: internalError.message }),
      /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs("div", { "data-state": "connected", className, style, children: [
    address && /* @__PURE__ */ jsxs("span", { "aria-label": `Connected: ${address}`, children: [
      formatAddress(address),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleCopy,
          "aria-label": copied ? "Address copied" : "Copy address",
          children: copied ? "Copied" : "\u{1F4CB}"
        }
      )
    ] }),
    onDisconnect && /* @__PURE__ */ jsx(
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
import {
  useEffect as useEffect5,
  useMemo as useMemo5,
  useRef as useRef2
} from "react";
import {
  formatAddress as formatAddress2
} from "@arcforge/core";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  const hasCompleted = useRef2(false);
  const hasErrored = useRef2(false);
  useEffect5(() => {
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
  const resolvedExplorerUrl = useMemo5(() => {
    if (explorerUrl) return explorerUrl;
    if (sendResult?.explorerUrl) return sendResult.explorerUrl;
    if (spendResult?.explorerUrl) return spendResult.explorerUrl;
    if (bridgeResult?.steps) {
      const lastSuccess = [...bridgeResult.steps].reverse().find((s) => s.explorerUrl);
      if (lastSuccess) return lastSuccess.explorerUrl;
    }
    return void 0;
  }, [explorerUrl, sendResult, spendResult, bridgeResult]);
  const resolvedTxHash = useMemo5(() => {
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
    return /* @__PURE__ */ jsx2("div", { "data-state": "idle", className, style });
  }
  if (state === "pending") {
    if (bridgeResult) {
      const stepsToRender = bridgeResult.steps.filter((s) => s.state !== "noop");
      return /* @__PURE__ */ jsxs2("div", { "data-state": "pending", className, style, children: [
        /* @__PURE__ */ jsxs2("p", { children: [
          "Processing ",
          operationType,
          "..."
        ] }),
        /* @__PURE__ */ jsx2("ul", { "aria-label": "Transaction steps", children: stepsToRender.map((step, idx) => /* @__PURE__ */ jsxs2(
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
    return /* @__PURE__ */ jsx2("div", { "data-state": "pending", className, style, children: /* @__PURE__ */ jsxs2("p", { children: [
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
    return /* @__PURE__ */ jsx2("div", { "data-state": "error", className, style, role: "alert", children: /* @__PURE__ */ jsxs2("p", { children: [
      "Failed: ",
      errorMessage
    ] }) });
  }
  return /* @__PURE__ */ jsxs2("div", { "data-state": "success", className, style, children: [
    /* @__PURE__ */ jsxs2("p", { children: [
      operationType.charAt(0).toUpperCase() + operationType.slice(1),
      " successful!"
    ] }),
    resolvedExplorerUrl ? /* @__PURE__ */ jsxs2(
      "a",
      {
        href: resolvedExplorerUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        children: [
          "View on Explorer ",
          resolvedTxHash ? `(${formatAddress2(resolvedTxHash)})` : ""
        ]
      }
    ) : resolvedTxHash ? /* @__PURE__ */ jsxs2("span", { children: [
      "Tx: ",
      formatAddress2(resolvedTxHash),
      " ",
      /* @__PURE__ */ jsx2(
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
import {
  useEffect as useEffect6
} from "react";
import {
  formatBalance,
  formatChainName
} from "@arcforge/core";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
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
  useEffect6(() => {
    if (isMocked) return;
    if (status === "success" && data) {
      onBalanceFetched?.(data);
    }
  }, [status, data, onBalanceFetched, isMocked]);
  useEffect6(() => {
    if (isMocked) return;
    if (status === "error" && error) {
      onError?.(error);
    }
  }, [status, error, onError, isMocked]);
  if (status === "loading" || status === "idle") {
    return /* @__PURE__ */ jsxs3("div", { "data-state": "loading", className, style, "aria-busy": "true", children: [
      /* @__PURE__ */ jsx3("p", { className: "sr-only", children: "Loading balance..." }),
      /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u23F3" })
    ] });
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxs3("div", { "data-state": "error", className, style, role: "alert", children: [
      /* @__PURE__ */ jsx3("p", { children: error?.message || "Failed to load balance." }),
      !isMocked && /* @__PURE__ */ jsx3("button", { type: "button", onClick: hookResult.refetch, children: "Retry" })
    ] });
  }
  const totalConf = parseFloat(data?.totalConfirmedBalance || "0");
  const totalPend = parseFloat(data?.totalPendingBalance || "0");
  const isEmpty = totalConf === 0 && (!includePending || totalPend === 0);
  if (status === "success" && isEmpty) {
    return /* @__PURE__ */ jsx3("div", { "data-state": "empty", className, style, children: /* @__PURE__ */ jsx3("p", { children: "No balance found." }) });
  }
  if (status === "success" && data) {
    return /* @__PURE__ */ jsxs3("div", { "data-state": "loaded", className, style, children: [
      /* @__PURE__ */ jsxs3("p", { children: [
        formatBalance(data.totalConfirmedBalance),
        " ",
        data.token
      ] }),
      includePending && totalPend > 0 && /* @__PURE__ */ jsxs3("p", { children: [
        "Pending: ",
        formatBalance(data.totalPendingBalance),
        " ",
        data.token
      ] }),
      /* @__PURE__ */ jsx3("ul", { children: data.breakdown.map((b, idx) => /* @__PURE__ */ jsxs3("li", { children: [
        renderChainIcon?.(b.chain),
        formatChainName(b.chain),
        ": ",
        formatBalance(b.confirmedBalance)
      ] }, idx)) })
    ] });
  }
  return null;
}

// src/components/send-money-form/index.tsx
import { useEffect as useEffect7, useRef as useRef3, useState as useState3 } from "react";
import {
  isValidAddress as isValidAddress2,
  isValidAmount as isValidAmount2
} from "@arcforge/core";

// src/components/transfer-form/index.tsx
import {
  useId,
  useMemo as useMemo6,
  useState as useState2
} from "react";
import { ArrowUpRight, X } from "lucide-react";
import { isValidAddress, isValidAmount } from "@arcforge/core";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
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
  return isValidAddress(value);
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
  validateAmount = isValidAmount,
  onReview,
  className = "",
  style
}) {
  const formId = useId();
  const recipientId = `${formId}-recipient`;
  const recipientErrorId = `${formId}-recipient-error`;
  const amountId = `${formId}-amount`;
  const amountErrorId = `${formId}-amount-error`;
  const [isRecipientFocused, setIsRecipientFocused] = useState2(false);
  const [recipientTouched, setRecipientTouched] = useState2(false);
  const [amountTouched, setAmountTouched] = useState2(false);
  const balanceNumber = toNumber(balance);
  const amountNumber = toNumber(amount);
  const hasRecipient = recipient.length > 0;
  const recipientValid = validateRecipient(recipient);
  const amountFormatValid = validateAmount(amount);
  const amountWithinBalance = balanceNumber === void 0 || amountNumber === void 0 || amountNumber <= balanceNumber;
  const recipientError = recipientTouched && hasRecipient && !recipientValid ? "Invalid address or username" : "";
  const amountError = useMemo6(() => {
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
  return /* @__PURE__ */ jsxs4(
    "form",
    {
      "data-state": isReady ? "ready" : "idle",
      className: `flex min-h-[470px] flex-col gap-6 ${className}`,
      style,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx4("h3", { className: "text-[22px] font-extrabold leading-normal text-foreground", children: "Send Money" }),
          /* @__PURE__ */ jsx4("span", { className: "flex items-center justify-center rounded-full border border-border p-[10px] text-foreground transition-colors hover:border-foreground", children: /* @__PURE__ */ jsx4(ArrowUpRight, { className: "h-4 w-4", "aria-hidden": "true" }) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "relative flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx4(
              "label",
              {
                htmlFor: recipientId,
                className: "text-[12px] font-medium uppercase tracking-wider text-muted-foreground",
                children: "Recipient"
              }
            ),
            recipientError ? /* @__PURE__ */ jsx4("span", { className: "text-right text-[12px] font-medium text-destructive", children: recipientError }) : null
          ] }),
          /* @__PURE__ */ jsxs4(
            "div",
            {
              className: `flex h-[51px] items-center gap-2 rounded-[16px] border bg-muted px-4 transition-colors ${recipientError ? "border-destructive" : "border-transparent"}`,
              children: [
                hasRecipient && !recipientError ? /* @__PURE__ */ jsx4("span", { className: "h-5 w-5 shrink-0 overflow-hidden rounded-full", children: /* @__PURE__ */ jsx4("span", { className: "block h-full w-full bg-gradient-to-br from-[#191bac] via-[#b97ff0] to-[#f17249]" }) }) : null,
                /* @__PURE__ */ jsx4(
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
                hasRecipient ? /* @__PURE__ */ jsx4(
                  "button",
                  {
                    type: "button",
                    onClick: () => onRecipientChange(""),
                    className: "shrink-0 text-muted-foreground transition-colors hover:text-foreground",
                    "aria-label": "Clear recipient",
                    children: /* @__PURE__ */ jsx4(X, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
                  }
                ) : null
              ]
            }
          ),
          recipientError ? /* @__PURE__ */ jsx4("span", { id: recipientErrorId, className: "sr-only", children: recipientError }) : null,
          isRecipientFocused && !recipient && recentRecipients.length > 0 ? /* @__PURE__ */ jsxs4("div", { className: "absolute left-0 top-[calc(100%+4px)] z-50 w-full rounded-[12px] border border-border bg-card p-1 shadow-lg", children: [
            /* @__PURE__ */ jsx4("p", { className: "px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: "Recent" }),
            recentRecipients.map((item) => /* @__PURE__ */ jsxs4(
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
                  /* @__PURE__ */ jsx4("span", { className: "h-8 w-8 shrink-0 overflow-hidden rounded-full", children: item.avatarUrl ? /* @__PURE__ */ jsx4(
                    "img",
                    {
                      src: item.avatarUrl,
                      alt: `Avatar for ${item.name}`,
                      className: "h-full w-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsx4("span", { className: "block h-full w-full bg-gradient-to-br from-[#191bac] via-[#b97ff0] to-[#f17249]" }) }),
                  /* @__PURE__ */ jsxs4("span", { className: "flex min-w-0 flex-col items-start", children: [
                    /* @__PURE__ */ jsx4("span", { className: "text-[12px] font-medium text-foreground", children: item.name }),
                    /* @__PURE__ */ jsxs4("span", { className: "text-[12px] font-medium text-muted-foreground", children: [
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
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx4(
              "label",
              {
                htmlFor: amountId,
                className: "text-[12px] font-medium uppercase tracking-wider text-muted-foreground",
                children: "Amount"
              }
            ),
            amountError ? /* @__PURE__ */ jsx4("span", { className: "text-right text-[12px] font-medium text-destructive", children: amountError }) : null
          ] }),
          /* @__PURE__ */ jsxs4(
            "div",
            {
              className: `flex items-center justify-between rounded-[16px] border bg-muted p-5 transition-colors ${amountError ? "border-destructive" : "border-transparent"}`,
              children: [
                /* @__PURE__ */ jsx4(
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
                /* @__PURE__ */ jsx4("span", { className: "text-[14px] font-semibold text-muted-foreground", children: token })
              ]
            }
          ),
          amountError ? /* @__PURE__ */ jsx4("span", { id: amountErrorId, className: "sr-only", children: amountError }) : null,
          balanceNumber !== void 0 ? /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs4("span", { className: "text-[12px] font-medium text-muted-foreground", children: [
              "Balance: ",
              formatAmount(balance)
            ] }),
            /* @__PURE__ */ jsx4(
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
        /* @__PURE__ */ jsx4("div", { className: "h-px w-full bg-border" }),
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between py-1 text-[14px]", children: [
          /* @__PURE__ */ jsx4("span", { className: "font-medium text-muted-foreground", children: "Network fee" }),
          /* @__PURE__ */ jsxs4(
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
        /* @__PURE__ */ jsx4(
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
import { formatAddress as formatAddress3 } from "@arcforge/core";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      "data-state": "review",
      className: `flex flex-col items-center gap-5 ${className}`,
      style,
      children: [
        /* @__PURE__ */ jsxs5("div", { className: "space-y-1 text-center", children: [
          /* @__PURE__ */ jsx5("h3", { className: "text-lg font-semibold text-foreground", children: "Review Transfer" }),
          /* @__PURE__ */ jsx5("p", { className: "text-[13px] text-muted-foreground", children: "Please confirm the details below" })
        ] }),
        /* @__PURE__ */ jsx5("dl", { className: "w-full space-y-0", children: [
          { label: "Send", value: `${formatAmount2(amount)} ${token}` },
          { label: "To", value: formatAddress3(recipient), mono: true },
          { label: "Network", value: network }
        ].map((row, index) => /* @__PURE__ */ jsxs5(
          "div",
          {
            className: `flex items-center justify-between gap-4 py-3 ${index > 0 ? "border-t border-border" : ""}`,
            children: [
              /* @__PURE__ */ jsx5("dt", { className: "text-[13.5px] font-medium text-muted-foreground", children: row.label }),
              /* @__PURE__ */ jsx5(
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
        /* @__PURE__ */ jsx5("div", { className: "h-px w-full bg-border" }),
        /* @__PURE__ */ jsxs5("dl", { className: "w-full space-y-2", children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsx5("dt", { className: "text-[12.5px] text-muted-foreground", children: "Network Fee" }),
            /* @__PURE__ */ jsxs5("dd", { className: "text-[12.5px] font-medium text-foreground", children: [
              formatAmount2(networkFee),
              " ",
              token
            ] })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsx5("dt", { className: "text-[13.5px] font-bold text-foreground", children: "Total" }),
            /* @__PURE__ */ jsxs5("dd", { className: "text-[14px] font-bold text-foreground", children: [
              formatAmount2(total),
              " ",
              token
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "flex w-full gap-2", children: [
          onBack ? /* @__PURE__ */ jsx5(
            "button",
            {
              type: "button",
              onClick: onBack,
              className: "h-11 flex-1 rounded-xl border border-border bg-card text-[14px] font-semibold text-foreground transition-colors hover:bg-muted",
              children: "Back"
            }
          ) : null,
          /* @__PURE__ */ jsx5(
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
import { CheckCircle2, ExternalLink, Loader2, XCircle } from "lucide-react";
import { formatAddress as formatAddress4 } from "@arcforge/core";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        "data-state": "pending",
        className: `flex min-h-[180px] flex-col items-center justify-center gap-4 ${className}`,
        style,
        "aria-live": "polite",
        "aria-busy": "true",
        children: [
          /* @__PURE__ */ jsx6(
            Loader2,
            {
              className: "h-10 w-10 animate-spin text-emerald-500",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxs6("div", { className: "space-y-1 text-center", children: [
            /* @__PURE__ */ jsx6("h3", { className: "text-[15px] font-semibold text-foreground", children: "Processing Transaction" }),
            /* @__PURE__ */ jsxs6("p", { className: "text-[13px] text-muted-foreground", children: [
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
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        "data-state": "error",
        className: `flex flex-col items-center gap-5 ${className}`,
        style,
        role: "alert",
        children: [
          /* @__PURE__ */ jsx6("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx6(XCircle, { className: "h-7 w-7 text-destructive", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxs6("div", { className: "space-y-1 text-center", children: [
            /* @__PURE__ */ jsx6("h3", { className: "text-lg font-semibold text-foreground", children: "Transfer Failed" }),
            /* @__PURE__ */ jsx6("p", { className: "text-[13px] text-muted-foreground", children: errorMessage })
          ] }),
          /* @__PURE__ */ jsx6("div", { className: "h-px w-full bg-border" }),
          onAction ? /* @__PURE__ */ jsx6(
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
  const txLabel = txHash ? formatAddress4(txHash) : void 0;
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      "data-state": "success",
      className: `flex flex-col items-center gap-5 ${className}`,
      style,
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ jsx6("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/15", children: /* @__PURE__ */ jsx6(
          CheckCircle2,
          {
            className: "h-7 w-7 text-emerald-700 dark:text-emerald-400",
            "aria-hidden": "true"
          }
        ) }),
        /* @__PURE__ */ jsxs6("div", { className: "space-y-1 text-center", children: [
          /* @__PURE__ */ jsx6("h3", { className: "text-lg font-semibold text-foreground", children: "Completed" }),
          /* @__PURE__ */ jsxs6("p", { className: "text-[13px] text-muted-foreground", children: [
            "You just sent ",
            amount,
            " ",
            token
          ] })
        ] }),
        txHash ? explorerUrl ? /* @__PURE__ */ jsxs6(
          "a",
          {
            href: explorerUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex h-8 items-center gap-2 rounded-full bg-muted px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground",
            children: [
              /* @__PURE__ */ jsx6("span", { className: "font-mono", children: txLabel }),
              /* @__PURE__ */ jsx6(ExternalLink, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
            ]
          }
        ) : /* @__PURE__ */ jsx6("span", { className: "flex h-8 items-center rounded-full bg-muted px-4 text-[13px] font-medium text-muted-foreground", children: /* @__PURE__ */ jsx6("span", { className: "font-mono", children: txLabel }) }) : null,
        /* @__PURE__ */ jsx6("div", { className: "h-px w-full bg-border" }),
        onAction ? /* @__PURE__ */ jsx6(
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
import { jsx as jsx7 } from "react/jsx-runtime";
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
  const [stage, setStage] = useState3("input");
  const [recipient, setRecipient] = useState3(defaultRecipient);
  const [amount, setAmount] = useState3(defaultAmount);
  const completedRef = useRef3(false);
  const erroredRef = useRef3(false);
  const recipientValid = isValidAddress2(recipient);
  const amountValid = isValidAmount2(amount);
  const { getEstimate } = hookResult;
  useEffect7(() => {
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
  useEffect7(() => {
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
    return /* @__PURE__ */ jsx7(
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
    return /* @__PURE__ */ jsx7(
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
  return /* @__PURE__ */ jsx7(
    TransferForm,
    {
      recipient,
      amount,
      onRecipientChange: setRecipient,
      onAmountChange: setAmount,
      networkFee: estimate?.fee,
      token,
      validateRecipient: isValidAddress2,
      validateAmount: isValidAmount2,
      onReview: handleReview,
      className,
      style
    }
  );
}

// src/components/swap-widget/index.tsx
import {
  useEffect as useEffect8,
  useState as useState4
} from "react";
import {
  formatFee,
  isValidAmount as isValidAmount3
} from "@arcforge/core";
import { Fragment, jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
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
  const _error = isMocked ? injectedData.error : hookResult.error;
  const [stage, setStage] = useState4("input");
  const [tokenIn, setTokenIn] = useState4(defaultTokenIn);
  const [tokenOut, setTokenOut] = useState4(defaultTokenOut);
  const [amountIn, setAmountIn] = useState4(defaultAmountIn);
  const [amountTouched, setAmountTouched] = useState4(false);
  const amountValid = isValidAmount3(amountIn);
  const { getEstimate } = hookResult;
  useEffect8(() => {
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
    return /* @__PURE__ */ jsxs7("div", { "data-state": status, className, style, children: [
      status === "swapping" && /* @__PURE__ */ jsx8("p", { "aria-busy": "true", children: "Swapping..." }),
      status !== "swapping" && /* @__PURE__ */ jsx8(
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
      status === "error" && /* @__PURE__ */ jsx8("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ jsxs7("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ jsx8("h3", { children: "Review Swap" }),
      /* @__PURE__ */ jsxs7("p", { children: [
        "Sell: ",
        amountIn,
        " ",
        tokenIn
      ] }),
      /* @__PURE__ */ jsxs7("p", { children: [
        "Buy: ",
        estimate ? `${estimate.estimatedOutput} ${tokenOut}` : "Calculating..."
      ] }),
      estimate && /* @__PURE__ */ jsxs7(Fragment, { children: [
        /* @__PURE__ */ jsx8("ul", { children: estimate.fees.map((fee, idx) => /* @__PURE__ */ jsxs7("li", { children: [
          fee.type,
          ": ",
          formatFee(fee.amount, fee.token)
        ] }, idx)) }),
        estimate.priceImpact > 1.5 && /* @__PURE__ */ jsxs7("p", { role: "alert", style: { color: "red" }, children: [
          "Warning: High price impact (",
          estimate.priceImpact,
          "%)"
        ] })
      ] }),
      /* @__PURE__ */ jsx8("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ jsx8("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating" || !estimate, children: "Confirm Swap" })
    ] });
  }
  return /* @__PURE__ */ jsx8("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ jsxs7("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ jsxs7("div", { children: [
      /* @__PURE__ */ jsx8("label", { children: "Sell" }),
      /* @__PURE__ */ jsx8(
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
      /* @__PURE__ */ jsxs7("select", { value: tokenIn, onChange: (e) => setTokenIn(e.target.value), children: [
        /* @__PURE__ */ jsx8("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ jsx8("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ jsx8("option", { value: "ETH", children: "ETH" })
      ] }),
      amountTouched && !amountValid && /* @__PURE__ */ jsx8("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ jsxs7("div", { children: [
      /* @__PURE__ */ jsx8("label", { children: "Buy" }),
      /* @__PURE__ */ jsxs7("select", { value: tokenOut, onChange: (e) => setTokenOut(e.target.value), children: [
        /* @__PURE__ */ jsx8("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ jsx8("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ jsx8("option", { value: "ETH", children: "ETH" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs7("div", { children: [
      status === "estimating" && /* @__PURE__ */ jsx8("p", { children: "Fetching estimate\u2026" }),
      status === "idle" && estimate && /* @__PURE__ */ jsxs7("p", { children: [
        "You will receive ~",
        estimate.estimatedOutput,
        " ",
        tokenOut
      ] }),
      status === "error" && !isMocked && /* @__PURE__ */ jsx8("p", { children: "Unable to estimate swap" })
    ] }),
    /* @__PURE__ */ jsx8("button", { type: "submit", disabled: !amountValid, children: "Review" })
  ] }) });
}

// src/components/bridge-widget/index.tsx
import {
  useEffect as useEffect9,
  useState as useState5
} from "react";
import {
  formatFee as formatFee2,
  isValidAmount as isValidAmount4
} from "@arcforge/core";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
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
  const [stage, setStage] = useState5("input");
  const [chainFrom, setChainFrom] = useState5(defaultChainFrom);
  const [chainTo, setChainTo] = useState5(defaultChainTo);
  const [token, setToken] = useState5(defaultToken);
  const [amount, setAmount] = useState5(defaultAmount);
  const [amountTouched, setAmountTouched] = useState5(false);
  const amountValid = isValidAmount4(amount);
  const { getEstimate } = hookResult;
  useEffect9(() => {
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
    return /* @__PURE__ */ jsxs8("div", { "data-state": status, className, style, children: [
      status === "bridging" && /* @__PURE__ */ jsx9("p", { "aria-busy": "true", children: "Bridging..." }),
      status !== "bridging" && /* @__PURE__ */ jsx9(
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
      status === "error" && /* @__PURE__ */ jsx9("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ jsxs8("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ jsx9("h3", { children: "Review Bridge Transfer" }),
      /* @__PURE__ */ jsxs8("p", { children: [
        "From: ",
        chainFrom
      ] }),
      /* @__PURE__ */ jsxs8("p", { children: [
        "To: ",
        chainTo
      ] }),
      /* @__PURE__ */ jsxs8("p", { children: [
        "Amount: ",
        amount,
        " ",
        token
      ] }),
      estimate && /* @__PURE__ */ jsx9("ul", { children: estimate.fees.map((fee, idx) => /* @__PURE__ */ jsxs8("li", { children: [
        fee.type,
        ": ",
        formatFee2(fee.amount, fee.token)
      ] }, idx)) }),
      /* @__PURE__ */ jsx9("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ jsx9("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating" || !estimate, children: "Confirm Bridge" })
    ] });
  }
  return /* @__PURE__ */ jsx9("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ jsxs8("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ jsxs8("div", { children: [
      /* @__PURE__ */ jsx9("label", { children: "From Chain" }),
      /* @__PURE__ */ jsxs8("select", { value: chainFrom, onChange: (e) => setChainFrom(e.target.value), children: [
        /* @__PURE__ */ jsx9("option", { value: "Ethereum", children: "Ethereum" }),
        /* @__PURE__ */ jsx9("option", { value: "Optimism", children: "Optimism" }),
        /* @__PURE__ */ jsx9("option", { value: "Arbitrum", children: "Arbitrum" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { children: [
      /* @__PURE__ */ jsx9("label", { children: "To Chain" }),
      /* @__PURE__ */ jsxs8("select", { value: chainTo, onChange: (e) => setChainTo(e.target.value), children: [
        /* @__PURE__ */ jsx9("option", { value: "Arc_Testnet", children: "Arc Testnet" }),
        /* @__PURE__ */ jsx9("option", { value: "Base", children: "Base" }),
        /* @__PURE__ */ jsx9("option", { value: "Polygon", children: "Polygon" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { children: [
      /* @__PURE__ */ jsx9("label", { children: "Amount" }),
      /* @__PURE__ */ jsx9(
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
      /* @__PURE__ */ jsxs8("select", { value: token, onChange: (e) => setToken(e.target.value), children: [
        /* @__PURE__ */ jsx9("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ jsx9("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ jsx9("option", { value: "ETH", children: "ETH" })
      ] }),
      amountTouched && !amountValid && /* @__PURE__ */ jsx9("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ jsxs8("div", { children: [
      status === "estimating" && /* @__PURE__ */ jsx9("p", { children: "Fetching estimate\u2026" }),
      status === "error" && !isMocked && /* @__PURE__ */ jsx9("p", { children: "Unable to estimate bridge" })
    ] }),
    /* @__PURE__ */ jsx9("button", { type: "submit", disabled: !amountValid, children: "Review" })
  ] }) });
}

// src/registry.ts
function componentFile(name) {
  return {
    path: `registry/default/${name}/index.tsx`,
    type: "registry:component",
    target: `@components/arcforge/${name}/index.tsx`
  };
}
function includedComponentFile(owner, name) {
  return {
    path: `registry/default/${owner}/${name}/index.tsx`,
    type: "registry:component",
    target: `@components/arcforge/${name}/index.tsx`
  };
}
function hookFile(owner, name) {
  return {
    path: `registry/default/${owner}/hooks/${name}.ts`,
    type: "registry:hook",
    target: `@components/arcforge/hooks/${name}.ts`
  };
}
var registry = {
  "wallet-connect-button": {
    name: "wallet-connect-button",
    type: "registry:block",
    title: "WalletConnectButton",
    description: "Connect a user wallet before entering an Arc App Kit flow.",
    dependencies: ["@arcforge/core", "@circle-fin/app-kit"],
    files: [componentFile("wallet-connect-button")]
  },
  "transaction-status": {
    name: "transaction-status",
    type: "registry:block",
    title: "TransactionStatus",
    description: "Track and present transaction lifecycle states.",
    dependencies: ["@arcforge/core"],
    files: [componentFile("transaction-status")]
  },
  "balance-card": {
    name: "balance-card",
    type: "registry:block",
    title: "BalanceCard",
    description: "Display Unified Balance across supported chains.",
    dependencies: ["@arcforge/core"],
    files: [componentFile("balance-card"), hookFile("balance-card", "useBalances")]
  },
  "send-money-form": {
    name: "send-money-form",
    type: "registry:block",
    title: "SendMoneyForm",
    description: "Collect recipient, amount, and asset details for payments.",
    dependencies: ["@arcforge/core", "lucide-react"],
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
    dependencies: ["@arcforge/core"],
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
    dependencies: ["@arcforge/core"],
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
    dependencies: ["@arcforge/core", "lucide-react"],
    files: [componentFile("transfer-form")]
  },
  "transfer-review": {
    name: "transfer-review",
    type: "registry:block",
    title: "TransferReview",
    description: "Review transfer details before execution.",
    dependencies: ["@arcforge/core"],
    files: [componentFile("transfer-review")]
  },
  "transfer-status": {
    name: "transfer-status",
    type: "registry:block",
    title: "TransferStatus",
    description: "Display pending, success, and error states for a transfer.",
    dependencies: ["@arcforge/core", "lucide-react"],
    files: [componentFile("transfer-status")]
  }
};

// src/index.ts
export * from "@arcforge/core";
export {
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
  useSwap
};
//# sourceMappingURL=index.mjs.map