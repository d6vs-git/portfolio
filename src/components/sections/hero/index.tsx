"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FlipText } from "./flip-text";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen overflow-hidden relative bg-white"
    >
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-64 -left-64 w-[600px] h-[600px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -top-64 -right-64 w-[600px] h-[600px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="font-extrabold h-screen w-screen relative">
        {/* Top Half - D6VS Logo with Spring Animation */}
        <div className="flex items-end justify-center h-1/2 text-8xl md:text-9xl lg:text-[12rem] relative z-10">
          <span
            className="inline-block animate-spring-drop"
            style={{ animationDelay: "0s" }}
          >
            <span className="text-foreground/80">D</span>
          </span>
          <span
            className="inline-block animate-spring-drop"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-primary">6</span>
          </span>
          <span
            className="inline-block animate-spring-drop"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-foreground/80">V</span>
          </span>
          <span
            className="inline-block animate-spring-drop"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="text-foreground/80">S</span>
          </span>
        </div>

        <div className="flex justify-center items-center">
          {/* Show FlipText after the spring-drop animation sequence finishes */}
          <FlipTextController />
        </div>

        {/* Bottom Half - Description */}
        <div className="relative h-1/2 w-full flex justify-start items-end z-10">
          {/* Content Container */}
          <div className="w-full h-full flex items-end">
            <div className="grid lg:grid-cols-2 gap-8 w-full p-8 md:p-12 lg:p-16">
              {/* Left: Text Content */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {"Your Vision, Brought to life"
                    .split("")
                    .map((char, index) => (
                      <span
                        key={`headline-${index}`}
                        className="animate-text-reveal"
                        style={{
                          animationDelay: `${0.6 + index * 0.03}s`,
                          opacity: 0,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  <br />
                  <span className="block mt-4 md:mt-6 text-md md:text-lg lg:text-xl font-normal text-gray-700 leading-relaxed">
                    {"From discovery and prototyping to development, deployment, and ongoing iteration, we partner with you to ship useful, delightful, and maintainable products"
                      .split("")
                      .map((char, index) => (
                        <span
                          key={`desc-${index}`}
                          className="animate-text-reveal"
                          style={{
                            animationDelay: `${1.4 + index * 0.015}s`,
                            opacity: 0,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                  </span>
                </h1>
              </div>

              {/* Right: Logo */}
              <div
                className="flex items-end justify-center animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="w-48 h-48 md:w-64 md:h-64 relative">
                  <Image
                    src="/logo.png"
                    alt="D6VS Logo"
                    fill
                    className="object-contain rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes springDrop {
          0% {
            transform: translateY(-100vh) rotate(-15deg);
            opacity: 0;
          }
          40% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          55% {
            transform: translateY(-30px) rotate(5deg);
          }
          65% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(-3deg);
          }
          85% {
            transform: translateY(0) rotate(0deg);
          }
          92% {
            transform: translateY(-8px) rotate(2deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .animate-spring-drop {
          animation: springDrop 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-text-reveal {
          animation: textReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: inline;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

// Controller component: waits for the spring-drop animation to finish, then shows FlipText
const FlipTextController: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // springDrop duration is 1500ms, last letter delay is 300ms (0.3s) -> total ~1800ms
    // add a small buffer to ensure it finishes
    const duration = 1500;
    const lastDelay = 300;
    const buffer = 200;
    const total = duration + lastDelay + buffer;
    const t = setTimeout(() => setShow(true), total);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={show ? "opacity-100 animate-fade-in-up" : "opacity-0"}
    >
      {show ? <FlipText /> : <div className="h-14" />}
    </div>
  );
};
