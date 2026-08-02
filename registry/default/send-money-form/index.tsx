"use client";

import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  type AppKit,
  type BridgeStep,
  type SendStoreState,
  formatAddress,
  formatFee,
  isValidAddress,
  isValidAmount,
} from "@arc-ui/core";
import { useSend } from "../../hooks/useSend";
import { TransactionStatus } from "../transaction-status";

export interface SendMoneyFormProps {
  kit?: AppKit;
  chain?: string;
  token?: string;
  defaultRecipient?: string;
  defaultAmount?: string;
  onSuccess?: (result: BridgeStep) => void;
  onError?: (error: Error) => void;
  data?: SendStoreState;
  className?: string;
  style?: CSSProperties;
}

type Stage = "input" | "review" | "result";

export function SendMoneyForm({
  kit,
  chain = "Ethereum",
  token = "USDC",
  defaultRecipient = "",
  defaultAmount = "",
  onSuccess,
  onError,
  data: injectedData,
  className,
  style,
}: SendMoneyFormProps) {
  const hookResult = useSend(kit as AppKit);
  const isMocked = !!injectedData;

  const status = isMocked ? injectedData.status : hookResult.status;
  const estimate = isMocked ? injectedData.estimate : hookResult.estimate;
  const result = isMocked ? injectedData.result : hookResult.result;
  const error = isMocked ? injectedData.error : hookResult.error;

  const [stage, setStage] = useState<Stage>("input");
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [amount, setAmount] = useState(defaultAmount);

  const [recipientTouched, setRecipientTouched] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  const recipientValid = isValidAddress(recipient);
  const amountValid = isValidAmount(amount);

  const { getEstimate } = hookResult;

  // Estimate whenever valid input changes
  useEffect(() => {
    if (isMocked) return;
    if (recipientValid && amountValid) {
      getEstimate({
        from: { chain },
        to: recipient,
        amount,
        token,
      }).catch(console.error);
    }
  }, [recipient, amount, recipientValid, amountValid, chain, token, isMocked, getEstimate]);

  // If status goes to success or error, advance to result automatically (or stay on result)


  const handleReview = (e: FormEvent) => {
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
      token,
    });
  };

  const handleRetry = () => {
    if (!isMocked) hookResult.reset();
    setStage("input");
  };

  /* ── Render: result ───────────────────────────────────────────────── */
  if (stage === "result") {
    // We defer to TransactionStatus for rendering
    return (
      <div data-state={status} className={className} style={style}>
        {status === "sending" && <p aria-busy="true">Sending...</p>}
        {status !== "sending" && (
          <TransactionStatus
            sendResult={result || (error ? { name: "Send", state: "error", error } : undefined)}
            operationType="send"
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
        <h3>Review Summary</h3>
        <p>Recipient: {formatAddress(recipient)}</p>
        <p>Amount: {amount} {token}</p>
        <p>Network fee: {estimate ? formatFee(estimate.fee, token) : "Calculating..."}</p>

        <button type="button" onClick={() => setStage("input")}>
          Back
        </button>
        <button type="button" onClick={handleConfirm} disabled={status === "estimating"}>
          Confirm Send
        </button>
      </div>
    );
  }

  /* ── Render: input ────────────────────────────────────────────────── */
  return (
    <div data-state="idle" className={className} style={style}>
      <form onSubmit={handleReview}>
        <div>
          <label>Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            onBlur={() => setRecipientTouched(true)}
            placeholder="0x..."
          />
          {recipientTouched && !recipientValid && <p role="alert">Invalid address</p>}
        </div>

        <div>
          <label>Amount ({token})</label>
          <input
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => setAmountTouched(true)}
            placeholder="0.00"
          />
          {amountTouched && !amountValid && <p role="alert">Invalid amount</p>}
        </div>

        <div>
          {status === "estimating" && <p>Fetching fee…</p>}
          {status === "idle" && estimate && (
            <p>Network fee: {formatFee(estimate.fee, token)}</p>
          )}
          {status === "error" && !isMocked && <p>Unable to estimate fee</p>}
        </div>

        <button type="submit" disabled={!recipientValid || !amountValid}>
          Review
        </button>
      </form>
    </div>
  );
}

export default SendMoneyForm;
