"use client"

import { useState } from "react"
import { useContent } from "@/lib/content-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, Upload, Loader2 } from "lucide-react"

export function BackgroundManager() {
  const { backgroundImage, setBackgroundImage, isLoadingBackground } = useContent()
  const [newImageUrl, setNewImageUrl] = useState("")

  const handleUpdate = async () => {
    if (newImageUrl) {
      try {
        await setBackgroundImage(newImageUrl)
        setNewImageUrl("")
        alert("Background image updated successfully!")
      } catch (error) {
        alert("Error updating background image. Please try again.")
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Background Image
        </CardTitle>
        <CardDescription>Manage the hero section background image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-2 block">Current Background</Label>
          <div className="aspect-video rounded-lg overflow-hidden border-2 border-vintage-brown">
            <img
              src={backgroundImage || "/placeholder.svg"}
              alt="Current background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="image-url">New Image URL</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              disabled={isLoadingBackground}
            />
          </div>

          <Button 
            onClick={handleUpdate} 
            className="w-full"
            disabled={isLoadingBackground || !newImageUrl}
          >
            {isLoadingBackground ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isLoadingBackground ? "Updating..." : "Update Background"}
          </Button>

          <p className="text-sm text-muted-foreground">
            Changes are automatically saved to the database and will be visible on the homepage.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
