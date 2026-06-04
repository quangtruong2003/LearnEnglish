import { describe, it, expect } from "vitest";
import { promote, demote, isDue, initCard, nextReviewAfter } from "@/lib/store/leitner";
import { addDays, today } from "@/lib/util/date";

describe("leitner.initCard", () => {
  it("starts in box 1 with next review = today", () => {
    const c = initCard("g1");
    expect(c.box).toBe(1);
    expect(c.nextReviewAt).toBe(today());
  });
});

describe("leitner.promote", () => {
  it("box 1 -> 2, next review = today + 1 day", () => {
    const promoted = promote(initCard("g1"), today());
    expect(promoted.box).toBe(2);
    expect(promoted.nextReviewAt).toBe(addDays(today(), 1));
    expect(promoted.lastResult).toBe("remembered");
  });
  it("box 4 -> 5, next review = today + 7 days", () => {
    let c = initCard("g1");
    for (let i = 0; i < 3; i++) c = promote(c, today());
    const promoted = promote(c, today());
    expect(promoted.box).toBe(5);
    expect(promoted.nextReviewAt).toBe(addDays(today(), 7));
  });
  it("box 5 caps at 5, next review = today + 14 days", () => {
    let c = initCard("g1");
    for (let i = 0; i < 4; i++) c = promote(c, today());
    const promoted = promote(c, today());
    expect(promoted.box).toBe(5);
    expect(promoted.nextReviewAt).toBe(addDays(today(), 14));
  });
});

describe("leitner.demote", () => {
  it("resets to box 1, next review = today + 1 day", () => {
    let c = initCard("g1");
    c = promote(c, today()); // box 2
    const d = demote(c, today());
    expect(d.box).toBe(1);
    expect(d.nextReviewAt).toBe(addDays(today(), 1));
    expect(d.lastResult).toBe("forgot");
  });
});

describe("leitner.isDue", () => {
  it("true when nextReviewAt <= ref", () => {
    expect(isDue(today(), today())).toBe(true);
    expect(isDue(addDays(today(), -1), today())).toBe(true);
    expect(isDue(addDays(today(), 1), today())).toBe(false);
  });
});

describe("leitner.nextReviewAfter (pure, no Date)", () => {
  it("box 1 = +1, 2 = +2, 3 = +4, 4 = +7, 5 = +14", () => {
    expect(nextReviewAfter(1, "2026-06-04")).toBe("2026-06-05");
    expect(nextReviewAfter(2, "2026-06-04")).toBe("2026-06-06");
    expect(nextReviewAfter(3, "2026-06-04")).toBe("2026-06-08");
    expect(nextReviewAfter(4, "2026-06-04")).toBe("2026-06-11");
    expect(nextReviewAfter(5, "2026-06-04")).toBe("2026-06-18");
  });
});
