"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { contactData } from "@/data/contact-data";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    // Initial animation
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Hover animations
    cards.forEach((card) => {
      if (!card) return;

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);



  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-2 text-foreground">
            Lets help you  <span className="text-primary">Build</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with us to discuss your project needs and discover how we
            can help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactData.map((method, index) => {
            return (
              <div
                key={method.label}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group"
              >
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block"
                >
                  <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors duration-300 h-full">
                    <div className="w-16 h-16 mx-auto mb-4  flex items-center justify-center group-hover:opacity-90 transition-all duration-300 overflow-hidden">
                      <Image src={method.img} alt={method.label} width={64} height={64} className="object-contain" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {method.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {method.description}
                    </p>
                    <p className="text-primary font-medium break-all">
                      {method.value}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};
