import { useGraphDataStore } from 'src/pages/graphData/stores/graphDataStore'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'

const graphDataStore = useGraphDataStore()
const vehicleStore = useVehicleStore()
const settingsStore = useSettingsStore()

async function refuelAddedEvent(): Promise<void> {}

async function refuelUpdatedEvent(): Promise<void> {
  graphDataStore.graphData.length = 0
  if (settingsStore.selectedVehicleId)
    await vehicleStore.updateTotalFuelConsumption(
      settingsStore.selectedVehicleId
    )
}

async function refuelDeletededEvent(): Promise<void> {}

async function vehicleAddedEvent(): Promise<void> {}

async function vehicleUpdatedEvent(): Promise<void> {
  graphDataStore.graphData.length = 0
  await Promise.resolve()
}

async function vehicleDeletededEvent(): Promise<void> {
  await settingsStore.changeSelectedVehicle(
    vehicleStore.vehicles.length ? vehicleStore.vehicles[0] : null
  )
}

export {
  refuelAddedEvent,
  refuelUpdatedEvent,
  refuelDeletededEvent,
  vehicleAddedEvent,
  vehicleUpdatedEvent,
  vehicleDeletededEvent
}
