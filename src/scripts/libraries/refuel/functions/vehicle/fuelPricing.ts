import { Vehicle } from '../../models'

export function vehicleFuelPricing(vehicle: Vehicle): number {
  if (!vehicle.refuels || vehicle.refuels.length === 0) return 0

  let index = 1
  let price = vehicle.refuels
    ?.map(re => +re.payedAmount / +re.refueledAmount)
    .reduce((total, current, i) => {
      index += i
      return +total + +current
    })
  price = price ? +price / index : 0

  return price
}
