export const blockCategories = [
  "Wallet",
  "Balances",
  "Payments",
  "Bridge",
  "Swap",
  "Transactions",
  "Unified Balance",
  "Flows",
] as const;

export type BlockCategory = (typeof blockCategories)[number];

export type BlockStatus = "Stable" | "Preview" | "Planned";

export interface BlockMetadata {
  name: string;
  slug: string;
  description: string;
  category: BlockCategory;
  status: BlockStatus;
  sdkMethods: string[];
}

export const blocks: BlockMetadata[] = [
  {
    name: "WalletConnectButton",
    slug: "wallet-connect-button",
    description: "Connect a user wallet before entering an Arc App Kit flow.",
    category: "Wallet",
    status: "Stable",
    sdkMethods: ["kit.wallet.connect()"],
  },
  {
    name: "BalanceCard",
    slug: "balance-card",
    description: "Display Unified Balance across supported chains.",
    category: "Unified Balance",
    status: "Stable",
    sdkMethods: ["kit.unifiedBalance.getBalances()"],
  },
  {
    name: "TransactionStatus",
    slug: "transaction-status",
    description: "Track and present transaction lifecycle states.",
    category: "Transactions",
    status: "Stable",
    sdkMethods: ["kit.transactions.getStatus()"],
  },
  {
    name: "SendMoneyForm",
    slug: "send-money-form",
    description: "Collect recipient, amount, and asset details for payments.",
    category: "Payments",
    status: "Stable",
    sdkMethods: ["kit.payments.send()"],
  },
  {
    name: "SwapWidget",
    slug: "swap-widget",
    description: "Preview token swap inputs, quotes, and confirmation states.",
    category: "Swap",
    status: "Stable",
    sdkMethods: ["kit.swap.quote()", "kit.swap.execute()"],
  },
  {
    name: "BridgeWidget",
    slug: "bridge-widget",
    description: "Prepare cross-chain transfer routes for supported assets.",
    category: "Bridge",
    status: "Stable",
    sdkMethods: ["kit.bridge.quote()", "kit.bridge.execute()"],
  },
];

export function getBlockBySlug(slug: string) {
  return blocks.find((block) => block.slug === slug);
}
