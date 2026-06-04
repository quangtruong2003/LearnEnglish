import { FlashcardStats } from "@/components/flashcards/FlashcardStats";
import { FlashcardDeck } from "@/components/flashcards/FlashcardDeck";

export default function FlashcardsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Flashcards (Leitner)</h1>
      <FlashcardStats />
      <FlashcardDeck />
    </div>
  );
}
