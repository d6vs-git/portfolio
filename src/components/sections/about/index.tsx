"use client";

import { useRef, useEffect, useState } from "react";

const sections = [
  {
    title: "About D6VS",
    subtitle: "Digital Innovation Partners", 
    content: "We are D6VS - a team of six passionate digital creators who believe in transforming ideas into exceptional digital experiences."
  },
  {
    title: "Our Philosophy",
    subtitle: "Design with Purpose",
    content: "We don't just create beautiful interfaces; we craft meaningful experiences that serve a purpose in telling your story."
  },
  {
    title: "Our Process", 
    subtitle: "Four Pillars of Excellence",
    content: "Design with intention. Develop with precision. Deploy with confidence. Maintain with dedication."
  },
  {
    title: "Our Promise",
    subtitle: "Your Success is Our Mission", 
    content: "We're not just service providers; we're your digital partners committed to your success and growth."
  }
];

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const containerRect = container.getBoundingClientRect();
          const containerTop = containerRect.top;
          const viewportHeight = window.innerHeight;
          
          // Calculate which section should be active based on scroll position
          // Each section needs significant scroll to activate
          const scrollFromTop = -containerTop;
          const sectionHeight = viewportHeight * 1.5; // 150vh per section for lazy scroll
          
          let newSection = Math.floor(scrollFromTop / sectionHeight);
          newSection = Math.max(0, Math.min(sections.length - 1, newSection));
          
          if (newSection !== currentSection) {
            setCurrentSection(newSection);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  return (
    <div 
      id="about" 
      ref={containerRef} 
      className="relative"
      style={{ height: `${sections.length * 150}vh` }} // 150vh per section for lazy scrolling
    >
      <div className="sticky top-0 h-screen flex items-center justify-center bg-background">
        <div className="container mx-auto px-8 max-w-4xl text-center">
          
          {/* Current Section Content */}
          <div className="space-y-8 transition-all duration-1000 ease-out">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              {sections[currentSection]?.title}
            </h2>
            
            <p className="text-xl md:text-2xl text-primary font-medium">
              {sections[currentSection]?.subtitle}
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {sections[currentSection]?.content}
            </p>
          </div>

          

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <div className="text-sm text-muted-foreground mb-2">
              {currentSection + 1} / {sections.length}
            </div>
            <div className="w-[1px] h-6 bg-border mx-auto"></div>
            <div className="text-xs text-muted-foreground mt-2">SCROLL</div>
          </div>

        </div>
      </div>
    </div>
  );
};