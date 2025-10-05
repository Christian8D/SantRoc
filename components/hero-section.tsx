"use client"

import { useContent } from "@/lib/content-context"

export function HeroSection() {
  const { backgroundImage, heroTitle, heroDescription } = useContent()

  return (
    <section className="relative min-h-screen flex items-center justify-center grain-texture">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center vintage-overlay"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <h1 className="groovy-title text-7xl md:text-9xl text-vintage-tan mb-12">{heroTitle}</h1>

        <div className="max-w-3xl mx-auto bg-vintage-cream/95 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl">
          <p className="text-vintage-dark text-lg md:text-xl leading-relaxed font-serif">{heroDescription}</p>
        </div>
      </div>
    </section>
  )
}
