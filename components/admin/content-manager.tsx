"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Save, Loader2 } from "lucide-react"
import { useContent } from "@/lib/content-context"

export function ContentManager() {
  const { heroTitle, heroDescription, setHeroTitle, setHeroDescription, isLoadingContent } = useContent()
  const [localTitle, setLocalTitle] = useState("")
  const [localDescription, setLocalDescription] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  
  // Check if we have existing content
  const hasExistingContent = heroTitle || heroDescription
  
  // Sync local state with context
  useEffect(() => {
    setLocalTitle(heroTitle)
    setLocalDescription(heroDescription)
  }, [heroTitle, heroDescription])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Only save if we have existing content to update
      if (heroTitle && localTitle) {
        await setHeroTitle(localTitle)
      }
      if (heroDescription && localDescription) {
        await setHeroDescription(localDescription)
      }
      
      // Check if we actually have content to save
      if (!heroTitle && !heroDescription) {
        alert("No existing content found to update. Please create content sections first.")
        return
      }
      
      alert("Content updated successfully!")
    } catch (error) {
      console.error('Error saving content:', error)
      alert("Error updating content. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Site Content
        </CardTitle>
        <CardDescription>
          {hasExistingContent 
            ? "Edit the hero section title and description" 
            : "No existing content found. Content sections must be created first."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasExistingContent && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This editor only allows updating existing content. 
              If no content sections exist, they need to be created through the database or initial setup first.
            </p>
          </div>
        )}
        <div>
          <Label htmlFor="title">Hero Title</Label>
          <Input 
            id="title" 
            value={localTitle} 
            onChange={(e) => setLocalTitle(e.target.value)}
            disabled={isSaving || isLoadingContent}
          />
        </div>

        <div>
          <Label htmlFor="description">Hero Description</Label>
          <Textarea
            id="description"
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            rows={10}
            className="resize-none"
            disabled={isSaving || isLoadingContent}
            placeholder="Enter your description here. Line breaks and spacing will be preserved on the frontend."
          />
          {localDescription && (
            <div className="mt-3 p-3 bg-gray-50 border rounded-lg">
              <Label className="text-sm font-medium text-gray-600">Preview:</Label>
              <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap font-serif">
                {localDescription}
              </div>
            </div>
          )}
        </div>

        <Button 
          onClick={handleSave} 
          className="w-full"
          disabled={isSaving || isLoadingContent || !hasExistingContent}
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? "Updating..." : "Update Content"}
        </Button>

        <p className="text-sm text-muted-foreground">
          {hasExistingContent 
            ? "Changes are automatically saved to the database and will be visible on the homepage. Line breaks and spacing in the description will be preserved."
            : "This editor can only update existing content sections. Create content first through the database setup."
          }
        </p>
      </CardContent>
    </Card>
  )
}
