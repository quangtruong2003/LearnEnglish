import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Section } from "@/lib/content/types";

export function Reader({ sections }: { sections: Section[] }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      {sections.map((s) => {
        const Tag = (`h${s.level + 1}`) as keyof JSX.IntrinsicElements;
        return (
          <section key={s.id} id={s.id} className="mb-8">
            <Tag>{s.heading}</Tag>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.body}</ReactMarkdown>
          </section>
        );
      })}
    </article>
  );
}
