import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../boot/dexie'

export const useMainStore = defineStore('mainStore', () => {
  const selectedColorThemeId = ref<number>(1)

  function changeColorTheme(themeId: number) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].colorThemeId = themeId
      await db.settings.put(settings[0])
      selectedColorThemeId.value = themeId
    })()
  }

  return {
    selectedColorThemeId,
    changeColorTheme
  }
})
