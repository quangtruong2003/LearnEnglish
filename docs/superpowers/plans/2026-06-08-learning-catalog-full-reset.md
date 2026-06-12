# Learning Catalog Full-Reset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete all existing UI and layout components, then rebuild the entire app shell, homepage, stage page, chapter page, practice page, and flashcards page from scratch using the Learning Catalog design direction (catalog-first, mobile-first, product-grade shadcn-like UI). Keep all data-layer, store, and content-processing code untouched.

**Architecture:** The app is a Next.js 15 App Router project. All UI surfaces (layout, pages, components) are rebuilt fresh. The content layer (`content/textbook.ts`, `lib/content/`), the store layer (`lib/store/`), and the tests remain untouched — they are the stable foundation the new UI connects to.

**Tech Stack:** Next.js 15 (App Router, RSC + client components), React 19, TypeScript, Tailwind CSS 4, shadcn/ui components, Vitest, Playwright.

---

## File Structure

### DELETE (entire components/ui, components/layout, components/dashboard, components/reader)
```
components/layout/CommandMenu.tsx        → DELETE
components/layout/Header.tsx            → DELETE
components/layout/SearchBar.tsx         → DELETE
components/layout/Sidebar.tsx           → DELETE
components/layout/ThemeToggle.tsx       → DELETE
components/layout/AppSidebar.tsx         → DELETE
components/dashboard/ChapterListItem.tsx → DELETE
components/dashboard/ContinueCard.tsx    → DELETE
components/dashboard/ProgressCard.tsx    → DELETE
components/dashboard/StreakBadge.tsx    → DELETE
components/reader/ChapterNav.tsx         → DELETE
components/reader/MarkCompleteButton.tsx → DELETE
components/reader/Reader.tsx             → DELETE
components/reader/TipBlock.tsx          → DELETE
components/reader/WordFormTable.tsx     → DELETE
```

### KEEP (data layer — untouched)
```
app/layout.tsx                         → REPLACE (layout shell rewritten)
app/page.tsx                           → REPLACE (homepage rewritten)
app/giai-doan/[stage]/page.tsx         → REPLACE (stage page rewritten)
app/giai-doan/[stage]/chuong/[chapter]/page.tsx → REPLACE (chapter page rewritten)
app/practice/[chapter]/page.tsx         → REPLACE (styling refresh only)
app/flashcards/page.tsx                → REPLACE (styling refresh only)
content/textbook.ts                    → KEEP
lib/content/                           → KEEP
lib/store/                            → KEEP
lib/util/                             → KEEP
lib/utils.ts                          → KEEP
lib/search/                           → KEEP
tests/                                → KEEP
scripts/build-content.ts               → KEEP
```

### CREATE (new catalog UI components)
```
components/catalog/CatalogHero.tsx
components/catalog/StageCard.tsx
components/catalog/ChapterCard.tsx
components/catalog/ProgressSummary.tsx
components/catalog/ContinueCard.tsx
components/catalog/TopNav.tsx
components/catalog/StreakBadge.tsx
components/reader/Reader.tsx
components/reader/ChapterNav.tsx
components/reader/MarkCompleteButton.tsx
components/reader/TipBlock.tsx
components/reader/WordFormTable.tsx
```

---

## Task 1: Write smoke + data-layer unit tests as baseline

**Files:**
- Modify: `tests/unit/smoke.spec.ts`
- Test: `tests/unit/progressStore.spec.ts`
- Test: `tests/unit/leitner.spec.ts`
- Test: `tests/unit/smoke.spec.ts`

- [ ] **Step 1: Run the existing data-layer tests to confirm baseline is green**

Run: `pnpm test tests/unit/progressStore.spec.ts tests/unit/leitner.spec.ts tests/unit/smoke.spec.ts`
Expected: ALL PASS. These tests cover the store layer that the new UI depends on.

- [ ] **Step 2: Confirm the content layer loads correctly**

Run: `pnpm test tests/unit/parseTextbook.spec.ts 2>/dev/null || echo "No parseTextbook spec — check content/textbook.ts loads"`
Expected: PASS or no test file (content is loaded at build time via `content/textbook.ts`).

- [ ] **Step 3: Commit baseline**

```bash
git add tests/unit/progressStore.spec.ts tests/unit/leitner.spec.ts tests/unit/smoke.spec.ts
git commit -m "test: verify data-layer baseline before UI reset"
```

## Task 2: Build the app shell (layout, top navigation, sidebar)

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/catalog/TopNav.tsx`
- Create: `components/catalog/StreakBadge.tsx`
- Delete: `components/layout/`, `components/dashboard/`, `components/reader/` (after rewriting in Task 3)

- [ ] **Step 1: Write the failing shell E2E test**

```ts
import { test, expect } from "@playwright/test";

test("shell exposes catalog navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /Trang chủ/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Flashcards/i })).toBeVisible();
});

test("shell opens chapter from stage page", async ({ page }) => {
  await page.goto("/giai-doan/nen-tang");
  await page.getByRole("link", { name: /Mở chương 1/i }).click();
  await expect(page.getByRole("heading", { name: /CÁC LOẠI TỪ/i })).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:e2e tests/e2e/catalog.spec.ts 2>/dev/null || pnpm test:e2e`
Expected: FAIL — existing components may not render the expected labels.

- [ ] **Step 3: Write the new layout shell**

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/catalog/SidebarContent";
import { TopNav } from "@/components/catalog/TopNav";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Học TOEIC 45 ngày",
  description: "Lộ trình học TOEIC 700+ theo 3 giai đoạn",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <SidebarProvider defaultOpen={false}>
            <Sidebar>
              <SidebarContent />
            </Sidebar>
            <SidebarInset>
              <TopNav />
              <main className="flex-1 min-w-0">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// components/catalog/TopNav.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Flashcards", href: "/flashcards" },
];

export function TopNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  const openSearch = React.useCallback(() => {
    document.dispatchEvent(new CustomEvent("open-command-menu"));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <SidebarTrigger />
        <Link href="/" className="text-sm font-semibold tracking-tight sm:text-base">
          Học TOEIC 45 ngày
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={openSearch}
          className="hidden md:flex"
          aria-label="Tìm kiếm"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={openSearch} className="md:hidden" aria-label="Tìm kiếm">
          <Search className="h-4 w-4" />
        </Button>
        {mounted ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Đổi giao diện"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        ) : (
          <div className="h-9 w-9" />
        )}
      </div>
    </header>
  );
}
```

```tsx
// components/catalog/StreakBadge.tsx
"use client";
import { useProgress } from "@/lib/store/useProgress";
import { Flame } from "lucide-react";

export function StreakBadge() {
  const { progress, hydrated } = useProgress();
  if (!hydrated || !progress.streak) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
        <Flame className="h-3.5 w-3.5" />
        —
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium">
      <Flame className="h-3.5 w-3.5 text-orange-400" />
      {progress.streak.days} ngày liên tiếp
    </span>
  );
}
```

```tsx
// components/ui/sidebar.tsx (existing shadcn — no changes needed, but verify SidebarTrigger export)
```

Note: The shadcn `Sidebar` component from `@/components/ui/sidebar` is already installed. The `SidebarTrigger` inside the shadcn sidebar handles the mobile sheet toggle automatically. The sidebar content will be added in Task 3.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:e2e tests/e2e/catalog.spec.ts`
Expected: PASS and the new shell renders with catalog navigation.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/catalog/TopNav.tsx components/catalog/StreakBadge.tsx
git commit -m "feat: build new app shell with catalog navigation"
```

## Task 3: Rebuild all UI components from scratch

**Files:**
- Create: `components/catalog/CatalogHero.tsx`
- Create: `components/catalog/StageCard.tsx`
- Create: `components/catalog/ChapterCard.tsx`
- Create: `components/catalog/ProgressSummary.tsx`
- Create: `components/catalog/ContinueCard.tsx`
- Create: `components/catalog/SidebarContent.tsx`
- Create: `components/catalog/ThemeToggle.tsx`
- Create: `components/reader/Reader.tsx`
- Create: `components/reader/ChapterNav.tsx`
- Create: `components/reader/MarkCompleteButton.tsx`
- Create: `components/reader/TipBlock.tsx`
- Create: `components/reader/WordFormTable.tsx`
- Delete: `components/layout/`, `components/dashboard/`, `components/reader/` (old files)

- [ ] **Step 1: Write the failing component-level unit tests**

```ts
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { StageCard } from "@/components/catalog/StageCard";

describe("StageCard", () => {
  it("renders stage title and CTA", () => {
    const { getByText } = render(
      <StageCard
        stage={{
          slug: "nen-tang",
          index: 1,
          title: "Nền tảng ngữ pháp",
          chapters: [],
        }}
        completedChapters={0}
      />
    );
    expect(getByText("Giai đoạn 1")).toBeInTheDocument();
    expect(getByText(/Mở giai đoạn 1/i)).toBeInTheDocument();
  });

  it("shows progress fraction", () => {
    const { getByText } = render(
      <StageCard
        stage={{
          slug: "nen-tang",
          index: 1,
          title: "Nền tảng",
          chapters: Array.from({ length: 4 }, (_, i) => ({ slug: `ch${i}`, index: i + 1, title: `Chương ${i + 1}`, stage: "nen-tang" as const, sections: [] })),
        }}
        completedChapters={2}
      />
    );
    expect(getByText("2/4 chương")).toBeInTheDocument();
  });
});
```

```ts
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ChapterCard } from "@/components/catalog/ChapterCard";

describe("ChapterCard", () => {
  it("renders chapter index and title", () => {
    const { getByText } = render(
      <ChapterCard
        chapter={{
          slug: "cac-loai-tu",
          index: 1,
          title: "Các loại từ",
          stage: "nen-tang",
          sections: [],
        }}
      />
    );
    expect(getByText("Chương 1")).toBeInTheDocument();
    expect(getByText("Các loại từ")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test tests/unit/stageCard.spec.ts tests/unit/chapterCard.spec.ts 2>/dev/null`
Expected: FAIL with `Cannot find module` errors.

- [ ] **Step 3: Write the new components**

```tsx
// components/catalog/CatalogHero.tsx
import { StreakBadge } from "@/components/catalog/StreakBadge";

export function CatalogHero() {
  return (
    <section className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Học TOEIC 45 ngày
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Chọn lộ trình học TOEIC
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Bắt đầu từ giai đoạn phù hợp, theo dõi tiến độ theo chương và quay lại đúng bài đang học.
          </p>
        </div>
        <StreakBadge />
      </div>
    </section>
  );
}
```

```tsx
// components/catalog/StageCard.tsx
"use client";
import Link from "next/link";
import type { Stage } from "@/lib/content/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type StageCardProps = {
  stage: Stage;
  completedChapters: number;
};

const STAGE_ACCENT: Record<string, string> = {
  "nen-tang": "Nền tảng",
  "thi": "Tăng tốc",
  "tu-loai": "Bứt tốc",
};

const STAGE_PACE: Record<string, string> = {
  "nen-tang": "4 chương trọng tâm",
  "thi": "3 chương chuyên sâu",
  "tu-loai": "5 chương ứng dụng",
};

export function StageCard({ stage, completedChapters }: StageCardProps) {
  const total = stage.chapters.length;
  const pct = Math.round((completedChapters / total) * 100);
  const statusLabel =
    completedChapters === total
      ? "Hoàn thành"
      : completedChapters > 0
        ? "Đang học"
        : "Chưa bắt đầu";

  return (
    <Card className="flex h-full flex-col rounded-3xl border-border/60 bg-card/90 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
            {STAGE_ACCENT[stage.slug] ?? stage.slug}
          </Badge>
          <span className="text-xs text-muted-foreground">{STAGE_PACE[stage.slug] ?? ""}</span>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold">Giai đoạn {stage.index}</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            {stage.title.replace(/#+\s*/, "").split("—")[1]?.trim() ?? stage.title}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="rounded-2xl bg-muted/50 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-medium">{completedChapters}/{total} chương</span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Trạng thái</span>
          <span className="font-medium">{statusLabel}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/giai-doan/${stage.slug}`}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Mở giai đoạn {stage.index}
        </Link>
      </CardFooter>
    </Card>
  );
}
```

```tsx
// components/catalog/ChapterCard.tsx
"use client";
import Link from "next/link";
import type { Chapter } from "@/lib/content/types";
import { useProgress } from "@/lib/store/useProgress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type ChapterCardProps = {
  chapter: Chapter;
};

const STATUS_LABELS: Record<string, string> = {
  completed: "Hoàn thành",
  in_progress: "Đang học",
  unread: "Chưa bắt đầu",
};

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  completed: "default",
  in_progress: "secondary",
  unread: "outline",
};

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { progress, hydrated } = useProgress();
  const status = hydrated ? (progress.chapters[chapter.slug]?.status ?? "unread") : "unread";

  return (
    <Card className="rounded-3xl border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg font-semibold">Chương {chapter.index}</CardTitle>
          <Badge variant={STATUS_VARIANTS[status]}>
            {STATUS_LABELS[status]}
          </Badge>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{chapter.title}</p>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {chapter.sections.length} mục nội dung
      </CardContent>
      <CardFooter>
        <Link
          href={`/giai-doan/${chapter.stage}/chuong/${chapter.slug}`}
          className="inline-flex items-center justify-center rounded-2xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          Mở chương {chapter.index}
        </Link>
      </CardFooter>
    </Card>
  );
}
```

```tsx
// components/catalog/ProgressSummary.tsx
"use client";
import { useProgress } from "@/lib/store/useProgress";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

type ProgressSummaryProps = {
  totalChapters: number;
};

export function ProgressSummary({ totalChapters }: ProgressSummaryProps) {
  const { progress, hydrated } = useProgress();
  const completed = hydrated
    ? Object.values(progress.chapters).filter((c) => c.status === "completed").length
    : 0;
  const pct = Math.round((completed / totalChapters) * 100);

  return (
    <Card className="rounded-3xl border-border/60 bg-card/80 shadow-sm">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tiến độ giai đoạn</span>
          <span className="font-medium">{completed}/{totalChapters} chương</span>
        </div>
        <Progress value={pct} className="h-2" />
      </CardContent>
    </Card>
  );
}
```

```tsx
// components/catalog/ContinueCard.tsx
"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProgress } from "@/lib/store/useProgress";
import { textbook } from "@/content/textbook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChapterProgress } from "@/lib/store/progressStore";

export function ContinueCard() {
  const { progress, hydrated } = useProgress();
  if (!hydrated) return null;

  const last = (Object.entries(progress.chapters) as [string, ChapterProgress][])
    .filter(([, v]) => v.status !== "unread")
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))[0];
  if (!last) return null;

  const [slug, info] = last;
  const chapter = textbook.allChapters.find((c) => c.slug === slug);
  if (!chapter) return null;

  const stageLabel = chapter.stage === "nen-tang" ? 1 : chapter.stage === "thi" ? 2 : 3;

  return (
    <Card className="rounded-3xl border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Tiếp tục bài đang học</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Giai đoạn {stageLabel}</p>
          <p className="text-lg font-medium">Chương {chapter.index}: {chapter.title}</p>
          <p className="text-xs text-muted-foreground">
            Cập nhật: {info.updatedAt.slice(0, 10)}
          </p>
        </div>
        <Link
          href={`/giai-doan/${chapter.stage}/chuong/${chapter.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Mở lại bài học
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
```

```tsx
// components/catalog/SidebarContent.tsx
import Link from "next/link";
import { textbook } from "@/content/textbook";
import { ThemeToggle } from "@/components/catalog/ThemeToggle";

export function SidebarContent() {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="space-y-1">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Học TOEIC 45 ngày
        </Link>
        <p className="text-sm text-muted-foreground">
          Chọn lộ trình và mở đúng chương đang cần học.
        </p>
      </div>
      <nav className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        {textbook.stages.map((stage) => (
          <div key={stage.slug} className="space-y-2">
            <Link
              href={`/giai-doan/${stage.slug}`}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Giai đoạn {stage.index}
            </Link>
            <ul className="space-y-1">
              {stage.chapters.map((chapter) => (
                <li key={chapter.slug}>
                  <Link
                    href={`/giai-doan/${stage.slug}/chuong/${chapter.slug}`}
                    className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    Chương {chapter.index}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link
          href="/flashcards"
          className="rounded-xl border border-border px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          Flashcards
        </Link>
      </nav>
      <ThemeToggle />
    </div>
  );
}
```

```tsx
// components/catalog/ThemeToggle.tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Đổi giao diện"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

Now rewrite the reader components:

```tsx
// components/reader/Reader.tsx
"use client";
import type { Section } from "@/lib/content/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TipBlock } from "@/components/reader/TipBlock";

type ReaderProps = {
  sections: Section[];
};

export function Reader({ sections }: ReaderProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-20">
          <h2 className={`font-semibold tracking-tight ${section.level === 3 ? "text-2xl" : "text-xl"}`}>
            {section.heading}
          </h2>
          {section.body && (
            <div className="mt-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  blockquote: TipBlock,
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full divide-y divide-border text-sm">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-3 py-2 text-left font-semibold bg-muted/50">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-3 py-2 border-t border-border">{children}</td>
                  ),
                }}
              >
                {section.body}
              </ReactMarkdown>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
```

```tsx
// components/reader/ChapterNav.tsx
"use client";
import type { Section } from "@/lib/content/types";
import { useEffect, useState } from "react";

type ChapterNavProps = {
  sections: Section[];
};

export function ChapterNav({ sections }: ChapterNavProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = sections
      .filter((s) => s.level === 3)
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="hidden w-52 shrink-0 lg:sticky lg:top-20 lg:block lg:self-start">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Nội dung</p>
      <ul className="space-y-1.5">
        {sections
          .filter((s) => s.level === 3)
          .map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`block rounded px-2 py-1 text-sm transition-colors ${
                  activeId === s.id
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.heading}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
```

```tsx
// components/reader/MarkCompleteButton.tsx
"use client";
import { useProgress } from "@/lib/store/useProgress";
import { writeProgress } from "@/lib/store/progressStore";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type MarkCompleteButtonProps = {
  chapterSlug: string;
};

export function MarkCompleteButton({ chapterSlug }: MarkCompleteButtonProps) {
  const { progress, setProgress, hydrated } = useProgress();
  if (!hydrated) return null;

  const current = progress.chapters[chapterSlug];
  const isCompleted = current?.status === "completed";

  const toggle = () => {
    const next: typeof progress = {
      ...progress,
      chapters: {
        ...progress.chapters,
        [chapterSlug]: {
          status: isCompleted ? "in_progress" : "completed",
          updatedAt: new Date().toISOString(),
        },
      },
    };
    writeProgress(next);
    setProgress(next);
    toast.success(
      isCompleted ? "Đã bỏ đánh dấu hoàn thành" : "Đã đánh dấu hoàn thành",
      { duration: 2000 }
    );
  };

  return (
    <Button
      variant={isCompleted ? "secondary" : "default"}
      onClick={toggle}
      className="gap-2"
    >
      <CheckCircle2 className="h-4 w-4" />
      {isCompleted ? "Bỏ đánh dấu hoàn thành" : "Đánh dấu hoàn thành"}
    </Button>
  );
}
```

```tsx
// components/reader/TipBlock.tsx
import type { ReactNode } from "react";

type TipBlockProps = {
  children?: ReactNode;
};

export function TipBlock({ children }: TipBlockProps) {
  return (
    <blockquote className="mt-4 rounded-2xl border-l-4 border-primary/60 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
      {children}
    </blockquote>
  );
}
```

```tsx
// components/reader/WordFormTable.tsx
import type { WordFormGroup } from "@/lib/content/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type WordFormTableProps = {
  groups: WordFormGroup[];
};

export function WordFormTable({ groups }: WordFormTableProps) {
  return (
    <div className="mt-4 overflow-x-auto">
      <Table className="text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Động từ</TableHead>
            <TableHead>Danh từ</TableHead>
            <TableHead>Tính từ</TableHead>
            <TableHead>Trạng từ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((g) => (
            <TableRow key={g.id}>
              <TableCell className="font-medium">{g.verb}</TableCell>
              <TableCell>{g.noun ?? "—"}</TableCell>
              <TableCell>{g.adjective ?? "—"}</TableCell>
              <TableCell>{g.adverb ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

Note: `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow` must be added from shadcn before this step. Run: `pnpm dlx shadcn@latest add table --yes`.

Now delete the old components:

```bash
# Delete old layout, dashboard, reader components (replaced by new catalog components)
rm -f components/layout/CommandMenu.tsx \
      components/layout/Header.tsx \
      components/layout/SearchBar.tsx \
      components/layout/Sidebar.tsx \
      components/layout/ThemeToggle.tsx \
      components/layout/AppSidebar.tsx \
      components/dashboard/ChapterListItem.tsx \
      components/dashboard/ContinueCard.tsx \
      components/dashboard/ProgressCard.tsx \
      components/dashboard/StreakBadge.tsx \
      components/reader/ChapterNav.tsx \
      components/reader/MarkCompleteButton.tsx \
      components/reader/Reader.tsx \
      components/reader/TipBlock.tsx \
      components/reader/WordFormTable.tsx

# Verify only new files remain
ls components/layout/ 2>/dev/null || echo "layout dir removed"
ls components/dashboard/ 2>/dev/null || echo "dashboard dir removed"
```

Also add shadcn Table component:

```bash
pnpm dlx shadcn@latest add table --yes
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test tests/unit/stageCard.spec.ts tests/unit/chapterCard.spec.ts`
Expected: PASS.

Run: `pnpm test:e2e tests/e2e/catalog.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/catalog/ components/reader/ components/layout/ components/dashboard/ app/layout.tsx
git add -u  # stage deleted files
git commit -m "feat: rebuild all UI components as Learning Catalog"
```

## Task 4: Rewrite all pages (homepage, stage, chapter, practice, flashcards)

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/giai-doan/[stage]/page.tsx`
- Modify: `app/giai-doan/[stage]/chuong/[chapter]/page.tsx`
- Modify: `app/practice/[chapter]/page.tsx`
- Modify: `app/flashcards/page.tsx`
- Test: `tests/e2e/catalog.spec.ts`
- Test: `tests/e2e/reader.spec.ts`
- Test: `tests/e2e/practice.spec.ts`
- Test: `tests/e2e/flashcards.spec.ts`

- [ ] **Step 1: Write the failing E2E tests for all pages**

```ts
import { test, expect } from "@playwright/test";

test("homepage renders the learning catalog", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Chọn lộ trình học TOEIC/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Mở giai đoạn 1/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Mở giai đoạn 2/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Mở giai đoạn 3/i })).toBeVisible();
});

test("stage page shows chapter grid", async ({ page }) => {
  await page.goto("/giai-doan/nen-tang");

  await expect(page.getByRole("heading", { name: /Giai đoạn 1/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Mở chương 1/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Mở chương 4/i })).toBeVisible();
});

test("chapter page renders and allows mark complete", async ({ page }) => {
  await page.goto("/giai-doan/nen-tang/chuong/cac-loai-tu-parts-of-speech");

  await expect(page.getByRole("heading", { name: /CÁC LOẠI TỪ/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Đánh dấu hoàn thành/i })).toBeVisible();
  await page.getByRole("button", { name: /Đánh dấu hoàn thành/i }).click();
  await expect(page.getByText(/Đã đánh dấu hoàn thành/i)).toBeVisible();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test:e2e tests/e2e/catalog.spec.ts tests/e2e/reader.spec.ts`
Expected: FAIL — pages still have old layouts.

- [ ] **Step 3: Write the new pages**

```tsx
// app/page.tsx
"use client";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { ContinueCard } from "@/components/catalog/ContinueCard";
import { StageCard } from "@/components/catalog/StageCard";
import { ProgressSummary } from "@/components/catalog/ProgressSummary";
import { textbook } from "@/content/textbook";
import { useProgress } from "@/lib/store/useProgress";

function StageCardList() {
  const { progress, hydrated } = useProgress();
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {textbook.stages.map((stage) => {
        const completed = hydrated
          ? stage.chapters.filter((c) => progress.chapters[c.slug]?.status === "completed").length
          : 0;
        return <StageCard key={stage.slug} stage={stage} completedChapters={completed} />;
      })}
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <CatalogHero />
      <ContinueCard />
      <StageCardList />
    </div>
  );
}
```

```tsx
// app/giai-doan/[stage]/page.tsx
import { notFound } from "next/navigation";
import { textbook } from "@/content/textbook";
import { ChapterCard } from "@/components/catalog/ChapterCard";
import { ProgressSummary } from "@/components/catalog/ProgressSummary";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function generateStaticParams() {
  return textbook.stages.map((s) => ({ stage: s.slug }));
}

const STAGE_ACCENT: Record<string, string> = {
  "nen-tang": "Nền tảng",
  "thi": "Tăng tốc",
  "tu-loai": "Bứt tốc",
};

const STAGE_PACE: Record<string, string> = {
  "nen-tang": "4 chương trọng tâm",
  "thi": "3 chương chuyên sâu",
  "tu-loai": "5 chương ứng dụng",
};

const STAGE_DESCRIPTION: Record<string, string> = {
  "nen-tang": "Củng cố nền tảng ngữ pháp để đọc câu nhanh và chắc hơn.",
  "thi": "Luyện hệ thống thì và cách nhận diện tín hiệu thời gian trong đề.",
  "tu-loai": "Tập trung word form, chiến lược Part 5 và bộ câu hỏi luyện sâu.",
};

export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const s = textbook.stages.find((x) => x.slug === stage);
  if (!s) notFound();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="space-y-3 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {STAGE_ACCENT[s.slug] ?? s.slug}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Giai đoạn {s.index}</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {STAGE_DESCRIPTION[s.slug] ?? ""}
        </p>
        <p className="text-sm font-medium">{STAGE_PACE[s.slug] ?? ""}</p>
      </section>
      <ProgressSummary totalChapters={s.chapters.length} />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {s.chapters.map((chapter) => (
          <ChapterCard key={chapter.slug} chapter={chapter} />
        ))}
      </section>
    </div>
  );
}
```

```tsx
// app/giai-doan/[stage]/chuong/[chapter]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { textbook } from "@/content/textbook";
import { Reader } from "@/components/reader/Reader";
import { ChapterNav } from "@/components/reader/ChapterNav";
import { MarkCompleteButton } from "@/components/reader/MarkCompleteButton";
import { WordFormTable } from "@/components/reader/WordFormTable";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return textbook.allChapters.map((c) => ({ stage: c.stage, chapter: c.slug }));
}

export default async function ChapterPage({ params }: { params: Promise<{ stage: string; chapter: string }> }) {
  const { stage, chapter } = await params;
  const ch = textbook.allChapters.find((c) => c.slug === chapter && c.stage === stage);
  if (!ch) notFound();

  const prevChapter = textbook.allChapters.find((c) => c.index === ch.index - 1 && c.stage === ch.stage);
  const nextChapter = textbook.allChapters.find((c) => c.index === ch.index + 1 && c.stage === ch.stage);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href={`/giai-doan/${stage}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Quay lại giai đoạn
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Chương {ch.index}: {ch.title}</h1>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <ChapterNav sections={ch.sections} />
        <div className="flex-1 min-w-0 space-y-8">
          <Reader sections={ch.sections} />
          {ch.wordFormGroups && ch.wordFormGroups.length > 0 && (
            <section className="rounded-3xl border border-border/60 bg-card/80 p-6">
              <h2 className="mb-4 text-xl font-semibold">Bảng từ loại (100+ nhóm)</h2>
              <WordFormTable groups={ch.wordFormGroups} />
            </section>
          )}
          {ch.practiceQuestions && ch.practiceQuestions.length > 0 && (
            <div className="flex justify-end">
              <Link
                href={`/practice/${ch.slug}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Làm bài tập ({ch.practiceQuestions.length} câu) →
              </Link>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border/60 pt-6">
            {prevChapter ? (
              <Link
                href={`/giai-doan/${prevChapter.stage}/chuong/${prevChapter.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Chương {prevChapter.index}
              </Link>
            ) : <span />}
            <MarkCompleteButton chapterSlug={ch.slug} />
            {nextChapter ? (
              <Link
                href={`/giai-doan/${nextChapter.stage}/chuong/${nextChapter.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Chương {nextChapter.index} →
              </Link>
            ) : <span />}
          </div>
        </div>
      </div>
    </div>
  );
}
```

```tsx
// app/practice/[chapter]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { textbook } from "@/content/textbook";
import { QuizRunner } from "@/components/practice/QuizRunner";
import { ChevronLeft } from "lucide-react";

export function generateStaticParams() {
  return textbook.allChapters
    .filter((c) => (c.practiceQuestions?.length ?? 0) > 0)
    .map((c) => ({ chapter: c.slug }));
}

export default async function PracticePage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  const ch = textbook.allChapters.find((c) => c.slug === chapter);
  if (!ch) notFound();
  if (!ch.practiceQuestions || ch.practiceQuestions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="rounded-3xl border border-border/60 bg-card/80 p-8 text-center">
          <p className="text-muted-foreground">Chương này chưa có bài tập.</p>
          <Link href={`/giai-doan/${ch.stage}/chuong/${ch.slug}`} className="mt-4 inline-block text-sm underline">
            Quay lại chương
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
      <Link
        href={`/giai-doan/${ch.stage}/chuong/${ch.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Quay lại chương
      </Link>
      <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">Bài tập: {ch.title}</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {ch.practiceQuestions.length} câu hỏi
        </p>
        <QuizRunner chapter={ch} />
      </div>
    </div>
  );
}
```

```tsx
// app/flashcards/page.tsx
import { FlashcardStats } from "@/components/flashcards/FlashcardStats";
import { FlashcardDeck } from "@/components/flashcards/FlashcardDeck";
import { Card, CardContent } from "@/components/ui/card";

export default function FlashcardsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
      <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Flashcards (Leitner)</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ôn từ theo hệ thống gợi nhớ Leitner — nhớ lâu, học ít.
        </p>
      </div>
      <Card className="rounded-3xl border-border/60 bg-card/80 shadow-sm">
        <CardContent className="p-6">
          <FlashcardStats />
          <div className="mt-6">
            <FlashcardDeck />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test:e2e tests/e2e/catalog.spec.ts tests/e2e/reader.spec.ts tests/e2e/practice.spec.ts tests/e2e/flashcards.spec.ts`
Expected: ALL PASS.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/giai-doan/[stage]/page.tsx app/giai-doan/[stage]/chuong/[chapter]/page.tsx app/practice/[chapter]/page.tsx app/flashcards/page.tsx
git commit -m "feat: rewrite all pages as Learning Catalog"
```

## Task 5: Install missing shadcn Table component and run full verification

**Files:**
- Modify: install additional shadcn components if needed
- Test: all tests

- [ ] **Step 1: Install Table component**

```bash
pnpm dlx shadcn@latest add table --yes
```

- [ ] **Step 2: Run all tests**

Run: `pnpm test tests/unit/smoke.spec.ts tests/unit/progressStore.spec.ts tests/unit/leitner.spec.ts`
Run: `pnpm test:e2e tests/e2e/catalog.spec.ts tests/e2e/reader.spec.ts tests/e2e/practice.spec.ts tests/e2e/flashcards.spec.ts`
Run: `pnpm lint`

- [ ] **Step 3: Fix any failures, then commit**

```bash
git add -A
git commit -m "chore: install shadcn table and verify full test suite"
```

## Task 6: Delete the old plan file

```bash
rm docs/superpowers/plans/2026-06-08-learning-catalog-redesign.md
git add -u
git commit -m "chore: remove superseded partial redesign plan"
```
