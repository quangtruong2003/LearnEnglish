"use client";
import { useState, useMemo } from "react";
import { useProgress } from "@/lib/store/useProgress";
import { textbook } from "@/content/textbook";
import { buildDeckFromGroups } from "@/lib/store/seed";
import { promote, demote, isCardDue } from "@/lib/store/leitner";
import { today } from "@/lib/util/date";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export function FlashcardDeck() {
  const { progress, update } = useProgress();
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const groupById = useMemo(() => {
    const m = new Map<string, { verb: string; noun: string | null; adjective: string | null; adverb: string | null }>();
    for (const ch of textbook.allChapters) {
      for (const g of ch.wordFormGroups ?? []) m.set(g.id, g);
    }
    return m;
  }, []);

  const dueCards = useMemo(() => {
    return Object.values(progress.leitner.cards).filter((c) => isCardDue(c, today()) && !seen.has(c.groupId));
  }, [progress.leitner.cards, seen]);

  const card = dueCards[0];
  const info = card ? groupById.get(card.groupId) : null;

  const seed = () => {
    const groups = Array.from(groupById.values());
    const newCards = buildDeckFromGroups(groups);
    update((p) => {
      const next = { ...p.leitner, cards: { ...p.leitner.cards } };
      for (const c of newCards) if (!next.cards[c.groupId]) next.cards[c.groupId] = c;
      return { ...p, leitner: next };
    });
    toast.success(`Đã tạo ${newCards.length} thẻ`);
  };

  const answer = (result: "forgot" | "remembered") => {
    if (!card) return;
    update((p) => {
      const existing = p.leitner.cards[card.groupId];
      const next = result === "forgot" ? demote(existing, today()) : promote(existing, today());
      return { ...p, leitner: { ...p.leitner, cards: { ...p.leitner.cards, [card.groupId]: next } } };
    });
    setSeen((s) => new Set(s).add(card.groupId));
    setFlipped(false);
  };

  if (Object.keys(progress.leitner.cards).length === 0) {
    return (
      <Card>
        <CardContent className="p-6 space-y-3">
          <p>Chưa có thẻ nào. Bấm nút để tạo bộ {textbook.allChapters.reduce((n, c) => n + (c.wordFormGroups?.length ?? 0), 0)} thẻ từ Chương 9.</p>
          <Button onClick={seed}>Tạo bộ thẻ</Button>
        </CardContent>
      </Card>
    );
  }

  if (!card || !info) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-lg font-semibold">Hết thẻ hôm nay!</p>
          <p className="text-sm text-muted-foreground mt-1">Quay lại vào ngày mai.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">{dueCards.length} thẻ còn lại trong phiên</div>
      <Card onClick={() => setFlipped((f) => !f)} className="cursor-pointer">
        <CardContent className="p-8 min-h-[200px] flex items-center justify-center text-center">
          {flipped ? (
            <div>
              <div className="text-sm text-muted-foreground">Đáp án</div>
              <div className="text-2xl font-bold mt-2">{info.verb}</div>
              <div className="text-sm mt-2">
                Noun: {info.noun ?? "—"} · Adj: {info.adjective ?? "—"} · Adv: {info.adverb ?? "—"}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-sm text-muted-foreground">Verb</div>
              <div className="text-4xl font-bold mt-2">?</div>
              <div className="text-xs text-muted-foreground mt-3">Bấm để lật</div>
            </div>
          )}
        </CardContent>
      </Card>
      {flipped && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => answer("forgot")} className="flex-1">Quên</Button>
          <Button onClick={() => answer("remembered")} className="flex-1">Nhớ</Button>
        </div>
      )}
    </div>
  );
}
