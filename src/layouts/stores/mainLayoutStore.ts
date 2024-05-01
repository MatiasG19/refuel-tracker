import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Action, Button } from '../models'

export const useMainLayoutStore = defineStore('mainLayoutStore', () => {
  const titleText = ref('')

  const headerButton = ref<Button>({
    visible: false,
    disabled: false,
    icon: 'save',
    color: '',
    action: () => {}
  })

  const addButton = ref<Button>({
    visible: true,
    disabled: false,
    icon: 'add',
    color: '',
    action: () => {}
  })

  function showButton(
    button: Button,
    action: Action,
    icon: string,
    disabled = false,
    color = ''
  ) {
    button.visible = true
    button.action = action
    button.icon = icon
    button.disabled = disabled
    button.color = color
  }

  function hideButton(btn: Button) {
    btn.visible = false
    btn.action = () => {}
    btn.icon = ''
    btn.disabled = false
    btn.color = ''
  }

  const calculateAreaHeight = () => {}

  return {
    titleText,
    headerButton,
    addButton,
    showButton,
    hideButton,
    calculateAreaHeight
  }
})
