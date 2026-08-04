"use client";

import { useState, useMemo } from "react";
import { blocks, blockCategories, type BlockCategory } from "@/data/blocks";
import { SearchInput } from "@/components/blockspage/SearchInput";
import { CategoryFilter } from "@/components/blockspage/CategoryFilter";
import { BlockGrid } from "@/components/blockspage/BlockGrid";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function BlocksPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlockCategory | "All">(
    "All"
  );

  // Compute per-category counts based on current search query only
  const categoryCounts = useMemo(() => {
    const queryFiltered = blocks.filter((b) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    });

    const counts: Partial<Record<BlockCategory | "All", number>> = {
      All: queryFiltered.length,
    };
    for (const cat of blockCategories) {
      counts[cat] = queryFiltered.filter((b) => b.category === cat).length;
    }
    return counts;
  }, [query]);

  // Final filtered list
  const filtered = useMemo(() => {
    return blocks.filter((b) => {
      const matchesCategory =
        activeCategory === "All" || b.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar sticky={false} />

      {/* Page header */}
      <header className="w-full max-w-7xl mx-auto px-8 md:px-16 xl:px-32 pb-2 pt-24">
        <div className="max-w-2xl">
          {/* <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Arc UI
          </p> */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Blocks
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-7">
            Production-ready financial interface blocks for Arc App Kit.
            <br className="hidden md:block" />
            Install, connect, and ship faster.
          </p>
        </div>
      </header>

      {/* Toolbar: search + filter */}
      <div className="top-[68px] z-30 bg-background/90 backdrop-blur-sm border-b border-gray-200">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 xl:px-32 py-3 pb-6 flex flex-col lg:flex-row items-start lg:items-center gap-3 justify-between">
          <SearchInput value={query} onChange={setQuery} />
          <CategoryFilter
            selected={activeCategory}
            onChange={setActiveCategory}
            counts={categoryCounts}
          />
        </div>
      </div>

      {/* Grid */}
      <main className="w-full max-w-7xl mx-auto px-8 md:px-16 xl:px-32 py-6">
        {/* Block count indicator /*}
        {/* <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {filtered.length} block{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            {query ? ` matching "${query}"` : ""}
          </p>
        </div> */}

        <BlockGrid
          blocks={filtered}
          emptyMessage={
            query
              ? `No blocks match "${query}". Try a different search term.`
              : "No blocks in this category yet."
          }
        />
      </main>

      <Footer />
    </div>
  );
}
