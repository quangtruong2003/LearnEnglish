import { describe, it, expect } from "vitest";
import { parsePracticeAnswers } from "@/lib/content/parsePracticeTable";

describe("parsePracticeAnswers", () => {
  it("parses a multiple-choice answer table (5 cols: Câu, A, B, C, D, Giải thích)", () => {
    // This covers the answer tables in Ch1-Ch8 which use letter answers
    const block = `
| Câu | Đáp án | Giải thích |
|---|---|---|
| 1 | B | After possessive: cần danh từ |
| 2 | C | Noun after the |
`;
    const results = parsePracticeAnswers(block);
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({ ordinal: 1, answer: "B" });
    expect(results[1]).toMatchObject({ ordinal: 2, answer: "C" });
  });

  it("parses a word-form answer table (4 cols: Câu, Đáp án, Từ loại, Giải thích)", () => {
    // This covers the word-form answer tables in Ch9-Ch12 which use word answers
    const block = `
| Câu | Đáp án | Từ loại | Giải thích |
|---|---|---|---|
| 1 | expansion | Danh từ | đuôi -tion |
| 2 | decision | Danh từ | đuôi -sion |
`;
    const results = parsePracticeAnswers(block);
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({ ordinal: 1, answer: "expansion", partOfSpeech: "Danh từ" });
    expect(results[1]).toMatchObject({ ordinal: 2, answer: "decision", partOfSpeech: "Danh từ" });
  });

  it("handles cells with extra whitespace", () => {
    const block = `
| Câu | Đáp án | Từ loại | Giải thích |
|---|---|---|---|
| 1 | expansion | Danh từ | test |
`;
    const results = parsePracticeAnswers(block);
    expect(results[0].answer).toBe("expansion");
  });
});
