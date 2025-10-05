import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "D6VS",
  description:
    "Professional digital solutions from design to deployment. We create websites, mobile apps, AI solutions, and provide comprehensive digital services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <body
        className="font-sans antialiased"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <Navbar />
        </div>
        {children}

        <a
          href="https://wa.me/919494711703?text=Hello%20D6VS%20i%20have%20a%20project%20for%20you"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition-all duration-300"
        >
          <Image
            src="/assets/socials/whatsapp.png"
            alt="WhatsApp Icon"
            width={80}
            height={80}
            className="hover:opacity-100 transition-opacity duration-300"
            style={{ objectFit: "cover", opacity: 0.8 }}
          />
        </a>
      </body>
    </html>
  );
}
