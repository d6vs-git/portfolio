"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const items = ["UI/UX", "WEB", "APP", "AI", "ML"];

export const MarqueeText = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(2);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    // Calculate how many times to repeat items so content is at least twice the container width
    const containerWidth = containerRef.current.offsetWidth;
    const singleSetWidth = textRef.current.scrollWidth / repeatCount;
    const minContentWidth = containerWidth * 2;
    const neededRepeats = Math.ceil(minContentWidth / singleSetWidth);

    setRepeatCount(neededRepeats);

    // Animate after repeatCount is set
  }, [repeatCount]);

  useEffect(() => {
    if (!textRef.current) return;

    const textWidth = textRef.current.scrollWidth / repeatCount;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        x: -textWidth,
        duration: 20,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % textWidth),
        },
      });
    });

    return () => ctx.revert();
  }, [repeatCount]);

  return (
    <div ref={containerRef} className="relative overflow-hidden -z-10 mx-8">
      <div
        ref={textRef}
        className="flex whitespace-nowrap text-[14rem] uppercase text-muted-foreground/20 tracking-tighter"
        style={{
          willChange: "transform",
          fontWeight: 900,
          textShadow: "0 8px 32px rgba(0,0,0,0.8), 0 2px 0 #fff"
        }}
      >
        {Array.from({ length: repeatCount }).map((_, i) =>
          items.map((item, idx) => (
            <span key={`${i}-${idx}`} className="px-8">
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
};
