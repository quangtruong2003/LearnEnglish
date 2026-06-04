import type { WordFormGroup } from "@/lib/content/types";

export function WordFormTable({ groups }: { groups: WordFormGroup[] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-2">Verb</th>
            <th className="text-left p-2">Noun</th>
            <th className="text-left p-2">Adjective</th>
            <th className="text-left p-2">Adverb</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.id} className="border-b border-border/50">
              <td className="p-2 font-medium">{g.verb}</td>
              <td className="p-2">{g.noun ?? "—"}</td>
              <td className="p-2">{g.adjective ?? "—"}</td>
              <td className="p-2">{g.adverb ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
