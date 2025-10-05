"use client"

import { HeroSection } from "@/components/hero-section"
import { MusicSection } from "@/components/music-section"
import { VideosSection } from "@/components/videos-section"
import { EventsSection } from "@/components/events-section"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <MusicSection />
      <VideosSection />
      <EventsSection />
      <footer className="bg-vintage-dark text-vintage-cream py-8 text-center">
        <p className="text-sm">© 2025 Sant Roc. All rights reserved.</p>
      </footer>
    </main>
  )
}
