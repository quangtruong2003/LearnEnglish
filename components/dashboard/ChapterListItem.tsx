"use client";
import Link from "next/link";
import { useProgress } from "@/lib/store/useProgress";
import type { Chapter } from "@/lib/content/types";
import { Badge } from "@/components/ui/badge";

export function ChapterListItem({ chapter }: { chapter: Chapter }) {
  const { progress, hydrated } = useProgress();
  const chapterProg = hydrated ? progress.chapters[chapter.slug] : undefined;
  const status = chapterProg?.status ?? "unread";
  const variant = status === "completed" ? "default" : status === "in_progress" ? "secondary" : "outline";
  return (
    <li className="flex items-center justify-between p-3 border border-border rounded-md">
      <div>
        <div className="font-medium">Chương {chapter.index}: {chapter.title}</div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={variant as "default" | "secondary" | "outline" | "destructive"}>{status === "completed" ? "✓ Xong" : status === "in_progress" ? "Đang đọc" : "Chưa đọc"}</Badge>
        <Link href={`/giai-doan/${chapter.stage}/chuong/${chapter.slug}`} className="text-sm underline">Mở</Link>
      </div>
    </li>
  );
}
