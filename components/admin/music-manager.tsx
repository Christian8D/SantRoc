"use client"

import { useState } from "react"
import { useContent } from "@/lib/content-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, Plus, Trash2, Loader2 } from "lucide-react"

export function MusicManager() {
  const { musicLinks, addMusicLink, deleteMusicLink, isLoadingMusic } = useContent()
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const handleAdd = async () => {
    if (newTitle && newUrl) {
      try {
        await addMusicLink(newTitle, newUrl)
        setNewTitle("")
        setNewUrl("")
        alert("Music link added successfully!")
      } catch (error) {
        alert("Error adding music link. Please try again.")
      }
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMusicLink(id)
      alert("Music link deleted successfully!")
    } catch (error) {
      alert("Error deleting music link. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Music Links
        </CardTitle>
        <CardDescription>Manage music links displayed on the site</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Current Music Links</h3>
          {musicLinks.map((link) => (
            <div key={link.id} className="flex items-center gap-4 p-4 bg-vintage-tan/10 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{link.title}</p>
                <p className="text-sm text-muted-foreground">{link.url}</p>
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={() => handleDelete(link.id)}
                disabled={isLoadingMusic}
              >
                {isLoadingMusic ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="font-medium">Add New Music Link</h3>
          <div>
            <Label htmlFor="music-title">Title</Label>
            <Input
              id="music-title"
              placeholder="Song or album name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={isLoadingMusic}
            />
          </div>
          <div>
            <Label htmlFor="music-url">URL</Label>
            <Input
              id="music-url"
              type="url"
              placeholder="https://spotify.com/..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              disabled={isLoadingMusic}
            />
          </div>
          <Button 
            onClick={handleAdd} 
            className="w-full"
            disabled={isLoadingMusic || !newTitle || !newUrl}
          >
            {isLoadingMusic ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {isLoadingMusic ? "Adding..." : "Add Music Link"}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Changes are automatically saved to the database and will be visible on the homepage.
        </p>
      </CardContent>
    </Card>
  )
}
