import { notFound } from "next/navigation";
import { textbook } from "@/content/textbook";
import { ChapterListItem } from "@/components/dashboard/ChapterListItem";

export function generateStaticParams() {
  return textbook.stages.map((s) => ({ stage: s.slug }));
}

export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const s = textbook.stages.find((x) => x.slug === stage);
  if (!s) notFound();
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Giai đoạn {s.index} — {s.title.split("—")[1]?.trim()}</h1>
      <ul className="space-y-2">
        {s.chapters.map((c) => <ChapterListItem key={c.slug} chapter={c} />)}
      </ul>
    </div>
  );
}
