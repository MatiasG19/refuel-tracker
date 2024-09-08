import { ChartDataFactory } from './ChartDataFactory'
import { DataSource } from '.'
import {
  FuelConsumption,
  DistanceDriven,
  MoneySpent,
  FuelPricing,
  FuelBurnt,
  RefuelsMade
} from './chartDataFunctions'

export function registerChartData() {
  ChartDataFactory.register(DataSource.FuelConsumption, FuelConsumption)
  ChartDataFactory.register(DataSource.DistanceDriven, DistanceDriven)
  ChartDataFactory.register(DataSource.MoneySpent, MoneySpent)
  ChartDataFactory.register(DataSource.FuelPricing, FuelPricing)
  ChartDataFactory.register(DataSource.FuelBurnt, FuelBurnt)
  ChartDataFactory.register(DataSource.RefuelsMade, RefuelsMade)
}
