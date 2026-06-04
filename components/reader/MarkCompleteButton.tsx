"use client";
import { useProgress } from "@/lib/store/useProgress";
import type { ChapterProgress } from "@/lib/store/progressStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function MarkCompleteButton({ chapterSlug }: { chapterSlug: string }) {
  const { progress, update } = useProgress();
  const status = progress.chapters[chapterSlug]?.status ?? "unread";
  const next = status === "completed" ? "in_progress" : "completed";
  return (
    <Button
      variant={status === "completed" ? "outline" : "default"}
      onClick={() => {
        update((p) => ({
          ...p,
          chapters: {
            ...p.chapters,
            [chapterSlug]: { status: next as ChapterProgress["status"], updatedAt: new Date().toISOString() },
          },
        }));
        toast.success(next === "completed" ? "Đã đánh dấu hoàn thành" : "Đã mở lại");
      }}
    >
      {status === "completed" ? "↺ Mở lại" : "✓ Đánh dấu hoàn thành"}
    </Button>
  );
}
