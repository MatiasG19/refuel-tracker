import { useMainStore } from 'src/stores'
import { db } from '../boot/dexie'

export function initSettings() {
  const mainStore = useMainStore()
  ;(async () => {
    const settings = await db.settings.toArray()
    mainStore.changeColorTheme(settings[0].colorThemeId)
    mainStore.changeDistanceUnit(settings[0].distanceUnitId)
    if (settings[0].vehicleId) {
      const vehicles = await db.vehicles
        .where('id')
        .equals(settings[0].vehicleId)
        .toArray()
      mainStore.changeSelectedVehicle(vehicles[0])
    }
    mainStore.togglePlateNumberInTitle(settings[0].plateNumberInTitleActive)
  })()
}
