import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/catalog/SidebarContent";
import { TopNav } from "@/components/catalog/TopNav";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Học TOEIC 45 ngày",
  description: "Lộ trình học TOEIC 700+ theo 3 giai đoạn",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <SidebarProvider defaultOpen={false}>
            <Sidebar>
              <SidebarContent />
            </Sidebar>
            <SidebarInset>
              <TopNav />
              <main className="flex-1 min-w-0">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
