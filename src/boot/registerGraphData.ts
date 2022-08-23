import {
  FuelConsumption,
  DistanceDriven,
  MoneySpent,
  RefuelsMade,
  FuelPricing,
  FuelBurnt
} from 'src/scripts/GraphData'
import { GraphDataFactory } from 'src/scripts/GraphData/GraphDataFactory'

GraphDataFactory.register('1', FuelConsumption)
GraphDataFactory.register('2', DistanceDriven)
GraphDataFactory.register('3', MoneySpent)
GraphDataFactory.register('4', FuelPricing)
GraphDataFactory.register('5', FuelBurnt)
GraphDataFactory.register('6', RefuelsMade)
