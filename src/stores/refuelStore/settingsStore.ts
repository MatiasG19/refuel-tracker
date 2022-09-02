import { defineStore } from 'pinia'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { db } from '../../boot/dexie'
import { useRefuelStore } from './refuelStore'

export const useSettingsStore = defineStore('settingsStore', () => {
  const store = useRefuelStore()

  function changeDistanceUnit(distanceUnitId: number) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].distanceUnitId = distanceUnitId
      await db.settings.put(settings[0])
      store.selectedDistanceUnitId = distanceUnitId
    })()
  }

  async function changeSelectedVehicle(vehicle: Vehicle | null) {
    const settings = await db.settings.toArray()
    if (vehicle) {
      if (vehicle.id === store.selectedVehicleId) return Promise.resolve()
      settings[0].vehicleId = vehicle.id
      await db.settings.put(settings[0])
      store.selectedVehicleId = vehicle.id
      store.selectedVehicleName = vehicle.name
      store.selectedVehiclePlateNumber = vehicle.plateNumber
      // Read graph data
      await store.readGraphData()

      return Promise.resolve()
    } else {
      settings[0].vehicleId = null
      db.settings.put(settings[0])
      store.selectedVehicleId = null
      store.selectedVehicleName = 'My Car'
      store.selectedVehiclePlateNumber = ''
    }
  }

  function togglePlateNumberInTitle(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].plateNumberInTitleActive = state
      await db.settings.put(settings[0])
      store.plateNumberInTitleActive = state
    })()
  }

  function toggleRefuelFilter(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].refuelFilterActive = state
      await db.settings.put(settings[0])
      store.refuelFilterActive = state
    })()
  }

  return {
    changeDistanceUnit,
    changeSelectedVehicle,
    togglePlateNumberInTitle,
    toggleRefuelFilter
  }
})
