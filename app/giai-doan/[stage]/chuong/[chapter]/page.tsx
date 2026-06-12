import { notFound } from "next/navigation";
import Link from "next/link";
import { textbook } from "@/content/textbook";
import { Reader } from "@/components/reader/Reader";
import { ChapterNav } from "@/components/reader/ChapterNav";
import { MarkCompleteButton } from "@/components/reader/MarkCompleteButton";
import { WordFormTable } from "@/components/reader/WordFormTable";
import { ChevronLeft } from "lucide-react";

export function generateStaticParams() {
  return textbook.allChapters.map((c) => ({ stage: c.stage, chapter: c.slug }));
}

export default async function ChapterPage({ params }: { params: Promise<{ stage: string; chapter: string }> }) {
  const { stage, chapter } = await params;
  const ch = textbook.allChapters.find((c) => c.slug === chapter && c.stage === stage);
  if (!ch) notFound();

  const prevChapter = textbook.allChapters.find((c) => c.index === ch.index - 1 && c.stage === ch.stage);
  const nextChapter = textbook.allChapters.find((c) => c.index === ch.index + 1 && c.stage === ch.stage);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href={`/giai-doan/${stage}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Quay lại giai đoạn
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Chương {ch.index}: {ch.title}</h1>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <ChapterNav sections={ch.sections} />
        <div className="flex-1 min-w-0 space-y-8">
          <Reader sections={ch.sections} />
          {ch.wordFormGroups && ch.wordFormGroups.length > 0 && (
            <section className="rounded-3xl border border-border/60 bg-card/80 p-6">
              <h2 className="mb-4 text-xl font-semibold">Bảng từ loại (100+ nhóm)</h2>
              <WordFormTable groups={ch.wordFormGroups} />
            </section>
          )}
          {ch.practiceQuestions && ch.practiceQuestions.length > 0 && (
            <div className="flex justify-end">
              <Link
                href={`/practice/${ch.slug}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Làm bài tập ({ch.practiceQuestions.length} câu) →
              </Link>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border/60 pt-6">
            {prevChapter ? (
              <Link
                href={`/giai-doan/${prevChapter.stage}/chuong/${prevChapter.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Chương {prevChapter.index}
              </Link>
            ) : <span />}
            <MarkCompleteButton chapterSlug={ch.slug} />
            {nextChapter ? (
              <Link
                href={`/giai-doan/${nextChapter.stage}/chuong/${nextChapter.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Chương {nextChapter.index} →
              </Link>
            ) : <span />}
          </div>
        </div>
      </div>
    </div>
  );
}
