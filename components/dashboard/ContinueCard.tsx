"use client";
import Link from "next/link";
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
  const ch = textbook.allChapters.find((c) => c.slug === slug)!;
  return (
    <Card>
      <CardHeader><CardTitle>Tiếp tục học</CardTitle></CardHeader>
      <CardContent>
        <div className="text-sm">Chương {ch.index}: {ch.title}</div>
        <div className="text-xs text-muted-foreground">Cập nhật: {info.updatedAt.slice(0, 10)}</div>
        <Link href={`/giai-doan/${ch.stage}/chuong/${ch.slug}`} className="underline text-sm">Mở</Link>
      </CardContent>
    </Card>
  );
}
