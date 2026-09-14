import type {
  Expense,
  Refuel,
  Vehicle
} from '@/scripts/libraries/refuel/models'
import type { DataSource, Group, AbstractChartData, IChartData } from '.'

export class ChartDataFactory {
  public static chartDataClasses = new Map<
    typeof DataSource,
    typeof AbstractChartData
  >()

  public static register(
    dataSource: typeof DataSource,
    chartDataFun: typeof AbstractChartData
  ) {
    ChartDataFactory.chartDataClasses.set(dataSource, chartDataFun)
  }

  public static get(
    dataSource: typeof DataSource,
    groupBy: (typeof Group)[keyof typeof Group],
    vehicle: Vehicle,
    refuels: Refuel[],
    expenses: Expense[]
  ): IChartData | null {
    const dashboardDataClass = ChartDataFactory.chartDataClasses.get(dataSource)
    if (dashboardDataClass) {
      const fun = new dashboardDataClass()
      return fun.getChartData(groupBy, vehicle, refuels, expenses)
    }

    return null
  }
}
