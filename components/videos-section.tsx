"use client"

import { useContent } from "@/lib/content-context"
import { Video } from "lucide-react"

function getYouTubeEmbedUrl(url: string) {
  const videoId = url.split("v=")[1]?.split("&")[0]
  return `https://www.youtube.com/embed/${videoId}`
}

export function VideosSection() {
  const { videos } = useContent()

  return (
    <section id="videos" className="py-20 bg-vintage-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Video className="w-8 h-8 text-vintage-tan" />
          <h2 className="groovy-title text-5xl text-vintage-cream">Videos</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-vintage-cream/10 p-6 rounded-lg">
              <h3 className="text-2xl font-serif text-vintage-cream mb-4 underline decoration-vintage-tan decoration-2 underline-offset-4">
                {video.title}
              </h3>
              <div className="aspect-video rounded overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(video.youtube_url)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
