"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video, Plus, Trash2, Loader2 } from "lucide-react"
import type { Video as VideoType } from "@/lib/supabase"

export function VideosManager() {
  const [videos, setVideos] = useState<VideoType[]>([])
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newYoutubeUrl, setNewYoutubeUrl] = useState("")
  const [newCategory, setNewCategory] = useState("general")

  // Load videos on component mount
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch('/api/videos')
        const data = await response.json()
        if (data.data) {
          setVideos(data.data)
        }
      } catch (error) {
        console.error('Error loading videos:', error)
      }
    }
    loadVideos()
  }, [])

  const handleAdd = async () => {
    if (!newTitle || !newYoutubeUrl) return

    setIsLoadingVideos(true)
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, youtube_url: newYoutubeUrl, category: newCategory }),
      })

      if (response.ok) {
        const data = await response.json()
        setVideos([...videos, data.data])
        setNewTitle("")
        setNewYoutubeUrl("")
        setNewCategory("general")
        alert("Video added successfully!")
      } else {
        alert("Error adding video. Please try again.")
      }
    } catch (error) {
      alert("Error adding video. Please try again.")
    } finally {
      setIsLoadingVideos(false)
    }
  }

  const handleDelete = async (id: string) => {
    setIsLoadingVideos(true)
    try {
      const response = await fetch(`/api/videos?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setVideos(videos.filter(video => video.id !== id))
        alert("Video deleted successfully!")
      } else {
        alert("Error deleting video. Please try again.")
      }
    } catch (error) {
      alert("Error deleting video. Please try again.")
    } finally {
      setIsLoadingVideos(false)
    }
  }
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video, Plus, Trash2, Loader2 } from "lucide-react"

export function VideosManager() {
  const { videos, addVideo, deleteVideo, isLoadingVideos } = useContent()
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const handleAdd = async () => {
    if (newTitle && newUrl) {
      try {
        await addVideo(newTitle, newUrl)
        setNewTitle("")
        setNewUrl("")
        alert("Video added successfully!")
      } catch (error) {
        alert("Error adding video. Please try again.")
      }
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteVideo(id)
      alert("Video deleted successfully!")
    } catch (error) {
      alert("Error deleting video. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          YouTube Videos
        </CardTitle>
        <CardDescription>Manage YouTube videos displayed on the site</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Current Videos</h3>
          {videos.map((video) => (
            <div key={video.id} className="flex items-center gap-4 p-4 bg-vintage-tan/10 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{video.title}</p>
                <p className="text-sm text-muted-foreground">{video.youtube_url}</p>
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={() => handleDelete(video.id)}
                disabled={isLoadingVideos}
              >
                {isLoadingVideos ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="font-medium">Add New Video</h3>
          <div>
            <Label htmlFor="video-title">Title</Label>
            <Input
              id="video-title"
              placeholder="Video title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={isLoadingVideos}
            />
          </div>
          <div>
            <Label htmlFor="video-url">YouTube URL</Label>
            <Input
              id="video-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              disabled={isLoadingVideos}
            />
          </div>
          <Button 
            onClick={handleAdd} 
            className="w-full"
            disabled={isLoadingVideos || !newTitle || !newUrl}
          >
            {isLoadingVideos ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {isLoadingVideos ? "Adding..." : "Add Video"}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Changes are automatically saved to the database and will be visible on the homepage.
        </p>
      </CardContent>
    </Card>
  )
}
