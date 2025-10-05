"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  message?: string
}

export const LoadingSpinner = ({ 
  size = "md", 
  message = "Loading..." 
}: LoadingSpinnerProps) => {
  const spinnerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  const dotSizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3"
  }

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "none"
      })
    }

    // Animate dots
    dotsRef.current.forEach((dot, index) => {
      if (dot) {
        gsap.to(dot, {
          scale: 1.5,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
          ease: "power2.inOut"
        })
      }
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner */}
      <div 
        ref={spinnerRef}
        className={`${sizeClasses[size]} border-2 border-primary/20 border-t-primary rounded-full`}
      />
      
      {/* Loading dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) dotsRef.current[index] = el
            }}
            className={`${dotSizeClasses[size]} bg-primary rounded-full`}
          />
        ))}
      </div>
      
      {/* Message */}
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

export const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="lg" message="Loading D6VS Portfolio..." />
    </div>
  )
}