"use client";
import type { Section } from "@/lib/content/types";

export function ChapterNav({ sections }: { sections: Section[] }) {
  return (
    <nav className="hidden lg:block w-56 shrink-0 sticky top-4 self-start p-2 text-sm">
      <div className="font-semibold mb-2">Mục lục chương</div>
      <ul className="space-y-1">
        {sections.filter((s) => s.level <= 3).map((s) => (
          <li key={s.id} className={s.level === 3 ? "pl-3" : ""}>
            <a href={`#${s.id}`} className="hover:underline text-muted-foreground">{s.heading}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
