import { useSettingsStore } from 'src/stores/settingsStore'

export function initSettings() {
  const settingsStore = useSettingsStore()
  settingsStore.initSettings()
}
