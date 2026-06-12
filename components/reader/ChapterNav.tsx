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
