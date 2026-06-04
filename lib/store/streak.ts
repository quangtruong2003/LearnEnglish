import { addDays, type ISODate } from "../util/date";

export type Streak = { lastStudyDate: ISODate; days: number };
export type StreakStatus = "active" | "at_risk" | "broken" | "none";

export function updateStreak(prev: Streak | null, today: ISODate): Streak {
  if (!prev) return { lastStudyDate: today, days: 1 };
  if (prev.lastStudyDate === today) return prev;
  if (prev.lastStudyDate === addDays(today, -1)) return { lastStudyDate: today, days: prev.days + 1 };
  return { lastStudyDate: today, days: 1 };
}

export function getStreakStatus(prev: Streak | null, today: ISODate): StreakStatus {
  if (!prev) return "none";
  if (prev.lastStudyDate === today) return "active";
  if (prev.lastStudyDate === addDays(today, -1)) return "at_risk";
  return "broken";
}
