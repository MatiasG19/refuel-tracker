import { useDashboardStore } from 'src/pages/dashboard/stores/dashboardStore'
import { useRefuelStore } from 'src/pages/refuels/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import { Vehicle } from '../libraries/refuel/models'

async function refuelAddedEvent(vehicle: Vehicle): Promise<void> {
  const vehicleStore = useVehicleStore()

  await vehicleStore.updateTotalFuelConsumption(vehicle.id)
}

async function refuelUpdatedEvent(vehicle: Vehicle): Promise<void> {
  const vehicleStore = useVehicleStore()

  await vehicleStore.updateTotalFuelConsumption(vehicle.id)
}

async function refuelDeletedEvent(vehicle: Vehicle): Promise<void> {
  const vehicleStore = useVehicleStore()

  await vehicleStore.updateTotalFuelConsumption(vehicle.id)
}

async function vehicleAddedEvent(vehicle: Vehicle): Promise<void> {
  const dashboardStore = useDashboardStore()

  dashboardStore.createDashboard(vehicle.id)
}

async function vehicleUpdatedEvent(): Promise<void> {
  const refuelStore = useRefuelStore()

  refuelStore.vehicle = null
  await Promise.resolve()
}

async function vehicleDeletedEvent(id: number): Promise<void> {
  const dashboardStore = useDashboardStore()
  const refuelStore = useRefuelStore()

  dashboardStore.deleteDashboardByVehicleId(id)
  refuelStore.vehicle = null
}

export {
  refuelAddedEvent,
  refuelUpdatedEvent,
  refuelDeletedEvent,
  vehicleAddedEvent,
  vehicleUpdatedEvent,
  vehicleDeletedEvent
}
