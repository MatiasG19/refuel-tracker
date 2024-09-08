import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'

export enum Group {
  NoGrouping,
  Year,
  Month
}

export enum DataSource {
  FuelConsumption,
  DistanceDriven,
  FuelBurnt,
  RefuelsMade,
  FuelPricing,
  MoneySpent
}

export class AbstractChartData implements IChartDataFun {
  constructor() {}

  getChartData(
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[]
  ): IChartData {
    return { labels: [], data: [] }
  }
}

export interface IChartData {
  labels: string[]
  data: string[]
}

export interface IChartDataFun {
  getChartData(groupBy: Group, vehicle: Vehicle, refuels: Refuel[]): IChartData
}
