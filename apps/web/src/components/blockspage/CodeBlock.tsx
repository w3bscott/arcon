import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: "tsx" | "bash" | "typescript" | "css";
  className?: string;
}

export async function CodeBlock({
  code,
  language = "bash",
  className = "",
}: CodeBlockProps) {
  // Generate HTML on the server
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div
      className={`relative group rounded-xl border border-[#30363d] overflow-hidden bg-[#0d1117] ${className}`}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton content={code} className="bg-[#0d1117] border border-[#30363d]" />
      </div>

      {/* Code */}
      <div 
        className="p-6 text-sm font-mono overflow-x-auto leading-[1.6] text-[#e6edf3] [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </div>
  );
}
