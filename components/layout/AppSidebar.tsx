"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Check } from "lucide-react";
import * as React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { textbook } from "@/content/textbook";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="text-base font-bold flex items-center gap-2">
          <span>TOEIC 45 ngày</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Nội dung
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Accordion type="multiple" className="w-full">
                {textbook.stages.map((stage) => (
                  <AccordionItem key={stage.slug} value={stage.slug} className="border-none">
                    <AccordionTrigger className="px-2 py-2 hover:no-underline hover:bg-sidebar-accent rounded-md transition-colors">
                      <span className="text-sm font-medium">
                        Giai đoạn {stage.index}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1">
                      <SidebarMenuSub>
                        {stage.chapters.map((ch) => {
                          const href = `/giai-doan/${stage.slug}/chuong/${ch.slug}`;
                          const isActive = pathname === href;
                          return (
                            <SidebarMenuSubItem key={ch.slug}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive}
                                className="flex items-center gap-2"
                              >
                                <Link href={href}>
                                  <span className="text-xs font-medium text-muted-foreground w-5 shrink-0 text-right">
                                    {ch.index}.
                                  </span>
                                  <span className="truncate flex-1">
                                    {ch.title.split("(")[0].trim()}
                                  </span>
                                  {isActive && (
                                    <Check className="h-3 w-3 text-primary shrink-0" />
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Flashcards">
              <Link href="/flashcards" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Flashcards</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
