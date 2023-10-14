import { defineStore } from 'pinia'
import { db } from 'src/boot/dexie'
import { ref } from 'vue'

export const useSettingsStore = defineStore('featureTourStore', () => {
  const introSlides = ref<boolean>(false)

  function skipTour() {}

  function toggleIntroSlides(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].introTour = state
      await db.settings.put(settings[0])
      introTour.value = state
    })()
  }

  return {
    skipTour,
    toggleIntroSlides,
    introSlides
  }
})
