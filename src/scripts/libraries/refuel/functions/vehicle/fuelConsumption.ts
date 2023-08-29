import { Vehicle } from '../../models'
import { FuelConsumptionFactory } from '../fuelConsumption/FuelConsumptionFactory'

export function vehicleFuelConsumption(
  vehicle: Vehicle,
  refuelId: number | null = null
): number {
  if (!vehicle.refuels || vehicle.refuels.length === 0) return 0

  let fuel = vehicle.refuels
    .filter(r => (refuelId ? r.id === refuelId : true))
    .map(re => re.refueledAmount)
    .reduce((total, current) => total + current)
  fuel = fuel ? fuel : 0

  let distance = vehicle.refuels
    .filter(r => (refuelId ? r.id === refuelId : true))
    .map(re => re.distanceDriven)
    .reduce((total, current) => total + current)
  distance = distance ? distance : 0

  const func = FuelConsumptionFactory.get(vehicle.fuelUnitId.toString())
  if (func) return func(fuel, distance)
  return 0
}
