import { Vehicle } from '../../models'

export function vehicleExpensesMade(vehicle: Vehicle): number {
  return vehicle.expenses?.length ?? 0
}
