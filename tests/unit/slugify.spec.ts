import { describe, it, expect } from "vitest";
import { slugify } from "@/lib/content/slugify";

describe("slugify", () => {
  it("lowercases ascii", () => {
    expect(slugify("Parts Of Speech")).toBe("parts-of-speech");
  });
  it("strips diacritics from vietnamese", () => {
    expect(slugify("Các Loại Từ")).toBe("cac-loai-tu");
    expect(slugify("CHƯƠNG 1: CÁC LOẠI TỪ")).toBe("chuong-1-cac-loai-tu");
  });
  it("collapses non-alphanum to single dash", () => {
    expect(slugify("Câu 1 — Word Form")).toBe("cau-1-word-form");
    expect(slugify("###  A. KHÁI NIỆM")).toBe("a-khai-niem");
  });
  it("trims leading/trailing dashes", () => {
    expect(slugify("  --hello--  ")).toBe("hello");
  });
  it("returns empty for empty input", () => {
    expect(slugify("")).toBe("");
  });
});
