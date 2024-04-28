import { defineStore } from 'pinia'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { ref } from 'vue'
import { emitter } from 'src/boot/mitt'
import {
  settingsRepository,
  vehicleRepository
} from 'src/scripts/databaseRepositories'

export const useSettingsStore = defineStore('settingsStore', () => {
  const selectedDistanceUnitId = ref<number>(0)
  const selectedVehicleId = ref<number | null>(null)
  const selectedVehicleName = ref<string>('')
  const selectedVehiclePlateNumber = ref<string>('')
  const plateNumberInTitleActive = ref<boolean>(false)
  const autoBackupActive = ref<boolean>(false)
  const autoBackupPath = ref<string>('')
  const selectedColorThemeId = ref<number>(1)
  const selectedLanguageId = ref<number>(1)
  const areaHeight = ref(0)
  const settingsId = 1

  async function initSettings() {
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()

    changeColorTheme(settings.colorThemeId)
    changeLanguage(settings.languageId ?? 1)
    changeDistanceUnit(settings.distanceUnitId)
    if (settings.vehicleId) {
      const vehicle = await vehicleRepository.getVehicle(settings.vehicleId)
      changeSelectedVehicle(vehicle ?? null)
    }
    togglePlateNumberInTitle(settings.plateNumberInTitleActive)
  }

  async function changeDistanceUnit(distanceUnitId: number) {
    selectedDistanceUnitId.value = distanceUnitId
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()
    settings.distanceUnitId = distanceUnitId
    await settingsRepository.updateSettings(settings)
  }

  async function changeSelectedVehicle(vehicle: Vehicle | null) {
    if (vehicle) {
      selectedVehicleId.value = vehicle.id
      selectedVehicleName.value = vehicle.name
      selectedVehiclePlateNumber.value = vehicle.plateNumber
      const settings = await settingsRepository.getSettings(settingsId)
      if (!settings) return Promise.resolve()
      settings.vehicleId = vehicle.id
      await settingsRepository.updateSettings(settings)

      emitter.emit('selectedVehicleChanged', true)
      return Promise.resolve()
    } else {
      selectedVehicleId.value = null
      selectedVehicleName.value = ''
      selectedVehiclePlateNumber.value = ''
      const settings = await settingsRepository.getSettings(settingsId)
      if (!settings) return Promise.resolve()
      settings.vehicleId = null
      await settingsRepository.updateSettings(settings)
    }
  }

  async function togglePlateNumberInTitle(state: boolean) {
    plateNumberInTitleActive.value = state
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()
    settings.plateNumberInTitleActive = state
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
    selectedColorThemeId.value = themeId
    const settings = await settingsRepository.getSettings(settingsId)
    if (!settings) return Promise.resolve()
    settings.colorThemeId = themeId
    await settingsRepository.updateSettings(settings)
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
    selectedVehicleId,
    selectedVehicleName,
    selectedVehiclePlateNumber,
    plateNumberInTitleActive,
    autoBackupActive,
    autoBackupPath,
    selectedColorThemeId,
    selectedLanguageId,
    areaHeight,
    initSettings,
    changeDistanceUnit,
    changeSelectedVehicle,
    togglePlateNumberInTitle,
    toggleAutoBackup,
    setAutoBackupPath,
    changeColorTheme,
    changeLanguage
  }
})
