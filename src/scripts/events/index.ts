import { useGraphDataStore } from 'src/pages/graphData/stores/graphDataStore'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'

const graphDataStore = useGraphDataStore()
const vehicleStore = useVehicleStore()
const settingsStore = useSettingsStore()

function refuelUpdatedEvent() {
  graphDataStore.graphData.length = 0
  if (settingsStore.selectedVehicleId)
    vehicleStore.updateTotalFuelConsumption(settingsStore.selectedVehicleId)
}

function vehicleUpdatedEvent() {
  graphDataStore.graphData.length = 0
}

export { refuelUpdatedEvent, vehicleUpdatedEvent }
