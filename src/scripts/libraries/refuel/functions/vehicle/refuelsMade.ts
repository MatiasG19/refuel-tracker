import { Vehicle } from '../../models'

export function vehicleRefuelsMade(vehicle: Vehicle): number {
  if (!vehicle.refuels || vehicle.refuels.length === 0) return 0

  return vehicle.refuels?.length
}
