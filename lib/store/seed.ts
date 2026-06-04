import { initCard, type LeitnerCard } from "./leitner";
import { today } from "../util/date";
import type { WordFormGroup } from "../content/types";

export function buildDeckFromGroups(groups: Pick<WordFormGroup, "id">[]): LeitnerCard[] {
  return groups.map((g) => initCard(g.id));
}
