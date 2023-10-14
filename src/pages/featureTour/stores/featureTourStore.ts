import { defineStore } from 'pinia'
import { db } from 'src/boot/dexie'
import { ref } from 'vue'

export const useSettingsStore = defineStore('featureTourStore', () => {
  const introSlides = ref<boolean>(false)

  function skipTour() {}

  function toggleIntroSlides(state: boolean) {}

  return {
    skipTour,
    toggleIntroSlides,
    introSlides
  }
})
