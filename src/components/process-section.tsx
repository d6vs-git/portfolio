"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { processData } from "@/data/process-data";

export const ProcessSection = () => {
  return (
    <div id="process" className="flex flex-col min-h-screen w-full  ">
      {/* Fixed Header Section - positioned below navbar */}
      <div className="sticky py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-2 text-foreground">
              How we make a <span className="text-primary">deal</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery from
              concept to completion
            </p>
          </div>
        </div>
      </div>
      
      {/* Sticky Scroll Content */}
      <div className="flex-1 pb-10">
        <StickyScroll content={processData} />
      </div>
    </div>
  );
};
