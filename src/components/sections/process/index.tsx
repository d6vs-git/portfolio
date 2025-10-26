"use client";

import React, { useState } from "react";
import { processData } from "@/data/process-data";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Header - Consistent with other sections */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-2 text-foreground">
            How we make a <span className="text-primary">Deal</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that ensures successful project delivery from
            concept to completion
          </p>
        </div>

        {/* Desktop Layout - Original Design (hidden on mobile) */}
        <div className="hidden md:block space-y-8">
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
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                      activeStep === index
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Step title */}
                  <span
                    className={`text-xs font-medium text-center transition-colors duration-300 ${
                      activeStep === index
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>

                {/* Connector line */}
                {index < processData.length - 1 && (
                  <div
                    className={`h-0.5 w-8 mx-1 transition-colors duration-300 ${
                      activeStep > index ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Side-by-side Detail Card */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full grid grid-cols-2 gap-10 md:gap-16 items-center bg-transparent"
              >
                {/* Image */}
                <div className="flex justify-center items-center">
                  <div className="w-full max-w-[340px] aspect-square flex items-center justify-center">
                    <Image
                      src={processData[activeStep].image}
                      alt={processData[activeStep].title}
                      width={340}
                      height={340}
                      className="object-cover w-full h-full rounded-xl"
                      priority
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col justify-center h-full w-full max-w-2xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-left">
                    {processData[activeStep].title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-8 text-left">
                    {processData[activeStep].description}
                  </p>
                  {/* Navigation buttons */}
                  <div className="flex items-center gap-3 mt-2 w-full justify-end">
                    {activeStep > 0 && (
                      <button
                        onClick={() => setActiveStep(activeStep - 1)}
                        className="px-5 py-2.5 rounded-lg bg-background text-foreground text-sm font-medium transition-all duration-200 hover:bg-muted"
                      >
                        Previous
                      </button>
                    )}
                    {activeStep < processData.length - 1 && (
                      <button
                        onClick={() => setActiveStep(activeStep + 1)}
                        className="px-5 py-2.5 rounded-lg bg-primary text-white hover:opacity-90 transition-all duration-200 text-sm font-medium"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout - Vertical Cards (visible only on mobile) */}
        <div className="md:hidden space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <div className="w-full aspect-square relative">
                <Image
                  src={processData[activeStep].image}
                  alt={processData[activeStep].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Step indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {String(activeStep + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {processData[activeStep].title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {processData[activeStep].description}
                </p>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  {processData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === activeStep
                          ? "w-8 h-2 bg-primary"
                          : "w-2 h-2 bg-border hover:bg-muted"
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() =>
                      setActiveStep(
                        activeStep === 0 ? processData.length - 1 : activeStep - 1
                      )
                    }
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium transition-all duration-200 hover:bg-muted active:scale-95"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveStep(
                        activeStep === processData.length - 1 ? 0 : activeStep + 1
                      )
                    }
                    className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white hover:opacity-90 transition-all duration-200 text-sm font-medium active:scale-95"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};