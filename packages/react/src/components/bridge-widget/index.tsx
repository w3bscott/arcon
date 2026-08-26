"use client";

import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  type AppKit,
  type BridgeResult,
  type BridgeStoreState,
  formatFee,
  isValidAmount,
} from "@arcforge/core";
import { useBridge } from "../../hooks/useBridge";
import { TransactionStatus } from "../transaction-status";

export interface BridgeWidgetProps {
  kit?: AppKit;
  defaultChainFrom?: string;
  defaultChainTo?: string;
  defaultToken?: string;
  defaultAmount?: string;
  onSuccess?: (result: BridgeResult) => void;
  onError?: (error: Error) => void;
  data?: BridgeStoreState;
  className?: string;
  style?: CSSProperties;
}

type Stage = "input" | "review" | "result";

export function BridgeWidget({
  kit,
  defaultChainFrom = "Ethereum",
  defaultChainTo = "Arc_Testnet",
  defaultToken = "USDC",
  defaultAmount = "",
  onSuccess,
  onError,
  data: injectedData,
  className,
  style,
}: BridgeWidgetProps) {
  const hookResult = useBridge(kit as AppKit);
  const isMocked = !!injectedData;

  const status = isMocked ? injectedData.status : hookResult.status;
  const estimate = isMocked ? injectedData.estimate : hookResult.estimate;
  const result = isMocked ? injectedData.result : hookResult.result;
  const error = isMocked ? injectedData.error : hookResult.error;

  const [stage, setStage] = useState<Stage>("input");
  const [chainFrom, setChainFrom] = useState(defaultChainFrom);
  const [chainTo, setChainTo] = useState(defaultChainTo);
  const [token, setToken] = useState(defaultToken);
  const [amount, setAmount] = useState(defaultAmount);

  const [amountTouched, setAmountTouched] = useState(false);
  const amountValid = isValidAmount(amount);
  const { getEstimate } = hookResult;

  // Re-estimate on input change
  useEffect(() => {
    if (isMocked) return;
    if (amountValid && chainFrom && chainTo && token) {
      getEstimate({
        from: { chain: chainFrom },
        to: { chain: chainTo },
        amount,
        token,
      }).catch(console.error);
    }
  }, [amount, chainFrom, chainTo, token, amountValid, isMocked, getEstimate]);

  const handleReview = (e: FormEvent) => {
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
      token,
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
        {status === "bridging" && <p aria-busy="true">Bridging...</p>}
        {status !== "bridging" && (
          <TransactionStatus
            bridgeResult={result || (error ? { state: "error", steps: [{ name: "Bridge", state: "error", error }] } : undefined)}
            operationType="bridge"
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
        <h3>Review Bridge Transfer</h3>
        <p>From: {chainFrom}</p>
        <p>To: {chainTo}</p>
        <p>Amount: {amount} {token}</p>

        {estimate && (
          <ul>
            {estimate.fees.map((fee, idx) => (
              <li key={idx}>
                {fee.type}: {formatFee(fee.amount, fee.token)}
              </li>
            ))}
          </ul>
        )}

        <button type="button" onClick={() => setStage("input")}>
          Back
        </button>
        <button type="button" onClick={handleConfirm} disabled={status === "estimating" || !estimate}>
          Confirm Bridge
        </button>
      </div>
    );
  }

  /* ── Render: input ────────────────────────────────────────────────── */
  return (
    <div data-state="idle" className={className} style={style}>
      <form onSubmit={handleReview}>
        <div>
          <label>From Chain</label>
          <select value={chainFrom} onChange={(e) => setChainFrom(e.target.value)}>
            <option value="Ethereum">Ethereum</option>
            <option value="Optimism">Optimism</option>
            <option value="Arbitrum">Arbitrum</option>
          </select>
        </div>

        <div>
          <label>To Chain</label>
          <select value={chainTo} onChange={(e) => setChainTo(e.target.value)}>
            <option value="Arc_Testnet">Arc Testnet</option>
            <option value="Base">Base</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>

        <div>
          <label>Amount</label>
          <input
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => setAmountTouched(true)}
            placeholder="0.00"
          />
          <select value={token} onChange={(e) => setToken(e.target.value)}>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="ETH">ETH</option>
          </select>
          {amountTouched && !amountValid && <p role="alert">Invalid amount</p>}
        </div>

        <div>
          {status === "estimating" && <p>Fetching estimate…</p>}
          {status === "error" && !isMocked && <p>Unable to estimate bridge</p>}
        </div>

        <button type="submit" disabled={!amountValid}>
          Review
        </button>
      </form>
    </div>
  );
}

export default BridgeWidget;
