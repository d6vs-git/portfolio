"use client";

import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen overflow-hidden relative bg-white">
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-64 -left-64 w-[600px] h-[600px] opacity-30" style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 70%)',
          filter: 'blur(80px)'
        }} />
        <div className="absolute -top-64 -right-64 w-[600px] h-[600px] opacity-30" style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 70%)',
          filter: 'blur(80px)'
        }} />
      </div>

      <div className="font-extrabold h-screen w-screen relative">
        {/* Top Half - D6VS Logo */}
        <div className="flex items-end justify-center h-1/2 text-8xl md:text-9xl lg:text-[12rem] relative z-10">
          <span className="text-foreground/80">D</span>
          <span className="text-primary">6</span>
          <span className="text-foreground/80">V</span>
          <span className="text-foreground/80">S</span>
        </div>

        {/* <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'radial-gradient(ellipse 100px 100px at -5% 60%, rgba(234, 88, 12, 0.95) 0%, rgba(249, 115, 22, 0.85) 15%, rgba(251, 146, 60, 0.7) 30%, rgba(253, 186, 116, 0.4) 50%, rgba(254, 215, 170, 0.2) 70%, transparent 100%)'
            }}
          />
          
          <div 
            className="absolute -left-82 top-[90%] -translate-y-1/2 w-[900px] h-[900px]"
            style={{
              background: 'radial-gradient(circle, rgba(234, 88, 12, 0.9) 0%, rgba(249, 115, 22, 0.6) 25%, rgba(251, 146, 60, 0.3) 50%, transparent 75%)',
              filter: 'blur(60px)'
            }}
          />

          <div 
            className="absolute left-10 top-[65%] -translate-y-1/2 w-[500px] h-[500px]"
            style={{
              background: 'radial-gradient(circle, rgba(234, 88, 12, 1) 0%, rgba(249, 115, 22, 0.8) 30%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
        </div> */}

        {/* Bottom Half - Description */}
        <div className="relative h-1/2 w-full flex justify-start items-end z-10">
          {/* Content Container */}
          <div className="w-full h-full flex items-end">
            <div className="grid lg:grid-cols-2 gap-8 w-full p-8 md:p-12 lg:p-16">
              {/* Left: Text Content */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Your Vision, Brought to life
                  <br />
                  <span className="block mt-4 md:mt-6 text-md md:text-lg lg:text-xl font-normal text-gray-700 leading-relaxed">
                    From discovery and prototyping to development, deployment, and
                    ongoing iteration, we partner with you to ship useful, delightful,
                    and maintainable products
                  </span>
                </h1>
              </div>

              {/* Right: Logo */}
              <div className="flex items-end justify-end">
                <div className="w-48 h-48 md:w-64 md:h-64 relative">
                  <Image
                    src="/logo.png"
                    alt="D6VS Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;