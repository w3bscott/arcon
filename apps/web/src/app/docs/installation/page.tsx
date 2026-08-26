import type { Metadata } from "next";
import { CodeBlock } from "@/components/blockspage/CodeBlock";

export const metadata: Metadata = {
  title: "Installation — ArcForge",
  description: "How to install and set up ArcForge in your project.",
};

const setupCode = `import { AppKit } from "@circle-fin/app-kit"
import { createViemAdapter } from "@circle-fin/adapter-viem-v2"

const adapter = createViemAdapter({ walletClient })
const kit = new AppKit({
  adapter,
  apiKey: process.env.NEXT_PUBLIC_ARC_API_KEY
})`;

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Installation</h1>
      <p className="text-lg text-muted-foreground">
        How to install dependencies and structure your app.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">1. Install the Core Package</h2>
        <p className="text-muted-foreground leading-7">
          First, install the Arc App Kit SDK and the ArcForge core package. The core package contains the headless state management that the React components rely on.
        </p>
        <CodeBlock code="npm install @arcforge/core @circle-fin/app-kit" language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">2. Setup the App Kit</h2>
        <p className="text-muted-foreground leading-7">
          Initialize the Arc App Kit instance in your application. You'll need to pass this instance to the ArcForge components.
        </p>
        <CodeBlock code={setupCode} language="typescript" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">3. Add Components</h2>
        <p className="text-muted-foreground leading-7">
          Use the shadcn CLI to add specific components directly into your codebase. For example, to add the Balance Card:
        </p>
        <CodeBlock code="npx shadcn add https://TODO:VERCEL_URL/r/balance-card" language="bash" />
        <p className="text-muted-foreground leading-7">
          This will create a new file in your components directory (e.g., <code>components/balance-card.tsx</code>) containing the full source code for the component.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">4. Use the Components</h2>
        <p className="text-muted-foreground leading-7">
          Import the component you just added and pass it the App Kit instance.
        </p>
        <CodeBlock code={`import { BalanceCard } from "@/components/balance-card"

export default function Dashboard() {
  return <BalanceCard kit={kit} sources={["CIRCLE_WALLET"]} />
}`} language="tsx" />
      </div>
    </div>
  );
}
