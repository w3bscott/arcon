export const blockCategories = [
  "Wallet",
  // "Balances",
  "Payments",
  "Bridge",
  "Swap",
  "Transactions",
  "Unified Balance",
  // "Flows",
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
  installCommand: string;
  importStatement: string;
  codeExample: string;
}

export const blocks: BlockMetadata[] = [
  {
    name: "WalletConnectButton",
    slug: "wallet-connect-button",
    description: "Connect a user wallet.",
    category: "Wallet",
    status: "Stable",
    sdkMethods: ["kit.wallet.connect()"],
    installCommand: "npx arcforge add wallet-connect-button",
    importStatement: 'import { WalletConnectButton } from "@/components/arcforge/wallet-connect-button"',
    codeExample: '<WalletConnectButton onConnect={handleConnect} connectLabel="Connect Wallet" />',
  },
  {
    name: "BalanceCard",
    slug: "balance-card",
    description: "Display Unified Balance across supported chains.",
    category: "Unified Balance",
    status: "Stable",
    sdkMethods: ["kit.unifiedBalance.getBalances()"],
    installCommand: "npx arcforge add balance-card",
    importStatement: 'import { BalanceCard } from "@/components/arcforge/balance-card"',
    codeExample: `<BalanceCard\n  kit={kit}\n  sources={{ walletAddresses: [{ address, blockchain: "Arc_Testnet" }] }}\n  includePending\n/>`,
  },
  {
    name: "TransactionStatus",
    slug: "transaction-status",
    description: "Track and present transaction lifecycle states.",
    category: "Transactions",
    status: "Stable",
    sdkMethods: ["kit.transactions.getStatus()"],
    installCommand: "npx arcforge add transaction-status",
    importStatement: 'import { TransactionStatus } from "@/components/arcforge/transaction-status"',
    codeExample: `<TransactionStatus\n  sendResult={result}\n  operationType="send"\n  onComplete={() => console.log("done")}\n/>`,
  },
  {
    name: "SendMoneyForm",
    slug: "send-money-form",
    description: "Collect recipient, amount, and asset details for payments.",
    category: "Payments",
    status: "Stable",
    sdkMethods: ["kit.payments.send()"],
    installCommand: "npx arcforge add send-money-form",
    importStatement: 'import { SendMoneyForm } from "@/components/arcforge/send-money-form"',
    codeExample: `<SendMoneyForm\n  kit={kit}\n  chain="Arc_Testnet"\n  onSuccess={(result) => console.log(result)}\n/>`,
  },
  {
    name: "SwapWidget",
    slug: "swap-widget",
    description: "Preview token swap inputs and quotes.",
    category: "Swap",
    status: "Stable",
    sdkMethods: ["kit.swap.quote()", "kit.swap.execute()"],
    installCommand: "npx arcforge add swap-widget",
    importStatement: 'import { SwapWidget } from "@/components/arcforge/swap-widget"',
    codeExample: `<SwapWidget\n  kit={kit}\n  chain="Arc_Testnet"\n  defaultTokenIn="USDC"\n  defaultTokenOut="EURC"\n/>`,
  },
  {
    name: "BridgeWidget",
    slug: "bridge-widget",
    description: "Prepare cross-chain transfer routes for supported assets.",
    category: "Bridge",
    status: "Stable",
    sdkMethods: ["kit.bridge.quote()", "kit.bridge.execute()"],
    installCommand: "npx arcforge add bridge-widget",
    importStatement: 'import { BridgeWidget } from "@/components/arcforge/bridge-widget"',
    codeExample: `<BridgeWidget\n  kit={kit}\n  defaultFromChain="Arc_Testnet"\n  defaultToChain="Ethereum"\n  onSuccess={(result) => console.log(result)}\n/>`,
  },
  {
    name: "TransferForm",
    slug: "transfer-form",
    description: "Collect recipient and amount for a token transfer.",
    category: "Payments",
    status: "Preview",
    sdkMethods: [],
    installCommand: "npx arcforge add transfer-form",
    importStatement: 'import { TransferForm } from "@/components/arcforge/transfer-form"',
    codeExample: `<TransferForm
  recipient={recipient}
  amount={amount}
  onRecipientChange={setRecipient}
  onAmountChange={setAmount}
  balance="10000"
  networkFee="0.50"
  onReview={(details) => console.log(details)}
/>`,
  },
  {
    name: "TransferReview",
    slug: "transfer-review",
    description: "Review transfer details before execution.",
    category: "Payments",
    status: "Preview",
    sdkMethods: [],
    installCommand: "npx arcforge add transfer-review",
    importStatement: 'import { TransferReview } from "@/components/arcforge/transfer-review"',
    codeExample: `<TransferReview
  recipient={recipient}
  amount="250.00"
  network="Arc Testnet"
  networkFee="0.50"
  onConfirm={confirmTransfer}
  onBack={() => setStep("input")}
/>`,
  },
  {
    name: "TransferStatus",
    slug: "transfer-status",
    description: "Display pending or success states for a transfer.",
    category: "Transactions",
    status: "Preview",
    sdkMethods: [],
    installCommand: "npx arcforge add transfer-status",
    importStatement: 'import { TransferStatus } from "@/components/arcforge/transfer-status"',
    codeExample: `<TransferStatus
  status="success"
  amount="250.00"
  txHash={txHash}
  explorerUrl={explorerUrl}
  onAction={resetFlow}
/>`,
  },
];

export function getBlockBySlug(slug: string) {
  return blocks.find((block) => block.slug === slug);
}
