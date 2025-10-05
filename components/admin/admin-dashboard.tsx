"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundManager } from "./background-manager"
import { ContentManager } from "./content-manager"
import { MusicManager } from "./music-manager"
import { VideosManager } from "./videos-manager"
import { EventsManager } from "./events-manager"

export function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-serif text-vintage-dark mb-8">Content Management</h1>

      <Tabs defaultValue="background" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="content">Site Content</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
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
