import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ErrorBoundary } from "@/components/error-boundary";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    default: "D6VS",
    template: "%s | D6VS",
  },
  description:
    "Professional digital solutions from design to deployment. We create websites, mobile apps, AI solutions, and provide comprehensive digital services.",
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
    url: "https://d6vs.com",
    title: "D6VS - Professional Digital Solutions",
    description:
      "Professional digital solutions from design to deployment. We create websites, mobile apps, AI solutions, and provide comprehensive digital services.",
    siteName: "D6VS",
  },
  twitter: {
    card: "summary_large_image",
    title: "D6VS - Professional Digital Solutions",
    description: "Professional digital solutions from design to deployment.",
    creator: "@d6vs",
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
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ErrorBoundary>
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
            <a
              href="https://wa.me/919494711703?text=Hello%20D6VS%20i%20have%20a%20project%20for%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full"
              aria-label="Contact us on WhatsApp"
            >
              <Image
                src="/assets/socials/whatsapp.png"
                alt="WhatsApp"
                width={80}
                height={80}
                className="hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                style={{ objectFit: "cover", opacity: 0.8 }}
                priority={false}
                loading="lazy"
              />
            </a>
          </aside>
        </ErrorBoundary>
      </body>
    </html>
  );
}
