import { ChartDataFactory } from './ChartDataFactory'
import { DataSource } from '.'
import { FuelConsumption } from './chartDataFunctions'

export function registerGraphData() {
  ChartDataFactory.register(DataSource.FuelConsumption, FuelConsumption)
  ChartDataFactory.register(DataSource.DistanceDriven, FuelConsumption)
  ChartDataFactory.register(DataSource.MoneySpent, FuelConsumption)
  ChartDataFactory.register(DataSource.FuelPricing, FuelConsumption)
  ChartDataFactory.register(DataSource.FuelBurnt, FuelConsumption)
  ChartDataFactory.register(DataSource.RefuelsMade, FuelConsumption)
}
