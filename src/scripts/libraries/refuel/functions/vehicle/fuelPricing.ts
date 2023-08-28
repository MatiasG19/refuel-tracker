import { Vehicle } from '../../models'

export function vehicleFuelPricing(vehicle: Vehicle): number {
  if (!vehicle.refuels || vehicle.refuels.length === 0) return 0

  const payedAmount = vehicle.refuels
    .map(r => r.payedAmount)
    .reduce((total, current) => total + current)

  const refueledAmount = vehicle.refuels
    .map(r => r.refueledAmount)
    .reduce((total, current) => total + current)

  return payedAmount / refueledAmount
}
