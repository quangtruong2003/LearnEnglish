"use client";
import { useProgress } from "@/lib/store/useProgress";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

type ProgressSummaryProps = {
  totalChapters: number;
};

export function ProgressSummary({ totalChapters }: ProgressSummaryProps) {
  const { progress, hydrated } = useProgress();
  const completed = hydrated
    ? Object.values(progress.chapters).filter((c) => c.status === "completed").length
    : 0;
  const pct = Math.round((completed / totalChapters) * 100);

  return (
    <Card className="rounded-3xl border-border/60 bg-card/80 shadow-sm">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tiến độ giai đoạn</span>
          <span className="font-medium">{completed}/{totalChapters} chương</span>
        </div>
        <Progress value={pct} className="h-2" />
      </CardContent>
    </Card>
  );
}
