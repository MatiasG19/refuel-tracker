import { useGraphDataStore } from 'src/pages/graphData/stores/graphDataStore'
import { useRefuelStore } from 'src/pages/refuels/stores'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import { Vehicle } from '../libraries/refuel/models'

async function refuelAddedEvent(): Promise<void> {
  const settingsStore = useSettingsStore()
  const graphDataStore = useGraphDataStore()
  const vehicleStore = useVehicleStore()

  graphDataStore.graphData.length = 0
  if (settingsStore.selectedVehicleId)
    await vehicleStore.updateTotalFuelConsumption(
      settingsStore.selectedVehicleId
    )
}

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

async function refuelDeletedEvent(): Promise<void> {
  const settingsStore = useSettingsStore()
  const graphDataStore = useGraphDataStore()
  const vehicleStore = useVehicleStore()

  graphDataStore.graphData.length = 0
  if (settingsStore.selectedVehicleId)
    await vehicleStore.updateTotalFuelConsumption(
      settingsStore.selectedVehicleId
    )
}

async function vehicleAddedEvent(vehicle: Vehicle): Promise<void> {
  const settingsStore = useSettingsStore()

  await settingsStore.changeSelectedVehicle(vehicle)
}

async function vehicleUpdatedEvent(): Promise<void> {
  const graphDataStore = useGraphDataStore()
  const refuelStore = useRefuelStore()

  graphDataStore.graphData.length = 0
  refuelStore.vehicle = null
  await Promise.resolve()
}

async function vehicleDeletedEvent(): Promise<void> {
  const vehicleStore = useVehicleStore()
  const graphDataStore = useGraphDataStore()
  const refuelStore = useRefuelStore()
  const settingsStore = useSettingsStore()

  graphDataStore.graphData.length = 0
  refuelStore.vehicle = null
  await settingsStore.changeSelectedVehicle(
    vehicleStore.vehicles.length ? vehicleStore.vehicles[0]! : null
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function vehicleChangedEvent(vehicle: Vehicle | null): Promise<void> {
  const graphDataStore = useGraphDataStore()
  const refuelStore = useRefuelStore()

  graphDataStore.graphData.length = 0
  refuelStore.vehicle = null
  await Promise.resolve()
}

export {
  refuelAddedEvent,
  refuelUpdatedEvent,
  refuelDeletedEvent,
  vehicleAddedEvent,
  vehicleUpdatedEvent,
  vehicleDeletedEvent,
  vehicleChangedEvent
}
