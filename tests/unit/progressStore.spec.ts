import { describe, it, expect, beforeEach, vi } from "vitest";
import { readProgress, writeProgress, defaultProgress } from "@/lib/store/progressStore";

const KEY = "toeic.progress.v1";

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("progressStore", () => {
  it("readProgress returns default when localStorage is empty", () => {
    const p = readProgress();
    const def = defaultProgress();
    expect(p.schemaVersion).toBe(def.schemaVersion);
    expect(p.chapters).toEqual({});
    expect(p.quizResults).toEqual({});
    expect(p.leitner).toEqual({ schemaVersion: 1, cards: {} });
    expect(p.streak).toBe(null);
  });
  it("writeProgress round-trips through readProgress", () => {
    const p = defaultProgress();
    p.chapters["cac-loai-tu"] = { status: "completed", updatedAt: "2026-06-04" };
    writeProgress(p);
    const r = readProgress();
    expect(r.chapters["cac-loai-tu"]?.status).toBe("completed");
  });
  it("corrupted JSON resets to default and warns", () => {
    localStorage.setItem(KEY, "not json");
    const p = readProgress();
    const def = defaultProgress();
    expect(p.schemaVersion).toBe(def.schemaVersion);
    expect(p.leitner).toEqual({ schemaVersion: 1, cards: {} });
    expect(console.warn).toHaveBeenCalled();
  });
  it("missing schemaVersion resets to default", () => {
    localStorage.setItem(KEY, JSON.stringify({ chapters: {} }));
    const p = readProgress();
    expect(p.schemaVersion).toBe(1);
    expect(p.leitner).toEqual({ schemaVersion: 1, cards: {} });
  });
  it("schemaVersion mismatch resets to default", () => {
    localStorage.setItem(KEY, JSON.stringify({ schemaVersion: 999, chapters: {} }));
    const p = readProgress();
    expect(p.schemaVersion).toBe(1);
    expect(p.leitner).toEqual({ schemaVersion: 1, cards: {} });
  });
});
