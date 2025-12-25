<script setup lang="ts">
import { useContent } from '@/composables/useContent'
const { events, isLoadingEvents } = useContent()
</script>

<template>
	<section id="events" class="py-20" style="background: var(--color-vintage-cream)">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-center gap-3 mb-12">
				<span class="w-8 h-8 rounded-full inline-block" style="background: var(--color-vintage-tan)"></span>
				<h2 class="groovy-title text-5xl" style="color: var(--color-vintage-dark)">Events</h2>
			</div>

			<div v-if="isLoadingEvents" class="text-center text-xl opacity-80">Loading events...</div>

			<div v-else class="max-w-3xl mx-auto space-y-6">
				<div v-for="event in events" :key="event.id" class="p-6 rounded-lg border" style="border-color: var(--color-vintage-brown)">
					<h3 class="text-2xl font-serif mb-1" style="color: var(--color-vintage-dark)">{{ event.title }}</h3>
					<p v-if="event.description" class="mb-2" style="color: var(--color-vintage-dark)">{{ event.description }}</p>
					<div v-if="event.event_date" class="opacity-80">
						{{ new Date(event.event_date).toLocaleString() }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

