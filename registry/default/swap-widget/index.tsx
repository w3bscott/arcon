"use client";

import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  type AppKit,
  type SwapResult,
  type SwapStoreState,
  formatFee,
  isValidAmount,
} from "@arcforge/core";
import { useSwap } from "../../hooks/useSwap";
import { TransactionStatus } from "../transaction-status";

export interface SwapWidgetProps {
  kit?: AppKit;
  chain?: string;
  defaultTokenIn?: string;
  defaultTokenOut?: string;
  defaultAmountIn?: string;
  onSuccess?: (result: SwapResult) => void;
  onError?: (error: Error) => void;
  data?: SwapStoreState;
  className?: string;
  style?: CSSProperties;
}

type Stage = "input" | "review" | "result";

export function SwapWidget({
  kit,
  chain = "Ethereum",
  defaultTokenIn = "USDC",
  defaultTokenOut = "USDT",
  defaultAmountIn = "",
  onSuccess,
  onError,
  data: injectedData,
  className,
  style,
}: SwapWidgetProps) {
  const hookResult = useSwap(kit as AppKit);
  const isMocked = !!injectedData;

  const status = isMocked ? injectedData.status : hookResult.status;
  const estimate = isMocked ? injectedData.estimate : hookResult.estimate;
  const result = isMocked ? injectedData.result : hookResult.result;
  const _error = isMocked ? injectedData.error : hookResult.error;

  const [stage, setStage] = useState<Stage>("input");
  const [tokenIn, setTokenIn] = useState(defaultTokenIn);
  const [tokenOut, setTokenOut] = useState(defaultTokenOut);
  const [amountIn, setAmountIn] = useState(defaultAmountIn);

  const [amountTouched, setAmountTouched] = useState(false);
  const amountValid = isValidAmount(amountIn);

  const { getEstimate } = hookResult;

  // Auto-estimate on input change
  useEffect(() => {
    if (isMocked) return;
    if (amountValid && tokenIn && tokenOut && chain) {
      getEstimate({
        from: { chain },
        tokenIn,
        tokenOut,
        amountIn,
      }).catch(console.error);
    }
  }, [amountIn, tokenIn, tokenOut, amountValid, chain, isMocked, getEstimate]);

  const handleReview = (e: FormEvent) => {
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
      amountIn,
    });
  };

  const handleRetry = () => {
    if (!isMocked) hookResult.reset();
    setStage("input");
  };

  /* ── Render: result ───────────────────────────────────────────────── */
  if (stage === "result") {
    return (
      <div data-state={status} className={className} style={style}>
        {status === "swapping" && <p aria-busy="true">Swapping...</p>}
        {status !== "swapping" && (
          <TransactionStatus
            txHash={result?.txHash}
            operationType="swap"
            onComplete={() => {
              if (result) onSuccess?.(result);
            }}
            onError={(err) => onError?.(err instanceof Error ? err : new Error(String(err)))}
          />
        )}
        {status === "error" && (
          <button type="button" onClick={handleRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  /* ── Render: review ───────────────────────────────────────────────── */
  if (stage === "review") {
    return (
      <div data-state="idle" className={className} style={style}>
        <h3>Review Swap</h3>
        <p>Sell: {amountIn} {tokenIn}</p>
        <p>Buy: {estimate ? `${estimate.estimatedOutput} ${tokenOut}` : "Calculating..."}</p>

        {estimate && (
          <>
            <ul>
              {estimate.fees.map((fee, idx) => (
                <li key={idx}>
                  {fee.type}: {formatFee(fee.amount, fee.token)}
                </li>
              ))}
            </ul>
            {estimate.priceImpact > 1.5 && (
              <p role="alert" style={{ color: "red" }}>
                Warning: High price impact ({estimate.priceImpact}%)
              </p>
            )}
          </>
        )}

        <button type="button" onClick={() => setStage("input")}>
          Back
        </button>
        <button type="button" onClick={handleConfirm} disabled={status === "estimating" || !estimate}>
          Confirm Swap
        </button>
      </div>
    );
  }

  /* ── Render: input ────────────────────────────────────────────────── */
  return (
    <div data-state="idle" className={className} style={style}>
      <form onSubmit={handleReview}>
        <div>
          <label>Sell</label>
          <input
            type="number"
            step="any"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            onBlur={() => setAmountTouched(true)}
            placeholder="0.00"
          />
          <select value={tokenIn} onChange={(e) => setTokenIn(e.target.value)}>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="ETH">ETH</option>
          </select>
          {amountTouched && !amountValid && <p role="alert">Invalid amount</p>}
        </div>

        <div>
          <label>Buy</label>
          <select value={tokenOut} onChange={(e) => setTokenOut(e.target.value)}>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="ETH">ETH</option>
          </select>
        </div>

        <div>
          {status === "estimating" && <p>Fetching estimate…</p>}
          {status === "idle" && estimate && (
            <p>You will receive ~{estimate.estimatedOutput} {tokenOut}</p>
          )}
          {status === "error" && !isMocked && <p>Unable to estimate swap</p>}
        </div>

        <button type="submit" disabled={!amountValid}>
          Review
        </button>
      </form>
    </div>
  );
}

export default SwapWidget;
