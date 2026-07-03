import type { BlockStatus } from "@/data/blocks";

interface StatusBadgeProps {
  status: BlockStatus;
  className?: string;
}

const statusConfig: Record<
  BlockStatus,
  { label: string; className: string }
> = {
  Stable: {
    label: "Stable",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  Preview: {
    label: "Preview",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  Planned: {
    label: "Planned",
    className:
      "bg-gray-50 text-gray-500 ring-1 ring-gray-200",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium leading-4 ${config.className} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "Stable"
            ? "bg-emerald-500"
            : status === "Preview"
            ? "bg-amber-500"
            : "bg-gray-400"
        }`}
      />
      {config.label}
    </span>
  );
}
