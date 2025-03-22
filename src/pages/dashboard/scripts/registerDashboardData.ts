import {
  FuelConsumption,
  DistanceDriven,
  MoneySpent,
  RefuelsMade,
  FuelPricing,
  FuelBurnt
} from './dashboardData'
import { DashboardDataFactory } from './DashboardDataFactory'

export function registerDashboardData() {
  DashboardDataFactory.register('1', FuelConsumption)
  DashboardDataFactory.register('2', DistanceDriven)
  DashboardDataFactory.register('3', MoneySpent)
  DashboardDataFactory.register('4', FuelPricing)
  DashboardDataFactory.register('5', FuelBurnt)
  DashboardDataFactory.register('6', RefuelsMade)
}
