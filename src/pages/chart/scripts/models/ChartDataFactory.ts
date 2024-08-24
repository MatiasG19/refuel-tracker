import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { DataSource, Group, AbstractChartData, IChartData } from '.'

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

  public get(
    dataSource: DataSource,
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[]
  ): IChartData | null {
    const graphDataClass = ChartDataFactory.chartDataClasses.get(dataSource)
    if (graphDataClass) {
      const fun = new graphDataClass()
      return fun.getChartData(dataSource, groupBy, vehicle, refuels)
    }

    return null
  }
}
