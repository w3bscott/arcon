import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction — Arc UI",
  description: "What is Arc UI and how does it work?",
};

export default function IntroductionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Introduction</h1>
      <p className="text-lg text-muted-foreground">
        Beautifully designed, accessible React components for Circle's Arc App Kit.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">What is Arc UI?</h2>
        <p className="text-muted-foreground leading-7">
          Arc UI is a collection of re-usable React components that make it easy to integrate web3 functionality like wallets, token balances, payments, swaps, and cross-chain bridges into your application.
        </p>
        <p className="text-muted-foreground leading-7">
          It is built on top of the <strong>shadcn/ui</strong> model. This means that Arc UI is <strong>not a component library</strong> you install via npm. Instead, it is a component registry. You use the shadcn CLI to copy the source code of the components directly into your project.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Why this approach?</h2>
        <p className="text-muted-foreground leading-7">
          Traditional component libraries abstract away the implementation details. This is great for getting started quickly, but it often becomes a bottleneck when you need to customize the UI or behavior to match your brand or specific use case.
        </p>
        <p className="text-muted-foreground leading-7">
          By copying the source code into your project, you get the best of both worlds:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Fast integration:</strong> Get fully functional components with pre-built state management in seconds.</li>
          <li><strong>Full control:</strong> The code is yours. Modify the JSX, add your own Tailwind classes, or change the underlying logic without fighting against a rigid API.</li>
          <li><strong>Zero bloat:</strong> Only include the components you actually use.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Architecture</h2>
        <p className="text-muted-foreground leading-7">
          Arc UI consists of two main pieces:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>@arc-ui/core</strong>: A small, framework-agnostic npm package containing the headless state management stores, types, and formatting utilities.</li>
          <li><strong>The Registry</strong>: The React components themselves, which you copy into your project. These components consume the core stores to render the UI.</li>
        </ul>
      </div>
    </div>
  );
}
