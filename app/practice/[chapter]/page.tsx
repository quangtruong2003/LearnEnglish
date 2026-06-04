import { notFound } from "next/navigation";
import { textbook } from "@/content/textbook";
import { QuizRunner } from "@/components/practice/QuizRunner";
import Link from "next/link";

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
    return <div className="p-6">Chương này chưa có bài tập. <Link href={`/giai-doan/${ch.stage}/chuong/${ch.slug}`} className="underline">Về chương</Link></div>;
  }
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <Link href={`/giai-doan/${ch.stage}/chuong/${ch.slug}`} className="text-sm underline text-muted-foreground">← Về chương</Link>
      <h1 className="text-2xl font-bold">Bài tập: {ch.title}</h1>
      <QuizRunner chapter={ch} />
    </div>
  );
}
