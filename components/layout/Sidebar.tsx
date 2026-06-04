import Link from "next/link";
import { textbook } from "@/content/textbook";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-72 flex-col border-r border-border h-screen sticky top-0 p-4 gap-4">
      <Link href="/" className="text-lg font-bold">TOEIC 45 ngày</Link>
      <SearchBar />
      <nav className="flex flex-col gap-3 overflow-y-auto">
        {textbook.stages.map((stage) => (
          <div key={stage.slug}>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Giai đoạn {stage.index}
            </div>
            <ul className="flex flex-col gap-1">
              {stage.chapters.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/giai-doan/${stage.slug}/chuong/${c.slug}`}
                    className="text-sm hover:underline"
                  >
                    {c.index}. {c.title.split("(")[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link href="/flashcards" className="text-sm font-medium mt-2">⚡ Flashcards</Link>
      </nav>
      <div className="mt-auto"><ThemeToggle /></div>
    </aside>
  );
}
