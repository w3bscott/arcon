import type {
  GetBalancesResult,
  SendStoreState,
  SwapStoreState,
  BridgeStoreState,
  BridgeResult,
} from "@arc-ui/react";

// BalanceCard Mock Data
// Matches GetBalancesResult: { totalConfirmedBalance, token, breakdown, totalPendingBalance? }
export const mockBalanceData: GetBalancesResult = {
  totalConfirmedBalance: "1,825.50",
  totalPendingBalance: "100.00",
  token: "USDC",
  breakdown: [
    { chain: "Ethereum", confirmedBalance: "1,250.00", pendingBalance: "100.00" },
    { chain: "Arbitrum", confirmedBalance: "500.50" },
    { chain: "Optimism", confirmedBalance: "75.00" },
  ],
};

// SendMoneyForm Mock Data
// Matches SendStoreState: { status, estimate?: SendEstimateResult, result?, error? }
export const mockSendFormData: SendStoreState = {
  status: "idle",
  estimate: {
    fee: "0.50",
  },
};

// SwapWidget Mock Data
// Matches SwapStoreState: { status, estimate?: SwapEstimate, result?, error? }
// SwapEstimate: { estimatedOutput: string, fees: FeeEntry[], priceImpact: number }
export const mockSwapWidgetData: SwapStoreState = {
  status: "idle",
  estimate: {
    estimatedOutput: "997.50",
    fees: [
      { type: "network", amount: "1.25", token: "USDC" },
      { type: "protocol", amount: "1.25", token: "USDC" },
    ],
    priceImpact: 0.1,
  },
};

// BridgeWidget Mock Data
// Matches BridgeStoreState: { status, estimate?: BridgeEstimate, result?, error? }
// BridgeEstimate: { fees: FeeEntry[] }
export const mockBridgeWidgetData: BridgeStoreState = {
  status: "idle",
  estimate: {
    fees: [
      { type: "bridge", amount: "1.00", token: "USDC" },
    ],
  },
};

// TransactionStatus Mock Data
// Represents a successful bridge transaction with multiple steps
export const mockBridgeSuccessResult: BridgeResult = {
  state: "success",
  steps: [
    {
      name: "Approval",
      state: "success",
      txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      explorerUrl: "https://etherscan.io/tx/0x1234",
    },
    {
      name: "Transfer",
      state: "success",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      explorerUrl: "https://etherscan.io/tx/0xabcd",
    },
  ],
};
