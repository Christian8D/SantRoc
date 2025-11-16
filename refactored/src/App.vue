<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainNav from '@/components/navigation/MainNav.vue'
</script>

<template>
	<div class="min-h-screen bg-base-100 text-base-content">
		<header class="border-b border-base-300">
			<div class="navbar container mx-auto px-4">
				<div class="flex-1">
					<RouterLink class="btn btn-ghost text-xl" to="/">Sant Roc</RouterLink>
				</div>
				<MainNav />
			</div>
		</header>
		<main class="container mx-auto px-4 py-8">
			<RouterView />
		</main>
		<footer class="border-t border-base-300">
			<div class="container mx-auto px-4 py-6 text-sm opacity-70">
				© {{ new Date().getFullYear() }} Sant Roc
			</div>
		</footer>
	</div>
	<!-- Theme controller for quick testing -->
	<input type="checkbox" class="theme-controller hidden" value="dark" />
</template>

