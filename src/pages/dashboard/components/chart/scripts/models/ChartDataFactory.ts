import type {
  Expense,
  Refuel,
  Vehicle
} from 'src/scripts/libraries/refuel/models'
import type { DataSource, Group, AbstractChartData, IChartData } from '.'

export class ChartDataFactory {
  public static chartDataClasses = new Map<
    DataSource,
    typeof AbstractChartData
  >()

  public static register(
    dataSource: DataSource,
    chartDataFun: typeof AbstractChartData
  ) {
    ChartDataFactory.chartDataClasses.set(dataSource, chartDataFun)
  }

  public static get(
    dataSource: DataSource,
    groupBy: Group,
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
