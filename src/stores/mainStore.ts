import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Vehicle } from 'src/scripts/models'
import { db } from '../boot/dexie'

export const useMainStore = defineStore('mainStore', () => {
  const selectedColorThemeId = ref<number>(1)
  const selectedDistanceUnitId = ref<number>(1)
  const selectedVehicleId = ref<number | null>(null)
  const selectedVehicleName = ref<string>('My car')
  const selectedVehiclePlateNumber = ref<string>('')
  const plateNumberInTitleActive = ref<boolean>(false)
  const refuelFilterActive = ref<boolean>(false)

  function changeColorTheme(themeId: number) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].colorThemeId = themeId
      await db.settings.put(settings[0])
      selectedColorThemeId.value = themeId
    })()
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
      return Promise.resolve()
    }
    settings[0].vehicleId = null
    db.settings.put(settings[0])
    selectedVehicleId.value = null
    selectedVehicleName.value = 'My Car'
    selectedVehiclePlateNumber.value = ''
  }

  function togglePlateNumberInTitle(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].plateNumberInTitleActive = state
      await db.settings.put(settings[0])
      plateNumberInTitleActive.value = state
    })()
  }

  function toggleRefuelFilter(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].refuelFilterActive = state
      await db.settings.put(settings[0])
      refuelFilterActive.value = state
    })()
  }

  return {
    selectedColorThemeId,
    selectedDistanceUnitId,
    selectedVehicleId,
    selectedVehicleName,
    selectedVehiclePlateNumber,
    plateNumberInTitleActive,
    refuelFilterActive,
    changeColorTheme,
    changeDistanceUnit,
    changeSelectedVehicle,
    togglePlateNumberInTitle,
    toggleRefuelFilter
  }
})
