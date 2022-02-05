import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state: () => {
    return {
      selectedColorThemeId: 1,
      selectedDistanceUnitId: 1,
      selectedVehicleId: 0,
      plateNumberInTitleActive: false,
      refuelFilterActive: false
    }
  },
  actions: {
    changeColorTheme(themeId: number) {
      this.selectedColorThemeId = themeId
    },
    changeDistanceUnit(distanceUnitId: number) {
      this.selectedDistanceUnitId = distanceUnitId
    },
    changeSelectedVehicle(vehicleId: number) {
      this.selectedVehicleId = vehicleId
    },
    togglePlateNumberInTitle(state: boolean) {
      this.plateNumberInTitleActive = state
    },
    toggleRefuelFilter(state: boolean) {
      this.refuelFilterActive = state
    }
  }
})
