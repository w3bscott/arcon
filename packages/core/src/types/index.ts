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
  allocations?: Record<string, unknown>[];
  expirationBlock?: number;
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

export interface WalletAddressSource {
  address: string;
  blockchain: string;
}

export type Sources = string[] | { walletAddresses: WalletAddressSource[] };

export interface AppKit {
  unifiedBalance: {
    getBalances: (params: {
      sources: Sources;
      token?: SupportedTokenInput | undefined;
      includePending?: boolean | undefined;
      networkType?: "mainnet" | "testnet" | undefined;
    }) => Promise<GetBalancesResult>;
  };
  estimateSend: (params: SendParams) => Promise<SendEstimateResult>;
  send: (params: SendParams) => Promise<BridgeStep>;
  estimateSwap: (params: SwapParams) => Promise<SwapEstimate>;
  swap: (params: SwapParams) => Promise<SwapResult>;
  estimateBridge: (params: BridgeParams) => Promise<BridgeEstimate>;
  bridge: (params: BridgeParams) => Promise<BridgeResult>;
}

export type TokenAlias = string;

export interface FeeEntry {
  type: string;
  amount: string;
  token: string;
}

export interface ChainSource {
  chain: string;
}

export interface SendParams {
  from: ChainSource;
  to: string;
  amount: string;
  token?: string;
}

export interface SendEstimateResult {
  fee: string;
}

export interface SwapParams {
  from: ChainSource;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  config?: Record<string, unknown>;
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
  from: ChainSource;
  to: ChainSource;
  amount: string;
  token?: string;
}

export interface BridgeEstimate {
  fees: FeeEntry[];
}
