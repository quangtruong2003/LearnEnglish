"use client";
import Link from "next/link";
import type { Stage } from "@/lib/content/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type StageCardProps = {
  stage: Stage;
  completedChapters: number;
};

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

export function StageCard({ stage, completedChapters }: StageCardProps) {
  const total = stage.chapters.length;
  const pct = Math.round((completedChapters / total) * 100);
  const statusLabel =
    completedChapters === total
      ? "Hoàn thành"
      : completedChapters > 0
        ? "Đang học"
        : "Chưa bắt đầu";

  return (
    <Card className="flex h-full flex-col rounded-3xl border-border/60 bg-card/90 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
            {STAGE_ACCENT[stage.slug] ?? stage.slug}
          </Badge>
          <span className="text-xs text-muted-foreground">{STAGE_PACE[stage.slug] ?? ""}</span>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold">Giai đoạn {stage.index}</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            {stage.title.replace(/#+\s*/, "").split("—")[1]?.trim() ?? stage.title}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="rounded-2xl bg-muted/50 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-medium">{completedChapters}/{total} chương</span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Trạng thái</span>
          <span className="font-medium">{statusLabel}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/giai-doan/${stage.slug}`}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Mở giai đoạn {stage.index}
        </Link>
      </CardFooter>
    </Card>
  );
}
