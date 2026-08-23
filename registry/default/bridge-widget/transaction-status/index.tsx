"use client";

import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  type BridgeResult,
  type BridgeStep,
  type SpendResult,
  type TransactionState,
  formatAddress,
} from "@arc-ui/core";

export interface TransactionStatusProps {
  bridgeResult?: BridgeResult | undefined;
  sendResult?: BridgeStep | undefined;
  spendResult?: SpendResult | undefined;
  txHash?: string | undefined;
  explorerUrl?: string | undefined;
  operationType?: "send" | "bridge" | "swap" | "spend" | "deposit";
  onComplete?: () => void;
  onError?: (error: unknown) => void;
  className?: string;
  style?: CSSProperties;
}

function deriveState(
  bridgeResult?: BridgeResult,
  sendResult?: BridgeStep,
  spendResult?: SpendResult,
): TransactionState {
  if (bridgeResult) return bridgeResult.state;
  if (sendResult) return sendResult.state;
  if (spendResult) return "success"; // If SpendResult exists, it's successful
  return "idle";
}

export function TransactionStatus({
  bridgeResult,
  sendResult,
  spendResult,
  txHash,
  explorerUrl,
  operationType = "send",
  onComplete,
  onError,
  className,
  style,
}: TransactionStatusProps) {
  const state = deriveState(bridgeResult, sendResult, spendResult);
  
  const hasCompleted = useRef(false);
  const hasErrored = useRef(false);

  /* ── Trigger Callbacks ───────────────────────────────────────────── */
  useEffect(() => {
    if (state === "success" && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete?.();
    }
    if (state === "error" && !hasErrored.current) {
      hasErrored.current = true;
      let err: unknown;
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
    // Reset refs if state changes back to pending/idle
    if (state === "pending" || state === "idle") {
      hasCompleted.current = false;
      hasErrored.current = false;
    }
  }, [state, onComplete, onError, bridgeResult, sendResult]);

  /* ── Explorer URL Resolution ──────────────────────────────────────── */
  const resolvedExplorerUrl = useMemo(() => {
    if (explorerUrl) return explorerUrl;
    if (sendResult?.explorerUrl) return sendResult.explorerUrl;
    if (spendResult?.explorerUrl) return spendResult.explorerUrl;
    if (bridgeResult?.steps) {
      const lastSuccess = [...bridgeResult.steps].reverse().find((s) => s.explorerUrl);
      if (lastSuccess) return lastSuccess.explorerUrl;
    }
    return undefined;
  }, [explorerUrl, sendResult, spendResult, bridgeResult]);

  /* ── Resolved TxHash ─────────────────────────────────────────────── */
  const resolvedTxHash = useMemo(() => {
    if (txHash) return txHash;
    if (sendResult?.txHash) return sendResult.txHash;
    if (spendResult?.txHash) return spendResult.txHash;
    if (bridgeResult?.steps) {
      const lastSuccess = [...bridgeResult.steps].reverse().find((s) => s.txHash);
      if (lastSuccess) return lastSuccess.txHash;
    }
    return undefined;
  }, [txHash, sendResult, spendResult, bridgeResult]);

  /* ── Render: idle ────────────────────────────────────────────────── */
  if (state === "idle") {
    return <div data-state="idle" className={className} style={style} />;
  }

  /* ── Render: pending ─────────────────────────────────────────────── */
  if (state === "pending") {
    // If it's a bridge, render steps array
    if (bridgeResult) {
      const stepsToRender = bridgeResult.steps.filter((s) => s.state !== "noop");
      return (
        <div data-state="pending" className={className} style={style}>
          <p>Processing {operationType}...</p>
          <ul aria-label="Transaction steps">
            {stepsToRender.map((step, idx) => (
              <li
                key={idx}
                data-state={step.state}
                aria-current={step.state === "pending" ? "step" : undefined}
              >
                {step.name}: {step.state}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    // Otherwise standard pending
    return (
      <div data-state="pending" className={className} style={style}>
        <p>Processing {operationType}...</p>
      </div>
    );
  }

  /* ── Render: error ────────────────────────────────────────────────── */
  if (state === "error") {
    let errorMessage = "An error occurred.";
    if (bridgeResult) {
      const failed = bridgeResult.steps.find((s) => s.state === "error");
      if (failed?.errorMessage) errorMessage = failed.errorMessage;
    } else if (sendResult?.errorMessage) {
      errorMessage = sendResult.errorMessage;
    }

    return (
      <div data-state="error" className={className} style={style} role="alert">
        <p>Failed: {errorMessage}</p>
      </div>
    );
  }

  /* ── Render: success ─────────────────────────────────────────────── */
  return (
    <div data-state="success" className={className} style={style}>
      <p>{operationType.charAt(0).toUpperCase() + operationType.slice(1)} successful!</p>
      
      {resolvedExplorerUrl ? (
        <a
          href={resolvedExplorerUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Explorer {resolvedTxHash ? `(${formatAddress(resolvedTxHash)})` : ""}
        </a>
      ) : resolvedTxHash ? (
        <span>
          Tx: {formatAddress(resolvedTxHash)}{" "}
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(resolvedTxHash)}
            aria-label="Copy transaction hash"
          >
            📋
          </button>
        </span>
      ) : null}
    </div>
  );
}

export default TransactionStatus;
