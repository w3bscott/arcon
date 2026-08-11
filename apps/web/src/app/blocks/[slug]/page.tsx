import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Copy, ChevronDown } from "lucide-react";
import { getBlockBySlug, blocks } from "@/data/blocks";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/blockspage/StatusBadge";
import { CodeBlock } from "@/components/blockspage/CodeBlock";
import { PreviewArea } from "@/components/blockspage/PreviewArea";
import { BlockPreview } from "@/components/blockspage/BlockPreview";
import type { ShowcaseStyleVariant } from "@/lib/showcase-theme";
import { CopyButton } from "@/components/blockspage/CopyButton";

const STYLE_VARIANTS = ["1", "2", "3", "4"] as const;
type Tab = "preview" | "code";

export default function BlockDetailPage({
  params,
  searchParams,
}: {
  params:       Promise<{ slug: string }>;
  searchParams: Promise<{ style?: string; tab?: string }>;
}) {
  const { slug }       = use(params);
  const { style, tab } = use(searchParams);
  const block           = getBlockBySlug(slug);

  if (!block) notFound();

  const activeStyle = (style || "1") as ShowcaseStyleVariant;
  const activeTab   = (tab   || "preview") as Tab;

  return (
    <div className="min-h-screen bg-background">
      <Navbar sticky={false} />

      {/* Outer muted inset frame */}
      {/* <div className="mx-6 mb-6 bg-muted border border-border rounded-lg flex justify-center overflow-hidden"> */}

        {/* Inner white content panel */}
        <main className="w-full max-w-7xl mx-auto bg-white flex flex-col px-8 md:px-16 xl:px-32 pb-16 mt-16">

          {/* Title + description */}
          <div className="flex flex-col gap-2 pt-5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground leading-tight">
                {block.name}
              </h1>
              <StatusBadge status={block.status} />
            </div>
            <p className="text-base text-muted-foreground">
              {block.description}
            </p>
          </div>

          {/* Breadcrumb — comes AFTER title/description */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 text-sm text-muted-foreground py-5"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-[18px] h-[18px] shrink-0" />
            <Link href="/blocks" className="hover:text-foreground transition-colors">
              Blocks
            </Link>
            <ChevronRight className="w-[18px] h-[18px] shrink-0" />
            <span className="text-foreground">{block.name}</span>
          </nav>

          {/* Preview container */}
          <div className="bg-[repeating-linear-gradient(45deg,#f0f0f0_0,#f0f0f0_1px,transparent_1px,transparent_4px)] border border-border rounded-2xl flex flex-col gap-px overflow-hidden p-3">

            {/* Toolbar */}
            <div className="flex items-center justify-between px-1 pt-1 pb-3 flex-wrap gap-3">

              {/* Left: Preview/Code tabs + install chip */}
              <div className="flex items-center gap-3 flex-wrap">

                <div className="bg-muted flex items-center h-9 p-1 rounded-xl gap-0.5">
                  {(["preview", "code"] as Tab[]).map((t) => (
                    <Link
                      key={t}
                      href={`/blocks/${slug}?style=${activeStyle}&tab=${t}`}
                      className={`h-7 px-2 text-sm font-medium rounded-lg flex items-center justify-center transition-all ${
                        activeTab === t
                          ? "bg-white text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Link>
                  ))}
                </div>

                <InstallChipInline command={block.installCommand} />

              </div>

              {/* Right: Style tabs */}
              <div className="bg-muted flex items-center h-9 p-1 rounded-xl gap-0.5">
                {STYLE_VARIANTS.map((s) => (
                  <Link
                    key={s}
                    href={`/blocks/${slug}?style=${s}&tab=${activeTab}`}
                    className={`h-7 px-2 text-sm font-medium rounded-lg flex items-center justify-center transition-all ${
                      activeStyle === s
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Style {s}
                  </Link>
                ))}
              </div>

            </div>

            {/* Preview / Code body */}
            <div className="w-full">
              {activeTab === "preview" ? (
                <PreviewArea styleVariant={activeStyle} slug={slug}>
                  <BlockPreview slug={slug} styleVariant={activeStyle} />
                </PreviewArea>
              ) : (
                <div className="rounded-xl overflow-hidden">
                  <CodeBlock code={block.codeExample} language="tsx" />
                </div>
              )}
            </div>

          </div>
        </main>
      {/* </div> */}

      <Footer />
    </div>
  );
}

/* ── Inline install chip ────────────────────────────────────────────── */
function InstallChipInline({ command }: { command: string }) {
  return (
    <div className="bg-muted border border-border h-9 flex items-center gap-3 px-3 rounded-xl overflow-hidden">
      <div className="flex items-center gap-1 border-r border-border pr-3 shrink-0">
        <span className="text-[11px] font-bold text-[#cc3534] leading-none tracking-tight">
          npm
        </span>
        {/* <ChevronDown className="w-4 h-4 text-muted-foreground" /> */}
      </div>

      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        {command}
      </span>

      <CopyButton 
        content={command} 
        className="!p-0 ml-1 !text-muted-foreground hover:!text-foreground !bg-transparent hover:!bg-transparent transition-colors shrink-0" 
      />
    </div>
  );
}

/* ── Static params ──────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.slug }));
}














// import { use } from "react";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { ChevronRight } from "lucide-react";
// import { getBlockBySlug, blocks } from "@/data/blocks";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { StatusBadge } from "@/components/blockspage/StatusBadge";
// import { CodeBlock } from "@/components/blockspage/CodeBlock";
// import { PreviewArea } from "@/components/blockspage/PreviewArea";
// import { InstallChip } from "@/components/blockspage/InstallChip";
// import { BlockPreview } from "@/components/blockspage/BlockPreview";
// import { getBlockStyle, type StyleVariant } from "@/lib/block-styles";

// export default function BlockDetailPage({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ slug: string }>;
//   searchParams: Promise<{ style?: string }>;
// }) {
//   const { slug } = use(params);
//   const { style } = use(searchParams);
//   const block = getBlockBySlug(slug);

//   if (!block) notFound();

//   const activeStyle = (style || "1") as StyleVariant;
//   const className = getBlockStyle(slug, activeStyle);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar sticky={false} />

//       <main className="w-full max-w-[660px] mx-auto px-4 md:px-8 py-32">
//         {/* Breadcrumb */}
//         <nav
//           aria-label="Breadcrumb"
//           className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 font-sans"
//         >
//           <Link href="/blocks" className="hover:text-gray-900 transition-colors">
//             Blocks
//           </Link>
//           <ChevronRight className="w-4 h-4" />
//           <Link href={`/blocks?category=${block.category}`} className="hover:text-gray-900 transition-colors">
//             {block.category}
//           </Link>
//           <ChevronRight className="w-4 h-4" />
//           <span className="text-foreground font-medium">{block.name}</span>
//         </nav>

//         {/* Header */}
//         <div className="mb-10">
//           <div className="flex flex-wrap items-center gap-3 mb-2">
//             <h1 className="text-[30px] font-bold text-foreground font-sans leading-tight">
//               {block.name}
//             </h1>
//             <StatusBadge status={block.status} className="mt-1" />
//           </div>
//           <p className="text-base text-muted-foreground font-sans">
//             {block.description}
//           </p>
//         </div>

//         {/* Preview Area with Style Tabs */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2 mb-4">
//             {(["1", "2", "3", "4"] as StyleVariant[]).map((s) => (
//               <Link
//                 key={s}
//                 href={`/blocks/${slug}?style=${s}`}
//                 className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
//                   activeStyle === s
//                     ? "bg-gray-900 text-white"
//                     : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//                 }`}
//               >
//                 Style {s}
//               </Link>
//             ))}
//           </div>
//           <PreviewArea className={className} slug={slug}>
//             <BlockPreview slug={slug} className={className} />
//           </PreviewArea>
//         </div>

//         {/* Install Section */}
//         <div className="mb-8">
//           <InstallChip command={block.installCommand} />
//         </div>

//         {/* Usage Section */}
//         <div>
//           <CodeBlock code={block.codeExample} language="tsx" />
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// // Static params for all known blocks
// export async function generateStaticParams() {
//   return blocks.map((b) => ({ slug: b.slug }));
// }
