"use client";
import type { PracticeChoice } from "@/lib/content/types";
import { Button } from "@/components/ui/button";

export function MultipleChoiceList({
  choices, onChoose, disabled, chosen,
}: { choices: PracticeChoice[]; onChoose: (letter: string) => void; disabled?: boolean; chosen?: string | null }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {choices.map((c) => {
        const isChosen = chosen === c.letter;
        return (
          <Button
            key={c.letter}
            variant={isChosen ? "default" : "outline"}
            className="justify-start text-left h-auto py-3"
            disabled={disabled}
            onClick={() => onChoose(c.letter)}
          >
            <span className="font-bold mr-2">{c.letter}.</span> {c.text}
          </Button>
        );
      })}
    </div>
  );
}
