import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/common/ThemeProvider";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gourab Ganguly — Software Developer",
  description:
    "Software Developer focused on backend engineering, clean architecture, and building enterprise-grade applications with .NET, React, and SQL Server.",
  keywords: [
    "Gourab Ganguly",
    "Software Developer",
    "Backend Engineer",
    "ASP.NET Core",
    "React",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <PageWrapper>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
