import type { BlockMetadata } from "@/data/blocks";
import { BlockCard } from "./BlockCard";

interface BlockGridProps {
  blocks: BlockMetadata[];
  emptyMessage?: string;
}

export function BlockGrid({
  blocks,
  emptyMessage = "No blocks match your search.",
}: BlockGridProps) {
  if (blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {blocks.map((block) => (
        <BlockCard key={block.slug} block={block} />
      ))}
    </div>
  );
}
