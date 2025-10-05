"use client"

import { useState, useEffect } from "react"
import { useContent } from "@/lib/content-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Save, Loader2 } from "lucide-react"

export function ContentManager() {
  const { 
    heroTitle, 
    setHeroTitle, 
    heroDescription, 
    setHeroDescription, 
    isLoadingContent 
  } = useContent()
  
  const [title, setTitle] = useState(heroTitle)
  const [description, setDescription] = useState(heroDescription)

  useEffect(() => {
    setTitle(heroTitle)
    setDescription(heroDescription)
  }, [heroTitle, heroDescription])

  const handleSave = async () => {
    try {
      await Promise.all([
        setHeroTitle(title),
        setHeroDescription(description)
      ])
      alert("Content saved successfully!")
    } catch (error) {
      alert("Error saving content. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Site Content
        </CardTitle>
        <CardDescription>Edit the hero section title and description</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Hero Title</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoadingContent}
          />
        </div>

        <div>
          <Label htmlFor="description">Hero Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
            className="resize-none"
            disabled={isLoadingContent}
          />
        </div>

        <Button 
          onClick={handleSave} 
          className="w-full"
          disabled={isLoadingContent}
        >
          {isLoadingContent ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isLoadingContent ? "Saving..." : "Save Changes"}
        </Button>

        <p className="text-sm text-muted-foreground">
          Changes are automatically saved to the database and will be visible on the homepage.
        </p>
      </CardContent>
    </Card>
  )
}
