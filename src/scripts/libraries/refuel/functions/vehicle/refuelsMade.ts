import { Vehicle } from '../../models'

export function vehicleRefuelsMade(vehicle: Vehicle): number {
  return vehicle.refuels?.length ?? 0
}
