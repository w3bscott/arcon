"use client";

import type { CSSProperties } from "react";
import { CheckCircle2, ExternalLink, Loader2, XCircle } from "lucide-react";
import { formatAddress } from "@arcforge/core";

export type TransferStatusState = "pending" | "success" | "error";

export interface TransferStatusProps {
  status: TransferStatusState;
  amount?: string | undefined;
  token?: string | undefined;
  network?: string | undefined;
  txHash?: string | undefined;
  explorerUrl?: string | undefined;
  errorMessage?: string | undefined;
  onAction?: (() => void) | undefined;
  actionLabel?: string | undefined;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}

export function TransferStatus({
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
  style,
}: TransferStatusProps) {
  if (status === "pending") {
    return (
      <div
        data-state="pending"
        className={`flex min-h-[180px] flex-col items-center justify-center gap-4 ${className}`}
        style={style}
        aria-live="polite"
        aria-busy="true"
      >
        <Loader2
          className="h-10 w-10 animate-spin text-emerald-500"
          aria-hidden="true"
        />
        <div className="space-y-1 text-center">
          <h3 className="text-[15px] font-semibold text-foreground">
            Processing Transaction
          </h3>
          <p className="text-[13px] text-muted-foreground">
            Confirming on {network}...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        data-state="error"
        className={`flex flex-col items-center gap-5 ${className}`}
        style={style}
        role="alert"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-7 w-7 text-destructive" aria-hidden="true" />
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            Transfer Failed
          </h3>
          <p className="text-[13px] text-muted-foreground">{errorMessage}</p>
        </div>
        <div className="h-px w-full bg-border" />
        {onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="w-full rounded-xl bg-primary py-2.5 text-[13.5px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {actionLabel ?? "Try Again"}
          </button>
        ) : null}
      </div>
    );
  }

  const txLabel = txHash ? formatAddress(txHash) : undefined;

  return (
    <div
      data-state="success"
      className={`flex flex-col items-center gap-5 ${className}`}
      style={style}
      aria-live="polite"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/15">
        <CheckCircle2
          className="h-7 w-7 text-emerald-700 dark:text-emerald-400"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold text-foreground">Completed</h3>
        <p className="text-[13px] text-muted-foreground">
          You just sent {amount} {token}
        </p>
      </div>

      {txHash ? (
        explorerUrl ? (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center gap-2 rounded-full bg-muted px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="font-mono">{txLabel}</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : (
          <span className="flex h-8 items-center rounded-full bg-muted px-4 text-[13px] font-medium text-muted-foreground">
            <span className="font-mono">{txLabel}</span>
          </span>
        )
      ) : null}

      <div className="h-px w-full bg-border" />

      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="w-full rounded-xl bg-primary py-2.5 text-[13.5px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {actionLabel ?? "Done"}
        </button>
      ) : null}
    </div>
  );
}

export default TransferStatus;
