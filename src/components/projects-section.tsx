"use client";

import { projectsData } from "@/data/projects-data";
import { ProjectCard } from "./projects-section/project-card";
import { Button } from "./ui/button";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";

export const ProjectsSection = () => {
  const sharedCursorRef = useRef<HTMLDivElement>(null);

  const handleCursorShow = () => {
    const cursor = sharedCursorRef.current;
    if (!cursor) return;
    
    // Hide all cursor types at all levels
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    
    gsap.to(cursor, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const handleCursorHide = () => {
    const cursor = sharedCursorRef.current;
    if (!cursor) return;
    
    // Restore default cursor
    document.documentElement.style.cursor = '';
    document.body.style.cursor = '';
    
    gsap.to(cursor, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCursorMove = (e: MouseEvent) => {
    const cursor = sharedCursorRef.current;
    if (!cursor) return;

    const x = e.clientX;
    const y = e.clientY;

    gsap.to(cursor, {
      x: x - 90,
      y: y - 35,
      duration: 0.2,
      ease: "power3.out",
    });
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-foreground">
            Our <span className="text-primary">Projects</span> that speaks 
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to transform your business
          </p>
        </div>

        {/* Projects Grid - Exact 2x2 layout like the image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              category={project.category}
              image={project.image}
              href={project.href}
              className="w-full"
              onCursorShow={handleCursorShow}
              onCursorHide={handleCursorHide}
              onCursorMove={handleCursorMove}
            />
          ))}
        </div>

        {/* View More Section */}
        <div className="mt-20 text-center">
           <Button text="View More"/>
        </div>
       
      </div>

      {/* Shared Custom Cursor */}
      <div
        ref={sharedCursorRef}
        className="fixed pointer-events-none z-50 flex items-center gap-3 bg-gradient-to-r from-white to-gray-50 text-black px-6 py-4 rounded-full font-semibold text-sm shadow-2xl border border-gray-200/30 backdrop-blur-md"
        style={{
          opacity: 0,
          transform: "scale(0.8)",
          left: 0,
          top: 0,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.8)",
        }}
      >
        <span className="text-gray-800 font-medium">View Project</span>
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-orange-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform">
          <ArrowRight className="w-4 h-4 text-white arrow-icon" />
        </div>
      </div>
    </section>
  );
};
