import type { Metadata } from "next";
import { CodeBlock } from "@/components/blockspage/CodeBlock";

export const metadata: Metadata = {
  title: "Styling — ArcForge",
  description: "Learn how to style ArcForge components.",
};

const stylingCode = `/* Your global CSS file (e.g. index.css or globals.css) */

.arc-balance-card {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}

/* Use data attributes to style different states */
.arc-balance-card[data-state="loading"] {
  opacity: 0.5;
}

.arc-balance-card[data-state="error"] {
  border-color: #ef4444;
  background: #fef2f2;
}
`;

const tailwindCode = `import { BalanceCard } from "@/components/balance-card"

export default function App() {
  return (
    <BalanceCard 
      kit={kit} 
      className="rounded-xl border p-6 bg-card text-card-foreground shadow-sm data-[state=loading]:animate-pulse data-[state=error]:border-destructive"
    />
  )
}`;

export default function StylingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Styling</h1>
      <p className="text-lg text-muted-foreground">
        ArcForge components are completely unstyled by default. You have full control over the visual presentation.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">The className Prop</h2>
        <p className="text-muted-foreground leading-7">
          Every component accepts a standard <code>className</code> prop as well as an optional <code>style</code> prop. Because you own the component source code, you can also modify the internal structure and add classes directly to the JSX elements.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">State Management via Data Attributes</h2>
        <p className="text-muted-foreground leading-7">
          ArcForge components use <code>data-state</code> attributes to communicate their current status (e.g., loading, error, success, empty). This is a standard pattern that works well with both vanilla CSS and utility frameworks like Tailwind.
        </p>
        
        <h3 className="text-xl font-medium tracking-tight text-foreground mt-6">Example: Vanilla CSS</h3>
        <CodeBlock code={stylingCode} language="css" />

        <h3 className="text-xl font-medium tracking-tight text-foreground mt-6">Example: Tailwind CSS</h3>
        <CodeBlock code={tailwindCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Modifying the Source</h2>
        <p className="text-muted-foreground leading-7">
          If you need more structural changes than a top-level <code>className</code> allows, simply open the component file you downloaded via the CLI (e.g., <code>components/balance-card.tsx</code>) and modify the JSX directly. 
        </p>
        <p className="text-muted-foreground leading-7">
          The components are designed to be clean, readable, and easy to customize. We use semantic HTML elements and keep the logic separated from the presentation as much as possible.
        </p>
      </div>
    </div>
  );
}
