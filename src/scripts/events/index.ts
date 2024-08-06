import { useGraphDataStore } from 'src/pages/graphData/stores/graphDataStore'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'

async function refuelAddedEvent(): Promise<void> {}

async function refuelUpdatedEvent(): Promise<void> {
  const graphDataStore = useGraphDataStore()
  const settingsStore = useSettingsStore()
  const vehicleStore = useVehicleStore()

  graphDataStore.graphData.length = 0
  if (settingsStore.selectedVehicleId)
    await vehicleStore.updateTotalFuelConsumption(
      settingsStore.selectedVehicleId
    )
}

async function refuelDeletedEvent(): Promise<void> {}

async function vehicleAddedEvent(): Promise<void> {}

async function vehicleUpdatedEvent(): Promise<void> {
  const graphDataStore = useGraphDataStore()

  graphDataStore.graphData.length = 0
  await Promise.resolve()
}

async function vehicleDeletededEvent(): Promise<void> {
  const vehicleStore = useVehicleStore()
  const settingsStore = useSettingsStore()

  await settingsStore.changeSelectedVehicle(
    vehicleStore.vehicles.length ? vehicleStore.vehicles[0] : null
  )
}

export {
  refuelAddedEvent,
  refuelUpdatedEvent,
  refuelDeletedEvent,
  vehicleAddedEvent,
  vehicleUpdatedEvent,
  vehicleDeletededEvent
}
