"use client";

import React, { useState } from "react";
import { processData } from "@/data/process-data";
import { motion, AnimatePresence } from "motion/react";

export const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Header - Consistent with other sections */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-foreground">
            How we make a <span className="text-primary">deal</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that ensures successful project delivery from
            concept to completion
          </p>
        </div>

        {/* Centered Layout: Steps Row + Detail Card */}
        <div className="space-y-8">
          {/* Horizontal Steps */}
          <div className="flex items-center justify-center gap-2 px-4 overflow-x-auto">
            {processData.map((step, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 min-w-[100px] ${
                    activeStep === index ? "bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  {/* Step number circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    activeStep === index 
                      ? "bg-primary text-white" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  
                  {/* Step title */}
                  <span className={`text-xs font-medium text-center transition-colors duration-300 ${
                    activeStep === index ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {step.title}
                  </span>
                </button>
                
                {/* Connector line */}
                {index < processData.length - 1 && (
                  <div className={`h-0.5 w-8 mx-1 transition-colors duration-300 ${
                    activeStep > index ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Centered Detail Card */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-2xl p-8 md:p-10 max-w-3xl w-full"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-4">
                  Step {activeStep + 1} of {processData.length}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {processData[activeStep].title}
                </h3>

                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {processData[activeStep].description}
                </p>

                {/* Navigation buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="px-5 py-2.5 rounded-lg border border-border hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(processData.length - 1, activeStep + 1))}
                    disabled={activeStep === processData.length - 1}
                    className="px-5 py-2.5 rounded-lg bg-primary text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
