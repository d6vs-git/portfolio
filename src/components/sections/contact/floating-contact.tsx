"use client";

import { useState } from "react";
import Image from "next/image";

const contactMethods = [
  {
    img: "/assets/contact/mail.png",
    label: "Email",
    href: "mailto:abc.d6vs@gmail.com",
  },
  {
    img: "/assets/contact/call.png",
    label: "Contact",
    href: "tel:+918074250290",
  },
  {
    img: "/assets/contact/whatsapp.png",
    label: "WhatsApp",
    href: "https://wa.me/918074250290?text=Hello%20D6VS%20i%20have%20a%20project%20for%20you",
  },
];

export default function FloatingContactMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside aria-label="Contact options" className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Individual contact buttons */}
        {contactMethods.map((method, index) => {
          const spacing = 80;
          const yOffset = (index + 1) * spacing;

          return (
            <a
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`absolute right-0 transition-all duration-300 ease-out z-10 ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{
                bottom: isOpen ? `${yOffset}px` : "0px",
              }}
              aria-label={method.label}
            >
              <div className="relative group">
                <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <Image
                    src={method.img}
                    alt={method.label}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                {/* Tooltip */}
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {method.label}
                </span>
              </div>
            </a>
          );
        })}

        {/* Main Toggle Button */}
        <button
          onClick={toggleMenu}
          
          aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
          aria-expanded={isOpen}
        >
          <Image
            src="/assets/contact/contactus.png"
            alt="Contact Us"
            width={120}
            height={120}
            className="object-contain"
          />
        </button>

        {/* Backdrop for closing */}
        {isOpen && (
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </aside>
  );
}