import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "TOEIC 45 ngày",
  description: "Luyện thi TOEIC 700+ theo lộ trình 45 ngày",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <SidebarProvider defaultOpen={true}>
            <Sidebar>
              <AppSidebar />
            </Sidebar>
            <SidebarInset>
              <Header />
              <main className="flex-1 min-w-0">{children}</main>
            </SidebarInset>
            <CommandMenu />
          </SidebarProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
