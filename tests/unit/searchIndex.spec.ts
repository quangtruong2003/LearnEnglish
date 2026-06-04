import { describe, it, expect } from "vitest";
import { buildIndex, search } from "@/lib/search/searchIndex";
import type { Chapter, Section } from "@/lib/content/types";

const sample = (slug: string, title: string, body: string): Chapter => ({
  slug, index: 1, title, stage: "nen-tang",
  sections: [{ id: `${slug}-s1`, heading: "Intro", level: 2, body }] as Section[],
});

describe("searchIndex", () => {
  it("finds a chapter by title and by body", () => {
    const chapters = [
      sample("a", "Nouns", "A noun is a word for a person place or thing."),
      sample("b", "Verbs", "A verb expresses action or state."),
    ];
    const idx = buildIndex(chapters);
    expect(search(idx, "noun").map((r) => r.slug)).toEqual(["a"]);
    expect(search(idx, "action").map((r) => r.slug)).toEqual(["b"]);
  });
  it("handles vietnamese diacritics in query", () => {
    const chapters = [sample("a", "Danh từ", "Danh từ chỉ người vật nơi chốn.")];
    const idx = buildIndex(chapters);
    expect(search(idx, "danh tu").length).toBeGreaterThan(0);
  });
  it("returns empty array for empty query", () => {
    expect(search(buildIndex([]), "")).toEqual([]);
  });
});
