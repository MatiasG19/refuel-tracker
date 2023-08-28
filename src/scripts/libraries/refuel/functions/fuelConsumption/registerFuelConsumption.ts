import { FuelConsumptionFactory } from 'src/scripts/libraries/refuel/functions/fuelConsumption/FuelConsumptionFactory'
import {
  kWhPer100km,
  litresPer100km,
  milesPerGallonImperial,
  milesPerGallonUs,
  whPer100km,
  whPerMile
} from 'src/scripts/libraries/refuel/functions/fuelConsumption'

export function registerFuelConsumption() {
  FuelConsumptionFactory.register('1', litresPer100km)
  FuelConsumptionFactory.register('2', milesPerGallonUs)
  FuelConsumptionFactory.register('3', milesPerGallonImperial)
  FuelConsumptionFactory.register('4', kWhPer100km)
  FuelConsumptionFactory.register('5', whPer100km)
  FuelConsumptionFactory.register('6', whPerMile)
}
