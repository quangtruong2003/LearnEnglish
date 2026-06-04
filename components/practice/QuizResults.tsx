"use client";
import Link from "next/link";
import type { Chapter, PracticeQuestion } from "@/lib/content/types";
import type { QuizResult, Answer } from "@/lib/store/quizSession";
import { Button } from "@/components/ui/button";

export function QuizResults({ chapter, questions, answers, result, onRestart }: {
  chapter: Chapter; questions: PracticeQuestion[]; answers: Answer[]; result: QuizResult; onRestart: () => void;
}) {
  const byQ = new Map(answers.map((a) => [a.questionId, a.chosen]));
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Kết quả: {result.scorePct}%</h2>
      <p>{result.correctCount}/{questions.length} câu đúng</p>
      <div className="space-y-4">
        {questions.map((q, i) => {
          const c = byQ.get(q.id);
          return (
            <div key={q.id} className={`p-3 rounded-md border ${c?.toLowerCase() === q.answer.toLowerCase() ? "border-green-500/40" : "border-red-500/40"}`}>
              <div className="text-sm text-muted-foreground">Câu {i + 1}</div>
              <div className="whitespace-pre-wrap">{q.prompt}</div>
              <div className="text-sm mt-1">Bạn chọn: <strong>{c ?? "(bỏ trống)"}</strong> · Đáp án: <strong>{q.answer}</strong></div>
              <div className="text-sm text-muted-foreground mt-1">{q.explanation}</div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Button onClick={onRestart}>Làm lại</Button>
        <Link href={`/giai-doan/${chapter.stage}/chuong/${chapter.slug}`} className="underline text-sm self-center">Về chương</Link>
      </div>
    </div>
  );
}
