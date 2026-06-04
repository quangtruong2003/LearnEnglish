import { z } from "zod";

const KEY = "toeic.progress.v1";

const ChapterProgressSchema = z.object({
  status: z.enum(["unread", "in_progress", "completed"]),
  updatedAt: z.string(),
  scrollPosition: z.number().optional(),
});

const QuizAnswerSchema = z.object({
  questionId: z.string(),
  chosen: z.union([z.enum(["A", "B", "C", "D"]), z.string(), z.null()]),
  correct: z.boolean(),
});

const QuizRunSchema = z.object({
  id: z.string(),
  chapterSlug: z.string(),
  startedAt: z.string(),
  finishedAt: z.string(),
  answers: z.array(QuizAnswerSchema),
  scorePct: z.number().min(0).max(100),
});

const LeitnerCardSchema = z.object({
  groupId: z.string(),
  box: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  nextReviewAt: z.string(),
  lastResult: z.enum(["unknown", "forgot", "remembered"]),
});

const StreakSchema = z.object({ lastStudyDate: z.string(), days: z.number().int().min(0) });

const ProgressSchema = z.object({
  schemaVersion: z.literal(1),
  chapters: z.record(ChapterProgressSchema),
  quizResults: z.record(z.array(QuizRunSchema)),
  leitner: z.object({ schemaVersion: z.literal(1), cards: z.record(LeitnerCardSchema) }),
  streak: StreakSchema.nullable(),
  updatedAt: z.string(),
});

export type ChapterProgress = z.infer<typeof ChapterProgressSchema>;
export type QuizRunResult = z.infer<typeof QuizRunSchema>;
export type LeitnerCard = z.infer<typeof LeitnerCardSchema>;
export type Streak = z.infer<typeof StreakSchema>;
export type Progress = z.infer<typeof ProgressSchema>;

export function defaultProgress(): Progress {
  return {
    schemaVersion: 1,
    chapters: {},
    quizResults: {},
    leitner: { schemaVersion: 1, cards: {} },
    streak: null,
    updatedAt: new Date().toISOString(),
  };
}

export function readProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress();
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return defaultProgress();
  try {
    const parsed = JSON.parse(raw);
    const r = ProgressSchema.safeParse(parsed);
    if (!r.success) {
      console.warn("[progressStore] schema mismatch, resetting:", r.error.issues.slice(0, 3));
      return defaultProgress();
    }
    return r.data;
  } catch (e) {
    console.warn("[progressStore] JSON parse failed, resetting", e);
    return defaultProgress();
  }
}

export function writeProgress(p: Progress): void {
  if (typeof window === "undefined") return;
  const next = { ...p, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(KEY, JSON.stringify(next));
}
