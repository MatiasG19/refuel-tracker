import { Vehicle, Refuel } from 'src/scripts/libraries/refuel/models'
import { AbstractChartData, DataSource, Group, IChartData } from '..'

export class FuelConsumption extends AbstractChartData {
  getChartData(
    dataSource: DataSource,
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[]
  ): IChartData {
    return { labels: [], data: [] }
  }
}
