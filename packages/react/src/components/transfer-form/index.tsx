"use client";

import {
  type CSSProperties,
  type FormEvent,
  useId,
  useMemo,
  useState,
} from "react";
import { ArrowUpRight, X } from "lucide-react";
import { isValidAddress, isValidAmount } from "@arc-ui/core";

export interface TransferRecipient {
  name: string;
  address: string;
  avatarUrl?: string | undefined;
}

export interface TransferFormSubmit {
  recipient: string;
  amount: string;
  token: string;
  networkFee?: string | number | undefined;
}

export interface TransferFormProps {
  recipient: string;
  amount: string;
  onRecipientChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  balance?: string | number | undefined;
  networkFee?: string | number | undefined;
  token?: string | undefined;
  recentRecipients?: TransferRecipient[] | undefined;
  validateRecipient?: ((value: string) => boolean) | undefined;
  validateAmount?: ((value: string) => boolean) | undefined;
  onReview?: ((details: TransferFormSubmit) => void) | undefined;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}

function toNumber(value: string | number | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;
  const parsed =
    typeof value === "number" ? value : Number.parseFloat(value.replace(/,/g, ""));
  return Number.isNaN(parsed) ? undefined : parsed;
}

function formatAmount(value: string | number | undefined): string {
  const parsed = toNumber(value);
  if (parsed === undefined) return "0.00";
  return parsed.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

function defaultValidateRecipient(value: string): boolean {
  if (!value) return false;
  if (value.startsWith("0x")) return /^0x[a-fA-F0-9]{40}$/.test(value);
  return isValidAddress(value) || /^[a-zA-Z0-9_.-]{3,}$/.test(value);
}

export function TransferForm({
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
  style,
}: TransferFormProps) {
  const formId = useId();
  const recipientId = `${formId}-recipient`;
  const recipientErrorId = `${formId}-recipient-error`;
  const amountId = `${formId}-amount`;
  const amountErrorId = `${formId}-amount-error`;
  const [isRecipientFocused, setIsRecipientFocused] = useState(false);
  const [recipientTouched, setRecipientTouched] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  const balanceNumber = toNumber(balance);
  const amountNumber = toNumber(amount);
  const hasRecipient = recipient.length > 0;
  const recipientValid = validateRecipient(recipient);
  const amountFormatValid = validateAmount(amount);
  const amountWithinBalance =
    balanceNumber === undefined ||
    amountNumber === undefined ||
    amountNumber <= balanceNumber;

  const recipientError =
    recipientTouched && hasRecipient && !recipientValid
      ? "Invalid address or username"
      : "";
  const amountError = useMemo(() => {
    if (!amountTouched || !amount) return "";
    if (!amountFormatValid) return "Invalid amount";
    if (!amountWithinBalance) return "Insufficient balance";
    return "";
  }, [amount, amountFormatValid, amountTouched, amountWithinBalance]);

  const isReady =
    hasRecipient &&
    recipientValid &&
    amount.length > 0 &&
    amountNumber !== undefined &&
    amountNumber > 0 &&
    amountWithinBalance &&
    !recipientError &&
    !amountError;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRecipientTouched(true);
    setAmountTouched(true);
    if (!isReady) return;
    onReview?.({ recipient, amount, token, networkFee });
  }

  return (
    <form
      data-state={isReady ? "ready" : "idle"}
      className={`flex min-h-[470px] flex-col gap-6 ${className}`}
      style={style}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[22px] font-extrabold leading-normal text-foreground">
          Send Money
        </h3>
        <span className="flex items-center justify-center rounded-full border border-border p-[10px] text-foreground transition-colors hover:border-foreground">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor={recipientId}
            className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            Recipient
          </label>
          {recipientError ? (
            <span className="text-right text-[12px] font-medium text-destructive">
              {recipientError}
            </span>
          ) : null}
        </div>
        <div
          className={`flex h-[51px] items-center gap-2 rounded-[16px] border bg-muted px-4 transition-colors ${
            recipientError ? "border-destructive" : "border-transparent"
          }`}
        >
          {hasRecipient && !recipientError ? (
            <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full">
              <span className="block h-full w-full bg-gradient-to-br from-[#191bac] via-[#b97ff0] to-[#f17249]" />
            </span>
          ) : null}
          <input
            id={recipientId}
            type="text"
            value={recipient}
            onChange={(event) => onRecipientChange(event.target.value)}
            onFocus={() => setIsRecipientFocused(true)}
            onBlur={() => {
              setIsRecipientFocused(false);
              setRecipientTouched(true);
            }}
            placeholder="Enter public address (0x) or Username"
            aria-invalid={!!recipientError}
            aria-describedby={recipientError ? recipientErrorId : undefined}
            className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-foreground outline-none placeholder:text-muted-foreground"
          />
          {hasRecipient ? (
            <button
              type="button"
              onClick={() => onRecipientChange("")}
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear recipient"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
        {recipientError ? (
          <span id={recipientErrorId} className="sr-only">
            {recipientError}
          </span>
        ) : null}

        {isRecipientFocused && !recipient && recentRecipients.length > 0 ? (
          <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full rounded-[12px] border border-border bg-card p-1 shadow-lg">
            <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Recent
            </p>
            {recentRecipients.map((item) => (
              <button
                key={item.address}
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onRecipientChange(item.address);
                  setRecipientTouched(true);
                  setIsRecipientFocused(false);
                }}
                className="flex w-full items-center gap-3 rounded-[10px] px-2 py-2 text-left transition-colors hover:bg-muted"
              >
                <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                  {item.avatarUrl ? (
                    <img
                      src={item.avatarUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="block h-full w-full bg-gradient-to-br from-[#191bac] via-[#b97ff0] to-[#f17249]" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col items-start">
                  <span className="text-[12px] font-medium text-foreground">
                    {item.name}
                  </span>
                  <span className="text-[12px] font-medium text-muted-foreground">
                    {item.address.slice(0, 6)}...{item.address.slice(-4)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor={amountId}
            className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            Amount
          </label>
          {amountError ? (
            <span className="text-right text-[12px] font-medium text-destructive">
              {amountError}
            </span>
          ) : null}
        </div>
        <div
          className={`flex items-center justify-between rounded-[16px] border bg-muted p-5 transition-colors ${
            amountError ? "border-destructive" : "border-transparent"
          }`}
        >
          <input
            id={amountId}
            type="text"
            inputMode="decimal"
            value={amount}
            placeholder="0.00"
            onChange={(event) => onAmountChange(event.target.value)}
            onBlur={() => setAmountTouched(true)}
            aria-invalid={!!amountError}
            aria-describedby={amountError ? amountErrorId : undefined}
            className="w-[140px] bg-transparent text-[28px] font-bold text-foreground outline-none placeholder:text-muted-foreground"
            style={{ fontVariantNumeric: "tabular-nums" }}
          />
          <span className="text-[14px] font-semibold text-muted-foreground">
            {token}
          </span>
        </div>
        {amountError ? (
          <span id={amountErrorId} className="sr-only">
            {amountError}
          </span>
        ) : null}
        {balanceNumber !== undefined ? (
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-muted-foreground">
              Balance: {formatAmount(balance)}
            </span>
            <button
              type="button"
              onClick={() => onAmountChange(String(balanceNumber))}
              className="text-[14px] font-normal text-foreground underline"
            >
              Max
            </button>
          </div>
        ) : null}
      </div>

      <div className="h-px w-full bg-border" />

      <div className="flex items-center justify-between py-1 text-[14px]">
        <span className="font-medium text-muted-foreground">Network fee</span>
        <span
          className={`font-semibold ${
            isReady ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {formatAmount(networkFee)} {token}
        </span>
      </div>

      <button
        type="submit"
        disabled={!isReady}
        className={`h-14 w-full rounded-full bg-primary text-[16px] font-semibold text-primary-foreground transition-opacity ${
          isReady ? "hover:opacity-90" : "cursor-not-allowed opacity-70"
        }`}
      >
        Review Send
      </button>
    </form>
  );
}

export default TransferForm;
