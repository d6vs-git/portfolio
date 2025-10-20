"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const sections = [
  {
    title: "About D6VS",
    subtitle: "Digital Innovation Partners", 
    content: "We are D6VS - a team of passionate digital creators who believe in transforming ideas into exceptional digital experiences."
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
          const scrollFromTop = -containerTop;
          const sectionHeight = viewportHeight * 1.2; // 120vh per section
          
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
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  return (
    <div 
      id="about" 
      ref={containerRef} 
      className="relative bg-background"
      style={{ height: `${sections.length * 120}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl relative z-10 h-full flex items-center">
          
          {/* Progress Dots - Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute left-6 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 flex flex-col gap-6"
          >
            {sections.map((_, index) => (
              <motion.div
                key={index}
                className="relative flex items-center justify-center"
              >
                {/* Background dot */}
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentSection 
                    ? "bg-primary scale-125" 
                    : "bg-border/50 hover:bg-muted-foreground/50"
                }`} />
                
                {/* Progress ring for current section */}
                {index === currentSection && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ 
                      scale: [1, 1.8, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content - Center */}
          <div className="flex-1 text-center px-16 md:px-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="space-y-6 md:space-y-8"
              >
                {/* Title */}
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
                >
                  {sections[currentSection]?.title}
                </motion.h2>
                
                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold"
                >
                  {sections[currentSection]?.subtitle}
                </motion.p>
                
                {/* Content */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                >
                  {sections[currentSection]?.content}
                </motion.p>

                
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Indicator - Right Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
          >
            <div className="text-sm font-medium text-muted-foreground">
              {currentSection + 1}/{sections.length}
            </div>
            <div className="w-[1px] h-12 bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-x-0 top-0 bg-primary"
                initial={{ height: "0%" }}
                animate={{ height: `${((currentSection + 1) / sections.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-muted-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span className="text-[10px] text-muted-foreground font-medium tracking-wider">SCROLL</span>
          </motion.div>

        </div>
      </div>
    </div>
  );
};