import { useDashboardStore } from 'src/pages/dashboard/stores/dashboardStore'
import { useRefuelStore } from 'src/pages/refuels/stores'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import { Vehicle } from '../libraries/refuel/models'

async function refuelAddedEvent(): Promise<void> {
  const settingsStore = useSettingsStore()
  const dashboardStore = useDashboardStore()
  const vehicleStore = useVehicleStore()

  dashboardStore.dashboardData.length = 0
  if (settingsStore.selectedVehicleId)
    await vehicleStore.updateTotalFuelConsumption(
      settingsStore.selectedVehicleId
    )
}

async function refuelUpdatedEvent(): Promise<void> {
  const dashboardStore = useDashboardStore()
  const settingsStore = useSettingsStore()
  const vehicleStore = useVehicleStore()

  dashboardStore.dashboardData.length = 0
  if (settingsStore.selectedVehicleId)
    await vehicleStore.updateTotalFuelConsumption(
      settingsStore.selectedVehicleId
    )
}

async function refuelDeletedEvent(): Promise<void> {
  const settingsStore = useSettingsStore()
  const dashboardStore = useDashboardStore()
  const vehicleStore = useVehicleStore()

  dashboardStore.dashboardData.length = 0
  if (settingsStore.selectedVehicleId)
    await vehicleStore.updateTotalFuelConsumption(
      settingsStore.selectedVehicleId
    )
}

async function vehicleAddedEvent(vehicle: Vehicle): Promise<void> {
  const settingsStore = useSettingsStore()
  const dashboardStore = useDashboardStore()

  dashboardStore.createDashboard(vehicle.id)
  await settingsStore.changeSelectedVehicle(vehicle)
}

async function vehicleUpdatedEvent(): Promise<void> {
  const refuelStore = useRefuelStore()

  refuelStore.vehicle = null
  await Promise.resolve()
}

async function vehicleDeletedEvent(id: number): Promise<void> {
  const vehicleStore = useVehicleStore()
  const dashboardStore = useDashboardStore()
  const refuelStore = useRefuelStore()
  const settingsStore = useSettingsStore()

  dashboardStore.deleteDashboardByVehicleId(id)
  refuelStore.vehicle = null
  await settingsStore.changeSelectedVehicle(
    vehicleStore.vehicles.length ? vehicleStore.vehicles[0]! : null
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function vehicleChangedEvent(vehicle: Vehicle | null): Promise<void> {
  const refuelStore = useRefuelStore()

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
