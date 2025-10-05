import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface BackgroundImage {
  id: string
  image_url: string
  is_active: boolean
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
