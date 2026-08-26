import { use } from "react";
import { notFound } from "next/navigation";
import { getFlowBySlug, flows } from "@/data/flows";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SendUsdcFlow } from "@/components/flows/send-usdc/SendUsdcFlow";

export async function generateStaticParams() {
  return flows.map((flow) => ({
    slug: flow.slug,
  }));
}

export default function FlowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const flow = getFlowBySlug(slug);

  if (!flow) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar sticky={false} />

      <main className="w-full max-w-7xl mx-auto px-8 md:px-16 xl:px-32 pt-24 pb-16">
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link
            href="/flows"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Flows
          </Link>
        </div>

        {/* Flow Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {flow.name}
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {flow.status}
            </span>
          </div>
          <p className="text-base text-muted-foreground">
            {flow.description}
          </p>
        </div>

        {/* Flow Implementation Container */}
        <div className="w-full flex justify-center">
          {flow.slug === "send-usdc" ? (
            <SendUsdcFlow />
          ) : (
            <div>Flow implementation pending.</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
