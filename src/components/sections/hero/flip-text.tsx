"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

export const FlipText = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const texts = useMemo(() => ["Design", "Develop", "Deploy", "Maintain"], []);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const animate = () => {
      // slide old text up
      gsap.to(el, {
        y: -40,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % texts.length);

          // reset position below & slide new text up
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        },
      });
    };

    const intervalId = setInterval(animate, 3000);
    return () => clearInterval(intervalId);
  }, [texts]);

  return (
    <div className="inline-block overflow-hidden h-[50px]">
      <div
        ref={textRef}
        className="inline-block text-2xl font-light text-primary"
      >
        We {texts[index]}
      </div>
    </div>
  );
};
