"use client"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import gsap from "gsap"
import { Menu, X } from "lucide-react"

interface NavItem {
  name: string
  href: string
}

export const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const navItems: NavItem[] = useMemo(() => [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ], [])

  const refs = useRef<(HTMLAnchorElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Animate indicator to the active item (desktop only)
  const moveIndicator = useCallback((index: number) => {
    if (isMobile) return
    
    const el = refs.current[index]
    if (el && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = el
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.2,
        ease: "power2.inOut",
        onUpdate: function() {
          if (this.progress() >= 0.5 && displayIndex !== index) {
            setDisplayIndex(index)
          }
        }
      })
    }
  }, [displayIndex, isMobile])

  // Section highlighting with scroll-based detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      let newIndex = 0
      
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

    handleScroll()
    
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
    if (!isMobile) {
      moveIndicator(activeIndex)
    }
  }, [activeIndex, moveIndicator, isMobile])

  // Animate hover lift for non-active items (desktop only)
  useEffect(() => {
    if (isMobile) return

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

        cleanupFunctions.push(() => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        })
      } else {
        gsap.to(el, { y: 0, duration: 0.2, ease: "power1.inOut" })
      }
    })

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [displayIndex, isMobile])

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index)
    setDisplayIndex(index)
    setMobileMenuOpen(false)
    
    const sectionId = href.replace('#', '')
    const section = document.getElementById(sectionId)
    if (section) {
      const navbarHeight = 80
      const sectionTop = section.offsetTop - navbarHeight
      
      window.scrollTo({ 
        top: sectionTop,
        behavior: 'smooth'
      })
    }
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('nav')) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileMenuOpen])

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex w-full justify-center" role="navigation" aria-label="Main navigation">
        <div className="relative flex items-center rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg">
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
                refs.current[i] = el
              }}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(i, item.href)
              }}
              className={`relative z-10 px-3 lg:px-5 py-2 lg:py-3 rounded-full text-xs lg:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                ${i === displayIndex ? "text-primary-foreground" : "text-foreground hover:text-primary"}`}
              aria-current={i === displayIndex ? "page" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden w-full px-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg px-5 py-3 max-w-xs">
          <span className="text-base font-bold text-primary">D6VS</span>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-4 w-36 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in-down z-50">
            {navItems.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(i, item.href)
                }}
                className={`block px-6 py-4 text-base font-medium transition-colors border-b border-border/50 last:border-b-0
                  ${i === activeIndex 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-primary/10 active:bg-primary/20"
                  }`}
                aria-current={i === activeIndex ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  )
}