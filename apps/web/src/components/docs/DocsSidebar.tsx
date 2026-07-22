"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Introduction", href: "/docs/introduction" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Components", href: "/docs/components" },
  { title: "Styling", href: "/docs/styling" },
  { title: "Core Library", href: "/docs/core" },
  { title: "Contributing", href: "/docs/contributing" },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-[220px]">
      <div className="h-full py-6 pr-6 lg:py-8">
        <div className="w-full">
          <div className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              Getting Started
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline ${
                      isActive
                        ? "font-medium text-[#09090b]"
                        : "text-[#71717a]"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
