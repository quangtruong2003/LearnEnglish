import MiniSearch from "minisearch";
import type { Chapter } from "../content/types";

type Doc = { id: string; slug: string; title: string; body: string };

export function buildIndex(chapters: Pick<Chapter, "slug" | "title" | "sections">[]): MiniSearch<Doc> {
  const idx = new MiniSearch<Doc>({
    fields: ["title", "body"],
    storeFields: ["slug", "title"],
    idField: "id",
    searchOptions: { boost: { title: 2 } },
  });
  const docs: Doc[] = chapters.map((c) => ({
    id: c.slug,
    slug: c.slug,
    title: c.title,
    body: c.sections.map((s) => s.body).join("\n"),
  }));
  idx.addAll(docs);
  return idx;
}

export function search(idx: MiniSearch<Doc>, q: string): { slug: string; title: string }[] {
  if (!q.trim()) return [];
  return idx.search(q).map((r) => ({ slug: r.slug as string, title: r.title as string }));
}
