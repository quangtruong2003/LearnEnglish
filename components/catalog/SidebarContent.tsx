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
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
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
      </nav>
      <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-3">
        <span className="text-sm text-muted-foreground">Giao diện</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
