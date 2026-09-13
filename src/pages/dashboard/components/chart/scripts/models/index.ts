import type {
  Expense,
  Refuel,
  Vehicle
} from 'src/scripts/libraries/refuel/models'

export const Group = {
  NoGrouping: 0,
  Month: 1,
  Year: 2
} as const

export type Group = (typeof Group)[keyof typeof Group]

export const DataSource = {
  FuelConsumption: 0,
  DistanceDriven: 1,
  FuelBurnt: 2,
  RefuelsMade: 3,
  FuelPricing: 4,
  TotalMoneySpent: 5,
  MoneySpentOnRefuels: 6,
  MoneySpentOnExpenses: 7,
  ExpensesMade: 8
} as const

export type DataSource = (typeof DataSource)[keyof typeof DataSource]

export class AbstractChartData implements IChartDataFun {
  constructor() {}

  getChartData(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupBy: (typeof Group)[keyof typeof Group],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vehicle: Vehicle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refuels: Refuel[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expenses: Expense[]
  ): IChartData {
    return { labels: [], data: [] }
  }
}

export interface IChartData {
  labels: string[]
  data: string[]
}

export interface IChartDataFun {
  getChartData(
    groupBy: (typeof Group)[keyof typeof Group],
    vehicle: Vehicle,
    refuels: Refuel[],
    expenses: Expense[]
  ): IChartData
}
