<script setup lang="ts">
import { ref, computed } from 'vue'
import { useContent } from '@/composables/useContent'

const { 
	backgroundImage, backgroundPosition, backgroundSize, backgroundRepeat,
	heroDescription, events, isLoading
} = useContent()

const isDescriptionVisible = ref(false)
const logo = '/sant-roc-logo.png'

const closestEvent = computed(() => {
	if (!events.value || events.value.length === 0) return null
	const today = new Date(); today.setHours(0,0,0,0)
	const upcoming = events.value.filter(e => e.event_date && new Date(e.event_date).setHours(0,0,0,0) >= today.getTime())
	if (upcoming.length === 0) return null
	return upcoming.sort((a, b) => new Date(a.event_date || 0).getTime() - new Date(b.event_date || 0).getTime())[0]
})
</script>

<template>
	<section class="relative min-h-screen flex items-center justify-center">
		<!-- Background -->
		<div
			class="absolute inset-0"
			:style="{
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #8b7355 0%, #c4a574 100%)',
				backgroundColor: '#8b7355',
				backgroundPosition: backgroundPosition || 'center',
				backgroundSize: backgroundSize || 'cover',
				backgroundRepeat: backgroundRepeat || 'no-repeat',
				zIndex: 1
			}"
		/>

		<!-- Overlays -->
		<div class="absolute inset-0 vintage-overlay" style="z-index: 2" />
		<div class="absolute inset-0 grain-texture" style="z-index: 3" />

		<!-- Content -->
		<div class="relative z-10 container mx-auto px-4 py-32 text-center min-h-screen" style="z-index: 4">
			<div v-if="isLoading" class="text-xl opacity-80">Loading...</div>

			<div v-else class="space-y-8">
				<div class="mb-40 flex justify-center">
					<img :src="logo" alt="Sant Roc" class="max-w-sm md:max-w-xl lg:max-w-2xl h-auto" />
				</div>

				<div v-if="!isDescriptionVisible" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<button class="psychedelic-about-button animate-fadeIn mt-25" @click="isDescriptionVisible = true">
						<div class="button-content">
							<span class="button-text">+</span>
							<div class="psychedelic-bg-effect"></div>
						</div>
					</button>
				</div>

				<div class="expanding-content relative flex justify-center" :class="isDescriptionVisible ? 'expand-visible z-50' : 'expand-hidden'">
					<div class="max-w-3xl mx-auto description-sunburst backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl mb-8">
						<button v-if="isDescriptionVisible" class="absolute top-4 right-4 bg-white/90 hover:bg-white text-neutral rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg border-2 border-base-300 z-50" @click="isDescriptionVisible = false">
							<span class="text-xl leading-none">×</span>
						</button>
						<div class="text-overlay">
							<div class="text-lg md:text-xl leading-relaxed font-serif whitespace-pre-wrap relative z-10">
								{{ heroDescription }}
							</div>
						</div>
					</div>
				</div>

				<div v-if="closestEvent" class="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
					<div class="mb-32 bg-[color:var(--color-vintage-dark)]/20 backdrop-blur-sm border border-[color:var(--color-vintage-tan)]/30 rounded-lg p-6 shadow-lg">
						<div class="text-center">
							<h2 class="text-2xl md:text-3xl font-serif text-[color:var(--color-vintage-tan)] mb-2">
								{{ closestEvent.title }}
							</h2>
							<p v-if="closestEvent.description" class="text-[color:var(--color-vintage-cream)] text-lg mb-3">
								{{ closestEvent.description }}
							</p>
							<div v-if="closestEvent.event_date" class="text-[color:var(--color-vintage-tan)] font-medium">
								{{ new Date(closestEvent.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

