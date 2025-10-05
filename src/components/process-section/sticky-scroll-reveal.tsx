"use client";

import React, { useRef, useState, useEffect } from "react";

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || window.innerWidth < 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible in the center of the viewport
        let mostVisible: Element | null = null;
        let maxVisibility = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewportCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
            const visibility =
              1 - distanceFromCenter / (window.innerHeight / 2);

            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              mostVisible = entry.target;
            }
          }
        });

        if (mostVisible) {
          const index = contentRefs.current.findIndex(
            (ref) => ref === mostVisible
          );
          if (index !== -1 && index !== activeCard) {
            setActiveCard(index);
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    // Observe all content sections
    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        observer.disconnect();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [content.length, activeCard]);

  // Use only CSS variables from globals.css for colors
  const backgroundColors = [
    "hsl(var(--background))",
    "hsl(var(--secondary))",
    "hsl(var(--muted))",
  ];

  return (
    <div
      ref={containerRef}
      className="relative transition-colors duration-300 ease-out px-16"
      style={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {content.map((item, idx) => (
          <div
            key={item.title + idx}
            className="min-h-[60vh] flex flex-col justify-center px-4 py-8 border-b border-border last:border-b-0"
          >
            <div className="relative mb-6">
              <span
                className="absolute -top-4 -left-1 text-6xl md:text-8xl font-extrabold select-none transition-all duration-300 ease-out"
                style={{
                  color: "hsl(var(--muted-foreground))",
                  opacity: 0.08,
                  zIndex: 0,
                  lineHeight: 1,
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3
                className="relative z-10 text-xl md:text-2xl font-bold mb-4 transition-colors duration-300"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {String(idx + 1).padStart(2, "0")}. {item.title}
              </h3>
            </div>
            <p
              className="text-base md:text-lg leading-relaxed transition-colors duration-300 max-w-none"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        
        {/* Left sticky section: shows active content - positioned at bottom */}
        <div
          className="w-1/2 sticky flex flex-col justify-end px-6 xl:px-10 pb-16"
          style={{ top: "240px", height: "calc(100vh - 240px)" }}
        >
          <div className="relative">
            <span
              className="absolute -top-8 -left-2 text-[8rem] xl:text-[12rem] font-extrabold select-none transition-all duration-300 ease-out"
              style={{
                color: "hsl(var(--muted-foreground))",
                opacity: 0.08,
                zIndex: 0,
                lineHeight: 1,
              }}
            >
              {String(activeCard + 1).padStart(2, "0")}
            </span>
            <h2
              className="relative z-10 text-3xl xl:text-4xl font-bold leading-tight transition-all duration-300 ease-out"
              style={{ color: "hsl(var(--foreground))" }}
            >
              {content[activeCard].title}
            </h2>
          </div>
        </div>

        {/* Right scrollable section: all content items */}
        <div className="w-1/2">
          {content.map((item, idx) => (
            <div
              key={item.title + idx}
              ref={(el) => {
                if (el) contentRefs.current[idx] = el;
              }}
              className="flex items-center justify-center px-6 xl:px-10 min-h-screen"
            >
              <div>
                <h3
                  className="text-lg xl:text-xl font-semibold mb-6 transition-colors duration-300"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {String(idx + 1).padStart(2, "0")}. {item.title}
                </h3>
                <p
                  className="text-base xl:text-lg leading-relaxed transition-colors duration-300"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
