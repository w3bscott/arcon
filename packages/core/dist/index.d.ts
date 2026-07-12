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

export { type BridgeResult, type BridgeStep, type SpendResult, type TransactionState, formatAddress };
