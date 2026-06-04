import { describe, it, expect } from "vitest";
import { today, addDays, isDue } from "@/lib/util/date";

describe("date util", () => {
  it("today returns local ISO date (YYYY-MM-DD)", () => {
    expect(today(new Date("2026-06-04T15:00:00"))).toBe("2026-06-04");
  });
  it("addDays moves forward by N local days", () => {
    expect(addDays("2026-06-04", 3)).toBe("2026-06-07");
    expect(addDays("2026-06-04", -1)).toBe("2026-06-03");
  });
  it("addDays handles month boundary", () => {
    expect(addDays("2026-06-30", 1)).toBe("2026-07-01");
  });
  // isDue(nextReviewAt, today): card is due when its next review date
  // has arrived or passed (card scheduled on or before today)
  it("isDue: true when card scheduled on or before today", () => {
    expect(isDue("2026-06-04", "2026-06-04")).toBe(true);  // due today
    expect(isDue("2026-06-04", "2026-06-05")).toBe(true);  // overdue (past due date)
    expect(isDue("2026-06-05", "2026-06-04")).toBe(false); // not yet due
    expect(isDue("2026-06-04", "2026-05-30")).toBe(false); // review date is in the future
  });
});
