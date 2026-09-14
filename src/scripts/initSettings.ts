import { useSettingsStore } from '@/pages/settings/stores/settingsStore'
import { setI18nLanguage } from './libraries/utils/language'
import { useRefuelFilterStore } from '@/pages/refuels/stores/refuelFilterStore'
import { registerDashboardData } from '@/pages/dashboard/scripts/registerDashboardData'
import { registerFuelConsumption } from '@/scripts/libraries/refuel/functions/fuelConsumption/registerFuelConsumption'
import { registerChartData } from '@/pages/dashboard/components/chart/scripts/models/registerChartData'

export async function initSettings() {
  const settingsStore = useSettingsStore()

  await settingsStore.initSettings()
  await setI18nLanguage(settingsStore.selectedLanguageId)

  const refuelFilterStore = useRefuelFilterStore()
  await refuelFilterStore.readFilter()

  registerDashboardData()
  registerFuelConsumption()
  registerChartData()
}
