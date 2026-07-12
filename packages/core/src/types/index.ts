export type TransactionState = "idle" | "pending" | "success" | "error" | "noop";

export interface BridgeStep {
  name: string;
  state: TransactionState;
  txHash?: string;
  error?: Error;
  errorMessage?: string;
  explorerUrl?: string;
}

export interface BridgeResult {
  state: TransactionState;
  steps: BridgeStep[];
}

export interface SpendResult {
  destinationChain: string;
  txHash?: string;
  explorerUrl?: string;
  allocations?: any[];
  expirationBlock?: any;
}
