import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainLayoutStore = defineStore('mainLayoutStore', () => {
  const titleText = ref('')
  const badgesVisible = ref(false)
  const saveButtonVisible = ref(false)
  const saveButtonAction = () => {}

  return {
    titleText,
    badgesVisible,
    saveButtonVisible,
    saveButtonAction
  }
})
