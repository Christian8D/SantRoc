"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Save, Loader2 } from "lucide-react"

export function ContentManager() {
  const [heroTitle, setHeroTitle] = useState("")
  const [heroDescription, setHeroDescription] = useState("")
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  
  // Load current content on component mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/content')
        const data = await response.json()
        if (data.data) {
          data.data.forEach((item: any) => {
            if (item.section === 'hero_title') {
              setHeroTitle(item.content)
            } else if (item.section === 'hero_description') {
              setHeroDescription(item.content)
            }
          })
        }
      } catch (error) {
        console.error('Error loading content:', error)
      }
    }
    loadContent()
  }, [])

  const handleSave = async () => {
    setIsLoadingContent(true)
    try {
      await Promise.all([
        fetch('/api/content', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ section: 'hero_title', content: heroTitle }),
        }),
        fetch('/api/content', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ section: 'hero_description', content: heroDescription }),
        })
      ])
      alert("Content saved successfully!")
    } catch (error) {
      alert("Error saving content. Please try again.")
    } finally {
      setIsLoadingContent(false)
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
            value={heroTitle} 
            onChange={(e) => setHeroTitle(e.target.value)}
            disabled={isLoadingContent}
          />
        </div>

        <div>
          <Label htmlFor="description">Hero Description</Label>
          <Textarea
            id="description"
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
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
