"use client";

import Link from "next/link";
import { flows } from "@/data/flows";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function FlowsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar sticky={false} />

      {/* Page header */}
      <header className="w-full max-w-7xl mx-auto px-8 md:px-16 xl:px-32 pb-8 pt-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Flows
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-7">
            Production-oriented compositions built from Arc UI primitives.
            <br className="hidden md:block" />
            Complete user journeys ready for integration.
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="w-full max-w-7xl mx-auto px-8 md:px-16 xl:px-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flows.map((flow) => (
            <Link
              key={flow.slug}
              href={`/flows/${flow.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-card border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {flow.name}
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {flow.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {flow.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
