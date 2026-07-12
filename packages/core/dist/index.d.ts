/**
 * Truncates a blockchain address to a human-readable format.
 * Example: "0x1234567890abcdef1234567890abcdef12345678" → "0x1234…5678"
 *
 * @param address - The full address string
 * @param startChars - Number of characters to show at the start (default: 6)
 * @param endChars - Number of characters to show at the end (default: 4)
 * @returns The truncated address string, or the original if it's too short to truncate
 */
declare function formatAddress(address: string, startChars?: number, endChars?: number): string;
declare function formatBalance(amount?: string): string;
declare function formatChainName(chain?: string): string;
declare function formatFee(fee?: string, token?: string): string;

declare function isValidAddress(address?: string): boolean;
declare function isValidAmount(amount?: string): boolean;

type TransactionState = "idle" | "pending" | "success" | "error" | "noop";
interface BridgeStep {
    name: string;
    state: TransactionState;
    txHash?: string;
    error?: Error;
    errorMessage?: string;
    explorerUrl?: string;
}
interface BridgeResult {
    state: TransactionState;
    steps: BridgeStep[];
}
interface SpendResult {
    destinationChain: string;
    txHash?: string;
    explorerUrl?: string;
    allocations?: any[];
    expirationBlock?: any;
}
interface ChainBalanceBreakdown {
    chain: string;
    confirmedBalance: string;
    pendingBalance?: string;
}
interface GetBalancesResult {
    totalConfirmedBalance: string;
    totalPendingBalance?: string;
    token: string;
    breakdown: ChainBalanceBreakdown[];
}
type SupportedTokenInput = string;
type Sources = any;
type AppKit = any;
type TokenAlias = string;
interface FeeEntry {
    type: string;
    amount: string;
    token: string;
}
interface SendParams {
    from: any;
    to: string | any;
    amount: string;
    token?: string;
}
interface SendEstimateResult {
    fee: string;
}
interface SwapParams {
    from: any;
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
    config?: any;
}
interface SwapEstimate {
    estimatedOutput: string;
    fees: FeeEntry[];
    priceImpact: number;
}
interface SwapResult {
    txHash: string;
    tokenIn: string;
    tokenOut: string;
}
interface BridgeParams {
    from: any;
    to: any;
    amount: string;
    token?: string;
}
interface BridgeEstimate {
    fees: FeeEntry[];
}

interface BalanceStoreState {
    status: "idle" | "loading" | "success" | "error";
    data?: GetBalancesResult | undefined;
    error?: Error | undefined;
}
interface BalanceStoreOptions {
    kit: AppKit;
    sources: Sources;
    token?: SupportedTokenInput | undefined;
    includePending?: boolean | undefined;
    networkType?: "mainnet" | "testnet" | undefined;
}
declare function createBalanceStore(options: BalanceStoreOptions): {
    getState: () => BalanceStoreState;
    subscribe: (listener: () => void) => () => boolean;
    refetch: () => Promise<BalanceStoreState>;
    startPolling: (intervalMs: number) => void;
    stopPolling: () => void;
};

interface SendStoreState {
    status: "idle" | "estimating" | "sending" | "success" | "error";
    estimate?: SendEstimateResult | undefined;
    result?: BridgeStep | undefined;
    error?: Error | undefined;
}
declare function createSendStore(kit: AppKit): {
    getState: () => SendStoreState;
    subscribe: (listener: () => void) => () => boolean;
    getEstimate: (params: SendParams) => Promise<void>;
    send: (params: SendParams) => Promise<void>;
    reset: () => void;
};

interface SwapStoreState {
    status: "idle" | "estimating" | "swapping" | "success" | "error";
    estimate?: SwapEstimate | undefined;
    result?: SwapResult | undefined;
    error?: Error | undefined;
}
declare function createSwapStore(kit: AppKit): {
    getState: () => SwapStoreState;
    subscribe: (listener: () => void) => () => boolean;
    getEstimate: (params: SwapParams) => Promise<void>;
    swap: (params: SwapParams) => Promise<void>;
    reset: () => void;
};

interface BridgeStoreState {
    status: "idle" | "estimating" | "bridging" | "success" | "error";
    estimate?: BridgeEstimate | undefined;
    result?: BridgeResult | undefined;
    error?: Error | undefined;
}
declare function createBridgeStore(kit: AppKit): {
    getState: () => BridgeStoreState;
    subscribe: (listener: () => void) => () => boolean;
    getEstimate: (params: BridgeParams) => Promise<void>;
    bridge: (params: BridgeParams) => Promise<void>;
    reset: () => void;
};

export { type AppKit, type BalanceStoreOptions, type BalanceStoreState, type BridgeEstimate, type BridgeParams, type BridgeResult, type BridgeStep, type BridgeStoreState, type ChainBalanceBreakdown, type FeeEntry, type GetBalancesResult, type SendEstimateResult, type SendParams, type SendStoreState, type Sources, type SpendResult, type SupportedTokenInput, type SwapEstimate, type SwapParams, type SwapResult, type SwapStoreState, type TokenAlias, type TransactionState, createBalanceStore, createBridgeStore, createSendStore, createSwapStore, formatAddress, formatBalance, formatChainName, formatFee, isValidAddress, isValidAmount };
