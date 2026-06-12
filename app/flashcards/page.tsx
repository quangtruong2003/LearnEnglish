import { FlashcardStats } from "@/components/flashcards/FlashcardStats";
import { FlashcardDeck } from "@/components/flashcards/FlashcardDeck";
import { Card, CardContent } from "@/components/ui/card";

export default function FlashcardsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
      <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Flashcards (Leitner)</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ôn từ theo hệ thống gợi nhớ Leitner — nhớ lâu, học ít.
        </p>
      </div>
      <Card className="rounded-3xl border-border/60 bg-card/80 shadow-sm">
        <CardContent className="p-6">
          <FlashcardStats />
          <div className="mt-6">
            <FlashcardDeck />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
