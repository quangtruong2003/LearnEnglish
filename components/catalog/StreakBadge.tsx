"use client";

import { Flame } from "lucide-react";
import { useProgress } from "@/lib/store/useProgress";

export function StreakBadge() {
  const { progress, hydrated } = useProgress();
  const days = hydrated ? progress.streak?.days ?? 0 : 0;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
      <Flame className="h-3.5 w-3.5 text-orange-400" />
      {days > 0 ? `${days} ngày liên tiếp` : "Chưa có streak"}
    </span>
  );
}
