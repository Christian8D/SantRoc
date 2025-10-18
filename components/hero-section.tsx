"use client"

import { useState } from "react"
import { useContent } from "@/lib/content-context"
import { ChevronDown, ChevronUp, X } from "lucide-react"

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

  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

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
      <div className="relative z-10 container mx-auto px-4 py-32 text-center min-h-screen" style={{ zIndex: 4 }}>
        {/* LP Button - Centered in the middle of the page */}
        {!isDescriptionVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setIsDescriptionVisible(true)}
              className="lp-button animate-fadeIn"
            >
              <div className="lp-record">
                <div className="lp-grooves">
                  <div className="groove groove-1"></div>
                  <div className="groove groove-2"></div>
                  <div className="groove groove-3"></div>
                  <div className="groove groove-4"></div>
                </div>
                <div className="lp-center">
                  <div className="lp-label">
                    <span className="lp-text">ABOUT</span>
                  </div>
                  <div className="lp-hole"></div>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Title at top */}
        <h1 className="groovy-title text-7xl md:text-9xl text-vintage-tan pt-16">{heroTitle}</h1>

        {/* Description Content - Appears above button when toggled */}
        <div className={`max-w-3xl mx-auto description-sunburst backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl mb-8 transition-all duration-[2000ms] ease-in-out relative ${
          isDescriptionVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}>
          {/* Close Button - Top Right Corner */}
          {isDescriptionVisible && (
            <button
              onClick={() => setIsDescriptionVisible(false)}
              className="absolute top-4 right-4 bg-vintage-dark/20 hover:bg-vintage-dark/40 text-vintage-dark rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          
          <div className="text-overlay">
            <div 
              className="text-vintage-dark text-lg md:text-xl leading-relaxed font-serif whitespace-pre-wrap relative z-10"
            >
              {heroDescription}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
