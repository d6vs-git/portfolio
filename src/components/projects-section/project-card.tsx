"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  href?: string;
  className?: string;
  onCursorShow?: () => void;
  onCursorHide?: () => void;
  onCursorMove?: (e: MouseEvent) => void;
}

export const ProjectCard = ({
  title,
  category,
  image,
  href = "#",
  className = "",
  onCursorShow,
  onCursorHide,
  onCursorMove,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const imageContainer = imageRef.current;

    if (!card || !imageContainer) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
      onCursorShow?.();

      // Animate image scale with better easing
      gsap.to(imageContainer, {
        scale: 1.08,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      onCursorHide?.();

      // Reset image transform
      gsap.to(imageContainer, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      onCursorMove?.(e);
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, onCursorShow, onCursorHide, onCursorMove]);

  return (
    <div ref={cardRef} className={`relative group ${className}`}>
      <a href={href} className="block cursor-none">
        {/* Image Container */}
        <div
          ref={imageRef}
          className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl bg-gray-900 mb-6"
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {category}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 leading-tight">
            {title}
          </h3>
        </div>
      </a>
    </div>
  );
}