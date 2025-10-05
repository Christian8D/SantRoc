"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Plus, Trash2, Loader2 } from "lucide-react"
import { useContent } from "@/lib/content-context"
import { useState } from "react"

export function EventsManager() {
  const { events, addEvent, deleteEvent, isLoadingEvents } = useContent()
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newDate, setNewDate] = useState("")

  const handleAdd = async () => {
    if (newTitle && newDescription && newDate) {
      try {
        await addEvent(newTitle, newDescription, newDate)
        setNewTitle("")
        setNewDescription("")
        setNewDate("")
        alert("Event added successfully!")
      } catch (error) {
        alert("Error adding event. Please try again.")
      }
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id)
      alert("Event deleted successfully!")
    } catch (error) {
      alert("Error deleting event. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Events
        </CardTitle>
        <CardDescription>Manage upcoming events and shows</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Current Events</h3>
          {events.map((event) => (
            <div key={event.id} className="flex items-start gap-4 p-4 bg-vintage-tan/10 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <p className="text-xs text-muted-foreground">
                  {event.event_date ? new Date(event.event_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }) : "No date set"}
                </p>
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={() => handleDelete(event.id)}
                disabled={isLoadingEvents}
              >
                {isLoadingEvents ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="font-medium">Add New Event</h3>
          <div>
            <Label htmlFor="event-title">Title</Label>
            <Input
              id="event-title"
              placeholder="Event name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={isLoadingEvents}
            />
          </div>
          <div>
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              placeholder="Event details"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
              disabled={isLoadingEvents}
            />
          </div>
          <div>
            <Label htmlFor="event-date">Date & Time</Label>
            <Input 
              id="event-date" 
              type="datetime-local" 
              value={newDate} 
              onChange={(e) => setNewDate(e.target.value)}
              disabled={isLoadingEvents}
            />
          </div>
          <Button 
            onClick={handleAdd} 
            className="w-full"
            disabled={isLoadingEvents || !newTitle || !newDescription || !newDate}
          >
            {isLoadingEvents ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {isLoadingEvents ? "Adding..." : "Add Event"}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Changes are automatically saved to the database and will be visible on the homepage.
        </p>
      </CardContent>
    </Card>
  )
}
