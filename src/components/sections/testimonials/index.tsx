"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonial-data";

export const TestimonialsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handle scroll to update current index
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  // Scroll to specific testimonial
  const scrollToTestimonial = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.offsetWidth;
      container.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  // Auto scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonialsData.length;
      scrollToTestimonial(nextIndex);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]); // Remove testimonialsData.length as it's a constant

  return (
    <section id="testimonials" className=" min-h-screen flex flex-col items-center justify-center ">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 text-foreground">
        What Our <span className="text-primary">Clients</span> Say
      </h2>

      <div className="w-full">
        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full snap-center px-6 md:px-12"
            >
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                {/* Avatar */}
                <div className="rounded-full bg-green-100 w-32 h-32 flex items-center justify-center mb-6 overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={90}
                    height={90}
                    className="rounded-full object-cover"
                    priority={index === 0}
                  />
                </div>

                {/* Name */}
                <div className="text-2xl md:text-3xl  text-center mb-1 text-foreground">
                  {testimonial.name}
                </div>

                {/* Role */}
                <div className="text-muted-foreground text-base md:text-lg text-center mb-8">
                  {testimonial.role}
                </div>

                {/* Quote */}
                <blockquote className="text-card-foreground text-sm md:text-base italic text-center max-w-3xl mx-auto leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                idx === currentIndex
                  ? "bg-primary w-4 h-4"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              onClick={() => scrollToTestimonial(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
