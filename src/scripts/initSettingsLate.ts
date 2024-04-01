import { useSettingsStore } from 'src/stores/settingsStore'
import { setI18nLanguage } from './libraries/utils/language'

export function initSettingsLate() {
  ;(async () => {
    const settingStore = useSettingsStore()
    await setI18nLanguage(settingStore.selectedLanguageId)
  })()
}
