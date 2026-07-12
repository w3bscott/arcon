export interface RegistryItem {
  name: string;
  type: "registry:block";
  title: string;
  description: string;
  dependencies: string[];
  files: {
    path: string;
    type: "registry:component";
  }[];
}

export const registry: Record<string, RegistryItem> = {
  "wallet-connect-button": {
    name: "wallet-connect-button",
    type: "registry:block",
    title: "WalletConnectButton",
    description: "Connect a user wallet before entering an Arc App Kit flow.",
    dependencies: ["@arc-ui/core", "@circle-fin/app-kit"],
    files: [
      {
        path: "registry/default/wallet-connect-button/index.tsx",
        type: "registry:component",
      },
    ],
  },
  "transaction-status": {
    name: "transaction-status",
    type: "registry:block",
    title: "TransactionStatus",
    description: "Track and present transaction lifecycle states.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/transaction-status/index.tsx",
        type: "registry:component",
      },
    ],
  },
  "balance-card": {
    name: "balance-card",
    type: "registry:block",
    title: "BalanceCard",
    description: "Display Unified Balance across supported chains.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/balance-card/index.tsx",
        type: "registry:component",
      },
    ],
  },
  "send-money-form": {
    name: "send-money-form",
    type: "registry:block",
    title: "SendMoneyForm",
    description: "Collect recipient, amount, and asset details for payments.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/send-money-form/index.tsx",
        type: "registry:component",
      },
    ],
  },
  "swap-widget": {
    name: "swap-widget",
    type: "registry:block",
    title: "SwapWidget",
    description: "Allow users to swap tokens natively within your app.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/swap-widget/index.tsx",
        type: "registry:component",
      },
    ],
  },
  "bridge-widget": {
    name: "bridge-widget",
    type: "registry:block",
    title: "BridgeWidget",
    description: "Move tokens cross-chain via CCTP bridge.",
    dependencies: ["@arc-ui/core"],
    files: [
      {
        path: "registry/default/bridge-widget/index.tsx",
        type: "registry:component",
      },
    ],
  },
};
