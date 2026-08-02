import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const REGISTRY_DEFAULT_DIR = path.resolve(
  process.cwd(),
  "../../registry/default"
);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const componentDir = path.join(REGISTRY_DEFAULT_DIR, slug);
  const registryItemPath = path.join(componentDir, "registry-item.json");

  // Check component exists
  if (!fs.existsSync(registryItemPath)) {
    return NextResponse.json(
      { error: `Component "${slug}" not found.` },
      { status: 404 }
    );
  }

  // Read the registry-item.json
  const registryItem = JSON.parse(
    fs.readFileSync(registryItemPath, "utf8")
  );

  // Inline file contents into the response
  const filesWithContent = registryItem.files.map(
    (file: { path: string; type: string }) => {
      const filePath = path.resolve(
        process.cwd(),
        "../../",
        file.path
      );

      let content = "";
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, "utf8");
      }

      return {
        ...file,
        content,
      };
    }
  );

  const response = {
    ...registryItem,
    files: filesWithContent,
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "application/json",
    },
  });
}
