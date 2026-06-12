"use client";
import type { Section } from "@/lib/content/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TipBlock } from "@/components/reader/TipBlock";

type ReaderProps = {
  sections: Section[];
};

export function Reader({ sections }: ReaderProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-20">
          <h2 className={`font-semibold tracking-tight ${section.level === 3 ? "text-2xl" : "text-xl"}`}>
            {section.heading}
          </h2>
          {section.body && (
            <div className="mt-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  blockquote: TipBlock,
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full divide-y divide-border text-sm">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-3 py-2 text-left font-semibold bg-muted/50">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-3 py-2 border-t border-border">{children}</td>
                  ),
                }}
              >
                {section.body}
              </ReactMarkdown>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
