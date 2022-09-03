import { FuelConsumptionFactory } from 'src/scripts/libraries/refuel/functions/fuelConsumption/FuelConsumptionFactory'
import {
  kWhPer100km,
  litresPer100km,
  milesPerGallonImperial,
  milesPerGallonUs,
  WhPer100km,
  WhPerMile
} from 'src/scripts/libraries/refuel/functions/fuelConsumption'

export function registerFuelConsumption() {
  FuelConsumptionFactory.register('1', litresPer100km)
  FuelConsumptionFactory.register('2', milesPerGallonUs)
  FuelConsumptionFactory.register('3', milesPerGallonImperial)
  FuelConsumptionFactory.register('4', kWhPer100km)
  FuelConsumptionFactory.register('5', WhPer100km)
  FuelConsumptionFactory.register('6', WhPerMile)
}
