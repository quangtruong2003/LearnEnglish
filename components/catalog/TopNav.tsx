"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { StreakBadge } from "@/components/catalog/StreakBadge";
import { ThemeToggle } from "@/components/catalog/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Flashcards", href: "/flashcards" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <SidebarTrigger />
        <Link href="/" className="text-sm font-semibold tracking-tight sm:text-base">
          Học TOEIC 45 ngày
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex-1" />
        <StreakBadge />
        <ThemeToggle />
      </div>
    </header>
  );
}
