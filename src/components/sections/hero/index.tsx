"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@/components/common/button";
import { FlipText } from "./flip-text";
import { HappyClients } from "./happy-clients";
import { MarqueeText } from "./marquee-text";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;

    if (container && logo) {
      // Floating tech icons
      const floatingElements = container.querySelectorAll(".floating-tech");

      // Logo gentle floating
      gsap.to(logo, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Animate each floating tech icon - only movement, no rotation
      floatingElements.forEach((element, index) => {
        const el = element as HTMLElement;

        // Random floating animation for each tech icon
        gsap.to(el, {
          y: -30 - index * 5,
          x: Math.sin(index) * 20,
          duration: 4 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Background Marquee Text */}
      <div className="absolute inset-0 pointer-events-none top-1/3 opacity-60">
        <MarqueeText />
      </div>

      {/* Floating Tech Icons */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none">
        {/* React - Top Left */}
        <div className="floating-tech absolute top-24 left-80">
          <Image
            src="/assets/hero/react.png"
            alt="React"
            width={150}
            height={150}
            className="object-contain drop-shadow-lg"
          />
        </div>

        {/* JavaScript - Top Right */}
        <div className="floating-tech absolute top-32 right-80">
          <Image
            src="/assets/hero/javascript.png"
            alt="JavaScript"
            width={150}
            height={150}
            className="object-contain drop-shadow-lg"
          />
        </div>

        {/* TypeScript - Left Middle */}
        <div className="floating-tech absolute top-1/2 left-20 transform -translate-y-1/2">
          <Image
            src="/assets/hero/type-script.png"
            alt="TypeScript"
            width={150}
            height={150}
            className="object-contain drop-shadow-lg"
          />
        </div>

        {/* Node.js - Right Middle */}
        <div className="floating-tech absolute top-1/2 right-24">
          <Image
            src="/assets/hero/nodejs.png"
            alt="Node.js"
            width={150}
            height={150}
            className="object-contain drop-shadow-lg"
          />
        </div>

        {/* Tailwind - Bottom Left */}
        <div className="floating-tech absolute bottom-24 left-60">
          <Image
            src="/assets/hero/tailwind.png"
            alt="Tailwind"
            width={150}
            height={150}
            className="object-contain drop-shadow-lg"
          />
        </div>

        {/* Flutter - Bottom Right */}
        <div className="floating-tech absolute bottom-24 right-60">
          <Image
            src="/assets/hero/git.png"
            alt="Git"
            width={150}
            height={150}
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Center Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Text Content at Top */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl text-foreground leading-tight mb-3">
              Hi, I&apos;m <span className="text-primary">D6VS!</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-3">
              Your Vision, Brought to life
            </p>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Turn your ideas into action and make them matter. Your vision, alive, impactful, and seen by the world.
            </p>
            <div className="text-lg text-primary font-medium">
              <FlipText />
            </div>
          </div>

          {/* Logo Below Text */}
          <div ref={logoRef} className="mb-8 flex justify-center">
            <div className="relative">
              <div className="bg-gray-50 rounded-full p-8 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="D6VS Logo"
                  width={200}
                  height={200}
                  className="object-contain rounded-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Happy Clients */}
          <div className="mb-8 flex justify-center">
            <HappyClients />
          </div>

          {/* CTA Button */}
          <div>
            <Button />
          </div>
        </div>
      </div>
    </section>
  );
};