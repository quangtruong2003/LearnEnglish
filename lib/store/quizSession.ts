import type { PracticeQuestion } from "../content/types";

export type Answer = { questionId: string; chosen: string | null };

export type QuizResult = {
  answers: { questionId: string; chosen: string | null; correct: boolean }[];
  correctCount: number;
  scorePct: number;
};

export function normalizeAnswer(s: string): string {
  return s.toLowerCase().trim().replace(/^(a|an|the)\s+/, "");
}

export function scoreQuiz(questions: Pick<PracticeQuestion, "id" | "answer">[], answers: Answer[]): QuizResult {
  const byId = new Map(answers.map((a) => [a.questionId, a.chosen]));
  const detail = questions.map((q) => {
    const chosen = byId.get(q.id) ?? null;
    const correct = chosen !== null && normalizeAnswer(chosen) === normalizeAnswer(q.answer);
    return { questionId: q.id, chosen, correct };
  });
  const correctCount = detail.filter((d) => d.correct).length;
  const scorePct = questions.length === 0 ? 0 : Math.round((correctCount / questions.length) * 100);
  return { answers: detail, correctCount, scorePct };
}
