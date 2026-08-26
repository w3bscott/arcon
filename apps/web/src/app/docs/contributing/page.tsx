import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contributing — ArcForge",
  description: "How to contribute to ArcForge.",
};

export default function ContributingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Contributing</h1>
      <p className="text-lg text-muted-foreground">
        We welcome community contributions to ArcForge!
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Repository Structure</h2>
        <p className="text-muted-foreground leading-7">
          ArcForge is a monorepo managed with pnpm. The key directories are:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>packages/core:</strong> The framework-agnostic headless logic.</li>
          <li><strong>packages/react:</strong> The React hooks and source components.</li>
          <li><strong>apps/web:</strong> This documentation site and the component preview pages.</li>
          <li><strong>registry/default:</strong> Auto-generated output directory used by the shadcn CLI.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">The Golden Rule</h2>
        <p className="text-muted-foreground leading-7 font-medium">
          Never edit the files inside <code>registry/default</code> directly!
        </p>
        <p className="text-muted-foreground leading-7">
          The registry files are generated automatically. The single source of truth for all components is located in <code>packages/react/src/components</code>. Make your changes there, and the build script will automatically update the registry.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Adding a New Component</h2>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>Create a new directory in <code>packages/react/src/components/your-component/</code>.</li>
          <li>Write the component source code in <code>index.tsx</code>. Ensure it is framework-agnostic and relies only on <code>@arcforge/core</code> for state management.</li>
          <li>Register the component by adding its metadata to <code>packages/react/src/registry.ts</code>.</li>
          <li>Export the component in <code>packages/react/src/index.ts</code>.</li>
          <li>Create a preview wrapper for the website in <code>apps/web/src/components/arcforge/your-component-wrapper.tsx</code> to handle mock data and presentation.</li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Submitting Changes</h2>
        <p className="text-muted-foreground leading-7">
          Before submitting a pull request, ensure that the entire workspace builds without errors by running our release check command from the root of the repository:
        </p>
        <div className="bg-[#18181b] rounded-lg p-4 text-sm text-white overflow-x-auto">
          <code>pnpm release:check</code>
        </div>
        <p className="text-muted-foreground leading-7 mt-4">
          This command runs linting, typechecking, tests, and the registry build script across all packages.
        </p>
      </div>
    </div>
  );
}
