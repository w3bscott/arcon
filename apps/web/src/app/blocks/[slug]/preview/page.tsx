import { use } from "react";
import { notFound } from "next/navigation";
import { getBlockBySlug } from "@/data/blocks";
import { getBlockStyle, type StyleVariant } from "@/lib/block-styles";
import { BlockPreview } from "@/components/blockspage/BlockPreview";

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

  const activeStyle = (style || "1") as StyleVariant;
  const className = getBlockStyle(slug, activeStyle);
  const isDark = className.includes("bg-zinc-950") || className.includes("bg-black");

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-8 ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
      <BlockPreview slug={slug} className={className} />
    </div>
  );
}
