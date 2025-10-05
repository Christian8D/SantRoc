"use client"

import { Music } from "lucide-react"
import { useContent } from "@/lib/content-context"

export function MusicSection() {
  const { musicLinks, isLoadingMusic } = useContent()

  if (isLoadingMusic) {
    return (
      <section id="music" className="py-20 bg-vintage-cream">
        <div className="container mx-auto px-4 text-center">
          <div className="text-vintage-dark text-xl">Loading music...</div>
        </div>
      </section>
    )
  }
  return (
    <section id="music" className="py-20 bg-vintage-cream">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Music className="w-8 h-8 text-vintage-tan" />
          <h2 className="groovy-title text-5xl text-vintage-dark">Music</h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {musicLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="block p-6 bg-vintage-tan/20 hover:bg-vintage-tan/40 border-2 border-vintage-brown rounded-lg transition-all hover:scale-105"
            >
              <h3 className="text-2xl font-serif text-vintage-dark text-center underline decoration-vintage-brown decoration-2 underline-offset-4">
                {link.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
