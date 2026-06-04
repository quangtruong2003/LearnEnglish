"use client";
import Link from "next/link";
import { useProgress } from "@/lib/store/useProgress";
import { textbook } from "@/content/textbook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressCard({ stageIndex }: { stageIndex: 1 | 2 | 3 }) {
  const stage = textbook.stages[stageIndex - 1];
  const { progress, hydrated } = useProgress();
  const total = stage.chapters.length;
  const done = hydrated ? stage.chapters.filter((c) => progress.chapters[c.slug]?.status === "completed").length : 0;
  const pct = Math.round((done / total) * 100);
  return (
    <Card>
      <CardHeader><CardTitle>Giai đoạn {stage.index}</CardTitle></CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">{stage.title.split("—")[1]?.trim()}</div>
        <Progress value={pct} />
        <div className="text-sm mt-2">{done}/{total} chương</div>
        <Link href={`/giai-doan/${stage.slug}`} className="text-sm underline mt-2 inline-block">Mở</Link>
      </CardContent>
    </Card>
  );
}
