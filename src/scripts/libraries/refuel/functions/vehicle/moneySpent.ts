import { Vehicle } from '../../models'

export function vehicleMoneySpent(vehicle: Vehicle): number {
  if (!vehicle.refuels || vehicle.refuels.length === 0) return 0

  return +vehicle.refuels
    ?.map(re => re.payedAmount)
    .reduce((total, current) => +total + +current)
    .toString()
}
