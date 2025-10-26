"use client"


import { AboutSection } from "@/components/sections/about"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ServicesSection } from "@/components/sections/services"
import { ProcessSection } from "@/components/sections/process"
import { ProjectsSection } from "@/components/sections/projects"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import HeroSection from "@/components/sections/hero"

export default function Home() {
  return (
    <>
    <HeroSection/>
      <AboutSection />
      <TestimonialsSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  )
}
