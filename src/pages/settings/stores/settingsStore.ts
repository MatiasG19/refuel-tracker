import { defineStore } from 'pinia'
import { ref } from 'vue'
import { settingsRepository } from 'src/scripts/databaseRepositories'
import { getColorThemes } from 'src/scripts/staticData/colorThemes'
import { ThemeSetter } from 'src/plugins/capacitor-theme-setter'
import { Platform } from 'quasar'

export const useSettingsStore = defineStore('settingsStore', () => {
  const selectedDistanceUnitId = ref<number>(0)
  const autoBackupActive = ref<boolean>(false)
  const autoBackupPath = ref<string>('')
  const selectedColorThemeId = ref<number>(0)
  const selectedLanguageId = ref<number>(1)
  const areaHeight = ref(0)
  const settingsId = 1
  const initialized = ref(false)

  async function initSettings() {
    if (initialized.value) return
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()

    changeColorTheme(settings.colorThemeId)
    changeLanguage(settings.languageId ?? 1)
    changeDistanceUnit(settings.distanceUnitId)
    initialized.value = true
  }

  async function changeDistanceUnit(distanceUnitId: number) {
    selectedDistanceUnitId.value = distanceUnitId
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()
    settings.distanceUnitId = distanceUnitId
    await settingsRepository.updateSettings(settings)
  }

  async function toggleAutoBackup(state: boolean) {
    autoBackupActive.value = state
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()
    settings.autoBackupActive = state
    await settingsRepository.updateSettings(settings)
  }

  async function setAutoBackupPath(path: string) {
    autoBackupPath.value = path
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()
    settings.autoBackupPath = path
    await settingsRepository.updateSettings(settings)
  }

  async function changeColorTheme(themeId: number) {
    document.documentElement.className =
      getColorThemes()[themeId]?.className ?? ''
    selectedColorThemeId.value = themeId
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()
    settings.colorThemeId = themeId
    await settingsRepository.updateSettings(settings)
    if (Platform.is.mobile) await ThemeSetter.setTheme({ themeId })
  }

  async function changeLanguage(languageId: number) {
    selectedLanguageId.value = languageId
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()
    settings.languageId = languageId
    await settingsRepository.updateSettings(settings)
  }

  return {
    selectedDistanceUnitId,
    autoBackupActive,
    autoBackupPath,
    selectedColorThemeId,
    selectedLanguageId,
    areaHeight,
    initialized,
    initSettings,
    changeDistanceUnit,
    toggleAutoBackup,
    setAutoBackupPath,
    changeColorTheme,
    changeLanguage
  }
})
