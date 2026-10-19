import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingButtons } from "@/components/features/floating-buttons";
import { PageTransition } from "@/components/ui/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "plantro - Premium Online Plant Nursery",
  description: "India's premium online plant nursery. Discover carefully curated indoor plants, outdoor plants, pots, seeds, and gardening essentials delivered to your doorstep.",
  keywords: ["plants", "online plant nursery", "indoor plants", "outdoor plants", "pots", "seeds", "gardening", "plant care"],
  authors: [{ name: "plantro" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "plantro - Premium Online Plant Nursery",
    description: "India's premium online plant nursery. Discover carefully curated plants and gardening essentials.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButtons />
        </QueryProvider>
      </body>
    </html>
  );
}
