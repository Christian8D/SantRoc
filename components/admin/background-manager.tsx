"use client"

import { useState, useRef } from "react"
import { useContent } from "@/lib/content-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, Upload, Loader2, X } from "lucide-react"

export function BackgroundManager() {
  const { backgroundImage, setBackgroundImage, isLoadingBackground } = useContent()
  const [newImageUrl, setNewImageUrl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setNewImageUrl("") // Clear URL input when file is selected
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUrlUpdate = async () => {
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

  const handleFileUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok && result.url) {
        await setBackgroundImage(result.url)
        setSelectedFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        alert("Image uploaded and set as background successfully!")
      } else {
        alert(result.error || "Error uploading image. Please try again.")
      }
    } catch (error) {
      alert("Error uploading image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const clearFileSelection = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
            <Label htmlFor="file-upload">Upload New Image</Label>
            <Input
              id="file-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              ref={fileInputRef}
              disabled={isUploading || isLoadingBackground}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: JPEG, PNG, WebP. Max size: 5MB
            </p>
          </div>

          {previewUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-vintage-brown">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={clearFileSelection}
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                onClick={handleFileUpload} 
                className="w-full"
                disabled={isUploading || isLoadingBackground}
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                {isUploading ? "Uploading..." : "Upload & Set as Background"}
              </Button>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or use URL
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              disabled={isLoadingBackground || !!selectedFile}
            />
          </div>

          <Button 
            onClick={handleUrlUpdate} 
            className="w-full"
            disabled={isLoadingBackground || !newImageUrl || !!selectedFile}
          >
            {isLoadingBackground ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isLoadingBackground ? "Updating..." : "Update Background"}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Upload images directly to Supabase Storage or use external URLs. Changes are automatically saved to the database.
        </p>
      </CardContent>
    </Card>
  )
}
