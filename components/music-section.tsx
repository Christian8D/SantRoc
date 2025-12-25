"use client"

import { Music } from "lucide-react"
import { useContent } from "@/lib/content-context"

export function MusicSection() {
  const { musicLinks, isLoadingMusic } = useContent()

  if (isLoadingMusic) {
    return (
      <section id="music" className="py-20 music-section-bg relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-vintage-dark text-xl">Loading music...</div>
        </div>
      </section>
    )
  }
  // Split music links into left and right columns
  const midPoint = Math.ceil(musicLinks.length / 2)
  const leftColumnLinks = musicLinks.slice(0, midPoint)
  const rightColumnLinks = musicLinks.slice(midPoint)

  return (
    <section id="music" className="py-20 music-section-bg relative overflow-hidden">
      {/* Animated psychedelic background */}
      <div className="absolute inset-0 music-psychedelic-bg opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-12">
         
          <h2 className="groovy-title text-5xl music-title-gradient">Music</h2>
        </div>
        
        {/* 3-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center">
          {/* Left column - Music links */}
          <div className="space-y-4 flex flex-col justify-center">
            {leftColumnLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="block p-6 music-link-card rounded-lg transition-all hover:scale-105 relative overflow-hidden group"
              >
                <div className="music-link-blur-overlay absolute inset-0"></div>
                <h3 className="text-2xl font-serif text-center underline decoration-2 underline-offset-4 relative z-10 music-link-text">
                  {link.title}
                </h3>
              </a>
            ))}
          </div>

          {/* Middle column - Reel-to-reel image */}
          <div className="flex justify-center items-center">
            <div className="music-image-wrapper">
              <img 
                src="/reel-to-reel.png" 
                alt="Reel-to-reel tape recorder" 
                className="w-[262px] h-[275px] relative z-10 music-image-glow"
              />
            </div>
          </div>

          {/* Right column - Music links */}
          <div className="space-y-4 flex flex-col justify-center">
            {rightColumnLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="block p-6 music-link-card rounded-lg transition-all hover:scale-105 relative overflow-hidden group"
              >
                <div className="music-link-blur-overlay absolute inset-0"></div>
                <h3 className="text-2xl font-serif text-center underline decoration-2 underline-offset-4 relative z-10 music-link-text">
                  {link.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
