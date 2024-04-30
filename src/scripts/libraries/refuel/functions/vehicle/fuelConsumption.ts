import { Refuel, Vehicle } from '../../models'
import { FuelConsumptionFactory } from '../fuelConsumption/FuelConsumptionFactory'

export function vehicleFuelConsumption(
  vehicle: Vehicle,
  refuel: Refuel | null = null
): number {
  if ((vehicle.refuels && vehicle.refuels.length && !refuel) || refuel) {
    const func = FuelConsumptionFactory.get(vehicle.fuelUnitId.toString())

    if (refuel === null) {
      let fuel = vehicle
        .refuels!.map(re => re.refueledAmount)
        .reduce((total, current) => total + current)
      fuel = fuel ? fuel : 0

      let distance = vehicle
        .refuels!.map(re => re.distanceDriven)
        .reduce((total, current) => total + current)
      distance = distance ? distance : 0
      if (func) return func(fuel, distance)
    } else {
      if (func) return func(refuel.refueledAmount, refuel.distanceDriven)
    }
  }
  return 0
}
