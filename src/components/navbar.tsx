"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"

export const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const refs = useRef<HTMLAnchorElement[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Animate indicator to the active item
  const moveIndicator = (index: number) => {
    const el = refs.current[index]
    if (el && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = el
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.8,
        ease: "power3.out",
      })
    }
  }

  useEffect(() => {
    moveIndicator(activeIndex)
  }, [activeIndex])

  // Animate hover lift for non-active items
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return

      // Remove previous listeners to avoid stacking
      el.onmouseenter = null
      el.onmouseleave = null

      if (i !== activeIndex) {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -5, duration: 0.8, ease: "power2.out" })
        })

        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, duration: 0.8, ease: "power2.out" })
        })
      } else {
        // Ensure active item stays at y:0
        gsap.to(el, { y: 0, duration: 0.2 })
      }
    })
  }, [activeIndex])

  return (
    <nav className="w-full flex justify-center">
      <div className="relative flex items-center rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg">
        {/* Orange moving indicator */}
        <div ref={indicatorRef} className="absolute top-0 bottom-0 rounded-full bg-primary" style={{ zIndex: 0 }}></div>

        {navItems.map((item, i) => (
          <a
            key={item.name}
            href={item.href}
            ref={(el) => {
              if (el) refs.current[i] = el
            }}
            onClick={() => setActiveIndex(i)}
            className={`relative z-10 px-5 py-3 rounded-full text-sm font-medium transition-colors duration-300
              ${i === activeIndex ? "text-primary-foreground" : "text-foreground hover:text-primary"}`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
