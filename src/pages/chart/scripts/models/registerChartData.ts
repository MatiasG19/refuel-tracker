import { ChartDataFactory } from './ChartDataFactory'
import { DataSource } from '.'
import { FuelConsumption, DistanceDriven } from './chartDataFunctions'

export function registerChartData() {
  ChartDataFactory.register(DataSource.FuelConsumption, FuelConsumption)
  ChartDataFactory.register(DataSource.DistanceDriven, DistanceDriven)
  ChartDataFactory.register(DataSource.MoneySpent, FuelConsumption)
  ChartDataFactory.register(DataSource.FuelPricing, FuelConsumption)
  ChartDataFactory.register(DataSource.FuelBurnt, FuelConsumption)
  ChartDataFactory.register(DataSource.RefuelsMade, FuelConsumption)
}
