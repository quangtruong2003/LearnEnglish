import { describe, it, expect } from "vitest";
import { buildDeckFromGroups } from "@/lib/store/seed";
import { today } from "@/lib/util/date";

describe("buildDeckFromGroups", () => {
  it("returns a card per group, all in box 1, due today", () => {
    const groups = [
      { id: "g1", verb: "develop", noun: "development", adjective: null, adverb: null },
      { id: "g2", verb: "decide", noun: "decision", adjective: "decisive", adverb: null },
    ];
    const cards = buildDeckFromGroups(groups);
    expect(cards).toHaveLength(2);
    expect(cards[0].box).toBe(1);
    expect(cards[0].nextReviewAt).toBe(today());
    expect(cards[0].groupId).toBe("g1");
  });
  it("skips groups with no derivative forms at all (rare)", () => {
    const cards = buildDeckFromGroups([{ id: "g1", verb: "g1", noun: null, adjective: null, adverb: null }]);
    expect(cards).toHaveLength(1);
  });
});
