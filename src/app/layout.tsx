import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import FloatingContactMenu from "@/components/sections/contact/floating-contact";

export const metadata: Metadata = {
  title: {
    default: "D6VS",
    template: "%s | D6VS",
  },
  description:
    "Turn your ideas into action and make them matter. Your vision, alive, impactful, and seen by the world.",
  keywords: [
    "web development",
    "mobile apps",
    "AI solutions",
    "digital services",
    "D6VS",
  ],
  authors: [{ name: "D6VS Team" }],
  creator: "D6VS",
  publisher: "D6VS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://d6vs.tech",
    title: "D6VS - Your Vision, Brought to life",
    description:
      "Turn your ideas into action and make them matter. Your vision, alive, impactful, and seen by the world.",
    siteName: "D6VS",
  },
  twitter: {
    card: "summary_large_image",
    title: "D6VS - Your Vision, Brought to life",
    description: "Turn your ideas into action and make them matter.",
    creator: "@d6vs",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    other: [{ rel: "mask-icon", url: "/logo.png" }],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://wa.me" />
        {/* Site icons - prefer /favicon.ico for compatibility, fall back to logo.png */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="mask-icon" href="/logo.png" color="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
       
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>

          {/* Navigation */}
          <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <Navbar />
          </header>

          {/* Main content */}
          <main id="main-content">{children}</main>

          {/* WhatsApp Float Button */}
          <aside aria-label="Contact via WhatsApp">
            <FloatingContactMenu />
          </aside>
      </body>
    </html>
  );
}
