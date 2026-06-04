"use client";
import { useProgress } from "@/lib/store/useProgress";
import { getStreakStatus } from "@/lib/store/streak";
import { today } from "@/lib/util/date";
import { Badge } from "@/components/ui/badge";

export function StreakBadge() {
  const { progress, hydrated } = useProgress();
  if (!hydrated) return <Badge variant="secondary">…</Badge>;
  const status = getStreakStatus(progress.streak, today());
  const days = progress.streak?.days ?? 0;
  const label = days === 0 ? "Bắt đầu streak" : `🔥 ${days} ngày`;
  const variant = status === "broken" ? "destructive" : status === "at_risk" ? "outline" : "default";
  return <Badge variant={variant as "default" | "secondary" | "destructive" | "outline"}>{label}</Badge>;
}
