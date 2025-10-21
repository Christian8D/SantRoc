"use client"

import React, { useState } from "react"
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
    events,
    isLoading 
  } = useContent()

  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

  // Get the closest upcoming event
  const getClosestUpcomingEvent = () => {
    if (!events || events.length === 0) return null
    
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to start of day
    
    const upcomingEvents = events.filter(event => {
      if (!event.event_date) return false
      const eventDate = new Date(event.event_date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate >= today
    })
    
    if (upcomingEvents.length === 0) return null
    
    // Sort by date and return the closest one
    return upcomingEvents.sort((a, b) => {
      const dateA = new Date(a.event_date!)
      const dateB = new Date(b.event_date!)
      return dateA.getTime() - dateB.getTime()
    })[0]
  }

  const closestEvent = getClosestUpcomingEvent()

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
        {/* LP Button - Centered in the middle of the page - COMMENTED OUT FOR FUTURE USE */}
        {/* {!isDescriptionVisible && (
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
        )} */}

        {/* New Psychedelic About Button - Centered in the middle of the page */}
        {!isDescriptionVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setIsDescriptionVisible(true)}
              className="psychedelic-about-button animate-fadeIn mt-25"
            >
              <div className="button-content ">
                <span className="button-text">+</span>
                <div className="psychedelic-bg-effect"></div>
              </div>
            </button>
          </div>
        )}

        {/* Logo at top - COMMENTED OUT FOR FUTURE USE */}
        <div className="mb-40 flex justify-center">
          <img 
            src="/sant-roc-logo.png" 
            alt="Sant Roc" 
            className="max-w-sm md:max-w-xl lg:max-w-2xl h-auto"
          />
        </div>

        {/* Title at top */}
        {/* <h1 className="groovy-title text-7xl md:text-9xl text-vintage-tan pt-16">{heroTitle}</h1> */}

        {/* Description Content - Expands from button when toggled */}
        <div className={`expanding-content relative flex justify-center ${
          isDescriptionVisible 
            ? 'expand-visible z-50' 
            : 'expand-hidden'
        }`}>
          <div className="max-w-3xl mx-auto description-sunburst backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl mb-8">
            {/* Close Button - Top Right Corner */}
            {isDescriptionVisible && (
              <button
                onClick={() => setIsDescriptionVisible(false)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-vintage-dark rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg border-2 border-vintage-tan/50 z-50"
              >
                <X className="w-6 h-6" />
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

        {/* Closest Upcoming Event - Bottom of hero section */}
        {closestEvent && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="mb-32 bg-vintage-dark/20 backdrop-blur-sm border border-vintage-tan/30 rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-serif text-vintage-tan mb-2">
                  {closestEvent.title}
                </h2>
                {closestEvent.description && (
                  <p className="text-vintage-cream text-lg mb-3">
                    {closestEvent.description}
                  </p>
                )}
                {closestEvent.event_date && (
                  <div className="text-vintage-tan font-medium">
                    {new Date(closestEvent.event_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
