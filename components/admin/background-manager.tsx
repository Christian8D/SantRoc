"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, Upload, Loader2, X } from "lucide-react"

export function BackgroundManager() {
  const [backgroundImage, setBackgroundImage] = useState<string>("")
  const [isLoadingBackground, setIsLoadingBackground] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Background positioning settings
  const [backgroundPosition, setBackgroundPosition] = useState("center")
  const [backgroundSize, setBackgroundSize] = useState("cover")
  const [backgroundRepeat, setBackgroundRepeat] = useState("no-repeat")

  // Load current background image and settings on component mount
  useEffect(() => {
    const loadBackgroundImage = async () => {
      try {
        const response = await fetch('/api/background')
        const data = await response.json()
        if (data.data && data.data.length > 0) {
          const activeImage = data.data.find((img: any) => img.is_active)
          if (activeImage) {
            setBackgroundImage(activeImage.image_url)
            // Load positioning settings
            setBackgroundPosition(activeImage.background_position || 'center')
            setBackgroundSize(activeImage.background_size || 'cover')
            setBackgroundRepeat(activeImage.background_repeat || 'no-repeat')
          }
        }
      } catch (error) {
        console.error('Error loading background image:', error)
      }
    }
    loadBackgroundImage()
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
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
        // Now set the uploaded image as background
        const backgroundResponse = await fetch('/api/background', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image_url: result.url }),
        })

        if (backgroundResponse.ok) {
          const backgroundData = await backgroundResponse.json()
          setBackgroundImage(result.url)
          // Update positioning settings from the new background image
          setBackgroundPosition(backgroundData.data.background_position || 'center')
          setBackgroundSize(backgroundData.data.background_size || 'cover')
          setBackgroundRepeat(backgroundData.data.background_repeat || 'no-repeat')
          setSelectedFile(null)
          setPreviewUrl(null)
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
          alert("Image uploaded and set as background successfully!")
        } else {
          alert("Image uploaded but failed to set as background. Please try again.")
        }
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

  const saveBackgroundSettings = async () => {
    setIsLoadingBackground(true)
    try {
      const response = await fetch('/api/background', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          position: backgroundPosition,
          size: backgroundSize,
          repeat: backgroundRepeat
        }),
      })

      if (response.ok) {
        alert("Background positioning saved successfully!")
      } else {
        alert("Error saving background settings. Please try again.")
      }
    } catch (error) {
      alert("Error saving background settings. Please try again.")
    } finally {
      setIsLoadingBackground(false)
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
          <div 
            className="aspect-video rounded-lg overflow-hidden border-2 border-vintage-brown relative"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #8b7355 0%, #c4a574 100%)',
              backgroundPosition: backgroundPosition,
              backgroundSize: backgroundSize,
              backgroundRepeat: backgroundRepeat
            }}
          >
            {!backgroundImage && (
              <div className="absolute inset-0 flex items-center justify-center text-vintage-cream">
                <span className="text-lg font-serif">No background image set</span>
              </div>
            )}
          </div>
        </div>

        {/* Background Positioning Controls */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Background Positioning</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="background-position">Position</Label>
              <select
                id="background-position"
                value={backgroundPosition}
                onChange={(e) => setBackgroundPosition(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top left">Top Left</option>
                <option value="top right">Top Right</option>
                <option value="bottom left">Bottom Left</option>
                <option value="bottom right">Bottom Right</option>
              </select>
            </div>

            <div>
              <Label htmlFor="background-size">Size</Label>
              <select
                id="background-size"
                value={backgroundSize}
                onChange={(e) => setBackgroundSize(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="cover">Cover (Fill)</option>
                <option value="contain">Contain (Fit)</option>
                <option value="100% 100%">Stretch</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="background-repeat">Repeat</Label>
            <select
              id="background-repeat"
              value={backgroundRepeat}
              onChange={(e) => setBackgroundRepeat(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="no-repeat">No Repeat</option>
              <option value="repeat">Repeat</option>
              <option value="repeat-x">Repeat Horizontal</option>
              <option value="repeat-y">Repeat Vertical</option>
            </select>
          </div>


          <Button 
            onClick={saveBackgroundSettings} 
            className="w-full"
            disabled={isLoadingBackground}
          >
            {isLoadingBackground ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isLoadingBackground ? "Saving..." : "Save Positioning Settings"}
          </Button>
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

        </div>

        <p className="text-sm text-muted-foreground">
          Upload images directly to Supabase Storage. Changes are automatically saved to the database.
        </p>
      </CardContent>
    </Card>
  )
}
