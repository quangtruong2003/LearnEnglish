import type { ReactNode } from "react";

type TipBlockProps = {
  children?: ReactNode;
};

export function TipBlock({ children }: TipBlockProps) {
  return (
    <blockquote className="mt-4 rounded-2xl border-l-4 border-primary/60 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
      {children}
    </blockquote>
  );
}
