import { useSettingsStore } from 'src/stores/settingsStore'
import { db } from '../boot/dexie'

export function initSettings() {
  const settingsStore = useSettingsStore()

  ;(async () => {
    const settings = await db.settings.toArray()
    if (!settings[0]) return Promise.resolve()

    settingsStore.changeColorTheme(settings[0].colorThemeId)
    settingsStore.changeDistanceUnit(settings[0].distanceUnitId)
    if (settings[0].vehicleId) {
      const vehicles = await db.vehicles
        .where('id')
        .equals(settings[0].vehicleId)
        .toArray()
      settingsStore.changeSelectedVehicle(vehicles[0])
    }
    settingsStore.togglePlateNumberInTitle(settings[0].plateNumberInTitleActive)
    settingsStore.toggleIntroTour(settings[0].introTour)
  })()
}
