export interface BackgroundImage {
  id: string
  image_url: string
  is_active: boolean
  background_position?: string | null
  background_size?: string | null
  background_repeat?: string | null
  created_at: string
}

export interface SiteContent {
  id: string
  section: string
  content: string
  created_at: string
  updated_at: string
}

export interface MusicLink {
  id: string
  title: string
  url: string
  order_index: number
  created_at: string
}

export interface Video {
  id: string
  title: string
  youtube_url: string
  category: string
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string | null
  event_date: string | null
  created_at: string
}

