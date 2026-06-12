import { notFound } from "next/navigation";
import Link from "next/link";
import { textbook } from "@/content/textbook";
import { QuizRunner } from "@/components/practice/QuizRunner";
import { ChevronLeft } from "lucide-react";

export function generateStaticParams() {
  return textbook.allChapters
    .filter((c) => (c.practiceQuestions?.length ?? 0) > 0)
    .map((c) => ({ chapter: c.slug }));
}

export default async function PracticePage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  const ch = textbook.allChapters.find((c) => c.slug === chapter);
  if (!ch) notFound();
  if (!ch.practiceQuestions || ch.practiceQuestions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="rounded-3xl border border-border/60 bg-card/80 p-8 text-center">
          <p className="text-muted-foreground">Chương này chưa có bài tập.</p>
          <Link href={`/giai-doan/${ch.stage}/chuong/${ch.slug}`} className="mt-4 inline-block text-sm underline">
            Quay lại chương
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
      <Link
        href={`/giai-doan/${ch.stage}/chuong/${ch.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Quay lại chương
      </Link>
      <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">Bài tập: {ch.title}</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {ch.practiceQuestions.length} câu hỏi
        </p>
        <QuizRunner chapter={ch} />
      </div>
    </div>
  );
}
