import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainLayoutStore = defineStore('mainLayoutStore', () => {
  const titleText = ref('')
  const showBadges = ref(false)

  return {
    titleText,
    showBadges
  }
})
