import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { personal } from "@/data/personal";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: personal.siteTitle,
    template: `%s | ${personal.name}`,
  },
  description: personal.siteDescription,
  keywords: [
    personal.name,
    "Computer Science",
    "Portfolio",
    "DSA",
    "AI ML",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  metadataBase: new URL(personal.siteUrl || "https://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: personal.siteUrl,
    title: personal.siteTitle,
    description: personal.siteDescription,
    siteName: personal.name,
    images: [
      {
        url: personal.ogImage,
        width: 1200,
        height: 630,
        alt: personal.siteTitle,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
          disableTransitionOnChange={false}
        >
          {/* Global UI */}
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgress />
          <CommandPalette />
          <Navbar />

          {/* Main content */}
          <main>{children}</main>

          <Footer />

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
