import { defineStore } from 'pinia'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { db } from 'src/boot/dexie'
import { ref } from 'vue'
import { emitter } from 'src/boot/mitt'

export const useSettingsStore = defineStore('settingsStore', () => {
  const selectedDistanceUnitId = ref<number>(0)
  const selectedVehicleId = ref<number | null>(null)
  const selectedVehicleName = ref<string>('My car')
  const selectedVehiclePlateNumber = ref<string>('')
  const plateNumberInTitleActive = ref<boolean>(false)
  const autoBackupActive = ref<boolean>(false)
  const autoBackupPath = ref<string>('')
  const selectedColorThemeId = ref<number>(1)
  const selectedLanguageId = ref<number>(1)

  async function initSettings() {
    const settings = await db.settings.toArray()
    if (settings.length === 0) return Promise.resolve()

    changeColorTheme(settings[0].colorThemeId)
    changeLanguage(settings[0].languageId ?? 1)
    changeDistanceUnit(settings[0].distanceUnitId)
    if (settings[0].vehicleId) {
      const vehicle = await db.vehicles
        .where('id')
        .equals(settings[0].vehicleId)
        .first()
      changeSelectedVehicle(vehicle ?? null)
    }
    togglePlateNumberInTitle(settings[0].plateNumberInTitleActive)
  }

  function changeDistanceUnit(distanceUnitId: number) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].distanceUnitId = distanceUnitId
      await db.settings.put(settings[0])
      selectedDistanceUnitId.value = distanceUnitId
    })()
  }

  async function changeSelectedVehicle(vehicle: Vehicle | null) {
    const settings = await db.settings.toArray()
    if (vehicle) {
      settings[0].vehicleId = vehicle.id
      await db.settings.put(settings[0])
      selectedVehicleId.value = vehicle.id
      selectedVehicleName.value = vehicle.name
      selectedVehiclePlateNumber.value = vehicle.plateNumber

      emitter.emit('selectedVehicleChanged', true)
      return Promise.resolve()
    } else {
      settings[0].vehicleId = null
      db.settings.put(settings[0])
      selectedVehicleId.value = null
      selectedVehicleName.value = 'My Car'
      selectedVehiclePlateNumber.value = ''
    }
  }

  function togglePlateNumberInTitle(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].plateNumberInTitleActive = state
      await db.settings.put(settings[0])
      plateNumberInTitleActive.value = state
    })()
  }

  function toggleAutoBackup(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].autoBackupActive = state
      await db.settings.put(settings[0])
      autoBackupActive.value = state
    })()
  }

  function setAutoBackupPath(path: string) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].autoBackupPath = path
      await db.settings.put(settings[0])
      autoBackupPath.value = path
    })()
  }

  function changeColorTheme(themeId: number) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].colorThemeId = themeId
      await db.settings.put(settings[0])
      selectedColorThemeId.value = themeId
    })()
  }

  function changeLanguage(languageId: number) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].languageId = languageId
      await db.settings.put(settings[0])
      selectedLanguageId.value = languageId
    })()
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
