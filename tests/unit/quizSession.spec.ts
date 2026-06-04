import { describe, it, expect } from "vitest";
import { scoreQuiz, normalizeAnswer } from "@/lib/store/quizSession";

describe("scoreQuiz", () => {
  it("counts correct answers and computes percent", () => {
    const questions = [
      { id: "q1", kind: "fill_in_blank" as const, answer: "expansion" },
      { id: "q2", kind: "fill_in_blank" as const, answer: "decision" },
      { id: "q3", kind: "multiple_choice" as const, answer: "C" },
    ];
    const answers = [
      { questionId: "q1", chosen: "expansion" },
      { questionId: "q2", chosen: "decision " },
      { questionId: "q3", chosen: "A" },
    ];
    const r = scoreQuiz(questions, answers);
    expect(r.correctCount).toBe(2);
    expect(r.scorePct).toBe(67);
  });
  it("null chosen is always wrong", () => {
    const questions = [{ id: "q1", kind: "fill_in_blank" as const, answer: "x" }];
    const r = scoreQuiz(questions, [{ questionId: "q1", chosen: null }]);
    expect(r.correctCount).toBe(0);
    expect(r.scorePct).toBe(0);
  });
});

describe("normalizeAnswer", () => {
  it("lowercases, trims, removes articles", () => {
    expect(normalizeAnswer("The Decision")).toBe("decision");
    expect(normalizeAnswer("  EXPANSION  ")).toBe("expansion");
    expect(normalizeAnswer("a user")).toBe("user");
  });
  it("does not strip a/an in middle of word", () => {
    expect(normalizeAnswer("maintain")).toBe("maintain");
  });
});
