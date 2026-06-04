import { initCard, type LeitnerCard } from "./leitner";
import type { WordFormGroup } from "../content/types";

export function buildDeckFromGroups(groups: WordFormGroup[]): LeitnerCard[] {
  return groups.map((g) => initCard(g.id));
}
