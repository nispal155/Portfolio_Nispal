import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TerminalProvider } from "@/hooks/useTerminal";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BootSequence } from "@/components/ui/BootSequence";
import { CommandPalette } from "@/components/ui/CommandPalette";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nispal Bhattarai | Full-Stack Engineer",
  description: "Portfolio of Nispal Bhattarai, a Full-Stack MERN & Next.js Engineer based in Itahari, Nepal, specializing in scalable web ecosystems.",
  openGraph: {
    title: "Nispal Bhattarai | Full-Stack Engineer",
    description: "Building highly optimized, scalable web ecosystems with exceptional UI/UX.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={['light', 'dark', 'matrix']}
        >
          <BootSequence />
          <CommandPalette />
          <LenisProvider>
            <ScrollProgress />
            <CustomCursor />
            <TerminalProvider>
              {children}
              <FloatingElements />
            </TerminalProvider>
          </LenisProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
