import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Russell Welch - Full Stack Developer",
  description:
    "Building playful interfaces that power serious results. Full-stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Russell Welch",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
  ],
  authors: [{ name: "Russell Welch" }],
  creator: "Russell Welch",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://russellwelch.dev",
    title: "Russell Welch - Full Stack Developer",
    description: "Building playful interfaces that power serious results.",
    siteName: "Russell Welch Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Russell Welch - Full Stack Developer",
    description: "Building playful interfaces that power serious results.",
    creator: "@russelldoescode",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        {/* Load React Scan asynchronously and only in development */}
        {/* {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-scan/dist/auto.global.js"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )} */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
