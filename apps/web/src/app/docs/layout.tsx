import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <Navbar sticky={true} />
      <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 md:px-8">
        <div className="flex flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <DocsSidebar />
          <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full min-w-0 max-w-3xl">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
