"use client";
import { useProgress } from "@/lib/store/useProgress";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type MarkCompleteButtonProps = {
  chapterSlug: string;
};

export function MarkCompleteButton({ chapterSlug }: MarkCompleteButtonProps) {
  const { progress, update, hydrated } = useProgress();
  if (!hydrated) return null;

  const current = progress.chapters[chapterSlug];
  const isCompleted = current?.status === "completed";

  const toggle = () => {
    update((p) => ({
      ...p,
      chapters: {
        ...p.chapters,
        [chapterSlug]: {
          status: isCompleted ? "in_progress" : "completed",
          updatedAt: new Date().toISOString(),
        },
      },
    }));
    toast.success(
      isCompleted ? "Đã bỏ đánh dấu hoàn thành" : "Đã đánh dấu hoàn thành",
      { duration: 2000 }
    );
  };

  return (
    <Button
      variant={isCompleted ? "secondary" : "default"}
      onClick={toggle}
      className="gap-2"
    >
      <CheckCircle2 className="h-4 w-4" />
      {isCompleted ? "Bỏ đánh dấu hoàn thành" : "Đánh dấu hoàn thành"}
    </Button>
  );
}
