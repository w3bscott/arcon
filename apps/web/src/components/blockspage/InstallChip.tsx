import { CopyButton } from "./CopyButton";

interface InstallChipProps {
  command: string;
}

export function InstallChip({ command }: InstallChipProps) {
  return (
    <div className="bg-[#f4f4f5] border border-[#e4e4e7] rounded-lg h-11 px-4 flex items-center justify-between font-mono text-sm text-[#09090b]">
      <span>{command}</span>
      <CopyButton content={command} className="text-[#09090b] hover:text-[#09090b] hover:bg-black/5" />
    </div>
  );
}
