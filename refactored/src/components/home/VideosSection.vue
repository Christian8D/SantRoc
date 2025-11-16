<script setup lang="ts">
import { computed } from 'vue'
import { useContent } from '@/composables/useContent'
const { videos, isLoadingVideos } = useContent()
const getYouTubeEmbedUrl = (url: string) => {
	const id = url.split('v=')[1]?.split('&')[0]
	return `https://www.youtube.com/embed/${id}`
}
</script>

<template>
	<section id="videos" class="py-20" style="background: var(--color-vintage-dark)">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-center gap-3 mb-12">
				<span class="w-8 h-8 rounded-full inline-block" style="background: var(--color-vintage-tan)"></span>
				<h2 class="groovy-title text-5xl" style="color: var(--color-vintage-cream)">Videos</h2>
			</div>

			<div v-if="isLoadingVideos" class="text-center text-xl" style="color: var(--color-vintage-cream)">Loading videos...</div>

			<div v-else class="max-w-4xl mx-auto space-y-8">
				<div v-for="video in videos" :key="video.id" class="rounded-lg p-6" style="background: color-mix(in oklab, var(--color-vintage-cream) 10%, transparent)">
					<h3 class="text-2xl font-serif mb-4 underline decoration-2 underline-offset-4" style="color: var(--color-vintage-cream); text-decoration-color: var(--color-vintage-tan)">
						{{ video.title }}
					</h3>
					<div class="aspect-video rounded overflow-hidden">
						<iframe
							width="100%"
							height="100%"
							:src="getYouTubeEmbedUrl(video.youtube_url)"
							:title="video.title"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
							class="w-full h-full"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

