import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Button } from '../models'

export const useMainLayoutStore = defineStore('mainLayoutStore', () => {
  const titleText = ref('')
  const badgesVisible = ref(false)

  const saveButton = ref<Button>({
    visible: false,
    disabled: false,
    action: () => {}
  })

  const addButton = ref<Button>({
    visible: true,
    disabled: false,
    action: () => {}
  })

  const calculateAreaHeight = () => {}

  return {
    titleText,
    badgesVisible,
    saveButton,
    addButton,
    calculateAreaHeight
  }
})
