"use client"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import gsap from "gsap"

interface NavItem {
  name: string
  href: string
}

export const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0) // For delayed text color change
  const navItems: NavItem[] = useMemo(() => [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
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
        duration: 0.2,
        ease: "power2.inOut",
        onUpdate: function() {
          // Update text color at 50% of animation for perfect sync
          if (this.progress() >= 0.5 && displayIndex !== index) {
            setDisplayIndex(index)
          }
        }
      })
    }
  }, [displayIndex])

  // Section highlighting with scroll-based detection
  useEffect(() => {
    // Use scroll-based detection for better accuracy with sticky/tall sections
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3 // Check at 1/3 from top
      
      let newIndex = 0
      
      // Check each section to find which one we're in
      for (let i = navItems.length - 1; i >= 0; i--) {
        const sectionId = navItems[i].href.replace('#', '')
        const section = document.getElementById(sectionId)
        
        if (section) {
          const sectionTop = section.offsetTop
          
          if (scrollPosition >= sectionTop) {
            newIndex = i
            break
          }
        }
      }
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    // Initial check
    handleScroll()
    
    // Listen to scroll events with throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [navItems, activeIndex])

  useEffect(() => {
    moveIndicator(activeIndex)
  }, [activeIndex, moveIndicator])

  // Animate hover lift for non-active items
  useEffect(() => {
    const cleanupFunctions: (() => void)[] = []

    refs.current.forEach((el, i) => {
      if (!el) return

      if (i !== displayIndex) {
        const handleMouseEnter = () => {
          gsap.to(el, { 
            y: -4, 
            duration: 0.25, 
            ease: "power1.out" 
          })
        }

        const handleMouseLeave = () => {
          gsap.to(el, { 
            y: 0, 
            duration: 0.25, 
            ease: "power1.inOut" 
          })
        }

        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)

        // Store cleanup function
        cleanupFunctions.push(() => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        })
      } else {
        // Ensure active item stays at y:0 and prevent hover effects
        gsap.to(el, { y: 0, duration: 0.2, ease: "power1.inOut" })
      }
    })

    // Return cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [displayIndex])

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index)
    setDisplayIndex(index) // Immediately update display for clicks
    
    // Smooth scroll to section
    const sectionId = href.replace('#', '')
    const section = document.getElementById(sectionId)
    if (section) {
      const navbarHeight = 80 // Approximate navbar height
      const sectionTop = section.offsetTop - navbarHeight
      
      window.scrollTo({ 
        top: sectionTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="w-full flex justify-center" role="navigation" aria-label="Main navigation">
      <div className="relative flex items-center rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg">
        {/* Orange moving indicator */}
        <div 
          ref={indicatorRef} 
          className="absolute top-0 bottom-0 rounded-full bg-primary" 
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
            className={`relative z-10 px-5 py-3 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
              ${i === displayIndex ? "text-primary-foreground" : "text-foreground hover:text-primary"}`}
            aria-current={i === displayIndex ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
