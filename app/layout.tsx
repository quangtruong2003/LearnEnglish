import { Geist, Geist_Mono, Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={cn("dark antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
