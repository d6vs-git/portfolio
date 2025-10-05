"use client"

import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { ProjectsSection } from "@/components/projects-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <HeroSection />
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
