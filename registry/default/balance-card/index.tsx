"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
} from "react";
import {
  type AppKit,
  type GetBalancesResult,
  type Sources,
  type SupportedTokenInput,
  formatBalance,
  formatChainName,
} from "@arcforge/core";
import { useBalances } from "../../hooks/useBalances";

export interface BalanceCardProps {
  kit?: AppKit; // Optional if data is provided
  sources?: Sources; // Optional if data is provided
  token?: SupportedTokenInput;
  includePending?: boolean;
  networkType?: "mainnet" | "testnet";
  refreshInterval?: number;
  onBalanceFetched?: (result: GetBalancesResult) => void;
  onError?: (error: Error) => void;
  renderChainIcon?: (chain: string) => ReactNode;
  data?: GetBalancesResult;
  className?: string;
  style?: CSSProperties;
}

export function BalanceCard({
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
  style,
}: BalanceCardProps) {
  // We only run the hook if injectedData is not provided.
  // We pass dummy values if kit/sources are missing but injectedData isn't (which shouldn't happen, but satisfies TS)
  const hookResult = useBalances({
    kit: kit as AppKit,
    sources: sources as Sources,
    token,
    includePending,
    networkType,
    refreshInterval: injectedData ? 0 : refreshInterval, // Disable polling if injected
  });

  // Decide source of truth: injected data takes precedence.
  const isMocked = !!injectedData;
  const status = isMocked ? "success" : hookResult.status;
  const data = isMocked ? injectedData : hookResult.data;
  const error = isMocked ? undefined : hookResult.error;

  // Callbacks
  useEffect(() => {
    if (isMocked) return;
    if (status === "success" && data) {
      onBalanceFetched?.(data);
    }
  }, [status, data, onBalanceFetched, isMocked]);

  useEffect(() => {
    if (isMocked) return;
    if (status === "error" && error) {
      onError?.(error);
    }
  }, [status, error, onError, isMocked]);

  /* ── Render: loading ──────────────────────────────────────────────── */
  if (status === "loading" || status === "idle") {
    return (
      <div data-state="loading" className={className} style={style} aria-busy="true">
        <p className="sr-only">Loading balance...</p>
        <span aria-hidden="true">⏳</span>
      </div>
    );
  }

  /* ── Render: error ────────────────────────────────────────────────── */
  if (status === "error") {
    return (
      <div data-state="error" className={className} style={style} role="alert">
        <p>{error?.message || "Failed to load balance."}</p>
        {!isMocked && (
          <button type="button" onClick={hookResult.refetch}>
            Retry
          </button>
        )}
      </div>
    );
  }

  /* ── Render: empty ────────────────────────────────────────────────── */
  const totalConf = parseFloat(data?.totalConfirmedBalance || "0");
  const totalPend = parseFloat(data?.totalPendingBalance || "0");
  const isEmpty = totalConf === 0 && (!includePending || totalPend === 0);

  if (status === "success" && isEmpty) {
    return (
      <div data-state="empty" className={className} style={style}>
        <p>No balance found.</p>
      </div>
    );
  }

  /* ── Render: loaded ───────────────────────────────────────────────── */
  if (status === "success" && data) {
    return (
      <div data-state="loaded" className={className} style={style}>
        <p>
          {formatBalance(data.totalConfirmedBalance)} {data.token}
        </p>

        {includePending && totalPend > 0 && (
          <p>
            Pending: {formatBalance(data.totalPendingBalance)} {data.token}
          </p>
        )}

        <ul>
          {data.breakdown.map((b, idx) => (
            <li key={idx}>
              {renderChainIcon?.(b.chain)}
              {formatChainName(b.chain)}: {formatBalance(b.confirmedBalance)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

export default BalanceCard;
