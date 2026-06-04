"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { textbook } from "@/content/textbook";
import { buildIndex, search } from "@/lib/search/searchIndex";

export function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const idx = useMemo(() => buildIndex(textbook.allChapters), []);
  const results = useMemo(() => (q ? search(idx, q).slice(0, 6) : []), [q, idx]);
  return (
    <div className="relative">
      <Input placeholder="Tìm trong giáo trình…" value={q} onChange={(e) => setQ(e.target.value)} />
      {results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-md">
          {results.map((r) => (
            <li key={r.slug}>
              <button
                className="block w-full text-left px-3 py-2 text-sm hover:bg-accent"
                onClick={() => {
                  const ch = textbook.allChapters.find((c) => c.slug === r.slug)!;
                  router.push(`/giai-doan/${ch.stage}/chuong/${ch.slug}`);
                  setQ("");
                }}
              >
                {r.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
