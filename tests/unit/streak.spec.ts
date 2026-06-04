import { describe, it, expect } from "vitest";
import { updateStreak, getStreakStatus } from "@/lib/store/streak";

describe("updateStreak", () => {
  it("first study ever sets streak to 1", () => {
    const s = updateStreak(null, "2026-06-04");
    expect(s).toEqual({ lastStudyDate: "2026-06-04", days: 1 });
  });
  it("same day as last study does not increment", () => {
    const a = updateStreak(null, "2026-06-04");
    const b = updateStreak(a, "2026-06-04");
    expect(b.days).toBe(1);
  });
  it("day after last study increments", () => {
    const a = updateStreak(null, "2026-06-04");
    const b = updateStreak(a, "2026-06-05");
    expect(b.days).toBe(2);
  });
  it("gap > 1 day resets to 1", () => {
    const a = updateStreak(null, "2026-06-04");
    const b = updateStreak(a, "2026-06-10");
    expect(b.days).toBe(1);
  });
});

describe("getStreakStatus", () => {
  it("returns 'active' when last study is today", () => {
    expect(getStreakStatus({ lastStudyDate: "2026-06-04", days: 3 }, "2026-06-04")).toBe("active");
  });
  it("returns 'at_risk' when last study is yesterday", () => {
    expect(getStreakStatus({ lastStudyDate: "2026-06-03", days: 3 }, "2026-06-04")).toBe("at_risk");
  });
  it("returns 'broken' when gap > 1", () => {
    expect(getStreakStatus({ lastStudyDate: "2026-06-01", days: 3 }, "2026-06-04")).toBe("broken");
  });
});
