"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/constants";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className="sticky top-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border"
      id="main-nav"
    >
      <div className="max-w-6xl mx-auto h-full px-6 md:px-12 lg:px-24 flex items-center justify-between">
        {/* ─── Logo ─── */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-heading text-lg font-semibold text-foreground">
            GG
          </span>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm font-body text-muted-foreground hidden sm:block">
            Portfolio
          </span>
        </Link>

        {/* ─── Desktop Nav Links ─── */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm font-body transition-colors duration-200",
                isActive(item.path)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* ─── Mobile Controls ─── */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 w-9 h-9 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* ─── Mobile Nav Dropdown ─── */}
      <div
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border overflow-hidden transition-all duration-200 ease-in-out",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-base font-body py-1 transition-colors duration-200",
                isActive(item.path)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
