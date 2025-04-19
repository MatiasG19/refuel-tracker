import { ChartDataFactory } from './ChartDataFactory'
import { DataSource } from '.'
import {
  FuelConsumption,
  DistanceDriven,
  TotalMoneySpent,
  FuelPricing,
  FuelBurnt,
  RefuelsMade,
  MoneySpentOnRefuels,
  MoneySpentOnExpenses
} from './chartDataFunctions'

export function registerChartData() {
  ChartDataFactory.register(DataSource.FuelConsumption, FuelConsumption)
  ChartDataFactory.register(DataSource.DistanceDriven, DistanceDriven)
  ChartDataFactory.register(DataSource.TotalMoneySpent, TotalMoneySpent)
  ChartDataFactory.register(DataSource.FuelPricing, FuelPricing)
  ChartDataFactory.register(DataSource.FuelBurnt, FuelBurnt)
  ChartDataFactory.register(DataSource.RefuelsMade, RefuelsMade)
  ChartDataFactory.register(DataSource.MoneySpentOnRefuels, MoneySpentOnRefuels)
  ChartDataFactory.register(
    DataSource.MoneySpentOnExpenses,
    MoneySpentOnExpenses
  )
}
