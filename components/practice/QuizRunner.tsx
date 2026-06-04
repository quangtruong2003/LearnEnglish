"use client";
import { useState } from "react";
import type { Chapter } from "@/lib/content/types";
import { FillInBlankInput } from "./FillInBlankInput";
import { MultipleChoiceList } from "./MultipleChoiceList";
import { QuizResults } from "./QuizResults";
import { scoreQuiz, type Answer } from "@/lib/store/quizSession";
import { useProgress } from "@/lib/store/useProgress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateStreak } from "@/lib/store/streak";
import { today } from "@/lib/util/date";

export function QuizRunner({ chapter }: { chapter: Chapter }) {
  const qs = chapter.practiceQuestions ?? [];
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { update } = useProgress();
  const q = qs[idx];
  if (qs.length === 0) return <p>Chương này chưa có bài tập.</p>;
  if (!q) {
    const result = scoreQuiz(qs, answers);
    return <QuizResults chapter={chapter} questions={qs} answers={answers} result={result} onRestart={() => { setIdx(0); setAnswers([]); setChosen(null); setRevealed(false); }} />;
  }
  const submitChosen = (val: string) => {
    setChosen(val);
    setRevealed(true);
  };
  const advance = () => {
    setAnswers((a) => [...a, { questionId: q.id, chosen }]);
    if (idx + 1 === qs.length) {
      const finalAnswers = [...answers, { questionId: q.id, chosen }];
      const r = scoreQuiz(qs, finalAnswers);
      update((p) => {
        const next = { ...p };
        next.quizResults = { ...p.quizResults, [chapter.slug]: [
          { id: crypto.randomUUID(), chapterSlug: chapter.slug, startedAt: new Date().toISOString(), finishedAt: new Date().toISOString(), answers: r.answers, scorePct: r.scorePct },
          ...(p.quizResults[chapter.slug] ?? []),
        ].slice(0, 20) };
        next.streak = updateStreak(p.streak, today());
        return next;
      });
      toast.success(`Hoàn thành! Điểm: ${r.scorePct}%`);
    }
    setIdx(idx + 1);
    setChosen(null);
    setRevealed(false);
  };
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">Câu {idx + 1} / {qs.length}</div>
      <div className="text-lg whitespace-pre-wrap">{q.prompt}</div>
      {q.kind === "fill_in_blank" ? (
        <FillInBlankInput onSubmit={submitChosen} disabled={revealed} />
      ) : (
        <MultipleChoiceList choices={q.choices!} onChoose={submitChosen} disabled={revealed} chosen={chosen} />
      )}
      {revealed && (
        <div className={`p-3 rounded-md ${chosen && chosen.toLowerCase() === q.answer.toLowerCase() ? "bg-green-500/10" : "bg-red-500/10"}`}>
          <div className="font-semibold">Đáp án: {q.answer}</div>
          <div className="text-sm text-muted-foreground mt-1">{q.explanation}</div>
        </div>
      )}
      <div className="flex justify-end">
        <Button onClick={advance} disabled={!revealed}>Câu tiếp</Button>
      </div>
    </div>
  );
}
