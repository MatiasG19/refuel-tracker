import { Vehicle } from '../models'

export function vehicleFuelConsumption(vehicle: Vehicle): string {
  let fuel = vehicle.refuels
    ?.map(re => re.refueledAmount)
    .reduce((total, current) => +total + +current)
  fuel = fuel ? +fuel : 0

  let distance = vehicle.refuels
    ?.map(re => re.distanceDriven)
    .reduce((total, current) => +total + +current)
  distance = distance ? +distance : 0

  return fuelConsumption(fuel, distance).toFixed(2).toString()
}

export function fuelConsumption(fuelAmount: number, distance: number) {
  return (fuelAmount * 100) / distance
}
