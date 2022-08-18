import { useMainStore, useRefuelStore } from 'src/stores'
import { db } from '../boot/dexie'

export function initSettings() {
  const mainStore = useMainStore()
  const refuelStore = useRefuelStore()
  ;(async () => {
    const settings = await db.settings.toArray()
    mainStore.changeColorTheme(settings[0].colorThemeId)
    refuelStore.changeDistanceUnit(settings[0].distanceUnitId)
    if (settings[0].vehicleId) {
      const vehicles = await db.vehicles
        .where('id')
        .equals(settings[0].vehicleId)
        .toArray()
      refuelStore.changeSelectedVehicle(vehicles[0])
    }
    refuelStore.togglePlateNumberInTitle(settings[0].plateNumberInTitleActive)
  })()
}
