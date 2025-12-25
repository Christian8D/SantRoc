import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isMobileNavOpen = ref(false)
  function toggleMobileNav(): void {
    isMobileNavOpen.value = !isMobileNavOpen.value
  }
  return { isMobileNavOpen, toggleMobileNav }
})

