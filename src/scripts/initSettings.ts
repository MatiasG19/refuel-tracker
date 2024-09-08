import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { setI18nLanguage } from './libraries/utils/language'
import { useRefuelFilterStore } from 'src/pages/refuels/stores/refuelFilterStore'
import { registerGraphData } from 'src/pages/graphData/scripts/registerGraphData'
import { registerFuelConsumption } from 'src/scripts/libraries/refuel/functions/fuelConsumption/registerFuelConsumption'
import { useRouter } from 'vue-router'
import { useMainLayoutStore } from 'src/layouts/stores'
import { registerChartData } from 'src/pages/graphData/components/chart/scripts/models/registerChartData'

export async function initSettings() {
  const settingsStore = useSettingsStore()
  const router = useRouter()
  const mainLayoutStore = useMainLayoutStore()

  await settingsStore.initSettings()
  await setI18nLanguage(settingsStore.selectedLanguageId)

  const refuelFilterStore = useRefuelFilterStore()
  refuelFilterStore.readFilter()

  registerGraphData()
  registerFuelConsumption()
  registerChartData()

  mainLayoutStore.addButton.action = () => void router.push('/refuels/add')
  router.beforeEach(() => {
    mainLayoutStore.addButton.action = () => void router.push('/refuels/add')
  })
}
