export type ISODate = string; // "YYYY-MM-DD"

export function today(now: Date = new Date()): ISODate {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: ISODate, days: number): ISODate {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

// Card is due when nextReviewAt is on or before ref date
export function isDue(nextReviewAt: ISODate, ref: ISODate): boolean {
  const [ny, nm, nd] = nextReviewAt.split("-").map(Number);
  const [ry, rm, rd] = ref.split("-").map(Number);
  if (ny !== ry) return ny <= ry;
  if (nm !== rm) return nm <= rm;
  return nd <= rd;
}
