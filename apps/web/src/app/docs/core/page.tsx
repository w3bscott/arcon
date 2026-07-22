import type { Metadata } from "next";
import { CodeBlock } from "@/components/blockspage/CodeBlock";

export const metadata: Metadata = {
  title: "Core Library — Arc UI",
  description: "Learn about the @arc-ui/core package.",
};

const storeCode = `import { createBalanceStore } from "@arc-ui/core"

// 1. Create a store instance
const balanceStore = createBalanceStore({
  kit: yourAppKitInstance,
  sources: ["CIRCLE_WALLET"],
  token: "USDC",
})

// 2. Subscribe to changes
const unsubscribe = balanceStore.subscribe(() => {
  const state = balanceStore.getState()
  console.log("Current status:", state.status)
  
  if (state.status === "success") {
    console.log("Balance:", state.data.totalConfirmedBalance)
  }
})

// 3. Trigger actions
await balanceStore.refetch()

// 4. Cleanup when done
unsubscribe()`;

export default function CorePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-[#09090b]">Core Library</h1>
      <p className="text-lg text-[#71717a]">
        The engine powering Arc UI: headless state management, types, and utilities.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#09090b]">Overview</h2>
        <p className="text-[#71717a] leading-7">
          While the React components are copied into your project, they all rely on the <code>@arc-ui/core</code> npm package. This package is <strong>framework-agnostic</strong> and handles the complex business logic of interacting with the Arc App Kit SDK.
        </p>
        <CodeBlock code="npm install @arc-ui/core" language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#09090b]">Reactive Stores</h2>
        <p className="text-[#71717a] leading-7">
          The core package provides several vanilla JavaScript stores for managing asynchronous state. You can use these stores directly if you are building your own components from scratch or working outside of React.
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-[#71717a] mb-6">
          <li><code>createBalanceStore</code> - Fetches and polls wallet balances across chains.</li>
          <li><code>createSendStore</code> - Manages the state machine for sending transactions.</li>
          <li><code>createSwapStore</code> - Manages token swap estimations and execution.</li>
          <li><code>createBridgeStore</code> - Handles cross-chain token bridging flows.</li>
        </ul>

        <h3 className="text-xl font-medium tracking-tight text-[#09090b] mt-4">Using a Store Directly</h3>
        <CodeBlock code={storeCode} language="typescript" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#09090b]">Formatters & Utilities</h2>
        <p className="text-[#71717a] leading-7">
          The core package also exports handy utilities for displaying Web3 data consistently.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#71717a]">
          <li><code>formatBalance(amount, decimals?)</code> - Safely formats string numbers.</li>
          <li><code>formatAddress(address)</code> - Truncates addresses (e.g. 0x1234...5678).</li>
          <li><code>formatChainName(chain)</code> - Normalizes chain identifiers into readable names.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#09090b]">Types</h2>
        <p className="text-[#71717a] leading-7">
          All data shapes used by Arc UI are rigorously typed and exported from the core package, including <code>GetBalancesResult</code>, <code>SendEstimate</code>, <code>SupportedChain</code>, and more.
        </p>
      </div>
    </div>
  );
}
