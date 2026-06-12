"use client";
import Link from "next/link";
import type { Chapter } from "@/lib/content/types";
import { useProgress } from "@/lib/store/useProgress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type ChapterCardProps = {
  chapter: Chapter;
};

const STATUS_LABELS: Record<string, string> = {
  completed: "Hoàn thành",
  in_progress: "Đang học",
  unread: "Chưa bắt đầu",
};

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  completed: "default",
  in_progress: "secondary",
  unread: "outline",
};

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { progress, hydrated } = useProgress();
  const status = hydrated ? (progress.chapters[chapter.slug]?.status ?? "unread") : "unread";

  return (
    <Card className="rounded-3xl border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg font-semibold">Chương {chapter.index}</CardTitle>
          <Badge variant={STATUS_VARIANTS[status]}>
            {STATUS_LABELS[status]}
          </Badge>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{chapter.title}</p>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {chapter.sections.length} mục nội dung
      </CardContent>
      <CardFooter>
        <Link
          href={`/giai-doan/${chapter.stage}/chuong/${chapter.slug}`}
          className="inline-flex items-center justify-center rounded-2xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          Mở chương {chapter.index}
        </Link>
      </CardFooter>
    </Card>
  );
}
