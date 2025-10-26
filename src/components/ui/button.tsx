"use client";
import { useRef, useEffect } from "react";
import { MoveRight } from "lucide-react";
import gsap from "gsap";

type ButtonProps = {
  text?: string;
  symbol?: React.ReactNode;
  rotation?: number;
  onClick?: () => void;
};

export const Button = ({
  text = "Get Started",
  symbol,
  rotation = 90,
  onClick,
}: ButtonProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {

    // Move text left with gap
    gsap.to(textRef.current, {
      x: -30,
      duration: 0.5,
      ease: "power2.out",
    });

    // Show circle from right edge
    gsap.to(circleRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    // Rotate arrow
    gsap.to(arrowRef.current, {
      rotate: rotation,
      scale: 1.1,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {

    // Move text back to center
    gsap.to(textRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    // Hide circle
    gsap.to(circleRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.4,
      ease: "power2.out",
    });

    // Reset arrow
    gsap.to(arrowRef.current, {
      rotate: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Initialize circle as hidden and positioned off-screen
  useEffect(() => {
    gsap.set(circleRef.current, {
      opacity: 0,
      x: 20,
    });
  }, []);

  return (
    <button
      className="relative w-[260px] h-[68px] rounded-full border-4 border-[#ececff] bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Text - centered initially */}
      <span
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center text-lg font-bold text-black"
      >
        {text}
      </span>

      {/* Circle - positioned flush to right edge */}
      <div
        ref={circleRef}
        className="absolute right-1 top-1/2 -translate-y-1/2 w-[54px] h-[54px] bg-black rounded-full flex items-center justify-center"
      >
        {symbol ?? <MoveRight ref={arrowRef} className="w-7 h-7 text-white" />}
      </div>
    </button>
  );
};
