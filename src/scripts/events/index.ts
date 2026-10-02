import { useDashboardStore } from '@/pages/dashboard/stores/dashboardStore'
import { useRefuelStore } from '@/pages/refuels/stores/refuelStore'
import { useVehicleStore } from '@/pages/vehicles/stores/vehicleStore'
import { Vehicle } from '../libraries/refuel/models'

async function refuelAddedEvent(vehicleId: number): Promise<void> {
  const vehicleStore = useVehicleStore()

  await vehicleStore.updateTotalFuelConsumption(vehicleId)
}

async function refuelUpdatedEvent(vehicleId: number): Promise<void> {
  const vehicleStore = useVehicleStore()

  await vehicleStore.updateTotalFuelConsumption(vehicleId)
}

async function refuelDeletedEvent(vehicleId: number): Promise<void> {
  const vehicleStore = useVehicleStore()

  await vehicleStore.updateTotalFuelConsumption(vehicleId)
}

async function vehicleAddedEvent(vehicle: Vehicle): Promise<void> {
  const dashboardStore = useDashboardStore()

  await dashboardStore.createDashboard(vehicle.id)
}

async function vehicleUpdatedEvent(): Promise<void> {
  const refuelStore = useRefuelStore()

  refuelStore.vehicle = null
  await Promise.resolve()
}

async function vehicleDeletedEvent(id: number): Promise<void> {
  const dashboardStore = useDashboardStore()
  const refuelStore = useRefuelStore()

  await dashboardStore.deleteDashboardByVehicleId(id)
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
