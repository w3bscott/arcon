"use client";

import { blockCategories, type BlockCategory } from "@/data/blocks";

interface CategoryFilterProps {
  selected: BlockCategory | "All";
  onChange: (category: BlockCategory | "All") => void;
  counts?: Partial<Record<BlockCategory | "All", number>>;
  className?: string;
}

export function CategoryFilter({
  selected,
  onChange,
  counts,
  className = "",
}: CategoryFilterProps) {
  const categories: (BlockCategory | "All")[] = ["All", ...blockCategories];

  return (
    <nav
      aria-label="Block categories"
      className={`flex flex-wrap gap-1.5 ${className}`}
    >
      {categories.map((cat) => {
        const isActive = selected === cat;
        const count = counts?.[cat];
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {cat}
            {count !== undefined && (
              <span
                className={`text-[10px] font-semibold tabular-nums ${
                  isActive ? "text-gray-400" : "text-gray-400"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
