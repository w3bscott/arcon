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

export interface ChainBalanceBreakdown {
  chain: string;
  confirmedBalance: string;
  pendingBalance?: string;
}

export interface GetBalancesResult {
  totalConfirmedBalance: string;
  totalPendingBalance?: string;
  token: string;
  breakdown: ChainBalanceBreakdown[];
}

export type SupportedTokenInput = string;
export type Sources = any;
export type AppKit = any;

export type TokenAlias = string;

export interface FeeEntry {
  type: string;
  amount: string;
  token: string;
}

export interface SendParams {
  from: any;
  to: string | any;
  amount: string;
  token?: string;
}

export interface SendEstimateResult {
  fee: string;
}

export interface SwapParams {
  from: any;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  config?: any;
}

export interface SwapEstimate {
  estimatedOutput: string;
  fees: FeeEntry[];
  priceImpact: number;
}

export interface SwapResult {
  txHash: string;
  tokenIn: string;
  tokenOut: string;
}

export interface BridgeParams {
  from: any;
  to: any;
  amount: string;
  token?: string;
}

export interface BridgeEstimate {
  fees: FeeEntry[];
}
