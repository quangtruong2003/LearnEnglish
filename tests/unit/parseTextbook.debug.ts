import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseTextbook } from "@/lib/content/parseTextbook";

const md = readFileSync(join(process.cwd(), "GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md"), "utf8");
const book = parseTextbook(md);

// Debug: log what stages were created
console.log("STAGES:", book.stages.map(s => ({ slug: s.slug, title: s.title, chapterCount: s.chapters.length })));
