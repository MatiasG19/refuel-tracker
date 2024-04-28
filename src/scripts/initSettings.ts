import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { setI18nLanguage } from './libraries/utils/language'
import { useRefuelFilterStore } from 'src/pages/refuels/stores/refuelFilterStore'
import { registerGraphData } from 'src/pages/graphData/scripts/registerGraphData'
import { registerFuelConsumption } from 'src/scripts/libraries/refuel/functions/fuelConsumption/registerFuelConsumption'

export async function initSettings() {
  const settingsStore = useSettingsStore()
  await settingsStore.initSettings()
  await setI18nLanguage(settingsStore.selectedLanguageId)

  const refuelFilterStore = useRefuelFilterStore()
  refuelFilterStore.readFilter()

  registerGraphData()
  registerFuelConsumption()
}
