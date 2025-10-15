"use client"

import { useContent } from "@/lib/content-context"

export function HeroSection() {
  const { 
    backgroundImage, 
    backgroundPosition, 
    backgroundSize, 
    backgroundRepeat,
    heroTitle, 
    heroDescription, 
    isLoading 
  } = useContent()

  // Debug logging
  console.log('Background image URL:', backgroundImage)
  console.log('Background position:', backgroundPosition)
  console.log('Background size:', backgroundSize)
  console.log('Background repeat:', backgroundRepeat)
  console.log('Is loading:', isLoading)

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="text-vintage-tan text-xl">Loading...</div>
      </section>
    )
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0"
        style={{ 
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #8b7355 0%, #c4a574 100%)',
          backgroundColor: '#8b7355',
          backgroundPosition: backgroundPosition || 'center',
          backgroundSize: backgroundSize || 'cover',
          backgroundRepeat: backgroundRepeat || 'no-repeat',
          zIndex: 1
        }}
      />
      
      {/* Vintage Overlay Layer */}
      <div 
        className="absolute inset-0 vintage-overlay"
        style={{ zIndex: 2 }}
      />
      
      {/* Grain Texture Layer */}
      <div 
        className="absolute inset-0 grain-texture"
        style={{ zIndex: 3 }}
      />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center" style={{ zIndex: 4 }}>
        <h1 className="groovy-title text-7xl md:text-9xl text-vintage-tan mb-12">{heroTitle}</h1>

        <div className="max-w-3xl mx-auto bg-vintage-cream/95 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl">
          <div 
            className="text-vintage-dark text-lg md:text-xl leading-relaxed font-serif whitespace-pre-wrap"
          >
            {heroDescription}
          </div>
        </div>
      </div>
    </section>
  )
}
