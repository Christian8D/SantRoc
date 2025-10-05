import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function getBackgroundImage() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('background_images')
      .select('*')
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return null
    }

    return data.image_url
  } catch (error) {
    console.error('Error fetching background image:', error)
    return null
  }
}

export async function getSiteContent() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('section', { ascending: true })

    if (error) {
      console.error('Error fetching site content:', error)
      return { heroTitle: '', heroDescription: '' }
    }

    const content: { [key: string]: string } = {}
    data?.forEach((item) => {
      content[item.section] = item.content
    })

    return {
      heroTitle: content['hero_title'] || '',
      heroDescription: content['hero_description'] || ''
    }
  } catch (error) {
    console.error('Error fetching site content:', error)
    return { heroTitle: '', heroDescription: '' }
  }
}

export async function getMusicLinks() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('music_links')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching music links:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching music links:', error)
    return []
  }
}

export async function getVideos() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching videos:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export async function getEvents() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getAllContent() {
  try {
    const [backgroundImage, siteContent, musicLinks, videos, events] = await Promise.all([
      getBackgroundImage(),
      getSiteContent(),
      getMusicLinks(),
      getVideos(),
      getEvents()
    ])

    return {
      backgroundImage,
      siteContent,
      musicLinks,
      videos,
      events
    }
  } catch (error) {
    console.error('Error fetching all content:', error)
    return {
      backgroundImage: null,
      siteContent: { heroTitle: '', heroDescription: '' },
      musicLinks: [],
      videos: [],
      events: []
    }
  }
}
