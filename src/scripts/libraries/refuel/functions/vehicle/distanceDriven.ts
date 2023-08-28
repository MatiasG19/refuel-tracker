import { Vehicle } from '../../models'

export function vehicleDistanceDriven(vehicle: Vehicle): number {
  if (!vehicle.refuels || vehicle.refuels.length === 0) return 0

  return vehicle.refuels
    .map(re => re.distanceDriven)
    .reduce((total, current) => total + current)
}
