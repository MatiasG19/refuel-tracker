import { defineStore } from 'pinia'
import { Vehicle, Settings } from 'src/scripts/models'
import { db } from '../boot/dexie'

export const useMainStore = defineStore('mainStore', {
  state: () => {
    return {
      selectedColorThemeId: 1,
      selectedDistanceUnitId: 1,
      selectedVehicleId: 0,
      selectedVehicleName: 'My car',
      selectedVehiclePlateNumber: 'XX:YY0000',
      plateNumberInTitleActive: false,
      refuelFilterActive: false
    }
  },
  actions: {
    async changeColorTheme(themeId: number) {
      const settings = await db.settings.toArray()
      settings[0].colorThemeId = themeId
      await db.settings.put(settings[0])
      this.selectedColorThemeId = themeId
    },
    async changeDistanceUnit(distanceUnitId: number) {
      const settings = await db.settings.toArray()
      settings[0].distanceUnitId = distanceUnitId
      await db.settings.put(settings[0])
      this.selectedDistanceUnitId = distanceUnitId
    },
    async changeSelectedVehicle(vehicle: Vehicle) {
      const settings = await db.settings.toArray()
      settings[0].vehicleId = vehicle.id
      await db.settings.put(settings[0])
      this.selectedVehicleId = vehicle.id
      this.selectedVehicleName = vehicle.name
      this.selectedVehiclePlateNumber = vehicle.plateNumber
    },
    togglePlateNumberInTitle(state: boolean) {
      this.plateNumberInTitleActive = state
    },
    toggleRefuelFilter(state: boolean) {
      this.refuelFilterActive = state
    }
  }
})
