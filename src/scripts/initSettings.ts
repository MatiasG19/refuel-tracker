import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useRefuelFilterStore } from 'src/pages/refuels/stores/refuelFilterStore'
import { registerDashboardData } from 'src/pages/dashboard/scripts/registerDashboardData'
import { registerFuelConsumption } from 'src/scripts/libraries/refuel/functions/fuelConsumption/registerFuelConsumption'
import { registerChartData } from 'src/pages/dashboard/components/chart/scripts/models/registerChartData'

export async function initSettings() {
  const settingsStore = useSettingsStore()

  await settingsStore.initSettings()

  const refuelFilterStore = useRefuelFilterStore()
  refuelFilterStore.readFilter()

  registerDashboardData()
  registerFuelConsumption()
  registerChartData()
}
