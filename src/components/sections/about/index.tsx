"use client";

import { motion } from "motion/react";

const sections = [
  {
    title: "Who are we?",
    subtitle: "Your Vision, Brought to life",
    content:
      "D6VS is a creative digital studio specializing in building impactful web, mobile, and AI-powered solutions for ambitious brands and startups. We blend design, technology, and strategy to help you stand out and grow in the digital world.",
  },
  {
    title: "What we do",
    subtitle: "Web, Mobile, AI & More",
    content:
      "From custom websites and mobile apps to advanced AI, machine learning, and Web3 solutions, we deliver end-to-end digital products that are beautiful, robust, and future-ready. Our expertise covers everything from UI/UX, SEO, and e-commerce to cloud infrastructure and DevOps.",
  },
  {
    title: "Our Approach",
    subtitle: "Collaboration & Quality",
    content:
      "We believe in close collaboration, transparent communication, and a process that puts your goals first. Every project starts with understanding your vision, followed by thoughtful design, precise development, and ongoing support.",
  },
  {
    title: "Why D6VS?",
    subtitle: "Results That Matter",
    content:
      "20+ successful projects delivered\n Trusted by founders, students, and enterprises\n Passionate about innovation and quality\n Your growth is our mission",
  },
];

export const AboutSection = () => {
  return (
    <div id="about" className="relative bg-background py-6 md:py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        {/* Header - Consistent with other sections */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-foreground">
            <span className="text-primary">D6VS</span> — Your Vision, Brought to life


          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We help brands and startups turn ideas into powerful digital products — from web and mobile to AI and beyond.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="space-y-4 pt-8">
                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-tight">
                    {section.title}
                  </h3>
                  <motion.div
                    className="h-px bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "30%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>

                {/* Subtitle */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-px bg-primary/50" />
                  <p className="text-sm md:text-base text-primary font-light">
                    {section.subtitle}
                  </p>
                </div>

                {/* Content */}
                {typeof section.content === "string" && (section.content.includes("\n") || section.content.includes("•")) ? (
                  <ul className="list-disc list-inside text-muted-foreground leading-relaxed font-light pt-2 space-y-2">
                    {section.content
                      .split(/\n|•/)
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i} className="text-sm md:text-base">
                          {line}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light pt-2">
                    {section.content}
                  </p>
                )}
              </div>

              {/* Hover effect circle */}
              <motion.div className="absolute -bottom-4 -right-4 w-20 h-20 border border-border/30 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
