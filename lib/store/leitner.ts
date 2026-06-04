import type { ISODate } from "../util/date";
import { addDays, isDue as utilIsDue, today as _today } from "../util/date";
import type { LeitnerCard as LeitnerCardType } from "./progressStore";

export type LeitnerCard = LeitnerCardType;

export function initCard(groupId: string, now: Date = new Date()): LeitnerCard {
  return { groupId, box: 1, nextReviewAt: _today(now), lastResult: "unknown" };
}

// REVIEW_GAPS[box] = days from review to next review when card is at this box
const REVIEW_GAPS: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 14 };

export function nextReviewAfter(box: 1 | 2 | 3 | 4 | 5, ref: ISODate): ISODate {
  return addDays(ref, REVIEW_GAPS[box]);
}

export function promote(card: LeitnerCard, ref: ISODate): LeitnerCard {
  const nextBox = (Math.min(card.box + 1, 5)) as 1 | 2 | 3 | 4 | 5;
  return { ...card, box: nextBox, nextReviewAt: nextReviewAfter(card.box, ref), lastResult: "remembered" };
}

export function demote(card: LeitnerCard, ref: ISODate): LeitnerCard {
  return { ...card, box: 1, nextReviewAt: addDays(ref, 1), lastResult: "forgot" };
}

export function isCardDue(card: LeitnerCard, ref: ISODate): boolean {
  return utilIsDue(card.nextReviewAt, ref);
}

export { isDue } from "../util/date";
