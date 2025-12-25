import { ref, computed, onMounted } from 'vue'
import { getSupabaseClient } from '@/lib/supabase'
import type { BackgroundImage, SiteContent, MusicLink, Video, Event } from '@/types/supabase'

const backgroundImage = ref<string>('')
const backgroundPosition = ref<string>('center')
const backgroundSize = ref<string>('cover')
const backgroundRepeat = ref<string>('no-repeat')

const heroTitle = ref<string>('')
const heroDescription = ref<string>('')

const musicLinks = ref<MusicLink[]>([])
const videos = ref<Video[]>([])
const events = ref<Event[]>([])

const isLoadingBackground = ref<boolean>(false)
const isLoadingContent = ref<boolean>(false)
const isLoadingMusic = ref<boolean>(false)
const isLoadingVideos = ref<boolean>(false)
const isLoadingEvents = ref<boolean>(false)

const isLoading = computed(
  () => isLoadingBackground.value || isLoadingContent.value || isLoadingMusic.value || isLoadingVideos.value || isLoadingEvents.value
)

async function loadBackground(): Promise<void> {
  isLoadingBackground.value = true
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('background_images')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data && data.length) {
      const active = (data as BackgroundImage[]).find(b => b.is_active) || (data as BackgroundImage[])[0]
      backgroundImage.value = active.image_url
      backgroundPosition.value = active.background_position || 'center'
      backgroundSize.value = active.background_size || 'cover'
      backgroundRepeat.value = active.background_repeat || 'no-repeat'
    }
  } finally {
    isLoadingBackground.value = false
  }
}

async function setBackgroundImage(url: string): Promise<void> {
  // Client-side update example: insert new row and set as active
  const supabase = getSupabaseClient()
  await supabase.from('background_images').update({ is_active: false }).eq('is_active', true)
  const { data } = await supabase.from('background_images').insert({ image_url: url, is_active: true }).select('*').single()
  if (data) {
    backgroundImage.value = data.image_url
    backgroundPosition.value = data.background_position || 'center'
    backgroundSize.value = data.background_size || 'cover'
    backgroundRepeat.value = data.background_repeat || 'no-repeat'
  }
}

async function loadSiteContent(): Promise<void> {
  isLoadingContent.value = true
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from('site_content').select('*')
    if (!error && data) {
      const list = data as SiteContent[]
      heroTitle.value = list.find(i => i.section === 'hero_title')?.content || ''
      heroDescription.value = list.find(i => i.section === 'hero_description')?.content || ''
    }
  } finally {
    isLoadingContent.value = false
  }
}

async function setHeroTitle(newTitle: string): Promise<void> {
  const supabase = getSupabaseClient()
  await supabase.from('site_content').upsert({ section: 'hero_title', content: newTitle }, { onConflict: 'section' })
  heroTitle.value = newTitle
}

async function setHeroDescription(newDesc: string): Promise<void> {
  const supabase = getSupabaseClient()
  await supabase.from('site_content').upsert({ section: 'hero_description', content: newDesc }, { onConflict: 'section' })
  heroDescription.value = newDesc
}

async function loadMusicLinks(): Promise<void> {
  isLoadingMusic.value = true
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from('music_links').select('*').order('order_index', { ascending: true })
    if (!error && data) musicLinks.value = data as MusicLink[]
  } finally {
    isLoadingMusic.value = false
  }
}

async function addMusicLink(title: string, url: string): Promise<void> {
  const supabase = getSupabaseClient()
  await supabase.from('music_links').insert({ title, url, order_index: (musicLinks.value?.length || 0) + 1 })
  await loadMusicLinks()
}

async function deleteMusicLink(id: string): Promise<void> {
  const supabase = getSupabaseClient()
  await supabase.from('music_links').delete().eq('id', id)
  musicLinks.value = musicLinks.value.filter(m => m.id !== id)
}

async function loadVideos(): Promise<void> {
  isLoadingVideos.value = true
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
    if (!error && data) videos.value = data as Video[]
  } finally {
    isLoadingVideos.value = false
  }
}

async function addVideo(title: string, youtubeUrl: string, category = 'general'): Promise<void> {
  const supabase = getSupabaseClient()
  await supabase.from('videos').insert({ title, youtube_url: youtubeUrl, category })
  await loadVideos()
}

async function deleteVideo(id: string): Promise<void> {
  const supabase = getSupabaseClient()
  await supabase.from('videos').delete().eq('id', id)
  videos.value = videos.value.filter(v => v.id !== id)
}

async function loadEvents(): Promise<void> {
  isLoadingEvents.value = true
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from('events').select('*').order('event_date', { ascending: true })
    if (!error && data) events.value = data as Event[]
  } finally {
    isLoadingEvents.value = false
  }
}

async function addEvent(title: string, description?: string, eventDate?: string): Promise<void> {
  const supabase = getSupabaseClient()
  await supabase.from('events').insert({ title, description, event_date: eventDate })
  await loadEvents()
}

async function deleteEvent(id: string): Promise<void> {
  const supabase = getSupabaseClient()
  await supabase.from('events').delete().eq('id', id)
  events.value = events.value.filter(e => e.id !== id)
}

export function useContent() {
  onMounted(() => {
    Promise.all([loadBackground(), loadSiteContent(), loadMusicLinks(), loadVideos(), loadEvents()])
  })

  return {
    backgroundImage,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
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
    isLoading
  }
}

