"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundManager } from "./background-manager"
import { ContentManager } from "./content-manager"
import { MusicManager } from "./music-manager"
import { VideosManager } from "./videos-manager"
import { EventsManager } from "./events-manager"

export function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <h1 className="text-2xl md:text-4xl font-serif text-vintage-dark mb-6 md:mb-8">Content Management</h1>

      <Tabs defaultValue="background" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 md:mb-8 h-auto gap-1">
          <TabsTrigger value="background" className="text-xs md:text-sm py-2 md:py-3">Background</TabsTrigger>
          <TabsTrigger value="content" className="text-xs md:text-sm py-2 md:py-3">Content</TabsTrigger>
          <TabsTrigger value="music" className="text-xs md:text-sm py-2 md:py-3">Music</TabsTrigger>
          <TabsTrigger value="videos" className="text-xs md:text-sm py-2 md:py-3">Videos</TabsTrigger>
          <TabsTrigger value="events" className="text-xs md:text-sm py-2 md:py-3 col-start-1 col-end-3 md:col-auto">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="background">
          <BackgroundManager />
        </TabsContent>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>

        <TabsContent value="music">
          <MusicManager />
        </TabsContent>

        <TabsContent value="videos">
          <VideosManager />
        </TabsContent>

        <TabsContent value="events">
          <EventsManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
