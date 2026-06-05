"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { textbook } from "@/content/textbook";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const openMenu = () => setOpen(true);
    document.addEventListener("keydown", down);
    document.addEventListener("open-command-menu", openMenu);
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("open-command-menu", openMenu);
    };
  }, []);

  const navigate = React.useCallback(
    (stage: string, slug: string) => {
      router.push(`/giai-doan/${stage}/chuong/${slug}`);
      setOpen(false);
    },
    [router]
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search documentation..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {textbook.stages.map((stage) => (
          <CommandGroup key={stage.slug} heading={`Giai đoạn ${stage.index}`}>
            {stage.chapters.map((ch) => (
              <CommandItem
                key={ch.slug}
                value={`${ch.index} ${ch.title}`}
                onSelect={() => navigate(stage.slug, ch.slug)}
              >
                <span>{ch.index}. {ch.title.split("(")[0].trim()}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}

        <CommandGroup heading="Pages">
          <CommandItem value="Home" onSelect={() => { router.push("/"); setOpen(false); }}>
            Trang chủ
          </CommandItem>
          <CommandItem value="Flashcards" onSelect={() => { router.push("/flashcards"); setOpen(false); }}>
            Flashcards
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
