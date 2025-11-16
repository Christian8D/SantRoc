<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'content' | 'media' | 'events' | 'settings'>('content')
</script>

<template>
	<section class="space-y-6">
		<h1 class="text-3xl font-bold">Admin Dashboard</h1>
		<div role="tablist" class="tabs tabs-boxed">
			<button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'content' }" @click="activeTab = 'content'">Content</button>
			<button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'media' }" @click="activeTab = 'media'">Media</button>
			<button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'events' }" @click="activeTab = 'events'">Events</button>
			<button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'settings' }" @click="activeTab = 'settings'">Settings</button>
		</div>

		<div v-if="activeTab === 'content'" class="card bg-base-200">
			<div class="card-body">
				<h2 class="card-title">Content Manager</h2>
				<p>Replace with forms and lists connected to Supabase tables.</p>
			</div>
		</div>

		<div v-else-if="activeTab === 'media'" class="card bg-base-200">
			<div class="card-body">
				<h2 class="card-title">Media Manager</h2>
				<p>Replace with uploads to Supabase Storage.</p>
			</div>
		</div>

		<div v-else-if="activeTab === 'events'" class="card bg-base-200">
			<div class="card-body">
				<h2 class="card-title">Events Manager</h2>
				<p>Replace with CRUD for events.</p>
			</div>
		</div>

		<div v-else class="card bg-base-200">
			<div class="card-body">
				<h2 class="card-title">Settings</h2>
				<p>General project settings.</p>
			</div>
		</div>
	</section>
</template>

