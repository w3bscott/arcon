"use client";

// src/hooks/useBalances.ts
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { createBalanceStore } from "@arc-ui/core";
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
import { createSendStore } from "@arc-ui/core";
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
import { createSwapStore } from "@arc-ui/core";
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
import { createBridgeStore } from "@arc-ui/core";
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
import { formatAddress } from "@arc-ui/core";
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
} from "@arc-ui/core";
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
} from "@arc-ui/core";
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
import {
  useEffect as useEffect7,
  useState as useState2
} from "react";
import {
  formatAddress as formatAddress3,
  formatFee,
  isValidAddress,
  isValidAmount
} from "@arc-ui/core";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const [stage, setStage] = useState2("input");
  const [recipient, setRecipient] = useState2(defaultRecipient);
  const [amount, setAmount] = useState2(defaultAmount);
  const [recipientTouched, setRecipientTouched] = useState2(false);
  const [amountTouched, setAmountTouched] = useState2(false);
  const recipientValid = isValidAddress(recipient);
  const amountValid = isValidAmount(amount);
  const { getEstimate } = hookResult;
  useEffect7(() => {
    if (isMocked) return;
    if (recipientValid && amountValid) {
      getEstimate({
        from: { chain },
        to: recipient,
        amount,
        token
      }).catch(console.error);
    }
  }, [recipient, amount, recipientValid, amountValid, chain, token, isMocked, getEstimate]);
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
    return /* @__PURE__ */ jsxs4("div", { "data-state": status, className, style, children: [
      status === "sending" && /* @__PURE__ */ jsx4("p", { "aria-busy": "true", children: "Sending..." }),
      status !== "sending" && /* @__PURE__ */ jsx4(
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
      status === "error" && /* @__PURE__ */ jsx4("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ jsxs4("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ jsx4("h3", { children: "Review Summary" }),
      /* @__PURE__ */ jsxs4("p", { children: [
        "Recipient: ",
        formatAddress3(recipient)
      ] }),
      /* @__PURE__ */ jsxs4("p", { children: [
        "Amount: ",
        amount,
        " ",
        token
      ] }),
      /* @__PURE__ */ jsxs4("p", { children: [
        "Network fee: ",
        estimate ? formatFee(estimate.fee, token) : "Calculating..."
      ] }),
      /* @__PURE__ */ jsx4("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ jsx4("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating", children: "Confirm Send" })
    ] });
  }
  return /* @__PURE__ */ jsx4("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ jsxs4("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsx4("label", { children: "Recipient Address" }),
      /* @__PURE__ */ jsx4(
        "input",
        {
          type: "text",
          value: recipient,
          onChange: (e) => setRecipient(e.target.value),
          onBlur: () => setRecipientTouched(true),
          placeholder: "0x..."
        }
      ),
      recipientTouched && !recipientValid && /* @__PURE__ */ jsx4("p", { role: "alert", children: "Invalid address" })
    ] }),
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsxs4("label", { children: [
        "Amount (",
        token,
        ")"
      ] }),
      /* @__PURE__ */ jsx4(
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
      amountTouched && !amountValid && /* @__PURE__ */ jsx4("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ jsxs4("div", { children: [
      status === "estimating" && /* @__PURE__ */ jsx4("p", { children: "Fetching fee\u2026" }),
      status === "idle" && estimate && /* @__PURE__ */ jsxs4("p", { children: [
        "Network fee: ",
        formatFee(estimate.fee, token)
      ] }),
      status === "error" && !isMocked && /* @__PURE__ */ jsx4("p", { children: "Unable to estimate fee" })
    ] }),
    /* @__PURE__ */ jsx4("button", { type: "submit", disabled: !recipientValid || !amountValid, children: "Review" })
  ] }) });
}

// src/components/swap-widget/index.tsx
import {
  useEffect as useEffect8,
  useState as useState3
} from "react";
import {
  formatFee as formatFee2,
  isValidAmount as isValidAmount2
} from "@arc-ui/core";
import { Fragment, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
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
  const [stage, setStage] = useState3("input");
  const [tokenIn, setTokenIn] = useState3(defaultTokenIn);
  const [tokenOut, setTokenOut] = useState3(defaultTokenOut);
  const [amountIn, setAmountIn] = useState3(defaultAmountIn);
  const [amountTouched, setAmountTouched] = useState3(false);
  const amountValid = isValidAmount2(amountIn);
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
    return /* @__PURE__ */ jsxs5("div", { "data-state": status, className, style, children: [
      status === "swapping" && /* @__PURE__ */ jsx5("p", { "aria-busy": "true", children: "Swapping..." }),
      status !== "swapping" && /* @__PURE__ */ jsx5(
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
      status === "error" && /* @__PURE__ */ jsx5("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ jsxs5("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ jsx5("h3", { children: "Review Swap" }),
      /* @__PURE__ */ jsxs5("p", { children: [
        "Sell: ",
        amountIn,
        " ",
        tokenIn
      ] }),
      /* @__PURE__ */ jsxs5("p", { children: [
        "Buy: ",
        estimate ? `${estimate.estimatedOutput} ${tokenOut}` : "Calculating..."
      ] }),
      estimate && /* @__PURE__ */ jsxs5(Fragment, { children: [
        /* @__PURE__ */ jsx5("ul", { children: estimate.fees.map((fee, idx) => /* @__PURE__ */ jsxs5("li", { children: [
          fee.type,
          ": ",
          formatFee2(fee.amount, fee.token)
        ] }, idx)) }),
        estimate.priceImpact > 1.5 && /* @__PURE__ */ jsxs5("p", { role: "alert", style: { color: "red" }, children: [
          "Warning: High price impact (",
          estimate.priceImpact,
          "%)"
        ] })
      ] }),
      /* @__PURE__ */ jsx5("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ jsx5("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating" || !estimate, children: "Confirm Swap" })
    ] });
  }
  return /* @__PURE__ */ jsx5("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ jsxs5("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx5("label", { children: "Sell" }),
      /* @__PURE__ */ jsx5(
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
      /* @__PURE__ */ jsxs5("select", { value: tokenIn, onChange: (e) => setTokenIn(e.target.value), children: [
        /* @__PURE__ */ jsx5("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ jsx5("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ jsx5("option", { value: "ETH", children: "ETH" })
      ] }),
      amountTouched && !amountValid && /* @__PURE__ */ jsx5("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx5("label", { children: "Buy" }),
      /* @__PURE__ */ jsxs5("select", { value: tokenOut, onChange: (e) => setTokenOut(e.target.value), children: [
        /* @__PURE__ */ jsx5("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ jsx5("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ jsx5("option", { value: "ETH", children: "ETH" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { children: [
      status === "estimating" && /* @__PURE__ */ jsx5("p", { children: "Fetching estimate\u2026" }),
      status === "idle" && estimate && /* @__PURE__ */ jsxs5("p", { children: [
        "You will receive ~",
        estimate.estimatedOutput,
        " ",
        tokenOut
      ] }),
      status === "error" && !isMocked && /* @__PURE__ */ jsx5("p", { children: "Unable to estimate swap" })
    ] }),
    /* @__PURE__ */ jsx5("button", { type: "submit", disabled: !amountValid, children: "Review" })
  ] }) });
}

// src/components/bridge-widget/index.tsx
import {
  useEffect as useEffect9,
  useState as useState4
} from "react";
import {
  formatFee as formatFee3,
  isValidAmount as isValidAmount3
} from "@arc-ui/core";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
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
  const [stage, setStage] = useState4("input");
  const [chainFrom, setChainFrom] = useState4(defaultChainFrom);
  const [chainTo, setChainTo] = useState4(defaultChainTo);
  const [token, setToken] = useState4(defaultToken);
  const [amount, setAmount] = useState4(defaultAmount);
  const [amountTouched, setAmountTouched] = useState4(false);
  const amountValid = isValidAmount3(amount);
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
    return /* @__PURE__ */ jsxs6("div", { "data-state": status, className, style, children: [
      status === "bridging" && /* @__PURE__ */ jsx6("p", { "aria-busy": "true", children: "Bridging..." }),
      status !== "bridging" && /* @__PURE__ */ jsx6(
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
      status === "error" && /* @__PURE__ */ jsx6("button", { type: "button", onClick: handleRetry, children: "Try again" })
    ] });
  }
  if (stage === "review") {
    return /* @__PURE__ */ jsxs6("div", { "data-state": "idle", className, style, children: [
      /* @__PURE__ */ jsx6("h3", { children: "Review Bridge Transfer" }),
      /* @__PURE__ */ jsxs6("p", { children: [
        "From: ",
        chainFrom
      ] }),
      /* @__PURE__ */ jsxs6("p", { children: [
        "To: ",
        chainTo
      ] }),
      /* @__PURE__ */ jsxs6("p", { children: [
        "Amount: ",
        amount,
        " ",
        token
      ] }),
      estimate && /* @__PURE__ */ jsx6("ul", { children: estimate.fees.map((fee, idx) => /* @__PURE__ */ jsxs6("li", { children: [
        fee.type,
        ": ",
        formatFee3(fee.amount, fee.token)
      ] }, idx)) }),
      /* @__PURE__ */ jsx6("button", { type: "button", onClick: () => setStage("input"), children: "Back" }),
      /* @__PURE__ */ jsx6("button", { type: "button", onClick: handleConfirm, disabled: status === "estimating" || !estimate, children: "Confirm Bridge" })
    ] });
  }
  return /* @__PURE__ */ jsx6("div", { "data-state": "idle", className, style, children: /* @__PURE__ */ jsxs6("form", { onSubmit: handleReview, children: [
    /* @__PURE__ */ jsxs6("div", { children: [
      /* @__PURE__ */ jsx6("label", { children: "From Chain" }),
      /* @__PURE__ */ jsxs6("select", { value: chainFrom, onChange: (e) => setChainFrom(e.target.value), children: [
        /* @__PURE__ */ jsx6("option", { value: "Ethereum", children: "Ethereum" }),
        /* @__PURE__ */ jsx6("option", { value: "Optimism", children: "Optimism" }),
        /* @__PURE__ */ jsx6("option", { value: "Arbitrum", children: "Arbitrum" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("div", { children: [
      /* @__PURE__ */ jsx6("label", { children: "To Chain" }),
      /* @__PURE__ */ jsxs6("select", { value: chainTo, onChange: (e) => setChainTo(e.target.value), children: [
        /* @__PURE__ */ jsx6("option", { value: "Arc_Testnet", children: "Arc Testnet" }),
        /* @__PURE__ */ jsx6("option", { value: "Base", children: "Base" }),
        /* @__PURE__ */ jsx6("option", { value: "Polygon", children: "Polygon" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("div", { children: [
      /* @__PURE__ */ jsx6("label", { children: "Amount" }),
      /* @__PURE__ */ jsx6(
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
      /* @__PURE__ */ jsxs6("select", { value: token, onChange: (e) => setToken(e.target.value), children: [
        /* @__PURE__ */ jsx6("option", { value: "USDC", children: "USDC" }),
        /* @__PURE__ */ jsx6("option", { value: "USDT", children: "USDT" }),
        /* @__PURE__ */ jsx6("option", { value: "ETH", children: "ETH" })
      ] }),
      amountTouched && !amountValid && /* @__PURE__ */ jsx6("p", { role: "alert", children: "Invalid amount" })
    ] }),
    /* @__PURE__ */ jsxs6("div", { children: [
      status === "estimating" && /* @__PURE__ */ jsx6("p", { children: "Fetching estimate\u2026" }),
      status === "error" && !isMocked && /* @__PURE__ */ jsx6("p", { children: "Unable to estimate bridge" })
    ] }),
    /* @__PURE__ */ jsx6("button", { type: "submit", disabled: !amountValid, children: "Review" })
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
export * from "@arc-ui/core";
export {
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
  useSwap
};
//# sourceMappingURL=index.mjs.map