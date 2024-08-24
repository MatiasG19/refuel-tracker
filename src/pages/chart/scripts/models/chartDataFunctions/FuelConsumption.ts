import { Vehicle, Refuel } from 'src/scripts/libraries/refuel/models'
import { AbstractChartData, Group, IChartData } from '..'

export class FuelConsumption extends AbstractChartData {
  getChartData(
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[]
  ): IChartData {
    return { labels: [], data: [] }
  }
}
