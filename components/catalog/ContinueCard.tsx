"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProgress } from "@/lib/store/useProgress";
import { textbook } from "@/content/textbook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChapterProgress } from "@/lib/store/progressStore";

export function ContinueCard() {
  const { progress, hydrated } = useProgress();
  if (!hydrated) return null;

  const last = (Object.entries(progress.chapters) as [string, ChapterProgress][])
    .filter(([, v]) => v.status !== "unread")
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))[0];
  if (!last) return null;

  const [slug, info] = last;
  const chapter = textbook.allChapters.find((c) => c.slug === slug);
  if (!chapter) return null;

  const stageLabel = chapter.stage === "nen-tang" ? 1 : chapter.stage === "thi" ? 2 : 3;

  return (
    <Card className="rounded-3xl border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Tiếp tục bài đang học</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Giai đoạn {stageLabel}</p>
          <p className="text-lg font-medium">Chương {chapter.index}: {chapter.title}</p>
          <p className="text-xs text-muted-foreground">
            Cập nhật: {info.updatedAt.slice(0, 10)}
          </p>
        </div>
        <Link
          href={`/giai-doan/${chapter.stage}/chuong/${chapter.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Mở lại bài học
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
