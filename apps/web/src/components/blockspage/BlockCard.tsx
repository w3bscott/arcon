import Link from "next/link";
import type { BlockMetadata } from "@/data/blocks";


interface BlockCardProps {
  block: BlockMetadata;
  preview?: React.ReactNode;
}

export function BlockCard({ block, preview }: BlockCardProps) {
  return (
    <article
      className="group relative flex flex-col p-1 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      <Link
        href={`/blocks/${block.slug}`}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`Open ${block.name} block details`}
      />

      {/* Preview Area */}
      {preview ? (
        preview
      ) : (
        <div className="w-full h-[200px] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 mb-0">
          <span className="text-gray-300 text-sm">No preview</span>
        </div>
      )}
      {/* Category pill */}
      {/* <span className="mb-3 inline-flex self-start px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400 bg-gray-50 border border-gray-100 rounded-full">
        {block.category}
      </span> */}

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 px-3 pt-1 leading-5 group-hover:text-black transition-colors">
        {block.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 px-3 pb-2 leading-5 flex-1">
        {block.description}
      </p>

      {/* Footer */}
      {/* <div className="flex items-center justify-between">
        <StatusBadge status={block.status} />
        <ArrowRight
          className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all duration-200"
          strokeWidth={2}
        />
      </div> */}
    </article>
  );
}
