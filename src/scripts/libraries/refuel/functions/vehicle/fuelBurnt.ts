import { Vehicle } from '../../models'

export function vehicleFuelBurnt(vehicle: Vehicle): number {
  if (!vehicle.refuels || vehicle.refuels.length === 0) return 0

  return vehicle.refuels
    .map(re => re.refueledAmount)
    .reduce((total, current) => total + current)
}
