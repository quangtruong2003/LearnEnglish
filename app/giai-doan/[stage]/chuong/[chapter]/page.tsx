import { notFound } from "next/navigation";
import Link from "next/link";
import { textbook } from "@/content/textbook";
import { Reader } from "@/components/reader/Reader";
import { ChapterNav } from "@/components/reader/ChapterNav";
import { MarkCompleteButton } from "@/components/reader/MarkCompleteButton";
import { WordFormTable } from "@/components/reader/WordFormTable";

export function generateStaticParams() {
  return textbook.allChapters.map((c) => ({ stage: c.stage, chapter: c.slug }));
}

export default async function ChapterPage({ params }: { params: Promise<{ stage: string; chapter: string }> }) {
  const { stage, chapter } = await params;
  const ch = textbook.allChapters.find((c) => c.slug === chapter && c.stage === stage);
  if (!ch) notFound();
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link href={`/giai-doan/${stage}`} className="text-sm underline text-muted-foreground">← Quay lại giai đoạn</Link>
      <h1 className="text-3xl font-bold mt-2">Chương {ch.index}: {ch.title}</h1>
      <div className="flex gap-6 mt-6">
        <ChapterNav sections={ch.sections} />
        <div className="flex-1 min-w-0">
          <Reader sections={ch.sections} />
          {ch.wordFormGroups && ch.wordFormGroups.length > 0 && (
            <section className="mt-8">
              <h2>Bảng 100+ nhóm từ</h2>
              <WordFormTable groups={ch.wordFormGroups} />
            </section>
          )}
          <div className="flex justify-end mt-8">
            <MarkCompleteButton chapterSlug={ch.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
