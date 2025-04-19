import {
  FuelConsumption,
  DistanceDriven,
  TotalMoneySpent,
  RefuelsMade,
  FuelPricing,
  FuelBurnt,
  MoneySpentOnRefuels,
  MoneySpentOnExpenses,
  ExpensesMade,
  Odometer
} from './dashboardData'
import { DashboardDataFactory } from './DashboardDataFactory'

export function registerDashboardData() {
  DashboardDataFactory.register('1', FuelConsumption)
  DashboardDataFactory.register('2', DistanceDriven)
  DashboardDataFactory.register('3', TotalMoneySpent)
  DashboardDataFactory.register('4', FuelPricing)
  DashboardDataFactory.register('5', FuelBurnt)
  DashboardDataFactory.register('6', RefuelsMade)
  DashboardDataFactory.register('7', MoneySpentOnRefuels)
  DashboardDataFactory.register('8', MoneySpentOnExpenses)
  DashboardDataFactory.register('9', ExpensesMade)
  DashboardDataFactory.register('10', Odometer)
}
