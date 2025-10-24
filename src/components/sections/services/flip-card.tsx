"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

interface FrontData {
  title: string;
  image: string;
  subtitle?: string;
}

interface BackData {
  description: string;
  features: string[];
}

interface FlipCardProps {
  front: FrontData;
  back: BackData;
}

export const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <FollowerPointerCard
      title={
        <span className="text-white">
          {isFlipped ? "Click to flip back" : "Click to flip"}
        </span>
      }
    >
      <div
        className="relative w-full h-96 group"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
      >
        <div
          className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center p-8 border border-gray-100 group-hover:border-primary/30 overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Image Container */}
            <div className="relative  flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2">
              <Image
                src={front.image}
                alt={front.title}
                width={200}
                height={200}
                className="object-contain transition-all duration-500 group-hover:scale-105 filter drop-shadow-lg"
              />
            </div>

            {/* Title with enhanced styling */}
            <div className="relative text-2xl text-gray-900 mb-3 text-center leading-tight transition-all duration-300 group-hover:text-primary">
              {front.title}
            </div>

            {/* Subtitle with better styling */}
            {front.subtitle && (
              <div className="relative text-base text-gray-500 text-center transition-colors duration-300 group-hover:text-gray-600 font-medium">
                {front.subtitle}
              </div>
            )}
          </div>
          
          {/* Back Side */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg flex flex-col justify-center p-8 border border-gray-100"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Description */}
            <div className="text-gray-600 text-sm text-center leading-relaxed mb-8">
              {back.description}
            </div>

            {/* Simple Feature List */}
            <div className="space-y-3">
              {back.features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-700 py-2">
                  <div className="w-1 h-1 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FollowerPointerCard>
  );
};
