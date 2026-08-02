# Arc UI

> A shadcn-style component registry for [Circle's Arc App Kit](https://developers.circle.com/docs/arc-app-kit-overview) — drop-in React blocks for wallets, balances, payments, swaps, and bridges.

## What is Arc UI?

Arc UI provides a set of **copy-paste React components** for building fintech applications powered by Circle's Arc App Kit. Instead of installing a traditional component library, you add individual blocks directly into your codebase via the [shadcn CLI](https://ui.shadcn.com/docs/cli):

```bash
npx shadcn add https://arcblocks.com/r/balance-card
```

This gives you full ownership of the component source code while following established patterns and best practices.

## Components

| Component | Description |
|---|---|
| `wallet-connect-button` | Connect a user wallet before entering an Arc App Kit flow |
| `transaction-status` | Track and present transaction lifecycle states |
| `balance-card` | Display Unified Balance across supported chains |
| `send-money-form` | Collect recipient, amount, and asset details for payments |
| `swap-widget` | Allow users to swap tokens natively within your app |
| `bridge-widget` | Move tokens cross-chain via CCTP bridge |

## Quick Start

### 1. Install the core SDK

```bash
npm install @arc-ui/core @circle-fin/app-kit
```

### 2. Add a component

```bash
npx shadcn add https://arcblocks.com/r/balance-card
```

### 3. Use it

```tsx
import { BalanceCard } from "@/components/balance-card";

export default function Dashboard() {
  return <BalanceCard kit={kit} sources={["CIRCLE_WALLET"]} />;
}
```

## Packages

| Package | Description |
|---|---|
| [`@arc-ui/core`](./packages/core) | Framework-agnostic stores, types, formatters, and validators |
| [`@arc-ui/react`](./packages/react) | React hooks and pre-built components |
| [`apps/web`](./apps/web) | Documentation website and component showcase |

## Development

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Build everything (including registry)
pnpm build

# Run the full release validation
pnpm release:check
```

## Architecture

Arc UI follows a layered architecture:

1. **`@arc-ui/core`** — Framework-agnostic state management and types
2. **`@arc-ui/react`** — React bindings (hooks + components) consuming the core stores
3. **Registry** — Auto-generated shadcn-compatible component distribution
4. **Website** — Documentation, live previews, and component showcase

The registry is generated at build time from `packages/react/src/components/`. The `registry/default/` directory is **generated output** and should never be edited manually.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

[MIT](./LICENSE)
