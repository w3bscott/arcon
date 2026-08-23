import { NextResponse } from "next/server";
import { registryPayloads } from "@/generated/registry-payloads";

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const registryItem =
    registryPayloads[slug as keyof typeof registryPayloads];

  // Check component exists
  if (!registryItem) {
    return NextResponse.json(
      { error: `Component "${slug}" not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(registryItem, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "application/json",
    },
  });
}
