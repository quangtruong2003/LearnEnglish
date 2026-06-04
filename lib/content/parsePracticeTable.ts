import type { PracticeAnswer } from "./types";

export function parsePracticeAnswers(block: string): PracticeAnswer[] {
  const rows = block.split(/\r?\n/).filter((l) => l.startsWith("|"));
  const data = rows
    .slice(1) // drop header
    .map(splitRow)
    .filter((c) => c.length >= 3 && /^\d+$/.test(c[0]));

  return data.map((c) => {
    // Word-form table: 4+ cols, col[2] is a part-of-speech keyword
    // MC table: 3 cols, col[2] is explanation (no POS keyword)
    if (c.length >= 4 && isPartOfSpeechKeyword(c[2] ?? "")) {
      return {
        ordinal: Number(c[0]),
        answer: c[1]?.trim() ?? "",
        partOfSpeech: normalizePos(c[2] ?? ""),
        explanation: c[3]?.trim() ?? "",
      };
    } else {
      // MC: no part of speech column
      return {
        ordinal: Number(c[0]),
        answer: c[1]?.trim() ?? "",
        partOfSpeech: "Khác" as const,
        explanation: c.slice(2).join(" ").trim(),
      };
    }
  });
}

function splitRow(line: string): string[] {
  return line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((s) => s.trim());
}

function isPartOfSpeechKeyword(s: string): boolean {
  return /^(Danh từ|Động từ|Tính từ|Trạng từ|Khác)$/.test(s.trim());
}

function normalizePos(raw: string): PracticeAnswer["partOfSpeech"] {
  if (raw.includes("Danh từ")) return "Danh từ";
  if (raw.includes("Động từ")) return "Động từ";
  if (raw.includes("Tính từ")) return "Tính từ";
  if (raw.includes("Trạng từ")) return "Trạng từ";
  return "Khác";
}
