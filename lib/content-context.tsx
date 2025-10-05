"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { BackgroundImage, SiteContent, MusicLink, Video, Event } from "@/lib/supabase"

type ContentContextType = {
  // Background
  backgroundImage: string
  setBackgroundImage: (url: string) => Promise<void>
  isLoadingBackground: boolean

  // Hero content
  heroTitle: string
  setHeroTitle: (title: string) => Promise<void>
  heroDescription: string
  setHeroDescription: (description: string) => Promise<void>
  isLoadingContent: boolean

  // Music
  musicLinks: MusicLink[]
  addMusicLink: (title: string, url: string) => Promise<void>
  deleteMusicLink: (id: string) => Promise<void>
  isLoadingMusic: boolean

  // Videos
  videos: Video[]
  addVideo: (title: string, youtubeUrl: string, category?: string) => Promise<void>
  deleteVideo: (id: string) => Promise<void>
  isLoadingVideos: boolean

  // Events
  events: Event[]
  addEvent: (title: string, description?: string, eventDate?: string) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  isLoadingEvents: boolean

  // General loading state
  isLoading: boolean
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  // State
  const [backgroundImage, setBackgroundImageState] = useState("")
  const [heroTitle, setHeroTitleState] = useState("")
  const [heroDescription, setHeroDescriptionState] = useState("")
  const [musicLinks, setMusicLinks] = useState<MusicLink[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [events, setEvents] = useState<Event[]>([])
  
  // Loading states
  const [isLoadingBackground, setIsLoadingBackground] = useState(false)
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const [isLoadingMusic, setIsLoadingMusic] = useState(false)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)

  const isLoading = isLoadingBackground || isLoadingContent || isLoadingMusic || isLoadingVideos || isLoadingEvents

  // Load initial data
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    await Promise.all([
      loadBackgroundImage(),
      loadSiteContent(),
      loadMusicLinks(),
      loadVideos(),
      loadEvents()
    ])
  }

  // Background functions
  const loadBackgroundImage = async () => {
    try {
      const response = await fetch('/api/background')
      const { data } = await response.json()
      if (data && data.length > 0) {
        const activeImage = data.find((img: BackgroundImage) => img.is_active)
        if (activeImage) {
          setBackgroundImageState(activeImage.image_url)
        }
      }
    } catch (error) {
      console.error('Error loading background image:', error)
    }
  }

  const setBackgroundImage = async (url: string) => {
    setIsLoadingBackground(true)
    try {
      const response = await fetch('/api/background', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: url })
      })
      if (response.ok) {
        setBackgroundImageState(url)
      }
    } catch (error) {
      console.error('Error updating background image:', error)
    } finally {
      setIsLoadingBackground(false)
    }
  }

  // Content functions
  const loadSiteContent = async () => {
    try {
      const response = await fetch('/api/content')
      const { data } = await response.json()
      if (data) {
        const titleContent = data.find((item: SiteContent) => item.section === 'hero_title')
        const descContent = data.find((item: SiteContent) => item.section === 'hero_description')
        if (titleContent) setHeroTitleState(titleContent.content)
        if (descContent) setHeroDescriptionState(descContent.content)
      }
    } catch (error) {
      console.error('Error loading site content:', error)
    }
  }

  const setHeroTitle = async (title: string) => {
    setIsLoadingContent(true)
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'hero_title', content: title })
      })
      if (response.ok) {
        setHeroTitleState(title)
      }
    } catch (error) {
      console.error('Error updating hero title:', error)
    } finally {
      setIsLoadingContent(false)
    }
  }

  const setHeroDescription = async (description: string) => {
    setIsLoadingContent(true)
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'hero_description', content: description })
      })
      if (response.ok) {
        setHeroDescriptionState(description)
      }
    } catch (error) {
      console.error('Error updating hero description:', error)
    } finally {
      setIsLoadingContent(false)
    }
  }

  // Music functions
  const loadMusicLinks = async () => {
    try {
      const response = await fetch('/api/music')
      const { data } = await response.json()
      if (data) {
        setMusicLinks(data)
      }
    } catch (error) {
      console.error('Error loading music links:', error)
    }
  }

  const addMusicLink = async (title: string, url: string) => {
    setIsLoadingMusic(true)
    try {
      const response = await fetch('/api/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url })
      })
      if (response.ok) {
        await loadMusicLinks() // Reload to get updated data
      }
    } catch (error) {
      console.error('Error adding music link:', error)
    } finally {
      setIsLoadingMusic(false)
    }
  }

  const deleteMusicLink = async (id: string) => {
    setIsLoadingMusic(true)
    try {
      const response = await fetch(`/api/music?id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setMusicLinks(musicLinks.filter(link => link.id !== id))
      }
    } catch (error) {
      console.error('Error deleting music link:', error)
    } finally {
      setIsLoadingMusic(false)
    }
  }

  // Video functions
  const loadVideos = async () => {
    try {
      const response = await fetch('/api/videos')
      const { data } = await response.json()
      if (data) {
        setVideos(data)
      }
    } catch (error) {
      console.error('Error loading videos:', error)
    }
  }

  const addVideo = async (title: string, youtubeUrl: string, category = 'general') => {
    setIsLoadingVideos(true)
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, youtube_url: youtubeUrl, category })
      })
      if (response.ok) {
        await loadVideos() // Reload to get updated data
      }
    } catch (error) {
      console.error('Error adding video:', error)
    } finally {
      setIsLoadingVideos(false)
    }
  }

  const deleteVideo = async (id: string) => {
    setIsLoadingVideos(true)
    try {
      const response = await fetch(`/api/videos?id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setVideos(videos.filter(video => video.id !== id))
      }
    } catch (error) {
      console.error('Error deleting video:', error)
    } finally {
      setIsLoadingVideos(false)
    }
  }

  // Event functions
  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const { data } = await response.json()
      if (data) {
        setEvents(data)
      }
    } catch (error) {
      console.error('Error loading events:', error)
    }
  }

  const addEvent = async (title: string, description?: string, eventDate?: string) => {
    setIsLoadingEvents(true)
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, event_date: eventDate })
      })
      if (response.ok) {
        await loadEvents() // Reload to get updated data
      }
    } catch (error) {
      console.error('Error adding event:', error)
    } finally {
      setIsLoadingEvents(false)
    }
  }

  const deleteEvent = async (id: string) => {
    setIsLoadingEvents(true)
    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setEvents(events.filter(event => event.id !== id))
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    } finally {
      setIsLoadingEvents(false)
    }
  }

  return (
    <ContentContext.Provider
      value={{
        backgroundImage,
        setBackgroundImage,
        isLoadingBackground,
        heroTitle,
        setHeroTitle,
        heroDescription,
        setHeroDescription,
        isLoadingContent,
        musicLinks,
        addMusicLink,
        deleteMusicLink,
        isLoadingMusic,
        videos,
        addVideo,
        deleteVideo,
        isLoadingVideos,
        events,
        addEvent,
        deleteEvent,
        isLoadingEvents,
        isLoading,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider")
  }
  return context
}
