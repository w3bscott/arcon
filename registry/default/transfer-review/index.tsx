"use client";

import type { CSSProperties } from "react";
import { formatAddress } from "@arc-ui/core";

export interface TransferReviewProps {
  recipient: string;
  amount: string;
  networkFee?: string | number | undefined;
  network?: string | undefined;
  token?: string | undefined;
  onConfirm?: (() => void) | undefined;
  onBack?: (() => void) | undefined;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}

function toNumber(value: string | number | undefined): number {
  if (value === undefined || value === "") return 0;
  const parsed =
    typeof value === "number" ? value : Number.parseFloat(value.replace(/,/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatAmount(value: string | number | undefined): string {
  return toNumber(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export function TransferReview({
  recipient,
  amount,
  network = "Ethereum",
  networkFee = 0,
  token = "USDC",
  onConfirm,
  onBack,
  className = "",
  style,
}: TransferReviewProps) {
  const total = toNumber(amount) + toNumber(networkFee);

  return (
    <div
      data-state="review"
      className={`flex flex-col items-center gap-5 ${className}`}
      style={style}
    >
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold text-foreground">
          Review Transfer
        </h3>
        <p className="text-[13px] text-muted-foreground">
          Please confirm the details below
        </p>
      </div>

      <dl className="w-full space-y-0">
        {[
          { label: "Send", value: `${formatAmount(amount)} ${token}` },
          { label: "To", value: formatAddress(recipient), mono: true },
          { label: "Network", value: network },
        ].map((row, index) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-4 py-3 ${
              index > 0 ? "border-t border-border" : ""
            }`}
          >
            <dt className="text-[13.5px] font-medium text-muted-foreground">
              {row.label}
            </dt>
            <dd
              className={`truncate text-right text-[13.5px] font-medium text-foreground ${
                row.mono ? "font-mono" : ""
              }`}
              title={row.value}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="h-px w-full bg-border" />

      <dl className="w-full space-y-2">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[12.5px] text-muted-foreground">Network Fee</dt>
          <dd className="text-[12.5px] font-medium text-foreground">
            {formatAmount(networkFee)} {token}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[13.5px] font-bold text-foreground">Total</dt>
          <dd className="text-[14px] font-bold text-foreground">
            {formatAmount(total)} {token}
          </dd>
        </div>
      </dl>

      <div className="flex w-full gap-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="h-11 flex-1 rounded-xl border border-border bg-card text-[14px] font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Back
          </button>
        ) : null}
        <button
          type="button"
          onClick={onConfirm}
          className="h-11 flex-1 rounded-xl bg-primary text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Confirm Send
        </button>
      </div>
    </div>
  );
}

export default TransferReview;
