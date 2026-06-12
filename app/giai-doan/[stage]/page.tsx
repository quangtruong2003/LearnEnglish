import { notFound } from "next/navigation";
import { textbook } from "@/content/textbook";
import { ChapterCard } from "@/components/catalog/ChapterCard";
import { ProgressSummary } from "@/components/catalog/ProgressSummary";

export function generateStaticParams() {
  return textbook.stages.map((s) => ({ stage: s.slug }));
}

const STAGE_ACCENT: Record<string, string> = {
  "nen-tang": "Nền tảng",
  "thi": "Tăng tốc",
  "tu-loai": "Bứt tốc",
};

const STAGE_PACE: Record<string, string> = {
  "nen-tang": "4 chương trọng tâm",
  "thi": "3 chương chuyên sâu",
  "tu-loai": "5 chương ứng dụng",
};

const STAGE_DESCRIPTION: Record<string, string> = {
  "nen-tang": "Củng cố nền tảng ngữ pháp để đọc câu nhanh và chắc hơn.",
  "thi": "Luyện hệ thống thì và cách nhận diện tín hiệu thời gian trong đề.",
  "tu-loai": "Tập trung word form, chiến lược Part 5 và bộ câu hỏi luyện sâu.",
};

export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const s = textbook.stages.find((x) => x.slug === stage);
  if (!s) notFound();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="space-y-3 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {STAGE_ACCENT[s.slug] ?? s.slug}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Giai đoạn {s.index}</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {STAGE_DESCRIPTION[s.slug] ?? ""}
        </p>
        <p className="text-sm font-medium">{STAGE_PACE[s.slug] ?? ""}</p>
      </section>
      <ProgressSummary totalChapters={s.chapters.length} />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {s.chapters.map((chapter) => (
          <ChapterCard key={chapter.slug} chapter={chapter} />
        ))}
      </section>
    </div>
  );
}
