
"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"

const footerLinks = {
  contact: [
    { text: "Book a Call", href: "#", hoverText: "Schedule Meeting" },
    { text: "mielucristian@gmail.com", href: "mailto:mielucristian@gmail.com", hoverText: "Send Email" },
  ],
  useful: [
    { text: "Home", href: "/", hoverText: "Go Home" },
    { text: "404 Page", href: "/404", hoverText: "Visit 404 Page" },
    { text: "Licensing", href: "/licensing", hoverText: "View License" },
  ],
  social: [
    { text: "Framer", href: "https://framer.com", hoverText: "Visit Framer" },
    { text: "X", href: "https://x.com", hoverText: "Follow on X" },
    { text: "LinkedIn", href: "https://linkedin.com", hoverText: "Connect LinkedIn" },
  ],
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const cursor = cursorRef.current
    const cursorText = cursorTextRef.current

    if (!footer || !cursor || !cursorText) return

    let isInFooter = false
    let isHoveringLink = false
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    // Initialize cursor as hidden
    gsap.set(cursor, {
      opacity: 0,
      scale: 0,
      xPercent: -50,
      yPercent: -50,
    })

    const animateCursor = () => {
      if (isInFooter) {
        const targetX = mouseX + 20
        const targetY = mouseY + 20

        cursorX += (targetX - cursorX) * 0.15
        cursorY += (targetY - cursorY) * 0.15

        gsap.set(cursor, {
          x: cursorX,
          y: cursorY,
        })
      }
      requestAnimationFrame(animateCursor)
    }
    animateCursor()

    const resetCursorToDot = () => {
      cursorText.textContent = ""
      cursor.style.borderRadius = "50%"
      cursor.style.padding = "0"
      cursor.style.width = "12px"
      cursor.style.height = "12px"
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const target = e.target as HTMLElement
      const isOverLink = target.hasAttribute("data-hover-text")

      if (!isOverLink && isHoveringLink) {
        isHoveringLink = false
        resetCursorToDot()
      }
    }

    const handleMouseEnter = () => {
      isInFooter = true
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
    }

    const handleMouseLeave = () => {
      isInFooter = false
      isHoveringLink = false
      gsap.to(cursor, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.inOut",
      })
      resetCursorToDot()
    }

    const handleLinkEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const hoverText = target.getAttribute("data-hover-text") || ""

      isHoveringLink = true
      cursorText.textContent = hoverText

      gsap.to(cursor, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)",
      })

      cursor.style.borderRadius = "50px"
      cursor.style.padding = "8px 16px"
      cursor.style.minWidth = "auto"
      cursor.style.width = "auto"
      cursor.style.height = "auto"
    }

    const handleLinkLeave = () => {
      isHoveringLink = false
      resetCursorToDot()
    }

    footer.addEventListener("mouseenter", handleMouseEnter)
    footer.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousemove", handleMouseMove)

    const links = footer.querySelectorAll("[data-hover-text]")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkEnter)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      footer.removeEventListener("mouseenter", handleMouseEnter)
      footer.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousemove", handleMouseMove)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkEnter)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  return (
    <>
      <footer ref={footerRef} className="bg-gray-100 py-16 px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Contact Me */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-black">Contact Me</h3>
              <div className="space-y-4">
                {footerLinks.contact.map((link, index) => (
                  <div key={index}>
                    <a 
                      href={link.href}
                      data-hover-text={link.hoverText}
                      className="text-gray-600 hover:text-black transition-colors duration-200 inline-block px-2 py-1 rounded"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>


            {/* Social */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-black">Social</h3>
              <div className="space-y-4">
                {footerLinks.social.map((link, index) => (
                  <div key={index}>
                    <a 
                      href={link.href}
                      data-hover-text={link.hoverText}
                      className="text-gray-600 hover:text-black transition-colors duration-200 inline-block px-2 py-1 rounded"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 bg-primary text-white text-sm font-medium flex items-center justify-center"
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          mixBlendMode: "normal",
        }}
      >
        <span ref={cursorTextRef} className="whitespace-nowrap"></span>
      </div>
    </>
  )
}
