import type { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'

export enum Group {
  NoGrouping,
  Month,
  Year
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupBy: Group,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vehicle: Vehicle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
