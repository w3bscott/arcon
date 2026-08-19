"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import {
  type AppKit,
  type BridgeStep,
  type SendStoreState,
  isValidAddress,
  isValidAmount,
} from "@arc-ui/core";
import { useSend } from "../../hooks/useSend";
import { TransferForm } from "../transfer-form";
import { TransferReview } from "../transfer-review";
import { TransferStatus, type TransferStatusState } from "../transfer-status";

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

function mapSendStatus(
  status: SendStoreState["status"],
  isMocked: boolean,
): TransferStatusState {
  if (status === "error") return "error";
  if (status === "success" || isMocked) return "success";
  return "pending";
}

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
  const completedRef = useRef(false);
  const erroredRef = useRef(false);

  const recipientValid = isValidAddress(recipient);
  const amountValid = isValidAmount(amount);
  const { getEstimate } = hookResult;

  useEffect(() => {
    if (isMocked) return;
    if (!recipientValid || !amountValid) return;

    getEstimate({
      from: { chain },
      to: recipient,
      amount,
      token,
    }).catch(console.error);
  }, [
    recipient,
    amount,
    recipientValid,
    amountValid,
    chain,
    token,
    isMocked,
    getEstimate,
  ]);

  useEffect(() => {
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
      token,
    });
  }

  function handleReset() {
    if (!isMocked) hookResult.reset();
    setStage("input");
  }

  if (stage === "review") {
    return (
      <TransferReview
        recipient={recipient}
        amount={amount}
        network={chain}
        networkFee={estimate?.fee}
        token={token}
        onBack={() => setStage("input")}
        onConfirm={status === "estimating" ? undefined : handleConfirm}
        className={className}
        style={style}
      />
    );
  }

  if (stage === "result") {
    const transferStatus = mapSendStatus(status, isMocked);

    return (
      <TransferStatus
        status={transferStatus}
        amount={amount}
        token={token}
        network={chain}
        txHash={result?.txHash}
        explorerUrl={result?.explorerUrl}
        errorMessage={error?.message}
        onAction={handleReset}
        actionLabel={transferStatus === "error" ? "Try Again" : "Done"}
        className={className}
        style={style}
      />
    );
  }

  return (
    <TransferForm
      recipient={recipient}
      amount={amount}
      onRecipientChange={setRecipient}
      onAmountChange={setAmount}
      networkFee={estimate?.fee}
      token={token}
      validateRecipient={isValidAddress}
      validateAmount={isValidAmount}
      onReview={handleReview}
      className={className}
      style={style}
    />
  );
}

export default SendMoneyForm;
