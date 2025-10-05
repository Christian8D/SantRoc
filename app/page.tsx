import { HeroSection } from "@/components/hero-section"
import { MusicSection } from "@/components/music-section"
import { VideosSection } from "@/components/videos-section"
import { EventsSection } from "@/components/events-section"
import { Navigation } from "@/components/navigation"
import { getAllContent } from "@/lib/data"

export default async function Home() {
  const content = await getAllContent()

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection 
        backgroundImage={content.backgroundImage}
        heroTitle={content.siteContent.heroTitle}
        heroDescription={content.siteContent.heroDescription}
      />
      <MusicSection musicLinks={content.musicLinks} />
      <VideosSection videos={content.videos} />
      <EventsSection events={content.events} />
      <footer className="bg-vintage-dark text-vintage-cream py-8 text-center">
        <p className="text-sm">© 2025 Sant Roc. All rights reserved.</p>
      </footer>
    </main>
  )
}
