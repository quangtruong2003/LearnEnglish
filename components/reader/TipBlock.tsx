import type { Section } from "@/lib/content/types";

export function TipBlock({ sections }: { sections: Pick<Section, "id" | "heading" | "body">[] }) {
  return (
    <div className="not-prose my-4 space-y-2">
      {sections.map((s) => (
        <div key={s.id} className="border-l-4 border-yellow-500 pl-4 py-1 bg-yellow-500/10">
          <div className="text-sm font-medium text-yellow-500">{s.heading}</div>
          <div className="text-sm text-muted-foreground">{s.body}</div>
        </div>
      ))}
    </div>
  );
}
