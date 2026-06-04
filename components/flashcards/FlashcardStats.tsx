"use client";
import { useProgress } from "@/lib/store/useProgress";
import { textbook } from "@/content/textbook";
import { isCardDue } from "@/lib/store/leitner";
import { today } from "@/lib/util/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FlashcardStats() {
  const { progress, hydrated } = useProgress();
  if (!hydrated) return null;
  const allCards = Object.values(progress.leitner.cards);
  const due = allCards.filter((c) => isCardDue(c, today())).length;
  const boxes: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const c of allCards) boxes[c.box] = (boxes[c.box] ?? 0) + 1;
  return (
    <Card>
      <CardHeader><CardTitle>Flashcards</CardTitle></CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{due} thẻ cần ôn hôm nay</div>
        <div className="text-sm text-muted-foreground mt-2">
          Box 1: {boxes[1]} · 2: {boxes[2]} · 3: {boxes[3]} · 4: {boxes[4]} · 5: {boxes[5]}
        </div>
      </CardContent>
    </Card>
  );
}
