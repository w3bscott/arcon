export interface RegistryItem {
  name: string;
  type: "registry:block";
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies?: string[];
  files: {
    path: string;
    type: "registry:component" | "registry:hook";
    target?: string;
  }[];
}

function componentFile(name: string) {
  return {
    path: `registry/default/${name}/index.tsx`,
    type: "registry:component" as const,
    target: `@components/arcforge/${name}/index.tsx`,
  };
}

function includedComponentFile(owner: string, name: string) {
  return {
    path: `registry/default/${owner}/${name}/index.tsx`,
    type: "registry:component" as const,
    target: `@components/arcforge/${name}/index.tsx`,
  };
}

function hookFile(owner: string, name: string) {
  return {
    path: `registry/default/${owner}/hooks/${name}.ts`,
    type: "registry:hook" as const,
    target: `@components/arcforge/hooks/${name}.ts`,
  };
}

export const registry: Record<string, RegistryItem> = {
  "wallet-connect-button": {
    name: "wallet-connect-button",
    type: "registry:block",
    title: "WalletConnectButton",
    description: "Connect a user wallet before entering an Arc App Kit flow.",
    dependencies: ["@arcforge/core", "@circle-fin/app-kit"],
    files: [componentFile("wallet-connect-button")],
  },
  "transaction-status": {
    name: "transaction-status",
    type: "registry:block",
    title: "TransactionStatus",
    description: "Track and present transaction lifecycle states.",
    dependencies: ["@arcforge/core"],
    files: [componentFile("transaction-status")],
  },
  "balance-card": {
    name: "balance-card",
    type: "registry:block",
    title: "BalanceCard",
    description: "Display Unified Balance across supported chains.",
    dependencies: ["@arcforge/core"],
    files: [componentFile("balance-card"), hookFile("balance-card", "useBalances")],
  },
  "send-money-form": {
    name: "send-money-form",
    type: "registry:block",
    title: "SendMoneyForm",
    description: "Collect recipient, amount, and asset details for payments.",
    dependencies: ["@arcforge/core", "lucide-react"],
    files: [
      componentFile("send-money-form"),
      hookFile("send-money-form", "useSend"),
      includedComponentFile("send-money-form", "transfer-form"),
      includedComponentFile("send-money-form", "transfer-review"),
      includedComponentFile("send-money-form", "transfer-status"),
    ],
  },
  "swap-widget": {
    name: "swap-widget",
    type: "registry:block",
    title: "SwapWidget",
    description: "Allow users to swap tokens natively within your app.",
    dependencies: ["@arcforge/core"],
    files: [
      componentFile("swap-widget"),
      hookFile("swap-widget", "useSwap"),
      includedComponentFile("swap-widget", "transaction-status"),
    ],
  },
  "bridge-widget": {
    name: "bridge-widget",
    type: "registry:block",
    title: "BridgeWidget",
    description: "Move tokens cross-chain via CCTP bridge.",
    dependencies: ["@arcforge/core"],
    files: [
      componentFile("bridge-widget"),
      hookFile("bridge-widget", "useBridge"),
      includedComponentFile("bridge-widget", "transaction-status"),
    ],
  },
  "transfer-form": {
    name: "transfer-form",
    type: "registry:block",
    title: "TransferForm",
    description: "Collect recipient and amount for a token transfer.",
    dependencies: ["@arcforge/core", "lucide-react"],
    files: [componentFile("transfer-form")],
  },
  "transfer-review": {
    name: "transfer-review",
    type: "registry:block",
    title: "TransferReview",
    description: "Review transfer details before execution.",
    dependencies: ["@arcforge/core"],
    files: [componentFile("transfer-review")],
  },
  "transfer-status": {
    name: "transfer-status",
    type: "registry:block",
    title: "TransferStatus",
    description: "Display pending, success, and error states for a transfer.",
    dependencies: ["@arcforge/core", "lucide-react"],
    files: [componentFile("transfer-status")],
  },
};
