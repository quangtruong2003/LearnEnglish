import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseTextbook } from "@/lib/content/parseTextbook";

describe("parseTextbook (golden)", () => {
  const md = readFileSync(join(process.cwd(), "GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md"), "utf8");
  const book = parseTextbook(md);

  it("detects 3 stages", () => {
    expect(book.stages.map((s) => s.slug)).toEqual(["nen-tang", "thi", "tu-loai"]);
  });

  it("each stage has chapters", () => {
    expect(book.stages[0].chapters.length).toBeGreaterThan(0);
    expect(book.stages[1].chapters.length).toBeGreaterThan(0);
    expect(book.stages[2].chapters.length).toBeGreaterThan(0);
  });

  it("first chapter is 'CÁC LOẠI TỪ'", () => {
    expect(book.allChapters[0].title).toContain("CÁC LOẠI TỪ");
  });

  it("chapter 9 has 100+ word-form groups", () => {
    const ch9 = book.allChapters.find((c) => c.slug === "word-form-toeic-bang-100-nhom-tu")!;
    expect(ch9.wordFormGroups!.length).toBeGreaterThanOrEqual(100);
    expect(ch9.wordFormGroups![0]).toMatchObject({ verb: "develop" });
  });

  it("section bodies contain substantial markdown", () => {
    const ch1 = book.allChapters[0];
    const totalChars = ch1.sections.reduce((n, s) => n + s.body.length, 0);
    expect(totalChars).toBeGreaterThan(20000);
  });
});
