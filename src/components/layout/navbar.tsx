"use client"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import gsap from "gsap"

interface NavItem {
  name: string
  href: string
}

export const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const navItems: NavItem[] = useMemo(() => [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ], [])

  const refs = useRef<HTMLAnchorElement[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Animate indicator to the active item
  const moveIndicator = useCallback((index: number) => {
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
  }, [])

  // Section highlighting with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const index = navItems.findIndex(item => item.href === `#${sectionId}`)
          if (index !== -1 && index !== activeIndex) {
            setActiveIndex(index)
          }
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    // Observe all sections
    navItems.forEach(item => {
      const sectionId = item.href.replace('#', '')
      const section = document.getElementById(sectionId)
      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [navItems, activeIndex])

  useEffect(() => {
    moveIndicator(activeIndex)
  }, [activeIndex, moveIndicator])

  // Animate hover lift for non-active items
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return

      // Remove previous listeners to avoid stacking
      el.onmouseenter = null
      el.onmouseleave = null

      if (i !== activeIndex) {
        const handleMouseEnter = () => {
          gsap.to(el, { y: -5, duration: 0.8, ease: "power2.out" })
        }

        const handleMouseLeave = () => {
          gsap.to(el, { y: 0, duration: 0.8, ease: "power2.out" })
        }

        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)

        // Cleanup function for this element
        return () => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        }
      } else {
        // Ensure active item stays at y:0
        gsap.to(el, { y: 0, duration: 0.2 })
      }
    })
  }, [activeIndex])

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index)
    
    // Smooth scroll to section
    const sectionId = href.replace('#', '')
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <nav className="w-full flex justify-center" role="navigation" aria-label="Main navigation">
      <div className="relative flex items-center rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg">
        {/* Orange moving indicator */}
        <div 
          ref={indicatorRef} 
          className="absolute top-0 bottom-0 rounded-full bg-primary transition-all duration-300" 
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />

        {navItems.map((item, i) => (
          <a
            key={item.name}
            href={item.href}
            ref={(el) => {
              if (el) refs.current[i] = el
            }}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(i, item.href)
            }}
            className={`relative z-10 px-5 py-3 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
              ${i === activeIndex ? "text-primary-foreground" : "text-foreground hover:text-primary"}`}
            aria-current={i === activeIndex ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
