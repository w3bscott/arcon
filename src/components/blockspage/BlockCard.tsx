import Link from "next/link";
import type { BlockMetadata } from "@/data/blocks";
import { StatusBadge } from "./StatusBadge";
import { ArrowRight } from "lucide-react";

interface BlockCardProps {
  block: BlockMetadata;
}

export function BlockCard({ block }: BlockCardProps) {
  return (
    <Link
      href={`/blocks/${block.slug}`}
      className="group relative flex flex-col p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      {/* Category pill */}
      <span className="mb-3 inline-flex self-start px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400 bg-gray-50 border border-gray-100 rounded-full">
        {block.category}
      </span>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-1.5 leading-5 group-hover:text-black transition-colors">
        {block.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-5 flex-1 mb-4">
        {block.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <StatusBadge status={block.status} />
        <ArrowRight
          className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all duration-200"
          strokeWidth={2}
        />
      </div>
    </Link>
  );
}
