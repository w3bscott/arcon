import { use } from "react";
import { notFound } from "next/navigation";
import { getBlockBySlug } from "@/data/blocks";
import { BlockPreview } from "@/components/blockspage/BlockPreview";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";

export default function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ style?: string }>;
}) {
  const { slug } = use(params);
  const { style } = use(searchParams);
  
  const block = getBlockBySlug(slug);
  if (!block) notFound();

  const activeStyle = (style || "1") as ShowcaseStyleVariant;
  const isDark = activeStyle === "3";

  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${isDark ? 'bg-zinc-950' : 'bg-background'}`}>
      <div className="w-full h-full flex flex-col">
        <BlockPreview slug={slug} styleVariant={activeStyle} />
      </div>
    </div>
  );
}
