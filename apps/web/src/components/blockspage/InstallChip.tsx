import { CopyButton } from "./CopyButton";

interface InstallChipProps {
  command: string;
}

export function InstallChip({ command }: InstallChipProps) {
  return (
    <div className="bg-muted border border-border rounded-lg h-11 px-4 flex items-center justify-between font-mono text-sm text-foreground">
      <span>{command}</span>
      <CopyButton content={command} className="text-foreground hover:text-foreground hover:bg-black/5" />
    </div>
  );
}
