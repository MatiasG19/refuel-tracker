import { useGraphDataStore } from 'src/pages/graphData/stores/graphDataStore'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'

const graphDataStore = useGraphDataStore()
const vehicleStore = useVehicleStore()
const settingsStore = useSettingsStore()

async function refuelUpdatedEvent(): Promise<void> {
  graphDataStore.graphData.length = 0
  if (settingsStore.selectedVehicleId)
    await vehicleStore.updateTotalFuelConsumption(
      settingsStore.selectedVehicleId
    )
}

async function vehicleUpdatedEvent(): Promise<void> {
  graphDataStore.graphData.length = 0
  await Promise.resolve()
}

export { refuelUpdatedEvent, vehicleUpdatedEvent }
