<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
	<nav class="flex items-center gap-2">
		<RouterLink class="btn btn-ghost" to="/">Home</RouterLink>
		<RouterLink class="btn btn-ghost" to="/admin">Admin</RouterLink>
	</nav>
</template>

