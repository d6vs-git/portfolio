"use client";

import { aboutData } from "@/data/about-data";
import { motion } from "motion/react";

export const AboutSection = () => {
  return (
    <div id="about" className="relative bg-background py-6 md:py-8 mt-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        {/* Header - Consistent with other sections */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-foreground">
            <span className="text-primary"> Meet D6VS</span> - Your Digital Product Studio 


          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We help brands and startups turn ideas into powerful digital products — from web and mobile to AI and beyond.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10">
          {aboutData.map((section, index) => (
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
