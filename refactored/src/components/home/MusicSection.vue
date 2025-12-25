<script setup lang="ts">
import { useContent } from '@/composables/useContent'
const { musicLinks, isLoadingMusic } = useContent()
</script>

<template>
	<section id="music" class="py-20" style="background: var(--color-vintage-cream)">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-center gap-3 mb-12">
				<span class="w-8 h-8 rounded-full bg-[color:var(--color-vintage-tan)] inline-block"></span>
				<h2 class="groovy-title text-5xl" style="color: var(--color-vintage-dark)">Music</h2>
			</div>

			<div v-if="isLoadingMusic" class="text-center text-xl opacity-80">Loading music...</div>

			<div v-else class="max-w-2xl mx-auto space-y-4">
				<a
					v-for="link in musicLinks"
					:key="link.id"
					:href="link.url"
					class="block p-6 border-2 rounded-lg transition-all hover:scale-105"
					style="background: color-mix(in oklab, var(--color-vintage-tan) 20%, transparent); border-color: var(--color-vintage-brown)"
				>
					<h3 class="text-2xl font-serif text-center underline decoration-2 underline-offset-4" style="color: var(--color-vintage-dark); text-decoration-color: var(--color-vintage-brown)">
						{{ link.title }}
					</h3>
				</a>
			</div>
		</div>
	</section>
</template>

